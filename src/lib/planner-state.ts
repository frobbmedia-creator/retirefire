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

export const PLANNER_STORAGE_KEY = "retirefire:planner:v2";
export const PLANNER_SCHEMA_VERSION = 2;

export type PlannerStateIssue = {
  field: string;
  message: string;
};

export type PlannerStateParseResult =
  | { ok: true; state: PlannerState; issues: [] }
  | { ok: false; issues: PlannerStateIssue[] };

export type PlannerSearchResult =
  | { ok: true; supplied: boolean; state: PlannerState; issues: [] }
  | { ok: false; supplied: true; issues: PlannerStateIssue[] };

export type PlannerStateLoadResult =
  | { ok: true; state: PlannerState; migrated: boolean; issues: [] }
  | { ok: false; issues: PlannerStateIssue[] };

/** Short query param keys for shareable URLs */
type ParamKey = "e" | "w" | "r" | "i" | "n" | "p" | "c" | "a" | "t" | "b" | "s";

const SUPPORTED_PARAM_KEYS: ParamKey[] = ["e", "w", "r", "i", "n", "p", "c", "a", "t", "b", "s"];
const MONEY_FIELDS: Array<keyof Pick<PlannerState, "annualExpenses" | "currentPortfolio" | "annualContribution" | "partTimeIncome">> = [
  "annualExpenses",
  "currentPortfolio",
  "annualContribution",
  "partTimeIncome",
];
const PLANNER_STATE_FIELDS: Array<keyof PlannerState> = [
  "annualExpenses",
  "withdrawalRatePct",
  "expectedReturnPct",
  "inflationPct",
  "useNominal",
  "currentPortfolio",
  "annualContribution",
  "currentAge",
  "retirementAge",
  "partTimeIncome",
  "fireStyle",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFiniteInRange(value: unknown, min: number, max: number): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
}

function issue(field: string, message: string): PlannerStateIssue {
  return { field, message };
}

function isFireStyle(value: unknown): value is FireStyleId {
  return value === "lean" || value === "regular" || value === "fat";
}

function parseNumber(value: string, field: string): number | PlannerStateIssue {
  if (value.trim() === "") return issue(field, `${field} must be a finite number`);
  const number = Number(value);
  return Number.isFinite(number) ? number : issue(field, `${field} must be a finite number`);
}

function isIssue(value: number | PlannerStateIssue): value is PlannerStateIssue {
  return typeof value !== "number";
}

/** Validate a complete planner state from a storage, import, or application boundary. */
export function parsePlannerState(value: unknown): PlannerStateParseResult {
  if (!isRecord(value)) {
    return { ok: false, issues: [issue("state", "planner state must be an object")] };
  }

  const unexpectedFields = Object.keys(value).filter(
    (field) => !PLANNER_STATE_FIELDS.includes(field as keyof PlannerState),
  );
  if (unexpectedFields.length > 0) {
    return {
      ok: false,
      issues: [issue("state", "planner state has unsupported fields")],
    };
  }

  const state = Object.fromEntries(
    PLANNER_STATE_FIELDS.map((field) => [field, value[field]]),
  ) as Partial<PlannerState>;
  const issues: PlannerStateIssue[] = [];
  for (const field of MONEY_FIELDS) {
    if (!isFiniteInRange(state[field], 0, 100_000_000)) {
      issues.push(issue(field, `${field} must be between 0 and 100000000`));
    }
  }
  if (!isFiniteInRange(state.withdrawalRatePct, 0.5, 10)) {
    issues.push(issue("withdrawalRatePct", "withdrawalRatePct must be between 0.5 and 10"));
  }
  if (!isFiniteInRange(state.expectedReturnPct, -100, 100)) {
    issues.push(issue("expectedReturnPct", "expectedReturnPct must be between -100 and 100"));
  }
  if (!isFiniteInRange(state.inflationPct, -100, 100)) {
    issues.push(issue("inflationPct", "inflationPct must be between -100 and 100"));
  }
  if (!isFiniteInRange(state.currentAge, 18, 100)) {
    issues.push(issue("currentAge", "currentAge must be between 18 and 100"));
  }
  if (!isFiniteInRange(state.retirementAge, 18, 100)) {
    issues.push(issue("retirementAge", "retirementAge must be between 18 and 100"));
  }
  if (
    isFiniteInRange(state.currentAge, 18, 100) &&
    isFiniteInRange(state.retirementAge, 18, 100) &&
    state.retirementAge < state.currentAge
  ) {
    issues.push(issue("retirementAge", "retirementAge cannot be before currentAge"));
  }
  if (typeof state.useNominal !== "boolean") {
    issues.push(issue("useNominal", "useNominal must be a boolean"));
  }
  if (!isFireStyle(state.fireStyle)) {
    issues.push(issue("fireStyle", "fireStyle must be lean, regular, or fat"));
  }
  if (issues.length > 0) return { ok: false, issues };
  return { ok: true, state: state as PlannerState, issues: [] };
}

