import assert from "node:assert/strict";
import {
  SOCIAL_SECURITY_CLAIM_PARAMETERS,
  TAXABLE_SOCIAL_SECURITY_PARAMETERS,
  estimateSocialSecurityClaim,
  estimateTaxableSocialSecurity,
} from "./retirement-income";

// Break caught: birth-year transitions must not collapse to one FRA default.
for (const [birthYear, claimAgeYears, claimAgeMonths] of [
  [1937, 65, 0],
  [1938, 65, 2],
  [1942, 65, 10],
  [1943, 66, 0],
  [1954, 66, 0],
  [1955, 66, 2],
  [1959, 66, 10],
  [1960, 67, 0],
  [1990, 67, 0],
] as const) {
  const estimate = estimateSocialSecurityClaim({
    birthYear,
    fullRetirementAgeMonthlyBenefit: 1_000,
    claimAgeYears,
    claimAgeMonths,
  });
  assert(estimate.ok);
  assert.deepEqual(estimate.fullRetirementAge, {
    years: claimAgeYears,
    months: claimAgeMonths,
  });
  assert.equal(estimate.adjustmentFactor, 1);
  assert.equal(estimate.estimatedMonthlyBenefit, 1_000);
}

// Break caught: treating a five-year early claim as 60 identical reduction
// months would miss SSA's smaller reduction after the first 36 months.
const age62 = estimateSocialSecurityClaim({
  birthYear: 1960,
  fullRetirementAgeMonthlyBenefit: 1_000,
  claimAgeYears: 62,
  claimAgeMonths: 0,
});
assert(age62.ok);
assert.equal(age62.monthsFromFullRetirementAge, -60);
assert.equal(age62.adjustmentFactor, 0.7);
assert.equal(age62.estimatedMonthlyBenefit, 700);
assert.equal(age62.estimatedAnnualBenefit, 8_400);

// Break caught: early claims must change for each month, not only each year.
const age62AndOneMonth = estimateSocialSecurityClaim({
  birthYear: 1960,
  fullRetirementAgeMonthlyBenefit: 1_000,
  claimAgeYears: 62,
  claimAgeMonths: 1,
});
assert(age62AndOneMonth.ok);
assert.equal(age62AndOneMonth.monthsFromFullRetirementAge, -59);
assert.equal(age62AndOneMonth.adjustmentFactor, 169 / 240);
assert.equal(age62AndOneMonth.estimatedMonthlyBenefit, 704);

const age64 = estimateSocialSecurityClaim({
  birthYear: 1960,
  fullRetirementAgeMonthlyBenefit: 1_000,
  claimAgeYears: 64,
  claimAgeMonths: 0,
});
assert(age64.ok);
assert.equal(age64.adjustmentFactor, 0.8);
assert.equal(age64.estimatedMonthlyBenefit, 800);

const oneMonthEarly = estimateSocialSecurityClaim({
  birthYear: 1960,
  fullRetirementAgeMonthlyBenefit: 1_000,
  claimAgeYears: 66,
  claimAgeMonths: 11,
});
assert(oneMonthEarly.ok);
assert.equal(oneMonthEarly.adjustmentFactor, 179 / 180);
assert.equal(oneMonthEarly.estimatedMonthlyBenefit, 994);

// Break caught: binary floating noise just below an exact whole-dollar result
// must not make SSA's next-lower-dollar step underpay by another dollar.
// Hand derivation: 31 early months => 149/180; $540 × 149/180 = exactly $447.
const exactWholeDollarReduction = estimateSocialSecurityClaim({
  birthYear: 1960,
  fullRetirementAgeMonthlyBenefit: 540,
  claimAgeYears: 64,
  claimAgeMonths: 5,
});
assert(exactWholeDollarReduction.ok);
assert.equal(exactWholeDollarReduction.adjustmentFactor, 149 / 180);
assert.equal(exactWholeDollarReduction.estimatedMonthlyBenefit, 447);

