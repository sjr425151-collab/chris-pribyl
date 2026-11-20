import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowIcon } from "@/components/ui/button";
import { ChapterLabel, EstimateBand, PageHero } from "@/components/sections/sections";
import { business } from "@/content/business";
import { communities, counties } from "@/content/service-areas";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Service Areas: Monroe County & Southeast Michigan",
  description:
    "Dynamic Construction MI serves Carleton, New Boston, Monroe, Newport, Maybee, Ida, Dundee, Temperance, Milan and communities across Monroe, Wayne, Lenawee and Oakland counties.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Service areas"
        title="Based in Carleton. Building across Southeast Michigan."
        lede={`From our home base at ${business.address.street} in ${business.address.city}, we serve homes, farms and businesses across ${counties.join(", ")}.`}
        breadcrumbs={<Breadcrumbs items={[{ name: "Service Areas", path: "/service-areas" }]} />}
      />

      <section aria-labelledby="counties-title" className="bg-charcoal pb-20 md:pb-28">
        <div className="container-x">
          <h2 id="counties-title" className="sr-only">
            Counties served
          </h2>
          <ul className="grid grid-cols-2 border-t border-line-dark-strong md:grid-cols-4" data-reveal-group>
            {counties.map((c) => (
              <li key={c} className="border-b border-line-dark py-6 pr-4 font-display text-title font-[650]" data-reveal>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="communities-title" className="theme-paper py-20 md:py-32">
        <div className="container-x">
          <ChapterLabel index="01" label="Communities" tone="light" />
          <h2 id="communities-title" className="mt-6 max-w-3xl text-headline font-[700]" data-reveal>
            Where we work most often
          </h2>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line-light bg-line-light sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {communities.map((c) => (
              <li key={c.slug} id={c.slug} className="scroll-mt-24 bg-paper p-7 md:p-8" data-reveal>
                <p className="eyebrow text-bronze">{c.county}</p>
                <h3 className="mt-3 text-title font-[680]">{c.name}, MI</h3>
                <p className="mt-3 text-slate">{c.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-slate" data-reveal>
            Don&apos;t see your town? We regularly work in surrounding communities too.{" "}
            <Link href="/contact" className="font-medium text-charcoal underline underline-offset-2">
              Ask about your location
            </Link>{" "}
            or call{" "}
            <a href={business.phone.href} className="font-medium text-charcoal underline underline-offset-2">
              {business.phone.display}
            </a>
            .
          </p>
        </div>
      </section>

      <section aria-labelledby="popular-title" className="bg-charcoal py-20">
        <div className="container-x">
          <h2 id="popular-title" className="eyebrow text-metal">
            Popular services in the area
          </h2>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line-dark bg-line-dark md:grid-cols-3">
            {[
              ["Pole barns in Monroe County", "/services/pole-barns"],
              ["Roof replacement in New Boston & Monroe", "/services/roof-replacement"],
              ["Seamless gutters in Monroe County", "/services/gutters"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="group flex h-full items-center justify-between gap-4 bg-charcoal p-7 transition-colors hover:bg-graphite">
                  <span className="text-title font-[620]">{label}</span>
                  <ArrowIcon className="size-5" />
                </Link>
              </li>
            ))}
          </ul>
          <a href={business.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-steel underline underline-offset-4 hover:text-paper">
            View our location on Google Maps
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>
      <EstimateBand />
    </>
  );
}
