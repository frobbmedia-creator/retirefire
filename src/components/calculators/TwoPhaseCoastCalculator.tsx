"use client";

import { useMemo, useState } from "react";
import { futureValue } from "@/lib/calculations";
import { formatCurrency } from "@/lib/format";

export function TwoPhaseCoastCalculator() {
  const [portfolio, setPortfolio] = useState(250_000);
  const [contribution, setContribution] = useState(30_000);
  const [contributionYears, setContributionYears] = useState(5);
  const [coastYears, setCoastYears] = useState(20);
  const [target, setTarget] = useState(1_500_000);
  const [returnRate, setReturnRate] = useState(5);

  const result = useMemo(() => {
    const rate = returnRate / 100;
    const atCoastStart = futureValue(
      portfolio,
      contribution,
      rate,
      contributionYears,
    );
    const atRetirement = futureValue(atCoastStart, 0, rate, coastYears);
    return {
      atCoastStart,
      atRetirement,
      gap: atRetirement - target,
    };
  }, [coastYears, contribution, contributionYears, portfolio, returnRate, target]);

  const input =
    "mt-1 h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-zinc-100 outline-none focus:border-emerald-500";

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-zinc-300">
          Current invested portfolio
          <input className={input} type="number" min={0} step={5000} value={portfolio} onChange={(e) => setPortfolio(Number(e.target.value))} />
        </label>
        <label className="text-sm text-zinc-300">
          Annual contribution during phase 1
          <input className={input} type="number" min={0} step={1000} value={contribution} onChange={(e) => setContribution(Number(e.target.value))} />
        </label>
        <label className="text-sm text-zinc-300">
          Contribution years
          <input className={input} type="number" min={0} max={60} value={contributionYears} onChange={(e) => setContributionYears(Number(e.target.value))} />
        </label>
        <label className="text-sm text-zinc-300">
          Coast years with no contributions
          <input className={input} type="number" min={0} max={60} value={coastYears} onChange={(e) => setCoastYears(Number(e.target.value))} />
        </label>
        <label className="text-sm text-zinc-300">
          Future FIRE target
          <input className={input} type="number" min={0} step={10000} value={target} onChange={(e) => setTarget(Number(e.target.value))} />
        </label>
        <label className="text-sm text-zinc-300">
          Illustrative real return (%)
          <input className={input} type="number" min={-20} max={20} step={0.1} value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Result label="At coast start" value={formatCurrency(result.atCoastStart)} />
        <Result label="At retirement" value={formatCurrency(result.atRetirement)} accent />
        <Result
          label={result.gap >= 0 ? "Illustrative surplus" : "Illustrative shortfall"}
          value={formatCurrency(Math.abs(result.gap))}
        />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        Constant real-return illustration with end-of-year contributions. No
        taxes, fees, market sequence, contribution changes, or withdrawals.
      </p>
    </section>
  );
}

function Result({
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
      <p className={`mt-1 text-xl font-semibold ${accent ? "text-emerald-300" : "text-zinc-50"}`}>
        {value}
      </p>
    </div>
  );
}