// Break caught: a genuine sub-dollar input must still follow SSA's
// next-lower-dollar rule; tolerance must not promote it to the next dollar.
const genuineSubDollarBenefit = estimateSocialSecurityClaim({
  birthYear: 1960,
  fullRetirementAgeMonthlyBenefit: 446.99999999999994,
  claimAgeYears: 67,
  claimAgeMonths: 0,
});
assert(genuineSubDollarBenefit.ok);
assert.equal(genuineSubDollarBenefit.estimatedMonthlyBenefit, 446);

// Break caught: currency outside the estimator's safe whole-cent domain must
// be rejected before exact-decimal conversion can produce an off-by-one result.
const unsafeClaimCurrency = estimateSocialSecurityClaim({
  birthYear: 1960,
  fullRetirementAgeMonthlyBenefit: 18_014_398_509_481_992,
  claimAgeYears: 64,
  claimAgeMonths: 5,
});
assert.equal(unsafeClaimCurrency.ok, false);
if (!unsafeClaimCurrency.ok) {
  assert(
    unsafeClaimCurrency.errors.some(
      (error) =>
        error.includes("fullRetirementAgeMonthlyBenefit") &&
        error.includes("safe whole-cent limit"),
    ),
  );
}

const unsafeAdjustedMonthlyResult = estimateSocialSecurityClaim({
  birthYear: 1960,
  fullRetirementAgeMonthlyBenefit: 80_000_000_000_000,
  claimAgeYears: 70,
  claimAgeMonths: 0,
});
assert.equal(unsafeAdjustedMonthlyResult.ok, false);
if (!unsafeAdjustedMonthlyResult.ok) {
  assert(
    unsafeAdjustedMonthlyResult.errors.some(
      (error) =>
        error.includes("estimated monthly benefit") &&
        error.includes("safe whole-cent limit"),
    ),
  );
}

const unsafeAnnualClaimResult = estimateSocialSecurityClaim({
  birthYear: 1960,
  fullRetirementAgeMonthlyBenefit: 10_000_000_000_000,
  claimAgeYears: 67,
  claimAgeMonths: 0,
});
assert.equal(unsafeAnnualClaimResult.ok, false);
if (!unsafeAnnualClaimResult.ok) {
  assert(
    unsafeAnnualClaimResult.errors.some(
      (error) =>
        error.includes("estimated annual benefit") &&
        error.includes("safe whole-cent limit"),
    ),
  );
}

// Break caught: SSA's 2025 Appendix C golden example must retain the agency's
// next-lower-dollar result for a $1,671 PIA claimed 60 months early.
const ssaEarlyGolden = estimateSocialSecurityClaim({
  birthYear: 1963,
  fullRetirementAgeMonthlyBenefit: 1_671,
  claimAgeYears: 62,
  claimAgeMonths: 0,
});
assert(ssaEarlyGolden.ok);
assert.equal(ssaEarlyGolden.estimatedMonthlyBenefitBeforeRounding, 1_169.7);
assert.equal(ssaEarlyGolden.estimatedMonthlyBenefit, 1_169);

// Break caught: delayed retirement credits must be monthly and use the
// birth-year rate; this mirrors SSA's five-month, $1,671 example.
const ssaDelayedGolden = estimateSocialSecurityClaim({
  birthYear: 1958,
  fullRetirementAgeMonthlyBenefit: 1_671,
  claimAgeYears: 67,
  claimAgeMonths: 1,
});
assert(ssaDelayedGolden.ok);
assert.equal(ssaDelayedGolden.monthsFromFullRetirementAge, 5);
assert.equal(ssaDelayedGolden.delayedRetirementCreditAnnualRate, 0.08);
assert.equal(ssaDelayedGolden.adjustmentFactor, 31 / 30);
assert.equal(ssaDelayedGolden.estimatedMonthlyBenefit, 1_726);

