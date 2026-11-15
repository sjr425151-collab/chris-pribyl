import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.68rem] uppercase leading-none tracking-[0.12em]",
  {
    variants: {
      tone: {
        neutral: "border-line-strong text-mist",
        accent: "border-lime/40 bg-lime/[0.07] text-lime",
        caution: "border-caution/40 bg-caution/[0.07] text-caution",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
