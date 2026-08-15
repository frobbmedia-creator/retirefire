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
  nextReviewTrigger: string;
  sources: readonly CalculationSource[];
};

const FPA_WITHDRAWAL_RATES =
  "https://www.financialplanningassociation.org/article/journal/FEB15-determining-withdrawal-rates-using-historical-data";
const SEC_COMPOUND_INTEREST =
  "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator";
const FINRA_MONTE_CARLO =
  "https://www.finra.org/investors/insights/monte-carlo-simulations";
const IRS_ROTH = "https://www.irs.gov/publications/p590a";
const IRS_SEPP = "https://www.irs.gov/retirement-plans/substantially-equal-periodic-payments";

export const CALCULATION_REGISTRY: readonly CalculationMethod[] = [
  {
    id: "fire",
    name: "FIRE number",
    version: "1.0.0",
    status: "active",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    nextReviewTrigger: "When withdrawal-rate methodology changes",
    sources: [{ label: "Bengen withdrawal-rate research", href: FPA_WITHDRAWAL_RATES }],
  },
  {
    id: "years",
    name: "Years to FIRE",
    version: "1.0.0",
    status: "active",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    nextReviewTrigger: "Annual methodology review",
    sources: [{ label: "SEC compound-interest calculator", href: SEC_COMPOUND_INTEREST }],
  },
  {
    id: "coast",
    name: "Coast FIRE",
    version: "1.0.0",
    status: "active",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    nextReviewTrigger: "Annual methodology review",
    sources: [{ label: "SEC compound-interest calculator", href: SEC_COMPOUND_INTEREST }],
  },
  {
    id: "barista",
    name: "Barista FIRE",
    version: "1.0.0",
    status: "active",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    nextReviewTrigger: "When withdrawal-rate methodology changes",
    sources: [{ label: "Bengen withdrawal-rate research", href: FPA_WITHDRAWAL_RATES }],
  },
  {
    id: "savings-rate",
    name: "Savings-rate table",
    version: "1.0.0",
    status: "active",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    nextReviewTrigger: "Annual methodology review",
    sources: [{ label: "SEC compound-interest calculator", href: SEC_COMPOUND_INTEREST }],
  },
  {
    id: "monte-carlo",
    name: "Monte Carlo stress test",
    version: "1.0.0",
    status: "beta",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    nextReviewTrigger: "When the simulation model or assumptions change",
    sources: [{ label: "FINRA Monte Carlo overview", href: FINRA_MONTE_CARLO }],
  },
  {
    id: "retirement-age",
    name: "Retirement age estimate",
    version: "1.0.0",
    status: "development",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    nextReviewTrigger: "When planning-tool assumptions change",
    sources: [{ label: "SEC compound-interest calculator", href: SEC_COMPOUND_INTEREST }],
  },
  {
    id: "portfolio-readiness",
    name: "Portfolio readiness",
    version: "1.0.0",
    status: "development",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    nextReviewTrigger: "When planning-tool assumptions change",
    sources: [{ label: "Bengen withdrawal-rate research", href: FPA_WITHDRAWAL_RATES }],
  },
  {
    id: "withdrawal-guardrails",
    name: "Withdrawal guardrails",
    version: "1.0.0",
    status: "development",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    nextReviewTrigger: "When planning-tool assumptions change",
    sources: [{ label: "Bengen withdrawal-rate research", href: FPA_WITHDRAWAL_RATES }],
  },
  {
    id: "healthcare-budget",
    name: "Healthcare budget",
    version: "1.0.0",
    status: "development",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    nextReviewTrigger: "When planning-tool assumptions change",
    sources: [{ label: "SEC compound-interest calculator", href: SEC_COMPOUND_INTEREST }],
  },
  {
    id: "historical-scenarios",
    name: "Historical retirement scenarios",
    version: "0.1.0",
    status: "development",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    nextReviewTrigger: "When verified historical data is added or transformed",
    sources: [{ label: "Bengen withdrawal-rate research", href: FPA_WITHDRAWAL_RATES }],
  },
  {
    id: "roth-conversion",
    name: "Roth conversion estimate",
    version: "0.1.0",
    status: "development",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    nextReviewTrigger: "Annually and when federal tax law changes",
    sources: [{ label: "IRS Publication 590-A", href: IRS_ROTH }],
  },
  {
    id: "sepp-72t",
    name: "72(t) SEPP",
    version: "0.1.0",
    status: "blocked_external_review",
    effectiveDate: "2026-08-15",
    lastReviewed: "2026-08-15",
    nextReviewTrigger: "When Notice 2022-6 implementation receives external review",
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
    if (!method.nextReviewTrigger.trim()) {
      issues.push(`${method.id}: next review trigger is required`);
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
