import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { CALCULATOR_SEO } from "@/content/calculator-seo";
import { pageMeta } from "@/lib/seo";

const seo = CALCULATOR_SEO["years-to-fire"];

export const metadata: Metadata = pageMeta(seo.path, {
  title: seo.metaTitle,
  description: seo.metaDescription,
  openGraph: {
    title: `${seo.metaTitle} · RetireFire`,
    description: seo.metaDescription,
  },
});

export default function YearsToFirePage() {
  return (
    <CalculatorPageLayout
      title={seo.title}
      description={seo.description}
      sharePath={seo.path}
      tools={["years", "fire", "savings"]}
      seo={seo}
      failureModesOverrides={{
        lifestyle: {
          body: "Timeline math assumes your savings rate holds for years. Lifestyle creep, a bigger house, or kids can quietly add years — re-run the timeline whenever spending changes, not just once a year.",
        },
        sequence: {
          body: "Years-to-FI math usually assumes smooth real returns. Real markets deliver the same average in lumps — a flat decade early on pushes the date out even if the long-run average holds.",
        },
      }}
    />
  );
}
