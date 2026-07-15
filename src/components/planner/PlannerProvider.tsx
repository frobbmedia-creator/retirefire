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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  PLANNER_DEFAULTS,
  stateFromSearchParams,
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

type PlannerContextValue = {
  state: PlannerState;
  setField: <K extends keyof PlannerState>(key: K, value: PlannerState[K]) => void;
  patch: (partial: Partial<PlannerState>) => void;
  reset: () => void;
  setFireStyle: (style: FireStyleId) => void;
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hydrated = useRef(false);

  const [state, setState] = useState<PlannerState>(() =>
    stateFromSearchParams(new URLSearchParams(searchParams.toString())),
  );

  // Hydrate once from URL when params change externally (back/forward)
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      setState(stateFromSearchParams(new URLSearchParams(searchParams.toString())));
      return;
    }
  }, [searchParams]);

  // Debounced URL sync
  useEffect(() => {
    if (!hydrated.current) return;
    const q = stateToQueryString(state);
    const current = searchParams.toString();
    if (q === current) return;

    const t = window.setTimeout(() => {
      const url = q ? `${pathname}?${q}` : pathname;
      router.replace(url, { scroll: false });
    }, 350);
    return () => window.clearTimeout(t);
  }, [state, pathname, router, searchParams]);

  const setField = useCallback(
    <K extends keyof PlannerState>(key: K, value: PlannerState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const patch = useCallback((partial: Partial<PlannerState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  const reset = useCallback(() => setState({ ...PLANNER_DEFAULTS }), []);

  const setFireStyle = useCallback((style: FireStyleId) => {
    const preset = FIRE_STYLES.find((s) => s.id === style);
    setState((prev) => ({
      ...prev,
      fireStyle: style,
      annualExpenses: preset ? preset.spendingHint : prev.annualExpenses,
    }));
  }, []);

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
