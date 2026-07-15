"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Activity, ChevronDown, Info } from "lucide-react";
import {
  FREE_PATH_CAP,
  PRO_PATH_TEASER,
  VOLATILITY_PRESETS,
  buildTerminalHistogram,
  runMonteCarlo,
  type VolatilityPresetId,
} from "@/lib/monte-carlo";
import { formatCurrency, formatPercent } from "@/lib/format";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { ProTeaserStrip } from "@/components/ui/pro-teaser";
import { cn } from "@/lib/utils";

export type StressTestPanelProps = {
  /** Current invested portfolio */
  startPortfolio: number;
  /** Annual contribution during the horizon (0 for pure Coast) */
  annualContribution: number;
  /** Mean real return from shared assumptions */
  meanReturn: number;
  /** Years in the stress horizon */
  years: number;
  /** Success if terminal ≥ target */
  target: number;
  /** Short label for the success target (e.g. "Full FIRE") */
  targetLabel?: string;
  /** Context for analytics */
  tool: "coast" | "years";
  /** Whether the panel inputs are valid enough to run */
  enabled?: boolean;
  disabledReason?: string;
};

/**
 * Free forever basic sequence-of-returns stress test.
 * Deterministic calculator results stay primary; this is a secondary panel.
 */
export function StressTestPanel({
  startPortfolio,
  annualContribution,
  meanReturn,
  years,
  target,
  targetLabel = "Target",
  tool,
  enabled = true,
  disabledReason,
}: StressTestPanelProps) {
  const [open, setOpen] = useState(true);
  const [volId, setVolId] = useState<VolatilityPresetId>("default");
  const trackedKey = useRef<string | null>(null);

  const volatility =
    VOLATILITY_PRESETS.find((p) => p.id === volId)?.value ?? 0.15;

  const horizon = Math.max(0, Math.floor(years));
  const canRun = enabled && horizon > 0 && target > 0;

  const result = useMemo(() => {
    if (!canRun) return null;
    return runMonteCarlo({
      startPortfolio,
      annualContribution,
      meanReturn,
      volatility,
      years: horizon,
      target,
      paths: FREE_PATH_CAP,
      seed: 42,
    });
  }, [
    canRun,
    startPortfolio,
    annualContribution,
    meanReturn,
    volatility,
    horizon,
    target,
  ]);

  // Analytics: fire once per tool mount (external system; ref avoids setState)
  useEffect(() => {
    if (!result) return;
    const key = `${tool}:${result.paths}:${result.years}`;
    if (trackedKey.current === key) return;
    trackedKey.current = key;
    trackEvent(AnalyticsEvents.STRESS_TEST_RUN, {
      tool,
      paths: result.paths,
      years: result.years,
      success_pct: Math.round(result.successRate * 100),
    });
  }, [result, tool]);

  const histogram = useMemo(
    () =>
      result ? buildTerminalHistogram(result.terminalsSorted, 14) : [],
    [result],
  );

  return (
    <div
      id={`stress-test-${tool}`}
      className="rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent ring-1 ring-zinc-800"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-3 p-4 text-left sm:p-5"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-amber-500/10 p-2 text-amber-300 ring-1 ring-amber-500/25">
            <Activity className="h-4 w-4" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100 sm:text-base">
              Stress test: sequence of returns
            </p>
            <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
              Free basic simulation — educational ranges, not a forecast
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "mt-1 h-5 w-5 shrink-0 text-zinc-500 transition",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open && (
        <div className="space-y-5 border-t border-zinc-800/80 px-4 pb-5 pt-4 sm:px-5">
          <p className="text-sm leading-relaxed text-zinc-400">
            The main calculators assume a smooth return every year. Markets
            bounce. This stress test runs{" "}
            <strong className="font-medium text-zinc-300">
              {FREE_PATH_CAP.toLocaleString()} random paths
            </strong>{" "}
            with the same average real return and a fixed volatility, then
            shows how often terminal wealth meets{" "}
            <strong className="font-medium text-zinc-300">{targetLabel}</strong>{" "}
            under a simple definition.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-zinc-500">
              Volatility (illustrative)
            </span>
            {VOLATILITY_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setVolId(p.id)}
                title={p.description}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 transition",
                  volId === p.id
                    ? "bg-amber-500/15 text-amber-200 ring-amber-500/40"
                    : "bg-zinc-900 text-zinc-400 ring-zinc-700 hover:text-zinc-200",
                )}
              >
                σ {p.label}
              </button>
            ))}
          </div>

          <ProTeaserStrip
            freeLabel={`${FREE_PATH_CAP.toLocaleString()} paths · success rate · p10/p50/p90 · stays free`}
            proLabel={`${PRO_PATH_TEASER.toLocaleString()}+ paths, regimes, historical engines (planned)`}
          />

          {!canRun && (
            <p className="rounded-xl bg-zinc-900/80 px-4 py-3 text-sm text-zinc-400 ring-1 ring-zinc-800">
              {disabledReason ??
                "Adjust inputs (horizon years and target) to run the stress test."}
            </p>
          )}

          {canRun && result && (
            <>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Stat
                  label="Success rate"
                  value={formatPercent(result.successRate, 0)}
                  hint={`${result.successes.toLocaleString()} / ${result.paths.toLocaleString()} paths ≥ target`}
                  emphasize
                />
                <Stat
                  label="p10 terminal"
                  value={formatCurrency(result.p10)}
                  hint="Lower tail (illustrative)"
                />
                <Stat
                  label="Median terminal"
                  value={formatCurrency(result.p50)}
                  hint="p50 of simulated endings"
                />
                <Stat
                  label="p90 terminal"
                  value={formatCurrency(result.p90)}
                  hint="Upper tail (illustrative)"
                />
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl bg-zinc-950/60 p-3 ring-1 ring-zinc-800 sm:p-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Sample paths (worst / median / best by terminal)
                  </p>
                  <PathSampleChart
                    worst={result.pathsSample.worst}
                    median={result.pathsSample.median}
                    best={result.pathsSample.best}
                    target={target}
                    targetLabel={targetLabel}
                  />
                </div>
                <div className="rounded-xl bg-zinc-950/60 p-3 ring-1 ring-zinc-800 sm:p-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Terminal wealth distribution
                  </p>
                  <TerminalHistogramChart
                    bins={histogram}
                    target={target}
                  />
                </div>
              </div>

              <div className="flex gap-2 rounded-xl bg-zinc-900/50 p-3 text-xs leading-relaxed text-zinc-500 ring-1 ring-zinc-800">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden />
                <p>
                  Model: independent annual shocks{" "}
                  <span className="font-mono text-zinc-400">
                    r = {formatPercent(meanReturn)} ± σ·Z
                  </span>{" "}
                  (Z standard normal), end-of-year contributions, seed 42 for
                  reproducibility. Mean return {formatPercent(meanReturn)}, σ{" "}
                  {formatPercent(volatility)}, horizon {horizon} years,{" "}
                  {result.paths.toLocaleString()} paths. Not historical
                  backtesting, not tax-aware, not advice. Details:{" "}
                  <Link
                    href="/methodology"
                    className="text-emerald-400/90 hover:underline"
                  >
                    Methodology
                  </Link>
                  {" · "}
                  <Link
                    href="/approach"
                    className="text-emerald-400/90 hover:underline"
                  >
                    Approach
                  </Link>
                  .
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  emphasize,
}: {
  label: string;
  value: string;
  hint?: string;
  emphasize?: boolean;
}) {
  return (
    <div className="rounded-xl bg-zinc-950/70 p-3 ring-1 ring-zinc-800 sm:p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-mono text-lg font-semibold tabular-nums sm:text-xl",
          emphasize ? "text-amber-300" : "text-zinc-100",
        )}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-[11px] leading-snug text-zinc-600">{hint}</p>}
    </div>
  );
}

