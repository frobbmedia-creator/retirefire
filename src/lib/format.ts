/** Format a number as USD currency (no cents for large FIRE numbers). */
export function formatCurrency(
  value: number,
  options: { compact?: boolean; cents?: boolean } = {},
): string {
  if (!Number.isFinite(value)) return "—";

  const { compact = false, cents = false } = options;

  if (compact && Math.abs(value) >= 1_000_000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: cents ? 2 : 0,
    minimumFractionDigits: cents ? 2 : 0,
  }).format(value);
}

/** Format a decimal rate as a percentage string (e.g. 0.04 → "4.0%"). */
export function formatPercent(rate: number, digits = 1): string {
  if (!Number.isFinite(rate)) return "—";
  return `${(rate * 100).toFixed(digits)}%`;
}

/** Format years with one decimal, or whole years when clean. */
export function formatYears(years: number): string {
  if (!Number.isFinite(years)) return "—";
  if (years < 0) return "0";
  if (years > 100) return "100+";
  if (Number.isInteger(years) || Math.abs(years - Math.round(years)) < 0.05) {
    return String(Math.round(years));
  }
  return years.toFixed(1);
}

/** Parse a currency-ish input string into a finite number. */
export function parseMoneyInput(raw: string): number {
  const cleaned = raw.replace(/[$,\s]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}
