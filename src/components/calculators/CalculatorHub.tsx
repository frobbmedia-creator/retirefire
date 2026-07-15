"use client";

import { AssumptionsBar } from "@/components/planner/AssumptionsBar";
import { FireNumberCalculator } from "./FireNumberCalculator";
import { YearsToFireCalculator } from "./YearsToFireCalculator";
import { CoastFireCalculator } from "./CoastFireCalculator";
import { BaristaFireCalculator } from "./BaristaFireCalculator";
import { SavingsRateTable } from "./SavingsRateTable";
import { ScenarioCompare } from "./ScenarioCompare";

const JUMP = [
  { href: "#fire-number", label: "FIRE Number" },
  { href: "#years-to-fire", label: "Years to FIRE" },
  { href: "#coast-fire", label: "Coast FIRE" },
  { href: "#barista-fire", label: "Barista FIRE" },
  { href: "#scenario-compare", label: "Compare A/B" },
  { href: "#savings-rate", label: "Savings rate" },
] as const;

export function CalculatorHub({
  showHeading = true,
  tools,
}: {
  showHeading?: boolean;
  /** Which tools to show; default all */
  tools?: Array<
    "fire" | "years" | "coast" | "barista" | "savings" | "compare"
  >;
}) {
  const set = new Set(
    tools ?? ["fire", "years", "coast", "barista", "compare", "savings"],
  );

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      {showHeading && (
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            Calculators
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Shared assumptions, live charts, and shareable URLs. Every tool uses
            the same transparent math.
          </p>
          <nav
            aria-label="Jump to calculator"
            className="mt-5 flex flex-wrap gap-2"
          >
            {JUMP.filter((j) => {
              if (j.href === "#fire-number") return set.has("fire");
              if (j.href === "#years-to-fire") return set.has("years");
              if (j.href === "#coast-fire") return set.has("coast");
              if (j.href === "#barista-fire") return set.has("barista");
              if (j.href === "#scenario-compare") return set.has("compare");
              if (j.href === "#savings-rate") return set.has("savings");
              return true;
            }).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 ring-1 ring-zinc-700 transition hover:bg-zinc-800 hover:text-emerald-300 hover:ring-emerald-500/30 sm:text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <AssumptionsBar />

      {set.has("fire") && <FireNumberCalculator />}
      {set.has("years") && <YearsToFireCalculator />}
      {set.has("coast") && <CoastFireCalculator />}
      {set.has("barista") && <BaristaFireCalculator />}
      {set.has("compare") && <ScenarioCompare />}
      {set.has("savings") && <SavingsRateTable />}
    </div>
  );
}
