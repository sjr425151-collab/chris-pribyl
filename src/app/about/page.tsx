import Link from "next/link";
import type { Metadata } from "next";
import { Photo } from "@/components/ui/photo";
import { ArrowIcon, buttonVariants } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ChapterLabel, ClaimList, Community, EstimateBand, PageHero } from "@/components/sections/sections";
import { business, getClaim } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Dynamic Construction MI | Family-Owned Since 2008",
  description:
    "Dynamic Construction MI is a family-owned builder and roofing company in Carleton, Michigan, established in 2008 and serving residential and commercial clients across Monroe County.",
  path: "/about",
});

const values = [
  { title: "Show up when we say we will", body: "Dependability is the first thing a customer notices and the easiest thing to lose. We protect it." },
  { title: "Communicate clearly", body: "Clear timelines and straight answers, from the first estimate to the final clean-up." },
  { title: "Stand behind the work", body: "Solid work we stand by, whether it's a small repair or a large pole barn." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A family business that builds like it’s our own property."
        lede={`Established in ${business.founded} in Carleton, Michigan. Pole barns, roofs and exterior work for homes, farms and businesses across Monroe County.`}
        photo="barn-black-porch-side"
        breadcrumbs={<Breadcrumbs items={[{ name: "About", path: "/about" }]} />}
      />

      <section aria-labelledby="story-title" className="theme-paper py-20 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ChapterLabel index="01" label="Our story" tone="light" />
            <dl className="mt-10 space-y-6" data-reveal>
              <div>
                <dt className="eyebrow text-bronze">Established</dt>
                <dd className="display-wide mt-2 text-5xl">{business.founded}</dd>
              </div>
              <div>
                <dt className="eyebrow text-bronze">Based in</dt>
                <dd className="mt-2 text-title font-[650]">
                  {business.address.city}, Michigan
                </dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-8">
            <h2 id="story-title" className="text-headline font-[700]" data-reveal>
              No pole barn job too big or too small.
            </h2>
            <div className="mt-8 space-y-5 text-lede text-slate" data-reveal>
              <p>
                {getClaim("familyOwned") ? "Family owned and operated, " : ""}Dynamic Construction MI has served residential and commercial clients throughout Carleton and
                neighboring communities since {business.founded}, from roof repairs and replacements to complete post-frame buildings: pole barns, garages, and
                agricultural and equipment buildings.
              </p>
              <p>
                The team brings decades of roofing experience across metal roofs, wood shake roofs and asphalt shingle installation, alongside pole barn construction of every
                size. {getClaim("licensedInsured") ? "We’re fully licensed and insured for your protection." : ""}
              </p>
              <p>
                Today we build and roof across Monroe, Wayne, Lenawee and Oakland counties, with the same approach on every job: dependable work, clear communication, and
                results built to last.
              </p>
            </div>
            <div className="mt-10 border-t border-line-light pt-8" data-reveal>
              <ClaimList ids={["experience20", "licensedInsured", "owensCorning", "gaco", "lomanco", "financing"]} tone="light" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-charcoal py-20 md:py-32">
        <div className="container-x">
          <ChapterLabel index="02" label="How we work" />
          <h2 id="values-title" className="mt-6 max-w-3xl text-display font-[720]" data-reveal style={{ fontVariationSettings: '"wdth" 112' }}>
            The workmanship philosophy is simple.
          </h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line-dark bg-line-dark md:grid-cols-3" data-reveal-group>
            {values.map((v, i) => (
              <li key={v.title} className="bg-charcoal p-8 md:p-10" data-reveal>
                <span aria-hidden className="display-wide text-4xl text-blue-bright">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-title font-[650]">{v.title}</h3>
                <p className="mt-3 text-steel">{v.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="team-title" className="theme-graphite py-20 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl" data-reveal>
              <Photo name="roof-crew-install" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3]" />
            </div>
            <p className="eyebrow mt-4 text-steel">Dynamic Construction crew on a roof replacement</p>
          </div>
          <div className="lg:col-span-6">
            <ChapterLabel index="03" label="The team" />
            <h2 id="team-title" className="mt-6 text-headline font-[700]" data-reveal>
              Experienced hands on every job.
            </h2>
            <article className="mt-10 border-t border-line-dark-strong pt-8" data-reveal>
              <p className="eyebrow text-metal">Installation Specialist</p>
              <h3 className="mt-3 text-title font-[650]">Toby</h3>
              <p className="mt-4 text-steel">
                With 25 years in the construction industry, Toby oversees daily installations for Dynamic Construction MI, from roof replacements and metal roofing to seamless
                gutters and masonry around rooflines and chimneys. He has worked on homes and commercial buildings throughout Carleton, Monroe, New Boston, Maybee, Ida and
                Newport.
              </p>
            </article>
            <p className="mt-8 text-sm text-steel" data-reveal>
              More team introductions are coming soon.
            </p>
          </div>
        </div>
      </section>

      <Community index="04" />

      <section className="bg-charcoal py-16">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="text-title font-[650]">See what the team has built.</p>
          <Link href="/work" className={buttonVariants({ variant: "light" })}>
            Explore our work
            <ArrowIcon />
          </Link>
        </div>
      </section>
      <EstimateBand />
    </>
  );
}
