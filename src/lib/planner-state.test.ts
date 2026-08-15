/**
 * Runtime contracts for planner state. Run: npx tsx src/lib/planner-state.test.ts
 */
import {
  PLANNER_DEFAULTS,
  PLANNER_SCHEMA_VERSION,
  PLANNER_STORAGE_KEY,
  loadPlannerState,
  parsePlannerSearchParams,
  parsePlannerState,
  resolveInitialPlannerState,
  savePlannerState,
  stateToQueryString,
} from "./planner-state";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function same(actual: unknown, expected: unknown, message: string) {
  assert(JSON.stringify(actual) === JSON.stringify(expected), message);
}

const validState = {
  ...PLANNER_DEFAULTS,
  annualExpenses: 48_000,
  currentAge: 42,
};

// A valid query round-trips through the same runtime schema.
{
  const query = stateToQueryString(validState);
  const result = parsePlannerSearchParams(new URLSearchParams(query));
  assert(result.ok, "valid URL should parse");
  same(result.state, validState, "valid URL should preserve the planner state");
}

// Schema-valid fractional inputs must not change when URL state overrides storage.
{
  const fractionalState = {
    ...PLANNER_DEFAULTS,
    annualExpenses: 48_000.25,
    withdrawalRatePct: 3.25,
    expectedReturnPct: 5.25,
    inflationPct: 2.75,
    currentPortfolio: 150_000.75,
    annualContribution: 30_000.5,
    currentAge: 42.5,
    retirementAge: 65.25,
    partTimeIncome: 25_000.5,
  };
  const result = parsePlannerSearchParams(new URLSearchParams(stateToQueryString(fractionalState)));
  assert(result.ok, "fractional URL should parse");
  same(result.state, fractionalState, "fractional URL should preserve every supported value");
}

// The parser must reject values that could produce invalid financial output.
for (const [label, value] of [
  ["non-finite number", { ...validState, currentAge: Number.NaN }],
  ["age below 18", { ...validState, currentAge: 17 }],
  ["age above 100", { ...validState, retirementAge: 101 }],
  ["retirement before current age", { ...validState, retirementAge: 40 }],
  ["withdrawal rate below 0.5%", { ...validState, withdrawalRatePct: 0.4 }],
  ["withdrawal rate above 10%", { ...validState, withdrawalRatePct: 10.1 }],
  ["negative money", { ...validState, currentPortfolio: -1 }],
  ["unknown FIRE style", { ...validState, fireStyle: "coast" }],
] as const) {
  const result = parsePlannerState(value);
  assert(!result.ok, `${label} should be rejected`);
  assert(result.issues.length > 0, `${label} should provide an explicit issue`);
}

// A partial URL is normalized with defaults; an invalid URL is not a scenario.
{
  const partial = parsePlannerSearchParams(new URLSearchParams("e=48000"));
  assert(partial.ok, "partial URL should normalize with defaults");
  same(
    partial.state,
    { ...PLANNER_DEFAULTS, annualExpenses: 48_000 },
    "partial URL should use defaults for omitted values",
  );

  const invalid = parsePlannerSearchParams(new URLSearchParams("a=80&t=40"));
  assert(invalid.supplied, "invalid URL should record that planner keys were supplied");
  assert(!invalid.ok, "invalid URL should not produce a scenario");
  assert(invalid.issues.length > 0, "invalid URL should explain the rejection");
}

class MemoryStorage {
  value: string | null = null;

  getItem(key: string) {
    return key === PLANNER_STORAGE_KEY ? this.value : null;
  }

  setItem(key: string, value: string) {
    if (key === PLANNER_STORAGE_KEY) this.value = value;
  }
}

// Storage is versioned, migrates existing unversioned v1 snapshots, and ignores bad JSON.
{
  const storage = new MemoryStorage();
  savePlannerState(storage, validState);
  assert(storage.value !== null, "save should write a storage value");
  const saved = JSON.parse(storage.value) as { schemaVersion: number; state: unknown };
  assert(saved.schemaVersion === PLANNER_SCHEMA_VERSION, "save should write the current schema version");
  same(saved.state, validState, "save should write the planner state");

  const loaded = loadPlannerState(storage);
  assert(loaded.ok, "saved state should load");
  same(loaded.state, validState, "saved state should round trip");

  storage.value = JSON.stringify(validState);
  const migrated = loadPlannerState(storage);
  assert(migrated.ok && migrated.migrated, "unversioned v1 state should migrate");
  if (migrated.ok) same(migrated.state, validState, "v1 migration should preserve state");

  storage.value = "not JSON";
  const invalid = loadPlannerState(storage);
  assert(!invalid.ok, "bad storage JSON should be rejected");
  assert(invalid.issues.length > 0, "bad storage JSON should provide an explicit issue");
}

// URL precedence only applies to valid scenarios; invalid URL state cannot erase valid storage.
{
  const storedState = { ...validState, annualExpenses: 55_000 };
  const stored = parsePlannerState(storedState);
  assert(stored.ok, "stored fixture should be valid");
  const validUrl = parsePlannerSearchParams(new URLSearchParams("e=70000"));
  const invalidUrl = parsePlannerSearchParams(new URLSearchParams("a=80&t=40"));
  const absentUrl = parsePlannerSearchParams(new URLSearchParams());

  same(
    resolveInitialPlannerState(validUrl, stored),
    { ...PLANNER_DEFAULTS, annualExpenses: 70_000 },
    "valid URL should override stored state",
  );
  same(
    resolveInitialPlannerState(invalidUrl, stored),
    storedState,
    "invalid URL should not destroy valid stored state",
  );
  same(
    resolveInitialPlannerState(absentUrl, stored),
    storedState,
    "stored state should win when no URL scenario exists",
  );
  same(
    resolveInitialPlannerState(absentUrl, { ok: false, issues: [] }),
    PLANNER_DEFAULTS,
    "defaults should be the final fallback",
  );
}

console.log("All planner-state tests passed.");
