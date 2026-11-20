import { cn } from "@/lib/utils";

/**
 * Brand mark: a blue block with a white gable — a roofline on a post — paired
 * with the DYNAMIC / CONSTRUCTION wordmark. Typography echoes the existing
 * heavy blue logo; replace with vector artwork if the original source exists.
 */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("shrink-0", className)}>
      <rect width="40" height="40" rx="7" fill="#304DA0" />
      <path d="M8 20.5 20 10l12 10.5" fill="none" stroke="#F3F1EC" strokeWidth="3.2" strokeLinecap="square" />
      <path d="M12.5 19v11.5h15V19" fill="none" stroke="#F3F1EC" strokeWidth="3.2" strokeLinecap="square" />
      <path d="M18 30.5V24h4v6.5" fill="#B5A38B" />
    </svg>
  );
}

export function Wordmark({ className, tone = "light" }: { className?: string; tone?: "light" | "ink" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark className="size-9" />
      <span className="flex flex-col leading-none">
        <span
          className={cn("display-wide text-[1.2rem] font-[850] tracking-[-0.01em]", tone === "light" ? "text-paper" : "text-charcoal")}
          style={{ fontVariationSettings: '"wdth" 125' }}
        >
          DYNAMIC
        </span>
        <span className={cn("mt-1 font-mono text-[0.56rem] tracking-[0.42em]", tone === "light" ? "text-metal" : "text-bronze")}>
          CONSTRUCTION
        </span>
      </span>
      <span className="sr-only">Dynamic Construction MI</span>
    </span>
  );
}

/** Large classic wordmark (blue DYNAMIC) used as a sign-off in the footer */
export function ClassicWordmark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("block leading-[0.8]", className)}>
      <span className="block font-display font-[900] text-blue-bright" style={{ fontVariationSettings: '"wdth" 125' }}>
        DYNAMIC
      </span>
      <span className="mt-[0.18em] block text-center font-display text-[0.26em] font-[700] tracking-[0.32em] text-paper/90" style={{ fontVariationSettings: '"wdth" 120' }}>
        CONSTRUCTION
      </span>
    </span>
  );
}
