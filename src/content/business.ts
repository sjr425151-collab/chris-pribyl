/**
 * Business facts for Dynamic Construction MI.
 *
 * Every value here was taken from a public source on 2026-11-20:
 *  - "site"      → the company's current website, dynamicroofingmi.com
 *  - "directory" → third-party listings (MyLocalServices, iBegin, Yellow Pages)
 *
 * Nothing in this file is invented. Edit here and every page, the footer,
 * and the structured data update together.
 */

export const business = {
  name: "Dynamic Construction MI",
  shortName: "Dynamic Construction",
  legalNameNote: "Name as shown on dynamicroofingmi.com",
  phone: {
    display: "(734) 636-3736",
    e164: "+17346363736",
    href: "tel:+17346363736",
  },
  address: {
    street: "2995 W Labo Rd",
    city: "Carleton",
    region: "MI",
    postalCode: "48117",
    country: "US",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Dynamic+Construction+MI+2995+W+Labo+Rd+Carleton+MI+48117",
  },
  /** Source: site footer ("Mon – Fri 8:00 am – 4:00 pm, Sat – Sun Closed") */
  hours: [
    { days: "Monday – Friday", open: "8:00 am", close: "4:00 pm" },
    { days: "Saturday – Sunday", open: null, close: null },
  ],
  hoursSchema: ["Mo-Fr 08:00-16:00"],
  /** Source: site ("Since 2008", about page "Year Established 2008") */
  founded: 2008,
  currentWebsite: "https://www.dynamicroofingmi.com",
  social: {
    facebook: "https://facebook.com/dynamicroofingmi",
    instagram: "https://instagram.com/dynamic.constructionmi",
    yelp: "https://yelp.com/biz/dynamic-construction-carleton-2",
  },
  /**
   * Google review link. Replace with the direct "write a review" / place URL
   * from the Google Business Profile dashboard when available.
   */
  googleReviewsUrl:
    "https://www.google.com/search?q=Dynamic+Construction+MI+Carleton+MI+reviews",
  /**
   * Payment methods listed on the site's About page.
   */
  paymentMethods: ["American Express", "Cash", "Check", "Discover", "MasterCard", "Visa", "Financing"],
} as const;

/* ---------------------------------------------------------------------------
 * Claims registry
 *
 * Marketing claims are rendered through <Claim id="…"> / getClaim(). Each one
 * records where it came from and whether the owner has confirmed it.
 *
 *  status "published" → the company already states this on its current site,
 *                       but it has not been re-confirmed for the new site.
 *  status "confirmed" → confirmed by the owner (set this after review).
 *
 * Set `show: false` to remove a claim everywhere without touching layouts.
 * ------------------------------------------------------------------------- */

export type ClaimStatus = "published" | "confirmed";

export interface ClaimRecord {
  label: string;
  /** Longer, still conservative phrasing for detail sections */
  detail: string;
  source: string;
  status: ClaimStatus;
  show: boolean;
}

export const claims = {
  familyOwned: {
    label: "Locally and family-owned",
    detail: "A family-owned and operated company based in Carleton, Michigan.",
    source: "site: About, Pole Barns, Roofing, Gutters pages",
    status: "published",
    show: true,
  },
  licensedInsured: {
    label: "Licensed and insured",
    detail: "Fully licensed and insured for your protection.",
    source: "site: About, Pole Barns, Roofing, Gutters pages",
    status: "published",
    show: true,
  },
  experience20: {
    label: "20+ years of experience",
    detail: "A team with more than two decades of roofing and building experience.",
    source: "site: 'over two decades of experience', 'over 20 years of experience'",
    status: "published",
    show: true,
  },
  owensCorning: {
    label: "Owens Corning Preferred Contractor",
    detail: "An Owens Corning Preferred Contractor installing Owens Corning roofing systems.",
    source: "site: homepage, Roofing page, About (Brands)",
    status: "published",
    show: true,
  },
  gaco: {
    label: "GACO Certified Installer",
    detail:
      "A GACO Certified Installer, trained and approved to install GACO silicone roof systems to manufacturer standards.",
    source: "site: GACO Certified Installer page",
    status: "published",
    show: true,
  },
  lomanco: {
    label: "Lomanco Ventilation certified",
    detail: "Lomanco Ventilation certified, so gutters and roof ventilation are planned as one system.",
    source: "site: homepage Gutters section",
    status: "published",
    show: true,
  },
  warranty50: {
    label: "50-year manufacturer material warranty on qualifying roofs",
    detail:
      "Qualifying Owens Corning roof systems carry a 50-year manufacturer material warranty, alongside the company's own workmanship warranty.",
    source: "site: Roofing page, FAQs ('Owens Corning 50-year manufacturer's warranty plus our own workmanship warranty')",
    status: "published",
    show: true,
  },
  oneDay: {
    label: "Most roof replacements completed in one day",
    detail:
      "Most residential roof replacements are completed in a single day, weather permitting. Larger or complex roofs take longer, and you get a timeline before work begins.",
    source: "site: homepage, Roofing page, FAQs",
    status: "published",
    show: true,
  },
  financing: {
    label: "Financing available",
    detail: "Financing options are available and can be reviewed with you during your estimate.",
    source: "site: every service page, FAQs",
    status: "published",
    show: true,
  },
  freeEstimates: {
    label: "Free estimates and inspections",
    detail: "Estimates and inspections are free, with a detailed written estimate.",
    source: "site: homepage, every service page, FAQs",
    status: "published",
    show: true,
  },
  emergency: {
    label: "Emergency service available",
    detail: "Emergency service is available — call for urgent roof damage.",
    source: "site: homepage, footer ('Emergency Services Available')",
    status: "published",
    show: true,
  },
  permits: {
    label: "Permits handled for you",
    detail: "Permits and required inspections are handled for you.",
    source: "site: Gutters page, FAQs",
    status: "published",
    show: true,
  },
  cleanup: {
    label: "Thorough clean-up",
    detail:
      "Tarps protect landscaping during tear-off, and magnetic sweepers collect nails and debris before the crew leaves.",
    source: "site: FAQs",
    status: "published",
    show: true,
  },
} satisfies Record<string, ClaimRecord>;

export type ClaimId = keyof typeof claims;

export function getClaim(id: ClaimId): ClaimRecord | null {
  const claim: ClaimRecord = claims[id];
  return claim.show ? claim : null;
}

export function visibleClaims(ids: ClaimId[]): ClaimRecord[] {
  return ids.map(getClaim).filter((c): c is ClaimRecord => c !== null);
}

/**
 * Public review summary. Two different figures appeared in source material
 * (4.7★ / 133 on Google, 4.7★ / 142 on the website widget) and neither could
 * be checked live. Leave `rating` null until a current figure is confirmed
 * from the Google Business Profile; the UI hides numeric ratings while null.
 */
export const reviewSummary: { rating: number | null; count: number | null; source: string; asOf: string | null } = {
  rating: null,
  count: null,
  source: "Google Business Profile",
  asOf: null,
};
