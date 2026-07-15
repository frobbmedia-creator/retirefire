"use client";

import { usePlanner } from "@/components/planner/PlannerProvider";
import {
  calculateBaristaFire,
  calculateCoastFire,
  calculateFireNumber,
  calculateYearsToFire,
} from "@/lib/calculations";
import { formatCurrency, formatPercent, formatYears } from "@/lib/format";
import { cn } from "@/lib/utils";

const SWR_PRESETS = [0.03, 0.035, 0.04, 0.045] as const;
const RETURN_PRESETS = [0.03, 0.04, 0.05, 0.06] as const;
const WORK_INCOME_PRESETS = [0, 15_000, 25_000, 40_000] as const;

type Mode = "fire" | "years" | "coast" | "barista";

/**
 * One-click sensitivity chips — educational ranges without hiding the main result.
 * Tapping a chip updates shared assumptions so all tools stay consistent.
 */
export function SensitivityStrip({ mode }: { mode: Mode }) {
  const { state, setField, realReturn, withdrawalRate, fire } = usePlanner();

  if (mode === "fire") {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-3 sm:p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Sensitivity — withdrawal rate
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          Same spending ({formatCurrency(state.annualExpenses)}). Tap to apply
          to shared assumptions.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SWR_PRESETS.map((rate) => {
            const n = calculateFireNumber({
              annualExpenses: state.annualExpenses,
              withdrawalRate: rate,
            }).fireNumber;
            const active = Math.abs(withdrawalRate - rate) < 0.0005;
            return (
              <button
                key={rate}
                type="button"
                onClick={() => setField("withdrawalRatePct", rate * 100)}
                className={cn(
                  "rounded-xl px-2 py-2.5 text-left ring-1 transition",
                  active
                    ? "bg-emerald-500/15 ring-emerald-500/40"
                    : "bg-zinc-900/80 ring-zinc-800 hover:ring-zinc-600",
                )}
              >
                <p className="text-[11px] font-medium text-zinc-500">
                  {formatPercent(rate)}
                </p>
                <p className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-zinc-100">
                  {formatCurrency(n, { compact: true })}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (mode === "years") {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-3 sm:p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Sensitivity — real return
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          Target {formatCurrency(fire.fireNumber)}. Tap a return to apply
          (real mode).
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {RETURN_PRESETS.map((r) => {
            const y = calculateYearsToFire({
              currentPortfolio: state.currentPortfolio,
              annualContribution: state.annualContribution,
              annualReturn: r,
              targetAmount: fire.fireNumber,
            });
            const active =
              !state.useNominal && Math.abs(realReturn - r) < 0.0005;
            const label = y.alreadyThere
              ? "0 yrs"
              : y.unreachable || y.years == null
                ? "—"
                : `${formatYears(y.years)} yrs`;
            return (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setField("useNominal", false);
                  setField("expectedReturnPct", r * 100);
                }}
                className={cn(
                  "rounded-xl px-2 py-2.5 text-left ring-1 transition",
                  active
                    ? "bg-sky-500/15 ring-sky-500/40"
                    : "bg-zinc-900/80 ring-zinc-800 hover:ring-zinc-600",
                )}
              >
                <p className="text-[11px] font-medium text-zinc-500">
                  {formatPercent(r)} real
                </p>
                <p className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-zinc-100">
                  {label}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (mode === "barista") {
    return (
      <div className="space-y-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-3 sm:p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Sensitivity — work income
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Same spending ({formatCurrency(state.annualExpenses)}) at{" "}
            {formatPercent(withdrawalRate)}. Tap to set part-time income.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {WORK_INCOME_PRESETS.map((income) => {
              const b = calculateBaristaFire({
                annualExpenses: state.annualExpenses,
                partTimeIncome: income,
                withdrawalRate,
                currentPortfolio: state.currentPortfolio,
                annualContribution: state.annualContribution,
                annualReturn: realReturn,
              });
              const active = Math.abs(state.partTimeIncome - income) < 0.5;
              return (
                <button
                  key={income}
                  type="button"
                  onClick={() => setField("partTimeIncome", income)}
                  className={cn(
                    "rounded-xl px-2 py-2.5 text-left ring-1 transition",
                    active
                      ? "bg-orange-500/15 ring-orange-500/40"
                      : "bg-zinc-900/80 ring-zinc-800 hover:ring-zinc-600",
                  )}
                >
                  <p className="text-[11px] font-medium text-zinc-500">
                    {income === 0 ? "No work $" : formatCurrency(income, { compact: true })}
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-zinc-100">
                    {formatCurrency(b.baristaNumber, { compact: true })}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-3 sm:p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Sensitivity — withdrawal rate
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {SWR_PRESETS.map((rate) => {
              const b = calculateBaristaFire({
                annualExpenses: state.annualExpenses,
                partTimeIncome: state.partTimeIncome,
                withdrawalRate: rate,
                currentPortfolio: state.currentPortfolio,
                annualContribution: state.annualContribution,
                annualReturn: realReturn,
              });
              const active = Math.abs(withdrawalRate - rate) < 0.0005;
              return (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setField("withdrawalRatePct", rate * 100)}
                  className={cn(
                    "rounded-xl px-2 py-2.5 text-left ring-1 transition",
                    active
                      ? "bg-orange-500/15 ring-orange-500/40"
                      : "bg-zinc-900/80 ring-zinc-800 hover:ring-zinc-600",
                  )}
                >
                  <p className="text-[11px] font-medium text-zinc-500">
                    {formatPercent(rate)}
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-zinc-100">
                    {formatCurrency(b.baristaNumber, { compact: true })}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // coast
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-3 sm:p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        Sensitivity — real return
      </p>
      <p className="mt-1 text-xs text-zinc-500">
        Coast number for full FIRE {formatCurrency(fire.fireNumber)} by age{" "}
        {state.retirementAge}. Lower r raises today&apos;s bar.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {RETURN_PRESETS.map((r) => {
          const c = calculateCoastFire({
            fireNumber: fire.fireNumber,
            currentPortfolio: state.currentPortfolio,
            currentAge: state.currentAge,
            retirementAge: state.retirementAge,
            annualReturn: r,
          });
          const active =
            !state.useNominal && Math.abs(realReturn - r) < 0.0005;
          return (
            <button
              key={r}
              type="button"
              onClick={() => {
                setField("useNominal", false);
                setField("expectedReturnPct", r * 100);
              }}
              className={cn(
                "rounded-xl px-2 py-2.5 text-left ring-1 transition",
                active
                  ? "bg-violet-500/15 ring-violet-500/40"
                  : "bg-zinc-900/80 ring-zinc-800 hover:ring-zinc-600",
              )}
            >
              <p className="text-[11px] font-medium text-zinc-500">
                {formatPercent(r)} real
              </p>
              <p className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-zinc-100">
                {formatCurrency(c.coastNumber, { compact: true })}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
