import assert from "node:assert/strict";
import {
  calculateSepp,
  SEPP_EXTERNAL_REVIEW_STATUS,
  SEPP_TABLE_INTEGRITY,
  SINGLE_LIFE_EXPECTANCY,
  UNIFORM_LIFETIME_EXPECTANCY,
} from "./sepp";
import {
  getSeppMaximumRate,
  SEPP_120_PERCENT_MIDTERM_RATES,
  SEPP_RATE_TABLE_INTEGRITY,
} from "./sepp-rates";
import { seppUiModel } from "./sepp-ui-model";

function errorText(result: ReturnType<typeof calculateSepp>): string {
  assert.equal(result.ok, false);
  return result.ok ? "" : result.errors.join(" | ");
}

// Notice 2022-6 §3.02(c): use the greatest of the 5% floor and either
// eligible 120% federal mid-term rate from the two preceding months.
const january2023Rate = getSeppMaximumRate("2023-01");
assert(january2023Rate.ok);
assert.deepEqual(
  january2023Rate.lookbackRates.map(({ month, annualRate }) => [month, annualRate]),
  [
    ["2022-11", 0.0478],
    ["2022-12", 0.0514],
  ],
);
assert.equal(january2023Rate.maximumAnnualRate, 0.0514);
assert.equal(january2023Rate.selectedBasis, "2022-12 120% federal mid-term rate");

const july2023Rate = getSeppMaximumRate("2023-07");
assert(july2023Rate.ok);
assert.equal(july2023Rate.maximumAnnualRate, 0.05);
assert.equal(july2023Rate.selectedBasis, "Notice 2022-6 5% floor");

const september2026Rate = getSeppMaximumRate("2026-09");
assert(september2026Rate.ok);
assert.deepEqual(
  september2026Rate.lookbackRates.map(({ month, annualRate }) => [month, annualRate]),
  [
    ["2026-07", 0.0523],
    ["2026-08", 0.0523],
  ],
);
assert.equal(september2026Rate.maximumAnnualRate, 0.0523);

for (const invalidMonth of ["2026-9", "2026-13", "not-a-month"]) {
  const result = getSeppMaximumRate(invalidMonth);
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.errors.join(" | "), /YYYY-MM|valid/);
}

const unavailableOctober2026Rate = getSeppMaximumRate("2026-10");
assert.equal(unavailableOctober2026Rate.ok, false);
if (!unavailableOctober2026Rate.ok) {
  assert.match(unavailableOctober2026Rate.errors.join(" | "), /not available/);
}

// Independent checksum-style totals over authoritative literal inputs.
assert.deepEqual(SEPP_RATE_TABLE_INTEGRITY, {
  firstMonth: "2022-11",
  lastMonth: "2026-08",
  entryCount: 46,
  checksumBasisPoints: 22_720,
});
assert.deepEqual(SEPP_TABLE_INTEGRITY, {
  singleLife: {
    firstAge: 0,
    lastAge: 120,
    entryCount: 121,
    checksumTenths: 39_132,
  },
  uniformLifetime: {
    firstAge: 10,
    lastAge: 120,
    entryCount: 111,
    checksumTenths: 41_263,
  },
  jointAndLastSurvivor: { available: false, entryCount: 0 },
  mortality: { available: false, entryCount: 0 },
});
assert.equal(SINGLE_LIFE_EXPECTANCY[0], 84.6);
assert.equal(SINGLE_LIFE_EXPECTANCY[50], 36.2);
assert.equal(SINGLE_LIFE_EXPECTANCY[120], 1.0);
assert.equal(UNIFORM_LIFETIME_EXPECTANCY[0], 88.2);
assert.equal(UNIFORM_LIFETIME_EXPECTANCY[40], 48.5);
assert.equal(UNIFORM_LIFETIME_EXPECTANCY[110], 2.0);
assert(Object.isFrozen(SINGLE_LIFE_EXPECTANCY));
assert(Object.isFrozen(UNIFORM_LIFETIME_EXPECTANCY));
assert(Object.isFrozen(SEPP_120_PERCENT_MIDTERM_RATES));
assert(SEPP_120_PERCENT_MIDTERM_RATES.every((entry) => Object.isFrozen(entry)));

