import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="eyebrow flex items-center gap-2">
          <span aria-hidden className="h-px w-6 bg-lime" />
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "text-balance font-semibold text-bone",
          Heading === "h1" ? "text-display" : "text-headline",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className="text-pretty text-lg leading-relaxed text-mist">{description}</p>
      ) : null}
    </div>
  );
}

/** Vertical rhythm wrapper for a full-width page section. */
export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-20 md:py-28 lg:py-32", className)} {...props}>
      <div className="container-page">{children}</div>
    </section>
  );
}