// Break caught: credits must stop at exactly age 70.
const age70 = estimateSocialSecurityClaim({
  birthYear: 1960,
  fullRetirementAgeMonthlyBenefit: 1_000,
  claimAgeYears: 70,
  claimAgeMonths: 0,
});
assert(age70.ok);
assert.equal(age70.monthsFromFullRetirementAge, 36);
assert.equal(age70.adjustmentFactor, 1.24);
assert.equal(age70.estimatedMonthlyBenefit, 1_240);

// Break caught: invalid or unsupported ages and amounts must be gated instead
// of returning a plausible-looking benefit.
for (const input of [
  {
    birthYear: 1960,
    fullRetirementAgeMonthlyBenefit: 1_000,
    claimAgeYears: 61,
    claimAgeMonths: 11,
  },
  {
    birthYear: 1960,
    fullRetirementAgeMonthlyBenefit: 1_000,
    claimAgeYears: 70,
    claimAgeMonths: 1,
  },
  {
    birthYear: 1960,
    fullRetirementAgeMonthlyBenefit: 1_000,
    claimAgeYears: 67,
    claimAgeMonths: 12,
  },
  {
    birthYear: 1932,
    fullRetirementAgeMonthlyBenefit: 1_000,
    claimAgeYears: 65,
    claimAgeMonths: 0,
  },
  {
    birthYear: 1960.5,
    fullRetirementAgeMonthlyBenefit: 1_000,
    claimAgeYears: 67,
    claimAgeMonths: 0,
  },
  {
    birthYear: 1960,
    fullRetirementAgeMonthlyBenefit: -1,
    claimAgeYears: 67,
    claimAgeMonths: 0,
  },
  {
    birthYear: 1960,
    fullRetirementAgeMonthlyBenefit: 1_000,
    claimAgeYears: 1e308,
    claimAgeMonths: 0,
  },
  {
    birthYear: 1960,
    fullRetirementAgeMonthlyBenefit: Number.MAX_VALUE,
    claimAgeYears: 70,
    claimAgeMonths: 0,
  },
  {
    birthYear: 1960,
    fullRetirementAgeMonthlyBenefit: Number.MAX_VALUE,
    claimAgeYears: 67,
    claimAgeMonths: 0,
  },
] as const) {
  const invalid = estimateSocialSecurityClaim(input);
  assert.equal(invalid.ok, false);
  if (!invalid.ok) assert(invalid.errors.length > 0);
}

assert(Object.isFrozen(SOCIAL_SECURITY_CLAIM_PARAMETERS));
assert.equal(SOCIAL_SECURITY_CLAIM_PARAMETERS.methodVersion, "1.0.3");
assert.equal(SOCIAL_SECURITY_CLAIM_PARAMETERS.lastVerifiedDate, "2026-08-15");
assert.equal(
  SOCIAL_SECURITY_CLAIM_PARAMETERS.earlyRetirementSourceUrl,
  "https://www.ssa.gov/oact/quickcalc/earlyretire.html",
);

function taxableEstimate(
  filingStatus:
    | "single"
    | "married_filing_jointly"
    | "head_of_household"
    | "qualifying_surviving_spouse"
    | "married_filing_separately",
  otherIncome: number,
  annualSocialSecurityBenefits = 20_000,
  taxExemptInterest = 0,
  livedWithSpouseAtAnyTime?: boolean,
) {
  return estimateTaxableSocialSecurity({
    taxYear: 2025,
    filingStatus,
    annualSocialSecurityBenefits,
    otherIncome,
    taxExemptInterest,
    livedWithSpouseAtAnyTime,
  });
}

// Break caught: equality at each lower base amount must remain nontaxable.
const singleLower = taxableEstimate("single", 15_000);
assert(singleLower.ok);
assert.equal(singleLower.provisionalIncome, 25_000);
assert.equal(singleLower.taxableAnnualBenefits, 0);
assert.equal(singleLower.federallyTaxFreeAnnualBenefits, 20_000);

