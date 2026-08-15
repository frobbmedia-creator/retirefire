export const SOCIAL_SECURITY_ESTIMATE_EXCLUSIONS = Object.freeze([
  "The worker's earnings record, eligibility, and primary insurance amount; enter the worker's own SSA full-retirement-age estimate",
  "Cost-of-living adjustments and future changes to Social Security law",
  "Spousal, survivor, disability, dependent, and family-maximum benefits",
  "The retirement earnings test, benefit withholding, recomputation, and taxes",
  "SSA payment timing, including delayed credits that may not appear until the following January",
  "Birthday-day rules; the birth year input must already use SSA's prior-year rule for a January 1 birthday",
] as const);

export const TAXABLE_SOCIAL_SECURITY_EXCLUSIONS = Object.freeze([
  "Lump-sum elections and railroad-specific treatment",
  "Ordinary benefit repayments and Form SSA-1099/RRB-1099 net box 5 handling; the model uses the entered gross annual benefit",
  "Foreign-income, adoption-benefit, savings-bond, and other special worksheet adjustments",
  "Deductions or income not already reflected in the entered other-income amount",
  "State and local tax and total federal income tax liability",
  "Tax years other than 2025 and future changes to federal law or IRS forms",
] as const);

type FullRetirementAge = Readonly<{ years: number; months: number }>;

type DelayedCreditRate = Readonly<{
  minimumBirthYear: number;
  maximumBirthYear: number | null;
  annualRate: number;
  monthlyNumerator: number;
  monthlyDenominator: number;
}>;

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
 * Current-law retired-worker claim-age adjustment parameters.
 *
 * Primary source title: Benefit Reduction for Early Retirement
 * URL: https://www.ssa.gov/oact/quickcalc/earlyretire.html
 * Primary source title: Delayed Retirement Credits
 * URL: https://www.ssa.gov/benefits/retirement/planner/delayret.html
 * Corroborating source title: Annual Statistical Supplement, 2025 — Appendix C
 * URL: https://www.ssa.gov/policy/docs/statcomps/supplement/2025/apnc.html
 * Source dates: SSA benefit pages are undated; Appendix C is the 2025 edition.
 * Effective period: historical FRA/credit schedule and current-law worker rules,
 * reviewed 2026-08-15. SSA guidance says to use the prior birth year for a
 * January 1 birthday; callers must make that adjustment before calling.
 */
export const SOCIAL_SECURITY_CLAIM_PARAMETERS = deepFreeze({
  methodVersion: "1.0.1",
  minimumSupportedBirthYear: 1933,
  earliestClaimAgeMonths: 62 * 12,
  latestClaimAgeMonths: 70 * 12,
  lastVerifiedDate: "2026-08-15",
  effectivePeriod:
    "Current-law retired-worker claim-age adjustment rules reviewed 2026-08-15",
  earlyRetirementSourceTitle: "Benefit Reduction for Early Retirement",
  earlyRetirementSourceUrl:
    "https://www.ssa.gov/oact/quickcalc/earlyretire.html",
  delayedCreditSourceTitle: "Delayed Retirement Credits",
  delayedCreditSourceUrl:
    "https://www.ssa.gov/benefits/retirement/planner/delayret.html",
  goldenExampleSourceTitle:
    "Annual Statistical Supplement, 2025 — Appendix C: Computing a Retired-Worker Benefit",
  goldenExampleSourceUrl:
    "https://www.ssa.gov/policy/docs/statcomps/supplement/2025/apnc.html",
  delayedCreditRates: [
    {
      minimumBirthYear: 1933,
      maximumBirthYear: 1934,
      annualRate: 0.055,
      monthlyNumerator: 11,
      monthlyDenominator: 2_400,
    },
    {
      minimumBirthYear: 1935,
      maximumBirthYear: 1936,
      annualRate: 0.06,
      monthlyNumerator: 1,
      monthlyDenominator: 200,
    },
    {
      minimumBirthYear: 1937,
      maximumBirthYear: 1938,
      annualRate: 0.065,
      monthlyNumerator: 13,
      monthlyDenominator: 2_400,
    },
    {
      minimumBirthYear: 1939,
      maximumBirthYear: 1940,
      annualRate: 0.07,
      monthlyNumerator: 7,
      monthlyDenominator: 1_200,
    },
    {
      minimumBirthYear: 1941,
      maximumBirthYear: 1942,
      annualRate: 0.075,
      monthlyNumerator: 1,
      monthlyDenominator: 160,
    },
    {
      minimumBirthYear: 1943,
      maximumBirthYear: null,
      annualRate: 0.08,
      monthlyNumerator: 1,
      monthlyDenominator: 150,
    },
  ] satisfies readonly DelayedCreditRate[],
} as const);

