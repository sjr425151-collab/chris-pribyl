import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <AuthForm
      title="Welcome back."
      description="Log in to see today’s session, your Movement Moments and your progress."
      submitLabel="Log in"
      fields={[
        { id: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@example.com" },
        { id: "password", label: "Password", type: "password", autoComplete: "current-password" },
      ]}
      footer={{ prompt: "New to KINFORM?", linkLabel: "Create an account", href: "/signup" }}
    />
  );
}
