/**
 * Contract tests for governed historical scenario data.
 * Run: npx tsx src/lib/historical-scenarios.test.ts
 */
import {
  applySequenceStress,
  parseHistoricalCsv,
  runHistoricalScenarios,
  type HistoricalDatasetMetadata,
} from "./historical-scenarios";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function approx(actual: number, expected: number, tolerance = 1e-9) {
  return Math.abs(actual - expected) <= tolerance;
}

const validCsv = [
  "year,stock_return,bond_return,inflation",
  "2000,0.10,0.04,0.02",
  "2001,-0.20,0.03,0.03",
  "2002,0.08,0.02,0.01",
].join("\n");

const validMetadata: HistoricalDatasetMetadata = {
  checksum: "sha256:example",
  provenance: {
    source: "Reproducible source fixture",
    retrievedAt: "2026-08-15",
  },
  coverage: { startYear: 2000, endYear: 2002, yearCount: 3 },
};

// Break caught: accepting repeated calendar rows would let a simulation double-count a year.
{
  const result = parseHistoricalCsv(
    validCsv.replace("2001,-0.20", "2000,-0.20"),
    validMetadata,
  );
  assert(!result.ok, "duplicate year must reject the entire dataset");
  assert(result.errors.some((error) => error.code === "duplicate_year"), "duplicate error code");
  assert(!("dataset" in result), "invalid CSV must not return partial data");
}

// Break caught: silently skipping a calendar year would create false contiguous historical cycles.
{
  const result = parseHistoricalCsv(
    validCsv.replace("2001,-0.20,0.03,0.03\n", ""),
    { ...validMetadata, coverage: { startYear: 2000, endYear: 2002, yearCount: 2 } },
  );
  assert(!result.ok, "gapped years must reject the dataset");
  assert(result.errors.some((error) => error.code === "year_gap"), "gap error code");
}

// Break caught: a non-numeric return would otherwise propagate NaN into balances.
{
  const result = parseHistoricalCsv(validCsv.replace("0.10", "NaN"), validMetadata);
  assert(!result.ok, "NaN must reject the dataset");
  assert(result.errors.some((error) => error.code === "invalid_number"), "NaN error code");
}

// Break caught: a -100% or worse asset return makes the real-return denominator unsafe.
{
  const result = parseHistoricalCsv(validCsv.replace("0.10", "-1"), validMetadata);
  assert(!result.ok, "-100% return must reject the dataset");
  assert(result.errors.some((error) => error.code === "return_floor"), "return floor error code");
}

// Break caught: metadata without a reproducible checksum or provenance could be presented as governed data.
{
  const result = parseHistoricalCsv(validCsv, {
    ...validMetadata,
    checksum: "",
    provenance: { source: "", retrievedAt: "" },
  });
  assert(!result.ok, "missing checksum and provenance must reject the dataset");
  assert(result.errors.some((error) => error.code === "missing_checksum"), "checksum error code");
  assert(result.errors.some((error) => error.code === "missing_provenance"), "provenance error code");
}

// Break caught: metadata claiming coverage different from the supplied series misstates its evidence base.
{
  const result = parseHistoricalCsv(validCsv, {
    ...validMetadata,
    coverage: { startYear: 1999, endYear: 2002, yearCount: 4 },
  });
  assert(!result.ok, "mismatched coverage must reject the dataset");
  assert(result.errors.some((error) => error.code === "metadata_coverage_mismatch"), "coverage error code");
}

const threeYear = parseHistoricalCsv(
  [
    "year,stock_return,bond_return,inflation",
    "2000,0.10,0.04,0.02",
    "2001,-0.20,0.03,0.03",
    "2002,0.08,0.02,0.01",
  ].join("\n"),
  validMetadata,
);
assert(threeYear.ok, "golden fixture must parse");

// Break caught: allocations outside the unit interval would create leveraged or negative-asset simulations.
{
  const result = runHistoricalScenarios({
    dataset: threeYear.dataset,
    startPortfolio: 1_000,
    annualWithdrawal: 100,
    stockAllocation: 1.01,
    horizonYears: 3,
    annualFee: 0.01,
  });
  assert(!result.ok, "out-of-range allocation must reject the entire simulation");
  assert(result.errors.some((error) => error.code === "invalid_stock_allocation"), "allocation error code");
}

// Break caught: nonpositive or too-long horizons would make cycle counts misleading or empty.
{
  const zero = runHistoricalScenarios({
    dataset: threeYear.dataset,
    startPortfolio: 1_000,
    annualWithdrawal: 100,
    stockAllocation: 0.6,
    horizonYears: 0,
    annualFee: 0.01,
  });
  const tooLong = runHistoricalScenarios({
    dataset: threeYear.dataset,
    startPortfolio: 1_000,
    annualWithdrawal: 100,
    stockAllocation: 0.6,
    horizonYears: 4,
    annualFee: 0.01,
  });
  assert(!zero.ok && zero.errors.some((error) => error.code === "invalid_horizon"), "zero horizon error");
  assert(!tooLong.ok && tooLong.errors.some((error) => error.code === "invalid_horizon"), "long horizon error");
}

// Break caught: applying nominal returns, end-of-year withdrawals, or omitting fees changes retirement outcomes.
{
  const result = runHistoricalScenarios({
    dataset: threeYear.dataset,
    startPortfolio: 1_000,
    annualWithdrawal: 100,
    stockAllocation: 0.6,
    horizonYears: 3,
    annualFee: 0.01,
  });
  assert(result.ok, "golden simulation must succeed");
  // Hand-derived: each year withdraws first; real weighted returns are 0.054901960784313794, -0.13398058252427184, and 0.045544554455445585; then multiply by 0.99 fee factor.
  assert(approx(result.cycles[0]!.realEndingValue, 641.8702889007538), `golden terminal ${result.cycles[0]!.realEndingValue}`);
  assert(result.methodologyVersion === "1.0.0", "methodology version");
  assert(result.withdrawalTiming === "beginning_of_year", "withdrawal timing");
  assert(result.cycleCount === 1 && result.successCount === 1, "cycle and success counts");
  assert(result.cycles[0]!.failureYearOffset === null, "completed cycle has no failure offset");
  assert(approx(result.cycles[0]!.maxDrawdown, 0.3581297110992462), "drawdown from starting peak");
}

// Break caught: stress that changes individual fields or retains chronological labels would fabricate a historical sequence.
{
  const stressed = applySequenceStress(threeYear.dataset.years, 2);
  assert(stressed.map((row) => row.year).join(",") === "2001,2002,2000", "worst rows move first as intact rows");
  assert(stressed[0]!.stockReturn === -0.2 && stressed[0]!.bondReturn === 0.03 && stressed[0]!.inflation === 0.03, "stress preserves an entire row");
  assert(stressed.map((row) => row.sequenceLabel).join(",") === "synthetic-sequence-1,synthetic-sequence-2,synthetic-sequence-3", "stress labels the synthetic order");
}

console.log("All historical-scenarios tests passed.");
