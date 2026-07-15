/**
 * Pure financial math for RetireFire calculators.
 *
 * Conventions:
 * - Rates are annual decimals (0.04 = 4%).
 * - Returns are assumed constant (illustrative; not a forecast).
 * - Contributions are modeled as end-of-year deposits unless noted.
 * - When useNominal is false (default), rates are real (after inflation).
 */

export type FireNumberInput = {
  annualExpenses: number;
  /** Safe withdrawal rate, e.g. 0.04 */
  withdrawalRate: number;
};

export type FireNumberResult = {
  fireNumber: number;
  multiplier: number;
  monthlyExpenses: number;
  monthlyWithdrawal: number;
};

/**
 * FIRE number = annual spending / withdrawal rate.
 * Equivalent to spending × (1 / WR). At 4%, multiplier is 25×.
 */
export function calculateFireNumber(input: FireNumberInput): FireNumberResult {
  const expenses = Math.max(0, input.annualExpenses);
  const wr = Math.max(0.001, input.withdrawalRate);
  const multiplier = 1 / wr;
  const fireNumber = expenses * multiplier;

  return {
    fireNumber,
    multiplier,
    monthlyExpenses: expenses / 12,
    monthlyWithdrawal: (fireNumber * wr) / 12,
  };
}

/**
 * Convert a nominal return to approximate real return:
 * real ≈ (1 + nominal) / (1 + inflation) − 1
 */
export function realFromNominal(nominal: number, inflation: number): number {
  return (1 + nominal) / (1 + inflation) - 1;
}

/**
 * Convert a real return to approximate nominal:
 * nominal ≈ (1 + real) × (1 + inflation) − 1
 */
export function nominalFromReal(real: number, inflation: number): number {
  return (1 + real) * (1 + inflation) - 1;
}

/**
 * Effective growth rate used in projections.
 * - real mode: use expectedReturn as-is (already real)
 * - nominal mode: expectedReturn is nominal; we still project in real terms
 *   by converting via inflation for consistency of "today's dollars" targets
 */
export function effectiveRealReturn(
  expectedReturn: number,
  inflation: number,
  useNominal: boolean,
): number {
  if (!useNominal) return expectedReturn;
  return realFromNominal(expectedReturn, inflation);
}

export type YearsToFireInput = {
  currentPortfolio: number;
  annualContribution: number;
  /** Annual return used for projection (see effectiveRealReturn) */
  annualReturn: number;
  targetAmount: number;
};

export type YearsToFireResult = {
  years: number | null;
  alreadyThere: boolean;
  unreachable: boolean;
  projectedAtTarget: number | null;
};

/**
 * Years until portfolio reaches target with constant contributions and return.
 *
 * Solves for n in:
 *   T = P(1+r)^n + C * ((1+r)^n - 1) / r
 */
export function calculateYearsToFire(input: YearsToFireInput): YearsToFireResult {
  const P = Math.max(0, input.currentPortfolio);
  const C = Math.max(0, input.annualContribution);
  const r = input.annualReturn;
  const T = Math.max(0, input.targetAmount);

  if (T <= 0) {
    return { years: 0, alreadyThere: true, unreachable: false, projectedAtTarget: P };
  }

  if (P >= T) {
    return { years: 0, alreadyThere: true, unreachable: false, projectedAtTarget: P };
  }

  if (Math.abs(r) < 1e-9) {
    if (C <= 0) {
      return { years: null, alreadyThere: false, unreachable: true, projectedAtTarget: null };
    }
    const years = (T - P) / C;
    return {
      years: Math.max(0, years),
      alreadyThere: false,
      unreachable: false,
      projectedAtTarget: T,
    };
  }

  if (C === 0) {
    if (r <= 0 || P <= 0) {
      return { years: null, alreadyThere: false, unreachable: true, projectedAtTarget: null };
    }
    const years = Math.log(T / P) / Math.log(1 + r);
    if (!Number.isFinite(years) || years < 0) {
      return { years: null, alreadyThere: false, unreachable: true, projectedAtTarget: null };
    }
    return { years, alreadyThere: false, unreachable: false, projectedAtTarget: T };
  }

  const numerator = T * r + C;
  const denominator = P * r + C;

  if (denominator <= 0 || numerator <= 0 || numerator / denominator <= 0) {
    return { years: null, alreadyThere: false, unreachable: true, projectedAtTarget: null };
  }

  const years = Math.log(numerator / denominator) / Math.log(1 + r);

  if (!Number.isFinite(years) || years < 0) {
    return { years: null, alreadyThere: false, unreachable: true, projectedAtTarget: null };
  }

  if (years > 100) {
    return { years: 100, alreadyThere: false, unreachable: false, projectedAtTarget: T };
  }

  return { years, alreadyThere: false, unreachable: false, projectedAtTarget: T };
}

