/**
 * Lightweight sanity checks for financial math.
 * Run: npx tsx src/lib/calculations.test.ts
 */
import {
  buildSavingsRateTable,
  calculateBaristaFire,
  calculateCoastFire,
  calculateFireNumber,
  calculateYearsToFire,
  effectiveRealReturn,
  futureValue,
  realFromNominal,
} from "./calculations";

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

function approx(a: number, b: number, tol = 0.02) {
  return Math.abs(a - b) <= tol;
}

// FIRE number: 4% of 1.5M = 60k
{
  const r = calculateFireNumber({ annualExpenses: 60_000, withdrawalRate: 0.04 });
  assert(r.fireNumber === 1_500_000, `fireNumber expected 1500000 got ${r.fireNumber}`);
  assert(r.multiplier === 25, `multiplier expected 25 got ${r.multiplier}`);
}

// Years: zero return linear
{
  const r = calculateYearsToFire({
    currentPortfolio: 100_000,
    annualContribution: 50_000,
    annualReturn: 0,
    targetAmount: 300_000,
  });
  assert(r.years !== null && approx(r.years, 4), `years expected ~4 got ${r.years}`);
}

// Years: already there
{
  const r = calculateYearsToFire({
    currentPortfolio: 2_000_000,
    annualContribution: 0,
    annualReturn: 0.05,
    targetAmount: 1_500_000,
  });
  assert(r.alreadyThere && r.years === 0, "should already be there");
}

// Future value known case: P=0, C=1, r=0, n=10 → 10
{
  assert(futureValue(0, 1, 0, 10) === 10, "FV linear failed");
}

// Coast: if years=0, coast = FIRE
{
  const r = calculateCoastFire({
    fireNumber: 1_000_000,
    currentPortfolio: 100_000,
    currentAge: 65,
    retirementAge: 65,
    annualReturn: 0.05,
  });
  assert(r.coastNumber === 1_000_000, `coast at horizon should equal FIRE`);
}

// Coast: discount 1M for 10y at 5%
{
  const r = calculateCoastFire({
    fireNumber: 1_000_000,
    currentPortfolio: 0,
    currentAge: 55,
    retirementAge: 65,
    annualReturn: 0.05,
  });
  const expected = 1_000_000 / Math.pow(1.05, 10);
  assert(approx(r.coastNumber, expected, 1), `coast ~${expected} got ${r.coastNumber}`);
}

// Barista: $60k spend, $20k work → $40k gap → $1M at 4%
{
  const r = calculateBaristaFire({
    annualExpenses: 60_000,
    partTimeIncome: 20_000,
    withdrawalRate: 0.04,
    currentPortfolio: 0,
    annualContribution: 0,
    annualReturn: 0.05,
  });
  assert(r.gapExpenses === 40_000, `gap ${r.gapExpenses}`);
  assert(r.baristaNumber === 1_000_000, `barista ${r.baristaNumber}`);
  assert(r.fullFireNumber === 1_500_000, `full ${r.fullFireNumber}`);
  assert(approx(r.workCoverage, 20_000 / 60_000), "work coverage");
}

// Real from nominal: ~7% nominal, 2.5% inflation ≈ 4.39% real
{
  const real = realFromNominal(0.07, 0.025);
  assert(approx(real, (1.07 / 1.025) - 1, 1e-9), `real ${real}`);
  const eff = effectiveRealReturn(0.07, 0.025, true);
  assert(approx(eff, real, 1e-9), "effective real in nominal mode");
  assert(effectiveRealReturn(0.05, 0.025, false) === 0.05, "real mode passthrough");
}

// Savings rate table has decreasing years as rate rises (when reachable)
{
  const rows = buildSavingsRateTable({
    annualExpenses: 50_000,
    currentPortfolio: 0,
    annualReturn: 0.05,
    withdrawalRate: 0.04,
    rates: [0.2, 0.5],
  });
  assert(rows[0].years != null && rows[1].years != null, "years present");
  assert(
    (rows[1].years as number) < (rows[0].years as number),
    "higher savings → fewer years",
  );
}

console.log("All calculation tests passed.");
