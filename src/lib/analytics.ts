/**
 * Lightweight multi-provider event tracking.
 * Works with Vercel Analytics custom events, GA4 (gtag), and Plausible when present.
 * No-ops safely when providers are unavailable.
 */

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

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

function cleanProps(props?: AnalyticsProps): Record<string, string | number | boolean> {
  if (!props) return {};
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined) continue;
    out[k] = v;
  }
  return out;
}

/** Track a named conversion / engagement event across available providers. */
export function trackEvent(name: string, props?: AnalyticsProps): void {
  if (typeof window === "undefined") return;
  const data = cleanProps(props);

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
} as const;
