import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import GoogleButton from "@/components/ui/google-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Text from "@/components/ui/text";
import OtpBox from "@/components/ui/otp-box";

import { useAuth } from "@/hooks/use-auth";

import { useNavigate } from "react-router-dom";

type EmailFormValues = { email: string };
type CodeFormValues = { code: string };

export default function Auth() {
  const [step, setStep] = useState<"email" | "code">("email");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const { register, verify, resendCode, isRegisterLoading, isVerifyLoading, isResendingCode } = useAuth();
  const navigate = useNavigate();

  const emailForm = useForm<EmailFormValues>({
    defaultValues: { email: "" },
    mode: "onChange",
  });
  const codeForm = useForm<CodeFormValues>({
    defaultValues: { code: "" },
    mode: "onSubmit",
  });
  const [resendTimer, setResendTimer] = useState(300);

  useEffect(() => {
    if (step !== "code") return;
    if (resendTimer === 0) return;
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [step, resendTimer]);

  const handleResend = async () => {
    if (resendTimer > 0 || isResendingCode) return;

    try {
      await resendCode.mutateAsync({ email: submittedEmail });
      setResendTimer(300);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleEmailSubmit = async (values: EmailFormValues) => {
    const sessionId = localStorage.getItem("isang_session_id");

    try {
      await register.mutateAsync({
        email: values.email,
        sessionId: sessionId,
      });

      setSubmittedEmail(values.email);
      setStep("code");
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleCodeSubmit = async (values: CodeFormValues) => {
    const sessionId = localStorage.getItem("isang_session_id");

    try {
      await verify.mutateAsync({
        email: submittedEmail,
        code: values.code,
        sessionId: sessionId,
      });

      navigate(-1);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-full h-full items-center justify-center flex-col gap-6 md:gap-8 py-8 md:py-16 lg:py-52 px-4 md:px-0">
      {step === "email" ? (
        <section className="space-y-6 md:space-y-8 py-1 h-full mx-auto w-full max-w-md">
          <header className="space-y-2">
            <Text
              variant="h3"
              className="font-semibold font-ibm text-2xl md:text-3xl text-slate-900"
            >
              Welcome to Isang
            </Text>
            <Text
              variant="span"
              className="text-xs md:text-sm text-slate-500 font-ibm"
            >
              Your smart guide for every journey
            </Text>
          </header>

          <GoogleButton
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log("Google sign-in");
              setStep("code");
            }}
          />

          <div className="flex items-center gap-3 md:gap-4 text-xs font-ibm font-semibold text-gray-500">
            <span className="h-px flex-1 bg-slate-200" />
            OR
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <form
            onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
            className="space-y-4 md:space-y-6 mb-4 md:mb-10"
          >
            <div className="space-y-2 text-left">
              <Text
                variant="span"
                className="text-xs md:text-sm font-semibold text-slate-600"
              >
                Email address
              </Text>
              <Input
                placeholder="Enter your email address"
                type="email"
                required
                {...emailForm.register("email")}
                className="py-2.5 md:py-3.5 rounded-[8px] border-[#E4E4E7] bg-white text-sm md:text-base"
              />
            </div>
            <Button
              type="submit"
              disabled={!emailForm.watch("email")?.trim() || isRegisterLoading}
              className="w-full rounded-[8px] py-2.5 md:py-3.5 font-ibm text-sm md:text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#F0B8A7] bg-[#FF5A1F] hover:bg-[#ff7846]"
            >
              {isRegisterLoading ? "Loading..." : "Continue with email"}
            </Button>
          </form>
          <div className="mt-2 md:mt-3">
            <Text
              variant="span"
              className="text-center text-[10px] md:text-xs lg:text-sm font-regular font-ibm text-gray-500 leading-relaxed"
            >
              By signing up, you agree to the{" "}
              <button className="font-semibold">Terms of Use</button>,{" "}
              <button className="font-semibold">Privacy Notice</button> and{" "}
              <button className="font-semibold">Cookie Notice</button>
            </Text>
          </div>
        </section>
      ) : (
        <section className="space-y-5 md:space-y-8 py-1 w-full max-w-md px-4 md:px-0">
          <header className="space-y-2 text-left">
            <Text
              variant="h3"
              className="text-xl md:text-2xl lg:text-3xl font-ibm font-semibold text-slate-900"
            >
              We sent you a code
            </Text>
            <Text
              variant="span"
              className="text-xs md:text-sm font-ibm text-slate-500 break-words"
            >
              We sent a confirmation code to {submittedEmail}
            </Text>
          </header>

          <form
            onSubmit={codeForm.handleSubmit(handleCodeSubmit)}
            className="space-y-4 md:space-y-6"
          >
            <OtpBox
              length={6}
              onComplete={(code) => codeForm.setValue("code", code)}
            />

            <button
              type="button"
              onClick={handleResend}
              disabled={resendTimer > 0 || isResendingCode}
              className="text-xs md:text-sm font-semibold text-[#FF5A1F] disabled:text-slate-400"
            >
              {isResendingCode
                ? "Resending..."
                : resendTimer > 0
                  ? `Resend code in ${Math.floor(resendTimer / 60)
                    .toString()
                    .padStart(2, "0")}:${(resendTimer % 60)
                      .toString()
                      .padStart(2, "0")}`
                  : "Resend code"}
            </button>

            <Button
              type="submit"
              disabled={!codeForm.watch("code") || isVerifyLoading}
              className="w-full rounded-[8px] py-2.5 md:py-3.5 font-ibm text-sm md:text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#F0B8A7] bg-[#FF5A1F] hover:bg-[#ff7846]"
            >
              {isVerifyLoading ? "Verifying..." : "Verify account"}
            </Button>
          </form>

          <button
            className="text-xs md:text-sm font-semibold text-[#0D7F88]"
            onClick={() => setStep("email")}
          >
            ← Back to email
          </button>
        </section>
      )}
    </div>
  );
}
