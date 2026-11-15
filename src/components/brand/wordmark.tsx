import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * PLACEHOLDER WORDMARK — typographic only, pending the approved KINFORM logo.
 * Replace the contents of this component when the final logo is delivered;
 * every page uses it, so no other file needs to change.
 */
export function Wordmark({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      aria-label="KINFORM — home"
      className={cn("group inline-flex items-center gap-2.5 text-bone", className)}
    >
      <span
        aria-hidden
        className="relative block size-[0.9rem] rounded-[3px] border-[1.5px] border-bone transition-colors duration-500 group-hover:border-lime"
      >
        <span className="absolute inset-x-[2px] bottom-[2px] h-[3px] rounded-[1px] bg-lime" />
      </span>
      <span className="text-[0.95rem] font-semibold leading-none tracking-[0.34em]">KINFORM</span>
    </Link>
  );
}
