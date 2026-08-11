"use client";

import { useMemo, useState } from "react";
import { calculateRetirementCheckup } from "@/lib/retirement-checkup";
import { formatCurrency } from "@/lib/format";

export function ProReportBuilder() {
  const [age, setAge] = useState(45);
  const [retirementAge, setRetirementAge] = useState(65);
  const [portfolio, setPortfolio] = useState(350000);
  const [contribution, setContribution] = useState(24000);
  const [spending, setSpending] = useState(60000);
  const [income, setIncome] = useState(24000);
  const result = useMemo(
    () => calculateRetirementCheckup({ currentAge: age, retirementAge, portfolio, annualContribution: contribution, annualSpending: spending, annualRetirementIncome: income, realReturn: 0.05, withdrawalRate: 0.04 }),
    [age, retirementAge, portfolio, contribution, spending, income],
  );
  const fields = [
    ["Current age", age, setAge],
    ["Retirement age", retirementAge, setRetirementAge],
    ["Current investments", portfolio, setPortfolio],
    ["Annual contributions", contribution, setContribution],
    ["Annual retirement spending", spending, setSpending],
    ["Annual reliable income", income, setIncome],
  ] as const;
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">Detailed report</p><h2 className="mt-2 text-2xl font-semibold">Retirement readiness summary</h2></div>
        <button type="button" onClick={() => window.print()} className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950">Print or save PDF</button>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-print-hide>
        {fields.map(([label, value, setter]) => <label key={label} className="text-sm text-zinc-300">{label}<input type="number" min={0} value={value} onChange={(e) => setter(Number(e.target.value))} className="mt-2 h-11 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 text-zinc-100" /></label>)}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Metric label="Status" value={result.status.replace("-", " ")} />
        <Metric label="Estimated retirement age" value={result.estimatedRetirementAge?.toFixed(0) ?? "Not reached"} />
        <Metric label="Projected portfolio" value={formatCurrency(result.projectedPortfolio)} />
        <Metric label="Supported annual spending" value={formatCurrency(result.supportedAnnualSpending)} />
        <Metric label="Annual savings adjustment" value={formatCurrency(result.annualSavingsChange)} />
        <Metric label="Annual spending adjustment" value={formatCurrency(result.annualSpendingChange)} />
      </div>
      <div className="mt-7 rounded-2xl bg-zinc-950/60 p-5 text-sm leading-relaxed text-zinc-400"><strong className="text-zinc-200">Assumptions:</strong> 5% real growth and a 4% starting withdrawal rate. This educational report excludes taxes, fees, long-term care, account-access rules, and individualized advice.</div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-zinc-800 bg-zinc-950/55 p-4"><p className="text-xs text-zinc-500">{label}</p><p className="mt-2 text-xl font-semibold capitalize text-zinc-50">{value}</p></div>;
}
