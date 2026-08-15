import assert from "node:assert/strict";
import {
  CALCULATION_REGISTRY,
  calculationVersion,
  validateCalculationRegistry,
  type CalculationMethod,
} from "./calculation-registry";
import {
  ANALYTICS_PROP_ALLOWLIST,
  sanitizeAnalyticsProps,
} from "./analytics";
import {
  createCalculatorLifecycleSession,
  plannerCalculatorHasValidResult,
  type PlannerMutation,
} from "./calculator-lifecycle";
import { PLANNER_DEFAULTS, type PlannerState } from "./planner-state";
import {
  calculateBaristaFire,
  calculateCoastFire,
  calculateFireNumber,
  calculateYearsToFire,
  effectiveRealReturn,
} from "./calculations";

// This catches accidental registry changes that remove its governance metadata.
assert.deepEqual(validateCalculationRegistry(CALCULATION_REGISTRY), []);
assert.ok(CALCULATION_REGISTRY.length >= 10, "expected governed calculation entries");
assert.equal(calculationVersion("fire"), "1.0.0");
assert.equal(calculationVersion("not-a-method"), "unknown");

// This catches a shipped Roth estimator remaining labeled as an unimplemented draft
// or pointing users to a source that does not contain the 2026 bracket tables.
const rothMethod = CALCULATION_REGISTRY.find((method) => method.id === "roth-conversion");
assert(rothMethod);
assert.equal(rothMethod.version, "1.0.1");
assert.equal(rothMethod.status, "active");
assert(
  rothMethod.sources.some(
    (source) =>
      source.label === "Revenue Procedure 2025-32" &&
      source.href === "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf",
  ),
);
assert(rothMethod.exclusions.includes("Capital gains and qualified-dividend interactions"));
assert(
  rothMethod.exclusions.includes(
    "Nondeductible IRA or plan basis and pro-rata treatment; the estimate assumes the entire applied conversion is taxable",
  ),
);

// This catches either retirement-income estimate shipping without active,
// source-backed governance metadata.
const socialSecurityClaimMethod = CALCULATION_REGISTRY.find(
  (method) => method.id === "social-security-claim",
);
assert(socialSecurityClaimMethod);
assert.equal(socialSecurityClaimMethod.version, "1.0.0");
assert.equal(socialSecurityClaimMethod.status, "active");
assert(
  socialSecurityClaimMethod.sources.some(
    (source) => source.href === "https://www.ssa.gov/oact/quickcalc/earlyretire.html",
  ),
);
assert(
  socialSecurityClaimMethod.sources.some(
    (source) =>
      source.href ===
      "https://www.ssa.gov/benefits/retirement/planner/delayret.html",
  ),
);

const taxableSocialSecurityMethod = CALCULATION_REGISTRY.find(
  (method) => method.id === "social-security-taxable",
);
assert(taxableSocialSecurityMethod);
assert.equal(taxableSocialSecurityMethod.version, "1.0.0");
assert.equal(taxableSocialSecurityMethod.status, "active");
assert(
  taxableSocialSecurityMethod.sources.some(
    (source) => source.href === "https://www.irs.gov/pub/irs-pdf/p915.pdf",
  ),
);
assert(
  taxableSocialSecurityMethod.exclusions.includes(
    "State and local tax and total federal income tax liability",
  ),
);

const baseMethod = CALCULATION_REGISTRY[0]!;

function issuesFor(patch: Record<string, unknown>): string {
  return validateCalculationRegistry([{ ...baseMethod, ...patch } as CalculationMethod]).join(" ");
}

assert.match(
  validateCalculationRegistry([baseMethod, { ...baseMethod }]).join(" "),
  /duplicate id/,
);
assert.match(issuesFor({ version: "version-one" }), /semantic version/);
assert.match(issuesFor({ status: "unreviewed" }), /status must be explicit/);
assert.match(issuesFor({ effectiveDate: "August 15, 2026" }), /ISO dates/);
assert.match(issuesFor({ lastReviewed: "2026/08/15" }), /ISO dates/);
assert.match(issuesFor({ nextReviewTrigger: "" }), /next review trigger/);
assert.match(issuesFor({ sources: [] }), /HTTPS source/);
assert.match(
  issuesFor({ sources: [{ label: "Insecure source", href: "http://example.com" }] }),
  /source must use HTTPS/,
);
assert.match(issuesFor({ assumptions: [] }), /assumption/);
assert.match(issuesFor({ exclusions: [] }), /exclusion/);
assert.match(issuesFor({ reviewCadence: "" }), /review cadence/);
assert.match(
  issuesFor({ reviewCadence: baseMethod.nextReviewTrigger }),
  /review cadence must differ/,
);

