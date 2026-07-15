/**
 * Shared planner inputs + URL serialization.
 * Query keys are short for shareable links.
 */

import { DEFAULTS, type FireStyleId } from "@/lib/constants";

export type PlannerState = {
  annualExpenses: number;
  withdrawalRatePct: number;
  /** Expected return % — real or nominal depending on useNominal */
  expectedReturnPct: number;
  inflationPct: number;
  /** When true, expectedReturnPct is nominal; projections convert to real */
  useNominal: boolean;
  currentPortfolio: number;
  annualContribution: number;
  currentAge: number;
  retirementAge: number;
  partTimeIncome: number;
  fireStyle: FireStyleId;
};

export const PLANNER_DEFAULTS: PlannerState = {
  annualExpenses: DEFAULTS.annualSpending.regular,
  withdrawalRatePct: DEFAULTS.withdrawalRate * 100,
  expectedReturnPct: DEFAULTS.realReturn * 100,
  inflationPct: DEFAULTS.inflation * 100,
  useNominal: false,
  currentPortfolio: 150_000,
  annualContribution: 30_000,
  currentAge: 30,
  retirementAge: DEFAULTS.traditionalRetirementAge,
  partTimeIncome: 25_000,
  fireStyle: "regular",
};

/** Short query param keys for shareable URLs */
type ParamKey =
  | "e"
  | "w"
  | "r"
  | "i"
  | "n"
  | "p"
  | "c"
  | "a"
  | "t"
  | "b"
  | "s";

function parseNum(v: string | null, fallback: number): number {
  if (v == null || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function parseBool(v: string | null, fallback: boolean): boolean {
  if (v == null || v === "") return fallback;
  return v === "1" || v === "true";
}

function parseStyle(v: string | null): FireStyleId {
  if (v === "lean" || v === "regular" || v === "fat") return v;
  return PLANNER_DEFAULTS.fireStyle;
}

/** Read planner state from URLSearchParams */
export function stateFromSearchParams(params: URLSearchParams): PlannerState {
  return {
    annualExpenses: parseNum(params.get("e"), PLANNER_DEFAULTS.annualExpenses),
    withdrawalRatePct: parseNum(params.get("w"), PLANNER_DEFAULTS.withdrawalRatePct),
    expectedReturnPct: parseNum(params.get("r"), PLANNER_DEFAULTS.expectedReturnPct),
    inflationPct: parseNum(params.get("i"), PLANNER_DEFAULTS.inflationPct),
    useNominal: parseBool(params.get("n"), PLANNER_DEFAULTS.useNominal),
    currentPortfolio: parseNum(params.get("p"), PLANNER_DEFAULTS.currentPortfolio),
    annualContribution: parseNum(params.get("c"), PLANNER_DEFAULTS.annualContribution),
    currentAge: parseNum(params.get("a"), PLANNER_DEFAULTS.currentAge),
    retirementAge: parseNum(params.get("t"), PLANNER_DEFAULTS.retirementAge),
    partTimeIncome: parseNum(params.get("b"), PLANNER_DEFAULTS.partTimeIncome),
    fireStyle: parseStyle(params.get("s")),
  };
}

/** Serialize planner state to query string (omit defaults for cleaner URLs) */
export function stateToQueryString(state: PlannerState): string {
  const params = new URLSearchParams();
  const d = PLANNER_DEFAULTS;

  const setIf = (key: ParamKey, value: string | number | boolean, def: string | number | boolean) => {
    if (value !== def) params.set(key, String(value === true ? 1 : value === false ? 0 : value));
  };

  setIf("e", Math.round(state.annualExpenses), d.annualExpenses);
  setIf("w", round1(state.withdrawalRatePct), d.withdrawalRatePct);
  setIf("r", round1(state.expectedReturnPct), d.expectedReturnPct);
  setIf("i", round1(state.inflationPct), d.inflationPct);
  setIf("n", state.useNominal, d.useNominal);
  setIf("p", Math.round(state.currentPortfolio), d.currentPortfolio);
  setIf("c", Math.round(state.annualContribution), d.annualContribution);
  setIf("a", Math.round(state.currentAge), d.currentAge);
  setIf("t", Math.round(state.retirementAge), d.retirementAge);
  setIf("b", Math.round(state.partTimeIncome), d.partTimeIncome);
  setIf("s", state.fireStyle, d.fireStyle);

  return params.toString();
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export function buildShareUrl(path: string, state: PlannerState): string {
  const q = stateToQueryString(state);
  if (typeof window !== "undefined") {
    const origin = window.location.origin;
    return q ? `${origin}${path}?${q}` : `${origin}${path}`;
  }
  return q ? `${path}?${q}` : path;
}
