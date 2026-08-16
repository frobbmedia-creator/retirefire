export const SEPP_RATE_SOURCE_CURRENT = Object.freeze({
  title: "Section 7520 interest rates",
  url: "https://www.irs.gov/businesses/small-businesses-self-employed/section-7520-interest-rates",
  lastReviewed: "2026-08-15",
});

export const SEPP_RATE_SOURCE_PRIOR = Object.freeze({
  title: "Section 7520 interest rates for prior years",
  url: "https://www.irs.gov/businesses/small-businesses-self-employed/section-7520-interest-rates-for-prior-years",
  lastReviewed: "2026-08-15",
});

export type SeppRateEntry = Readonly<{
  month: string;
  annualRate: number;
  revenueRuling: string;
  sourceTitle: string;
  sourceUrl: string;
}>;

function priorRate(
  month: string,
  ratePercent: number,
  revenueRuling: string,
): SeppRateEntry {
  return Object.freeze({
    month,
    annualRate: Math.round(ratePercent * 100) / 10_000,
    revenueRuling,
    sourceTitle: SEPP_RATE_SOURCE_PRIOR.title,
    sourceUrl: SEPP_RATE_SOURCE_PRIOR.url,
  });
}

function currentRate(
  month: string,
  ratePercent: number,
  revenueRuling: string,
): SeppRateEntry {
  return Object.freeze({
    month,
    annualRate: Math.round(ratePercent * 100) / 10_000,
    revenueRuling,
    sourceTitle: SEPP_RATE_SOURCE_CURRENT.title,
    sourceUrl: SEPP_RATE_SOURCE_CURRENT.url,
  });
}

/**
 * Annual-compounding 120% federal mid-term rates, not rounded §7520 rates.
 *
 * The official IRS pages above identify every value and revenue ruling. The
 * range begins with the two lookback months needed for a January 2023 SoSEPP,
 * when Notice 2022-6 became mandatory, and ends at the latest published month
 * verified on 2026-08-15.
 */
export const SEPP_120_PERCENT_MIDTERM_RATES = Object.freeze([
  priorRate("2022-11", 4.78, "Rev. Rul. 2022-20"),
  priorRate("2022-12", 5.14, "Rev. Rul. 2022-22"),
  priorRate("2023-01", 4.62, "Rev. Rul. 2023-1"),
  priorRate("2023-02", 4.59, "Rev. Rul. 2023-3"),
  priorRate("2023-03", 4.45, "Rev. Rul. 2023-5"),
  priorRate("2023-04", 4.99, "Rev. Rul. 2023-6"),
  priorRate("2023-05", 4.3, "Rev. Rul. 2023-9"),
  priorRate("2023-06", 4.28, "Rev. Rul. 2023-10"),
  priorRate("2023-07", 4.62, "Rev. Rul. 2023-12"),
  priorRate("2023-08", 4.92, "Rev. Rul. 2023-13"),
  priorRate("2023-09", 5.04, "Rev. Rul. 2023-16"),
  priorRate("2023-10", 5.33, "Rev. Rul. 2023-18"),
  priorRate("2023-11", 5.65, "Rev. Rul. 2023-20"),
  priorRate("2023-12", 5.79, "Rev. Rul. 2023-21"),
  priorRate("2024-01", 5.25, "Rev. Rul. 2024-2"),
  priorRate("2024-02", 4.79, "Rev. Rul. 2024-3"),
  priorRate("2024-03", 4.97, "Rev. Rul. 2024-4"),
  priorRate("2024-04", 5.17, "Rev. Rul. 2024-7"),
  priorRate("2024-05", 5.31, "Rev. Rul. 2024-9"),
  priorRate("2024-06", 5.61, "Rev. Rul. 2024-12"),
  priorRate("2024-07", 5.4, "Rev. Rul. 2024-13"),
  priorRate("2024-08", 5.22, "Rev. Rul. 2024-15"),
  priorRate("2024-09", 4.84, "Rev. Rul. 2024-17"),
  priorRate("2024-10", 4.45, "Rev. Rul. 2024-21"),
  priorRate("2024-11", 4.45, "Rev. Rul. 2024-24"),
  priorRate("2024-12", 5.03, "Rev. Rul. 2024-26"),
  priorRate("2025-01", 5.1, "Rev. Rul. 2025-1"),
  priorRate("2025-02", 5.43, "Rev. Rul. 2025-5"),
  priorRate("2025-03", 5.36, "Rev. Rul. 2025-6"),
  priorRate("2025-04", 5.06, "Rev. Rul. 2025-8"),
  priorRate("2025-05", 4.93, "Rev. Rul. 2025-10"),
  priorRate("2025-06", 4.9, "Rev. Rul. 2025-12"),
  priorRate("2025-07", 5.04, "Rev. Rul. 2025-13"),
  priorRate("2025-08", 4.88, "Rev. Rul. 2025-14"),
  priorRate("2025-09", 4.86, "Rev. Rul. 2025-17"),
  priorRate("2025-10", 4.65, "Rev. Rul. 2025-19"),
  priorRate("2025-11", 4.6, "Rev. Rul. 2025-21"),
  priorRate("2025-12", 4.55, "Rev. Rul. 2025-24"),
  currentRate("2026-01", 4.57, "Rev. Rul. 2026-2"),
  currentRate("2026-02", 4.63, "Rev. Rul. 2026-3"),
  currentRate("2026-03", 4.72, "Rev. Rul. 2026-6"),
  currentRate("2026-04", 4.59, "Rev. Rul. 2026-7"),
  currentRate("2026-05", 4.91, "Rev. Rul. 2026-9"),
  currentRate("2026-06", 4.97, "Rev. Rul. 2026-11"),
  currentRate("2026-07", 5.23, "Rev. Rul. 2026-12"),
  currentRate("2026-08", 5.23, "Rev. Rul. 2026-13"),
] as const satisfies readonly SeppRateEntry[]);

