import assert from "node:assert/strict";
import {
  CALCULATION_REGISTRY,
  calculationVersion,
  validateCalculationRegistry,
  type CalculationMethod,
} from "./calculation-registry";
import {
  ANALYTICS_PROP_ALLOWLIST,
  calculatorLifecycleProps,
  sanitizeAnalyticsProps,
} from "./analytics";

// This catches accidental registry changes that remove its governance metadata.
assert.deepEqual(validateCalculationRegistry(CALCULATION_REGISTRY), []);
assert.ok(CALCULATION_REGISTRY.length >= 10, "expected governed calculation entries");
assert.equal(calculationVersion("fire"), "1.0.0");
assert.equal(calculationVersion("not-a-method"), "unknown");

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

assert.deepEqual(calculatorLifecycleProps("coast", "valid_result"), {
  calculator: "coast",
  methodology_version: "1.0.0",
  status: "valid_result",
});

console.log("All calculation-registry tests passed.");
