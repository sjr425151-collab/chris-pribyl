import { assessmentAreas } from "@/content/assessment";
import { cn } from "@/lib/utils";

const categoryLabel: Record<string, string> = {
  mobility: "Mobility",
  movement_quality: "Movement quality",
  balance_stability: "Balance & stability",
  strength: "Strength",
  self_report: "Self-reported",
};

/**
 * The assessment areas, in product-priority order (mobility first).
 * `detailed` adds the example test for each area.
 */
export function AssessmentAreas({ detailed = false }: { detailed?: boolean }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {assessmentAreas.map((area, i) => (
        <li
          key={area.id}
          className={cn(
            "group flex flex-col gap-5 bg-ink-900 p-6 transition-colors duration-300 hover:bg-ink-850 md:p-7",
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
            <span
              className={cn(
                "eyebrow text-[0.65rem]",
                area.category === "mobility" ? "text-lime" : "text-dim",
              )}
            >
              {categoryLabel[area.category]}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold tracking-[-0.015em] text-bone">{area.name}</h3>
            <p className="text-[0.95rem] leading-relaxed text-mist">{area.summary}</p>
          </div>
          {detailed ? (
            <p className="mt-auto border-t border-line pt-4 text-sm text-dim">
              <span className="text-mist">Example: </span>
              {area.example}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
