"use client";

import { useEffect, useRef } from "react";
import {
  AnalyticsEvents,
  calculatorLifecycleProps,
  trackEvent,
} from "@/lib/analytics";
import {
  createCalculatorLifecycleSession,
} from "@/lib/calculator-lifecycle";
import { usePlanner } from "@/components/planner/PlannerProvider";

/** Emits no-value lifecycle categories for the calculators visible on a page. */
export function CalculatorLifecycleAnalytics({
  calculatorIds,
}: {
  calculatorIds: string;
}) {
  const { plannerMutation, state, realReturn, fire, years, coast, barista } = usePlanner();
  const lifecycle = useRef(createCalculatorLifecycleSession());

  useEffect(() => {
    const calculatorResults = { state, realReturn, fire, years, coast, barista };
    for (const event of lifecycle.current.record(
      plannerMutation,
      calculatorIds.split(","),
      calculatorResults,
    )) {
      trackEvent(
        AnalyticsEvents.CALCULATOR_INTERACT,
        calculatorLifecycleProps(event.calculator, event.status),
      );
    }
  }, [barista, calculatorIds, coast, fire, plannerMutation, realReturn, state, years]);

  return null;
}
