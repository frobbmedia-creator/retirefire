import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";

export const metadata: Metadata = {
  title: "Years to FIRE Calculator",
  description:
    "Project how many years until you reach financial independence based on portfolio, savings, and expected real return. Includes growth chart.",
  openGraph: {
    title: "Years to FIRE Calculator · RetireFire",
    description:
      "Timeline to financial independence with transparent compound-growth math.",
  },
};

export default function YearsToFirePage() {
  return (
    <CalculatorPageLayout
      title="Years to FIRE Calculator"
      description="Solve for years until your nest egg hits your FIRE number. Uses constant real returns and end-of-year contributions, with an illustrative growth chart."
      sharePath="/calculators/years-to-fire"
      tools={["years", "fire", "savings"]}
    />
  );
}
