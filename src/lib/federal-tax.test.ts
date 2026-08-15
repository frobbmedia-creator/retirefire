import assert from "node:assert/strict";

async function run() {
  let federalTax: typeof import("./federal-tax");
  try {
    federalTax = await import("./federal-tax");
  } catch {
    assert.fail("progressive federal tax estimator is absent");
  }

  const { FEDERAL_TAX_PARAMETERS, estimateFederalIncomeTax } = federalTax;

  // Break caught: runtime code must not be able to mutate governed tax fixtures.
  assert(Object.isFrozen(FEDERAL_TAX_PARAMETERS));
  assert(Object.isFrozen(FEDERAL_TAX_PARAMETERS.filingStatuses));
  assert(Object.isFrozen(FEDERAL_TAX_PARAMETERS.filingStatuses.single.brackets));
  assert(Object.isFrozen(FEDERAL_TAX_PARAMETERS.filingStatuses.single.brackets[0]));
  assert.equal(FEDERAL_TAX_PARAMETERS.effectiveDate, "2026-01-01");
  assert.equal(FEDERAL_TAX_PARAMETERS.lastVerifiedDate, "2026-08-15");
  assert.equal(FEDERAL_TAX_PARAMETERS.sourceTitle, "Revenue Procedure 2025-32");
  assert.equal(
    FEDERAL_TAX_PARAMETERS.sourceUrl,
    "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf",
  );
  assert.deepEqual(FEDERAL_TAX_PARAMETERS.standardDeductionAdjustments, {
    dependentMinimum: 1_350,
    dependentEarnedIncomeIncrement: 450,
    agedOrBlind: 1_650,
    agedOrBlindUnmarriedAndNotSurvivingSpouse: 2_050,
  });

  // Break caught: a wrong 2026 IRS threshold, rate, or standard deduction would
  // silently produce incorrect current-year estimates. These literals are
  // transcribed independently from Rev. Proc. 2025-32, sections 4.01 and 4.14.
  assert.deepEqual(FEDERAL_TAX_PARAMETERS.filingStatuses.single, {
    label: "Single",
    standardDeduction: 16_100,
    brackets: [
      { upTo: 12_400, rate: 0.1 },
      { upTo: 50_400, rate: 0.12 },
      { upTo: 105_700, rate: 0.22 },
      { upTo: 201_775, rate: 0.24 },
      { upTo: 256_225, rate: 0.32 },
      { upTo: 640_600, rate: 0.35 },
      { upTo: null, rate: 0.37 },
    ],
  });
  assert.deepEqual(FEDERAL_TAX_PARAMETERS.filingStatuses.married_filing_jointly, {
    label: "Married filing jointly",
    standardDeduction: 32_200,
    brackets: [
      { upTo: 24_800, rate: 0.1 },
      { upTo: 100_800, rate: 0.12 },
      { upTo: 211_400, rate: 0.22 },
      { upTo: 403_550, rate: 0.24 },
      { upTo: 512_450, rate: 0.32 },
      { upTo: 768_700, rate: 0.35 },
      { upTo: null, rate: 0.37 },
    ],
  });
  assert.deepEqual(FEDERAL_TAX_PARAMETERS.filingStatuses.qualifying_surviving_spouse, {
    label: "Qualifying surviving spouse",
    standardDeduction: 32_200,
    brackets: [
      { upTo: 24_800, rate: 0.1 },
      { upTo: 100_800, rate: 0.12 },
      { upTo: 211_400, rate: 0.22 },
      { upTo: 403_550, rate: 0.24 },
      { upTo: 512_450, rate: 0.32 },
      { upTo: 768_700, rate: 0.35 },
      { upTo: null, rate: 0.37 },
    ],
  });
  assert.deepEqual(FEDERAL_TAX_PARAMETERS.filingStatuses.married_filing_separately, {
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
  });
  assert.deepEqual(FEDERAL_TAX_PARAMETERS.filingStatuses.head_of_household, {
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
  });

  // Break caught: a zero conversion must not invent tax or divide by zero.
  const zeroConversion = estimateFederalIncomeTax({
    taxYear: 2026,
    filingStatus: "single",
    currentTaxableIncome: 50_000,
    desiredConversion: 0,
    traditionalBalance: 100_000,
  });
  assert(zeroConversion.ok);
  assert.deepEqual(zeroConversion, {
    ok: true,
    taxYear: 2026,
    filingStatus: "single",
    standardDeduction: 16_100,
    taxableIncomeBeforeConversion: 50_000,
    taxableIncomeAfterConversion: 50_000,
    desiredConversion: 0,
    appliedConversion: 0,
    conversionWasLimited: false,
    federalTaxBeforeConversion: 5_752,
    federalTaxAfterConversion: 5_752,
    incrementalFederalTax: 0,
    effectiveFederalRateOnConversion: 0,
    remainingTraditionalBalance: 100_000,
    exclusions: federalTax.FEDERAL_TAX_EXCLUSIONS,
  });

  // Break caught: charging one marginal rate to the whole conversion would
  // miss the 12%, 22%, and 24% layers crossed here.
  const crossingBrackets = estimateFederalIncomeTax({
    taxYear: 2026,
    filingStatus: "single",
    currentTaxableIncome: 49_000,
    desiredConversion: 60_000,
    traditionalBalance: 500_000,
  });
  assert(crossingBrackets.ok);
  assert.equal(crossingBrackets.federalTaxBeforeConversion, 5_632);
  assert.equal(crossingBrackets.federalTaxAfterConversion, 18_758);
  assert.equal(crossingBrackets.incrementalFederalTax, 13_126);
  assert.equal(crossingBrackets.effectiveFederalRateOnConversion, 13_126 / 60_000);
  assert.equal(crossingBrackets.taxableIncomeAfterConversion, 109_000);

  // Break caught: a desired conversion cannot exceed the eligible traditional balance.
  const limitedConversion = estimateFederalIncomeTax({
    taxYear: 2026,
    filingStatus: "head_of_household",
    currentTaxableIncome: 0,
    desiredConversion: 50_000,
    traditionalBalance: 20_000,
  });
  assert(limitedConversion.ok);
  assert.equal(limitedConversion.appliedConversion, 20_000);
  assert.equal(limitedConversion.conversionWasLimited, true);
  assert.equal(limitedConversion.federalTaxBeforeConversion, 0);
  assert.equal(limitedConversion.federalTaxAfterConversion, 2_046);
  assert.equal(limitedConversion.incrementalFederalTax, 2_046);
  assert.equal(limitedConversion.remainingTraditionalBalance, 0);

  // Break caught: invalid numbers or unsupported contracts must return an
  // explicit failure, never a result containing NaN.
  for (const input of [
    {
      taxYear: 2026,
      filingStatus: "single",
      currentTaxableIncome: Number.NaN,
      desiredConversion: 10_000,
      traditionalBalance: 100_000,
    },
    {
      taxYear: 2026,
      filingStatus: "single",
      currentTaxableIncome: 50_000,
      desiredConversion: -1,
      traditionalBalance: 100_000,
    },
    {
      taxYear: 2025,
      filingStatus: "single",
      currentTaxableIncome: 50_000,
      desiredConversion: 10_000,
      traditionalBalance: 100_000,
    },
    {
      taxYear: 2026,
      filingStatus: "not_a_status",
      currentTaxableIncome: 50_000,
      desiredConversion: 10_000,
      traditionalBalance: 100_000,
    },
    {
      taxYear: 2026,
      filingStatus: "single",
      currentTaxableIncome: Number.MAX_VALUE,
      desiredConversion: Number.MAX_VALUE,
      traditionalBalance: Number.MAX_VALUE,
    },
  ]) {
    const invalid = estimateFederalIncomeTax(input as never);
    assert.equal(invalid.ok, false);
    if (!invalid.ok) {
      assert(invalid.errors.length > 0);
      assert(!JSON.stringify(invalid).includes("NaN"));
      assert.deepEqual(invalid.exclusions, federalTax.FEDERAL_TAX_EXCLUSIONS);
    }
  }

  console.log("All federal-tax checks passed.");
}

void run();
