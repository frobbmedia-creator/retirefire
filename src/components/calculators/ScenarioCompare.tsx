"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Columns2,
  Minus,
  Pin,
  PinOff,
} from "lucide-react";
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
import { ProTeaserStrip } from "@/components/ui/pro-teaser";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Direction = "up" | "down" | "flat";

type CompareRow = {
  label: string;
  a: string;
  b: string;
  delta: string;
  direction: Direction;
};

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
  const rows = pinned ? buildCompareRows(pinned, live) : [];

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
            className="inline-flex h-11 min-h-11 items-center gap-1.5 rounded-lg bg-cyan-500/15 px-3 text-sm font-medium text-cyan-200 ring-1 ring-cyan-500/30 transition hover:bg-cyan-500/25"
          >
            <Pin className="h-4 w-4" aria-hidden />
            {pinned ? "Re-pin A from live" : "Pin current as A"}
          </button>
          {pinned && (
            <button
              type="button"
              onClick={() => setBaseline(null)}
              className="inline-flex h-11 min-h-11 items-center gap-1.5 rounded-lg bg-zinc-800 px-3 text-sm font-medium text-zinc-300 ring-1 ring-zinc-700 transition hover:bg-zinc-700"
            >
              <PinOff className="h-4 w-4" aria-hidden />
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
          <>
            <p
              className="rounded-xl bg-zinc-950/60 px-4 py-3 text-sm leading-relaxed text-zinc-300 ring-1 ring-zinc-800"
              role="status"
            >
              {compareSummary(pinned, live)}
            </p>

            <ul className="grid gap-3 sm:hidden">
              {rows.map((row) => (
                <li
                  key={row.label}
                  className="rounded-xl bg-zinc-950/60 p-3 ring-1 ring-zinc-800"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    {row.label}
                  </p>
                  <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <dt className="text-zinc-500">A (pinned)</dt>
                      <dd className="font-mono tabular-nums text-zinc-300">
                        {row.a}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">B (live)</dt>
                      <dd className="font-mono tabular-nums text-zinc-100">
                        {row.b}
                      </dd>
                    </div>
                  </dl>
                  <DeltaBadge direction={row.direction} label={row.delta} />
                </li>
              ))}
            </ul>

            <div className="hidden overflow-x-auto rounded-xl ring-1 ring-zinc-800 sm:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-900 text-xs uppercase tracking-wide text-zinc-500">
                  <tr>
                    <th className="px-3 py-2.5 font-medium">Metric</th>
                    <th className="px-3 py-2.5 font-medium text-cyan-300/90">
                      A (pinned)
                    </th>
                    <th className="px-3 py-2.5 font-medium text-emerald-300/90">
                      B (live)
                    </th>
                    <th className="px-3 py-2.5 font-medium">Δ B − A</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {rows.map((row) => (
                    <tr key={row.label} className="bg-zinc-950/30">
                      <td className="px-3 py-2.5 text-zinc-400">{row.label}</td>
                      <td className="px-3 py-2.5 font-mono tabular-nums text-zinc-300">
                        {row.a}
                      </td>
                      <td className="px-3 py-2.5 font-mono tabular-nums text-zinc-100">
                        {row.b}
                      </td>
                      <td className="px-3 py-2.5">
                        <DeltaBadge
                          direction={row.direction}
                          label={row.delta}
                          compact
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <ProTeaserStrip
          freeLabel="Pin A vs live B · same formulas · no account"
          proLabel="Saved scenarios, history of runs, multi-compare (planned)"
        />

        <p className="text-xs leading-relaxed text-zinc-500">
          Comparison uses the same formulas as the calculators above. Sequence
          stress tests are not merged into this table — run them separately on
          Coast / Years for path risk. Educational only.{" "}
          <Link
            href="/methodology"
            className="text-emerald-400/90 underline-offset-2 hover:underline"
          >
            Methodology
          </Link>
          {" · "}
          <Link
            href="/resources/sequence-risk-guide"
            className="text-emerald-400/90 underline-offset-2 hover:underline"
          >
            Sequence-risk guide
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
}

function buildCompareRows(a: ScenarioMetrics, b: ScenarioMetrics): CompareRow[] {
  return [
    moneyRow("Annual spending", a.annualExpenses, b.annualExpenses),
    moneyRow("Portfolio", a.currentPortfolio, b.currentPortfolio),
    moneyRow("Annual savings", a.annualContribution, b.annualContribution),
    moneyRow("Part-time income", a.partTimeIncome, b.partTimeIncome),
    rateRow("Withdrawal rate", a.withdrawalRate, b.withdrawalRate),
    rateRow("Real return", a.realReturn, b.realReturn),
    moneyRow("FIRE number", a.fireNumber, b.fireNumber),
    yearsRow(a, b),
    moneyRow("Coast number", a.coastNumber, b.coastNumber),
    moneyRow("Barista number", a.baristaNumber, b.baristaNumber),
    boolRow("Already coasting?", a.alreadyCoast, b.alreadyCoast),
  ];
}

function moneyRow(label: string, a: number, b: number): CompareRow {
  const delta = b - a;
  return {
    label,
    a: formatCurrency(a),
    b: formatCurrency(b),
    delta: Math.abs(delta) < 0.5 ? "Unchanged" : signedMoney(delta),
    direction: directionFromDelta(delta, 0.5),
  };
}

function rateRow(label: string, a: number, b: number): CompareRow {
  const delta = b - a;
  return {
    label,
    a: formatPercent(a),
    b: formatPercent(b),
    delta:
      Math.abs(delta) < 0.0005
        ? "Unchanged"
        : `${delta > 0 ? "+" : ""}${formatPercent(delta)}`,
    direction: directionFromDelta(delta, 0.0005),
  };
}

function yearsRow(a: ScenarioMetrics, b: ScenarioMetrics): CompareRow {
  const aYears = a.yearsToFire;
  const bYears = b.yearsToFire;
  const comparable =
    aYears != null &&
    bYears != null &&
    !a.yearsUnreachable &&
    !b.yearsUnreachable;
  const delta = comparable && aYears != null && bYears != null ? bYears - aYears : null;
  return {
    label: "Years to FIRE",
    a: yearsLabel(a),
    b: yearsLabel(b),
    delta:
      delta == null || Math.abs(delta) < 0.05
        ? "Unchanged"
        : `${delta > 0 ? "+" : ""}${formatYears(delta)} yrs`,
    direction: delta == null ? "flat" : directionFromDelta(delta, 0.05),
  };
}

function boolRow(label: string, a: boolean, b: boolean): CompareRow {
  return {
    label,
    a: a ? "Yes" : "No",
    b: b ? "Yes" : "No",
    delta: a === b ? "Unchanged" : b ? "Now yes" : "Now no",
    direction: "flat",
  };
}

function yearsLabel(m: ScenarioMetrics): string {
  if (m.alreadyAtFire) return "0";
  if (m.yearsUnreachable || m.yearsToFire == null) return "—";
  return formatYears(m.yearsToFire);
}

function signedMoney(n: number): string {
  return `${n > 0 ? "+" : ""}${formatCurrency(n)}`;
}

function directionFromDelta(delta: number, epsilon: number): Direction {
  if (Math.abs(delta) < epsilon) return "flat";
  return delta > 0 ? "up" : "down";
}

function compareSummary(a: ScenarioMetrics, b: ScenarioMetrics): string {
  const fireDelta = b.fireNumber - a.fireNumber;
  const firePart =
    Math.abs(fireDelta) < 0.5
      ? `FIRE number is unchanged at ${formatCurrency(b.fireNumber)}.`
      : `FIRE number moved from ${formatCurrency(a.fireNumber)} to ${formatCurrency(b.fireNumber)} (${signedMoney(fireDelta)}).`;
  const yearsPart = `Years to FIRE moved from ${yearsLabel(a)} to ${yearsLabel(b)}.`;
  return `${firePart} ${yearsPart} Same formulas as the calculators above — educational ranges, not forecasts.`;
}

function DeltaBadge({
  direction,
  label,
  compact,
}: {
  direction: Direction;
  label: string;
  compact?: boolean;
}) {
  const Icon =
    direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus;
  const word =
    direction === "up" ? "Higher" : direction === "down" ? "Lower" : "Unchanged";
  return (
    <p
      className={cn(
        "mt-2 inline-flex items-center gap-1.5 font-mono text-xs tabular-nums sm:text-sm",
        compact && "mt-0",
        direction === "up"
          ? "text-amber-300/90"
          : direction === "down"
            ? "text-emerald-400/90"
            : "text-zinc-500",
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      <span>
        {label === "Unchanged" ? word : `${word}: ${label}`}
      </span>
    </p>
  );
}
