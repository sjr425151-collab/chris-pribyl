import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoFrameProps {
  /** Art direction for the photograph that will replace this placeholder. */
  shot: string;
  /** Short label, e.g. the movement shown. */
  label?: string;
  className?: string;
  /** Tailwind aspect class, e.g. "aspect-[4/5]". */
  aspect?: string;
  children?: React.ReactNode;
  tone?: "warm" | "cool";
}

/**
 * Placeholder for commissioned editorial photography of real adults
 * performing mobility, balance and strength work.
 *
 * It is deliberately honest: it shows the intended shot as a caption rather
 * than a stock image or AI-generated person. Swap for `next/image` once
 * licensed photography is available.
 */
export function PhotoFrame({
  shot,
  label,
  className,
  aspect = "aspect-[4/5]",
  tone = "warm",
  children,
}: PhotoFrameProps) {
  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-xl border border-line bg-ink-850",
        aspect,
        className,
      )}
    >
      {/* Soft light falloff, like a studio key light */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10",
          tone === "warm"
            ? "bg-[radial-gradient(120%_80%_at_75%_15%,rgb(243_240_233/0.10),transparent_55%),radial-gradient(90%_70%_at_10%_100%,rgb(201_242_77/0.05),transparent_60%)]"
            : "bg-[radial-gradient(110%_80%_at_20%_10%,rgb(166_163_156/0.12),transparent_55%)]",
        )}
      />
      <div aria-hidden className="grain absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay" />

      {/* Crop marks */}
      <span aria-hidden className="absolute left-4 top-4 size-3 border-l border-t border-mist/40" />
      <span aria-hidden className="absolute right-4 top-4 size-3 border-r border-t border-mist/40" />
      <span aria-hidden className="absolute bottom-4 left-4 size-3 border-b border-l border-mist/40" />
      <span aria-hidden className="absolute bottom-4 right-4 size-3 border-b border-r border-mist/40" />

      {children}

      <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-ink-950/90 via-ink-950/50 to-transparent p-5 pt-16 md:p-6 md:pt-20">
        <span className="eyebrow flex items-center gap-2 text-dim">
          <Camera aria-hidden className="size-3.5" />
          Photography placeholder
        </span>
        {label ? <span className="text-sm font-medium text-bone">{label}</span> : null}
        <span className="max-w-sm text-xs leading-relaxed text-mist">{shot}</span>
      </figcaption>
    </figure>
  );
}
