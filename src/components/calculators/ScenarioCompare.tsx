"use client";

import { useState } from "react";
import { Columns2, Pin, PinOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePlanner } from "@/components/planner/PlannerProvider";
import {
  clonePlannerState,
  computeScenarioMetrics,
  type ScenarioMetrics,
} from "@/lib/scenario-metrics";
import type { PlannerState } from "@/lib/planner-state";
import { formatCurrency, formatPercent, formatYears } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Free scenario comparison: pin baseline A, live assumptions are B.
 * Shareable planning without accounts.
 */
export function ScenarioCompare() {
  const { state } = usePlanner();
  const [baseline, setBaseline] = useState<PlannerState | null>(null);

  const live = computeScenarioMetrics(state, "B (live)");
  const pinned = baseline
    ? computeScenarioMetrics(baseline, "A (pinned)")
    : null;

  return (
    <Card id="scenario-compare" className="scroll-mt-24">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl bg-cyan-500/10 p-2.5 text-cyan-400 ring-1 ring-cyan-500/20">
              <Columns2 className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <CardTitle>Scenario compare (A vs B)</CardTitle>
              <CardDescription>
                Pin today&apos;s assumptions as baseline A, then change shared
                inputs above. Live results are B. Educational ranges — not advice.
              </CardDescription>
            </div>
          </div>
          <Badge variant="muted">Free</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setBaseline(clonePlannerState(state))}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-cyan-500/15 px-3 text-xs font-medium text-cyan-200 ring-1 ring-cyan-500/30 transition hover:bg-cyan-500/25"
          >
            <Pin className="h-3.5 w-3.5" aria-hidden />
            {pinned ? "Re-pin A from live" : "Pin current as A"}
          </button>
          {pinned && (
            <button
              type="button"
              onClick={() => setBaseline(null)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-zinc-800 px-3 text-xs font-medium text-zinc-300 ring-1 ring-zinc-700 transition hover:bg-zinc-700"
            >
              <PinOff className="h-3.5 w-3.5" aria-hidden />
              Clear A
            </button>
          )}
        </div>

        {!pinned && (
          <p className="rounded-xl bg-zinc-950/60 px-4 py-3 text-sm text-zinc-400 ring-1 ring-zinc-800">
            Pin a baseline to compare. Example: pin your current plan, then lower
            spending or raise savings and watch FIRE, years, Coast, and Barista
            move side by side.
          </p>
        )}

        {pinned && (
          <div className="overflow-x-auto rounded-xl ring-1 ring-zinc-800">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-zinc-900 text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-3 py-2.5 font-medium">Metric</th>
                  <th className="px-3 py-2.5 font-medium text-cyan-300/90">A (pinned)</th>
                  <th className="px-3 py-2.5 font-medium text-emerald-300/90">B (live)</th>
                  <th className="px-3 py-2.5 font-medium">Δ B − A</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                <InputRow label="Annual spending" a={pinned} b={live} field="annualExpenses" money />
                <InputRow label="Portfolio" a={pinned} b={live} field="currentPortfolio" money />
                <InputRow label="Annual savings" a={pinned} b={live} field="annualContribution" money />
                <InputRow label="Part-time income" a={pinned} b={live} field="partTimeIncome" money />
                <RateRow label="Withdrawal rate" a={pinned.withdrawalRate} b={live.withdrawalRate} />
                <RateRow label="Real return" a={pinned.realReturn} b={live.realReturn} />
                <ResultRow label="FIRE number" a={pinned.fireNumber} b={live.fireNumber} money />
                <YearsRow a={pinned} b={live} />
                <ResultRow label="Coast number" a={pinned.coastNumber} b={live.coastNumber} money />
                <ResultRow label="Barista number" a={pinned.baristaNumber} b={live.baristaNumber} money />
                <BoolRow
                  label="Already coasting?"
                  a={pinned.alreadyCoast}
                  b={live.alreadyCoast}
                />
              </tbody>
            </table>
          </div>
        )}

        <p className="text-xs leading-relaxed text-zinc-500">
          Comparison uses the same formulas as the calculators above. Sequence
          stress tests are not merged into this table — run them separately on
          Coast / Years for path risk. Educational only.
        </p>
      </CardContent>
    </Card>
  );
}

