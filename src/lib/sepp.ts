import {
  getSeppMaximumRate,
  type SeppRateResult,
} from "./sepp-rates";

export const SEPP_EXTERNAL_REVIEW_STATUS = "pending" as const;

export const SEPP_SOURCES = Object.freeze({
  notice: Object.freeze({
    title: "Notice 2022-6",
    url: "https://www.irs.gov/pub/irs-drop/n-22-06.pdf",
    effectiveDate:
      "Required for series commencing on or after 2023-01-01; optional for series commencing during 2022",
  }),
  faq: Object.freeze({
    title: "Substantially equal periodic payments",
    url: "https://www.irs.gov/retirement-plans/substantially-equal-periodic-payments",
    effectiveDate: "Current IRS explanatory guidance reviewed 2026-08-15",
  }),
  singleLife: Object.freeze({
    title: "Publication 590-B (2025), Appendix B, Table I",
    url: "https://www.irs.gov/publications/p590b",
    effectiveDate:
      "Life-expectancy table effective for distribution calendar years beginning on or after 2022-01-01",
  }),
  regulation: Object.freeze({
    title: "T.D. 9930, 2020-49 I.R.B. 1400",
    url: "https://www.irs.gov/irb/2020-49_IRB",
    effectiveDate:
      "Life-expectancy and distribution-period tables apply beginning 2022-01-01",
  }),
});

/** §1.401(a)(9)-9(b), cross-checked against Publication 590-B (2025). */
export const SINGLE_LIFE_EXPECTANCY = Object.freeze([
  84.6, 83.7, 82.8, 81.8, 80.8, 79.8, 78.8, 77.9, 76.9, 75.9,
  74.9, 73.9, 72.9, 71.9, 70.9, 69.9, 69.0, 68.0, 67.0, 66.0,
  65.0, 64.1, 63.1, 62.1, 61.1, 60.2, 59.2, 58.2, 57.3, 56.3,
  55.3, 54.4, 53.4, 52.5, 51.5, 50.5, 49.6, 48.6, 47.7, 46.7,
  45.7, 44.8, 43.8, 42.9, 41.9, 41.0, 40.0, 39.0, 38.1, 37.1,
  36.2, 35.3, 34.3, 33.4, 32.5, 31.6, 30.6, 29.8, 28.9, 28.0,
  27.1, 26.2, 25.4, 24.5, 23.7, 22.9, 22.0, 21.2, 20.4, 19.6,
  18.8, 18.0, 17.2, 16.4, 15.6, 14.8, 14.1, 13.3, 12.6, 11.9,
  11.2, 10.5, 9.9, 9.3, 8.7, 8.1, 7.6, 7.1, 6.6, 6.1,
  5.7, 5.3, 4.9, 4.6, 4.3, 4.0, 3.7, 3.4, 3.2, 3.0,
  2.8, 2.6, 2.5, 2.3, 2.2, 2.1, 2.1, 2.1, 2.0, 2.0,
  2.0, 2.0, 2.0, 1.9, 1.9, 1.8, 1.8, 1.6, 1.4, 1.1,
  1.0,
] as const);

/** Notice 2022-6 Appendix A, indexed from age 10 through age 120+. */
export const UNIFORM_LIFETIME_EXPECTANCY = Object.freeze([
  88.2, 87.2, 86.2, 85.2, 84.2, 83.2, 82.2, 81.2, 80.2, 79.2,
  78.2, 77.2, 76.2, 75.2, 74.2, 73.3, 72.3, 71.3, 70.3, 69.3,
  68.3, 67.3, 66.3, 65.3, 64.3, 63.3, 62.3, 61.3, 60.3, 59.4,
  58.4, 57.4, 56.4, 55.4, 54.4, 53.4, 52.4, 51.5, 50.5, 49.5,
  48.5, 47.5, 46.5, 45.6, 44.6, 43.6, 42.6, 41.6, 40.7, 39.7,
  38.7, 37.7, 36.8, 35.8, 34.9, 33.9, 33.0, 32.0, 31.1, 30.1,
  29.2, 28.3, 27.4, 26.5, 25.5, 24.6, 23.7, 22.9, 22.0, 21.1,
  20.2, 19.4, 18.5, 17.7, 16.8, 16.0, 15.2, 14.4, 13.7, 12.9,
  12.2, 11.5, 10.8, 10.1, 9.5, 8.9, 8.4, 7.8, 7.3, 6.8,
  6.4, 6.0, 5.6, 5.2, 4.9, 4.6, 4.3, 4.1, 3.9, 3.7,
  3.5, 3.4, 3.3, 3.1, 3.0, 2.9, 2.8, 2.7, 2.5, 2.3,
  2.0,
] as const);