export type SocialSecurityClaimInput = {
  /** SSA-effective birth year. Use the prior year for a January 1 birthday. */
  birthYear: number;
  /** Worker's monthly retirement estimate at full retirement age. */
  fullRetirementAgeMonthlyBenefit: number;
  claimAgeYears: number;
  claimAgeMonths: number;
};

export type SocialSecurityEstimate =
  | {
      ok: false;
      errors: string[];
      methodVersion: string;
      exclusions: typeof SOCIAL_SECURITY_ESTIMATE_EXCLUSIONS;
    }
  | {
      ok: true;
      methodVersion: "1.0.1";
      birthYear: number;
      fullRetirementAge: FullRetirementAge;
      fullRetirementAgeMonthlyBenefit: number;
      claimAge: FullRetirementAge;
      monthsFromFullRetirementAge: number;
      delayedRetirementCreditAnnualRate: number;
      adjustmentFactor: number;
      estimatedMonthlyBenefitBeforeRounding: number;
      estimatedMonthlyBenefit: number;
      estimatedAnnualBenefit: number;
      exclusions: typeof SOCIAL_SECURITY_ESTIMATE_EXCLUSIONS;
    };

function fullRetirementAgeForBirthYear(birthYear: number): FullRetirementAge {
  if (birthYear <= 1937) return { years: 65, months: 0 };
  if (birthYear <= 1942) return { years: 65, months: (birthYear - 1937) * 2 };
  if (birthYear <= 1954) return { years: 66, months: 0 };
  if (birthYear <= 1959) return { years: 66, months: (birthYear - 1954) * 2 };
  return { years: 67, months: 0 };
}

function delayedCreditRateForBirthYear(birthYear: number): DelayedCreditRate {
  return SOCIAL_SECURITY_CLAIM_PARAMETERS.delayedCreditRates.find(
    (rate) =>
      birthYear >= rate.minimumBirthYear &&
      (rate.maximumBirthYear === null || birthYear <= rate.maximumBirthYear),
  )!;
}

function isInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

