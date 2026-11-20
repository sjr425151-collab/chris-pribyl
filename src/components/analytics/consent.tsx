"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { readConsent, writeConsent, type ConsentValue } from "@/lib/analytics";

function subscribe(cb: () => void) {
  window.addEventListener("dc:consent", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("dc:consent", cb);
    window.removeEventListener("storage", cb);
  };
}

/**
 * Cookie consent + Google Analytics loader. Renders nothing unless a
 * measurement ID is configured. GA is never loaded before consent.
 */
export function ConsentAndAnalytics({ measurementId }: { measurementId: string }) {
  const consent = useSyncExternalStore<ConsentValue | null | "unknown">(subscribe, readConsent, () => "unknown");
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- delay the banner until after hydration to avoid layout shift on first paint
  useEffect(() => setMounted(true), []);

  if (!measurementId) return null;

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {mounted && consent === null ? (
        <div
          role="region"
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-xl border border-line-dark-strong bg-graphite/95 p-4 text-sm text-paper shadow-2xl backdrop-blur md:inset-x-auto md:right-5 md:bottom-5"
        >
          <p className="text-steel">
            We use analytics cookies to understand which pages help visitors. No form details are shared.{" "}
            <Link href="/privacy" className="text-sky underline underline-offset-2">
              Privacy
            </Link>
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => writeConsent("granted")}
              className="h-10 rounded-full bg-blue px-5 font-medium text-white hover:bg-blue-hover"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => writeConsent("denied")}
              className="h-10 rounded-full border border-line-dark-strong px-5 text-paper hover:bg-white/5"
            >
              Decline
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
