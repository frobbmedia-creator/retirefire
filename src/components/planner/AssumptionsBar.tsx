"use client";

import { Download, FileUp, Link2, RotateCcw } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { usePlanner } from "./PlannerProvider";
import { Slider } from "@/components/ui/slider";
import { MoneyInput } from "@/components/ui/money-input";
import { formatPercent } from "@/lib/format";
import { buildShareUrl, PLANNER_DEFAULTS, type PlannerState } from "@/lib/planner-state";
import { buildScenarioCsv, downloadTextFile } from "@/lib/export-scenario";
import { exportPlannerJson, importPlannerJson } from "@/lib/planner-transfer";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function AssumptionsBar() {
  const {
    state,
    setField,
    patch,
    reset,
    realReturn,
    sharePath,
    withdrawalRate,
    fire,
    years,
    coast,
    barista,
  } = usePlanner();
  const [copied, setCopied] = useState(false);
  const [exported, setExported] = useState(false);
  const [status, setStatus] = useState("");
  const importInputRef = useRef<HTMLInputElement>(null);

  async function copyShareLink() {
    const url = buildShareUrl(sharePath, state);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setStatus("Share link copied to your clipboard.");
      trackEvent(AnalyticsEvents.SHARE_LINK_COPY, { path: sharePath });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus("Could not access your clipboard. Copy the link from the prompt.");
      window.prompt("Copy this link:", url);
    }
  }

  function exportCsv() {
    try {
      const shareUrl = buildShareUrl(sharePath, state);
      const csv = buildScenarioCsv({
        state,
        realReturn,
        withdrawalRate,
        fire,
        years,
        coast,
        barista,
        shareUrl,
      });
      const stamp = new Date().toISOString().slice(0, 10);
      downloadTextFile(`retirefire-scenario-${stamp}.csv`, csv);
      trackEvent(AnalyticsEvents.CSV_EXPORT, { path: sharePath });
      setExported(true);
      setStatus("CSV export downloaded.");
      window.setTimeout(() => setExported(false), 2000);
    } catch {
      setStatus("Could not download the CSV export.");
    }
  }

  function exportJson() {
    try {
      const stamp = new Date().toISOString().slice(0, 10);
      downloadTextFile(
        `retirefire-scenario-${stamp}.json`,
        exportPlannerJson(state),
        "application/json",
      );
      setStatus("JSON export downloaded.");
    } catch {
      setStatus("Could not download the JSON export.");
    }
  }

  async function importJson(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const result = importPlannerJson(await file.text(), file.size);
      if (!result.ok) {
        setStatus(`Could not import JSON: ${result.issues[0]?.message ?? "invalid file"}`);
        return;
      }
      patch(result.state);
      setStatus("JSON assumptions imported.");
    } catch {
      setStatus("Could not read the selected JSON file.");
    }
  }

  function resetAssumptions() {
    if (plannerStateDiffersFromDefaults(state) && !window.confirm("Reset all shared assumptions?")) {
      return;
    }
    reset();
    setStatus("Shared assumptions reset to defaults.");
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
            for easy sharing. Export CSV for your notes (educational only).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <p className="sr-only" aria-live="polite">
            {status}
          </p>
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
            onClick={exportCsv}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-zinc-800 px-3 text-xs font-medium text-zinc-300 ring-1 ring-zinc-700 transition hover:bg-zinc-700"
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            {exported ? "Exported!" : "Export CSV"}
          </button>
          <button
            type="button"
            onClick={exportJson}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-zinc-800 px-3 text-xs font-medium text-zinc-300 ring-1 ring-zinc-700 transition hover:bg-zinc-700"
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => importInputRef.current?.click()}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-zinc-800 px-3 text-xs font-medium text-zinc-300 ring-1 ring-zinc-700 transition hover:bg-zinc-700"
          >
            <FileUp className="h-3.5 w-3.5" aria-hidden />
            Import JSON
          </button>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            aria-label="Import planner JSON"
            onChange={importJson}
          />
          <button
            type="button"
            onClick={resetAssumptions}
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

function plannerStateDiffersFromDefaults(state: PlannerState): boolean {
  return Object.entries(PLANNER_DEFAULTS).some(
    ([field, value]) => state[field as keyof PlannerState] !== value,
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
