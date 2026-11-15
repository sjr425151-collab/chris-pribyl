import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.005em] transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-soft disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-lime text-lime-ink hover:bg-lime-hover hover:shadow-glow active:translate-y-px",
        secondary:
          "border border-line-strong bg-transparent text-bone hover:border-mist hover:bg-white/[0.03]",
        ghost: "text-mist hover:bg-white/[0.04] hover:text-bone",
        link: "rounded-none px-0 text-bone underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.95rem]",
        lg: "h-13 px-7 text-base",
        icon: "size-10",
      },
    },
    compoundVariants: [{ variant: "link", class: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render the child element (e.g. a Next.js <Link>) with button styles. */
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
