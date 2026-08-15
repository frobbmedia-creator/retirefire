import { realFromNominal } from "./calculations";
import { calculationVersion } from "./calculation-registry";

export type HistoricalYear = {
  year: number;
  stockReturn: number;
  bondReturn: number;
  inflation: number;
  /** Present only when rows have been deliberately reordered. */
  sequenceLabel?: string;
};

export type HistoricalDatasetMetadata = {
  checksum: string;
  provenance: {
    source: string;
    retrievedAt: string;
  };
  coverage: {
    startYear: number;
    endYear: number;
    yearCount: number;
  };
};

export type HistoricalDataset = {
  years: HistoricalYear[];
  metadata: HistoricalDatasetMetadata;
};

export type HistoricalValidationError = {
  code:
    | "invalid_header"
    | "invalid_row"
    | "invalid_number"
    | "duplicate_year"
    | "year_gap"
    | "return_floor"
    | "missing_checksum"
    | "missing_provenance"
    | "metadata_coverage_mismatch"
    | "invalid_stock_allocation"
    | "invalid_horizon"
    | "invalid_input";
  message: string;
  row?: number;
  field?: string;
};

export type HistoricalDatasetResult =
  | { ok: true; dataset: HistoricalDataset }
  | { ok: false; errors: HistoricalValidationError[] };

export type HistoricalScenarioInput = {
  dataset: HistoricalDataset;
  startPortfolio: number;
  annualWithdrawal: number;
  /** Fraction in stocks; the remainder is allocated to bonds. */
  stockAllocation: number;
  horizonYears: number;
  /** Annual percentage-of-assets fee, expressed as a decimal. */
  annualFee: number;
};

export type HistoricalCycleResult = {
  startYear: number;
  endYear: number;
  realEndingValue: number;
  maxDrawdown: number;
  failureYearOffset: number | null;
};

export type HistoricalScenarioResult =
  | {
      ok: true;
      methodologyVersion: string;
      withdrawalTiming: "beginning_of_year";
      cycleCount: number;
      successCount: number;
      cycles: HistoricalCycleResult[];
    }
  | { ok: false; errors: HistoricalValidationError[] };

const CSV_HEADER = "year,stock_return,bond_return,inflation";

function error(
  code: HistoricalValidationError["code"],
  message: string,
  row?: number,
  field?: string,
): HistoricalValidationError {
  return { code, message, ...(row === undefined ? {} : { row }), ...(field ? { field } : {}) };
}

