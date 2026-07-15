import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";

export const metadata: Metadata = {
  title: "FIRE Number Calculator",
  description:
    "Calculate your FIRE number: annual spending ÷ safe withdrawal rate. Lean, Regular, and Fat FIRE presets with transparent 4% rule math.",
  openGraph: {
    title: "FIRE Number Calculator · RetireFire",
    description:
      "Know the portfolio size needed for financial independence. Free, evidence-based.",
  },
};

export default function FireNumberPage() {
  return (
    <CalculatorPageLayout
      title="FIRE Number Calculator"
      description="Estimate the invested portfolio that can support your lifestyle at a chosen withdrawal rate. Defaults follow classic 4% / 25× math — fully adjustable."
      sharePath="/calculators/fire-number"
      tools={["fire", "savings"]}
    />
  );
}
