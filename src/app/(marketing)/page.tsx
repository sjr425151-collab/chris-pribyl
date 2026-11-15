import Link from "next/link";
import {
  ArrowRight,
  Armchair,
  Footprints,
  Move3d,
  Scale,
  Sparkles,
  Timer,
} from "lucide-react";
import { Photo } from "@/components/brand/photo";
import { RangeArc } from "@/components/brand/range-arc";
import { AppPreview } from "@/components/marketing/app-preview";
import { AssessmentAreas } from "@/components/marketing/assessment-areas";
import { CtaSection } from "@/components/marketing/cta-section";
import { FeatureCard } from "@/components/marketing/feature-card";
import { PricingCard } from "@/components/marketing/pricing-card";
import { ProcessSteps } from "@/components/marketing/process-steps";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { processSteps, programmingPrinciples, sampleMoments } from "@/content/home";
import { plans, pricingStatus } from "@/content/pricing";
import { site } from "@/content/site";

const audience = [
  { icon: Armchair, text: "You sit for long stretches and feel stiff when you get up." },
  { icon: Move3d, text: "Your hips, shoulders, ankles or upper back feel restricted." },
  { icon: Scale, text: "Balance or coordination feels less steady than it used to." },
  { icon: Footprints, text: "You want practical strength for everyday movement." },
];

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="flex animate-rise flex-col gap-8">
            <Badge className="self-start">Mobility · Movement · Strength</Badge>
            <h1 className="text-balance text-display font-semibold text-bone">
              Your body wasn’t meant to feel <span className="text-mist">restricted.</span>
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-mist md:text-xl">
              {site.supporting}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/assessment">
                  Start your assessment
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/how-it-works">See how it works</Link>
              </Button>
            </div>
            <p className="text-sm text-dim">
              At home, with your phone. No equipment beyond a wall and a chair.
            </p>
          </div>

          <div className="relative animate-fade [animation-delay:200ms]">
            <Photo
              name="heroSquat"
              aspect="aspect-[4/5]"
              priority
              shade
              sizes="(min-width: 1024px) 560px, 100vw"
            >
              <div className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-8 md:pb-8">
                <RangeArc className="mx-auto max-w-[19rem] opacity-90" />
              </div>
            </Photo>

            {/* Floating observation card — illustrative example */}
            <div className="absolute -left-4 top-8 hidden w-56 animate-rise rounded-lg border border-white/10 bg-ink-950/70 p-4 shadow-lift backdrop-blur-xl [animation-delay:500ms] sm:block lg:-left-16">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[0.6rem] text-lime">Primary focus</span>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-dim">
                  Example
                </span>
              </div>
              <p className="mt-2.5 text-[0.95rem] font-medium text-bone">Hip mobility</p>
              <p className="mt-1 text-xs leading-relaxed text-mist">
                Comfortable depth when squatting and rising from low seats.
              </p>
              <div className="mt-3 flex gap-1" aria-hidden>
                {[1, 1, 1, 0, 0].map((on, i) => (
                  <span key={i} className={on ? "h-1 flex-1 rounded-full bg-lime" : "h-1 flex-1 rounded-full bg-line-strong"} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Introduction / who it's for ---------- */}
      <Section className="border-t border-line">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="Personalized movement assessment"
              title="Start with how you actually move."
              description="Generic routines guess. KINFORM looks at your mobility, balance, movement control and strength — alongside what you tell us about how your body feels — then builds a plan around your priorities."
            />
            <Photo
              name="shoulderReach"
              aspect="aspect-[5/4]"
              caption="Shoulder mobility"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div className="flex flex-col gap-6 lg:pt-28">
            <p className="eyebrow text-dim">KINFORM is built for you if</p>
            <ul className="flex flex-col">
              {audience.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-5 border-t border-line py-5 last:border-b">
                  <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-lime" strokeWidth={1.6} />
                  <span className="text-lg leading-snug text-bone">{text}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-dim">
              Recreational lifters and athletes are welcome too — your plan simply starts from a
              different place.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- Three-step process ---------- */}
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="How it works" title="Assess. Personalize. Progress." />
            <Button asChild variant="link" className="self-start md:self-auto">
              <Link href="/how-it-works">
                The full process <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
          <ProcessSteps steps={processSteps} />
        </div>
      </Section>

      {/* ---------- Assessment categories ---------- */}
      <Section className="border-t border-line bg-ink-900/40">
        <div className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="What we look at"
            title="Mobility first. Then everything it supports."
            description="Nine areas, prioritized the way your body uses them: comfortable range of motion, then control, balance and strength."
          />
          <AssessmentAreas />
          <p className="max-w-3xl text-sm leading-relaxed text-dim">
            What you report — stiffness, discomfort, things that feel difficult — is always kept
            separate from what we observe in your movement. The assessment produces training
            priorities, not diagnoses.
          </p>
        </div>
      </Section>

      {/* ---------- Personalized programming ---------- */}
      <Section className="border-t border-line">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="Personalized programming"
              title="A plan shaped around where you feel restricted."
              description="Your assessment becomes a four-week program. Each block builds on the last, and your weekly check-ins adjust what comes next."
            />
            <Photo
              name="hipFlexor"
              aspect="aspect-[16/10]"
              caption="Hip flexor mobility"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div className="grid content-start gap-4 sm:grid-cols-2">
            {programmingPrinciples.map((p, i) => (
              <FeatureCard
                key={p.title}
                title={p.title}
                body={p.body}
                meta={String(i + 1).padStart(2, "0")}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- Daily Movement Moments ---------- */}
      <Section className="border-t border-line bg-ink-900/40">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Daily Movement Moments"
              title="Two to five minutes. A few times a day."
              description="Short guided breaks that fit around sitting, work and errands — a hip opener between meetings, an ankle wake-up before a walk. Small, regular movement adds up."
            />
            <div className="flex flex-wrap gap-2">
              <Badge>
                <Timer aria-hidden className="size-3" /> 2–5 minutes
              </Badge>
              <Badge>No equipment</Badge>
              <Badge>Matched to your priorities</Badge>
            </div>
          </div>

          <div className="relative pb-40 sm:pb-24">
            <Photo
              name="deskRotation"
              aspect="aspect-[4/5]"
              className="w-full sm:w-[78%]"
              sizes="(min-width: 1024px) 38vw, 80vw"
            />
          <div className="absolute bottom-0 right-0 w-[92%] rounded-xl border border-white/10 bg-ink-950/80 p-2 shadow-lift backdrop-blur-xl sm:w-[62%]">
            <div className="flex items-center justify-between px-4 pt-3 pb-2.5">
              <p className="text-sm font-medium text-bone">Today’s Moments</p>
              <span className="eyebrow text-[0.6rem] text-dim">Example</span>
            </div>
            <ul className="flex flex-col gap-1">
              {sampleMoments.map((m, i) => (
                <li
                  key={m.title}
                  className="flex items-center gap-3 rounded-lg bg-ink-850/80 px-4 py-3"
                >
                  <span className="w-16 shrink-0 font-mono text-[0.7rem] text-dim">{m.time}</span>
                  <span className="flex-1 text-sm text-bone">{m.title}</span>
                  <span className="font-mono text-xs text-mist">{m.minutes} min</span>
                  <span
                    aria-hidden
                    className={
                      i === 0
                        ? "size-2 rounded-full bg-lime"
                        : "size-2 rounded-full border border-line-strong"
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
      </Section>

      {/* ---------- App experience preview ---------- */}
      <Section className="border-t border-line">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
          <div className="order-2 lg:order-1">
            <AppPreview />
          </div>
          <div className="order-1 flex flex-col gap-10 lg:order-2">
            <SectionHeading
              eyebrow="The training experience"
              title="Guided sessions you can follow at home."
              description="Every session lays out exactly what to do, with demonstration videos, clear cues and simpler or harder options for each exercise."
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                ["Today’s session", "One clear plan for the day, ordered from mobility to strength."],
                ["Demonstrations", "Short videos and cues for every movement."],
                ["Weekly check-ins", "Tell us how it felt; your plan adjusts."],
                ["Reassessment", "Every four weeks, see how your movement has changed."],
              ].map(([t, b]) => (
                <li key={t} className="flex flex-col gap-1.5 border-t border-line pt-4">
                  <span className="flex items-center gap-2 text-[0.95rem] font-medium text-bone">
                    <Sparkles aria-hidden className="size-3.5 text-lime" />
                    {t}
                  </span>
                  <span className="text-sm leading-relaxed text-mist">{b}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-dim">
              Web first, with native iOS and Android apps planned on the same account.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- Pricing preview ---------- */}
      <Section className="border-t border-line bg-ink-900/40">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Pricing"
              title="Begin with one assessment."
              description="Then continue with a membership if it’s working for you."
            />
            <Badge tone="caution" className="self-start md:self-auto">
              {pricingStatus.label}
            </Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} compact />
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-dim">{pricingStatus.note}</p>
            <Button asChild variant="link">
              <Link href="/pricing">
                Compare plans <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* ---------- Final CTA ---------- */}
      <CtaSection
        title="Move more freely, starting with how you move today."
        body="The assessment takes about 40 minutes at home. You’ll come away with clear priorities and a four-week plan built around them."
        primary={{ label: "Start your assessment", href: "/assessment" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
        photo="wideReach"
      />
    </>
  );
}
