import { calculateYearsToFire, futureValue } from "@/lib/calculations";

export type RetirementCheckupInput = {
  currentAge: number;
  retirementAge: number;
  portfolio: number;
  annualContribution: number;
  annualSpending: number;
  annualRetirementIncome: number;
  realReturn: number;
  withdrawalRate: number;
};

export type RetirementCheckupStatus = "on-track" | "close" | "needs-work";

export function requiredAnnualContribution(input: {
  principal: number;
  target: number;
  annualReturn: number;
  years: number;
}) {
  const principal = Math.max(0, input.principal);
  const target = Math.max(0, input.target);
  const years = Math.max(0, input.years);
  const rate = input.annualReturn;
  if (years === 0) return target <= principal ? 0 : Number.POSITIVE_INFINITY;
  if (Math.abs(rate) < 1e-9) {
    return Math.max(0, (target - principal) / years);
  }
  const growth = Math.pow(1 + rate, years);
  const annuityFactor = (growth - 1) / rate;
  return Math.max(0, (target - principal * growth) / annuityFactor);
}

export function calculateRetirementCheckup(input: RetirementCheckupInput) {
  const yearsToPlannedRetirement = Math.max(
    0,
    input.retirementAge - input.currentAge,
  );
  const spendingFromPortfolio = Math.max(
    0,
    input.annualSpending - input.annualRetirementIncome,
  );
  const targetPortfolio =
    spendingFromPortfolio / Math.max(0.001, input.withdrawalRate);
  const projectedPortfolio = futureValue(
    input.portfolio,
    input.annualContribution,
    input.realReturn,
    yearsToPlannedRetirement,
  );
  const fundedPercent =
    targetPortfolio === 0 ? 100 : (projectedPortfolio / targetPortfolio) * 100;
  const status: RetirementCheckupStatus =
    fundedPercent >= 100
      ? "on-track"
      : fundedPercent >= 80
        ? "close"
        : "needs-work";
  const timeline = calculateYearsToFire({
    currentPortfolio: input.portfolio,
    annualContribution: input.annualContribution,
    annualReturn: input.realReturn,
    targetAmount: targetPortfolio,
  });
  const estimatedRetirementAge =
    timeline.years == null ? null : input.currentAge + timeline.years;
  const supportedAnnualSpending =
    projectedPortfolio * input.withdrawalRate + input.annualRetirementIncome;
  const requiredContribution = requiredAnnualContribution({
    principal: input.portfolio,
    target: targetPortfolio,
    annualReturn: input.realReturn,
    years: yearsToPlannedRetirement,
  });
  const annualSavingsChange = Math.max(
    0,
    requiredContribution - input.annualContribution,
  );
  const annualSpendingChange = Math.max(
    0,
    input.annualSpending - supportedAnnualSpending,
  );

  return {
    yearsToPlannedRetirement,
    spendingFromPortfolio,
    targetPortfolio,
    projectedPortfolio,
    fundedPercent,
    status,
    estimatedRetirementAge,
    supportedAnnualSpending,
    requiredContribution,
    annualSavingsChange,
    annualSpendingChange,
  };
}
