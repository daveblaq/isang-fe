import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useSignupModal } from "@/hooks/use-signup-modal";
import { toast } from "@/components/ui/use-toast";

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

export const useChat = () => {
  const { openModal } = useSignupModal();

  const sendMessage = useMutation({
    mutationFn: async (payload: ChatRequest) => {
      // Get session ID from localStorage
      const savedSessionId = localStorage.getItem("isang_session_id");
      
      // For now, we assume user is a guest if no auth logic is implemented yet
      // You can expand this once auth is ready
      const requestPayload: any = {
        message: payload.message,
        isGuest: true, // As per instruction
      };

      if (savedSessionId) {
        requestPayload.sessionId = savedSessionId;
      }

      const response = await api.post<ChatResponse>("/chat", requestPayload);
      return response.data;
    },
    onSuccess: (data) => {
      // Save sessionId for future requests
      if (data.sessionId) {
        localStorage.setItem("isang_session_id", data.sessionId);
      }

      // Check for signup requirements
      if (data.conversationsRemaining === 0 || data.requiresSignup) {
        openModal();
      }

      console.log("Chat Response:", data);
    },
    onError: (error: any) => {
      // Show signup modal if limit is exceeded (status 429)
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
      console.error("Chat Error:", error);
    },
  });

  return {
    sendMessage,
    isLoading: sendMessage.isPending,
  };
};
