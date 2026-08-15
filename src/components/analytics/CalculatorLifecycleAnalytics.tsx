"use client";

import { useEffect } from "react";
import {
  AnalyticsEvents,
  calculatorLifecycleProps,
  trackEvent,
} from "@/lib/analytics";

/** Emits no-value lifecycle categories for the calculators visible on a page. */
export function CalculatorLifecycleAnalytics({
  calculatorIds,
}: {
  calculatorIds: string;
}) {
  useEffect(() => {
    for (const calculator of calculatorIds.split(",")) {
      trackEvent(
        AnalyticsEvents.CALCULATOR_INTERACT,
        calculatorLifecycleProps(calculator, "started"),
      );
      trackEvent(
        AnalyticsEvents.CALCULATOR_INTERACT,
        calculatorLifecycleProps(calculator, "valid_result"),
      );
    }
  }, [calculatorIds]);

  return null;
}
