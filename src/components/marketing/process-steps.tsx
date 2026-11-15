import { cn } from "@/lib/utils";

interface Step {
  step: string;
  title: string;
  body: string;
}

export function ProcessSteps({ steps, className }: { steps: readonly Step[]; className?: string }) {
  return (
    <ol className={cn("grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3", className)}>
      {steps.map((s) => (
        <li key={s.step} className="group relative flex flex-col gap-8 bg-ink-900 p-7 md:p-9">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-lime">{s.step}</span>
            <span
              aria-hidden
              className="h-px w-12 bg-line-strong transition-all duration-500 ease-out-soft group-hover:w-20 group-hover:bg-lime"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-title font-semibold text-bone">{s.title}</h3>
            <p className="leading-relaxed text-mist">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Vertical timeline variant, used for the detailed journey on /how-it-works. */
export function JourneyTimeline({
  steps,
}: {
  steps: readonly { id: string; title: string; duration: string; body: string }[];
}) {
  return (
    <ol className="relative flex flex-col">
      {steps.map((s, i) => (
        <li
          key={s.id}
          id={s.id}
          className="relative grid scroll-mt-28 gap-4 border-t border-line py-10 md:grid-cols-[6rem_1fr_14rem] md:gap-8 md:py-12"
        >
          <span className="font-mono text-sm text-lime">{String(i + 1).padStart(2, "0")}</span>
          <div className="flex flex-col gap-3">
            <h3 className="text-title font-semibold text-bone">{s.title}</h3>
            <p className="max-w-2xl text-pretty leading-relaxed text-mist">{s.body}</p>
          </div>
          <p className="eyebrow md:pt-2 md:text-right">{s.duration}</p>
        </li>
      ))}
    </ol>
  );
}
