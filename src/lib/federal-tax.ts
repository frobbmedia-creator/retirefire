export const FEDERAL_TAX_EXCLUSIONS = [
  "State and local income taxes",
  "Alternative minimum tax and net investment income tax",
  "Tax credits and changes to deductions",
  "Capital gains and qualified-dividend interactions",
  "ACA premium tax credits and Medicare IRMAA",
  "Future tax-law changes and multiyear optimization",
  "Withholding, estimated-tax penalties, and conversion opportunity cost",
] as const;

const JOINT_BRACKETS = [
  { upTo: 24_800, rate: 0.1 },
  { upTo: 100_800, rate: 0.12 },
  { upTo: 211_400, rate: 0.22 },
  { upTo: 403_550, rate: 0.24 },
  { upTo: 512_450, rate: 0.32 },
  { upTo: 768_700, rate: 0.35 },
  { upTo: null, rate: 0.37 },
] as const;

const SINGLE_BRACKETS = [
  { upTo: 12_400, rate: 0.1 },
  { upTo: 50_400, rate: 0.12 },
  { upTo: 105_700, rate: 0.22 },
  { upTo: 201_775, rate: 0.24 },
  { upTo: 256_225, rate: 0.32 },
  { upTo: 640_600, rate: 0.35 },
  { upTo: null, rate: 0.37 },
] as const;

function deepFreeze<T extends object>(value: T): T {
  Object.freeze(value);
  for (const nested of Object.values(value)) {
    if (nested !== null && typeof nested === "object" && !Object.isFrozen(nested)) {
      deepFreeze(nested);
    }
  }
  return value;
}

/**
 * Tax-year 2026 ordinary-income parameters from Revenue Procedure 2025-32.
 *
 * Primary source title: Revenue Procedure 2025-32
 * Primary source URL: https://www.irs.gov/pub/irs-drop/rp-25-32.pdf
 * Bulletin title: Internal Revenue Bulletin: 2025-45
 * Bulletin URL: https://www.irs.gov/irb/2025-45_IRB
 * IRS announcement title: IRS releases tax inflation adjustments for tax year
 * 2026, including amendments from the One, Big, Beautiful Bill
 * Announcement URL: https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill
 * Source published/as-of date: 2025-10-09
 * Effective period: taxable years beginning in 2026 (effective 2026-01-01).
 */
export const FEDERAL_TAX_PARAMETERS = deepFreeze({
  taxYear: 2026,
  effectiveDate: "2026-01-01",
  sourceAsOfDate: "2025-10-09",
  lastVerifiedDate: "2026-08-15",
  sourceTitle: "Revenue Procedure 2025-32",
  sourceUrl: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf",
  bulletinTitle: "Internal Revenue Bulletin: 2025-45",
  bulletinUrl: "https://www.irs.gov/irb/2025-45_IRB",
  announcementTitle:
    "IRS releases tax inflation adjustments for tax year 2026, including amendments from the One, Big, Beautiful Bill",
  announcementUrl:
    "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill",
  standardDeductionAdjustments: {
    dependentMinimum: 1_350,
    dependentEarnedIncomeIncrement: 450,
    agedOrBlind: 1_650,
    agedOrBlindUnmarriedAndNotSurvivingSpouse: 2_050,
  },
  filingStatuses: {
    single: {
      label: "Single",
      standardDeduction: 16_100,
      brackets: SINGLE_BRACKETS,
    },
    married_filing_jointly: {
      label: "Married filing jointly",
      standardDeduction: 32_200,
      brackets: JOINT_BRACKETS,
    },
    qualifying_surviving_spouse: {
      label: "Qualifying surviving spouse",
      standardDeduction: 32_200,
      brackets: JOINT_BRACKETS,
    },
    married_filing_separately: {
      label: "Married filing separately",
      standardDeduction: 16_100,
      brackets: [
        { upTo: 12_400, rate: 0.1 },
        { upTo: 50_400, rate: 0.12 },
        { upTo: 105_700, rate: 0.22 },
        { upTo: 201_775, rate: 0.24 },
        { upTo: 256_225, rate: 0.32 },
        { upTo: 384_350, rate: 0.35 },
        { upTo: null, rate: 0.37 },
      ],
    },
    head_of_household: {
      label: "Head of household",
      standardDeduction: 24_150,
      brackets: [
        { upTo: 17_700, rate: 0.1 },
        { upTo: 67_450, rate: 0.12 },
        { upTo: 105_700, rate: 0.22 },
        { upTo: 201_750, rate: 0.24 },
        { upTo: 256_200, rate: 0.32 },
        { upTo: 640_600, rate: 0.35 },
        { upTo: null, rate: 0.37 },
      ],
    },
  },
} as const);

export type FederalTaxFilingStatus = keyof typeof FEDERAL_TAX_PARAMETERS.filingStatuses;