function isFiniteNonNegative(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function floorCurrency(value: number): number {
  const floatingPointTolerance =
    Number.EPSILON * Math.max(1, Math.abs(value));
  return Math.floor((value + floatingPointTolerance) * 100) / 100;
}

function floorWholeDollar(value: number): number {
  // Preserve SSA's downward-dollar rule while neutralizing at most one
  // relative machine epsilon of binary noise below a mathematically exact integer.
  const floatingPointTolerance =
    Number.EPSILON * Math.max(1, Math.abs(value));
  return Math.floor(value + floatingPointTolerance);
}

/** Estimate a retired worker's gross benefit at a whole-month claim age. */
export function estimateSocialSecurityClaim(
  input: SocialSecurityClaimInput,
): SocialSecurityEstimate {
  const candidate = input as Partial<SocialSecurityClaimInput> | null | undefined;
  const errors: string[] = [];

  if (!candidate || typeof candidate !== "object") {
    return {
      ok: false,
      errors: ["input must be an object"],
      methodVersion: SOCIAL_SECURITY_CLAIM_PARAMETERS.methodVersion,
      exclusions: SOCIAL_SECURITY_ESTIMATE_EXCLUSIONS,
    };
  }
  if (
    !isInteger(candidate.birthYear) ||
    candidate.birthYear < SOCIAL_SECURITY_CLAIM_PARAMETERS.minimumSupportedBirthYear
  ) {
    errors.push("birthYear must be a whole SSA-effective year of 1933 or later");
  }
  if (!isFiniteNonNegative(candidate.fullRetirementAgeMonthlyBenefit)) {
    errors.push("fullRetirementAgeMonthlyBenefit must be finite and non-negative");
  }
  if (!isInteger(candidate.claimAgeYears)) {
    errors.push("claimAgeYears must be a whole number");
  }
  if (
    !isInteger(candidate.claimAgeMonths) ||
    candidate.claimAgeMonths < 0 ||
    candidate.claimAgeMonths > 11
  ) {
    errors.push("claimAgeMonths must be a whole number from 0 through 11");
  }

  let claimAgeInMonths = Number.NaN;
  let claimAgePartsAreValid = false;
  if (
    isInteger(candidate.claimAgeYears) &&
    isInteger(candidate.claimAgeMonths) &&
    candidate.claimAgeMonths >= 0 &&
    candidate.claimAgeMonths <= 11
  ) {
    claimAgePartsAreValid = true;
    claimAgeInMonths = candidate.claimAgeYears * 12 + candidate.claimAgeMonths;
  }
  const hasClaimAge = Number.isFinite(claimAgeInMonths);
  if (claimAgePartsAreValid && !hasClaimAge) {
    errors.push("claim age converted to months must be finite");
  }
  if (
    hasClaimAge &&
    (claimAgeInMonths < SOCIAL_SECURITY_CLAIM_PARAMETERS.earliestClaimAgeMonths ||
      claimAgeInMonths > SOCIAL_SECURITY_CLAIM_PARAMETERS.latestClaimAgeMonths)
  ) {
    errors.push("claim age must be from 62 years 0 months through 70 years 0 months");
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors,
      methodVersion: SOCIAL_SECURITY_CLAIM_PARAMETERS.methodVersion,
      exclusions: SOCIAL_SECURITY_ESTIMATE_EXCLUSIONS,
    };
  }

  const birthYear = candidate.birthYear as number;
  const fullRetirementAgeMonthlyBenefit =
    candidate.fullRetirementAgeMonthlyBenefit as number;
  const fullRetirementAge = fullRetirementAgeForBirthYear(birthYear);
  const fullRetirementAgeInMonths =
    fullRetirementAge.years * 12 + fullRetirementAge.months;
  const monthsFromFullRetirementAge = claimAgeInMonths - fullRetirementAgeInMonths;
  const delayedCreditRate = delayedCreditRateForBirthYear(birthYear);

  let adjustmentFactor = 1;
  if (monthsFromFullRetirementAge < 0) {
    const earlyMonths = -monthsFromFullRetirementAge;
    adjustmentFactor =
      earlyMonths <= 36 ? (180 - earlyMonths) / 180 : (228 - earlyMonths) / 240;
  } else if (monthsFromFullRetirementAge > 0) {
    const creditedMonths = Math.min(
      monthsFromFullRetirementAge,
      SOCIAL_SECURITY_CLAIM_PARAMETERS.latestClaimAgeMonths -
        fullRetirementAgeInMonths,
    );
    adjustmentFactor =
      1 +
      (creditedMonths * delayedCreditRate.monthlyNumerator) /
        delayedCreditRate.monthlyDenominator;
  }

  const unroundedBenefit = fullRetirementAgeMonthlyBenefit * adjustmentFactor;
  if (!Number.isFinite(unroundedBenefit)) {
    return {
      ok: false,
      errors: ["estimated benefit before rounding must be finite"],
      methodVersion: SOCIAL_SECURITY_CLAIM_PARAMETERS.methodVersion,
      exclusions: SOCIAL_SECURITY_ESTIMATE_EXCLUSIONS,
    };
  }
  const estimatedMonthlyBenefitBeforeRounding = roundCurrency(unroundedBenefit);
  const estimatedMonthlyBenefit = floorWholeDollar(unroundedBenefit);
  const estimatedAnnualBenefit = estimatedMonthlyBenefit * 12;
  if (
    !Number.isFinite(estimatedMonthlyBenefitBeforeRounding) ||
    !Number.isFinite(estimatedAnnualBenefit)
  ) {
    return {
      ok: false,
      errors: ["estimated benefit must be finite"],
      methodVersion: SOCIAL_SECURITY_CLAIM_PARAMETERS.methodVersion,
      exclusions: SOCIAL_SECURITY_ESTIMATE_EXCLUSIONS,
    };
  }

  return {
    ok: true,
    methodVersion: "1.0.1",
    birthYear,
    fullRetirementAge,
    fullRetirementAgeMonthlyBenefit,
    claimAge: {
      years: candidate.claimAgeYears as number,
      months: candidate.claimAgeMonths as number,
    },
    monthsFromFullRetirementAge,
    delayedRetirementCreditAnnualRate: delayedCreditRate.annualRate,
    adjustmentFactor,
    estimatedMonthlyBenefitBeforeRounding,
    estimatedMonthlyBenefit,
    estimatedAnnualBenefit,
    exclusions: SOCIAL_SECURITY_ESTIMATE_EXCLUSIONS,
  };
}

