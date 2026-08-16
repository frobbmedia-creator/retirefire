import { formatCurrency, formatPercent, formatYears } from "@/lib/format";
import type { ScenarioMetrics } from "@/lib/scenario-metrics";

export type CompareDirection = "up" | "down" | "flat" | "changed";

export type CompareRow = {
  label: string;
  a: string;
  b: string;
  delta: string;
  direction: CompareDirection;
};

export function buildCompareRows(a: ScenarioMetrics, b: ScenarioMetrics): CompareRow[] {
  return [
    moneyRow("Annual spending", a.annualExpenses, b.annualExpenses),
    moneyRow("Portfolio", a.currentPortfolio, b.currentPortfolio),
    moneyRow("Annual savings", a.annualContribution, b.annualContribution),
    moneyRow("Part-time income", a.partTimeIncome, b.partTimeIncome),
    rateRow("Withdrawal rate", a.withdrawalRate, b.withdrawalRate),
    rateRow("Real return", a.realReturn, b.realReturn),
    moneyRow("FIRE number", a.fireNumber, b.fireNumber),
    yearsRow(a, b),
    moneyRow("Coast number", a.coastNumber, b.coastNumber),
    moneyRow("Barista number", a.baristaNumber, b.baristaNumber),
    boolRow("Already coasting?", a.alreadyCoast, b.alreadyCoast),
  ];
}

export function moneyRow(label: string, a: number, b: number): CompareRow {
  const delta = b - a;
  return {
    label,
    a: formatCurrency(a),
    b: formatCurrency(b),
    delta: Math.abs(delta) < 0.5 ? "Unchanged" : signedMoney(delta),
    direction: directionFromDelta(delta, 0.5),
  };
}

export function rateRow(label: string, a: number, b: number): CompareRow {
  const delta = b - a;
  return {
    label,
    a: formatPercent(a),
    b: formatPercent(b),
    delta:
      Math.abs(delta) < 0.0005
        ? "Unchanged"
        : `${delta > 0 ? "+" : ""}${formatPercent(delta)}`,
    direction: directionFromDelta(delta, 0.0005),
  };
}

export function yearsRow(a: ScenarioMetrics, b: ScenarioMetrics): CompareRow {
  const aYears = a.yearsToFire;
  const bYears = b.yearsToFire;
  const comparable =
    aYears != null &&
    bYears != null &&
    !a.yearsUnreachable &&
    !b.yearsUnreachable;
  if (!comparable || aYears == null || bYears == null) {
    return {
      label: "Years to FIRE",
      a: yearsLabel(a),
      b: yearsLabel(b),
      delta: "Not comparable",
      direction: "flat",
    };
  }
  const delta = bYears - aYears;
  return {
    label: "Years to FIRE",
    a: yearsLabel(a),
    b: yearsLabel(b),
    delta:
      Math.abs(delta) < 0.05
        ? "Unchanged"
        : `${delta > 0 ? "+" : ""}${formatYears(delta)} yrs`,
    direction: directionFromDelta(delta, 0.05),
  };
}

export function boolRow(label: string, a: boolean, b: boolean): CompareRow {
  return {
    label,
    a: a ? "Yes" : "No",
    b: b ? "Yes" : "No",
    delta: a === b ? "Unchanged" : b ? "Now yes" : "Now no",
    direction: a === b ? "flat" : "changed",
  };
}

export function yearsLabel(m: ScenarioMetrics): string {
  if (m.alreadyAtFire) return "0";
  if (m.yearsUnreachable || m.yearsToFire == null) return "—";
  return formatYears(m.yearsToFire);
}

export function signedMoney(n: number): string {
  return `${n > 0 ? "+" : ""}${formatCurrency(n)}`;
}

export function directionFromDelta(delta: number, epsilon: number): CompareDirection {
  if (Math.abs(delta) < epsilon) return "flat";
  return delta > 0 ? "up" : "down";
}

export function compareSummary(a: ScenarioMetrics, b: ScenarioMetrics): string {
  const fireDelta = b.fireNumber - a.fireNumber;
  const firePart =
    Math.abs(fireDelta) < 0.5
      ? `FIRE number is unchanged at ${formatCurrency(b.fireNumber)}.`
      : `FIRE number moved from ${formatCurrency(a.fireNumber)} to ${formatCurrency(b.fireNumber)} (${signedMoney(fireDelta)}).`;
  const yearsPart = `Years to FIRE moved from ${yearsLabel(a)} to ${yearsLabel(b)}.`;
  return `${firePart} ${yearsPart} Same formulas as the calculators above — educational ranges, not forecasts.`;
}

export function deltaBadgeText(direction: CompareDirection, label: string): string {
  if (label === "Unchanged") return "Unchanged";
  if (direction === "up") return `Higher: ${label}`;
  if (direction === "down") return `Lower: ${label}`;
  return label;
}
