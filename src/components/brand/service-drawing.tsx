import type { ServiceDrawing as Kind } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Blueprint-style section drawings. Used where the company has no project
 * photography yet, so illustration is never mistaken for documented work.
 */
export function ServiceDrawing({ kind, className }: { kind: Kind; className?: string }) {
  return (
    <figure className={cn("blueprint relative overflow-hidden bg-charcoal-2", className)} data-reveal>
      {kind === "gutter" ? <GutterSection /> : <CoatingSection />}
      <figcaption className="eyebrow absolute bottom-4 left-4 text-steel">
        {kind === "gutter" ? "Detail: eave & seamless gutter (illustration)" : "Detail: silicone restoration system (illustration)"}
      </figcaption>
    </figure>
  );
}

const line = "draw-line fill-none stroke-sky";
const label = "fill-steel font-mono text-[11px] uppercase tracking-[0.14em]";

function Leader({ x1, y1, x2, y2, d = 0 }: { x1: number; y1: number; x2: number; y2: number; d?: number }) {
  return (
    <>
      <path pathLength={1} className="draw-line fill-none stroke-metal" strokeWidth="1" d={`M${x1} ${y1} L${x2} ${y2}`} style={{ "--d": d } as React.CSSProperties} />
      <circle cx={x1} cy={y1} r="2.5" className="fill-metal" />
    </>
  );
}

function GutterSection() {
  return (
    <svg viewBox="0 0 640 440" role="img" aria-label="Illustrated cross-section of a roof edge with a seamless gutter, guard and downspout carrying water away from the foundation" className="h-full w-full">
      {/* roof deck + shingles */}
      <path pathLength={1} className={line} strokeWidth="2" d="M40 90 L360 210" />
      <path pathLength={1} className={line} strokeWidth="1.2" d="M40 104 L352 221" style={{ "--d": 1 } as React.CSSProperties} />
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={i} pathLength={1} className={line} strokeWidth="1" d={`M${70 + i * 32} ${101 + i * 12} l10 -14`} style={{ "--d": 2 } as React.CSSProperties} />
      ))}
      {/* fascia + rafter tail */}
      <path pathLength={1} className={line} strokeWidth="2" d="M352 214 L352 280 L330 280" style={{ "--d": 2 } as React.CSSProperties} />
      {/* drip edge */}
      <path pathLength={1} className={line} strokeWidth="1.6" d="M346 206 L368 214 L368 232" style={{ "--d": 3 } as React.CSSProperties} />
      {/* K-style gutter */}
      <path pathLength={1} className={line} strokeWidth="2.4" d="M356 226 L356 300 Q356 314 370 314 L438 314 Q448 314 450 302 L456 262 L448 256 L452 226" style={{ "--d": 3 } as React.CSSProperties} />
      {/* guard */}
      <path pathLength={1} className="draw-line fill-none stroke-metal" strokeWidth="1.6" strokeDasharray="1" d="M362 222 L452 228" style={{ "--d": 4 } as React.CSSProperties} />
      {/* water */}
      <path pathLength={1} className="draw-line fill-none stroke-blue" strokeWidth="6" strokeLinecap="round" d="M366 300 L440 300" style={{ "--d": 5 } as React.CSSProperties} />
      {/* downspout */}
      <path pathLength={1} className={line} strokeWidth="2" d="M392 314 L392 380 Q392 396 408 396 L520 396" style={{ "--d": 5 } as React.CSSProperties} />
      <path pathLength={1} className={line} strokeWidth="2" d="M412 314 L412 372 Q412 378 420 378 L520 378" style={{ "--d": 5 } as React.CSSProperties} />
      <path pathLength={1} className="draw-line fill-none stroke-blue" strokeWidth="2" d="M530 387 l50 0 m-10 -8 l10 8 l-10 8" style={{ "--d": 6 } as React.CSSProperties} />
      {/* ground / foundation */}
      <path pathLength={1} className="draw-line fill-none stroke-steel/50" strokeWidth="1" d="M40 410 L620 410 M330 280 L330 410" style={{ "--d": 1 } as React.CSSProperties} />

      <Leader x1={200} y1={142} x2={200} y2={60} d={3} />
      <text x="206" y="58" className={label}>Roof</text>
      <Leader x1={364} y1={214} x2={470} y2={170} d={4} />
      <text x="476" y="168" className={label}>Drip edge</text>
      <Leader x1={420} y1={226} x2={500} y2={210} d={4} />
      <text x="506" y="208" className={label}>Leaf guard</text>
      <Leader x1={452} y1={290} x2={510} y2={276} d={5} />
      <text x="516" y="274" className={label}>Seamless gutter</text>
      <Leader x1={352} y1={250} x2={260} y2={270} d={5} />
      <text x="172" y="290" className={label}>Fascia</text>
      <text x="470" y="430" className={label}>Away from foundation</text>
    </svg>
  );
}

