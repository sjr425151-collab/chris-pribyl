import Link from "next/link";
import { Photo } from "@/components/ui/photo";
import { ArrowIcon, PhoneIcon, buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Estimate } from "@/components/forms/estimate-section";
import { business, reviewSummary, visibleClaims, type ClaimId } from "@/content/business";
import { sponsorships } from "@/content/community";
import { testimonials } from "@/content/testimonials";
import type { PhotoKey } from "@/content/media";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------------- */

export function ChapterLabel({ index, label, tone = "dark" }: { index: string; label: string; tone?: "dark" | "light" }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", tone === "dark" ? "text-metal" : "text-bronze")} data-reveal>
      <span aria-hidden className={tone === "dark" ? "text-paper" : "text-charcoal"}>
        {index}
      </span>
      <span aria-hidden className={cn("h-px w-8", tone === "dark" ? "bg-metal/60" : "bg-bronze/60")} />
      {label}
    </p>
  );
}

/* ------------------------------------------------------------------------- */

export function RoofingCredentials() {
  const rows = visibleClaims(["owensCorning", "warranty50", "oneDay", "gaco", "lomanco", "cleanup"]);
  return (
    <section aria-labelledby="roofing-title" className="theme-graphite relative overflow-hidden py-24 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <ChapterLabel index="05" label="Roofing expertise" />
            <h2 id="roofing-title" className="mt-6 text-display font-[720]" data-reveal style={{ fontVariationSettings: '"wdth" 112' }}>
              A roof is a system, not a patch.
            </h2>
            <p className="mt-6 text-lede text-steel" data-reveal>
              Decking, underlayment, shingles, flashing and ventilation all have to work together. Our roofing work is built around that, with the credentials to back it
              up.
            </p>
            <div className="mt-10 overflow-hidden rounded-2xl" data-reveal>
              <Photo name="roof-drone-wide" sizes="(min-width: 1024px) 38vw, 100vw" className="aspect-[4/3]" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ol className="border-t border-line-dark-strong" data-reveal-group>
            {rows.map((c, i) => (
              <li key={c.label} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line-dark py-8 md:grid-cols-[4rem_1fr] md:py-10" data-reveal>
                <span aria-hidden className="eyebrow pt-1.5 text-metal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-title font-[650]">{c.label}</h3>
                  <p className="mt-3 max-w-xl text-steel">{c.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal>
            <Link href="/services/roof-replacement" className={buttonVariants({ variant: "light" })}>
              Roof replacement
              <ArrowIcon />
            </Link>
            <Link href="/services/roof-restoration" className={buttonVariants({ variant: "outline" })}>
              GACO roof restoration
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------- */

export function Process({
  index = "04",
  steps,
  photo = "roof-installer-harness",
}: {
  index?: string;
  steps?: { title: string; body: string }[];
  photo?: PhotoKey;
}) {
  const claimsShown = visibleClaims(["familyOwned", "freeEstimates", "permits"]);
  const list = steps ?? [
    { title: "Free estimate", body: "We come out, inspect, measure and listen. Estimates and inspections are free." },
    { title: "Written plan", body: "A detailed written estimate, with materials and colors chosen together and financing options if you want them." },
    { title: "Build", body: "Our crew does the work with clear timelines and communication along the way. Permits are handled for you." },
    { title: "Clean finish", body: "Debris hauled off and nails swept with magnets. We leave the site the way we'd want ours left." },
  ];
  return (
    <section aria-labelledby="craft-title" className="theme-paper py-24 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-5">
          <div className="overflow-hidden rounded-2xl" data-reveal>
            <Photo name={photo} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5]" />
          </div>
          <p className="eyebrow mt-4 text-slate">On the job, Southeast Michigan</p>
        </div>
        <div className="lg:col-span-7 lg:pl-6">
          <ChapterLabel index={index} label="How we work" tone="light" />
          <h2 id="craft-title" className="mt-6 text-display font-[720]" data-reveal style={{ fontVariationSettings: '"wdth" 112' }}>
            Hands-on. Straightforward. Done right.
          </h2>
          <p className="mt-6 max-w-2xl text-lede text-slate" data-reveal>
            {claimsShown.length ? "A local, family-owned company " : "A local company "}
            that takes pride in showing up when we say we will, doing the job right, and standing behind solid work.
          </p>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line-light bg-line-light sm:grid-cols-2" data-reveal-group>
            {list.map((s, i) => (
              <li key={s.title} className="bg-paper p-7 md:p-8" data-reveal>
                <span aria-hidden className="display-wide text-[2.5rem] leading-none text-blue/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-title font-[650]">{s.title}</h3>
                <p className="mt-3 text-slate">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------- */

export function ReviewsBlock({ index = "06", tone = "dark", headingLevel = "h2" }: { index?: string; tone?: "dark" | "light"; headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  const light = tone === "light";
  const platforms = [
    { label: "Google reviews", href: business.googleReviewsUrl },
    { label: "Facebook", href: business.social.facebook },
    { label: "Yelp", href: business.social.yelp },
  ];
  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <ChapterLabel index={index} label="Reviews" tone={tone} />
          <H className="mt-6 text-display font-[720]" data-reveal style={{ fontVariationSettings: '"wdth" 112' }}>
            Hear it from your neighbors.
          </H>
        </div>
        <div className="lg:col-span-6 lg:pt-14">
          <p className={cn("text-lede", light ? "text-slate" : "text-steel")} data-reveal>
            {reviewSummary.rating && reviewSummary.count
              ? `Rated ${reviewSummary.rating} out of 5 across ${reviewSummary.count} reviews on ${reviewSummary.source}${reviewSummary.asOf ? ` (as of ${reviewSummary.asOf})` : ""}. `
              : ""}
            Homeowners, farmers and business owners across Monroe County have shared their experiences. Read them in their own words, on the platforms where they wrote them.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3" data-reveal>
            {platforms.map((p) => (
              <li key={p.label}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: light ? "outline-ink" : "outline" })}>
                  {p.label}
                  <ArrowIcon className="-rotate-45" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {testimonials.length ? (
        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
          {testimonials.map((t) => (
            <li key={t.quote.slice(0, 40)} data-reveal>
              <figure className={cn("flex h-full flex-col rounded-2xl border p-8", light ? "border-line-light bg-white" : "border-line-dark bg-graphite")}>
                <span aria-hidden className="font-display text-6xl leading-none text-blue">
                  “
                </span>
                <blockquote className="mt-2 flex-1 text-lede">{t.quote}</blockquote>
                <figcaption className={cn("mt-8 text-sm", light ? "text-slate" : "text-steel")}>
                  <span className={cn("font-medium", light ? "text-charcoal" : "text-paper")}>{t.author}</span>
                  {t.project ? ` · ${t.project}` : ""} ·{" "}
                  {t.url ? (
                    <a href={t.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                      {t.source}
                    </a>
                  ) : (
                    t.source
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------------- */

export function Community({ index = "07" }: { index?: string }) {
  const youth = sponsorships.filter((s) => s.kind === "youth-baseball");
  const rest = sponsorships.filter((s) => s.kind !== "youth-baseball");
  return (
    <section aria-labelledby="community-title" className="theme-paper border-t border-line-light py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ChapterLabel index={index} label="Community" tone="light" />
          <h2 id="community-title" className="mt-6 text-headline font-[700]" data-reveal>
            Rooted here. Proud to support the teams and people who make it home.
          </h2>
          <p className="mt-6 text-slate" data-reveal>
            Dynamic Construction MI sponsors youth baseball leagues, high school teams and community organizations across Monroe and Wayne counties.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7" data-reveal>
          <div>
            <h3 className="eyebrow mb-4 text-bronze">Youth baseball</h3>
            <ul className="divide-y divide-line-light border-y border-line-light">
              {youth.map((s) => (
                <li key={s.name} className="py-2.5 text-[0.95rem]">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-4 text-bronze">Schools &amp; community</h3>
            <ul className="divide-y divide-line-light border-y border-line-light">
              {rest.map((s) => (
                <li key={s.name} className="py-2.5 text-[0.95rem]">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------- */

export function EstimateBand({
  index,
  title = "Let’s talk about your project.",
  defaultService,
  id = "estimate",
}: {
  index?: string;
  title?: string;
  defaultService?: string;
  id?: string;
}) {
  const reassurance = visibleClaims(["freeEstimates", "financing", "emergency"]);
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative scroll-mt-20 overflow-hidden bg-charcoal py-24 md:py-36">
      <div aria-hidden className="blueprint absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          {index ? <ChapterLabel index={index} label="Request an estimate" /> : null}
          <h2 id={`${id}-title`} className="mt-6 text-display font-[740]" data-reveal style={{ fontVariationSettings: '"wdth" 112' }}>
            {title}
          </h2>
          <p className="mt-6 text-lede text-steel" data-reveal>
            Tell us a little about what you&apos;re planning. We&apos;ll follow up to talk it through and set up a time to see the site.
          </p>
          <ul className="mt-10 space-y-3" data-reveal>
            {reassurance.map((c) => (
              <li key={c.label} className="flex items-center gap-3 text-paper/90">
                <span aria-hidden className="size-1.5 rotate-45 bg-metal" />
                {c.label}
              </li>
            ))}
          </ul>
          <div className="mt-10 border-t border-line-dark pt-8" data-reveal>
            <p className="eyebrow text-metal">Call the office</p>
            <a
              href={business.phone.href}
              data-track-location="estimate-band"
              className="mt-3 inline-flex items-center gap-3 font-display text-headline font-[680] transition-colors hover:text-sky"
            >
              <PhoneIcon className="size-6 text-metal" />
              {business.phone.display}
            </a>
            <p className="mt-2 text-sm text-steel">Monday – Friday, 8 am – 4 pm · Emergency service available</p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-line-dark-strong bg-graphite/70 p-6 backdrop-blur sm:p-8 md:p-10">
            <Estimate defaultService={defaultService} idPrefix={id} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------- */

export function FaqList({ faqs, tone = "light" }: { faqs: { q: string; a: string }[]; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <div className={cn("border-t", light ? "border-line-light-strong" : "border-line-dark-strong")}>
      {faqs.map((f) => (
        <details key={f.q} className={cn("group border-b", light ? "border-line-light" : "border-line-dark")}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left text-[1.08rem] font-medium [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden
              className={cn(
                "relative mt-1 size-5 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-px before:w-5 before:bg-current after:absolute after:top-0 after:left-1/2 after:h-5 after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0",
                light ? "text-bronze" : "text-metal",
              )}
            />
          </summary>
          <p className={cn("max-w-3xl pb-7 text-[1.02rem] leading-relaxed", light ? "text-slate" : "text-steel")}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------- */

export function ClaimList({ ids, tone = "dark", className }: { ids: ClaimId[]; tone?: "dark" | "light"; className?: string }) {
  const list = visibleClaims(ids);
  if (!list.length) return null;
  return (
    <ul className={cn("grid gap-x-8 gap-y-3 sm:grid-cols-2", className)}>
      {list.map((c) => (
        <li key={c.label} className="flex items-start gap-3">
          <svg aria-hidden viewBox="0 0 16 16" className={cn("mt-1 size-4 shrink-0", tone === "dark" ? "text-metal" : "text-blue")}>
            <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          <span>{c.label}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------------- */

/** Inner-page hero: photo or blueprint drawing, breadcrumb, title. */
export function PageHero({
  eyebrow,
  title,
  lede,
  photo,
  children,
  breadcrumbs,
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  photo?: PhotoKey;
  children?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-charcoal", compact ? "pt-36 pb-16 md:pt-44 md:pb-20" : "flex min-h-[78svh] items-end pt-36 pb-16 md:min-h-[86svh] md:pb-24")}>
      {photo ? (
        <>
          <Photo name={photo} sizes="100vw" preload className="hero-image absolute inset-0 -z-20 h-full w-full" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/20" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/80 via-charcoal/25 to-transparent" />
        </>
      ) : (
        <div aria-hidden className="blueprint absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_75%)]" />
      )}
      <div className="container-x w-full">
        {breadcrumbs}
        <p className="hero-fade eyebrow mt-8 flex items-center gap-3 text-metal">
          <span aria-hidden className="h-px w-10 bg-metal/70" />
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-5xl text-display font-[750]" style={{ fontVariationSettings: '"wdth" 112' }}>
          <span className="line-mask hero-line">
            <span>{title}</span>
          </span>
        </h1>
        {lede ? (
          <p className="hero-fade mt-6 max-w-2xl text-lede text-paper/85" style={{ "--i": 1 } as React.CSSProperties}>
            {lede}
          </p>
        ) : null}
        {children ? (
          <div className="hero-fade mt-9" style={{ "--i": 2 } as React.CSSProperties}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