export const SEPP_TABLE_INTEGRITY = Object.freeze({
  singleLife: Object.freeze({
    firstAge: 0,
    lastAge: 120,
    entryCount: SINGLE_LIFE_EXPECTANCY.length,
    checksumTenths: SINGLE_LIFE_EXPECTANCY.reduce(
      (total, value) => total + Math.round(value * 10),
      0,
    ),
  }),
  uniformLifetime: Object.freeze({
    firstAge: 10,
    lastAge: 120,
    entryCount: UNIFORM_LIFETIME_EXPECTANCY.length,
    checksumTenths: UNIFORM_LIFETIME_EXPECTANCY.reduce(
      (total, value) => total + Math.round(value * 10),
      0,
    ),
  }),
  jointAndLastSurvivor: Object.freeze({ available: false, entryCount: 0 }),
  mortality: Object.freeze({ available: false, entryCount: 0 }),
});

export type SeppMethod =
  | "required-minimum-distribution"
  | "fixed-amortization"
  | "fixed-annuitization";

export type SeppLifeExpectancyTable =
  | "single-life"
  | "uniform-lifetime"
  | "joint-and-last-survivor";

export type SeppCalculationInput = Readonly<{
  method: SeppMethod;
  accountBalance: number;
  birthDate: string;
  firstDistributionDate: string;
  lifeExpectancyTable: SeppLifeExpectancyTable;
  beneficiaryBirthDate?: string | null;
  interestRate?: number | null;
}>;

type NormalizedSeppInput = Readonly<{
  method: SeppMethod;
  accountBalance: number;
  birthDate: string;
  firstDistributionDate: string;
  lifeExpectancyTable: SeppLifeExpectancyTable;
  beneficiaryBirthDate: string | null;
  interestRate: number | null;
}>;

export type SeppSourceReference = Readonly<{
  title: string;
  url: string;
  effectiveDate: string;
}>;

type SeppGovernance = Readonly<{
  methodVersion: "0.1.0";
  externalReviewStatus: typeof SEPP_EXTERNAL_REVIEW_STATUS;
  actionable: false;
  sources: readonly SeppSourceReference[];
  warnings: readonly string[];
}>;

export type SeppCalculationResult =
  | (SeppGovernance &
      Readonly<{
        ok: false;
        errors: readonly string[];
      }>)
  | (SeppGovernance &
      Readonly<{
        ok: true;
        inputs: NormalizedSeppInput;
        attainedAge: number;
        method: "required-minimum-distribution" | "fixed-amortization";
        methodFactor: number;
        annualPayment: number;
        interestRate: number | null;
        maximumInterestRate: number | null;
        rateSelection: SeppRateResult | null;
        modificationEndDate: string;
        mortalityTableUsed: false;
      }>);

const METHOD_VALUES = new Set<string>([
  "required-minimum-distribution",
  "fixed-amortization",
  "fixed-annuitization",
]);
const TABLE_VALUES = new Set<string>([
  "single-life",
  "uniform-lifetime",
  "joint-and-last-survivor",
]);
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MAX_SAFE_CURRENCY = Number.MAX_SAFE_INTEGER / 100;

const BASE_WARNINGS = Object.freeze([
  "This internal calculation is non-actionable until external professional review is complete",
  "A SoSEPP applies to one account; do not combine balances or payments across accounts",
  "Modifying payments or the account before the protected period ends can trigger recapture tax plus interest",
] as const);

function failure(errors: readonly string[]): SeppCalculationResult {
  return {
    ok: false,
    errors,
    methodVersion: "0.1.0",
    externalReviewStatus: SEPP_EXTERNAL_REVIEW_STATUS,
    actionable: false,
    sources: [SEPP_SOURCES.notice, SEPP_SOURCES.faq],
    warnings: BASE_WARNINGS,
  };
}

