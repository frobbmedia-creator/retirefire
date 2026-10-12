import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { CALCULATOR_SEO } from "@/content/calculator-seo";
import { pageMeta } from "@/lib/seo";

const seo = CALCULATOR_SEO["fire-number"];

export const metadata: Metadata = pageMeta(seo.path, {
  title: seo.metaTitle,
  description: seo.metaDescription,
  openGraph: {
    title: `${seo.metaTitle} · RetireFire`,
    description: seo.metaDescription,
  },
});

export default function FireNumberPage() {
  return (
    <CalculatorPageLayout
      title={seo.title}
      description={seo.description}
      sharePath={seo.path}
      tools={["fire", "savings"]}
      seo={seo}
      failureModesOverrides={{
        taxes: {
          body: "The 25× multiple is pre-tax shorthand. A $1.5M traditional-IRA-heavy portfolio is not $1.5M of spending power — withdrawal taxes and account mix decide what the number actually buys.",
        },
        sequence: {
          body: "The 4% rule survived historical backtests, not the future. Retiring into weak early years with rigid withdrawals is the classic failure mode — guardrails and spending flexibility matter more than the starting multiple.",
        },
      }}
    />
  );
}
