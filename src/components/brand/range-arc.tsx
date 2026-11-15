import { cn } from "@/lib/utils";

/**
 * Abstract range-of-motion graphic: a pivot point with a measured arc.
 * Purely decorative — it represents the idea of comfortable range,
 * not any real measurement.
 */
export function RangeArc({ className }: { className?: string }) {
  const cx = 200;
  const cy = 200;
  const r = 150;
  const ticks = Array.from({ length: 37 }, (_, i) => i * 5); // 0°–180°

  const point = (deg: number, radius: number) => {
    const rad = ((180 + deg) * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)] as const;
  };

  const arcPath = (from: number, to: number, radius: number) => {
    const [x1, y1] = point(from, radius);
    const [x2, y2] = point(to, radius);
    const large = to - from > 180 ? 1 : 0;
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };

  const [ex, ey] = point(128, r - 4);

  return (
    <svg
      viewBox="0 0 400 230"
      fill="none"
      aria-hidden
      className={cn("h-auto w-full", className)}
    >
      {/* Outer guide */}
      <path d={arcPath(0, 180, r)} stroke="var(--color-line-strong)" strokeWidth="1" />
      {ticks.map((deg) => {
        const major = deg % 30 === 0;
        const [x1, y1] = point(deg, r + 6);
        const [x2, y2] = point(deg, r + (major ? 18 : 11));
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={major ? "var(--color-mist)" : "var(--color-line-strong)"}
            strokeWidth="1"
          />
        );
      })}

      {/* Inner guides */}
      <path d={arcPath(0, 180, r - 46)} stroke="var(--color-line)" strokeWidth="1" strokeDasharray="2 5" />

      {/* Highlighted range — draws in on load */}
      <path
        d={arcPath(18, 128, r - 4)}
        stroke="var(--color-lime)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="animate-draw"
        style={{ strokeDasharray: 300, ["--dash" as string]: 300 }}
      />
      <path
        d={arcPath(18, 128, r - 4)}
        stroke="var(--color-lime)"
        strokeOpacity="0.12"
        strokeWidth="18"
        strokeLinecap="round"
        className="animate-fade"
      />

      {/* Limbs */}
      <line x1={cx} y1={cy} x2={point(18, r - 4)[0]} y2={point(18, r - 4)[1]} stroke="var(--color-mist)" strokeOpacity="0.5" strokeWidth="1" />
      <line x1={cx} y1={cy} x2={ex} y2={ey} stroke="var(--color-bone)" strokeWidth="1.5" className="animate-fade" />
      <circle cx={ex} cy={ey} r="4" fill="var(--color-lime)" className="animate-fade" />

      {/* Pivot */}
      <circle cx={cx} cy={cy} r="9" stroke="var(--color-bone)" strokeWidth="1.5" fill="var(--color-ink-950)" />
      <circle cx={cx} cy={cy} r="2.5" fill="var(--color-bone)" />
      <line x1="40" y1={cy} x2="360" y2={cy} stroke="var(--color-line)" strokeWidth="1" />
    </svg>
  );
}