const singleAboveLower = taxableEstimate("single", 15_001);
assert(singleAboveLower.ok);
assert.equal(singleAboveLower.taxableAnnualBenefits, 0.5);

const jointLower = taxableEstimate("married_filing_jointly", 22_000);
assert(jointLower.ok);
assert.equal(jointLower.provisionalIncome, 32_000);
assert.equal(jointLower.taxableAnnualBenefits, 0);

// Break caught: Publication 915 applies the single thresholds to head of
// household, qualifying surviving spouse, and MFS taxpayers who lived apart
// from their spouse for all of 2025.
for (const [filingStatus, livedWithSpouseAtAnyTime] of [
  ["head_of_household", undefined],
  ["qualifying_surviving_spouse", undefined],
  ["married_filing_separately", false],
] as const) {
  const atLowerThreshold = taxableEstimate(
    filingStatus,
    15_000,
    20_000,
    0,
    livedWithSpouseAtAnyTime,
  );
  assert(atLowerThreshold.ok);
  assert.equal(atLowerThreshold.lowerThreshold, 25_000);
  assert.equal(atLowerThreshold.upperThreshold, 34_000);
  assert.equal(atLowerThreshold.taxableAnnualBenefits, 0);

  const aboveUpperThreshold = taxableEstimate(
    filingStatus,
    24_001,
    20_000,
    0,
    livedWithSpouseAtAnyTime,
  );
  assert(aboveUpperThreshold.ok);
  assert.equal(aboveUpperThreshold.taxableAnnualBenefits, 4_500.85);
}

// Break caught: MFS taxpayers who lived with a spouse at any time skip the
// ordinary thresholds and use Publication 915's direct 85% worksheet branch.
const mfsLivedTogetherLowIncome = taxableEstimate(
  "married_filing_separately",
  0,
  20_000,
  0,
  true,
);
assert(mfsLivedTogetherLowIncome.ok);
assert.equal(mfsLivedTogetherLowIncome.provisionalIncome, 10_000);
assert.equal(mfsLivedTogetherLowIncome.lowerThreshold, null);
assert.equal(mfsLivedTogetherLowIncome.upperThreshold, null);
assert.equal(mfsLivedTogetherLowIncome.taxableAnnualBenefits, 8_500);

const mfsLivedTogetherCapped = taxableEstimate(
  "married_filing_separately",
  20_000,
  20_000,
  0,
  true,
);
assert(mfsLivedTogetherCapped.ok);
assert.equal(mfsLivedTogetherCapped.taxableAnnualBenefits, 17_000);

const mfsMissingLivingCondition = estimateTaxableSocialSecurity({
  taxYear: 2025,
  filingStatus: "married_filing_separately",
  annualSocialSecurityBenefits: 20_000,
  otherIncome: 15_000,
  taxExemptInterest: 0,
});
assert.equal(mfsMissingLivingCondition.ok, false);
if (!mfsMissingLivingCondition.ok) {
  assert.match(mfsMissingLivingCondition.errors.join(" "), /livedWithSpouseAtAnyTime/);
}

// Break caught: the second phase-in must begin only above the upper threshold,
// preserving the literal $4,500 single and $6,000 joint base amounts.
const singleUpper = taxableEstimate("single", 24_000);
assert(singleUpper.ok);
assert.equal(singleUpper.provisionalIncome, 34_000);
assert.equal(singleUpper.taxableAnnualBenefits, 4_500);
const singleAboveUpper = taxableEstimate("single", 24_001);
assert(singleAboveUpper.ok);
assert.equal(singleAboveUpper.taxableAnnualBenefits, 4_500.85);

const jointUpper = taxableEstimate("married_filing_jointly", 34_000);
assert(jointUpper.ok);
assert.equal(jointUpper.provisionalIncome, 44_000);
assert.equal(jointUpper.taxableAnnualBenefits, 6_000);
const jointAboveUpper = taxableEstimate("married_filing_jointly", 34_001);
assert(jointAboveUpper.ok);
assert.equal(jointAboveUpper.taxableAnnualBenefits, 6_000.85);

