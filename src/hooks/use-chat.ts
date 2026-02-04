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

interface ChatHistoryResponse {
  sessionId: string;
  conversations: Message[];
}

export const useChat = () => {
  const { openModal } = useSignupModal();
  const queryClient = useQueryClient();

  const getChatHistory = useQuery({
    queryKey: ["chatHistory"],
    queryFn: async () => {
      const savedSessionId = localStorage.getItem("isang_session_id");
      if (!savedSessionId) return { sessionId: "", conversations: [] };

      const response = await api.get<ChatHistoryResponse>("/chat", {
        headers: {
          "X-Session-Id": savedSessionId,
        },
      });
      return response.data;
    },
    enabled: !!localStorage.getItem("isang_session_id"),
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

      const response = await api.post<ChatResponse>("/chat", requestPayload);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.sessionId) {
        localStorage.setItem("isang_session_id", data.sessionId);
      }

      // Invalidate and refetch history
      queryClient.invalidateQueries({ queryKey: ["chatHistory"] });

      if (data.conversationsRemaining === 0 || data.requiresSignup) {
        openModal();
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

  return {
    sendMessage,
    messages: getChatHistory.data?.conversations || [],
    isLoadingHistory: getChatHistory.isLoading,
    isSending,
    pendingMessage,
  };
};
