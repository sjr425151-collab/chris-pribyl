/**
 * Public (browser-safe) configuration.
 */
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://livefiberconnect.com";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/preview/dynamicconstruction").replace(/\/$/, "");

export const publicEnv = {
  /** Origin only, e.g. https://livefiberconnect.com */
  siteUrl: rawSiteUrl.replace(/\/$/, ""),
  basePath,
  /** Preview builds are never indexed. Set to "true" only for the production launch. */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
  schedulingUrl: process.env.NEXT_PUBLIC_SCHEDULING_URL || "",
  /**
   * Optional endpoint that accepts the estimate form as JSON (e.g. a Zapier /
   * Make webhook or a form service). When empty the form runs in preview mode:
   * it validates fully but tells the visitor nothing was sent.
   */
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "",
};

/** Absolute URL including the deployment base path. */
export function absoluteUrl(path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  const withSlash = p === "/" ? "/" : p.endsWith("/") ? p : `${p}/`;
  return `${publicEnv.siteUrl}${publicEnv.basePath}${withSlash}`;
}
