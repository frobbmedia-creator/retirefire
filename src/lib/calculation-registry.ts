export const CALCULATION_STATUSES = [
  "active",
  "beta",
  "development",
  "blocked_external_review",
] as const;

export type CalculationStatus = (typeof CALCULATION_STATUSES)[number];

export type CalculationSource = {
  label: string;
  href: string;
};

export type CalculationMethod = {
  id: string;
  name: string;
  version: string;
  status: CalculationStatus;
  effectiveDate: string;
  lastReviewed: string;
  reviewCadence: string;
  nextReviewTrigger: string;
  assumptions: readonly string[];
  exclusions: readonly string[];
  sources: readonly CalculationSource[];
};

const FPA_WITHDRAWAL_RATES =
  "https://www.financialplanningassociation.org/article/journal/FEB15-determining-withdrawal-rates-using-historical-data";
const SEC_COMPOUND_INTEREST =
  "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator";
const FINRA_MONTE_CARLO =
  "https://www.finra.org/investors/insights/monte-carlo-simulations";
const IRS_ROTH = "https://www.irs.gov/publications/p590a";
const IRS_2026_TAX = "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf";
const IRS_SEPP = "https://www.irs.gov/retirement-plans/substantially-equal-periodic-payments";

export const CALCULATION_REGISTRY: readonly CalculationMethod[] = [
  {
    id: "fire",
    name: "FIRE number",
    version: "1.0.0",
    status: "active",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    reviewCadence: "Annual",
    nextReviewTrigger: "When withdrawal-rate methodology changes",
    assumptions: ["Annual spending is in today’s dollars", "The chosen withdrawal rate is a planning input"],
    exclusions: ["Taxes", "Investment fees", "Changing retirement spending"],
    sources: [{ label: "Bengen withdrawal-rate research", href: FPA_WITHDRAWAL_RATES }],
  },
  {
    id: "years",
    name: "Years to FIRE",
    version: "1.0.0",
    status: "active",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    reviewCadence: "Annual",
    nextReviewTrigger: "Annual methodology review",
    assumptions: ["Constant real return", "End-of-year contributions"],
    exclusions: ["Market volatility", "Income changes", "Tax-account timing"],
    sources: [{ label: "SEC compound-interest calculator", href: SEC_COMPOUND_INTEREST }],
  },
  {
    id: "coast",
    name: "Coast FIRE",
    version: "1.0.0",
    status: "active",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    reviewCadence: "Annual",
    nextReviewTrigger: "Annual methodology review",
    assumptions: ["No future retirement contributions", "Constant real return to retirement age"],
    exclusions: ["Healthcare costs", "Social Security", "Sequence risk"],
    sources: [{ label: "SEC compound-interest calculator", href: SEC_COMPOUND_INTEREST }],
  },
  {
    id: "barista",
    name: "Barista FIRE",
    version: "1.0.0",
    status: "active",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    reviewCadence: "Annual",
    nextReviewTrigger: "When withdrawal-rate methodology changes",
    assumptions: ["Work income offsets annual expenses", "The remaining gap uses the chosen withdrawal rate"],
    exclusions: ["Job stability", "Benefits", "Taxes"],
    sources: [{ label: "Bengen withdrawal-rate research", href: FPA_WITHDRAWAL_RATES }],
  },
  {
    id: "savings-rate",
    name: "Savings-rate table",
    version: "1.0.0",
    status: "active",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    reviewCadence: "Annual",
    nextReviewTrigger: "Annual methodology review",
    assumptions: ["Spending remains fixed", "Savings rate determines income and annual savings"],
    exclusions: ["Income volatility", "Taxes", "Investment fees"],
    sources: [{ label: "SEC compound-interest calculator", href: SEC_COMPOUND_INTEREST }],
  },
  {
    id: "monte-carlo",
    name: "Monte Carlo stress test",
    version: "1.0.0",
    status: "beta",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    reviewCadence: "Quarterly during beta; annual after validation",
    nextReviewTrigger: "When the simulation model or assumptions change",
    assumptions: ["Independent annual return shocks", "Fixed volatility preset", "End-of-year contributions"],
    exclusions: ["Historical backtesting", "Tax effects", "Forecasting"],
    sources: [{ label: "FINRA Monte Carlo overview", href: FINRA_MONTE_CARLO }],
  },
  {
    id: "retirement-age",
    name: "Retirement age estimate",
    version: "1.0.0",
    status: "development",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    reviewCadence: "Annual",
    nextReviewTrigger: "When planning-tool assumptions change",
    assumptions: ["Constant real return", "A FIRE target based on annual spending"],
    exclusions: ["Career changes", "Taxes", "Market volatility"],
    sources: [{ label: "SEC compound-interest calculator", href: SEC_COMPOUND_INTEREST }],
  },
  {
    id: "portfolio-readiness",
    name: "Portfolio readiness",
    version: "1.0.0",
    status: "development",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    reviewCadence: "Annual",
    nextReviewTrigger: "When planning-tool assumptions change",
    assumptions: ["Portfolio income uses the chosen withdrawal rate", "Income offsets annual spending"],
    exclusions: ["Taxes", "Account withdrawals", "Benefits"],
    sources: [{ label: "Bengen withdrawal-rate research", href: FPA_WITHDRAWAL_RATES }],
  },
  {
    id: "withdrawal-guardrails",
    name: "Withdrawal guardrails",
    version: "1.0.0",
    status: "development",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    reviewCadence: "Annual",
    nextReviewTrigger: "When planning-tool assumptions change",
    assumptions: ["Guardrails apply to a baseline withdrawal rate", "Adjustment percentages are user inputs"],
    exclusions: ["Tax effects", "Investment returns", "Personal spending flexibility"],
    sources: [{ label: "Bengen withdrawal-rate research", href: FPA_WITHDRAWAL_RATES }],
  },
  {
    id: "healthcare-budget",
    name: "Healthcare budget",
    version: "1.0.0",
    status: "development",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    reviewCadence: "Annual",
    nextReviewTrigger: "When planning-tool assumptions change",
    assumptions: ["Initial health costs grow at the selected medical-inflation rate", "Medicare timing is user supplied"],
    exclusions: ["ACA subsidies", "Coverage changes", "Individual medical needs"],
    sources: [{ label: "SEC compound-interest calculator", href: SEC_COMPOUND_INTEREST }],
  },
  {
    id: "historical-scenarios",
    name: "Historical retirement scenarios",
    version: "0.1.0",
    status: "development",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    reviewCadence: "Annual while in development",
    nextReviewTrigger: "When verified historical data is added or transformed",
    assumptions: ["Only verified source data may be used", "Withdrawal timing is documented with the dataset"],
    exclusions: ["Unverified datasets", "Future outcome probabilities", "Tax modeling"],
    sources: [{ label: "Bengen withdrawal-rate research", href: FPA_WITHDRAWAL_RATES }],
  },
  {
    id: "roth-conversion",
    name: "Roth conversion estimate",
    version: "1.0.0",
    status: "active",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    reviewCadence: "Annual and when federal tax law changes",
    nextReviewTrigger: "When IRS guidance or tax-year parameters change",
    assumptions: [
      "2026 ordinary-income brackets apply progressively",
      "Current taxable income is already after standard or itemized deductions",
      "The applied conversion is fully taxable and cannot exceed the traditional balance",
    ],
    exclusions: [
      "State and local income taxes",
      "Alternative minimum tax and net investment income tax",
      "Tax credits and changes to deductions",
      "Capital gains and qualified-dividend interactions",
      "ACA premium tax credits and Medicare IRMAA",
      "Future tax-law changes and multiyear optimization",
      "Withholding, estimated-tax penalties, and conversion opportunity cost",
    ],
    sources: [
      {
        label: "Revenue Procedure 2025-32",
        href: IRS_2026_TAX,
      },
      { label: "IRS Publication 590-A", href: IRS_ROTH },
    ],
  },
  {
    id: "sepp-72t",
    name: "72(t) SEPP",
    version: "0.1.0",
    status: "blocked_external_review",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    reviewCadence: "Annual and when IRS guidance changes",
    nextReviewTrigger: "When Notice 2022-6 implementation receives external review",
    assumptions: ["IRS Notice 2022-6 is the governing method", "External professional review is required"],
    exclusions: ["Actionable payment guidance before review", "Individual tax advice", "Automatic rate retrieval"],
    sources: [{ label: "IRS SEPP guidance", href: IRS_SEPP }],
  },
] as const;

