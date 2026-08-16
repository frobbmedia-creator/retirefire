"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  loadPlannerState,
  PLANNER_DEFAULTS,
  parsePlannerSearchParams,
  resolveInitialPlannerState,
  savePlannerState,
  stateToQueryString,
  type PlannerState,
} from "@/lib/planner-state";
import {
  calculateBaristaFire,
  calculateCoastFire,
  calculateFireNumber,
  calculateYearsToFire,
  effectiveRealReturn,
  type BaristaFireResult,
  type CoastFireResult,
  type FireNumberResult,
  type YearsToFireResult,
} from "@/lib/calculations";
import { FIRE_STYLES, type FireStyleId } from "@/lib/constants";
import type {
  PlannerMutation,
  UserPlannerMutationSource,
} from "@/lib/calculator-lifecycle";

type PlannerContextValue = {
  state: PlannerState;
  setField: <K extends keyof PlannerState>(key: K, value: PlannerState[K]) => void;
  patch: (partial: Partial<PlannerState>) => void;
  reset: () => void;
  setFireStyle: (style: FireStyleId) => void;
  plannerMutation: PlannerMutation | null;
  /** Effective real return used in projections (decimal) */
  realReturn: number;
  withdrawalRate: number;
  fire: FireNumberResult;
  years: YearsToFireResult;
  coast: CoastFireResult;
  barista: BaristaFireResult;
  sharePath: string;
};

const PlannerContext = createContext<PlannerContextValue | null>(null);

export function PlannerProvider({
  children,
  sharePath = "/",
}: {
  children: ReactNode;
  sharePath?: string;
}) {
  const pathname = usePathname();
  const hydrated = useRef(false);
  const mutationSequence = useRef(0);
  const [hydrationReady, setHydrationReady] = useState(false);
  const [state, setState] = useState<PlannerState>(PLANNER_DEFAULTS);
  const [plannerMutation, setPlannerMutation] = useState<PlannerMutation | null>(null);

  const recordUserMutation = useCallback((source: UserPlannerMutationSource) => {
    mutationSequence.current += 1;
    setPlannerMutation({ sequence: mutationSequence.current, source });
  }, []);

  // Resolve URL, storage, and defaults only after the browser has hydrated.
  useEffect(() => {
    if (hydrated.current) return;
    const url = parsePlannerSearchParams(new URLSearchParams(window.location.search));
    const stored = loadPlannerState(window.localStorage);
    setState(resolveInitialPlannerState(url, stored));
    hydrated.current = true;
    setHydrationReady(true);
  }, []);

  // Browser history is an external state change; apply only valid URL scenarios.
  useEffect(() => {
    if (!hydrationReady) return;
    const updateFromHistory = () => {
      const url = parsePlannerSearchParams(new URLSearchParams(window.location.search));
      if (url.ok) setState(url.state);
    };
    window.addEventListener("popstate", updateFromHistory);
    return () => window.removeEventListener("popstate", updateFromHistory);
  }, [hydrationReady]);

  // Persist and sync the URL only after hydration. Native history avoids router replace loops.
  useEffect(() => {
    if (!hydrationReady) return;
    savePlannerState(window.localStorage, state);
    const q = stateToQueryString(state);
    const current = window.location.search.slice(1);
    if (q === current) return;

    const t = window.setTimeout(() => {
      const url = q ? `${pathname}?${q}` : pathname;
      window.history.replaceState(window.history.state, "", url);
    }, 350);
    return () => window.clearTimeout(t);
  }, [state, pathname, hydrationReady]);

  const setField = useCallback(
    <K extends keyof PlannerState>(key: K, value: PlannerState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
      recordUserMutation("field");
    },
    [recordUserMutation],
  );

  const patch = useCallback((partial: Partial<PlannerState>) => {
    setState((prev) => ({ ...prev, ...partial }));
    recordUserMutation("patch");
  }, [recordUserMutation]);

  const reset = useCallback(() => {
    setState({ ...PLANNER_DEFAULTS });
    recordUserMutation("reset");
  }, [recordUserMutation]);

  const setFireStyle = useCallback((style: FireStyleId) => {
    const preset = FIRE_STYLES.find((s) => s.id === style);
    setState((prev) => ({
      ...prev,
      fireStyle: style,
      annualExpenses: preset ? preset.spendingHint : prev.annualExpenses,
    }));
    recordUserMutation("preset");
  }, [recordUserMutation]);

  const realReturn = useMemo(
    () =>
      effectiveRealReturn(
        state.expectedReturnPct / 100,
        state.inflationPct / 100,
        state.useNominal,
      ),
    [state.expectedReturnPct, state.inflationPct, state.useNominal],
  );

  const withdrawalRate = state.withdrawalRatePct / 100;

  const fire = useMemo(
    () =>
      calculateFireNumber({
        annualExpenses: state.annualExpenses,
        withdrawalRate,
      }),
    [state.annualExpenses, withdrawalRate],
  );

  const years = useMemo(
    () =>
      calculateYearsToFire({
        currentPortfolio: state.currentPortfolio,
        annualContribution: state.annualContribution,
        annualReturn: realReturn,
        targetAmount: fire.fireNumber,
      }),
    [state.currentPortfolio, state.annualContribution, realReturn, fire.fireNumber],
  );

  const coast = useMemo(
    () =>
      calculateCoastFire({
        fireNumber: fire.fireNumber,
        currentPortfolio: state.currentPortfolio,
        currentAge: state.currentAge,
        retirementAge: state.retirementAge,
        annualReturn: realReturn,
      }),
    [
      fire.fireNumber,
      state.currentPortfolio,
      state.currentAge,
      state.retirementAge,
      realReturn,
    ],
  );

  const barista = useMemo(
    () =>
      calculateBaristaFire({
        annualExpenses: state.annualExpenses,
        partTimeIncome: state.partTimeIncome,
        withdrawalRate,
        currentPortfolio: state.currentPortfolio,
        annualContribution: state.annualContribution,
        annualReturn: realReturn,
      }),
    [
      state.annualExpenses,
      state.partTimeIncome,
      withdrawalRate,
      state.currentPortfolio,
      state.annualContribution,
      realReturn,
    ],
  );

  const value = useMemo(
    () => ({
      state,
      setField,
      patch,
      reset,
      setFireStyle,
      plannerMutation,
      realReturn,
      withdrawalRate,
      fire,
      years,
      coast,
      barista,
      sharePath,
    }),
    [
      state,
      setField,
      patch,
      reset,
      setFireStyle,
      plannerMutation,
      realReturn,
      withdrawalRate,
      fire,
      years,
      coast,
      barista,
      sharePath,
    ],
  );

  return (
    <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>
  );
}

export function usePlanner() {
  const ctx = useContext(PlannerContext);
  if (!ctx) {
    throw new Error("usePlanner must be used within PlannerProvider");
  }
  return ctx;
}