function parseIsoDate(value: unknown): Date | null {
  if (typeof value !== "string" || !ISO_DATE_PATTERN.test(value)) return null;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.valueOf())) return null;
  return parsed.toISOString().slice(0, 10) === value ? parsed : null;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addCalendarYearsAndMonths(date: Date, years: number, months: number): Date {
  const absoluteMonth = date.getUTCMonth() + months;
  const targetYear = date.getUTCFullYear() + years + Math.floor(absoluteMonth / 12);
  const targetMonth = ((absoluteMonth % 12) + 12) % 12;
  const lastDay = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
  return new Date(
    Date.UTC(targetYear, targetMonth, Math.min(date.getUTCDate(), lastDay)),
  );
}

function lifeExpectancyFactor(
  table: SeppLifeExpectancyTable,
  attainedAge: number,
): number | null {
  const cappedAge = Math.min(attainedAge, 120);
  if (table === "single-life" && attainedAge >= 0) {
    return SINGLE_LIFE_EXPECTANCY[cappedAge] ?? null;
  }
  if (table === "uniform-lifetime" && attainedAge >= 10) {
    return UNIFORM_LIFETIME_EXPECTANCY[cappedAge - 10] ?? null;
  }
  return null;
}

function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Calculate a governed Notice 2022-6 RMD or fixed-amortization amount.
 * Fixed annuitization is deliberately unavailable until the governing
 * mortality table has an independently verified transcription.
 */
