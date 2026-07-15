"use client";

import { useMemo } from "react";
import { Table2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePlanner } from "@/components/planner/PlannerProvider";
import { buildSavingsRateTable } from "@/lib/calculations";
import { formatCurrency, formatPercent, formatYears } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Classic “how savings rate drives years to FI” table.
 * Assumes spending fixed; higher savings rate implies higher income.
 */
export function SavingsRateTable() {
  const { state, realReturn, withdrawalRate, fire } = usePlanner();

  const rows = useMemo(
    () =>
      buildSavingsRateTable({
        annualExpenses: state.annualExpenses,
        currentPortfolio: state.currentPortfolio,
        annualReturn: realReturn,
        withdrawalRate,
      }),
    [state.annualExpenses, state.currentPortfolio, realReturn, withdrawalRate],
  );

  const currentRate =
    state.annualExpenses + state.annualContribution > 0
      ? state.annualContribution /
        (state.annualExpenses + state.annualContribution)
      : 0;

  return (
    <Card id="savings-rate" className="scroll-mt-24">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl bg-teal-500/10 p-2.5 text-teal-400 ring-1 ring-teal-500/20">
              <Table2 className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <CardTitle>Savings rate → years to FIRE</CardTitle>
              <CardDescription>
                Holding spending and your current portfolio fixed, higher savings
                rates (from higher income) shrink the timeline. Your approx.
                rate right now:{" "}
                <span className="font-medium text-teal-300">
                  {formatPercent(currentRate)}
                </span>
                .
              </CardDescription>
            </div>
          </div>
          <Badge variant="muted">Table</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-xs text-zinc-500">
          Target: {formatCurrency(fire.fireNumber)} · Return:{" "}
          {formatPercent(realReturn)} real · Withdrawal:{" "}
          {formatPercent(withdrawalRate)}
        </p>

        <div className="-mx-1 overflow-x-auto sm:mx-0">
          <table className="w-full min-w-[320px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-xs uppercase tracking-wide text-zinc-500">
                <th className="px-3 py-2.5 font-medium">Savings rate</th>
                <th className="px-3 py-2.5 font-medium">Annual save</th>
                <th className="px-3 py-2.5 font-medium">Years to FIRE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {rows.map((row) => {
                const near =
                  Math.abs(row.savingsRate - currentRate) < 0.04 &&
                  currentRate > 0;
                return (
                  <tr
                    key={row.savingsRate}
                    className={cn(
                      "tabular-nums text-zinc-300",
                      near && "bg-teal-500/10 text-teal-100",
                    )}
                  >
                    <td className="px-3 py-2.5 font-medium">
                      {formatPercent(row.savingsRate, 0)}
                      {near && (
                        <span className="ml-2 text-[10px] font-normal uppercase text-teal-400">
                          ~ you
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-zinc-400">
                      {formatCurrency(row.annualContribution)}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-zinc-100">
                      {row.unreachable
                        ? "—"
                        : row.years != null
                          ? formatYears(row.years)
                          : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-xs leading-relaxed text-zinc-500">
          Income is implied as spending ÷ (1 − savings rate) so lifestyle spend
          stays constant across rows. Starting portfolio is included. Not a
          personal plan.
        </p>
      </CardContent>
    </Card>
  );
}
