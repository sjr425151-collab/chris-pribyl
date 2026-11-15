import * as React from "react";
import { cn } from "@/lib/utils";

/** Consistent intro block for interior pages. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-line pb-16 pt-16 md:pb-24 md:pt-24", className)}>
      <div className="container-page">
        <div className="flex max-w-3xl animate-rise flex-col gap-6">
          <p className="eyebrow flex items-center gap-2">
            <span aria-hidden className="h-px w-6 bg-lime" />
            {eyebrow}
          </p>
          <h1 className="text-balance text-display font-semibold text-bone">{title}</h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-mist md:text-xl">
            {description}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}