function finiteNumber(value: string): number | null {
  const parsed = Number(value.trim());
  return value.trim() !== "" && Number.isFinite(parsed) ? parsed : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Validate the runtime dataset boundary shared by parsing and simulation. */
function validateHistoricalDataset(dataset: unknown): HistoricalValidationError[] {
  const errors: HistoricalValidationError[] = [];
  if (!isRecord(dataset)) {
    return [error("invalid_input", "dataset must be an object.", undefined, "dataset")];
  }

  const suppliedYears = dataset.years;
  if (!Array.isArray(suppliedYears)) {
    errors.push(error("invalid_input", "dataset.years must be an array.", undefined, "dataset.years"));
  }

  const validYears: HistoricalYear[] = [];
  const calendarYears: number[] = [];
  for (const [index, suppliedYear] of (Array.isArray(suppliedYears) ? suppliedYears : []).entries()) {
    const row = index + 1;
    if (!isRecord(suppliedYear)) {
      errors.push(error("invalid_row", "Each historical year must be an object.", row));
      continue;
    }
    const year = suppliedYear.year;
    const stockReturn = suppliedYear.stockReturn;
    const bondReturn = suppliedYear.bondReturn;
    const inflation = suppliedYear.inflation;
    const values = [
      ["year", year],
      ["stockReturn", stockReturn],
      ["bondReturn", bondReturn],
      ["inflation", inflation],
    ] as const;
    for (const [field, value] of values) {
      if (typeof value !== "number" || !Number.isFinite(value)) {
        errors.push(error("invalid_number", `${field} must be finite.`, row, field));
      }
    }
    if (typeof year === "number" && Number.isFinite(year) && Number.isInteger(year)) calendarYears.push(year);
    else if (typeof year === "number" && Number.isFinite(year)) errors.push(error("invalid_number", "year must be an integer.", row, "year"));
    if (
      typeof year !== "number" || !Number.isFinite(year) || !Number.isInteger(year) ||
      typeof stockReturn !== "number" || !Number.isFinite(stockReturn) ||
      typeof bondReturn !== "number" || !Number.isFinite(bondReturn) ||
      typeof inflation !== "number" || !Number.isFinite(inflation)
    ) continue;
    if (stockReturn <= -1 || bondReturn <= -1 || inflation <= -1) {
      errors.push(error("return_floor", "Returns and inflation must be greater than -100%.", row));
      continue;
    }
    validYears.push({ year, stockReturn, bondReturn, inflation });
  }

  const seen = new Set<number>();
  for (const year of calendarYears) {
    if (seen.has(year)) errors.push(error("duplicate_year", `Year ${year} appears more than once.`));
    seen.add(year);
  }
  const chronologicalCalendarYears = [...calendarYears].sort((a, b) => a - b);
  for (let index = 1; index < chronologicalCalendarYears.length; index++) {
    if (chronologicalCalendarYears[index]! !== chronologicalCalendarYears[index - 1]! + 1) {
      errors.push(error("year_gap", "Historical years must be contiguous."));
      break;
    }
  }

  const metadata = dataset.metadata;
  if (!isRecord(metadata)) {
    errors.push(error("invalid_input", "dataset.metadata must be an object.", undefined, "dataset.metadata"));
  }
  if (!isRecord(metadata) || typeof metadata.checksum !== "string" || !metadata.checksum.trim()) {
    errors.push(error("missing_checksum", "A dataset checksum is required."));
  }
  const provenance = isRecord(metadata) ? metadata.provenance : undefined;
  if (
    !isRecord(provenance) ||
    typeof provenance.source !== "string" || !provenance.source.trim() ||
    typeof provenance.retrievedAt !== "string" || !provenance.retrievedAt.trim()
  ) {
    errors.push(error("missing_provenance", "Dataset source and retrieval date are required."));
  }

  const chronological = [...validYears].sort((a, b) => a.year - b.year);
  const coverage = isRecord(metadata) && isRecord(metadata.coverage) ? metadata.coverage : undefined;
  if (
    !coverage ||
    coverage.startYear !== chronological[0]?.year ||
    coverage.endYear !== chronological[chronological.length - 1]?.year ||
    coverage.yearCount !== chronological.length
  ) {
    errors.push(error("metadata_coverage_mismatch", "Metadata coverage must exactly match the CSV series."));
  }

  return errors;
}

/**
 * Parse a strict, reproducible annual-return CSV. Invalid input always returns
 * errors only; callers never receive a partial historical series.
 */
export function parseHistoricalCsv(
  text: unknown,
  metadata: unknown,
): HistoricalDatasetResult {
  const errors: HistoricalValidationError[] = [];
  if (typeof text !== "string") {
    errors.push(error("invalid_input", "CSV text must be a string.", undefined, "text"));
    errors.push(...validateHistoricalDataset({ years: [], metadata }));
    return { ok: false, errors };
  }

  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines[0]?.trim() !== CSV_HEADER) {
    errors.push(error("invalid_header", `Expected CSV header: ${CSV_HEADER}.`, 1));
  }

  const years: HistoricalYear[] = [];
  for (let index = 1; index < lines.length; index++) {
    const rowNumber = index + 1;
    const cells = lines[index]!.split(",");
    if (cells.length !== 4) {
      errors.push(error("invalid_row", "Each CSV row must contain four fields.", rowNumber));
      continue;
    }

    const year = finiteNumber(cells[0]!);
    const stockReturn = finiteNumber(cells[1]!);
    const bondReturn = finiteNumber(cells[2]!);
    const inflation = finiteNumber(cells[3]!);
    const values = [
      ["year", year],
      ["stock_return", stockReturn],
      ["bond_return", bondReturn],
      ["inflation", inflation],
    ] as const;
    for (const [field, value] of values) {
      if (value === null) errors.push(error("invalid_number", `${field} must be finite.`, rowNumber, field));
    }
    if (year === null || stockReturn === null || bondReturn === null || inflation === null) continue;
    if (!Number.isInteger(year)) {
      errors.push(error("invalid_number", "year must be an integer.", rowNumber, "year"));
      continue;
    }
    if (stockReturn <= -1 || bondReturn <= -1 || inflation <= -1) {
      errors.push(error("return_floor", "Returns and inflation must be greater than -100%.", rowNumber));
      continue;
    }
    years.push({ year, stockReturn, bondReturn, inflation });
  }

  if (years.length === 0) errors.push(error("invalid_row", "CSV must contain at least one valid annual row."));
  errors.push(...validateHistoricalDataset({ years, metadata }));

  if (errors.length > 0) return { ok: false, errors };
  return {
    ok: true,
    dataset: { years: [...years].sort((a, b) => a.year - b.year), metadata: metadata as HistoricalDatasetMetadata },
  };
}