/**
 * Simplified federal taxable-benefit parameters from Publication 915 (2025),
 * Worksheet 1, applicable to 2025 federal income tax returns filed in 2026.
 *
 * Primary source title: Publication 915 (2025), Social Security and Equivalent
 * Railroad Retirement Benefits
 * URL: https://www.irs.gov/pub/irs-pdf/p915.pdf
 * Source revision: 2025. Last verified: 2026-08-15.
 */
export const TAXABLE_SOCIAL_SECURITY_PARAMETERS = deepFreeze({
  methodVersion: "1.1.0",
  taxYear: 2025,
  effectivePeriod: "2025 federal income tax returns",
  sourceRevision: "2025",
  lastVerifiedDate: "2026-08-15",
  sourceTitle:
    "Publication 915 (2025), Social Security and Equivalent Railroad Retirement Benefits",
  sourceUrl: "https://www.irs.gov/pub/irs-pdf/p915.pdf",
  filingStatuses: {
    single: { lowerThreshold: 25_000, upperThreshold: 34_000 },
    married_filing_jointly: { lowerThreshold: 32_000, upperThreshold: 44_000 },
    head_of_household: { lowerThreshold: 25_000, upperThreshold: 34_000 },
    qualifying_surviving_spouse: {
      lowerThreshold: 25_000,
      upperThreshold: 34_000,
    },
    married_filing_separately: {
      lowerThreshold: 25_000,
      upperThreshold: 34_000,
    },
  },
  maximumTaxablePercentage: 0.85,
} as const);

export type TaxableSocialSecurityFilingStatus =
  keyof typeof TAXABLE_SOCIAL_SECURITY_PARAMETERS.filingStatuses;

export type TaxableSocialSecurityInput = {
  taxYear: number;
  filingStatus: TaxableSocialSecurityFilingStatus;
  annualSocialSecurityBenefits: number;
  /** AGI-like income excluding Social Security and tax-exempt interest. */
  otherIncome: number;
  taxExemptInterest: number;
  /** Required for married filing separately; omitted for every other status. */
  livedWithSpouseAtAnyTime?: boolean;
};