function PathSampleChart({
  worst,
  median,
  best,
  target,
  targetLabel,
}: {
  worst: number[];
  median: number[];
  best: number[];
  target: number;
  targetLabel: string;
}) {
  const width = 560;
  const height = 180;
  const pad = { t: 14, r: 10, b: 24, l: 8 };
  const innerW = width - pad.l - pad.r;
  const innerH = height - pad.t - pad.b;
  const n = Math.max(worst.length - 1, 1);
  const maxY =
    Math.max(
      target,
      ...worst,
      ...median,
      ...best,
      1,
    ) * 1.06;

  const x = (i: number) => pad.l + (i / n) * innerW;
  const y = (v: number) => pad.t + innerH - (Math.max(0, v) / maxY) * innerH;

  const line = (series: number[]) =>
    series.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");

  const targetY = y(target);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Sample stress-test paths versus ${targetLabel}`}
    >
      <line
        x1={pad.l}
        x2={width - pad.r}
        y1={targetY}
        y2={targetY}
        stroke="rgb(251, 191, 36)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <text
        x={width - pad.r}
        y={targetY - 4}
        textAnchor="end"
        fill="rgb(251, 191, 36)"
        fontSize="10"
      >
        {targetLabel}
      </text>
      <path d={line(worst)} fill="none" stroke="rgb(248, 113, 113)" strokeWidth="1.75" />
      <path d={line(median)} fill="none" stroke="rgb(167, 139, 250)" strokeWidth="2" />
      <path d={line(best)} fill="none" stroke="rgb(52, 211, 153)" strokeWidth="1.75" />
      <text x={pad.l} y={height - 6} fill="rgb(113, 113, 122)" fontSize="10">
        Year 0
      </text>
      <text
        x={width - pad.r}
        y={height - 6}
        textAnchor="end"
        fill="rgb(113, 113, 122)"
        fontSize="10"
      >
        Year {n}
      </text>
      {/* Legend */}
      <text x={pad.l} y={12} fill="rgb(248, 113, 113)" fontSize="10">
        Worst
      </text>
      <text x={pad.l + 48} y={12} fill="rgb(167, 139, 250)" fontSize="10">
        Median
      </text>
      <text x={pad.l + 100} y={12} fill="rgb(52, 211, 153)" fontSize="10">
        Best
      </text>
    </svg>
  );
}

function TerminalHistogramChart({
  bins,
  target,
}: {
  bins: { mid: number; count: number; share: number }[];
  target: number;
}) {
  if (!bins.length) {
    return (
      <p className="py-8 text-center text-sm text-zinc-600">No distribution data</p>
    );
  }
  const width = 560;
  const height = 180;
  const pad = { t: 10, r: 10, b: 28, l: 8 };
  const innerW = width - pad.l - pad.r;
  const innerH = height - pad.t - pad.b;
  const maxShare = Math.max(...bins.map((b) => b.share), 0.01);
  const barW = innerW / bins.length;
  const minMid = bins[0]!.mid;
  const maxMid = bins[bins.length - 1]!.mid;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Histogram of simulated terminal portfolio values"
    >
      {bins.map((b, i) => {
        const h = (b.share / maxShare) * innerH;
        const above = b.mid >= target;
        return (
          <rect
            key={i}
            x={pad.l + i * barW + 1}
            y={pad.t + innerH - h}
            width={Math.max(1, barW - 2)}
            height={h}
            fill={above ? "rgb(52, 211, 153)" : "rgb(113, 113, 122)"}
            opacity={0.75}
          />
        );
      })}
      <text x={pad.l} y={height - 8} fill="rgb(113, 113, 122)" fontSize="10">
        {formatCurrency(minMid, { compact: true })}
      </text>
      <text
        x={width - pad.r}
        y={height - 8}
        textAnchor="end"
        fill="rgb(113, 113, 122)"
        fontSize="10"
      >
        {formatCurrency(maxMid, { compact: true })}
      </text>
      <text
        x={width / 2}
        y={height - 8}
        textAnchor="middle"
        fill="rgb(161, 161, 170)"
        fontSize="10"
      >
        Green bars ≈ at/above target
      </text>
    </svg>
  );
}