function validateScenarioInput(input: unknown): HistoricalValidationError[] {
  const errors: HistoricalValidationError[] = [];
  if (!isRecord(input)) return [error("invalid_input", "scenario input must be an object.")];
  const stockAllocation = input.stockAllocation;
  const horizonYears = input.horizonYears;
  const annualFee = input.annualFee;
  if (typeof stockAllocation !== "number" || !Number.isFinite(stockAllocation) || stockAllocation < 0 || stockAllocation > 1) {
    errors.push(error("invalid_stock_allocation", "stockAllocation must be between 0 and 1."));
  }
  if (
    typeof horizonYears !== "number" ||
    !Number.isInteger(horizonYears) ||
    horizonYears < 1 ||
    horizonYears > (isRecord(input.dataset) && Array.isArray(input.dataset.years) ? input.dataset.years.length : 0)
  ) {
    errors.push(error("invalid_horizon", "horizonYears must be a whole number within the dataset coverage."));
  }
  const finiteNonNegative = [
    ["startPortfolio", input.startPortfolio],
    ["annualWithdrawal", input.annualWithdrawal],
    ["annualFee", input.annualFee],
  ] as const;
  for (const [field, value] of finiteNonNegative) {
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
      errors.push(error("invalid_input", `${field} must be finite and non-negative.`, undefined, field));
    }
  }
  if (typeof annualFee === "number" && Number.isFinite(annualFee) && annualFee >= 1) {
    errors.push(error("invalid_input", "annualFee must be less than 1.", undefined, "annualFee"));
  }
  return errors;
}

/** Run every contiguous historical window of the selected retirement horizon. */
export function runHistoricalScenarios(input: unknown): HistoricalScenarioResult {
  const errors = [
    ...validateScenarioInput(input),
    ...(isRecord(input) ? validateHistoricalDataset(input.dataset) : []),
  ];
  if (errors.length > 0) return { ok: false, errors };

  const scenario = input as HistoricalScenarioInput;

  const cycles: HistoricalCycleResult[] = [];
  const bondAllocation = 1 - scenario.stockAllocation;
  for (let start = 0; start <= scenario.dataset.years.length - scenario.horizonYears; start++) {
    const cycle = scenario.dataset.years.slice(start, start + scenario.horizonYears);
    let balance = scenario.startPortfolio;
    let peak = balance;
    let maxDrawdown = 0;
    let failureYearOffset: number | null = null;

    for (let offset = 0; offset < cycle.length; offset++) {
      if (balance < scenario.annualWithdrawal) {
        balance = 0;
        maxDrawdown = 1;
        failureYearOffset = offset;
        break;
      }
      balance -= scenario.annualWithdrawal;
      const year = cycle[offset]!;
      const realReturn =
        scenario.stockAllocation * realFromNominal(year.stockReturn, year.inflation) +
        bondAllocation * realFromNominal(year.bondReturn, year.inflation);
      balance *= (1 + realReturn) * (1 - scenario.annualFee);
      peak = Math.max(peak, balance);
      maxDrawdown = Math.max(maxDrawdown, peak === 0 ? 0 : (peak - balance) / peak);
    }

    cycles.push({
      startYear: cycle[0]!.year,
      endYear: cycle[cycle.length - 1]!.year,
      realEndingValue: balance,
      maxDrawdown,
      failureYearOffset,
    });
  }

  return {
    ok: true,
    methodologyVersion: calculationVersion("historical-scenarios"),
    withdrawalTiming: "beginning_of_year",
    cycleCount: cycles.length,
    successCount: cycles.filter((cycle) => cycle.failureYearOffset === null).length,
    cycles,
  };
}

/**
 * Move the requested number of weakest whole-year stock/bond rows to the front.
 * The result is explicitly labeled as synthetic rather than chronological history.
 */
export function applySequenceStress(cycle: HistoricalYear[], count: number): HistoricalYear[] {
  const moveCount = Math.max(0, Math.min(cycle.length, Math.floor(count)));
  const weakestIndexes = new Set(
    cycle
      .map((year, index) => ({ index, score: year.stockReturn + year.bondReturn }))
      .sort((a, b) => a.score - b.score || a.index - b.index)
      .slice(0, moveCount)
      .map(({ index }) => index),
  );
  const ordered = [
    ...cycle.filter((_, index) => weakestIndexes.has(index)),
    ...cycle.filter((_, index) => !weakestIndexes.has(index)),
  ];
  return ordered.map((year, index) => ({ ...year, sequenceLabel: `synthetic-sequence-${index + 1}` }));
}
