"use client";

import { useMemo, useState } from "react";
import { Download, Table2 } from "lucide-react";
import { usePlanner } from "@/components/planner/PlannerProvider";
import {
  buildCoastAgeTable,
  coastAgeTableToCsv,
} from "@/lib/coast-tables";
import { downloadTextFile } from "@/lib/export-scenario";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { formatCurrency, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Linkable age-by-age Coast FIRE table driven by shared assumptions.
 */
export function CoastAgeTable() {
  const { state, fire, realReturn } = usePlanner();
  const [exported, setExported] = useState(false);

  const altReturn = realReturn > 0.045 ? 0.04 : Math.max(0.02, realReturn - 0.01);

  const rows = useMemo(
    () =>
      buildCoastAgeTable({
        fireNumber: fire.fireNumber,
        retirementAge: state.retirementAge,
        realReturn,
        altRealReturn: altReturn,
        ageFrom: 25,
        ageTo: 55,
        ageStep: 5,
      }),
    [fire.fireNumber, state.retirementAge, realReturn, altReturn],
  );

  function exportCsv() {
    const csv = coastAgeTableToCsv(rows, {
      fireNumber: fire.fireNumber,
      retirementAge: state.retirementAge,
      realReturn,
      altRealReturn: altReturn,
      annualSpending: state.annualExpenses,
      withdrawalRate: state.withdrawalRatePct / 100,
    });
    downloadTextFile(
      `retirefire-coast-by-age-${new Date().toISOString().slice(0, 10)}.csv`,
      csv,
    );
    trackEvent(AnalyticsEvents.CSV_EXPORT, { path: "coast-age-table" });
    setExported(true);
    window.setTimeout(() => setExported(false), 2000);
  }

  if (rows.length === 0) {
    return (
      <p className="rounded-xl bg-zinc-900/50 px-4 py-3 text-sm text-zinc-500 ring-1 ring-zinc-800">
        Set a traditional retirement age above 25 to see the age table.
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Table2 className="mt-0.5 h-4 w-4 text-violet-400" aria-hidden />
          <div>
            <p className="text-sm font-semibold text-zinc-100">
              Coast FIRE by age
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">
              Full FIRE {formatCurrency(fire.fireNumber)} by age{" "}
              {state.retirementAge}. Primary r = {formatPercent(realReturn)};
              stress column at {formatPercent(altReturn)}. Educational only.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-zinc-800 px-3 text-xs font-medium text-zinc-300 ring-1 ring-zinc-700 transition hover:bg-zinc-700"
        >
          <Download className="h-3.5 w-3.5" aria-hidden />
          {exported ? "Exported!" : "Export table CSV"}
        </button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-zinc-800">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead className="bg-zinc-900 text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-3 py-2.5 font-medium">Age</th>
              <th className="px-3 py-2.5 font-medium">Years</th>
              <th className="px-3 py-2.5 font-medium">
                Coast @ {formatPercent(realReturn, 0)}
              </th>
              <th className="px-3 py-2.5 font-medium">
                Coast @ {formatPercent(altReturn, 0)}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80">
            {rows.map((row) => {
              const highlight =
                Math.abs(row.age - state.currentAge) <= 2 ||
                row.age === state.currentAge;
              return (
                <tr
                  key={row.age}
                  className={cn(
                    highlight ? "bg-violet-500/10" : "bg-zinc-950/30",
                  )}
                >
                  <td className="px-3 py-2.5 font-medium text-zinc-200">
                    {row.age}
                    {highlight && (
                      <span className="ml-1.5 text-[10px] font-normal text-violet-300">
                        near you
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 font-mono tabular-nums text-zinc-400">
                    {row.yearsToRetirement}
                  </td>
                  <td className="px-3 py-2.5 font-mono tabular-nums text-violet-300">
                    {formatCurrency(row.coastNumber)}
                  </td>
                  <td className="px-3 py-2.5 font-mono tabular-nums text-zinc-300">
                    {formatCurrency(row.coastNumberAlt ?? 0)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">
        Formula: coast = FIRE ÷ (1+r)^years. Not early retirement funding.
        Sequence risk is not in this table — use the stress test below.
      </p>
    </div>
  );
}
