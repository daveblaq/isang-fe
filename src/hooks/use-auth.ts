import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

interface RegisterRequest {
  email: string;
  sessionId: string | null;
}

interface RegisterResponse {
  message: string;
  email: string;
  emailVerified: boolean;
  codeSent: boolean;
}

interface VerifyRequest {
  email: string;
  code: string;
  sessionId: string | null;
}

interface VerifyResponse {
  token: string;
  userId: string;
  email: string;
  emailVerified: boolean;
  sessionId: string;
  message: string;
}

export const useAuth = () => {
  const register = useMutation({
    mutationFn: async (payload: RegisterRequest) => {
      const response = await api.post<RegisterResponse>("/auth/register", payload);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Registration step 1 successful:", data);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error?.message || "Registration failed. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Registration step 1 failed:", error);
    },
  });

  const verify = useMutation({
    mutationFn: async (payload: VerifyRequest) => {
      const response = await api.post<VerifyResponse>("/auth/verify", payload);
      return response.data;
    },
    onSuccess: (data) => {
      // Store token and userId
      if (data.token) {
        localStorage.setItem("access_token", data.token);
        // localStorage.setItem("user_id", data.userId);
        
        // Update sessionId if provided
        if (data.sessionId) {
          localStorage.setItem("isang_session_id", data.sessionId);
        }
      }
      console.log("Verification successful:", data);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error?.message || "Verification failed. Please check your code.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Verification failed:", error);
    },
  });

  const resendCode = useMutation({
    mutationFn: async (payload: { email: string }) => {
      const response = await api.post("/auth/resend-code", payload);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "A new verification code has been sent to your email.",
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error?.message || "Failed to resend code. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const isAuthenticated = !!localStorage.getItem("access_token");

  return {
    register,
    verify,
    resendCode,
    isAuthenticated,
    isRegisterLoading: register.isPending,
    isVerifyLoading: verify.isPending,
    isResendingCode: resendCode.isPending,
  };
};
