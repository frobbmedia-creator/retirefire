import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { SeriesStrip } from "@/components/home/SeriesStrip";
import { FaqSection, FaqJsonLd } from "@/components/home/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/constants";
import {
  pageMeta,
  webApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta("/", {
  title: {
    absolute: `${SITE.title} · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.title} · ${SITE.name}`,
    description: SITE.description,
  },
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd
        data={webApplicationJsonLd({
          name: SITE.name,
          description: SITE.description,
          url: `https://${SITE.domain}`,
        })}
      />
      <FaqJsonLd />

      <Hero />
      <TrustStrip />
      <SeriesStrip />
      <FaqSection />
    </>
  );
}