const SEMANTIC_VERSION = /^\d+\.\d+\.\d+$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

/** Return registry issues so tests and future release checks can reject invalid metadata. */
export function validateCalculationRegistry(methods: readonly CalculationMethod[]): string[] {
  const issues: string[] = [];
  const ids = new Set<string>();

  for (const method of methods) {
    if (ids.has(method.id)) issues.push(`duplicate id: ${method.id}`);
    ids.add(method.id);
    if (!SEMANTIC_VERSION.test(method.version)) {
      issues.push(`${method.id}: version must be a semantic version`);
    }
    if (!CALCULATION_STATUSES.includes(method.status)) {
      issues.push(`${method.id}: status must be explicit and supported`);
    }
    if (!isIsoDate(method.effectiveDate) || !isIsoDate(method.lastReviewed)) {
      issues.push(`${method.id}: effective and review dates must be ISO dates`);
    }
    if (!method.reviewCadence?.trim()) {
      issues.push(`${method.id}: review cadence is required`);
    }
    if (!method.nextReviewTrigger.trim()) {
      issues.push(`${method.id}: next review trigger is required`);
    }
    if (method.reviewCadence === method.nextReviewTrigger) {
      issues.push(`${method.id}: review cadence must differ from next review trigger`);
    }
    if (!method.assumptions?.some((assumption) => assumption.trim())) {
      issues.push(`${method.id}: at least one assumption is required`);
    }
    if (!method.exclusions?.some((exclusion) => exclusion.trim())) {
      issues.push(`${method.id}: at least one exclusion is required`);
    }
    if (method.sources.length === 0) {
      issues.push(`${method.id}: at least one HTTPS source is required`);
    }
    for (const source of method.sources) {
      if (!source.href.startsWith("https://")) {
        issues.push(`${method.id}: source must use HTTPS`);
      }
    }
  }

  return issues;
}

/** Return a stable methodology version without coupling consumers to registry storage. */
export function calculationVersion(id: string): string {
  return CALCULATION_REGISTRY.find((method) => method.id === id)?.version ?? "unknown";
}
