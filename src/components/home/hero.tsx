"use client";

import Link from "next/link";
import { getImageProps } from "next/image";
import { useEffect, useRef } from "react";
import { ArrowIcon, buttonVariants } from "@/components/ui/button";
import { getGsap, MQ } from "@/components/motion/gsap";
import { business } from "@/content/business";
import { photos } from "@/content/media";
import { cn } from "@/lib/utils";

const DESKTOP = photos["barn-machine-shed-sky"];
const MOBILE = photos["barn-tan-three-bay"];

/**
 * Cinematic hero.
 *
 * Intro (CSS, runs before hydration): the photograph settles from a slight
 * push-in, headline lines rise out of masks, then copy and actions follow.
 * Nothing waits on JavaScript — the buttons are usable from first paint.
 *
 * Scroll (GSAP ScrollTrigger, scrubbed to scroll position):
 *  - Desktop: the section pins for a short distance while the full-bleed image
 *    contracts into an inset "architectural viewport", copy drifts up at a
 *    faster rate than the image, and drawing-style annotations appear in the
 *    new margins. The page then continues normally.
 *  - Mobile: no pinning; a gentle parallax on the image and fade on the copy.
 *  - Reduced motion: completely static.
 *
 * Art direction: a landscape photograph on wide screens, a portrait one on phones.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const common = { alt: "", sizes: "100vw", quality: 75 as const };
  const desktop = getImageProps({ ...common, src: DESKTOP.src, placeholder: "empty" }).props;
  const {
    props: { srcSet: mobileSet, ...mobileImg },
  } = getImageProps({ ...common, src: MOBILE.src, fetchPriority: "high", loading: "eager" });
  // Unoptimized (static) builds return a plain src instead of a srcset.
  const desktopSrcSet = desktop.srcSet ?? desktop.src;
  const mobileSrcSet = mobileSet ?? mobileImg.src;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    const q = gsap.utils.selector(section);

    mm.add(MQ.desktopMotion, () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
      tl.fromTo(q("[data-hero-frame]"), { clipPath: "inset(0% 0% 0% 0% round 0px)" }, { clipPath: "inset(11% 5% 9% 5% round 18px)" }, 0)
        .fromTo(q("[data-hero-media]"), { scale: 1, yPercent: 0 }, { scale: 1.08, yPercent: 4 }, 0)
        .to(q("[data-hero-copy]"), { yPercent: -38, autoAlpha: 0 }, 0)
        .to(q("[data-hero-cue]"), { autoAlpha: 0, duration: 0.15 }, 0)
        .fromTo(q("[data-hero-annot]"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.35 }, 0.45)
        .fromTo(q("[data-hero-shade]"), { opacity: 1 }, { opacity: 0.35 }, 0);
    });

    mm.add(MQ.mobileMotion, () => {
      gsap.to(q("[data-hero-media]"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q("[data-hero-copy]"), {
        yPercent: -14,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="hero-title" className="relative h-[100svh] min-h-[36rem] lg:h-[175vh]">
      <div className="sticky top-0 h-[100svh] min-h-[36rem] overflow-hidden lg:h-screen">
        {/* Image frame: contracts into an inset viewport on desktop scroll */}
        <div data-hero-frame className="absolute inset-0 overflow-hidden bg-graphite will-change-[clip-path]">
          <div data-hero-media className="absolute inset-0 will-change-transform">
            <picture className="hero-image absolute inset-0 block">
              <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
              <source media="(max-width: 767.98px)" srcSet={mobileSrcSet} sizes="100vw" />
              {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is supplied via spread props */}
              <img
                {...mobileImg}
                alt={`${DESKTOP.alt}. Project by ${business.name}.`}
                className="absolute inset-0 h-full w-full object-cover object-[50%_60%] md:object-[50%_55%]"
              />
            </picture>
          </div>
          {/* Legibility shading: strongest lower-left, where the copy sits */}
          <div data-hero-shade aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/10" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/20 to-transparent" />
          <div aria-hidden className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
          <div aria-hidden className="hero-veil absolute inset-0 bg-charcoal" />
        </div>

        {/* Drawing annotations revealed in the margins as the frame contracts (desktop) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          <span data-hero-annot className="eyebrow invisible absolute top-[6.5%] left-[5%] flex items-center gap-3 text-metal">
            <span className="h-px w-10 bg-metal/60" /> Est. {business.founded}
          </span>
          <span data-hero-annot className="eyebrow invisible absolute top-[6.5%] right-[5%] text-steel">
            Post-frame · Roofing · Exterior
          </span>
          <span data-hero-annot className="eyebrow invisible absolute bottom-[4%] left-[5%] text-steel">
            {business.address.city}, Michigan
          </span>
          <span data-hero-annot className="eyebrow invisible absolute right-[5%] bottom-[4%] flex items-center gap-3 text-metal">
            Monroe County &amp; surrounding <span className="h-px w-10 bg-metal/60" />
          </span>
        </div>

        <div data-hero-copy className="container-x relative flex h-full flex-col justify-end pt-28 pb-24 sm:pb-28 lg:pb-[14vh]">
          <p className="hero-fade eyebrow mb-6 flex items-center gap-3 text-metal" style={{ "--i": 0 } as React.CSSProperties}>
            <span aria-hidden className="h-px w-10 bg-metal/70" />
            Built with purpose. Built to last.
          </p>
          <h1 id="hero-title" className="text-mega font-[760] text-paper" style={{ fontVariationSettings: '"wdth" 112' }}>
            <span className="line-mask hero-line" style={{ "--i": 0 } as React.CSSProperties}>
              <span>Built to</span>
            </span>
            <span className="line-mask hero-line" style={{ "--i": 1 } as React.CSSProperties}>
              <span>
                Stand Apart<span className="text-metal">.</span>
              </span>
            </span>
          </h1>
          <p
            className="hero-fade mt-6 max-w-[34rem] text-lede text-paper/85"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Custom buildings, roofing, and exterior construction backed by experienced Michigan craftsmanship.
          </p>
          <div className="hero-fade mt-9 flex flex-col gap-3 xs:flex-row" style={{ "--i": 2 } as React.CSSProperties}>
            <Link href="/work" className={buttonVariants({ variant: "light", size: "lg" })} data-track="nav_click" data-track-label="hero explore work">
              Explore Our Work
              <ArrowIcon />
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: "outline", size: "lg" })} data-track-label="hero estimate">
              Request an Estimate
            </Link>
          </div>
        </div>

        <a
          href="#story"
          data-hero-cue
          className={cn(
            "hero-fade absolute right-5 bottom-8 hidden flex-col items-center gap-3 text-steel transition-colors hover:text-paper sm:flex lg:right-10",
          )}
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <span className="eyebrow [writing-mode:vertical-rl]">Scroll</span>
          <span aria-hidden className="relative block h-14 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-0 animate-scroll-cue bg-paper" />
          </span>
          <span className="sr-only">Skip to the company story</span>
        </a>
      </div>
    </section>
  );
}