function InputRow({
  label,
  a,
  b,
  field,
  money,
}: {
  label: string;
  a: ScenarioMetrics;
  b: ScenarioMetrics;
  field: keyof Pick<
    ScenarioMetrics,
    | "annualExpenses"
    | "currentPortfolio"
    | "annualContribution"
    | "partTimeIncome"
  >;
  money?: boolean;
}) {
  return (
    <ResultRow label={label} a={a[field]} b={b[field]} money={money} />
  );
}

function ResultRow({
  label,
  a,
  b,
  money,
}: {
  label: string;
  a: number;
  b: number;
  money?: boolean;
}) {
  const delta = b - a;
  const fmt = (n: number) =>
    money ? formatCurrency(n) : n.toLocaleString("en-US");
  const fmtD = (n: number) => {
    const sign = n > 0 ? "+" : "";
    return money ? `${sign}${formatCurrency(n)}` : `${sign}${n.toLocaleString("en-US")}`;
  };
  return (
    <tr className="bg-zinc-950/30">
      <td className="px-3 py-2.5 text-zinc-400">{label}</td>
      <td className="px-3 py-2.5 font-mono tabular-nums text-zinc-300">{fmt(a)}</td>
      <td className="px-3 py-2.5 font-mono tabular-nums text-zinc-100">{fmt(b)}</td>
      <td
        className={cn(
          "px-3 py-2.5 font-mono tabular-nums",
          delta > 0
            ? "text-amber-300/90"
            : delta < 0
              ? "text-emerald-400/90"
              : "text-zinc-600",
        )}
      >
        {Math.abs(delta) < 0.5 ? "—" : fmtD(delta)}
      </td>
    </tr>
  );
}

function RateRow({
  label,
  a,
  b,
}: {
  label: string;
  a: number;
  b: number;
}) {
  const delta = b - a;
  return (
    <tr className="bg-zinc-950/30">
      <td className="px-3 py-2.5 text-zinc-400">{label}</td>
      <td className="px-3 py-2.5 font-mono tabular-nums text-zinc-300">
        {formatPercent(a)}
      </td>
      <td className="px-3 py-2.5 font-mono tabular-nums text-zinc-100">
        {formatPercent(b)}
      </td>
      <td className="px-3 py-2.5 font-mono tabular-nums text-zinc-500">
        {Math.abs(delta) < 0.0005
          ? "—"
          : `${delta > 0 ? "+" : ""}${formatPercent(delta)}`}
      </td>
    </tr>
  );
}

function YearsRow({
  a,
  b,
}: {
  a: ScenarioMetrics;
  b: ScenarioMetrics;
}) {
  const fa = yearsLabel(a);
  const fb = yearsLabel(b);
  return (
    <tr className="bg-zinc-950/30">
      <td className="px-3 py-2.5 text-zinc-400">Years to FIRE</td>
      <td className="px-3 py-2.5 font-mono tabular-nums text-zinc-300">{fa}</td>
      <td className="px-3 py-2.5 font-mono tabular-nums text-zinc-100">{fb}</td>
      <td className="px-3 py-2.5 font-mono tabular-nums text-zinc-500">
        {a.yearsToFire != null &&
        b.yearsToFire != null &&
        !a.yearsUnreachable &&
        !b.yearsUnreachable
          ? (() => {
              const d = b.yearsToFire - a.yearsToFire;
              if (Math.abs(d) < 0.05) return "—";
              return `${d > 0 ? "+" : ""}${formatYears(d)} yrs`;
            })()
          : "—"}
      </td>
    </tr>
  );
}

function yearsLabel(m: ScenarioMetrics): string {
  if (m.alreadyAtFire) return "0";
  if (m.yearsUnreachable || m.yearsToFire == null) return "—";
  return formatYears(m.yearsToFire);
}

function BoolRow({
  label,
  a,
  b,
}: {
  label: string;
  a: boolean;
  b: boolean;
}) {
  return (
    <tr className="bg-zinc-950/30">
      <td className="px-3 py-2.5 text-zinc-400">{label}</td>
      <td className="px-3 py-2.5 text-zinc-300">{a ? "Yes" : "No"}</td>
      <td className="px-3 py-2.5 text-zinc-100">{b ? "Yes" : "No"}</td>
      <td className="px-3 py-2.5 text-zinc-600">
        {a === b ? "—" : b ? "Now yes" : "Now no"}
      </td>
    </tr>
  );
}