/** Future value of portfolio with annual end-of-year contributions. */
export function futureValue(
  principal: number,
  annualContribution: number,
  annualReturn: number,
  years: number,
): number {
  const P = Math.max(0, principal);
  const C = Math.max(0, annualContribution);
  const r = annualReturn;
  const n = Math.max(0, years);

  if (n === 0) return P;
  if (Math.abs(r) < 1e-9) return P + C * n;

  const growth = Math.pow(1 + r, n);
  return P * growth + C * ((growth - 1) / r);
}

export type ProjectionPoint = {
  year: number;
  portfolio: number;
  /** Cumulative contributions from year 0 (not including starting principal) */
  contributions: number;
};

/**
 * Year-by-year portfolio path for charting (integer years).
 */
export function buildProjectionSeries(input: {
  currentPortfolio: number;
  annualContribution: number;
  annualReturn: number;
  years: number;
}): ProjectionPoint[] {
  const n = Math.max(0, Math.ceil(input.years));
  const points: ProjectionPoint[] = [
    { year: 0, portfolio: Math.max(0, input.currentPortfolio), contributions: 0 },
  ];

  for (let y = 1; y <= n; y++) {
    points.push({
      year: y,
      portfolio: futureValue(
        input.currentPortfolio,
        input.annualContribution,
        input.annualReturn,
        y,
      ),
      contributions: input.annualContribution * y,
    });
  }
  return points;
}

export type CoastFireInput = {
  fireNumber: number;
  currentPortfolio: number;
  currentAge: number;
  retirementAge: number;
  annualReturn: number;
};

export type CoastFireResult = {
  yearsToRetirement: number;
  coastNumber: number;
  alreadyCoast: boolean;
  yearsUntilCoast: number | null;
  projectedAtRetirement: number;
  shortfallToday: number;
  surplusToday: number;
};

/**
 * Coast FIRE: coastNumber = fireNumber / (1+r)^years
 */
export function calculateCoastFire(input: CoastFireInput): CoastFireResult {
  const fireNumber = Math.max(0, input.fireNumber);
  const current = Math.max(0, input.currentPortfolio);
  const yearsToRetirement = Math.max(0, input.retirementAge - input.currentAge);
  const r = input.annualReturn;

  let coastNumber: number;
  if (yearsToRetirement === 0 || Math.abs(r) < 1e-9) {
    coastNumber = fireNumber;
  } else {
    coastNumber = fireNumber / Math.pow(1 + r, yearsToRetirement);
  }

  const projectedAtRetirement = futureValue(current, 0, r, yearsToRetirement);
  const alreadyCoast = current >= coastNumber - 0.5;
  const shortfallToday = Math.max(0, coastNumber - current);
  const surplusToday = Math.max(0, current - coastNumber);

  let yearsUntilCoast: number | null = null;
  if (alreadyCoast) {
    yearsUntilCoast = 0;
  } else if (current <= 0 || r <= 0) {
    yearsUntilCoast = null;
  } else {
    const y = Math.log(coastNumber / current) / Math.log(1 + r);
    yearsUntilCoast = Number.isFinite(y) && y >= 0 ? y : null;
  }

  return {
    yearsToRetirement,
    coastNumber,
    alreadyCoast,
    yearsUntilCoast,
    projectedAtRetirement,
    shortfallToday,
    surplusToday,
  };
}

