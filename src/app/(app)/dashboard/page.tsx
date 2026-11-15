import type { Metadata } from "next";
import { LineChart, Play } from "lucide-react";
import { Panel, SampleTag } from "@/components/dashboard/panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  sampleMoments,
  samplePriorities,
  sampleToday,
  sampleUser,
  sampleWeek,
} from "@/content/dashboard-sample";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard (concept)",
  robots: { index: false },
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 px-5 py-8 md:px-8 md:py-10">
      <div className="flex flex-col gap-2">
        <p className="eyebrow">
          Week {sampleToday.week} · Day {sampleToday.day}
        </p>
        <h1 className="text-headline font-semibold text-bone">Welcome back, {sampleUser.firstName}.</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Today's workout */}
        <Panel id="today" title="Today’s session" aside={<SampleTag />}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-1.5">
                <p className="text-title font-semibold text-bone">{sampleToday.title}</p>
                <p className="text-sm text-mist">About {sampleToday.minutes} minutes · No equipment</p>
              </div>
              <Button disabled aria-describedby="session-note" className="self-start sm:self-auto">
                <Play aria-hidden fill="currentColor" /> Start session
              </Button>
            </div>
            <p id="session-note" className="sr-only">
              Sessions become available once accounts launch.
            </p>
            <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {sampleToday.blocks.map((b, i) => (
                <li key={b.label} className="flex flex-col gap-3 bg-ink-850 p-4">
                  <span className={cn("eyebrow text-[0.62rem]", i === 1 ? "text-lime" : "text-dim")}>
                    {String(i + 1).padStart(2, "0")} · {b.label}
                  </span>
                  <ul className="flex flex-col gap-1.5">
                    {b.items.map((item) => (
                      <li key={item} className="text-sm leading-snug text-bone/90">
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </Panel>

        {/* Movement Moments */}
        <Panel id="moments" title="Movement Moments" aside={<SampleTag />}>
          <ul className="flex flex-col gap-1.5">
            {sampleMoments.map((m, i) => (
              <li key={m.title} className="flex items-center gap-4 rounded-md bg-ink-850 px-4 py-3">
                <span className="font-mono text-xs text-dim">{m.time}</span>
                <span className="flex-1 text-sm text-bone">{m.title}</span>
                <span className="font-mono text-xs text-mist">{m.minutes}m</span>
                <span
                  aria-hidden
                  className={cn(
                    "size-2 rounded-full",
                    i === 0 ? "bg-lime" : "border border-line-strong",
                  )}
                />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Weekly schedule */}
      <Panel id="week" title="This week" aside={<SampleTag />}>
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {sampleWeek.map((d) => {
            const isToday = "today" in d && d.today;
            return (
              <li
                key={d.day}
                aria-current={isToday ? "date" : undefined}
                className={cn(
                  "flex min-h-28 flex-col justify-between gap-4 rounded-lg border p-4",
                  isToday ? "border-lime/40 bg-lime/[0.05]" : "border-line bg-ink-850",
                )}
              >
                <span className={cn("font-mono text-xs", isToday ? "text-lime" : "text-dim")}>
                  {d.day}
                  {isToday ? " · Today" : ""}
                </span>
                <span
                  className={cn(
                    "text-sm leading-snug",
                    d.type === "session" ? "text-bone" : "text-mist",
                  )}
                >
                  {d.focus}
                </span>
              </li>
            );
          })}
        </ol>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Progress tracking — deliberately empty: no fabricated results */}
        <Panel id="progress" title="Progress">
          <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-line-strong px-6 py-14 text-center">
            <span className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-mist">
              <LineChart aria-hidden className="size-5" strokeWidth={1.6} />
            </span>
            <p className="font-medium text-bone">Your baseline appears after your first assessment.</p>
            <p className="max-w-md text-sm leading-relaxed text-mist">
              Mobility, balance and strength tests are compared at each four-week reassessment,
              alongside your weekly check-ins on stiffness and energy.
            </p>
          </div>
          <ol className="mt-6 grid grid-cols-4 gap-2" aria-label="Reassessment timeline">
            {["Assessment", "Week 4", "Week 8", "Week 12"].map((label, i) => (
              <li key={label} className="flex flex-col gap-2">
                <span className={cn("h-1 rounded-full", i === 0 ? "bg-lime" : "bg-line-strong")} />
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-dim">{label}</span>
              </li>
            ))}
          </ol>
        </Panel>

        {/* Current training priorities */}
        <Panel id="priorities" title="Current priorities" aside={<SampleTag />}>
          <ul className="flex flex-col">
            {samplePriorities.map((p) => (
              <li key={p.area} className="flex flex-col gap-2 border-t border-line py-4 first:border-t-0 first:pt-0">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-bone">{p.area}</span>
                  <Badge tone={p.level === "Primary" ? "accent" : "neutral"}>{p.level}</Badge>
                </div>
                <p className="text-sm leading-relaxed text-mist">{p.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-dim">
            Priorities are training focuses based on movement observations — not diagnoses.
          </p>
        </Panel>
      </div>
    </div>
  );
}
