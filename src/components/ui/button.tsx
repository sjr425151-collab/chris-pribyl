import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium tracking-[-0.005em] transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-out-soft active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-blue text-white shadow-[0_10px_30px_-12px_rgb(48_77_160/0.8)] hover:bg-blue-hover",
        light: "bg-paper text-charcoal hover:bg-white",
        outline: "border border-line-dark-strong text-paper hover:border-paper/60 hover:bg-white/[0.06]",
        "outline-ink": "border border-line-light-strong text-charcoal hover:border-charcoal/60 hover:bg-charcoal/[0.04]",
        ghost: "text-paper hover:bg-white/[0.06]",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.95rem]",
        lg: "h-14 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/** Arrow that nudges on hover of the parent button/link */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className={cn("transition-transform duration-300 ease-out-soft group-hover/btn:translate-x-0.5 group-hover:translate-x-0.5", className)}
    >
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M5.6 2.2 4.1 1.5 1.8 3.8c-.3 3.3 1.2 6.2 3.6 8.6 2.4 2.4 5.3 3.9 8.6 3.6l2.3-2.3-.7-1.5-2.9-1.2-1.6 1.4C8.3 11.6 6.4 9.7 5.6 8.9l1.4-1.6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
