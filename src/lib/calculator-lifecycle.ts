import type {
  BaristaFireResult,
  CoastFireResult,
  FireNumberResult,
  YearsToFireResult,
} from "./calculations";
import type { PlannerState } from "./planner-state";

export type UserPlannerMutationSource = "field" | "preset" | "patch" | "reset";

export type PlannerMutation = {
  sequence: number;
  source: UserPlannerMutationSource | "hydration" | "history";
};

export type CalculatorLifecycleEvent = {
  calculator: string;
  status: "started" | "valid_result";
};

export type PlannerCalculatorResults = {
  state: PlannerState;
  realReturn: number;
  fire: FireNumberResult;
  years: YearsToFireResult;
  coast: CoastFireResult;
  barista: BaristaFireResult;
};

function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

function hasFiniteNumbers(...values: number[]): boolean {
  return values.every(isFiniteNumber);
}

function hasValidFireResult({ state, fire }: PlannerCalculatorResults): boolean {
  return (
    state.annualExpenses >= 0 &&
    state.withdrawalRatePct > 0 &&
    hasFiniteNumbers(
      state.annualExpenses,
      state.withdrawalRatePct,
      fire.fireNumber,
      fire.multiplier,
      fire.monthlyExpenses,
      fire.monthlyWithdrawal,
    )
  );
}

function hasValidYearsResult({ state, realReturn, years, ...results }: PlannerCalculatorResults): boolean {
  return (
    hasValidFireResult({ state, realReturn, years, ...results }) &&
    state.currentPortfolio >= 0 &&
    state.annualContribution >= 0 &&
    hasFiniteNumbers(state.currentPortfolio, state.annualContribution, realReturn) &&
    (years.alreadyThere || years.unreachable || (years.years !== null && isFiniteNumber(years.years)))
  );
}

function hasValidCoastResult({ state, realReturn, coast, ...results }: PlannerCalculatorResults): boolean {
  return (
    hasValidFireResult({ state, realReturn, coast, ...results }) &&
    state.currentPortfolio >= 0 &&
    state.currentAge >= 18 &&
    state.retirementAge > state.currentAge &&
    hasFiniteNumbers(
      state.currentPortfolio,
      state.currentAge,
      state.retirementAge,
      realReturn,
      coast.yearsToRetirement,
      coast.coastNumber,
      coast.projectedAtRetirement,
      coast.shortfallToday,
      coast.surplusToday,
    )
  );
}

function hasValidBaristaResult({ state, realReturn, barista, ...results }: PlannerCalculatorResults): boolean {
  const years = barista.yearsToBarista;
  return (
    hasValidFireResult({ state, realReturn, barista, ...results }) &&
    state.partTimeIncome >= 0 &&
    state.currentPortfolio >= 0 &&
    state.annualContribution >= 0 &&
    hasFiniteNumbers(
      state.partTimeIncome,
      state.currentPortfolio,
      state.annualContribution,
      realReturn,
      barista.gapExpenses,
      barista.baristaNumber,
      barista.fullFireNumber,
      barista.portfolioReduction,
      barista.workCoverage,
    ) &&
    (years.alreadyThere || years.unreachable || (years.years !== null && isFiniteNumber(years.years)))
  );
}

/** Whether the current planner state produces a usable result for the visible calculator. */
export function plannerCalculatorHasValidResult(
  calculator: string,
  results: PlannerCalculatorResults,
): boolean {
  switch (calculator) {
    case "fire":
      return hasValidFireResult(results);
    case "years":
      return hasValidYearsResult(results);
    case "coast":
      return hasValidCoastResult(results);
    case "barista":
      return hasValidBaristaResult(results);
    case "savings-rate":
      return hasValidYearsResult(results);
    default:
      return false;
  }
}

function isUserMutation(
  mutation: PlannerMutation | null,
): mutation is PlannerMutation & { source: UserPlannerMutationSource } {
  return (
    mutation?.source === "field" ||
    mutation?.source === "preset" ||
    mutation?.source === "patch" ||
    mutation?.source === "reset"
  );
}

/** Keep calculator lifecycle stages truthful and deduplicated for one mounted component session. */
export function createCalculatorLifecycleSession() {
  const started = new Set<string>();
  const completed = new Set<string>();
  const processedMutations = new Set<number>();

  return {
    record(
      mutation: PlannerMutation | null,
      calculatorIds: readonly string[],
      results: PlannerCalculatorResults,
    ): CalculatorLifecycleEvent[] {
      if (!isUserMutation(mutation) || processedMutations.has(mutation.sequence)) return [];
      processedMutations.add(mutation.sequence);

      const events: CalculatorLifecycleEvent[] = [];
      for (const calculator of calculatorIds) {
        if (!started.has(calculator)) {
          started.add(calculator);
          events.push({ calculator, status: "started" });
        }
        if (!completed.has(calculator) && plannerCalculatorHasValidResult(calculator, results)) {
          completed.add(calculator);
          events.push({ calculator, status: "valid_result" });
        }
      }
      return events;
    },
  };
}
