"use client";

import { Link2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { usePlanner } from "./PlannerProvider";
import { Slider } from "@/components/ui/slider";
import { MoneyInput } from "@/components/ui/money-input";
import { formatPercent } from "@/lib/format";
import { buildShareUrl } from "@/lib/planner-state";
import { cn } from "@/lib/utils";

export function AssumptionsBar() {
  const { state, setField, reset, realReturn, sharePath } = usePlanner();
  const [copied, setCopied] = useState(false);

  async function copyShareLink() {
    const url = buildShareUrl(sharePath, state);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-100 sm:text-base">
            Shared assumptions
          </h2>
          <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
            One set of inputs powers every calculator. Changes sync to the URL
            for easy sharing.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copyShareLink}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-500/15 px-3 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/30 transition hover:bg-emerald-500/25"
          >
            <Link2 className="h-3.5 w-3.5" aria-hidden />
            {copied ? "Copied!" : "Copy share link"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-zinc-800 px-3 text-xs font-medium text-zinc-300 ring-1 ring-zinc-700 transition hover:bg-zinc-700"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MoneyInput
          label="Annual spending"
          value={state.annualExpenses}
          onChange={(v) => setField("annualExpenses", v)}
          hint="Target lifestyle spend in today's dollars"
        />
        <MoneyInput
          label="Current portfolio"
          value={state.currentPortfolio}
          onChange={(v) => setField("currentPortfolio", v)}
        />
        <MoneyInput
          label="Annual contributions"
          value={state.annualContribution}
          onChange={(v) => setField("annualContribution", v)}
        />

        <Slider
          label="Withdrawal rate"
          value={state.withdrawalRatePct}
          min={2.5}
          max={5}
          step={0.1}
          onChange={(v) => setField("withdrawalRatePct", v)}
          displayValue={formatPercent(state.withdrawalRatePct / 100)}
        />

        <Slider
          label={state.useNominal ? "Expected nominal return" : "Expected real return"}
          value={state.expectedReturnPct}
          min={0}
          max={12}
          step={0.25}
          onChange={(v) => setField("expectedReturnPct", v)}
          displayValue={formatPercent(state.expectedReturnPct / 100)}
          hint={
            state.useNominal
              ? `Effective real ≈ ${formatPercent(realReturn)} after inflation`
              : "After inflation (today's dollars)"
          }
        />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-zinc-300">Return mode</span>
            <div
              role="group"
              aria-label="Return mode"
              className="flex rounded-lg bg-zinc-950 p-0.5 ring-1 ring-zinc-800"
            >
              <ModeButton
                active={!state.useNominal}
                onClick={() => setField("useNominal", false)}
              >
                Real
              </ModeButton>
              <ModeButton
                active={state.useNominal}
                onClick={() => setField("useNominal", true)}
              >
                Nominal
              </ModeButton>
            </div>
          </div>
          {state.useNominal && (
            <Slider
              label="Inflation"
              value={state.inflationPct}
              min={0}
              max={6}
              step={0.25}
              onChange={(v) => setField("inflationPct", v)}
              displayValue={formatPercent(state.inflationPct / 100)}
              hint="Used to convert nominal → real for projections"
            />
          )}
          {!state.useNominal && (
            <p className="text-xs text-zinc-500">
              Switch to Nominal to enter pre-inflation returns and set an
              inflation assumption.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-3 py-1.5 text-xs font-medium transition",
        active
          ? "bg-emerald-500/20 text-emerald-300"
          : "text-zinc-500 hover:text-zinc-300",
      )}
    >
      {children}
    </button>
  );
}
