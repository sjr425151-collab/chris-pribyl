import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PhoneIcon } from "@/components/ui/button";
import { Estimate } from "@/components/forms/estimate-section";
import { ClaimList, PageHero } from "@/components/sections/sections";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request a Free Estimate",
  description:
    "Request a free estimate for a pole barn, garage, roof replacement, roof repair, roof coating or gutters from Dynamic Construction MI in Carleton, MI. Or call (734) 636-3736.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Contact"
        title="Request an Estimate"
        lede="A few details is all it takes. We’ll get back to you to talk through the project and arrange a free estimate."
        breadcrumbs={<Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />}
      />
      <section aria-label="Estimate request form and contact details" className="bg-charcoal pb-24 md:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-line-dark-strong bg-graphite/70 p-6 sm:p-8 md:p-10">
              <h2 className="mb-8 text-title font-[680]">Tell us about your project</h2>
              <Estimate idPrefix="contact" />
            </div>
          </div>
          <aside className="space-y-10 lg:col-span-4" aria-label="Contact details">
            <div>
              <p className="eyebrow text-metal">Call</p>
              <a href={business.phone.href} data-track-location="contact-aside" className="mt-3 inline-flex items-center gap-3 font-display text-headline font-[680] hover:text-sky">
                <PhoneIcon className="size-6 text-metal" />
                {business.phone.display}
              </a>
              <p className="mt-2 text-sm text-steel">Emergency service available</p>
            </div>
            <div>
              <p className="eyebrow text-metal">Office hours</p>
              <dl className="mt-3 space-y-1">
                {business.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 border-b border-line-dark py-2">
                    <dt className="text-steel">{h.days}</dt>
                    <dd>{h.open ? `${h.open} – ${h.close}` : "Closed"}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="eyebrow text-metal">Address</p>
              <address className="mt-3 not-italic">
                {business.name}
                <br />
                {business.address.street}
                <br />
                {business.address.city}, {business.address.region} {business.address.postalCode}
              </address>
              <a href={business.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sky underline underline-offset-4">
                Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <div>
              <p className="eyebrow mb-4 text-metal">What to expect</p>
              <ClaimList ids={["freeEstimates", "financing", "licensedInsured"]} className="sm:grid-cols-1" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
