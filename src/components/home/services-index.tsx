"use client";

import Link from "next/link";
import { useState } from "react";
import { Photo } from "@/components/ui/photo";
import { ArrowIcon } from "@/components/ui/button";
import { ServiceDrawing } from "@/components/brand/service-drawing";
import type { PhotoKey } from "@/content/media";
import type { ServiceDrawing as DrawingKind } from "@/content/services";
import { cn } from "@/lib/utils";

export interface ServiceIndexItem {
  href: string;
  title: string;
  summary: string;
  tags: string[];
  visual: { photo: PhotoKey } | { drawing: DrawingKind };
}

/**
 * Editorial service index. On desktop, hovering or focusing a row swaps the
 * sticky preview (cross-fade, no layout shift). On mobile each row carries its
 * own image so there's no hidden interaction.
 */
export function ServicesIndex({ items }: { items: ServiceIndexItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <ol className="lg:col-span-6 xl:col-span-7" data-reveal-group>
        {items.map((item, i) => (
          <li key={item.href} className="border-t border-line-dark last:border-b" data-reveal>
            <Link
              href={item.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-describedby={`svc-${i}-summary`}
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-4 py-7 md:gap-x-8 md:py-9"
            >
              <span aria-hidden className={cn("eyebrow pt-2 transition-colors duration-300", active === i ? "text-metal" : "text-steel/70")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span
                  className={cn(
                    "block font-display text-[clamp(1.75rem,1.2rem+2.2vw,3.25rem)] leading-[0.98] font-[680] tracking-[-0.025em] transition-colors duration-300",
                    active === i ? "text-paper" : "text-paper/70 lg:text-paper/45",
                  )}
                  style={{ fontVariationSettings: '"wdth" 112' }}
                >
                  {item.title}
                </span>
                <span id={`svc-${i}-summary`} className="mt-3 block max-w-md text-steel">
                  {item.summary}
                </span>
                <span className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line-dark px-3 py-1 text-xs text-steel">
                      {t}
                    </span>
                  ))}
                </span>
              </span>
              <span
                aria-hidden
                className={cn(
                  "mt-1 flex size-11 items-center justify-center rounded-full border transition-all duration-300",
                  active === i ? "border-paper bg-paper text-charcoal" : "border-line-dark-strong text-paper",
                )}
              >
                <ArrowIcon />
              </span>
              {/* Mobile visual */}
              <span className="col-span-3 block overflow-hidden rounded-xl lg:hidden">
                {"photo" in item.visual ? (
                  <Photo name={item.visual.photo} sizes="100vw" className="aspect-[16/10]" alt="" quality={60} />
                ) : (
                  <ServiceDrawing kind={item.visual.drawing} className="aspect-[16/10]" />
                )}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div aria-hidden className="relative hidden lg:col-span-6 lg:block xl:col-span-5">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-2xl bg-graphite">
          {items.map((item, i) => (
            <div
              key={item.href}
              className={cn(
                "absolute inset-0 transition-[opacity,transform] duration-700 ease-out-soft",
                active === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
              )}
            >
              {"photo" in item.visual ? (
                <Photo name={item.visual.photo} sizes="(min-width: 1280px) 34vw, 46vw" className="h-full w-full" alt="" />
              ) : (
                <ServiceDrawing kind={item.visual.drawing} className="h-full w-full" />
              )}
            </div>
          ))}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-charcoal/80 to-transparent p-6 pt-20">
            <span className="eyebrow text-paper/90">{items[active]?.title}</span>
            <span className="eyebrow text-metal">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
