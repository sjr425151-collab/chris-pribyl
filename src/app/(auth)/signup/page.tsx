import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = { title: "Create account" };

export default function SignupPage() {
  return (
    <AuthForm
      title="Create your account."
      description="Your account holds your assessment, program and progress — on the web now, and in the mobile apps later."
      submitLabel="Create account"
      fields={[
        { id: "name", label: "First name", type: "text", autoComplete: "given-name" },
        { id: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@example.com" },
        {
          id: "password",
          label: "Password",
          type: "password",
          autoComplete: "new-password",
          hint: "At least 12 characters.",
        },
      ]}
      footer={{ prompt: "Already have an account?", linkLabel: "Log in", href: "/login" }}
    />
  );
}
