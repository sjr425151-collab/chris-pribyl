import type { Metadata, Viewport } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { publicEnv } from "@/lib/env";
import { site } from "@/content/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: {
    default: `${site.name} — Personalized mobility, movement & strength`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.headline}`,
    description: site.supporting,
    siteName: site.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-lime-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
