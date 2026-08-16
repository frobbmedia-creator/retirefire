"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CircleHelp, Timer } from "lucide-react";
import { MoneyInput } from "@/components/ui/money-input";
import { Input } from "@/components/ui/input";
import { calculateFireNumber, calculateYearsToFire } from "@/lib/calculations";
import { DEFAULTS } from "@/lib/constants";
import { formatCurrency, formatPercent, formatYears } from "@/lib/format";

export type QuickYearsInputs = {
  currentPortfolio?: number | null;
  annualContribution?: number | null;
  annualReturn?: number | null;
  targetAmount?: number | null;
};

/**
 * Years need the same four inputs as `calculateYearsToFire`.
 * Spending and withdrawal rate only produce a FIRE target — never a timeline.
 */
export function shouldShowQuickYears(input: QuickYearsInputs): boolean {
  const { currentPortfolio, annualContribution, annualReturn, targetAmount } =
    input;
  if (
    currentPortfolio == null ||
    annualContribution == null ||
    annualReturn == null ||
    targetAmount == null
  ) {
    return false;
  }
  if (
    ![currentPortfolio, annualContribution, annualReturn, targetAmount].every(
      Number.isFinite,
    )
  ) {
    return false;
  }
  if (currentPortfolio < 0 || annualContribution < 0 || targetAmount <= 0) {
    return false;
  }
  return currentPortfolio > 0 || annualContribution > 0;
}

export function HomeQuickCalculator() {
  const [spending, setSpending] = useState(60_000);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [currentPortfolio, setCurrentPortfolio] = useState(0);
  const [annualContribution, setAnnualContribution] = useState(0);
  const [realReturnPct, setRealReturnPct] = useState(DEFAULTS.realReturn * 100);

  const result = useMemo(
    () =>
      calculateFireNumber({
        annualExpenses: spending,
        withdrawalRate: withdrawalRate / 100,
      }),
    [spending, withdrawalRate],
  );

  const yearsInputs = {
    currentPortfolio,
    annualContribution,
    annualReturn: realReturnPct / 100,
    targetAmount: result.fireNumber,
  };
  const showYears = shouldShowQuickYears(yearsInputs);
  const years = showYears ? calculateYearsToFire(yearsInputs) : null;

  const yearsSummary = years
    ? years.alreadyThere
      ? "Already at or above the illustrative FIRE target under these inputs."
      : years.unreachable || years.years == null
        ? "The target is unreachable with the current portfolio, savings, and assumed real return."
        : `About ${formatYears(years.years)} years to the illustrative FIRE target at ${formatPercent(yearsInputs.annualReturn)} real return.`
    : "Add current portfolio or annual savings to see years to FIRE. A spending-based target alone cannot produce a timeline.";

  return (
    <section
      id="calculators"
      className="scroll-mt-20 border-b border-zinc-800/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-9 sm:px-6 sm:py-12">
        <div className="grid overflow-hidden rounded-3xl border border-emerald-500/20 bg-zinc-900/50 shadow-2xl shadow-black/20 lg:grid-cols-[1fr_0.9fr]">
          <div className="p-5 sm:p-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
              Quick start
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50">
              Find your FIRE number
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
              Start with annual spending and a planning withdrawal rate. Years
              appear only after portfolio, savings, and a documented real return
              are present — the same inputs as the full Years to FIRE tool.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <MoneyInput
                id="quick-annual-spending"
                label="Annual spending"
                value={spending}
                onChange={setSpending}
                hint="Today’s dollars, including housing, healthcare, and taxes."
              />
              <Input
                id="quick-withdrawal-rate"
                label="Withdrawal rate (%)"
                type="number"
                inputMode="decimal"
                min={0.1}
                max={10}
                step={0.1}
                value={withdrawalRate}
                onChange={(event) =>
                  setWithdrawalRate(Number(event.target.value))
                }
                hint="Planning rate, not a promised safe withdrawal."
              />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <MoneyInput
                id="quick-current-portfolio"
                label="Current portfolio (optional)"
                value={currentPortfolio}
                onChange={setCurrentPortfolio}
                hint="Needed for a years estimate."
              />
              <MoneyInput
                id="quick-annual-contribution"
                label="Annual savings (optional)"
                value={annualContribution}
                onChange={setAnnualContribution}
                hint="Needed for a years estimate."
              />
              <Input
                id="quick-real-return"
                label="Assumed real return (%)"
                type="number"
                inputMode="decimal"
                min={-20}
                max={20}
                step={0.1}
                value={realReturnPct}
                onChange={(event) =>
                  setRealReturnPct(Number(event.target.value))
                }
                hint={`Documented default ${formatPercent(DEFAULTS.realReturn)} real. Educational constant, not a forecast.`}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center border-t border-zinc-800 bg-zinc-950/60 p-5 sm:p-7 lg:border-l lg:border-t-0">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Illustrative target
            </p>
            <p className="mt-2 font-mono text-4xl font-semibold tracking-tight text-emerald-300 sm:text-5xl">
              {formatCurrency(result.fireNumber)}
            </p>
            <p className="mt-2 flex items-start gap-2 text-sm text-zinc-400">
              <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
              <span>
                {result.multiplier.toFixed(1)}× annual spending at{" "}
                {formatPercent(withdrawalRate / 100)}. This is an illustration
                under those two inputs — not a forecast.
              </span>
            </p>
            {showYears && years ? (
              <p
                className="mt-4 flex items-start gap-2 rounded-xl bg-zinc-900/80 px-3 py-3 text-sm text-zinc-300 ring-1 ring-zinc-800"
                role="status"
              >
                <Timer className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden />
                <span>
                  {years.alreadyThere
                    ? "Status: already at target. "
                    : years.unreachable
                      ? "Status: unreachable with current savings path. "
                      : `Status: about ${formatYears(years.years ?? 0)} years. `}
                  {yearsSummary}
                </span>
              </p>
            ) : (
              <p className="mt-4 text-sm text-zinc-500">{yearsSummary}</p>
            )}
            <p className="mt-3 text-sm text-zinc-500">
              <Link
                href="/methodology"
                className="inline-flex min-h-11 items-center text-emerald-400 hover:underline"
              >
                Methodology
              </Link>
              {" · "}
              <Link
                href="/disclaimer"
                className="inline-flex min-h-11 items-center text-emerald-400 hover:underline"
              >
                Disclaimer
              </Link>
            </p>
            <Link
              href="/calculators"
              className="mt-2 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Explore all calculators
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
