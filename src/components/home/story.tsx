import Link from "next/link";
import { ScrubText } from "@/components/motion/scrub-text";
import { ArrowIcon } from "@/components/ui/button";
import { business, getClaim, visibleClaims } from "@/content/business";

/** Chapter 01 — who we are, in one sentence, then the facts behind it. */
export function Story() {
  const credentials = visibleClaims(["owensCorning", "gaco", "lomanco"]);
  const facts = [
    { value: String(business.founded), label: "Established", show: true },
    { value: "20+", label: "Years of experience", show: Boolean(getClaim("experience20")) },
    { value: "Family", label: "Owned & operated", show: Boolean(getClaim("familyOwned")) },
    { value: "Licensed", label: "And fully insured", show: Boolean(getClaim("licensedInsured")) },
  ].filter((f) => f.show);

  return (
    <section id="story" aria-labelledby="story-title" className="theme-paper relative scroll-mt-0 py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="eyebrow flex items-center gap-3 text-bronze lg:col-span-3 lg:pt-3" data-reveal>
            <span aria-hidden className="font-mono text-charcoal">01</span>
            <span aria-hidden className="h-px w-8 bg-bronze/60" />
            The company
          </p>
          <div className="lg:col-span-9">
            <h2 id="story-title" className="sr-only">
              About Dynamic Construction MI
            </h2>
            <ScrubText
              className="font-display text-[clamp(1.7rem,1.05rem+2.7vw,3.6rem)] leading-[1.08] font-[620] tracking-[-0.022em]"
              text={`Since ${business.founded}, a family-owned Carleton builder trusted across Monroe County for pole barns, roofs, and the details in between.`}
            />
            <div className="mt-10 grid gap-8 md:grid-cols-2" data-reveal>
              <p className="text-lede text-slate">
                We build post-frame pole barns and garages, replace and repair roofs, restore aging roofs with GACO silicone systems, and install seamless gutters, for
                homes, farms and businesses across Southeast Michigan.
              </p>
              <div className="flex items-end">
                <Link href="/about" className="group inline-flex items-center gap-3 whitespace-nowrap border-b border-charcoal/30 pb-1 font-medium transition-colors hover:border-charcoal">
                  Our story
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 border-t border-line-light-strong md:mt-28 lg:grid-cols-4" data-reveal-group>
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col border-b border-line-light py-7 pr-4 odd:border-r lg:border-r lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:border-r-0" data-reveal>
              <dt className="eyebrow order-2 mt-3 text-slate">{f.label}</dt>
              <dd className="display-wide -order-1 text-[clamp(2rem,1.4rem+2.4vw,3.6rem)] leading-none text-charcoal">{f.value}</dd>
            </div>
          ))}
        </dl>

        {credentials.length ? (
          <ul aria-label="Credentials" className="mt-10 flex flex-wrap gap-x-8 gap-y-3" data-reveal>
            {credentials.map((c) => (
              <li key={c.label} className="flex items-center gap-3 text-[0.95rem] font-medium text-charcoal">
                <span aria-hidden className="size-2 rotate-45 bg-blue" />
                {c.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