function CoatingSection() {
  const ribs = Array.from({ length: 8 });
  return (
    <svg viewBox="0 0 640 440" role="img" aria-label="Illustrated cross-section of an existing metal roof with surface preparation and a seamless silicone membrane holding up under ponding water" className="h-full w-full">
      {/* existing corrugated panel */}
      <path
        pathLength={1}
        className={line}
        strokeWidth="2"
        d={`M40 300 ${ribs.map((_, i) => `L${80 + i * 70} 300 L${95 + i * 70} 270 L${115 + i * 70} 270 L${130 + i * 70} 300`).join(" ")} L620 300`}
      />
      {/* prep / primer */}
      <path
        pathLength={1}
        className="draw-line fill-none stroke-metal"
        strokeWidth="1.2"
        strokeDasharray="1"
        d={`M40 292 ${ribs.map((_, i) => `L${80 + i * 70} 292 L${95 + i * 70} 262 L${115 + i * 70} 262 L${130 + i * 70} 292`).join(" ")} L620 292`}
        style={{ "--d": 2 } as React.CSSProperties}
      />
      {/* silicone membrane */}
      <path
        pathLength={1}
        className="draw-line fill-none stroke-paper"
        strokeWidth="3.5"
        strokeLinejoin="round"
        d={`M40 284 ${ribs.map((_, i) => `L${80 + i * 70} 284 L${95 + i * 70} 254 L${115 + i * 70} 254 L${130 + i * 70} 284`).join(" ")} L620 284`}
        style={{ "--d": 4 } as React.CSSProperties}
      />
      {/* ponding water */}
      <path pathLength={1} className="draw-line fill-none stroke-blue" strokeWidth="5" strokeLinecap="round" d="M270 279 L322 279 M340 279 L392 279" style={{ "--d": 6 } as React.CSSProperties} />
      {/* rain */}
      {Array.from({ length: 10 }).map((_, i) => (
        <path key={i} pathLength={1} className="draw-line fill-none stroke-sky/60" strokeWidth="1.2" d={`M${90 + i * 52} ${90 + (i % 3) * 14} l-10 26`} style={{ "--d": 7 } as React.CSSProperties} />
      ))}
      {/* deck */}
      <path pathLength={1} className="draw-line fill-none stroke-steel/50" strokeWidth="1" d="M40 340 L620 340" style={{ "--d": 1 } as React.CSSProperties} />

      <Leader x1={150} y1={300} x2={150} y2={380} d={3} />
      <text x="156" y="392" className={label}>Existing roof</text>
      <Leader x1={322} y1={262} x2={322} y2={200} d={4} />
      <text x="240" y="190" className={label}>Surface preparation</text>
      <Leader x1={470} y1={254} x2={470} y2={170} d={5} />
      <text x="400" y="160" className={label}>Seamless silicone membrane</text>
      <Leader x1={360} y1={279} x2={420} y2={380} d={6} />
      <text x="426" y="392" className={label}>Ponding water</text>
    </svg>
  );
}
