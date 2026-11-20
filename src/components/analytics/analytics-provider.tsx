"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Global, delegated click tracking. Server components opt in with
 * `data-track="event_name"` (and optional `data-track-label`). Phone links and
 * estimate links are recognized automatically.
 */
export function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const el = target?.closest<HTMLElement>("a, button, [data-track]");
      if (!el) return;
      const explicit = el.dataset.track as AnalyticsEvent | undefined;
      const href = el.getAttribute("href") ?? "";
      const label = el.dataset.trackLabel ?? el.textContent?.trim().slice(0, 60) ?? "";
      if (href.startsWith("tel:")) {
        track("phone_click", { label, location: el.dataset.trackLocation ?? "", page: window.location.pathname });
        return;
      }
      if (explicit) {
        track(explicit, { label, href, page: window.location.pathname });
        return;
      }
      if (href === "/contact" || href.startsWith("/contact#") || href.startsWith("/contact?")) {
        track("estimate_cta_click", { label, page: window.location.pathname });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const match = pathname.match(/^\/services\/([^/]+)$/);
    if (match) track("service_page_view", { service: match[1] });
  }, [pathname]);

  return null;
}