export type FederalTaxInput = {
  taxYear: number;
  filingStatus: FederalTaxFilingStatus;
  /** Federal taxable income after deductions, before the proposed conversion. */
  currentTaxableIncome: number;
  desiredConversion: number;
  traditionalBalance: number;
};

export type FederalTaxEstimate =
  | {
      ok: false;
      errors: string[];
      exclusions: typeof FEDERAL_TAX_EXCLUSIONS;
    }
  | {
      ok: true;
      taxYear: 2026;
      filingStatus: FederalTaxFilingStatus;
      standardDeduction: number;
      taxableIncomeBeforeConversion: number;
      taxableIncomeAfterConversion: number;
      desiredConversion: number;
      appliedConversion: number;
      conversionWasLimited: boolean;
      federalTaxBeforeConversion: number;
      federalTaxAfterConversion: number;
      incrementalFederalTax: number;
      effectiveFederalRateOnConversion: number;
      remainingTraditionalBalance: number;
      exclusions: typeof FEDERAL_TAX_EXCLUSIONS;
    };

type Bracket = Readonly<{ upTo: number | null; rate: number }>;

function progressiveTax(taxableIncome: number, brackets: readonly Bracket[]): number {
  let tax = 0;
  let lowerBound = 0;

  for (const bracket of brackets) {
    const upperBound = bracket.upTo ?? Number.POSITIVE_INFINITY;
    const incomeInBracket = Math.min(taxableIncome, upperBound) - lowerBound;
    if (incomeInBracket <= 0) break;
    tax += incomeInBracket * bracket.rate;
    if (taxableIncome <= upperBound) break;
    lowerBound = upperBound;
  }

  return Math.round(tax * 100) / 100;
}

function isFiniteNonNegative(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

/** Estimate 2026 regular federal income tax before and after one Roth conversion. */
export function estimateFederalIncomeTax(input: FederalTaxInput): FederalTaxEstimate {
  const candidate = input as Partial<FederalTaxInput> | null | undefined;
  const errors: string[] = [];

  if (!candidate || typeof candidate !== "object") {
    return {
      ok: false,
      errors: ["input must be an object"],
      exclusions: FEDERAL_TAX_EXCLUSIONS,
    };
  }
  if (candidate.taxYear !== FEDERAL_TAX_PARAMETERS.taxYear) {
    errors.push("taxYear must be 2026");
  }
  if (
    typeof candidate.filingStatus !== "string" ||
    !(candidate.filingStatus in FEDERAL_TAX_PARAMETERS.filingStatuses)
  ) {
    errors.push("filingStatus must be a supported 2026 filing status");
  }
  for (const field of [
    "currentTaxableIncome",
    "desiredConversion",
    "traditionalBalance",
  ] as const) {
    if (!isFiniteNonNegative(candidate[field])) {
      errors.push(`${field} must be finite and non-negative`);
    }
  }
  if (errors.length > 0) {
    return { ok: false, errors, exclusions: FEDERAL_TAX_EXCLUSIONS };
  }

  const filingStatus = candidate.filingStatus as FederalTaxFilingStatus;
  const currentTaxableIncome = candidate.currentTaxableIncome as number;
  const desiredConversion = candidate.desiredConversion as number;
  const traditionalBalance = candidate.traditionalBalance as number;
  const statusParameters = FEDERAL_TAX_PARAMETERS.filingStatuses[filingStatus];
  const appliedConversion = Math.min(desiredConversion, traditionalBalance);
  const taxableIncomeAfterConversion = currentTaxableIncome + appliedConversion;
  if (!Number.isFinite(taxableIncomeAfterConversion)) {
    return {
      ok: false,
      errors: ["currentTaxableIncome plus appliedConversion must be finite"],
      exclusions: FEDERAL_TAX_EXCLUSIONS,
    };
  }
  const federalTaxBeforeConversion = progressiveTax(
    currentTaxableIncome,
    statusParameters.brackets,
  );
  const federalTaxAfterConversion = progressiveTax(
    taxableIncomeAfterConversion,
    statusParameters.brackets,
  );
  const incrementalFederalTax =
    Math.round((federalTaxAfterConversion - federalTaxBeforeConversion) * 100) / 100;

  return {
    ok: true,
    taxYear: 2026,
    filingStatus,
    standardDeduction: statusParameters.standardDeduction,
    taxableIncomeBeforeConversion: currentTaxableIncome,
    taxableIncomeAfterConversion,
    desiredConversion,
    appliedConversion,
    conversionWasLimited: desiredConversion > traditionalBalance,
    federalTaxBeforeConversion,
    federalTaxAfterConversion,
    incrementalFederalTax,
    effectiveFederalRateOnConversion:
      appliedConversion === 0 ? 0 : incrementalFederalTax / appliedConversion,
    remainingTraditionalBalance: traditionalBalance - appliedConversion,
    exclusions: FEDERAL_TAX_EXCLUSIONS,
  };
}
