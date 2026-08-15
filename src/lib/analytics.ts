/**
 * Lightweight multi-provider event tracking.
 * Works with Vercel Analytics custom events, GA4 (gtag), and Plausible when present.
 * No-ops safely when providers are unavailable.
 */

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
type AnalyticsValue = string | boolean;

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
  if (typeof value === "boolean") return true;
  if (typeof value !== "string") return false;
  if (key === "methodology_version") return /^\d+\.\d+\.\d+$/.test(value);
  if (key === "path") return /^\/[a-z0-9/-]*$/.test(value);
  if (key === "step") return /^step_[1-9]$/.test(value);
  return /^[a-z][a-z0-9_-]{0,63}$/.test(value);
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
} as const;