// Only predefined operational categories may reach analytics providers.
assert.deepEqual(
  sanitizeAnalyticsProps({
    calculator: "coast",
    methodology_version: "1.0.0",
    status: "complete",
    source: "homepage_hero",
    path: "/calculators/coast-fire",
    portfolio: 500_000,
    income: "120000",
    spending: 60_000,
    tax: 12_000,
    age: 42,
    paths: 1_000,
    success_pct: 85,
  }),
  {
    calculator: "coast",
    methodology_version: "1.0.0",
    status: "complete",
    source: "homepage_hero",
    path: "/calculators/coast-fire",
  },
);

assert.ok(ANALYTICS_PROP_ALLOWLIST.includes("scenario_band"));
assert.deepEqual(
  sanitizeAnalyticsProps({
    scenario_band: "under_5_years",
    path: "/calculators/coast-fire?portfolio=500000",
    calculator: "500000",
  }),
  { scenario_band: "under_5_years" },
);

// Values must be the predefined category for their key, not merely a safe-looking string.
assert.deepEqual(sanitizeAnalyticsProps({ source: "income_120000" }), {});
assert.deepEqual(sanitizeAnalyticsProps({ status: "age_42" }), {});
assert.deepEqual(sanitizeAnalyticsProps({ scenario_band: "portfolio_500000" }), {});
assert.deepEqual(sanitizeAnalyticsProps({ scenario_band: "unrecognized_band" }), {});

// Methodology versions are governed by the registry, rather than copied into analytics.
for (const method of CALCULATION_REGISTRY) {
  assert.deepEqual(
    sanitizeAnalyticsProps({ methodology_version: method.version }),
    { methodology_version: method.version },
  );
}

function plannerResults(state: PlannerState) {
  const realReturn = effectiveRealReturn(
    state.expectedReturnPct / 100,
    state.inflationPct / 100,
    state.useNominal,
  );
  const fire = calculateFireNumber({
    annualExpenses: state.annualExpenses,
    withdrawalRate: state.withdrawalRatePct / 100,
  });
  const years = calculateYearsToFire({
    currentPortfolio: state.currentPortfolio,
    annualContribution: state.annualContribution,
    annualReturn: realReturn,
    targetAmount: fire.fireNumber,
  });
  const coast = calculateCoastFire({
    fireNumber: fire.fireNumber,
    currentPortfolio: state.currentPortfolio,
    currentAge: state.currentAge,
    retirementAge: state.retirementAge,
    annualReturn: realReturn,
  });
  const barista = calculateBaristaFire({
    annualExpenses: state.annualExpenses,
    partTimeIncome: state.partTimeIncome,
    withdrawalRate: state.withdrawalRatePct / 100,
    currentPortfolio: state.currentPortfolio,
    annualContribution: state.annualContribution,
    annualReturn: realReturn,
  });
  return { state, realReturn, fire, years, coast, barista };
}

function mutation(sequence: number, source: PlannerMutation["source"]): PlannerMutation {
  return { sequence, source };
}

// This catches a false completion event on mount, external synchronization, or an invalid result.
const lifecycle = createCalculatorLifecycleSession();
assert.deepEqual(lifecycle.record(null, ["coast"], plannerResults(PLANNER_DEFAULTS)), []);
assert.deepEqual(
  lifecycle.record(mutation(1, "hydration"), ["coast"], plannerResults(PLANNER_DEFAULTS)),
  [],
);
assert.deepEqual(
  lifecycle.record(mutation(2, "history"), ["coast"], plannerResults(PLANNER_DEFAULTS)),
  [],
);

const invalidCoast = plannerResults({ ...PLANNER_DEFAULTS, retirementAge: PLANNER_DEFAULTS.currentAge });
assert.equal(plannerCalculatorHasValidResult("coast", invalidCoast), false);
assert.deepEqual(
  lifecycle.record(mutation(3, "field"), ["coast"], invalidCoast),
  [{ calculator: "coast", status: "started" }],
);

const validCoast = plannerResults(PLANNER_DEFAULTS);
assert.equal(plannerCalculatorHasValidResult("coast", validCoast), true);
assert.deepEqual(
  lifecycle.record(mutation(4, "preset"), ["coast"], validCoast),
  [{ calculator: "coast", status: "valid_result" }],
);
assert.deepEqual(lifecycle.record(mutation(5, "patch"), ["coast"], validCoast), []);
assert.deepEqual(lifecycle.record(mutation(6, "reset"), ["coast"], validCoast), []);
assert.deepEqual(lifecycle.record(mutation(6, "reset"), ["coast"], validCoast), []);

for (const source of ["field", "preset", "patch", "reset"] as const) {
  const actionLifecycle = createCalculatorLifecycleSession();
  assert.deepEqual(
    actionLifecycle.record(mutation(1, source), ["fire"], validCoast),
    [
      { calculator: "fire", status: "started" },
      { calculator: "fire", status: "valid_result" },
    ],
    `${source} user action should begin and complete a valid calculator lifecycle`,
  );
}

console.log("All calculation-registry tests passed.");
