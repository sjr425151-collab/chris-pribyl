import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  align?: "left" | "center";
}

/** Index-numbered section heading with a hairline rule, in the spirit of a drawing title block. */
export function SectionHeading({ eyebrow, title, lede, className, tone = "dark", as: As = "h2", align = "left" }: Props) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)} data-reveal>
      {eyebrow ? (
        <p className={cn("eyebrow mb-5 flex items-center gap-3", tone === "dark" ? "text-metal" : "text-bronze", align === "center" && "justify-center")}>
          <span aria-hidden className={cn("h-px w-8", tone === "dark" ? "bg-metal/60" : "bg-bronze/60")} />
          {eyebrow}
        </p>
      ) : null}
      <As className="text-headline font-[680]">{title}</As>
      {lede ? (
        <p className={cn("mt-5 text-lede", tone === "dark" ? "text-steel" : "text-slate")}>{lede}</p>
      ) : null}
    </div>
  );
}
