import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { RothConversionCalculator } from "../components/calculators/PlanningTools";
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
    taxYear: 2026,
    filingStatus: "single",
    currentTaxableIncome: 49_000,
    desiredConversion: 60_000,
    traditionalBalance: 500_000,
  }),
  {
    ok: true,
    taxYear: 2026,
    filingStatus: "single",
    standardDeduction: 16_100,
    taxableIncomeBeforeConversion: 49_000,
    taxableIncomeAfterConversion: 109_000,
    desiredConversion: 60_000,
    appliedConversion: 60_000,
    conversionWasLimited: false,
    federalTaxBeforeConversion: 5_632,
    federalTaxAfterConversion: 18_758,
    incrementalFederalTax: 13_126,
    effectiveFederalRateOnConversion: 13_126 / 60_000,
    remainingTraditionalBalance: 440_000,
    exclusions: [
      "State and local income taxes",
      "Alternative minimum tax and net investment income tax",
      "Tax credits and changes to deductions",
      "Capital gains and qualified-dividend interactions",
      "Nondeductible IRA or plan basis and pro-rata treatment; the estimate assumes the entire applied conversion is taxable",
      "ACA premium tax credits and Medicare IRMAA",
      "Future tax-law changes and multiyear optimization",
      "Withholding, estimated-tax penalties, and conversion opportunity cost",
    ],
  },
);

const invalidRoth = rothConversionEstimate({
  taxYear: 2026,
  filingStatus: "single",
  currentTaxableIncome: 49_000,
  desiredConversion: Number.POSITIVE_INFINITY,
  traditionalBalance: 500_000,
});
assert.equal(invalidRoth.ok, false);
if (!invalidRoth.ok) assert.match(invalidRoth.errors.join(" "), /desiredConversion/);

// Break caught: the primary calculator must visibly disclose the fully taxable
// assumption and the omitted nondeductible-basis/pro-rata treatment.
const rothMarkup = renderToStaticMarkup(createElement(RothConversionCalculator));
assert.match(rothMarkup, /assumes the entire applied conversion is taxable/i);
assert.match(rothMarkup, /nondeductible IRA or plan basis and pro-rata treatment/i);

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
