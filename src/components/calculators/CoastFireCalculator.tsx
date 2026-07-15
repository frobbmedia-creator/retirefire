"use client";

import { Waves } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePlanner } from "@/components/planner/PlannerProvider";
import { StressTestPanel } from "@/components/calculators/StressTestPanel";
import { SensitivityStrip } from "@/components/calculators/SensitivityStrip";
import { CoastAgeTable } from "@/components/calculators/CoastAgeTable";
import { formatCurrency, formatPercent, formatYears } from "@/lib/format";

export function CoastFireCalculator() {
  const { state, setField, fire, coast, realReturn, withdrawalRate } =
    usePlanner();

  const ageValid = state.retirementAge > state.currentAge;

  return (
    <Card id="coast-fire" className="scroll-mt-24">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl bg-violet-500/10 p-2.5 text-violet-400 ring-1 ring-violet-500/20">
              <Waves className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <CardTitle>Coast FIRE Calculator</CardTitle>
              <CardDescription>
                Nest egg that can grow — with no further contributions — to full
                FIRE by a traditional retirement age. Then you can stop
                aggressively saving.
              </CardDescription>
            </div>
          </div>
          <Badge variant={coast.alreadyCoast ? "success" : "muted"}>
            {coast.alreadyCoast ? "Coasting" : "Building"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Current age"
            type="number"
            inputMode="numeric"
            min={18}
            max={80}
            value={state.currentAge || ""}
            onChange={(e) => setField("currentAge", Number(e.target.value) || 0)}
            className="h-12 text-base sm:h-11 sm:text-sm"
          />
          <Input
            label="Traditional retirement age"
            type="number"
            inputMode="numeric"
            min={40}
            max={80}
            value={state.retirementAge || ""}
            onChange={(e) =>
              setField("retirementAge", Number(e.target.value) || 0)
            }
            hint="Horizon for full FIRE if you stop saving after Coast."
            className="h-12 text-base sm:h-11 sm:text-sm"
          />
        </div>

        {!ageValid && (
          <p className="rounded-xl bg-amber-500/10 px-4 py-3 text-sm text-amber-200 ring-1 ring-amber-500/30">
            Retirement age must be greater than current age.
          </p>
        )}

        <div className="grid gap-3 rounded-2xl bg-zinc-950/70 p-4 ring-1 ring-zinc-800 sm:grid-cols-2 lg:grid-cols-4 sm:p-5">
          <Stat
            label="Coast number (today)"
            value={ageValid ? formatCurrency(coast.coastNumber) : "—"}
            emphasize
            color="text-violet-400"
          />
          <Stat label="Full FIRE number" value={formatCurrency(fire.fireNumber)} />
          <Stat
            label={coast.alreadyCoast ? "Surplus vs coast" : "Shortfall to coast"}
            value={
              ageValid
                ? formatCurrency(
                    coast.alreadyCoast ? coast.surplusToday : coast.shortfallToday,
                  )
                : "—"
            }
          />
          <Stat
            label="At retirement if you stop now"
            value={
              ageValid ? formatCurrency(coast.projectedAtRetirement) : "—"
            }
          />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-sm text-zinc-300">
          {ageValid && coast.alreadyCoast ? (
            <p>
              <span className="font-medium text-emerald-400">
                You&apos;ve reached Coast FIRE
              </span>{" "}
              under these assumptions. At {formatPercent(realReturn)} real for{" "}
              {formatYears(coast.yearsToRetirement)} years with no new
              contributions, modeled path may cover about{" "}
              {formatCurrency(state.annualExpenses)}/year at{" "}
              {formatPercent(withdrawalRate)} by age {state.retirementAge}.
            </p>
          ) : ageValid ? (
            <p>
              You need about{" "}
              <span className="font-medium text-violet-300">
                {formatCurrency(coast.shortfallToday)}
              </span>{" "}
              more invested to hit your coast number. Once there, growth alone
              for {formatYears(coast.yearsToRetirement)} years is modeled to
              reach full FIRE ({formatCurrency(fire.fireNumber)}) by age{" "}
              {state.retirementAge}.
              {coast.yearsUntilCoast != null && coast.yearsUntilCoast > 0 && (
                <>
                  {" "}
                  With zero new savings, current assets alone would take roughly{" "}
                  {formatYears(coast.yearsUntilCoast)} years to reach the coast
                  number.
                </>
              )}
            </p>
          ) : (
            <p>Adjust ages to see your Coast FIRE path.</p>
          )}
        </div>

        <p className="text-xs leading-relaxed text-zinc-500">
          Formula:{" "}
          <span className="font-mono text-zinc-400">
            coast = FIRE ÷ (1 + r)^years
          </span>
          . Coast FIRE means you could stop <em>saving</em> — not that early
          retirement is funded yet. Educational only.
        </p>

        <SensitivityStrip mode="coast" />
        <CoastAgeTable />

        <StressTestPanel
          tool="coast"
          startPortfolio={state.currentPortfolio}
          annualContribution={0}
          meanReturn={realReturn}
          years={ageValid ? coast.yearsToRetirement : 0}
          target={fire.fireNumber}
          targetLabel="Full FIRE"
          enabled={ageValid && coast.yearsToRetirement > 0}
          disabledReason={
            !ageValid
              ? "Set retirement age above current age to stress-test the coast horizon."
              : "Horizon must be at least one year."
          }
        />
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