export type TaxableSocialSecurityEstimate =
  | {
      ok: false;
      errors: string[];
      methodVersion: string;
      exclusions: typeof TAXABLE_SOCIAL_SECURITY_EXCLUSIONS;
    }
  | {
      ok: true;
      methodVersion: "1.1.0";
      taxYear: 2025;
      filingStatus: TaxableSocialSecurityFilingStatus;
      grossAnnualBenefits: number;
      otherIncome: number;
      taxExemptInterest: number;
      provisionalIncome: number;
      lowerThreshold: number | null;
      upperThreshold: number | null;
      taxableAnnualBenefits: number;
      federallyTaxFreeAnnualBenefits: number;
      taxablePercentage: number;
      exclusions: typeof TAXABLE_SOCIAL_SECURITY_EXCLUSIONS;
    };

/** Estimate the portion of annual Social Security benefits included in federal taxable income. */
export function estimateTaxableSocialSecurity(
  input: TaxableSocialSecurityInput,
): TaxableSocialSecurityEstimate {
  const candidate = input as Partial<TaxableSocialSecurityInput> | null | undefined;
  const errors: string[] = [];

  if (!candidate || typeof candidate !== "object") {
    return {
      ok: false,
      errors: ["input must be an object"],
      methodVersion: TAXABLE_SOCIAL_SECURITY_PARAMETERS.methodVersion,
      exclusions: TAXABLE_SOCIAL_SECURITY_EXCLUSIONS,
    };
  }
  if (candidate.taxYear !== TAXABLE_SOCIAL_SECURITY_PARAMETERS.taxYear) {
    errors.push("taxYear must be 2025");
  }
  const hasSupportedFilingStatus =
    typeof candidate.filingStatus === "string" &&
    Object.prototype.hasOwnProperty.call(
      TAXABLE_SOCIAL_SECURITY_PARAMETERS.filingStatuses,
      candidate.filingStatus,
    );
  if (!hasSupportedFilingStatus) {
    errors.push("filingStatus must be a supported 2025 filing status");
  }
  if (
    candidate.filingStatus === "married_filing_separately" &&
    typeof candidate.livedWithSpouseAtAnyTime !== "boolean"
  ) {
    errors.push(
      "livedWithSpouseAtAnyTime must be provided for married filing separately",
    );
  }
  for (const field of [
    "annualSocialSecurityBenefits",
    "otherIncome",
    "taxExemptInterest",
  ] as const) {
    if (!isFiniteNonNegative(candidate[field])) {
      errors.push(`${field} must be finite and non-negative`);
    }
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors,
      methodVersion: TAXABLE_SOCIAL_SECURITY_PARAMETERS.methodVersion,
      exclusions: TAXABLE_SOCIAL_SECURITY_EXCLUSIONS,
    };
  }

  const filingStatus = candidate.filingStatus as TaxableSocialSecurityFilingStatus;
  const grossAnnualBenefits = candidate.annualSocialSecurityBenefits as number;
  const otherIncome = candidate.otherIncome as number;
  const taxExemptInterest = candidate.taxExemptInterest as number;
  const provisionalIncome =
    grossAnnualBenefits / 2 + otherIncome + taxExemptInterest;
  if (!Number.isFinite(provisionalIncome)) {
    return {
      ok: false,
      errors: ["provisional income must be finite"],
      methodVersion: TAXABLE_SOCIAL_SECURITY_PARAMETERS.methodVersion,
      exclusions: TAXABLE_SOCIAL_SECURITY_EXCLUSIONS,
    };
  }
  const roundedProvisionalIncome = roundCurrency(provisionalIncome);
  if (!Number.isFinite(roundedProvisionalIncome)) {
    return {
      ok: false,
      errors: ["provisional income after currency rounding must be finite"],
      methodVersion: TAXABLE_SOCIAL_SECURITY_PARAMETERS.methodVersion,
      exclusions: TAXABLE_SOCIAL_SECURITY_EXCLUSIONS,
    };
  }

  const { lowerThreshold, upperThreshold } =
    TAXABLE_SOCIAL_SECURITY_PARAMETERS.filingStatuses[filingStatus];
  const usesMarriedSeparateLivedTogetherRule =
    filingStatus === "married_filing_separately" &&
    candidate.livedWithSpouseAtAnyTime === true;
  let taxableBeforeRounding: number;
  if (usesMarriedSeparateLivedTogetherRule) {
    taxableBeforeRounding = Math.min(
      provisionalIncome * 0.85,
      grossAnnualBenefits * TAXABLE_SOCIAL_SECURITY_PARAMETERS.maximumTaxablePercentage,
    );
  } else {
    const firstBandWidth = upperThreshold - lowerThreshold;
    const amountAboveLower = Math.max(0, provisionalIncome - lowerThreshold);
    const fiftyPercentBand = Math.min(
      grossAnnualBenefits / 2,
      Math.min(amountAboveLower, firstBandWidth) * 0.5,
    );
    const amountAboveUpper = Math.max(0, provisionalIncome - upperThreshold);
    taxableBeforeRounding = Math.min(
      grossAnnualBenefits * TAXABLE_SOCIAL_SECURITY_PARAMETERS.maximumTaxablePercentage,
      fiftyPercentBand + amountAboveUpper * 0.85,
    );
  }
  if (!Number.isFinite(taxableBeforeRounding)) {
    return {
      ok: false,
      errors: ["taxable benefits before rounding must be finite"],
      methodVersion: TAXABLE_SOCIAL_SECURITY_PARAMETERS.methodVersion,
      exclusions: TAXABLE_SOCIAL_SECURITY_EXCLUSIONS,
    };
  }
  const maximumTaxableAtWholeCents = floorCurrency(
    grossAnnualBenefits *
      TAXABLE_SOCIAL_SECURITY_PARAMETERS.maximumTaxablePercentage,
  );
  const taxableAnnualBenefits = Math.min(
    roundCurrency(taxableBeforeRounding),
    maximumTaxableAtWholeCents,
  );
  if (!Number.isFinite(taxableAnnualBenefits)) {
    return {
      ok: false,
      errors: ["taxable benefits after currency rounding must be finite"],
      methodVersion: TAXABLE_SOCIAL_SECURITY_PARAMETERS.methodVersion,
      exclusions: TAXABLE_SOCIAL_SECURITY_EXCLUSIONS,
    };
  }
  const federallyTaxFreeAnnualBenefits = roundCurrency(
    grossAnnualBenefits - taxableAnnualBenefits,
  );
  const taxablePercentage =
    grossAnnualBenefits === 0 ? 0 : taxableAnnualBenefits / grossAnnualBenefits;
  if (
    !Number.isFinite(federallyTaxFreeAnnualBenefits) ||
    !Number.isFinite(taxablePercentage)
  ) {
    return {
      ok: false,
      errors: ["taxable-benefit result must be finite"],
      methodVersion: TAXABLE_SOCIAL_SECURITY_PARAMETERS.methodVersion,
      exclusions: TAXABLE_SOCIAL_SECURITY_EXCLUSIONS,
    };
  }

  return {
    ok: true,
    methodVersion: "1.1.0",
    taxYear: 2025,
    filingStatus,
    grossAnnualBenefits,
    otherIncome,
    taxExemptInterest,
    provisionalIncome: roundedProvisionalIncome,
    lowerThreshold: usesMarriedSeparateLivedTogetherRule ? null : lowerThreshold,
    upperThreshold: usesMarriedSeparateLivedTogetherRule ? null : upperThreshold,
    taxableAnnualBenefits,
    federallyTaxFreeAnnualBenefits,
    taxablePercentage,
    exclusions: TAXABLE_SOCIAL_SECURITY_EXCLUSIONS,
  };
}
