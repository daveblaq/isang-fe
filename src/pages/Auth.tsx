import { useState } from "react";
import { useForm } from "react-hook-form";

import GoogleButton from "@/components/ui/google-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Text from "@/components/ui/text";

type EmailFormValues = { email: string };
type CodeFormValues = { code: string };

export default function Auth() {
  const [step, setStep] = useState<"email" | "code">("email");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const emailForm = useForm<EmailFormValues>({
    defaultValues: { email: "" },
    mode: "onChange",
  });
  const codeForm = useForm<CodeFormValues>({
    defaultValues: { code: "" },
    mode: "onSubmit",
  });

  const handleEmailSubmit = (values: EmailFormValues) => {
    setSubmittedEmail(values.email);
    // eslint-disable-next-line no-console
    console.log("Email step data", values);
    setStep("code");
  };

  const handleCodeSubmit = (values: CodeFormValues) => {
    // eslint-disable-next-line no-console
    console.log("Verification step data", { email: submittedEmail, ...values });
  };

  return (
    <div className="mx-auto flex w-full max-w-full h-full items-center justify-center flex-col gap-8 py-52">
      {step === "email" ? (
        <section className="space-y-8 py-1 h-full mx-auto">
          <header className="space-y-2">
            <Text
              variant="h3"
              className="font-semibold font-ibm text-slate-900"
            >
              Welcome to Isang
            </Text>
            <Text variant="span" className="text-sm text-slate-500 font-ibm">
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

          <div className="flex items-center gap-4 text-xs font-ibm font-semibold text-gray-500">
            <span className="h-px flex-1 bg-slate-200" />
            OR
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <form
            onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
            className="space-y-6 mb-10"
          >
            <div className="space-y-2 text-left">
              <Text
                variant="span"
                className="text-sm font-semibold text-slate-600"
              >
                Email address
              </Text>
              <Input
                placeholder="Enter your email address"
                type="email"
                required
                {...emailForm.register("email")}
                className="py-3.5 rounded-[8px] border-[#E4E4E7] bg-white text-base"
              />
            </div>
            <Button
              type="submit"
              disabled={!emailForm.watch("email")?.trim()}
              className="w-full rounded-[8px] py-3.5 font-ibm text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#F0B8A7] bg-[#FF5A1F] hover:bg-[#ff7846]"
            >
              Continue with email
            </Button>
          </form>
          <div className="mt-3">
            <Text
              variant="span"
              className="text-center text-sm font-regular font-ibm text-gray-500"
            >
              By signing up, you agree to the{" "}
              <button className="font-semibold">Terms of Use</button>,{" "}
              <button className="font-semibold">Privacy Notice</button> and{" "}
              <button className="font-semibold">Cookie Notice</button>
            </Text>
          </div>
        </section>
      ) : (
        <section className="space-y-6 rounded-[40px] border border-[#F2F2F2] bg-white px-8 py-10 shadow-sm">
          <header className="space-y-2 text-left">
            <Text variant="h3" className="font-semibold text-slate-900">
              Almost there
            </Text>
            <Text variant="span" className="text-sm text-slate-500">
              We sent a confirmation code to {submittedEmail}
            </Text>
          </header>

          <form
            onSubmit={codeForm.handleSubmit(handleCodeSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Text
                variant="span"
                className="text-sm font-semibold text-slate-600"
              >
                Verification code
              </Text>
              <Input
                placeholder="Enter 6-digit code"
                maxLength={6}
                {...codeForm.register("code")}
                className="h-12 rounded-[16px] border-[#E4E4E7] text-center text-lg tracking-[0.3em]"
              />
            </div>
            <Button
              type="submit"
              className="h-12 w-full rounded-[16px] bg-[#FFB39A] text-base font-semibold text-white hover:bg-[#ff9875]"
            >
              Verify & continue
            </Button>
          </form>

          <button
            className="text-sm font-semibold text-[#0D7F88]"
            onClick={() => setStep("email")}
          >
            ← Back to email
          </button>
        </section>
      )}
    </div>
  );
}
