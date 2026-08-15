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

// This catches accidental registry changes that remove its governance metadata.
assert.deepEqual(validateCalculationRegistry(CALCULATION_REGISTRY), []);
assert.ok(CALCULATION_REGISTRY.length >= 10, "expected governed calculation entries");
assert.equal(calculationVersion("fire"), "1.0.0");
assert.equal(calculationVersion("not-a-method"), "unknown");

const invalidMethod: CalculationMethod = {
  ...CALCULATION_REGISTRY[0]!,
  id: "fire",
  version: "version-one",
  effectiveDate: "August 15, 2026",
  lastReviewed: "2026/08/15",
  sources: [{ label: "Insecure source", href: "http://example.com" }],
};

assert.match(
  validateCalculationRegistry([CALCULATION_REGISTRY[0]!, invalidMethod]).join(" "),
  /duplicate id|semantic version|ISO date|HTTPS source/,
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

console.log("All calculation-registry tests passed.");
