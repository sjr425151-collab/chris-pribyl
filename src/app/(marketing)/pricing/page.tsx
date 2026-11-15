import type { Metadata } from "next";
import { CtaSection } from "@/components/marketing/cta-section";
import { PageHero } from "@/components/marketing/page-hero";
import { PricingCard } from "@/components/marketing/pricing-card";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section-heading";
import { plans, pricingStatus } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Proposed introductory pricing for the KINFORM assessment and memberships.",
};

const faqs = [
  {
    q: "Why start with an assessment?",
    a: "Memberships build on your assessment results. Without them, your program would just be another generic routine.",
  },
  {
    q: "Can I cancel a membership?",
    a: "Memberships are planned as month-to-month with no long-term commitment. Full terms will be published before launch.",
  },
  {
    q: "Is anything charged now?",
    a: "No. KINFORM is in pre-launch and no payments can be taken. These prices are proposals.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing. Start with one assessment."
        description="Your assessment includes your first four-week program. Continue with a membership for ongoing programming and reassessment."
      >
        <div className="flex flex-col gap-2 pt-2">
          <Badge tone="caution" className="self-start">
            {pricingStatus.label}
          </Badge>
          <p className="text-sm text-dim">{pricingStatus.note}</p>
        </div>
      </PageHero>

      <Section className="pt-14 md:pt-20 lg:pt-20">
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <h2 className="text-title font-semibold text-bone">Questions</h2>
          <dl className="flex flex-col">
            {faqs.map((f) => (
              <div key={f.q} className="flex flex-col gap-2 border-t border-line py-6 last:border-b">
                <dt className="font-medium text-bone">{f.q}</dt>
                <dd className="leading-relaxed text-mist">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <CtaSection
        title="Not sure yet?"
        body="See exactly what the assessment involves, what you’ll receive, and how your media is handled."
        primary={{ label: "Assessment details", href: "/assessment" }}
        secondary={{ label: "How it works", href: "/how-it-works" }}
      />
    </>
  );
}