// Break caught: no income level may make more than 85% of benefits federally taxable.
for (const filingStatus of ["single", "married_filing_jointly"] as const) {
  const capped = taxableEstimate(filingStatus, 100_000);
  assert(capped.ok);
  assert.equal(capped.taxableAnnualBenefits, 17_000);
  assert.equal(capped.federallyTaxFreeAnnualBenefits, 3_000);
  assert.equal(capped.taxablePercentage, 0.85);
}

// Break caught: nearest-cent rounding must never push the returned amount over
// the exact 85% cap. $100.01 × 85% = $85.0085, so the safe whole-cent cap is $85.00.
const fractionalCentCap = taxableEstimate("single", 100_000, 100.01);
assert(fractionalCentCap.ok);
assert.equal(fractionalCentCap.taxableAnnualBenefits, 85);
assert.equal(fractionalCentCap.federallyTaxFreeAnnualBenefits, 15.01);
assert(fractionalCentCap.taxablePercentage <= 0.85);

// Break caught: cent handling must stay below the exact numeric 85% cap even
// when the entered benefit is represented just below a whole dollar.
const justBelowWholeDollarCap = taxableEstimate(
  "single",
  100_000,
  99.99999999999999,
);
assert(justBelowWholeDollarCap.ok);
const exactJustBelowWholeDollarCap = 99.99999999999999 * 0.85;
assert.equal(justBelowWholeDollarCap.taxableAnnualBenefits, 84.99);
assert(
  justBelowWholeDollarCap.taxableAnnualBenefits <= exactJustBelowWholeDollarCap,
);
assert(justBelowWholeDollarCap.taxablePercentage <= 0.85);

// Break caught: unsafe gross-benefit magnitudes must be rejected rather than
// converted through a lossy decimal/cents path that can exceed the 85% cap.
const unsafeTaxableCurrency = taxableEstimate(
  "single",
  100_000,
  18_014_398_509_481_990,
);
assert.equal(unsafeTaxableCurrency.ok, false);
if (!unsafeTaxableCurrency.ok) {
  assert(
    unsafeTaxableCurrency.errors.some(
      (error) =>
        error.includes("annualSocialSecurityBenefits") &&
        error.includes("safe whole-cent limit"),
    ),
  );
}

for (const { input, field } of [
  {
    input: {
      taxYear: 2025,
      filingStatus: "single",
      annualSocialSecurityBenefits: 20_000,
      otherIncome: 18_014_398_509_481_990,
      taxExemptInterest: 0,
    },
    field: "otherIncome",
  },
  {
    input: {
      taxYear: 2025,
      filingStatus: "single",
      annualSocialSecurityBenefits: 20_000,
      otherIncome: 15_000,
      taxExemptInterest: 18_014_398_509_481_990,
    },
    field: "taxExemptInterest",
  },
] as const) {
  const unsafeMonetaryInput = estimateTaxableSocialSecurity(input);
  assert.equal(unsafeMonetaryInput.ok, false);
  if (!unsafeMonetaryInput.ok) {
    assert(
      unsafeMonetaryInput.errors.some(
        (error) => error.includes(field) && error.includes("safe whole-cent limit"),
      ),
    );
  }
}

const unsafeProvisionalIncome = estimateTaxableSocialSecurity({
  taxYear: 2025,
  filingStatus: "single",
  annualSocialSecurityBenefits: 60_000_000_000_000,
  otherIncome: 60_000_000_000_000,
  taxExemptInterest: 60_000_000_000_000,
});
assert.equal(unsafeProvisionalIncome.ok, false);
if (!unsafeProvisionalIncome.ok) {
  assert(
    unsafeProvisionalIncome.errors.some(
      (error) =>
        error.includes("provisional income") &&
        error.includes("safe whole-cent limit"),
    ),
  );
}

