/**
 * Consent-aware analytics.
 *
 * Events are always dispatched as a DOM CustomEvent ("dc:track") so tests and
 * future integrations can observe them. They are forwarded to Google
 * Analytics only when a measurement ID is configured AND the visitor has
 * accepted analytics cookies. No form field values or personal data are sent.
 */

export type AnalyticsEvent =
  | "estimate_cta_click"
  | "phone_click"
  | "form_start"
  | "form_submit_success"
  | "form_submit_error"
  | "service_page_view"
  | "gallery_interaction"
  | "nav_click";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export const CONSENT_KEY = "dc-analytics-consent";
export type ConsentValue = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readConsent(): ConsentValue | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable (private mode) — consent applies to this page view only */
  }
  window.dispatchEvent(new CustomEvent("dc:consent", { detail: value }));
}

export function track(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("dc:track", { detail: { event, params } }));
  if (readConsent() === "granted" && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}
