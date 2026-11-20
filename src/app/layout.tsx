import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RevealObserver, motionBootScript } from "@/components/motion/reveal-observer";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { ConsentAndAnalytics } from "@/components/analytics/consent";
import { JsonLd } from "@/components/sections/json-ld";
import { business } from "@/content/business";
import { publicEnv } from "@/lib/env";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(`${publicEnv.siteUrl}${publicEnv.basePath}/`),
  title: {
    default: `${business.name} | Pole Barns & Roofing in Monroe County, MI`,
    template: `%s | ${business.name}`,
  },
  description:
    "Custom pole barns, garages, roofing, roof restoration and gutters from a family-owned Carleton, Michigan builder serving Monroe County since 2008.",
  applicationName: business.name,
  // Previews and staging stay out of search results until launch is approved.
  robots: publicEnv.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#101317",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${geist.variable} ${geistMono.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-paper focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-charcoal"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Suspense fallback={null}>
          <RevealObserver />
          <AnalyticsProvider />
        </Suspense>
        <ConsentAndAnalytics measurementId={publicEnv.gaMeasurementId} />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
