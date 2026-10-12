import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { CALCULATOR_SEO } from "@/content/calculator-seo";
import { pageMeta } from "@/lib/seo";

const seo = CALCULATOR_SEO["coast-fire"];

export const metadata: Metadata = pageMeta(seo.path, {
  title: seo.metaTitle,
  description: seo.metaDescription,
  openGraph: {
    title: `${seo.metaTitle} · RetireFire`,
    description: seo.metaDescription,
  },
});

export default function CoastFirePage() {
  return (
    <CalculatorPageLayout
      title={seo.h1 ?? seo.title}
      description={seo.lede ?? seo.description}
      sharePath={seo.path}
      tools={["coast", "fire"]}
      seo={seo}
      assumptionsHeading="Which assumptions does this calculator use?"
      failureModesOverrides={{
        sequence: {
          body: "A coast number is a decades-long compounding bet. If real returns run below the assumed rate across a 20–30 year runway, the portfolio can land far short of the full FIRE target — re-run the number at 3%, 4%, and 5% real to see the spread.",
        },
        lifestyle: {
          body: "Coast plans assume you keep working to cover spending. A job loss, health issue, or forced career break turns “no more saving needed” into “no income at all” — keep an emergency fund outside the coast math.",
        },
      }}
    />
  );
}
