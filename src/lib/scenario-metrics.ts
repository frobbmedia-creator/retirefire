/**
 * Derive all primary calculator outputs from a planner state snapshot.
 * Used for A/B scenario comparison.
 */

import {
  calculateBaristaFire,
  calculateCoastFire,
  calculateFireNumber,
  calculateYearsToFire,
  effectiveRealReturn,
} from "@/lib/calculations";
import type { PlannerState } from "@/lib/planner-state";

export type ScenarioMetrics = {
  label: string;
  annualExpenses: number;
  currentPortfolio: number;
  annualContribution: number;
  withdrawalRate: number;
  realReturn: number;
  currentAge: number;
  retirementAge: number;
  partTimeIncome: number;
  fireNumber: number;
  yearsToFire: number | null;
  yearsUnreachable: boolean;
  alreadyAtFire: boolean;
  coastNumber: number;
  alreadyCoast: boolean;
  coastShortfall: number;
  coastSurplus: number;
  baristaNumber: number;
  gapExpenses: number;
};

export function computeScenarioMetrics(
  state: PlannerState,
  label = "Scenario",
): ScenarioMetrics {
  const withdrawalRate = state.withdrawalRatePct / 100;
  const realReturn = effectiveRealReturn(
    state.expectedReturnPct / 100,
    state.inflationPct / 100,
    state.useNominal,
  );

  const fire = calculateFireNumber({
    annualExpenses: state.annualExpenses,
    withdrawalRate,
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
    withdrawalRate,
    currentPortfolio: state.currentPortfolio,
    annualContribution: state.annualContribution,
    annualReturn: realReturn,
  });

  return {
    label,
    annualExpenses: state.annualExpenses,
    currentPortfolio: state.currentPortfolio,
    annualContribution: state.annualContribution,
    withdrawalRate,
    realReturn,
    currentAge: state.currentAge,
    retirementAge: state.retirementAge,
    partTimeIncome: state.partTimeIncome,
    fireNumber: fire.fireNumber,
    yearsToFire: years.years,
    yearsUnreachable: years.unreachable,
    alreadyAtFire: years.alreadyThere,
    coastNumber: coast.coastNumber,
    alreadyCoast: coast.alreadyCoast,
    coastShortfall: coast.shortfallToday,
    coastSurplus: coast.surplusToday,
    baristaNumber: barista.baristaNumber,
    gapExpenses: barista.gapExpenses,
  };
}

export function clonePlannerState(state: PlannerState): PlannerState {
  return { ...state };
}
