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

// Official IRS SoSEPP example plus independently calculated cents:
// $400,000 / 36.2 = $11,049.723756..., rounded to $11,049.72.
const rmd = calculateSepp({ ...baseInput, method: "required-minimum-distribution" });
assert(rmd.ok);
assert.equal(rmd.attainedAge, 50);
assert.equal(rmd.methodFactor, 36.2);
assert.equal(rmd.annualPayment, 11_049.72);
assert.equal(rmd.interestRate, null);
assert.equal(rmd.modificationEndDate, "2032-12-15");
assert.equal(rmd.externalReviewStatus, SEPP_EXTERNAL_REVIEW_STATUS);
assert.equal(rmd.actionable, false);
assert.deepEqual(rmd.inputs, {
  ...baseInput,
  method: "required-minimum-distribution",
  beneficiaryBirthDate: null,
  interestRate: null,
});
assert(rmd.sources.some((source) => source.title === "Notice 2022-6"));
assert(rmd.warnings.some((warning) => /external professional review/i.test(warning)));

const uniformRmd = calculateSepp({
  ...baseInput,
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
  lifeExpectancyTable: "single-life",
  method: "required-minimum-distribution",
});
assert(fiveYearsControls.ok);
assert.equal(fiveYearsControls.modificationEndDate, "2029-12-01");

const ageControls = calculateSepp({
  accountBalance: 100_000,
  birthDate: "1976-11-20",
  firstDistributionDate: "2026-08-31",
  lifeExpectancyTable: "single-life",
  method: "required-minimum-distribution",
});
assert(ageControls.ok);
assert.equal(ageControls.modificationEndDate, "2036-05-20");

for (const accountBalance of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
  assert.match(
    errorText(calculateSepp({
      ...baseInput,
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
      ...baseInput,
      method: "required-minimum-distribution",
      [field]: value,
    })),
    new RegExp(field),
  );
}

assert.match(
  errorText(calculateSepp({
    ...baseInput,
    method: "required-minimum-distribution",
    lifeExpectancyTable: "legacy-2002" as never,
  })),
  /unsupported lifeExpectancyTable/,
);

const jointMissingBeneficiary = calculateSepp({
  ...baseInput,
  method: "required-minimum-distribution",
  lifeExpectancyTable: "joint-and-last-survivor",
});
assert.match(errorText(jointMissingBeneficiary), /beneficiaryBirthDate is required/);

const jointUnavailable = calculateSepp({
  ...baseInput,
  method: "required-minimum-distribution",
  lifeExpectancyTable: "joint-and-last-survivor",
  beneficiaryBirthDate: "1975-01-01",
});
assert.match(errorText(jointUnavailable), /Joint and Last Survivor Table is unavailable/);

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

console.log("All SEPP checks passed; external review remains pending.");
