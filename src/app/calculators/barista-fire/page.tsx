import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";

export const metadata: Metadata = {
  title: "Barista FIRE Calculator",
  description:
    "Barista FIRE / semi-retirement calculator: part-time income covers some spending so your portfolio only funds the gap.",
  openGraph: {
    title: "Barista FIRE Calculator · RetireFire",
    description:
      "Shrink your FIRE number when work income covers part of lifestyle spending.",
  },
};

export default function BaristaFirePage() {
  return (
    <CalculatorPageLayout
      title="Barista FIRE Calculator"
      description="Semi-retirement math: set expected work income and see the smaller portfolio needed to cover the remaining spending gap at your withdrawal rate."
      sharePath="/calculators/barista-fire"
      tools={["barista", "fire", "years"]}
    />
  );
}
