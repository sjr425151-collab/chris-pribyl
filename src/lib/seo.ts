import type { Metadata } from "next";
import { business } from "@/content/business";
import { communities, counties } from "@/content/service-areas";
import { absoluteUrl } from "@/lib/env";
import type { Service } from "@/content/services";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Absolute title (skips the " | Dynamic Construction MI" template) */
  absoluteTitle?: boolean;
  image?: string;
}

/** Consistent per-page metadata: canonical, Open Graph and Twitter. */
export function pageMetadata({ title, description, path, absoluteTitle, image }: PageMetaInput): Metadata {
  const ogTitle = absoluteTitle ? title : `${title} | ${business.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: ogTitle,
      description,
      url: absoluteUrl(path),
      siteName: business.name,
      type: "website",
      locale: "en_US",
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: "summary_large_image", title: ogTitle, description },
  };
}

const ORG_ID = `${absoluteUrl("/")}#organization`;

/**
 * LocalBusiness structured data. Uses only verified business facts; no
 * aggregateRating or review markup (self-serving review markup is not
 * eligible for rich results and is intentionally omitted).
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["RoofingContractor", "GeneralContractor"],
    "@id": ORG_ID,
    name: business.name,
    url: absoluteUrl("/"),
    telephone: business.phone.e164,
    image: absoluteUrl("/opengraph-image.jpg").replace(/\/$/, ""),
    logo: absoluteUrl("/icon.svg").replace(/\/$/, ""),
    foundingDate: String(business.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHours: business.hoursSchema,
    areaServed: [
      ...counties.map((c) => ({ "@type": "AdministrativeArea", name: `${c}, Michigan` })),
      ...communities.map((c) => ({ "@type": "City", name: `${c.name}, Michigan` })),
    ],
    sameAs: [business.social.facebook, business.social.instagram, business.social.yelp],
    paymentAccepted: business.paymentMethods.join(", "),
    knowsAbout: ["Pole barn construction", "Garage construction", "Roof replacement", "Roof repair", "Silicone roof coatings", "Seamless gutters"],
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    serviceType: service.name,
    provider: { "@id": ORG_ID },
    areaServed: counties.map((c) => ({ "@type": "AdministrativeArea", name: `${c}, Michigan` })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Serialize JSON-LD safely for a <script> tag (prevents `</script>` injection). */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
