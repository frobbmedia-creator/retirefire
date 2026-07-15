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
    />
  );
}
