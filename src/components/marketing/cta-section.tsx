import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RangeArc } from "@/components/brand/range-arc";
import { Button } from "@/components/ui/button";
import { photos, type PhotoKey } from "@/content/media";

interface CtaSectionProps {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Optional full-bleed background photo. The subject should sit on the right. */
  photo?: PhotoKey;
}

export function CtaSection({ title, body, primary, secondary, photo }: CtaSectionProps) {
  const bg = photo ? photos[photo] : null;
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-xl border border-line bg-ink-900 px-6 py-16 md:px-16 md:py-28">
          {bg ? (
            <>
              <Image
                src={bg.src}
                alt=""
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                placeholder="blur"
                className="-z-20 object-cover opacity-70 md:opacity-100"
                style={{ objectPosition: bg.position ?? "center" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/0 max-md:bg-ink-950/60"
              />
            </>
          ) : (
            <RangeArc className="pointer-events-none absolute -right-24 -bottom-10 -z-10 w-[34rem] opacity-40 md:-right-10 md:w-[42rem]" />
          )}
          <div className="flex max-w-xl flex-col gap-6">
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
                <Button asChild size="lg" variant="secondary" className="bg-ink-950/40 backdrop-blur">
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
