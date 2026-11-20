import Link from "next/link";
import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Story } from "@/components/home/story";
import { ServicesIndex, type ServiceIndexItem } from "@/components/home/services-index";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { MaskChapter } from "@/components/motion/mask-chapter";
import { ArrowIcon, buttonVariants } from "@/components/ui/button";
import { ChapterLabel, Community, EstimateBand, Process, ReviewsBlock, RoofingCredentials } from "@/components/sections/sections";
import { business } from "@/content/business";
import { categoryLabel, featuredProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${business.name} | Pole Barns, Garages & Roofing in Monroe County, MI`,
  absoluteTitle: true,
  description:
    "Family-owned since 2008 in Carleton, MI. Custom pole barns and garages, roof replacement and repair, GACO roof restoration and seamless gutters across Monroe County.",
  path: "/",
});

const serviceItems: ServiceIndexItem[] = [
  {
    href: "/services/pole-barns",
    title: "Pole Barns & Garages",
    summary: "Custom post-frame buildings for storage, equipment, agriculture and work, planned around your property.",
    tags: ["Agricultural", "Storage & equipment", "Garages", "Custom layouts"],
    visual: { photo: "barn-red-farmstead" },
  },
  {
    href: "/services/residential-roofing",
    title: "Roofing",
    summary: "Replacement and repair from an Owens Corning Preferred Contractor. Most replacements are done in a day.",
    tags: ["Replacement", "Repair", "Metal & steel", "Commercial"],
    visual: { photo: "roof-drone-finished" },
  },
  {
    href: "/services/roof-restoration",
    title: "Roof Restoration",
    summary: "GACO silicone coatings that seal and extend the life of flat, metal and rubber roofs.",
    tags: ["GACO certified", "Flat & metal roofs", "Commercial"],
    visual: { drawing: "coating" },
  },
  {
    href: "/services/gutters",
    title: "Gutters",
    summary: "Seamless gutters, replacements and leaf protection, planned together with your roof.",
    tags: ["Seamless", "Gutter guards", "Residential & commercial"],
    visual: { drawing: "gutter" },
  },
];

export default function HomePage() {
  const featured = featuredProjects.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: categoryLabel(p.category),
    summary: p.summary,
    scope: p.scope,
    cover: p.cover,
    gallery: p.gallery,
  }));

  return (
    <>
      <Hero />
      <Story />

      <section aria-labelledby="services-title" className="bg-charcoal py-24 md:py-36">
        <div className="container-x">
          <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ChapterLabel index="02" label="What we build" />
              <h2 id="services-title" className="mt-6 text-display font-[720]" data-reveal style={{ fontVariationSettings: '"wdth" 112' }}>
                Buildings, roofs, and the details that protect them.
              </h2>
            </div>
            <div className="flex items-end lg:col-span-5 lg:justify-end">
              <Link href="/services" className={buttonVariants({ variant: "outline" })} data-reveal>
                All services
                <ArrowIcon />
              </Link>
            </div>
          </div>
          <ServicesIndex items={serviceItems} />
        </div>
      </section>

      <section aria-labelledby="work-title" className="bg-charcoal pb-24 md:pb-36">
        <div className="container-x">
          <div className="mb-14 grid gap-8 border-t border-line-dark pt-24 md:mb-20 md:pt-32 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ChapterLabel index="03" label="Selected work" />
              <h2 id="work-title" className="mt-6 text-display font-[720]" data-reveal style={{ fontVariationSettings: '"wdth" 112' }}>
                Real buildings. Real roofs. Built here.
              </h2>
            </div>
            <div className="flex flex-col justify-end gap-6 lg:col-span-5">
              <p className="text-lede text-steel" data-reveal>
                Every photo on this site shows a Dynamic Construction project. No stock images, no renderings.
              </p>
            </div>
          </div>
          <FeaturedProjects projects={featured} />
          <div className="mt-16 flex justify-center">
            <Link href="/work" className={buttonVariants({ variant: "light", size: "lg" })} data-reveal>
              Explore the full portfolio
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <MaskChapter
        photo="barn-interior-framing"
        index="4.1"
        title="Precision in every detail."
        body="Posts set true, trusses aligned, walls wrapped before the steel goes on. What’s hidden inside a building decides how it stands for decades."
      />
      <MaskChapter
        photo="barn-cupola-porch-detail"
        index="4.2"
        align="right"
        title="Structures built for real life."
        body="Room for the truck, the tractor and the boat, and a porch for the evening. Every building starts with how you’ll actually use it."
      />
      <MaskChapter
        photo="roof-ridge-vents"
        index="4.3"
        title="Protection that lasts."
        body="Underlayment, shingles, ridge and ventilation installed as one system, so the roof over your family keeps doing its job, season after season."
      />

      <Process index="04" />
      <RoofingCredentials />

      <section aria-label="Reviews" className="bg-charcoal py-24 md:py-32">
        <div className="container-x">
          <ReviewsBlock index="06" />
        </div>
      </section>

      <Community index="07" />
      <EstimateBand index="08" />
    </>
  );
}