const baseInput = {
  accountBalance: 400_000,
  birthDate: "1973-06-15",
  firstDistributionDate: "2023-01-15",
  lifeExpectancyTable: "single-life" as const,
};
const rmdBaseInput = { ...baseInput, distributionYear: 2023 };

// Official IRS SoSEPP example plus independently calculated cents:
// $400,000 / 36.2 = $11,049.723756..., rounded to $11,049.72.
const rmd = calculateSepp({
  ...rmdBaseInput,
  method: "required-minimum-distribution",
});
assert(rmd.ok);
assert.equal(rmd.attainedAge, 50);
assert.equal(rmd.methodFactor, 36.2);
assert.equal(rmd.annualPayment, 11_049.72);
assert.equal(rmd.interestRate, null);
assert.equal(rmd.modificationEndDate, "2032-12-15");
assert.equal(rmd.externalReviewStatus, SEPP_EXTERNAL_REVIEW_STATUS);
assert.equal(rmd.actionable, false);
assert.deepEqual(rmd.inputs, {
  ...rmdBaseInput,
  method: "required-minimum-distribution",
  beneficiaryBirthDate: null,
  interestRate: null,
});
assert(rmd.sources.some((source) => source.title === "Notice 2022-6"));
assert(rmd.warnings.some((warning) => /external professional review/i.test(warning)));

// Notice 2022-6 §3.01(a): an RMD series redetermines the account balance and
// life-expectancy factor annually. $380,000 / age-51 factor 35.3 = $10,764.87.
const rmdYearTwo = calculateSepp({
  ...rmdBaseInput,
  accountBalance: 380_000,
  distributionYear: 2024,
  method: "required-minimum-distribution",
});
assert(rmdYearTwo.ok);
assert.equal(rmdYearTwo.attainedAge, 51);
assert.equal(rmdYearTwo.methodFactor, 35.3);
assert.equal(rmdYearTwo.annualPayment, 10_764.87);
assert.equal(rmdYearTwo.modificationEndDate, rmd.modificationEndDate);

const uniformRmd = calculateSepp({
  ...rmdBaseInput,
  method: "required-minimum-distribution",
  lifeExpectancyTable: "uniform-lifetime",
});
assert(uniformRmd.ok);
assert.equal(uniformRmd.methodFactor, 48.5);
assert.equal(uniformRmd.annualPayment, 8_247.42);

// Hand derivation: PV of $1 at each year-end for 36.2 years at 4% is
// (1 - 1.04^-36.2) / .04 = 18.9558793345; payment = $21,101.63.
const amortization = calculateSepp({
  ...baseInput,
  method: "fixed-amortization",
  interestRate: 0.04,
});
assert(amortization.ok);
assert(Math.abs(amortization.methodFactor - 18.95587933451237) < 1e-12);
assert.equal(amortization.annualPayment, 21_101.63);
assert.equal(amortization.maximumInterestRate, 0.0514);

// IRS FAQ's age-50 example says the correct Table 4 mortality probabilities
// at 4% produce factor 18.1568 and $22,030. The governing mortality table has
// not been independently transcribed, so no approximate output is permitted.
const annuitization = calculateSepp({
  ...baseInput,
  method: "fixed-annuitization",
  interestRate: 0.04,
});
assert.equal(annuitization.ok, false);
if (!annuitization.ok) {
  assert.match(
    annuitization.errors.join(" | "),
    /authoritative.*mortality table.*unavailable/i,
  );
  assert.equal("annualPayment" in annuitization, false);
  assert.equal("methodFactor" in annuitization, false);
}

// Calendar-date rule: later of the fifth payment anniversary and age 59.5.
const fiveYearsControls = calculateSepp({
  accountBalance: 100_000,
  birthDate: "1968-08-15",
  firstDistributionDate: "2024-12-01",
  distributionYear: 2024,
  lifeExpectancyTable: "single-life",
  method: "required-minimum-distribution",
});
assert(fiveYearsControls.ok);
assert.equal(fiveYearsControls.modificationEndDate, "2029-12-01");

const ageControls = calculateSepp({
  accountBalance: 100_000,
  birthDate: "1976-11-20",
  firstDistributionDate: "2026-08-31",
  distributionYear: 2026,
  lifeExpectancyTable: "single-life",
  method: "required-minimum-distribution",
});
assert(ageControls.ok);
assert.equal(ageControls.modificationEndDate, "2036-05-20");

