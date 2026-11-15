import Link from "next/link";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";

export interface AuthField {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  autoComplete: string;
  placeholder?: string;
  hint?: string;
}

interface AuthFormProps {
  title: string;
  description: string;
  fields: AuthField[];
  submitLabel: string;
  footer: { prompt: string; linkLabel: string; href: string };
}

/**
 * Authentication form shell.
 *
 * Milestone 1: visual only. The submit button is disabled and the form has no
 * action, so nothing can be submitted. In the auth milestone, replace the
 * notice with a Server Action that calls Supabase Auth
 * (see src/lib/supabase/server.ts).
 */
export function AuthForm({ title, description, fields, submitLabel, footer }: AuthFormProps) {
  return (
    <div className="flex animate-rise flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-headline font-semibold text-bone">{title}</h1>
        <p className="leading-relaxed text-mist">{description}</p>
      </div>

      <div
        role="note"
        className="flex gap-3 rounded-md border border-line-strong bg-ink-900 p-4 text-sm leading-relaxed text-mist"
      >
        <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-lime" />
        <p>
          <span className="font-medium text-bone">Accounts aren’t open yet.</span> This screen is a
          preview — sign-in will be enabled at launch.
        </p>
      </div>

      <form className="flex flex-col gap-5" aria-describedby="auth-status" noValidate>
        {fields.map((f) => (
          <Field key={f.id} label={f.label} htmlFor={f.id} hint={f.hint}>
            <Input
              id={f.id}
              name={f.id}
              type={f.type}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
            />
          </Field>
        ))}
        <Button type="submit" size="lg" disabled className="mt-2 w-full">
          {submitLabel}
        </Button>
        <p id="auth-status" className="sr-only">
          Submission is disabled until accounts launch.
        </p>
      </form>

      <p className="text-sm text-mist">
        {footer.prompt}{" "}
        <Link href={footer.href} className="font-medium text-bone underline-offset-4 hover:underline">
          {footer.linkLabel}
        </Link>
      </p>
    </div>
  );
}
