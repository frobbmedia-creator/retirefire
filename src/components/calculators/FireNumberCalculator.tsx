"use client";

import { Calculator } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MoneyInput } from "@/components/ui/money-input";
import { usePlanner } from "@/components/planner/PlannerProvider";
import { FIRE_STYLES, type FireStyleId } from "@/lib/constants";
import { formatCurrency, formatPercent } from "@/lib/format";

export function FireNumberCalculator() {
  const { state, setField, setFireStyle, fire, withdrawalRate } = usePlanner();

  const styleTabs = FIRE_STYLES.map((s) => ({
    id: s.id,
    label: s.label,
    description: s.description,
  }));

  return (
    <Card id="fire-number" className="scroll-mt-24">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400 ring-1 ring-emerald-500/20">
              <Calculator className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <CardTitle>FIRE Number Calculator</CardTitle>
              <CardDescription>
                Portfolio size needed so a safe withdrawal covers annual
                spending. Presets are starting points — edit freely.
              </CardDescription>
            </div>
          </div>
          <Badge>Core</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs
          options={styleTabs}
          value={state.fireStyle}
          onChange={(id) => setFireStyle(id as FireStyleId)}
        />

        <MoneyInput
          label="Annual spending (today’s dollars)"
          value={state.annualExpenses}
          onChange={(v) => setField("annualExpenses", v)}
          hint="Include housing, food, healthcare, travel, taxes, and fun."
        />

        <div className="grid gap-3 rounded-2xl bg-zinc-950/70 p-4 ring-1 ring-zinc-800 sm:grid-cols-3 sm:p-5">
          <ResultStat
            label="Your FIRE number"
            value={formatCurrency(fire.fireNumber)}
            emphasize
          />
          <ResultStat
            label="Portfolio multiple"
            value={`${fire.multiplier.toFixed(1)}×`}
          />
          <ResultStat
            label="Monthly spend"
            value={formatCurrency(fire.monthlyExpenses)}
          />
        </div>

        <p className="text-xs leading-relaxed text-zinc-500">
          Formula:{" "}
          <span className="font-mono text-zinc-400">
            FIRE = annual spending ÷ withdrawal rate
          </span>
          . At {formatPercent(withdrawalRate)}, you need roughly{" "}
          {fire.multiplier.toFixed(1)}× annual spending. Educational estimate —
          not advice.{" "}
          <a
            href="/methodology"
            className="text-emerald-400/90 underline-offset-2 hover:underline"
          >
            Methodology
          </a>
          .
        </p>
      </CardContent>
    </Card>
  );
}

function ResultStat({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="rounded-xl bg-zinc-900/50 p-3 sm:p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p
        className={
          emphasize
            ? "mt-1 font-mono text-2xl font-semibold tabular-nums tracking-tight text-emerald-400 sm:text-3xl"
            : "mt-1 font-mono text-xl font-semibold tabular-nums text-zinc-100"
        }
      >
        {value}
      </p>
    </div>
  );
}
