import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Dumbbell,
  FileText,
  Image as ImageIcon,
  Lock,
  ShieldCheck,
  Stethoscope,
  Video,
} from "lucide-react";
import { AssessmentAreas } from "@/components/marketing/assessment-areas";
import { FeatureCard } from "@/components/marketing/feature-card";
import { PageHero } from "@/components/marketing/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { assessmentLimitations, referralSignals } from "@/content/assessment";
import { plans, pricingStatus } from "@/content/pricing";
import { wellnessDisclaimer } from "@/content/site";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The assessment",
  description:
    "What the KINFORM movement assessment includes, what information is collected, what you receive, and its limitations.",
};

const components = [
  {
    icon: ClipboardList,
    title: "Safety screening & questionnaire",
    body: "Health screening questions first, then your routine, where you feel stiff, past injuries and goals.",
    meta: "~10 min",
  },
  {
    icon: ImageIcon,
    title: "Standing photos",
    body: "Front, side and back photos against a plain wall, guided by an on-screen outline.",
    meta: "~5 min",
  },
  {
    icon: Video,
    title: "Guided movement videos",
    body: "Short clips of a squat, reaches, rotations and a step-down, with camera placement guidance.",
    meta: "~15 min",
  },
  {
    icon: Dumbbell,
    title: "Strength & balance tests",
    body: "Simple self-recorded tests like a single-leg stance and sit-to-stand, each with an easier option.",
    meta: "~10 min",
  },
];

const collected = [
  ["Screening answers", "Health and safety questions used only to decide whether automatic programming is appropriate for you."],
  ["Questionnaire responses", "Activity, routine, stiffness, goals, and anything you choose to tell us about past injuries."],
  ["Photos", "Standing photos from set angles, in fitted clothing of your choice."],
  ["Movement videos", "Short clips of the guided movements."],
  ["Test results", "Times and counts you record yourself."],
];

const deliverables = [
  {
    icon: FileText,
    title: "Your movement assessment",
    body: "Observations from your photos, videos and tests, and your reported limitations — each clearly labelled by source.",
  },
  {
    icon: ArrowRight,
    title: "Training priorities",
    body: "The two or three areas to focus on first, ordered from mobility to strength.",
  },
  {
    icon: Dumbbell,
    title: "Four-week program",
    body: "Guided sessions and daily Movement Moments built around those priorities.",
  },
];

