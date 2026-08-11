import assert from "node:assert/strict";
import {
  guardrailRange,
  healthcareBudget,
  portfolioReadiness,
  retirementAgeEstimate,
  rothConversionEstimate,
} from "./planning-tools";

assert.equal(
  Math.round(
    retirementAgeEstimate({
      currentAge: 40,
      portfolio: 1_000_000,
      annualContribution: 0,
      annualSpending: 40_000,
      withdrawalRate: 0.04,
      realReturn: 0.05,
    }).retirementAge ?? -1,
  ),
  40,
);

assert.deepEqual(
  portfolioReadiness({
    portfolio: 1_000_000,
    annualSpending: 50_000,
    annualIncome: 10_000,
    withdrawalRate: 0.04,
  }),
  {
    spendingGap: 40_000,
    target: 1_000_000,
    annualCapacity: 40_000,
    fundedPercent: 100,
    surplus: 0,
  },
);

const guardrails = guardrailRange({
  portfolio: 1_000_000,
  baselineRate: 0.04,
  lowerGuardrail: 0.032,
  upperGuardrail: 0.048,
  adjustment: 0.1,
});
assert.equal(Math.round(guardrails.lowerPortfolio), 833_333);
assert.equal(guardrails.reducedSpending, 36_000);

assert.deepEqual(
  rothConversionEstimate({
    pretaxBalance: 500_000,
    annualConversion: 50_000,
    years: 5,
    marginalTaxRate: 0.12,
  }),
  { converted: 250_000, estimatedFederalTax: 30_000, remainingPretax: 250_000 },
);

assert.deepEqual(
  healthcareBudget({
    monthlyPremium: 500,
    annualOutOfPocket: 2_000,
    annualDentalVision: 1_000,
    annualSubsidy: 0,
    yearsToMedicare: 2,
    medicalInflation: 0,
  }),
  { firstYear: 9_000, total: 18_000, monthlyEquivalent: 750 },
);

console.log("All planning-tool checks passed.");
