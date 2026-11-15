import * as React from "react";
import { cn } from "@/lib/utils";

/** Titled dashboard panel. */
export function Panel({
  id,
  title,
  aside,
  className,
  children,
}: {
  id: string;
  title: string;
  aside?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-6 rounded-xl border border-line bg-ink-900 p-5 shadow-card md:p-7", className)}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 id={`${id}-title`} className="text-base font-semibold tracking-[-0.01em] text-bone">
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function SampleTag() {
  return (
    <span className="rounded-full border border-line-strong px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-dim">
      Sample
    </span>
  );
}
