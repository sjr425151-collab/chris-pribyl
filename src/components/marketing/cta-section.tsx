import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RangeArc } from "@/components/brand/range-arc";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function CtaSection({ title, body, primary, secondary }: CtaSectionProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-xl border border-line bg-ink-900 px-6 py-16 md:px-16 md:py-24">
          <RangeArc className="pointer-events-none absolute -right-24 -bottom-10 -z-10 w-[34rem] opacity-40 md:-right-10 md:w-[42rem]" />
          <div className="flex max-w-2xl flex-col gap-6">
            <h2 className="text-balance text-headline font-semibold text-bone">{title}</h2>
            <p className="text-pretty text-lg leading-relaxed text-mist">{body}</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={primary.href}>
                  {primary.label}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              {secondary ? (
                <Button asChild size="lg" variant="secondary">
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
