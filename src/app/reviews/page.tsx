import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowIcon, buttonVariants } from "@/components/ui/button";
import { EstimateBand, PageHero, ReviewsBlock } from "@/components/sections/sections";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Customer Reviews",
  description:
    "Read reviews of Dynamic Construction MI from homeowners and businesses across Monroe County on Google, Facebook and Yelp, and share your own experience.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Reviews"
        title="In our customers’ own words."
        lede="We’d rather you hear about our work from the people we built for. Reviews are posted on independent platforms and linked here directly."
        breadcrumbs={<Breadcrumbs items={[{ name: "Reviews", path: "/reviews" }]} />}
      />
      <section className="bg-charcoal pb-20 md:pb-32">
        <div className="container-x">
          <ReviewsBlock index="01" />
        </div>
      </section>
      <section aria-labelledby="leave-title" className="theme-paper py-20 md:py-28">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 id="leave-title" className="text-headline font-[700]">
              Worked with us? We’d be grateful for your review.
            </h2>
            <p className="mt-4 text-lede text-slate">Your feedback helps us improve and helps your neighbors make informed decisions.</p>
          </div>
          <a href={business.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg" })}>
            Leave a Google review
            <ArrowIcon className="-rotate-45" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>
      <EstimateBand />
    </>
  );
}
