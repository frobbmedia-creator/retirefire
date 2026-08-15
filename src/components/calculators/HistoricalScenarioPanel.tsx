import Link from "next/link";
import historicalMetadata from "../../../public/data/historical-returns.metadata.json";
import { formatPercent } from "@/lib/format";
import type { HistoricalScenarioResult } from "@/lib/historical-scenarios";

type HistoricalPanelState = "loading" | "unavailable" | "error" | "ready";

export type HistoricalPanelModel = {
  state: HistoricalPanelState;
  message: string;
  summary?: string;
  successPercentage?: string;
};

/**
 * Convert governed dataset readiness and scenario output into display-safe text.
 * An unverified dataset always wins over any supplied result so it cannot leak a
 * historical success rate before its source is independently reproducible.
 */
export function historicalPanelModel(
  status: string,
  result?: HistoricalScenarioResult,
): HistoricalPanelModel {
  if (status === "unverified_source_blocked") {
    return {
      state: "unavailable",
      message: "Historical scenarios are unavailable until the source data is independently verified.",
    };
  }

  if (status === "loading") {
    return {
      state: "loading",
      message: "Checking historical dataset readiness.",
    };
  }

  if (status !== "verified") {
    return {
      state: "error",
      message: "Historical scenario results are unavailable because dataset readiness could not be confirmed.",
    };
  }

  if (!result) {
    return {
      state: "loading",
      message: "Preparing verified historical scenarios.",
    };
  }

  if (!result.ok || result.cycleCount === 0) {
    return {
      state: "error",
      message: "Historical scenario results could not be calculated from the verified dataset.",
    };
  }

  return {
    state: "ready",
    message: "Historical scenario results are available.",
    successPercentage: formatPercent(result.successCount / result.cycleCount, 0),
    summary: `${result.successCount} of ${result.cycleCount} historical cycles lasted the full horizon.`,
  };
}

export function HistoricalScenarioPanel({
  result,
}: {
  result?: HistoricalScenarioResult;
}) {
  const model = historicalPanelModel(historicalMetadata.status, result);

  return (
    <section
      aria-labelledby="historical-scenarios-heading"
      className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 id="historical-scenarios-heading" className="text-base font-semibold text-zinc-100">
          Historical retirement scenarios
        </h3>
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {model.state === "ready" ? "Verified data" : "Data gate"}
        </span>
      </div>

      {model.state === "ready" ? (
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-zinc-900/60 p-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Full-horizon cycles
            </dt>
            <dd className="mt-1 font-mono text-2xl font-semibold tabular-nums text-emerald-400">
              {model.successPercentage}
            </dd>
            <dd className="mt-1 text-sm text-zinc-400">{model.summary}</dd>
          </div>
          <div className="rounded-xl bg-zinc-900/60 p-3 text-sm leading-relaxed text-zinc-400">
            Withdrawals are modeled at the beginning of each year. Outcomes are
            shown in real dollars.
          </div>
        </dl>
      ) : (
        <div
          className="mt-4 rounded-xl bg-zinc-900/60 p-3 text-sm leading-relaxed text-zinc-300"
          role={model.state === "error" ? "alert" : "status"}
        >
          <p>{model.message}</p>
          {model.state === "unavailable" && (
            <p className="mt-2 text-zinc-500">{historicalMetadata.reason}</p>
          )}
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        Historical scenarios are not future probabilities. See the{" "}
        <Link href="/methodology#historical-scenarios" className="text-emerald-400 hover:underline">
          methodology
        </Link>{" "}
        for the data and calculation limits.
      </p>
    </section>
  );
}
