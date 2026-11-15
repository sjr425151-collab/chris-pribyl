import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/brand/photo";
import { CtaSection } from "@/components/marketing/cta-section";
import { PageHero } from "@/components/marketing/page-hero";
import { JourneyTimeline } from "@/components/marketing/process-steps";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { assessmentJourney } from "@/content/assessment";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From questionnaire to four-week program: how the KINFORM movement assessment and personalized programming work.",
};

const expectations = [
  {
    title: "Changes take consistent practice",
    body: "Most people need several weeks of regular sessions and Moments to notice movement feeling easier. Some areas change faster than others.",
  },
  {
    title: "You stay in control",
    body: "Every test and exercise can be stopped, scaled down or skipped. Discomfort is a signal to ease off, not to push through.",
  },
  {
    title: "Your plan is a starting point",
    body: "Programs are adjusted by your check-ins and reassessments. If something isn’t working, it changes.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="A clear path from stiff to steady."
        description="Seven steps, done at your own pace at home. Here’s exactly what happens, what you’ll do, and what to expect."
      >
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/assessment">
              Start your assessment <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </PageHero>

      <Section className="pt-12 md:pt-16 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <JourneyTimeline steps={assessmentJourney} />
          <div className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-4">
              <Photo
                name="stepDown"
                aspect="aspect-[3/4]"
                caption="Guided movement video"
                sizes="320px"
              />
              <p className="text-sm leading-relaxed text-dim">
                Recording a step-down at home. On-screen guides show where to place your phone.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line bg-ink-900/40">
        <div className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Realistic expectations"
            title="Steady progress, not quick fixes."
            description="KINFORM is a training program. It’s designed to help everyday movement feel more comfortable and capable over time — not to promise specific results."
          />
          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {expectations.map((e) => (
              <div key={e.title} className="flex flex-col gap-3 bg-ink-900 p-7 md:p-8">
                <h3 className="text-lg font-semibold tracking-[-0.015em] text-bone">{e.title}</h3>
                <p className="leading-relaxed text-mist">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CtaSection
        title="Ready to see how you move?"
        body="Review what the assessment includes, how your photos and videos are handled, and what you’ll receive."
        primary={{ label: "Assessment details", href: "/assessment" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
        photo="wideReach"
      />
    </>
  );
}