export function calculateSepp(input: SeppCalculationInput): SeppCalculationResult {
  const candidate = input as Partial<SeppCalculationInput> | null | undefined;
  if (!candidate || typeof candidate !== "object") {
    return failure(["input must be an object"]);
  }

  const errors: string[] = [];
  const method = candidate.method;
  const table = candidate.lifeExpectancyTable;
  const birthDate = parseIsoDate(candidate.birthDate);
  const firstDistributionDate = parseIsoDate(candidate.firstDistributionDate);

  if (typeof method !== "string" || !METHOD_VALUES.has(method)) {
    errors.push("method is unsupported");
  }
  if (!Number.isFinite(candidate.accountBalance) || (candidate.accountBalance ?? 0) <= 0) {
    errors.push("accountBalance must be finite and greater than zero");
  } else if ((candidate.accountBalance as number) > MAX_SAFE_CURRENCY) {
    errors.push(`accountBalance must not exceed ${MAX_SAFE_CURRENCY}`);
  }
  if (!birthDate) errors.push("birthDate must be a valid YYYY-MM-DD calendar date");
  if (!firstDistributionDate) {
    errors.push("firstDistributionDate must be a valid YYYY-MM-DD calendar date");
  }
  if (typeof table !== "string" || !TABLE_VALUES.has(table)) {
    errors.push("unsupported lifeExpectancyTable");
  }

  const beneficiaryBirthDate =
    candidate.beneficiaryBirthDate == null
      ? null
      : parseIsoDate(candidate.beneficiaryBirthDate);
  if (
    candidate.beneficiaryBirthDate != null &&
    !beneficiaryBirthDate
  ) {
    errors.push("beneficiaryBirthDate must be a valid YYYY-MM-DD calendar date");
  }
  if (table === "joint-and-last-survivor" && candidate.beneficiaryBirthDate == null) {
    errors.push(
      "beneficiaryBirthDate is required for the Joint and Last Survivor Table",
    );
  }
  if (table === "joint-and-last-survivor") {
    errors.push(
      "Joint and Last Survivor Table is unavailable pending authoritative transcription and external review",
    );
  }

  if (birthDate && firstDistributionDate && birthDate > firstDistributionDate) {
    errors.push("birthDate must not be after firstDistributionDate");
  }

  const isFixed = method === "fixed-amortization" || method === "fixed-annuitization";
  if (isFixed) {
    if (candidate.interestRate == null) {
      errors.push("interestRate is required for fixed methods");
    } else if (
      !Number.isFinite(candidate.interestRate) ||
      (candidate.interestRate as number) < 0
    ) {
      errors.push("interestRate must be finite and non-negative");
    }
  } else if (
    candidate.interestRate != null &&
    (!Number.isFinite(candidate.interestRate) || candidate.interestRate < 0)
  ) {
    errors.push("interestRate must be finite and non-negative when provided");
  }

  let rateSelection: SeppRateResult | null = null;
  if (isFixed && firstDistributionDate) {
    rateSelection = getSeppMaximumRate(formatDate(firstDistributionDate).slice(0, 7));
    if (!rateSelection.ok) {
      errors.push(...rateSelection.errors);
    } else if (
      candidate.interestRate != null &&
      Number.isFinite(candidate.interestRate) &&
      candidate.interestRate > rateSelection.maximumAnnualRate
    ) {
      errors.push(
        `interestRate exceeds the permitted maximum of ${rateSelection.maximumAnnualRate}`,
      );
    }
  }

  if (method === "fixed-annuitization") {
    errors.push(
      "authoritative §1.401(a)(9)-9(e) mortality table is unavailable pending reproducible transcription and independent verification",
    );
  }

  if (errors.length > 0 || !birthDate || !firstDistributionDate) {
    return failure(errors);
  }

  const attainedAge =
    firstDistributionDate.getUTCFullYear() - birthDate.getUTCFullYear();
  const factor = lifeExpectancyFactor(
    table as SeppLifeExpectancyTable,
    attainedAge,
  );
  if (factor == null) {
    return failure([
      `${table} has no verified life-expectancy factor for attained age ${attainedAge}`,
    ]);
  }

  const normalizedInterestRate = isFixed
    ? (candidate.interestRate as number)
    : null;
  let methodFactor = factor;
  if (method === "fixed-amortization") {
    const amortizationRate = candidate.interestRate as number;
    methodFactor =
      amortizationRate === 0
        ? factor
        : (1 - Math.pow(1 + amortizationRate, -factor)) /
          amortizationRate;
  }
  const unroundedPayment = (candidate.accountBalance as number) / methodFactor;
  const annualPayment = roundCurrency(unroundedPayment);
  if (
    !Number.isFinite(methodFactor) ||
    methodFactor <= 0 ||
    !Number.isFinite(annualPayment) ||
    annualPayment > MAX_SAFE_CURRENCY
  ) {
    return failure(["calculation result exceeds the supported numeric domain"]);
  }

  const fiveYearAnniversary = addCalendarYearsAndMonths(
    firstDistributionDate,
    5,
    0,
  );
  const ageFiftyNineAndHalf = addCalendarYearsAndMonths(birthDate, 59, 6);
  const modificationEndDate = formatDate(
    fiveYearAnniversary > ageFiftyNineAndHalf
      ? fiveYearAnniversary
      : ageFiftyNineAndHalf,
  );
  const tableSource =
    table === "single-life" ? SEPP_SOURCES.singleLife : SEPP_SOURCES.notice;
  const maximumInterestRate =
    rateSelection?.ok === true ? rateSelection.maximumAnnualRate : null;

  return {
    ok: true,
    methodVersion: "0.1.0",
    externalReviewStatus: SEPP_EXTERNAL_REVIEW_STATUS,
    actionable: false,
    sources: [SEPP_SOURCES.notice, SEPP_SOURCES.faq, tableSource],
    warnings: [
      ...BASE_WARNINGS,
      method === "required-minimum-distribution"
        ? "The account balance, table factor, and payment must be redetermined each distribution year using the same table"
        : "The fixed-amortization annual amount remains level in succeeding distribution years",
    ],
    inputs: {
      method: method as "required-minimum-distribution" | "fixed-amortization",
      accountBalance: candidate.accountBalance as number,
      birthDate: candidate.birthDate as string,
      firstDistributionDate: candidate.firstDistributionDate as string,
      lifeExpectancyTable: table as SeppLifeExpectancyTable,
      beneficiaryBirthDate:
        candidate.beneficiaryBirthDate == null
          ? null
          : (candidate.beneficiaryBirthDate as string),
      interestRate: normalizedInterestRate,
    },
    attainedAge,
    method: method as "required-minimum-distribution" | "fixed-amortization",
    methodFactor,
    annualPayment,
    interestRate: normalizedInterestRate,
    maximumInterestRate,
    rateSelection,
    modificationEndDate,
    mortalityTableUsed: false,
  };
}