for (const accountBalance of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
  assert.match(
    errorText(calculateSepp({
      ...rmdBaseInput,
      method: "required-minimum-distribution",
      accountBalance,
    } as never)),
    /accountBalance/,
  );
}

for (const [field, value] of [
  ["birthDate", "1973-02-29"],
  ["firstDistributionDate", "2023-02-29"],
] as const) {
  assert.match(
    errorText(calculateSepp({
      ...rmdBaseInput,
      method: "required-minimum-distribution",
      [field]: value,
    })),
    new RegExp(field),
  );
}

assert.match(
  errorText(calculateSepp({
    ...rmdBaseInput,
    method: "required-minimum-distribution",
    lifeExpectancyTable: "legacy-2002" as never,
  })),
  /unsupported lifeExpectancyTable/,
);

const jointMissingBeneficiary = calculateSepp({
  ...rmdBaseInput,
  method: "required-minimum-distribution",
  lifeExpectancyTable: "joint-and-last-survivor",
});
assert.match(errorText(jointMissingBeneficiary), /beneficiaryBirthDate is required/);

const jointUnavailable = calculateSepp({
  ...rmdBaseInput,
  method: "required-minimum-distribution",
  lifeExpectancyTable: "joint-and-last-survivor",
  beneficiaryBirthDate: "1975-01-01",
});
assert.match(errorText(jointUnavailable), /Joint and Last Survivor Table is unavailable/);

assert.match(
  errorText(calculateSepp({
    ...baseInput,
    method: "required-minimum-distribution",
  } as never)),
  /distributionYear is required/,
);

for (const distributionYear of [2022, 2023.5, 10_000]) {
  assert.match(
    errorText(calculateSepp({
      ...rmdBaseInput,
      method: "required-minimum-distribution",
      distributionYear,
    })),
    /distributionYear/,
  );
}

assert.match(
  errorText(calculateSepp({
    ...baseInput,
    method: "fixed-amortization",
    interestRate: 0.04,
    distributionYear: 2024,
  } as never)),
  /distributionYear.*only.*RMD/i,
);

assert.match(
  errorText(calculateSepp({
    accountBalance: 400_000,
    birthDate: "1971-06-15",
    firstDistributionDate: "2021-12-31",
    distributionYear: 2022,
    lifeExpectancyTable: "single-life",
    method: "required-minimum-distribution",
  })),
  /firstDistributionDate.*2022-01-01/,
);

// Notice 2022-6 may be elected for a series commencing during 2022.
const optional2022Rmd = calculateSepp({
  accountBalance: 400_000,
  birthDate: "1972-06-15",
  firstDistributionDate: "2022-01-15",
  distributionYear: 2022,
  lifeExpectancyTable: "single-life",
  method: "required-minimum-distribution",
});
assert(optional2022Rmd.ok);
assert.equal(optional2022Rmd.attainedAge, 50);
assert.equal(optional2022Rmd.methodFactor, 36.2);

// The method domain permits a 2022 election, but the static official-rate
// ledger does not contain both 2021 lookback months, so this fixed start fails
// closed for rate coverage rather than falling back to Rev. Rul. 2002-62.
const optional2022FixedError = errorText(calculateSepp({
  accountBalance: 400_000,
  birthDate: "1972-06-15",
  firstDistributionDate: "2022-01-15",
  lifeExpectancyTable: "single-life",
  method: "fixed-amortization",
  interestRate: 0.04,
}));
assert.match(optional2022FixedError, /authoritative.*rates.*not available/i);
assert.doesNotMatch(optional2022FixedError, /on or after 2022-01-01/);

assert.match(
  errorText(calculateSepp({
    accountBalance: 400_000,
    birthDate: "1971-06-15",
    firstDistributionDate: "2021-12-31",
    lifeExpectancyTable: "single-life",
    method: "fixed-amortization",
    interestRate: 0.04,
  })),
  /firstDistributionDate.*2022-01-01/,
);

for (const input of [
  {
    accountBalance: 100_000,
    birthDate: "9940-01-01",
    firstDistributionDate: "9999-01-01",
    distributionYear: 9999,
    lifeExpectancyTable: "single-life" as const,
    method: "required-minimum-distribution" as const,
  },
  {
    accountBalance: 100_000,
    birthDate: "9994-01-01",
    firstDistributionDate: "9994-01-01",
    distributionYear: 9994,
    lifeExpectancyTable: "single-life" as const,
    method: "required-minimum-distribution" as const,
  },
]) {
  assert.match(errorText(calculateSepp(input)), /supported YYYY-MM-DD range/);
}

