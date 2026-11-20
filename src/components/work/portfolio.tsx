"use client";

import { useState } from "react";
import type { Project, ProjectCategory } from "@/content/projects";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Category filter for the portfolio. Cards are server-rendered and passed in
 * as children keyed by category, so filtering is instant and the full list is
 * present without JavaScript.
 */
export function PortfolioFilter({
  categories,
  items,
}: {
  categories: { id: ProjectCategory; label: string; count: number }[];
  items: { slug: string; category: ProjectCategory; node: React.ReactNode }[];
}) {
  const [active, setActive] = useState<ProjectCategory | "all">("all");
  const visible = items.filter((i) => active === "all" || i.category === active);

  const choose = (id: ProjectCategory | "all") => {
    setActive(id);
    track("gallery_interaction", { action: "filter", category: id });
  };

  const options = [{ id: "all" as const, label: "All work", count: items.length }, ...categories];

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {options.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={active === c.id}
            onClick={() => choose(c.id)}
            className={cn(
              "flex h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-sm transition-colors",
              active === c.id ? "border-paper bg-paper text-charcoal" : "border-line-dark-strong text-paper/85 hover:border-paper/50",
            )}
          >
            {c.label}
            <span className={cn("font-mono text-xs", active === c.id ? "text-charcoal/60" : "text-steel")}>{c.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} project{visible.length === 1 ? "" : "s"}
      </p>
      <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((i) => (
          <li key={i.slug}>{i.node}</li>
        ))}
      </ul>
    </div>
  );
}

export type { Project };
