import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DisclaimerBanner } from "@/components/home/DisclaimerBanner";
import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { SITE } from "@/lib/constants";
import { absoluteUrl } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.title} · ${SITE.name}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(absoluteUrl("/")),
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: `${SITE.title} · ${SITE.name}`,
    description: SITE.description,
    url: absoluteUrl("/"),
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — free FIRE calculators`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.title} · ${SITE.name}`,
    description: SITE.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "FIRE calculator",
    "FIRE number calculator",
    "Coast FIRE calculator",
    "Barista FIRE calculator",
    "years to FIRE",
    "financial independence",
    "4% rule",
    "safe withdrawal rate",
  ],
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark`}
    >
      <body className="flex min-h-full flex-col bg-zinc-950 text-zinc-50 antialiased">
        <div data-print-hide>
          <DisclaimerBanner />
        </div>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <div data-print-hide>
          <FeedbackWidget />
        </div>
        {/* Privacy-friendly first-party analytics + performance (no cookies); no-ops off Vercel */}
        <Analytics />
        <SpeedInsights />
        {/* Optional GA4 / Plausible — only load when NEXT_PUBLIC_* env vars are set */}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
