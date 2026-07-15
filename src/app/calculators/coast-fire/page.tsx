import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";

export const metadata: Metadata = {
  title: "Coast FIRE Calculator",
  description:
    "Find your Coast FIRE number: the portfolio that can grow to full FIRE by traditional retirement age with no further contributions.",
  openGraph: {
    title: "Coast FIRE Calculator · RetireFire",
    description:
      "coast = FIRE ÷ (1+r)^years. Free calculator with clear methodology.",
  },
};

export default function CoastFirePage() {
  return (
    <CalculatorPageLayout
      title="Coast FIRE Calculator"
      description="Calculate how much you need today so compound growth alone may reach full FIRE by a chosen traditional retirement age — then you can “coast” on savings rate."
      sharePath="/calculators/coast-fire"
      tools={["coast", "fire"]}
    />
  );
}
