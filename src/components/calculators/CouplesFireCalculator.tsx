"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";

export function CouplesFireCalculator() {
  const [spending, setSpending] = useState(90_000);
  const [portfolioA, setPortfolioA] = useState(500_000);
  const [portfolioB, setPortfolioB] = useState(300_000);
  const [incomeA, setIncomeA] = useState(20_000);
  const [incomeB, setIncomeB] = useState(15_000);
  const [rate, setRate] = useState(4);

  const result = useMemo(() => {
    const combined = Math.max(0, portfolioA) + Math.max(0, portfolioB);
    const gap = Math.max(0, spending - incomeA - incomeB);
    const target = gap / (Math.max(0.1, rate) / 100);
    return { combined, gap, target, difference: combined - target };
  }, [incomeA, incomeB, portfolioA, portfolioB, rate, spending]);

  const input =
    "mt-1 h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-zinc-100 outline-none focus:border-emerald-500";

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-zinc-300">
          Shared annual spending
          <input className={input} type="number" min={0} step={1000} value={spending} onChange={(e) => setSpending(Number(e.target.value))} />
        </label>
        <label className="text-sm text-zinc-300">
          Planning withdrawal rate (%)
          <input className={input} type="number" min={0.1} max={10} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </label>
        <label className="text-sm text-zinc-300">
          Partner A invested portfolio
          <input className={input} type="number" min={0} step={5000} value={portfolioA} onChange={(e) => setPortfolioA(Number(e.target.value))} />
        </label>
        <label className="text-sm text-zinc-300">
          Partner B invested portfolio
          <input className={input} type="number" min={0} step={5000} value={portfolioB} onChange={(e) => setPortfolioB(Number(e.target.value))} />
        </label>
        <label className="text-sm text-zinc-300">
          Partner A durable annual income
          <input className={input} type="number" min={0} step={1000} value={incomeA} onChange={(e) => setIncomeA(Number(e.target.value))} />
        </label>
        <label className="text-sm text-zinc-300">
          Partner B durable annual income
          <input className={input} type="number" min={0} step={1000} value={incomeB} onChange={(e) => setIncomeB(Number(e.target.value))} />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <CoupleResult label="Combined portfolio" value={formatCurrency(result.combined)} />
        <CoupleResult label="Annual portfolio gap" value={formatCurrency(result.gap)} />
        <CoupleResult label="Steady-state target" value={formatCurrency(result.target)} accent />
        <CoupleResult
          label={result.difference >= 0 ? "Illustrative surplus" : "Illustrative shortfall"}
          value={formatCurrency(Math.abs(result.difference))}
        />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        Steady-state household illustration. Model benefit start dates,
        healthcare, taxes, account ownership, and survivor income separately.
      </p>
    </section>
  );
}

function CoupleResult({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className={`mt-1 text-lg font-semibold ${accent ? "text-emerald-300" : "text-zinc-50"}`}>
        {value}
      </p>
    </div>
  );
}
