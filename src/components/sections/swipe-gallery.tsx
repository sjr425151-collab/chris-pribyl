"use client";

import { useEffect, useRef, useState } from "react";
import { Photo } from "@/components/ui/photo";
import type { PhotoKey } from "@/content/media";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Native horizontal swipe gallery (CSS scroll-snap). Touch and trackpads
 * scroll natively; buttons and arrow keys work for everyone else.
 */
export function SwipeGallery({
  photos,
  label,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className,
}: {
  photos: PhotoKey[];
  label: string;
  aspect?: string;
  sizes?: string;
  className?: string;
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const tracked = useRef(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || photos.length < 2) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            const i = Number((e.target as HTMLElement).dataset.index);
            setIndex(i);
            if (i > 0 && !tracked.current) {
              tracked.current = true;
              track("gallery_interaction", { gallery: label, action: "swipe" });
            }
          }
        }
      },
      { root: rail, threshold: [0.6] },
    );
    rail.querySelectorAll("[data-index]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [photos.length, label]);

  const go = (dir: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const next = Math.max(0, Math.min(photos.length - 1, index + dir));
    rail.scrollTo({ left: rail.clientWidth * next, behavior: "smooth" });
    if (!tracked.current) {
      tracked.current = true;
      track("gallery_interaction", { gallery: label, action: "button" });
    }
  };

  return (
    <div className={cn("relative", className)} role="region" aria-roledescription="carousel" aria-label={`${label} photos`}>
      <ul
        ref={railRef}
        tabIndex={photos.length > 1 ? 0 : -1}
        aria-label={`${label}: ${photos.length} photo${photos.length > 1 ? "s" : ""}`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
          }
        }}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
      >
        {photos.map((p, i) => (
          <li
            key={p}
            data-index={i}
            className="w-full shrink-0 snap-start"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${photos.length}`}
          >
            <Photo name={p} sizes={sizes} className={aspect} quality={60} />
          </li>
        ))}
      </ul>
      {photos.length > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
          <span className="eyebrow rounded-full bg-charcoal/70 px-3 py-1.5 text-paper backdrop-blur" aria-live="polite">
            {index + 1} / {photos.length}
          </span>
          <span className="pointer-events-auto flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              aria-label="Previous photo"
              className="flex size-11 items-center justify-center rounded-full bg-charcoal/70 text-paper backdrop-blur transition-opacity disabled:opacity-35"
            >
              <svg aria-hidden viewBox="0 0 16 16" className="size-4 rotate-180" fill="none">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={index === photos.length - 1}
              aria-label="Next photo"
              className="flex size-11 items-center justify-center rounded-full bg-charcoal/70 text-paper backdrop-blur transition-opacity disabled:opacity-35"
            >
              <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </span>
        </div>
      ) : null}
    </div>
  );
}
