/**
 * Lightweight multi-provider event tracking.
 * Works with Vercel Analytics custom events, GA4 (gtag), and Plausible when present.
 * No-ops safely when providers are unavailable.
 */

import { CALCULATION_REGISTRY, calculationVersion } from "@/lib/calculation-registry";

export const ANALYTICS_PROP_ALLOWLIST = [
  "calculator",
  "methodology_version",
  "status",
  "validation_error",
  "action",
  "scenario_band",
  "source",
  "destination",
  "path",
  "tool",
  "step",
] as const;

type AnalyticsProperty = (typeof ANALYTICS_PROP_ALLOWLIST)[number];
type AnalyticsValue = string;

/** Finite categories prevent values smuggled into otherwise permitted keys. */
export const ANALYTICS_ALLOWED_VALUES: Record<AnalyticsProperty, readonly string[]> = {
  calculator: [
    "fire",
    "years",
    "coast",
    "barista",
    "savings-rate",
    "monte-carlo",
    "retirement-age",
    "portfolio-readiness",
    "withdrawal-guardrails",
    "healthcare-budget",
    "historical-scenarios",
    "roth-conversion",
    "sepp-72t",
  ],
  methodology_version: [...new Set(CALCULATION_REGISTRY.map((method) => method.version))],
  status: ["started", "valid_result", "complete", "on-track", "close", "needs-work"],
  validation_error: ["invalid_input", "unsupported_state", "calculation_error"],
  action: ["assumption_interaction", "methodology_open", "risk_disclosure_open"],
  scenario_band: ["under_5_years", "5_to_10_years", "over_10_years"],
  source: [
    "homepage_hero",
    "homepage_feature_card",
    "checkup_results",
    "coast_checklist",
    "sequence_guide",
  ],
  destination: ["calculators"],
  path: [
    "/calculators/fire-number",
    "/calculators/years-to-fire",
    "/calculators/coast-fire",
    "/calculators/barista-fire",
    "coast-age-table",
  ],
  tool: ["coast", "years"],
  step: ["step_2", "step_3"],
};

export type AnalyticsProps = Partial<Record<AnalyticsProperty, AnalyticsValue>>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
    va?: (event: "event", name: string, data?: Record<string, unknown>) => void;
  }
}

function isAllowedAnalyticsValue(key: AnalyticsProperty, value: unknown): value is AnalyticsValue {
  if (typeof value !== "string") return false;
  return ANALYTICS_ALLOWED_VALUES[key].includes(value);
}

/** Attach the governed calculation identity and version to a categorical event. */
export function calculationAnalyticsProps(
  calculator: string,
  props: AnalyticsProps = {},
): AnalyticsProps {
  const methodologyVersion = calculationVersion(calculator);
  return methodologyVersion === "unknown"
    ? props
    : { ...props, calculator, methodology_version: methodologyVersion };
}

/** Build a privacy-safe lifecycle event for a governed calculator. */
export function calculatorLifecycleProps(
  calculator: string,
  status: "started" | "valid_result",
): AnalyticsProps {
  return calculationAnalyticsProps(calculator, { status });
}

/** Keep event data categorical and operational; raw financial inputs never leave the client. */
export function sanitizeAnalyticsProps(props?: Record<string, unknown>): AnalyticsProps {
  if (!props) return {};
  const out: AnalyticsProps = {};
  for (const [key, value] of Object.entries(props)) {
    if (!ANALYTICS_PROP_ALLOWLIST.includes(key as AnalyticsProperty)) continue;
    const allowedKey = key as AnalyticsProperty;
    if (isAllowedAnalyticsValue(allowedKey, value)) out[allowedKey] = value;
  }
  return out;
}

/** Track a named conversion / engagement event across available providers. */
export function trackEvent(name: string, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const data = sanitizeAnalyticsProps(props);

  try {
    // Vercel Analytics custom events (when available)
    if (typeof window.va === "function") {
      window.va("event", name, data);
    }
  } catch {
    /* ignore */
  }

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, data);
    }
  } catch {
    /* ignore */
  }

  try {
    if (typeof window.plausible === "function") {
      window.plausible(name, { props: data });
    }
  } catch {
    /* ignore */
  }
}

export const AnalyticsEvents = {
  SHARE_LINK_COPY: "share_link_copy",
  CSV_EXPORT: "csv_export",
  CALCULATOR_INTERACT: "calculator_interact",
  CTA_CLICK: "cta_click",
  STRESS_TEST_RUN: "stress_test_run",
  CHECKUP_START: "checkup_start",
  CHECKUP_STEP: "checkup_step",
  CHECKUP_COMPLETE: "checkup_complete",
  PRO_INTEREST: "pro_interest",
  EMAIL_CAPTURE: "email_capture",
} as const;
