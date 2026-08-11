"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";

export function IncomeGapCalculator() {
  const [spending, setSpending] = useState(72_000);
  const [socialSecurity, setSocialSecurity] = useState(30_000);
  const [pension, setPension] = useState(0);
  const [withdrawalRate, setWithdrawalRate] = useState(4);

  const result = useMemo(() => {
    const gap = Math.max(0, spending - socialSecurity - pension);
    const rate = Math.max(0.1, withdrawalRate) / 100;
    return {
      gap,
      target: gap / rate,
    };
  }, [pension, socialSecurity, spending, withdrawalRate]);

  const fieldClass =
    "mt-1 h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-zinc-100 outline-none transition focus:border-emerald-500";

  return (
    <section
      className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 sm:p-6"
      aria-labelledby="income-gap-calculator-title"
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
          Interactive estimate
        </p>
        <h2
          id="income-gap-calculator-title"
          className="mt-2 text-xl font-semibold text-zinc-50"
        >
          Later-income gap calculator
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Estimate the portfolio target after Social Security or pension income
          begins. Fund the years before those payments separately.
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-zinc-300">
          Annual spending
          <input
            className={fieldClass}
            type="number"
            min={0}
            step={1000}
            value={spending}
            onChange={(event) => setSpending(Number(event.target.value))}
          />
        </label>
        <label className="text-sm text-zinc-300">
          Annual Social Security
          <input
            className={fieldClass}
            type="number"
            min={0}
            step={1000}
            value={socialSecurity}
            onChange={(event) => setSocialSecurity(Number(event.target.value))}
          />
        </label>
        <label className="text-sm text-zinc-300">
          Annual pension / other reliable income
          <input
            className={fieldClass}
            type="number"
            min={0}
            step={1000}
            value={pension}
            onChange={(event) => setPension(Number(event.target.value))}
          />
        </label>
        <label className="text-sm text-zinc-300">
          Planning withdrawal rate (%)
          <input
            className={fieldClass}
            type="number"
            min={0.1}
            max={10}
            step={0.1}
            value={withdrawalRate}
            onChange={(event) => setWithdrawalRate(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
          <p className="text-xs text-zinc-500">Later annual portfolio gap</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-50">
            {formatCurrency(result.gap)}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-zinc-950/70 p-4">
          <p className="text-xs text-zinc-500">
            Target after this income begins
          </p>
          <p className="mt-1 text-2xl font-semibold text-emerald-300">
            {formatCurrency(result.target)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        Simple estimate only. It does not include the years before benefits
        begin, taxes, benefit changes, survivor benefits, fees, or market ups
        and downs.
      </p>
    </section>
  );
}
