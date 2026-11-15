import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Phone-frame preview of the training experience.
 * All content is an illustrative example — not a real user's plan.
 */
export function AppPreview({ className }: { className?: string }) {
  const blocks = [
    { label: "Prepare", name: "Breathing & rib-cage reset", detail: "2 min" },
    { label: "Mobility", name: "Half-kneeling hip flexor rock", detail: "2 × 8 each side" },
    { label: "Mobility", name: "Knee-to-wall ankle drive", detail: "2 × 10 each side" },
    { label: "Control", name: "Supported single-leg balance", detail: "3 × 20 s each side" },
    { label: "Strength", name: "Box sit-to-stand", detail: "3 × 8" },
  ];

  return (
    <div className={cn("relative mx-auto w-full max-w-[20rem]", className)}>
      <div className="rounded-[2.6rem] border border-line-strong bg-ink-850 p-2.5 shadow-lift">
        <div className="overflow-hidden rounded-[2.1rem] border border-line bg-ink-950">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-4 pb-2">
            <span className="font-mono text-[0.65rem] text-dim">9:41</span>
            <span className="h-5 w-20 rounded-full bg-ink-800" />
            <span className="font-mono text-[0.65rem] text-dim">●●●</span>
          </div>

          <div className="flex flex-col gap-5 px-5 pt-3 pb-6">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-[0.62rem]">Week 1 · Day 2</span>
              <span className="rounded-full border border-line-strong px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-dim">
                Example
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-xl font-semibold tracking-[-0.02em] text-bone">
                Hips & ankles: comfortable depth
              </p>
              <p className="text-xs text-mist">About 25 minutes · No equipment</p>
            </div>

            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-line bg-ink-850">
              <div aria-hidden className="grain absolute inset-0 opacity-[0.06]" />
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-bone/90 text-ink-950">
                <Play aria-hidden className="ml-0.5 size-4" fill="currentColor" />
              </span>
              <span className="absolute bottom-2 left-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-dim">
                Demo video
              </span>
            </div>

            <ul className="flex flex-col">
              {blocks.map((b, i) => (
                <li
                  key={b.name}
                  className="flex items-center gap-3 border-t border-line py-2.5 first:border-t-0"
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border font-mono text-[0.55rem]",
                      i === 0 ? "border-lime bg-lime text-lime-ink" : "border-line-strong text-dim",
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.78rem] font-medium text-bone">{b.name}</p>
                    <p className="text-[0.66rem] text-dim">
                      {b.label} · {b.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
