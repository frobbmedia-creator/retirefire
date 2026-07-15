/**
 * Default assumptions used across RetireFire calculators.
 * All rates are real (inflation-adjusted) unless noted.
 * Sources are documented on /methodology.
 */
export const DEFAULTS = {
  /** Trinity Study–style starting point; conservative users may prefer 3–3.5%. */
  withdrawalRate: 0.04,
  /** Real expected portfolio return (after inflation). */
  realReturn: 0.05,
  /** Nominal long-run stock-heavy portfolio return (illustrative). */
  nominalReturn: 0.07,
  /** Long-run inflation assumption. */
  inflation: 0.025,
  /** Traditional retirement age for Coast FIRE horizon. */
  traditionalRetirementAge: 65,
  /** Example annual spending defaults by FIRE style (USD). */
  annualSpending: {
    lean: 40_000,
    regular: 60_000,
    fat: 100_000,
  },
} as const;

export const WITHDRAWAL_PRESETS = [
  {
    id: "conservative",
    label: "3%",
    rate: 0.03,
    description: "More conservative; often preferred for early retirement horizons",
  },
  {
    id: "balanced",
    label: "3.5%",
    rate: 0.035,
    description: "Middle ground between Trinity 4% and ultra-conservative",
  },
  {
    id: "classic",
    label: "4%",
    rate: 0.04,
    description: "Classic “4% rule” / Trinity Study starting point",
  },
  {
    id: "flexible",
    label: "4.5%",
    rate: 0.045,
    description: "Higher spending; higher sequence-of-returns risk",
  },
] as const;

export const FIRE_STYLES = [
  {
    id: "lean",
    label: "Lean FIRE",
    description: "Frugal lifestyle; lower spending target",
    spendingHint: 40_000,
  },
  {
    id: "regular",
    label: "Regular FIRE",
    description: "Comfortable middle-class retirement spending",
    spendingHint: 60_000,
  },
  {
    id: "fat",
    label: "Fat FIRE",
    description: "Higher discretionary spending in retirement",
    spendingHint: 100_000,
  },
] as const;

export type FireStyleId = (typeof FIRE_STYLES)[number]["id"];

export const SITE = {
  name: "RetireFire",
  domain: "retirefire.net",
  tagline: "Evidence-based FIRE calculators",
  /** Default <title> for homepage / root layout */
  title: "Free FIRE Calculators — Number, Years, Coast & Barista",
  description:
    "Free FIRE calculators for your FIRE number, years to financial independence, Coast FIRE, and Barista FIRE. Transparent math, conservative defaults, no paywall.",
} as const;
