"use client";

import { useMemo } from "react";
import { Timer } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GrowthChart } from "@/components/ui/chart";
import { usePlanner } from "@/components/planner/PlannerProvider";
import { StressTestPanel } from "@/components/calculators/StressTestPanel";
import { SensitivityStrip } from "@/components/calculators/SensitivityStrip";
import { buildProjectionSeries } from "@/lib/calculations";
import { formatCurrency, formatPercent, formatYears } from "@/lib/format";

export function YearsToFireCalculator() {
  const { state, fire, years, realReturn } = usePlanner();

  const chartYears = Math.min(
    50,
    Math.ceil(
      years.alreadyThere
        ? 5
        : years.years != null && !years.unreachable
          ? years.years
          : 30,
    ),
  );

  const series = useMemo(
    () =>
      buildProjectionSeries({
        currentPortfolio: state.currentPortfolio,
        annualContribution: state.annualContribution,
        annualReturn: realReturn,
        years: chartYears,
      }),
    [state.currentPortfolio, state.annualContribution, realReturn, chartYears],
  );

  const savingsRate =
    state.annualExpenses + state.annualContribution > 0
      ? state.annualContribution /
        (state.annualExpenses + state.annualContribution)
      : 0;

  return (
    <Card id="years-to-fire" className="scroll-mt-24">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl bg-sky-500/10 p-2.5 text-sky-400 ring-1 ring-sky-500/20">
              <Timer className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <CardTitle>Years to FIRE</CardTitle>
              <CardDescription>
                How long until your portfolio reaches your FIRE number, given
                savings and a constant real return.
              </CardDescription>
            </div>
          </div>
          <Badge variant="muted">Projection</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-3 rounded-2xl bg-zinc-950/70 p-4 ring-1 ring-zinc-800 sm:grid-cols-3 sm:p-5">
          <div className="rounded-xl bg-zinc-900/50 p-3 sm:p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Years to FIRE
            </p>
            <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-sky-400 sm:text-3xl">
              {years.alreadyThere
                ? "0"
                : years.unreachable
                  ? "—"
                  : formatYears(years.years ?? 0)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {years.alreadyThere
                ? "You’re at or above your target."
                : years.unreachable
                  ? "Unreachable with current inputs."
                  : `At ${formatPercent(realReturn)} real return.`}
            </p>
          </div>
          <div className="rounded-xl bg-zinc-900/50 p-3 sm:p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Target portfolio
            </p>
            <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-zinc-100">
              {formatCurrency(fire.fireNumber)}
            </p>
          </div>
          <div className="rounded-xl bg-zinc-900/50 p-3 sm:p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Approx. savings rate
            </p>
            <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-zinc-100">
              {formatPercent(savingsRate)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Savings ÷ (savings + spend)
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-zinc-950/50 p-3 ring-1 ring-zinc-800 sm:p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
            Portfolio path (illustrative)
          </p>
          <GrowthChart
            data={series}
            target={fire.fireNumber}
            targetLabel="FIRE"
            height={180}
          />
        </div>

        <SensitivityStrip mode="years" />

        <p className="text-xs leading-relaxed text-zinc-500">
          End-of-year contributions and constant return. Markets are volatile;
          fees and taxes are not modeled. Use the stress test below for an
          educational sequence-of-returns range. Educational only.
        </p>

        <StressTestPanel
          tool="years"
          startPortfolio={state.currentPortfolio}
          annualContribution={state.annualContribution}
          meanReturn={realReturn}
          years={
            years.alreadyThere
              ? 10
              : years.years != null && !years.unreachable
                ? Math.max(1, Math.ceil(years.years))
                : 30
          }
          target={fire.fireNumber}
          targetLabel="FIRE number"
          enabled={fire.fireNumber > 0}
          disabledReason="Set a positive FIRE target (spending and withdrawal rate) to run the stress test."
        />
      </CardContent>
    </Card>
  );
}