// Break caught: Publication 915 Example 3 must produce $6,275, not a flat 85%.
const irsGolden = taxableEstimate("married_filing_jointly", 40_500, 10_000);
assert(irsGolden.ok);
assert.equal(irsGolden.provisionalIncome, 45_500);
assert.equal(irsGolden.taxableAnnualBenefits, 6_275);
assert(
  irsGolden.exclusions.includes(
    "Ordinary benefit repayments and Form SSA-1099/RRB-1099 net box 5 handling; the model uses the entered gross annual benefit",
  ),
);

// Break caught: tax-exempt interest participates in provisional income.
const taxExemptInterest = taxableEstimate("single", 14_500, 20_000, 501);
assert(taxExemptInterest.ok);
assert.equal(taxExemptInterest.provisionalIncome, 25_001);
assert.equal(taxExemptInterest.taxableAnnualBenefits, 0.5);

// Break caught: unsupported tax years, statuses, and invalid numbers are gated.
for (const input of [
  {
    taxYear: 2026,
    filingStatus: "single",
    annualSocialSecurityBenefits: 20_000,
    otherIncome: 15_000,
    taxExemptInterest: 0,
  },
  {
    taxYear: 2025,
    filingStatus: "not_a_status",
    annualSocialSecurityBenefits: 20_000,
    otherIncome: 15_000,
    taxExemptInterest: 0,
  },
  {
    taxYear: 2025,
    filingStatus: "single",
    annualSocialSecurityBenefits: Number.NaN,
    otherIncome: 15_000,
    taxExemptInterest: 0,
  },
  {
    taxYear: 2025,
    filingStatus: "single",
    annualSocialSecurityBenefits: 20_000,
    otherIncome: -1,
    taxExemptInterest: 0,
  },
  {
    taxYear: 2025,
    filingStatus: "single",
    annualSocialSecurityBenefits: Number.MAX_VALUE,
    otherIncome: 0,
    taxExemptInterest: 0,
  },
  {
    taxYear: 2025,
    filingStatus: "single",
    annualSocialSecurityBenefits: Number.MAX_VALUE,
    otherIncome: Number.MAX_VALUE,
    taxExemptInterest: Number.MAX_VALUE,
  },
] as const) {
  const invalid = estimateTaxableSocialSecurity(input as never);
  assert.equal(invalid.ok, false);
  if (!invalid.ok) assert(invalid.errors.length > 0);
}

assert(Object.isFrozen(TAXABLE_SOCIAL_SECURITY_PARAMETERS));
assert(Object.isFrozen(TAXABLE_SOCIAL_SECURITY_PARAMETERS.filingStatuses));
assert.equal(TAXABLE_SOCIAL_SECURITY_PARAMETERS.methodVersion, "1.1.2");
assert.equal(TAXABLE_SOCIAL_SECURITY_PARAMETERS.taxYear, 2025);
assert.equal(TAXABLE_SOCIAL_SECURITY_PARAMETERS.lastVerifiedDate, "2026-08-15");
assert.deepEqual(TAXABLE_SOCIAL_SECURITY_PARAMETERS.filingStatuses, {
  single: { lowerThreshold: 25_000, upperThreshold: 34_000 },
  married_filing_jointly: { lowerThreshold: 32_000, upperThreshold: 44_000 },
  head_of_household: { lowerThreshold: 25_000, upperThreshold: 34_000 },
  qualifying_surviving_spouse: { lowerThreshold: 25_000, upperThreshold: 34_000 },
  married_filing_separately: { lowerThreshold: 25_000, upperThreshold: 34_000 },
});
assert.equal(
  TAXABLE_SOCIAL_SECURITY_PARAMETERS.sourceUrl,
  "https://www.irs.gov/pub/irs-pdf/p915.pdf",
);

console.log("All retirement-income checks passed.");
