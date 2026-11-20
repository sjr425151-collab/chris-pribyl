"use client";

import { useEffect, useRef } from "react";
import { getGsap, MQ } from "./gsap";
import { cn } from "@/lib/utils";

/**
 * A statement whose words fill in as it scrolls through the viewport, so the
 * reading pace follows the visitor's own scrolling. The full sentence is always
 * in the DOM and readable by assistive tech; reduced-motion shows it solid.
 */
export function ScrubText({ text, className, as: As = "p" }: { text: string; className?: string; as?: "p" | "h2" }) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add(MQ.anyMotion, () => {
      gsap.fromTo(
        el.querySelectorAll("[data-word]"),
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 45%", scrub: 0.4 },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <As ref={ref as React.Ref<HTMLParagraphElement & HTMLHeadingElement>} className={cn(className)}>
      {words.map((w, i) => (
        <span key={i} data-word className="inline-block whitespace-pre">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </As>
  );
}
