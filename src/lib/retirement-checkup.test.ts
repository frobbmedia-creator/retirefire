import assert from "node:assert/strict";
import {
  calculateRetirementCheckup,
  requiredAnnualContribution,
} from "./retirement-checkup";

assert.equal(
  requiredAnnualContribution({
    principal: 0,
    target: 100_000,
    annualReturn: 0,
    years: 10,
  }),
  10_000,
);

const onTrack = calculateRetirementCheckup({
  currentAge: 40,
  retirementAge: 65,
  portfolio: 1_000_000,
  annualContribution: 0,
  annualSpending: 40_000,
  annualRetirementIncome: 0,
  realReturn: 0,
  withdrawalRate: 0.04,
});
assert.equal(onTrack.status, "on-track");
assert.equal(onTrack.targetPortfolio, 1_000_000);
assert.equal(onTrack.supportedAnnualSpending, 40_000);

const close = calculateRetirementCheckup({
  currentAge: 65,
  retirementAge: 65,
  portfolio: 850_000,
  annualContribution: 0,
  annualSpending: 40_000,
  annualRetirementIncome: 0,
  realReturn: 0,
  withdrawalRate: 0.04,
});
assert.equal(close.status, "close");

const needsWork = calculateRetirementCheckup({
  currentAge: 60,
  retirementAge: 65,
  portfolio: 100_000,
  annualContribution: 5_000,
  annualSpending: 60_000,
  annualRetirementIncome: 10_000,
  realReturn: 0,
  withdrawalRate: 0.04,
});
assert.equal(needsWork.status, "needs-work");
assert.ok(needsWork.annualSavingsChange > 0);
assert.ok(needsWork.annualSpendingChange > 0);

console.log("All retirement-checkup checks passed.");
