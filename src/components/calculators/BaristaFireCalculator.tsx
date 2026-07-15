"use client";

import { Coffee } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoneyInput } from "@/components/ui/money-input";
import { usePlanner } from "@/components/planner/PlannerProvider";
import { SensitivityStrip } from "@/components/calculators/SensitivityStrip";
import { formatCurrency, formatPercent, formatYears } from "@/lib/format";

/**
 * Barista FIRE: part-time income covers part of spending;
 * portfolio only needs to fund the remainder via SWR.
 */
export function BaristaFireCalculator() {
  const { state, setField, barista, withdrawalRate } = usePlanner();

  const y = barista.yearsToBarista;

  return (
    <Card id="barista-fire" className="scroll-mt-24">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl bg-orange-500/10 p-2.5 text-orange-400 ring-1 ring-orange-500/20">
              <Coffee className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <CardTitle>Barista FIRE Calculator</CardTitle>
              <CardDescription>
                Semi-retirement math: part-time or side income covers some
                spending, so your portfolio only needs to fund the gap. Named
                after the classic “coffee shop job for benefits” idea — any
                flexible work applies.
              </CardDescription>
            </div>
          </div>
          <Badge variant="muted">Semi-FI</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <MoneyInput
          label="Expected part-time / side income (annual)"
          value={state.partTimeIncome}
          onChange={(v) => setField("partTimeIncome", v)}
          hint="After-tax cash flow you expect from work in semi-retirement."
        />

        <div className="grid gap-3 rounded-2xl bg-zinc-950/70 p-4 ring-1 ring-zinc-800 sm:grid-cols-2 lg:grid-cols-4 sm:p-5">
          <Stat
            label="Barista number"
            value={formatCurrency(barista.baristaNumber)}
            emphasize
            color="text-orange-400"
          />
          <Stat
            label="Spending gap (portfolio-funded)"
            value={formatCurrency(barista.gapExpenses)}
          />
          <Stat
            label="vs full FIRE"
            value={`−${formatCurrency(barista.portfolioReduction)}`}
          />
          <Stat
            label="Years to Barista"
            value={
              y.alreadyThere
                ? "0"
                : y.unreachable
                  ? "—"
                  : formatYears(y.years ?? 0)
            }
          />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-sm text-zinc-300">
          <p>
            Work income covers about{" "}
            <span className="font-medium text-orange-300">
              {formatPercent(barista.workCoverage)}
            </span>{" "}
            of spending. Portfolio withdrawals need to cover{" "}
            <span className="font-medium text-zinc-100">
              {formatCurrency(barista.gapExpenses)}
            </span>
            /year at {formatPercent(withdrawalRate)} → a nest egg of{" "}
            <span className="font-medium text-orange-300">
              {formatCurrency(barista.baristaNumber)}
            </span>{" "}
            (vs {formatCurrency(barista.fullFireNumber)} for full FIRE).
          </p>
        </div>

        <SensitivityStrip mode="barista" />

        <p className="text-xs leading-relaxed text-zinc-500">
          Formula:{" "}
          <span className="font-mono text-zinc-400">
            barista = max(0, expenses − work income) ÷ withdrawal rate
          </span>
          . Healthcare, taxes, and job reliability are not modeled. Educational
          only. Compare with Coast if your question is stopping contributions,
          not partial work income.
        </p>
      </CardContent>
    </Card>
  );
}

function Stat({
  label,
  value,
  emphasize,
  color = "text-zinc-100",
}: {
  label: string;
  value: string;
  emphasize?: boolean;
  color?: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-900/50 p-3 sm:p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p
        className={
          emphasize
            ? `mt-1 font-mono text-xl font-semibold tabular-nums sm:text-2xl ${color}`
            : `mt-1 font-mono text-lg font-semibold tabular-nums ${color}`
        }
      >
        {value}
      </p>
    </div>
  );
}
