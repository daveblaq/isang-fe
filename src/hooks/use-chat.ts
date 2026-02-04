import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient, useMutationState } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useSignupModal } from "@/hooks/use-signup-modal";
import { toast } from "@/components/ui/use-toast";

export interface SuggestionItem {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  image?: string;
  estimatedCost?: number;
  location?: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  link: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestions?: Record<string, SuggestionItem[] | any>;
  followUpQuestion?: string;
}

interface ChatRequest {
  message: string;
  isGuest?: boolean;
  sessionId?: string | null;
}

interface ChatResponse {
  response: string;
  followUpQuestion: string;
  sessionId: string;
  conversationsRemaining: number;
  canGenerateItinerary: boolean;
  isGuest: boolean;
  requiresSignup: boolean;
}

interface SessionInfo {
  sessionId: string;
  conversations: Message[];
}

interface ChatHistoryResponse {
  sessionId?: string;
  conversations: Message[];
  sessions?: SessionInfo[];
}

export const useChat = (currentSessionId?: string) => {
  const { openModal } = useSignupModal();
  const queryClient = useQueryClient();

  const getChatHistory = useQuery({
    queryKey: ["chatHistory", currentSessionId],
    queryFn: async () => {
      const savedSessionId = localStorage.getItem("isang_session_id");
      // If no session ID and no auth token (implicit via api interceptor), we can't fetch much
      // but let's try anyway as the interceptor handles auth
      
      const response = await api.get<ChatHistoryResponse>("/chat", {
        headers: {
          ...(savedSessionId ? { "X-Session-Id": savedSessionId } : {}),
        },
      });
      return response.data;
    },
    // Enable if we have a saved session OR if we are likely authenticated (handled by API lib)
    enabled: true, 
  });

  // Track global mutation state
  const pendingMutations = useMutationState({
    filters: { mutationKey: ["sendMessage"], status: "pending" },
    select: (mutation) => mutation.state.variables as ChatRequest,
  });

  const sendMessage = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async (payload: ChatRequest) => {
      const savedSessionId = localStorage.getItem("isang_session_id");
      
      const requestPayload: any = {
        message: payload.message,
        isGuest: true,
      };

      if (savedSessionId) {
        requestPayload.sessionId = savedSessionId;
      }

      const response = await api.post<ChatResponse>("/chat", requestPayload, {
        timeout: 60000, // 60 seconds for slow AI responses
      });
      return response.data;
    },
    onSuccess: (data) => {
      try {
        if (data?.sessionId) {
          localStorage.setItem("isang_session_id", data.sessionId);
        }
        
        // Store remaining conversations safely
        if (data?.conversationsRemaining !== undefined) {
          localStorage.setItem("conversations_remaining", String(data.conversationsRemaining));
        }

        // Invalidate and refetch specific history
        queryClient.invalidateQueries({ queryKey: ["chatHistory"] });

        if (data?.conversationsRemaining === 0 || data?.requiresSignup) {
          openModal();
        }
      } catch (err) {
        console.error("Error in onSuccess handler:", err);
      }
    },
    onError: (error: any) => {
      if (error?.response?.status === 429) {
        openModal();
      } else {
        const errorMessage = error?.response?.data?.error?.message || "Failed to send message. Please try again.";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    },
  });

  const isSending = pendingMutations.length > 0;
  const pendingMessage = pendingMutations[0]?.message;

  // Filter messages based on the current sessionId if provided
  const messages = useMemo(() => {
    const data = getChatHistory.data;
    if (!data) return [];

    if (currentSessionId) {
      // 1. Look in sessions array if it exists
      if (data.sessions) {
        const session = data.sessions.find(s => s.sessionId === currentSessionId);
        if (session) return session.conversations;
      }
      
      // 2. Fallback: If the top-level sessionId matches
      if (data.sessionId === currentSessionId) {
        return data.conversations;
      }

      // If we specifically asked for a session but can't find it, return empty to avoid showing wrong chat
      return [];
    }

    // Default: return top-level conversations (standard for guests or "last" chat)
    return data.conversations || [];
  }, [getChatHistory.data, currentSessionId]);

  return {
    sendMessage,
    messages,
    sessions: getChatHistory.data?.sessions || [],
    isLoadingHistory: getChatHistory.isLoading,
    isSending,
    pendingMessage,
  };
};
