import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  body: string;
  icon?: LucideIcon;
  meta?: string;
  className?: string;
}

export function FeatureCard({ title, body, icon: Icon, meta, className }: FeatureCardProps) {
  return (
    <Card className={cn("group flex flex-col gap-6 p-6 hover:border-line-strong md:p-7", className)}>
      {Icon || meta ? (
        <div className="flex items-center justify-between">
          {Icon ? (
            <span className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-bone transition-colors duration-300 group-hover:border-lime/50 group-hover:text-lime">
              <Icon aria-hidden className="size-[1.1rem]" strokeWidth={1.6} />
            </span>
          ) : (
            <span />
          )}
          {meta ? <span className="eyebrow text-dim">{meta}</span> : null}
        </div>
      ) : null}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-lg font-semibold tracking-[-0.015em] text-bone">{title}</h3>
        <p className="text-[0.95rem] leading-relaxed text-mist">{body}</p>
      </div>
    </Card>
  );
}