export default function AssessmentPage() {
  const assessmentPlan = plans.find((p) => p.id === "assessment")!;

  return (
    <>
      <PageHero
        eyebrow="The assessment"
        title="Understand how you move, before you train."
        description="About 40 minutes at home with your phone. You’ll complete a questionnaire, a few photos, guided movement videos and simple tests — and receive clear priorities and a four-week plan."
      >
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button asChild size="lg">
            <Link href="#purchase">
              Get your assessment <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="#what-you-complete">What’s included</Link>
          </Button>
        </div>
      </PageHero>

      {/* What you'll complete */}
      <Section id="what-you-complete" className="scroll-mt-16">
        <div className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="What you’ll complete"
            title="Four parts. No equipment."
            description="You’ll need a phone, a plain wall, a sturdy chair and a little floor space. You can pause and come back at any point."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {components.map((c) => (
              <FeatureCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </Section>

      {/* How it works / areas */}
      <Section className="border-t border-line bg-ink-900/40">
        <div className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="How the assessment works"
            title="Nine areas, looked at in order of priority."
            description="Your responses and recordings are reviewed against each area below. Mobility comes first because it shapes how comfortable everything else feels."
          />
          <AssessmentAreas detailed />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-line bg-ink-900 p-7">
              <Badge>What you report</Badge>
              <p className="mt-4 leading-relaxed text-mist">
                Stiffness, discomfort, activities that feel difficult, and your goals. We record
                these as you describe them and never reinterpret them as a diagnosis.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-ink-900 p-7">
              <Badge tone="accent">What we observe</Badge>
              <p className="mt-4 leading-relaxed text-mist">
                Movement patterns visible in your videos and tests — range, control, steadiness —
                described as observations and translated into training priorities.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* What is collected */}
      <Section className="border-t border-line">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <SectionHeading
            eyebrow="Information collected"
            title="Only what’s needed to build your plan."
          />
          <dl className="flex flex-col">
            {collected.map(([term, desc]) => (
              <div key={term} className="grid gap-2 border-t border-line py-5 last:border-b sm:grid-cols-[12rem_1fr] sm:gap-8">
                <dt className="font-medium text-bone">{term}</dt>
                <dd className="leading-relaxed text-mist">{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* What you receive */}
      <Section className="border-t border-line bg-ink-900/40">
        <div className="flex flex-col gap-12">
          <SectionHeading eyebrow="What you receive" title="Clarity, then a plan." />
          <div className="grid gap-4 md:grid-cols-3">
            {deliverables.map((d) => (
              <FeatureCard key={d.title} {...d} />
            ))}
          </div>
        </div>
      </Section>

      {/* Limitations & safety */}
      <Section id="limitations" className="scroll-mt-16 border-t border-line">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Limitations"
              title="What the assessment is — and isn’t."
              description="KINFORM is a fitness and wellness service. Being clear about its limits is part of doing it well."
            />
            <ul className="flex flex-col">
              {assessmentLimitations.map((l) => (
                <li key={l} className="border-t border-line py-4 leading-relaxed text-mist last:border-b">
                  {l}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 self-start rounded-xl border border-caution/30 bg-caution/[0.04] p-7 md:p-9">
            <div className="flex items-center gap-3">
              <Stethoscope aria-hidden className="size-5 text-caution" strokeWidth={1.6} />
              <h3 className="text-lg font-semibold text-bone">When to see a professional first</h3>
            </div>
            <p className="leading-relaxed text-mist">
              The safety screening runs before anything else. If your answers suggest that
              exercise guidance should come from a healthcare professional, we won’t generate an
              automatic program — we’ll recommend you speak with a qualified professional first.
              Please consult one before starting if you have:
            </p>
            <ul className="flex flex-col gap-2.5">
              {referralSignals.map((s) => (
                <li key={s} className="flex gap-3 text-[0.95rem] text-bone/90">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-caution" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Privacy */}
      <Section id="privacy" className="scroll-mt-16 border-t border-line bg-ink-900/40">
        <div className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Privacy & media handling"
            title="Your photos and videos stay private."
            description="These are the commitments the platform is being built to. They’ll be detailed in a full privacy policy before launch."
          />
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={Lock}
              title="Private storage"
              body="Media is stored in private storage — never on public links. Access uses short-lived, signed URLs for your account only."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Controlled access"
              body="Only you, and the reviewers working on your assessment, can view your media. Access is authorized and logged."
            />
            <FeatureCard
              icon={FileText}
              title="Your choice"
              body="Your media is used for your assessment and progress comparisons only. You’ll be able to delete it from your account."
            />
          </div>
        </div>
      </Section>

      {/* Purchase */}
      <section id="purchase" className="scroll-mt-16 py-20 md:py-28">
        <div className="container-page">
          <div className="grid overflow-hidden rounded-xl border border-line bg-ink-900 lg:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-6 p-7 md:p-12">
              <Badge tone="caution" className="self-start">
                {pricingStatus.label}
              </Badge>
              <h2 className="text-headline font-semibold text-bone">Initial assessment</h2>
              <p className="max-w-lg text-lg leading-relaxed text-mist">
                {assessmentPlan.description} Includes your first four-week program.
              </p>
              <p className="flex items-baseline gap-2">
                <span className="text-6xl font-semibold tracking-[-0.04em] text-bone">
                  {formatPrice(assessmentPlan.price)}
                </span>
                <span className="text-mist">one-time</span>
              </p>
            </div>
            <div className="flex flex-col justify-center gap-5 border-t border-line bg-ink-850 p-7 md:p-12 lg:border-t-0 lg:border-l">
              <Button size="lg" disabled aria-describedby="purchase-status" className="w-full">
                Purchase assessment
              </Button>
              <p id="purchase-status" className="text-sm leading-relaxed text-mist">
                <span className="font-medium text-bone">Checkout isn’t available yet.</span>{" "}
                KINFORM is in pre-launch. Assessment purchases will open once secure payments and
                accounts are live. {pricingStatus.note}
              </p>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/how-it-works">Review the full process</Link>
              </Button>
              <p className="text-xs leading-relaxed text-dim">{wellnessDisclaimer}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
