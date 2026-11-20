"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Photo } from "@/components/ui/photo";
import { ArrowIcon } from "@/components/ui/button";
import { SwipeGallery } from "@/components/sections/swipe-gallery";
import { getGsap, MQ } from "@/components/motion/gsap";
import type { PhotoKey } from "@/content/media";

export interface FeaturedProjectItem {
  slug: string;
  title: string;
  category: string;
  summary: string;
  scope: string[];
  cover: PhotoKey;
  gallery: PhotoKey[];
}

/**
 * Desktop: full-width project cards stack as you scroll; each one settles
 * back and dims as the next slides over it (pure CSS sticky + a scrubbed
 * transform, so normal scrolling and keyboard order are preserved).
 * Mobile: a plain vertical list; each project has a native swipe gallery.
 */
export function FeaturedProjects({ projects }: { projects: FeaturedProjectItem[] }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add(MQ.desktopMotion, () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", list);
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card.querySelector("[data-stack-inner]"), {
          scale: 0.9,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
        });
        gsap.to(card.querySelector("[data-stack-dim]"), {
          opacity: 0.65,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <ol ref={listRef} className="space-y-16 lg:space-y-[12vh]">
      {projects.map((p, i) => (
        <li key={p.slug} data-stack-card className="lg:sticky" style={{ top: `calc(6rem + ${i * 14}px)` }}>
          <article data-stack-inner className="origin-top overflow-hidden rounded-2xl bg-graphite will-change-transform">
            {/* Desktop composition */}
            <div className="relative hidden aspect-[16/8.2] lg:block">
              <Photo name={p.cover} sizes="(min-width: 1408px) 1328px, 94vw" className="absolute inset-0" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/30 to-transparent" />
              <div aria-hidden data-stack-dim className="absolute inset-0 bg-charcoal opacity-0" />
              <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-end p-10 xl:p-14">
                <p className="eyebrow flex items-center gap-3 text-metal">
                  <span className="text-paper/60">{String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden className="h-px w-8 bg-metal/60" />
                  {p.category}
                </p>
                <h3 className="mt-5 text-display font-[700]" style={{ fontVariationSettings: '"wdth" 112' }}>
                  {p.title}
                </h3>
                <p className="mt-4 text-lede text-paper/80">{p.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.scope.slice(0, 3).map((s) => (
                    <li key={s} className="rounded-full border border-white/20 bg-charcoal/30 px-3 py-1 text-xs text-paper/85 backdrop-blur">
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/work/${p.slug}`}
                  data-track="gallery_interaction"
                  data-track-label={`featured ${p.slug}`}
                  className="group mt-8 inline-flex w-fit items-center gap-3 border-b border-paper/40 pb-1 font-medium transition-colors hover:border-paper"
                >
                  View project
                  <span className="sr-only">: {p.title}</span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            {/* Mobile composition */}
            <div className="lg:hidden">
              <SwipeGallery photos={p.gallery.length > 1 ? p.gallery : [p.cover]} label={p.title} aspect="aspect-[4/5] sm:aspect-[4/3]" />
              <div className="p-5 sm:p-7">
                <p className="eyebrow text-metal">{p.category}</p>
                <h3 className="mt-3 text-title font-[680]">{p.title}</h3>
                <p className="mt-2 text-steel">{p.summary}</p>
                <Link href={`/work/${p.slug}`} className="group mt-5 inline-flex items-center gap-3 font-medium text-paper">
                  View project
                  <span className="sr-only">: {p.title}</span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