assert.match(
  errorText(calculateSepp({
    ...baseInput,
    method: "fixed-amortization",
  })),
  /interestRate is required/,
);

assert.match(
  errorText(calculateSepp({
    ...baseInput,
    method: "fixed-amortization",
    interestRate: 0.0515,
  })),
  /exceeds.*0.0514/,
);

// Annuitization remains unavailable at the low and high ends of the supported
// life-expectancy range until the distinct mortality path is reproducibly
// verified. This prevents accidental age-specific fallback to amortization.
for (const birthDate of ["2013-06-15", "1903-06-15"]) {
  const unavailableByAge = calculateSepp({
    ...baseInput,
    birthDate,
    method: "fixed-annuitization",
    interestRate: 0.04,
  });
  assert.match(
    errorText(unavailableByAge),
    /authoritative.*mortality table.*unavailable/i,
  );
  assert.equal("annualPayment" in unavailableByAge, false);
  assert.equal("methodFactor" in unavailableByAge, false);
}

assert.equal(SEPP_EXTERNAL_REVIEW_STATUS, "pending");

// A blocked public UI must not leak a payment the core can already compute.
assert(rmd.ok);
assert.equal(rmd.annualPayment, 11_049.72);
const blockedUiModel = seppUiModel("blocked_external_review", {
  ...rmdBaseInput,
  method: "required-minimum-distribution",
});
assert.deepEqual(blockedUiModel, {
  phase: "review_pending",
  inputState: "recognized",
  exposesMethodology: true,
  exposesExampleInputs: true,
  paymentOutput: null,
  message:
    "Payment output is unavailable while independent professional validation is pending.",
});
assert.doesNotMatch(JSON.stringify(blockedUiModel), /11049\.72/);
assert.doesNotMatch(JSON.stringify(blockedUiModel), /IRS-approved calculator/i);

assert(amortization.ok);
assert.equal(amortization.annualPayment, 21_101.63);
const blockedAmortizationUi = seppUiModel("blocked_external_review", {
  ...baseInput,
  method: "fixed-amortization",
  interestRate: 0.04,
});
assert.equal(blockedAmortizationUi.phase, "review_pending");
assert.equal(blockedAmortizationUi.inputState, "recognized");
assert.equal(blockedAmortizationUi.paymentOutput, null);
assert.doesNotMatch(JSON.stringify(blockedAmortizationUi), /21101\.63/);
assert.doesNotMatch(JSON.stringify(blockedAmortizationUi), /18\.955879/);

// Classification is structural only. An otherwise-complete example that the
// core rejects for a rate-ceiling reason must stay recognized so the UI model
// cannot act as a calculateSepp oracle.
const overCeiling = calculateSepp({
  ...baseInput,
  method: "fixed-amortization",
  interestRate: 0.99,
});
assert.equal(overCeiling.ok, false);
const overCeilingUi = seppUiModel("blocked_external_review", {
  ...baseInput,
  method: "fixed-amortization",
  interestRate: 0.99,
});
assert.equal(overCeilingUi.phase, "review_pending");
assert.equal(overCeilingUi.inputState, "recognized");
assert.equal(overCeilingUi.paymentOutput, null);

// Unknown release states and malformed runtime inputs fail closed at the
// client boundary rather than inheriting an accidentally permissive default.
for (const registryStatus of ["active", "reviewed", "", null, undefined]) {
  const model = seppUiModel(registryStatus, {
    ...rmdBaseInput,
    method: "required-minimum-distribution",
  });
  assert.equal(model.phase, "unavailable");
  assert.equal(model.paymentOutput, null);
  assert.doesNotMatch(JSON.stringify(model), /11049\.72/);
}

const malformedUiModel = seppUiModel("blocked_external_review", null);
assert.equal(malformedUiModel.phase, "review_pending");
assert.equal(malformedUiModel.inputState, "invalid");
assert.equal(malformedUiModel.paymentOutput, null);

console.log("All SEPP checks passed; external review remains pending.");