export const SEPP_RATE_TABLE_INTEGRITY = Object.freeze({
  firstMonth: SEPP_120_PERCENT_MIDTERM_RATES[0].month,
  lastMonth:
    SEPP_120_PERCENT_MIDTERM_RATES[
      SEPP_120_PERCENT_MIDTERM_RATES.length - 1
    ].month,
  entryCount: SEPP_120_PERCENT_MIDTERM_RATES.length,
  checksumBasisPoints: SEPP_120_PERCENT_MIDTERM_RATES.reduce(
    (total, entry) => total + Math.round(entry.annualRate * 10_000),
    0,
  ),
});

const RATES_BY_MONTH = new Map(
  SEPP_120_PERCENT_MIDTERM_RATES.map((entry) => [entry.month, entry]),
);

export type SeppRateResult =
  | Readonly<{
      ok: false;
      firstDistributionMonth: string;
      errors: readonly string[];
      statutoryFloor: 0.05;
    }>
  | Readonly<{
      ok: true;
      firstDistributionMonth: string;
      lookbackRates: readonly [SeppRateEntry, SeppRateEntry];
      statutoryFloor: 0.05;
      maximumAnnualRate: number;
      selectedBasis: string;
    }>;

const MONTH_PATTERN = /^(\d{4})-(\d{2})$/;

function previousMonth(month: string, offset: number): string {
  const [yearText, monthText] = month.split("-");
  const date = new Date(Date.UTC(Number(yearText), Number(monthText) - 1 - offset, 1));
  return date.toISOString().slice(0, 7);
}

/** Select the Notice 2022-6 maximum for a first-payment calendar month. */
export function getSeppMaximumRate(firstDistributionMonth: string): SeppRateResult {
  const match = MONTH_PATTERN.exec(firstDistributionMonth);
  if (!match || Number(match[2]) < 1 || Number(match[2]) > 12) {
    return {
      ok: false,
      firstDistributionMonth,
      errors: ["firstDistributionMonth must be a valid YYYY-MM calendar month"],
      statutoryFloor: 0.05,
    };
  }

  const months = [
    previousMonth(firstDistributionMonth, 2),
    previousMonth(firstDistributionMonth, 1),
  ] as const;
  const olderRate = RATES_BY_MONTH.get(months[0]);
  const newerRate = RATES_BY_MONTH.get(months[1]);
  if (!olderRate || !newerRate) {
    return {
      ok: false,
      firstDistributionMonth,
      errors: [
        `authoritative 120% federal mid-term rates are not available for both lookback months ${months.join(" and ")}`,
      ],
      statutoryFloor: 0.05,
    };
  }

  const maximumAnnualRate = Math.max(
    0.05,
    olderRate.annualRate,
    newerRate.annualRate,
  );
  const selectedRate =
    newerRate.annualRate === maximumAnnualRate
      ? newerRate
      : olderRate.annualRate === maximumAnnualRate
        ? olderRate
        : null;

  return {
    ok: true,
    firstDistributionMonth,
    lookbackRates: [olderRate, newerRate],
    statutoryFloor: 0.05,
    maximumAnnualRate,
    selectedBasis: selectedRate
      ? `${selectedRate.month} 120% federal mid-term rate`
      : "Notice 2022-6 5% floor",
  };
}