/** Parse a supported URL scenario. Omitted fields inherit documented defaults. */
export function parsePlannerSearchParams(params: URLSearchParams): PlannerSearchResult {
  const supplied = SUPPORTED_PARAM_KEYS.some((key) => params.has(key));
  const state: PlannerState = { ...PLANNER_DEFAULTS };
  const issues: PlannerStateIssue[] = [];
  const assignNumber = (key: ParamKey, field: keyof PlannerState) => {
    const value = params.get(key);
    if (value === null) return;
    const number = parseNumber(value, field);
    if (isIssue(number)) issues.push(number);
    else (state[field] as number) = number;
  };

  assignNumber("e", "annualExpenses");
  assignNumber("w", "withdrawalRatePct");
  assignNumber("r", "expectedReturnPct");
  assignNumber("i", "inflationPct");
  assignNumber("p", "currentPortfolio");
  assignNumber("c", "annualContribution");
  assignNumber("a", "currentAge");
  assignNumber("t", "retirementAge");
  assignNumber("b", "partTimeIncome");

  const nominal = params.get("n");
  if (nominal !== null) {
    if (nominal === "1" || nominal === "true") state.useNominal = true;
    else if (nominal === "0" || nominal === "false") state.useNominal = false;
    else issues.push(issue("useNominal", "useNominal must be true or false"));
  }
  const fireStyle = params.get("s");
  if (fireStyle !== null) {
    if (isFireStyle(fireStyle)) state.fireStyle = fireStyle;
    else issues.push(issue("fireStyle", "fireStyle must be lean, regular, or fat"));
  }

  const parsed = parsePlannerState(state);
  if (!parsed.ok) return { ok: false, supplied: true, issues: [...issues, ...parsed.issues] };
  if (issues.length > 0) return { ok: false, supplied: true, issues };
  return { ok: true, supplied, state: parsed.state, issues: [] };
}

/** Read planner state from URLSearchParams for existing consumers. */
export function stateFromSearchParams(params: URLSearchParams): PlannerState {
  const result = parsePlannerSearchParams(params);
  return result.ok ? result.state : { ...PLANNER_DEFAULTS };
}

/** Load, migrate, and validate a local planner snapshot without throwing. */
export function loadPlannerState(storage: Pick<Storage, "getItem">): PlannerStateLoadResult {
  let raw: string | null;
  try {
    raw = storage.getItem(PLANNER_STORAGE_KEY);
  } catch {
    return { ok: false, issues: [issue("storage", "planner storage could not be read")] };
  }
  if (raw === null) return { ok: false, issues: [] };

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return { ok: false, issues: [issue("storage", "stored planner state is not valid JSON")] };
  }
  if (!isRecord(value)) {
    return { ok: false, issues: [issue("storage", "stored planner state must be an object")] };
  }

  let candidate: unknown = value;
  let migrated = false;
  if ("schemaVersion" in value) {
    if (value.schemaVersion === PLANNER_SCHEMA_VERSION) {
      candidate = value.state;
    } else if (value.schemaVersion === 1) {
      candidate = value.state;
      migrated = true;
    } else {
      return {
        ok: false,
        issues: [issue("schemaVersion", "stored planner state has an unsupported schema version")],
      };
    }
  } else {
    migrated = true;
  }

  const parsed = parsePlannerState(candidate);
  if (!parsed.ok) return parsed;
  return { ok: true, state: parsed.state, migrated, issues: [] };
}

/** Save only valid, versioned planner state and never let storage errors break the planner. */
export function savePlannerState(storage: Pick<Storage, "setItem">, state: PlannerState): void {
  if (!parsePlannerState(state).ok) return;
  try {
    storage.setItem(
      PLANNER_STORAGE_KEY,
      JSON.stringify({ schemaVersion: PLANNER_SCHEMA_VERSION, state }),
    );
  } catch {
    // Storage is optional (private browsing or quota errors must not block planning).
  }
}

/** Resolve the documented initialization precedence without browser dependencies. */
export function resolveInitialPlannerState(
  url: PlannerSearchResult,
  stored: PlannerStateParseResult | PlannerStateLoadResult,
): PlannerState {
  if (url.ok && url.supplied) return url.state;
  if (stored.ok) return stored.state;
  return { ...PLANNER_DEFAULTS };
}

/** Serialize planner state to query string (omit defaults for cleaner URLs) */
export function stateToQueryString(state: PlannerState): string {
  const params = new URLSearchParams();
  const d = PLANNER_DEFAULTS;

  const setIf = (key: ParamKey, value: string | number | boolean, def: string | number | boolean) => {
    if (value !== def) params.set(key, String(value === true ? 1 : value === false ? 0 : value));
  };

  setIf("e", state.annualExpenses, d.annualExpenses);
  setIf("w", state.withdrawalRatePct, d.withdrawalRatePct);
  setIf("r", state.expectedReturnPct, d.expectedReturnPct);
  setIf("i", state.inflationPct, d.inflationPct);
  setIf("n", state.useNominal, d.useNominal);
  setIf("p", state.currentPortfolio, d.currentPortfolio);
  setIf("c", state.annualContribution, d.annualContribution);
  setIf("a", state.currentAge, d.currentAge);
  setIf("t", state.retirementAge, d.retirementAge);
  setIf("b", state.partTimeIncome, d.partTimeIncome);
  setIf("s", state.fireStyle, d.fireStyle);

  return params.toString();
}

export function buildShareUrl(path: string, state: PlannerState): string {
  const q = stateToQueryString(state);
  if (typeof window !== "undefined") {
    const origin = window.location.origin;
    return q ? `${origin}${path}?${q}` : `${origin}${path}`;
  }
  return q ? `${path}?${q}` : path;
}
