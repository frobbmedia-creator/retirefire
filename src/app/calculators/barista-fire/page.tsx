import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { CALCULATOR_SEO } from "@/content/calculator-seo";
import { pageMeta } from "@/lib/seo";

const seo = CALCULATOR_SEO["barista-fire"];

export const metadata: Metadata = pageMeta(seo.path, {
  title: seo.metaTitle,
  description: seo.metaDescription,
  openGraph: {
    title: `${seo.metaTitle} · RetireFire`,
    description: seo.metaDescription,
  },
});

export default function BaristaFirePage() {
  return (
    <CalculatorPageLayout
      title={seo.title}
      description={seo.description}
      sharePath={seo.path}
      tools={["barista", "fire", "years"]}
      seo={seo}
      failureModesOverrides={{
        healthcare: {
          body: "Part-time work often means no employer health insurance. Price ACA or COBRA premiums into the gap the portfolio must cover — for many households it is the line item that breaks the barista math.",
        },
        lifestyle: {
          body: "Barista FIRE leans on work income covering part of spending. If that income stops — layoff, burnout, caregiving — the portfolio must suddenly fund 100% of spending at a number built for 60%.",
        },
      }}
    />
  );
}
