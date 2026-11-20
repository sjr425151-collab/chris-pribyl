"use client";

import { useEffect, useRef } from "react";
import { Photo } from "@/components/ui/photo";
import type { PhotoKey } from "@/content/media";
import { getGsap, MQ } from "./gsap";
import { cn } from "@/lib/utils";

interface Props {
  photo: PhotoKey;
  index: string;
  title: string;
  body: string;
  caption?: string;
  align?: "left" | "right";
}

/**
 * A short visual chapter. On desktop the photograph opens from a framed
 * aperture to full bleed as the chapter enters, with the headline moving at
 * a different depth. On phones it's a static full-bleed image with a gentle
 * parallax; with reduced motion it's fully static.
 */
export function MaskChapter({ photo, index, title, body, caption, align = "left" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = getGsap();
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(MQ.desktopMotion, () => {
      gsap.fromTo(
        q("[data-chapter-frame]"),
        { clipPath: "inset(14% 18% 14% 18% round 20px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 85%", end: "top 10%", scrub: 0.5 },
        },
      );
      gsap.fromTo(
        q("[data-chapter-media]"),
        { scale: 1.2 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
      );
      gsap.fromTo(
        q("[data-chapter-copy]"),
        { yPercent: 30 },
        { yPercent: -20, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
      );
    });

    mm.add(MQ.mobileMotion, () => {
      gsap.fromTo(
        q("[data-chapter-media]"),
        { yPercent: -6, scale: 1.12 },
        { yPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} aria-labelledby={`chapter-${index}`} className="relative h-[92svh] min-h-[32rem] overflow-hidden lg:h-[120vh]">
      <div data-chapter-frame className="absolute inset-0 overflow-hidden will-change-[clip-path]">
        <div data-chapter-media className="absolute inset-0 will-change-transform">
          <Photo name={photo} sizes="100vw" className="h-full w-full" />
        </div>
        <div
          aria-hidden
          className={cn(
            "absolute inset-0",
            align === "left"
              ? "bg-gradient-to-r from-charcoal/85 via-charcoal/35 to-transparent"
              : "bg-gradient-to-l from-charcoal/85 via-charcoal/35 to-transparent",
          )}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
      </div>
      <div className={cn("container-x relative flex h-full items-end pb-16 lg:items-center lg:pb-0", align === "right" && "lg:justify-end")}>
        <div data-chapter-copy className="max-w-xl">
          <p className="eyebrow flex items-center gap-3 text-metal">
            <span className="text-paper/70">{index}</span>
            <span aria-hidden className="h-px w-8 bg-metal/60" />
            Craftsmanship
          </p>
          <h2 id={`chapter-${index}`} className="mt-5 text-display font-[760] uppercase" style={{ fontVariationSettings: '"wdth" 116' }}>
            {title}
          </h2>
          <p className="mt-6 max-w-md text-lede text-paper/85">{body}</p>
          {caption ? <p className="eyebrow mt-8 text-steel">{caption}</p> : null}
        </div>
      </div>
    </section>
  );
}
