"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { calculateFireNumber } from "@/lib/calculations";
import { formatCurrency } from "@/lib/format";

const inputClass =
  "mt-1.5 h-11 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 text-zinc-100 outline-none transition focus:border-emerald-500";

export function HomeQuickCalculator() {
  const [spending, setSpending] = useState(60_000);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const result = useMemo(
    () =>
      calculateFireNumber({
        annualExpenses: spending,
        withdrawalRate: withdrawalRate / 100,
      }),
    [spending, withdrawalRate],
  );

  return (
    <section
      id="calculators"
      className="scroll-mt-20 border-b border-zinc-800/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-9 sm:px-6 sm:py-12">
        <div className="grid overflow-hidden rounded-3xl border border-emerald-500/20 bg-zinc-900/50 shadow-2xl shadow-black/20 lg:grid-cols-[1fr_0.9fr]">
          <div className="p-5 sm:p-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
              Quick start
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50">
              Find your FIRE number
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
              Start with annual spending and a planning withdrawal rate. Then
              use the full calculators for timelines and stress tests.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-zinc-300">
                Annual spending
                <input
                  className={inputClass}
                  type="number"
                  min={0}
                  step={1000}
                  value={spending}
                  onChange={(event) => setSpending(Number(event.target.value))}
                />
              </label>
              <label className="text-sm font-medium text-zinc-300">
                Withdrawal rate (%)
                <input
                  className={inputClass}
                  type="number"
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={withdrawalRate}
                  onChange={(event) =>
                    setWithdrawalRate(Number(event.target.value))
                  }
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col justify-center border-t border-zinc-800 bg-zinc-950/60 p-5 sm:p-7 lg:border-l lg:border-t-0">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Illustrative target
            </p>
            <p className="mt-2 font-mono text-4xl font-semibold tracking-tight text-emerald-300 sm:text-5xl">
              {formatCurrency(result.fireNumber)}
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              {result.multiplier.toFixed(1)}× annual spending
            </p>
            <Link
              href="/calculators"
              className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Explore all calculators
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
