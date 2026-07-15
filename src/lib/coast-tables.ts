/**
 * Age-by-age Coast FIRE tables — pure helpers for UI + content.
 * coast = fireNumber / (1+r)^years, years = retirementAge - currentAge
 */

export type CoastAgeRow = {
  age: number;
  yearsToRetirement: number;
  /** Coast number at the primary real return */
  coastNumber: number;
  /** Optional secondary return for side-by-side stress */
  coastNumberAlt?: number;
};

export type CoastAgeTableInput = {
  fireNumber: number;
  retirementAge: number;
  realReturn: number;
  /** Optional second return column (e.g. stress 4% when primary is 5%) */
  altRealReturn?: number;
  /** Inclusive start age */
  ageFrom?: number;
  /** Inclusive end age */
  ageTo?: number;
  /** Step between ages */
  ageStep?: number;
};

/**
 * Build a coast-number table across ages for a fixed FIRE target and horizon age.
 */
export function buildCoastAgeTable(input: CoastAgeTableInput): CoastAgeRow[] {
  const fire = Math.max(0, input.fireNumber);
  const retireAge = input.retirementAge;
  const r = input.realReturn;
  const alt = input.altRealReturn;
  const from = input.ageFrom ?? 25;
  const to = input.ageTo ?? 55;
  const step = Math.max(1, input.ageStep ?? 5);

  const rows: CoastAgeRow[] = [];
  for (let age = from; age <= to; age += step) {
    const years = retireAge - age;
    if (years <= 0) continue;
    rows.push({
      age,
      yearsToRetirement: years,
      coastNumber: discountToPresent(fire, r, years),
      coastNumberAlt:
        alt != null ? discountToPresent(fire, alt, years) : undefined,
    });
  }
  return rows;
}

export function discountToPresent(
  futureValue: number,
  annualReturn: number,
  years: number,
): number {
  const fv = Math.max(0, futureValue);
  const n = Math.max(0, years);
  if (n === 0) return fv;
  if (Math.abs(annualReturn) < 1e-12) return fv;
  return fv / Math.pow(1 + annualReturn, n);
}

/** CSV for linkable / downloadable age tables */
export function coastAgeTableToCsv(
  rows: CoastAgeRow[],
  opts: {
    fireNumber: number;
    retirementAge: number;
    realReturn: number;
    altRealReturn?: number;
    annualSpending?: number;
    withdrawalRate?: number;
  },
): string {
  const lines: string[] = [
    "retirefire_coast_age_table",
    `exported_at,${new Date().toISOString()}`,
    "disclaimer,Educational illustration only — not financial advice",
    `fire_number,${Math.round(opts.fireNumber)}`,
    `retirement_age,${opts.retirementAge}`,
    `real_return,${opts.realReturn}`,
  ];
  if (opts.altRealReturn != null) {
    lines.push(`alt_real_return,${opts.altRealReturn}`);
  }
  if (opts.annualSpending != null) {
    lines.push(`annual_spending,${opts.annualSpending}`);
  }
  if (opts.withdrawalRate != null) {
    lines.push(`withdrawal_rate,${opts.withdrawalRate}`);
  }
  lines.push("");
  const hasAlt = rows.some((r) => r.coastNumberAlt != null);
  lines.push(
    hasAlt
      ? "age,years_to_retirement,coast_primary,coast_alt"
      : "age,years_to_retirement,coast_number",
  );
  for (const row of rows) {
    if (hasAlt) {
      lines.push(
        `${row.age},${row.yearsToRetirement},${Math.round(row.coastNumber)},${Math.round(row.coastNumberAlt ?? 0)}`,
      );
    } else {
      lines.push(
        `${row.age},${row.yearsToRetirement},${Math.round(row.coastNumber)}`,
      );
    }
  }
  return lines.join("\n") + "\n";
}