export type BaristaFireInput = {
  annualExpenses: number;
  /** Annual income from part-time / side work in "semi-retirement" */
  partTimeIncome: number;
  withdrawalRate: number;
  currentPortfolio: number;
  annualContribution: number;
  annualReturn: number;
};

export type BaristaFireResult = {
  /** Expenses not covered by part-time income */
  gapExpenses: number;
  /** Portfolio needed so SWR covers the gap */
  baristaNumber: number;
  fullFireNumber: number;
  portfolioReduction: number;
  yearsToBarista: YearsToFireResult;
  /** Share of spending covered by work income (0–1) */
  workCoverage: number;
};

/**
 * Barista FIRE: portfolio only needs to cover (expenses − part-time income).
 * baristaNumber = max(0, expenses − income) / withdrawalRate
 */
export function calculateBaristaFire(input: BaristaFireInput): BaristaFireResult {
  const expenses = Math.max(0, input.annualExpenses);
  const income = Math.max(0, input.partTimeIncome);
  const gapExpenses = Math.max(0, expenses - income);
  const wr = Math.max(0.001, input.withdrawalRate);

  const full = calculateFireNumber({ annualExpenses: expenses, withdrawalRate: wr });
  const baristaNumber = gapExpenses / wr;
  const workCoverage = expenses > 0 ? Math.min(1, income / expenses) : 0;

  const yearsToBarista = calculateYearsToFire({
    currentPortfolio: input.currentPortfolio,
    annualContribution: input.annualContribution,
    annualReturn: input.annualReturn,
    targetAmount: baristaNumber,
  });

  return {
    gapExpenses,
    baristaNumber,
    fullFireNumber: full.fireNumber,
    portfolioReduction: Math.max(0, full.fireNumber - baristaNumber),
    yearsToBarista,
    workCoverage,
  };
}

export type SavingsRateRow = {
  /** Savings as fraction of gross-ish income proxy: C / (C + expenses) */
  savingsRate: number;
  annualContribution: number;
  years: number | null;
  unreachable: boolean;
};

/**
 * Classic “years to FI by savings rate” table.
 * Income proxy = annualExpenses + annualContribution (spending + saving).
 * For each savings rate s: C = s * income, expenses stay fixed → income = expenses / (1−s)
 */
export function buildSavingsRateTable(input: {
  annualExpenses: number;
  currentPortfolio: number;
  annualReturn: number;
  withdrawalRate: number;
  rates?: number[];
}): SavingsRateRow[] {
  const expenses = Math.max(0, input.annualExpenses);
  const rates =
    input.rates ??
    [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8];

  const target = calculateFireNumber({
    annualExpenses: expenses,
    withdrawalRate: input.withdrawalRate,
  }).fireNumber;

  return rates.map((savingsRate) => {
    if (savingsRate <= 0 || savingsRate >= 1) {
      return {
        savingsRate,
        annualContribution: 0,
        years: null,
        unreachable: true,
      };
    }
    // income = expenses / (1 - s); C = s * income
    const income = expenses / (1 - savingsRate);
    const annualContribution = savingsRate * income;
    const result = calculateYearsToFire({
      currentPortfolio: input.currentPortfolio,
      annualContribution,
      annualReturn: input.annualReturn,
      targetAmount: target,
    });
    return {
      savingsRate,
      annualContribution,
      years: result.years,
      unreachable: result.unreachable,
    };
  });
}

export function portfolioMultiplier(withdrawalRate: number): number {
  return 1 / Math.max(0.001, withdrawalRate);
}
