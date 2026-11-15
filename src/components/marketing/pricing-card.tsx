import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/content/pricing";
import { cn, formatPrice } from "@/lib/utils";

export function PricingCard({ plan, compact = false }: { plan: Plan; compact?: boolean }) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-xl border p-7 md:p-8",
        plan.highlighted
          ? "border-lime/35 bg-ink-850 shadow-lift"
          : "border-line bg-ink-900 shadow-card",
      )}
    >
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-[-0.015em] text-bone">{plan.name}</h3>
          {plan.highlighted ? <Badge tone="accent">Start here</Badge> : null}
        </div>
        <p className="flex items-baseline gap-1.5">
          <span className="text-5xl font-semibold tracking-[-0.04em] text-bone">
            {formatPrice(plan.price)}
          </span>
          <span className="text-sm text-mist">
            {plan.cadence === "month" ? "/ month" : "one-time"}
          </span>
        </p>
        <p className="text-[0.95rem] leading-relaxed text-mist">{plan.description}</p>
      </header>

      {!compact ? (
        <ul className="mt-8 flex flex-col gap-3.5 border-t border-line pt-8">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-3 text-[0.95rem] leading-snug text-bone/90">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-lime" strokeWidth={2} />
              {f}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto flex flex-col gap-3 pt-8">
        {/* No checkout exists yet — CTAs lead to the assessment purchase section,
            which states clearly that purchasing is not yet available. */}
        <Button
          asChild
          variant={plan.highlighted ? "primary" : "secondary"}
          className="w-full"
        >
          <Link href="/assessment#purchase">
            {plan.requiresAssessment ? "Begin with an assessment" : "View assessment details"}
          </Link>
        </Button>
        {plan.requiresAssessment ? (
          <p className="text-center text-xs text-dim">Available after your initial assessment</p>
        ) : null}
      </div>
    </article>
  );
}
