import type { PlannerState } from "@/lib/planner-state";
import type {
  BaristaFireResult,
  CoastFireResult,
  FireNumberResult,
  YearsToFireResult,
} from "@/lib/calculations";

export type ScenarioExportInput = {
  state: PlannerState;
  realReturn: number;
  withdrawalRate: number;
  fire: FireNumberResult;
  years: YearsToFireResult;
  coast: CoastFireResult;
  barista: BaristaFireResult;
  shareUrl: string;
};

function csvEscape(value: string | number): string {
  const s = String(value);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/** Build a simple two-column CSV of the current planner scenario. */
export function buildScenarioCsv(input: ScenarioExportInput): string {
  const {
    state,
    realReturn,
    withdrawalRate,
    fire,
    years,
    coast,
    barista,
    shareUrl,
  } = input;

  const rows: [string, string | number][] = [
    ["exported_at", new Date().toISOString()],
    ["site", "https://retirefire.net"],
    ["disclaimer", "Educational illustration only — not financial advice"],
    ["share_url", shareUrl],
    ["annual_spending", state.annualExpenses],
    ["current_portfolio", state.currentPortfolio],
    ["annual_contributions", state.annualContribution],
    ["withdrawal_rate", withdrawalRate],
    ["expected_return_input", state.expectedReturnPct / 100],
    ["return_mode", state.useNominal ? "nominal" : "real"],
    ["inflation", state.inflationPct / 100],
    ["effective_real_return", realReturn],
    ["current_age", state.currentAge],
    ["retirement_age", state.retirementAge],
    ["work_income_barista", state.partTimeIncome],
    ["fire_number", Math.round(fire.fireNumber)],
    ["fire_multiplier", fire.multiplier.toFixed(2)],
    [
      "years_to_fire",
      years.unreachable || years.years == null
        ? "unreachable"
        : years.years.toFixed(2),
    ],
    ["coast_number", Math.round(coast.coastNumber)],
    ["coast_already", coast.alreadyCoast ? "yes" : "no"],
    [
      "coast_shortfall_or_surplus",
      Math.round(coast.alreadyCoast ? coast.surplusToday : -coast.shortfallToday),
    ],
    ["barista_number", Math.round(barista.baristaNumber)],
    ["barista_gap_expenses", Math.round(barista.gapExpenses)],
  ];

  return rows.map(([k, v]) => `${csvEscape(k)},${csvEscape(v)}`).join("\n") + "\n";
}

export function downloadTextFile(filename: string, content: string, mime = "text/csv"): void {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
