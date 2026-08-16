import { calculateFireNumber, calculateYearsToFire } from "@/lib/calculations";
import {
  estimateFederalIncomeTax,
  type FederalTaxInput,
} from "@/lib/federal-tax";

export function retirementAgeEstimate(input: {
  currentAge: number;
  portfolio: number;
  annualContribution: number;
  annualSpending: number;
  withdrawalRate: number;
  realReturn: number;
}) {
  const target = calculateFireNumber({
    annualExpenses: input.annualSpending,
    withdrawalRate: input.withdrawalRate,
  }).fireNumber;
  const timeline = calculateYearsToFire({
    currentPortfolio: input.portfolio,
    annualContribution: input.annualContribution,
    annualReturn: input.realReturn,
    targetAmount: target,
  });
  return {
    target,
    years: timeline.years,
    retirementAge:
      timeline.years == null ? null : input.currentAge + timeline.years,
    alreadyThere: timeline.alreadyThere,
    unreachable: timeline.unreachable,
  };
}

export function portfolioReadiness(input: {
  portfolio: number;
  annualSpending: number;
  annualIncome: number;
  withdrawalRate: number;
}) {
  const spendingGap = Math.max(0, input.annualSpending - input.annualIncome);
  const target = spendingGap / Math.max(0.001, input.withdrawalRate);
  const annualCapacity = Math.max(0, input.portfolio) * input.withdrawalRate;
  return {
    spendingGap,
    target,
    annualCapacity,
    fundedPercent: target === 0 ? 100 : (input.portfolio / target) * 100,
    surplus: input.portfolio - target,
  };
}

export function guardrailRange(input: {
  portfolio: number;
  baselineRate: number;
  lowerGuardrail: number;
  upperGuardrail: number;
  adjustment: number;
}) {
  const baseline = input.portfolio * input.baselineRate;
  return {
    baseline,
    lowerPortfolio: baseline / input.upperGuardrail,
    upperPortfolio: baseline / input.lowerGuardrail,
    reducedSpending: baseline * (1 - input.adjustment),
    increasedSpending: baseline * (1 + input.adjustment),
  };
}

export function rothConversionEstimate(input: FederalTaxInput) {
  return estimateFederalIncomeTax(input);
}

export function healthcareBudget(input: {
  monthlyPremium: number;
  annualOutOfPocket: number;
  annualDentalVision: number;
  annualSubsidy: number;
  yearsToMedicare: number;
  medicalInflation: number;
}) {
  const firstYear = Math.max(
    0,
    input.monthlyPremium * 12 +
      input.annualOutOfPocket +
      input.annualDentalVision -
      input.annualSubsidy,
  );
  const years = Math.max(0, Math.floor(input.yearsToMedicare));
  const total = Array.from({ length: years }, (_, year) =>
    firstYear * Math.pow(1 + input.medicalInflation, year),
  ).reduce((sum, cost) => sum + cost, 0);
  return { firstYear, total, monthlyEquivalent: firstYear / 12 };
}
