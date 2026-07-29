"use client";

import { useMemo, useState, type ReactNode } from "react";
import { formatCurrency } from "@/lib/format";
import {
  guardrailRange,
  healthcareBudget,
  portfolioReadiness,
  retirementAgeEstimate,
  rothConversionEstimate,
} from "@/lib/planning-tools";

const inputClass =
  "mt-1 h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-zinc-100 outline-none focus:border-emerald-500";

function Field({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
}) {
  return (
    <label className="text-sm text-zinc-300">
      {label}
      <input
        className={inputClass}
        type="number"
        min={0}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function Tool({
  title,
  description,
  fields,
  results,
  note,
}: {
  title: string;
  description: string;
  fields: ReactNode;
  results: { label: string; value: string; accent?: boolean }[];
  note: string;
}) {
  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 sm:p-6">
      <h2 className="text-xl font-semibold text-zinc-50">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{fields}</div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {results.map((result) => (
          <div
            key={result.label}
            className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4"
          >
            <p className="text-xs text-zinc-500">{result.label}</p>
            <p
              className={`mt-1 text-xl font-semibold ${result.accent ? "text-emerald-300" : "text-zinc-50"}`}
            >
              {result.value}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-zinc-500">{note}</p>
    </section>
  );
}

export function RetirementAgeCalculator() {
  const [age, setAge] = useState(40);
  const [portfolio, setPortfolio] = useState(500_000);
  const [contribution, setContribution] = useState(40_000);
  const [spending, setSpending] = useState(60_000);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [realReturn, setRealReturn] = useState(5);
  const result = useMemo(
    () =>
      retirementAgeEstimate({
        currentAge: age,
        portfolio,
        annualContribution: contribution,
        annualSpending: spending,
        withdrawalRate: withdrawalRate / 100,
        realReturn: realReturn / 100,
      }),
    [age, contribution, portfolio, realReturn, spending, withdrawalRate],
  );
  return (
    <Tool
      title="Retirement age estimate"
      description="Estimate when your portfolio reaches a spending-based target in today’s dollars."
      fields={
        <>
          <Field label="Current age" value={age} onChange={setAge} />
          <Field label="Current portfolio" value={portfolio} onChange={setPortfolio} step={5000} />
          <Field label="Annual contributions" value={contribution} onChange={setContribution} step={1000} />
          <Field label="Annual retirement spending" value={spending} onChange={setSpending} step={1000} />
          <Field label="Withdrawal rate (%)" value={withdrawalRate} onChange={setWithdrawalRate} step={0.1} />
          <Field label="Expected real return (%)" value={realReturn} onChange={setRealReturn} step={0.1} />
        </>
      }
      results={[
        { label: "Portfolio target", value: formatCurrency(result.target) },
        {
          label: "Estimated retirement age",
          value: result.retirementAge == null ? "Not reached" : result.retirementAge.toFixed(1),
          accent: true,
        },
        { label: "Years remaining", value: result.years == null ? "—" : result.years.toFixed(1) },
      ]}
      note="This estimate assumes the same growth rate every year. It does not include taxes, fees, Social Security, pensions, or market ups and downs."
    />
  );
}

export function PortfolioReadinessCalculator() {
  const [portfolio, setPortfolio] = useState(1_000_000);
  const [spending, setSpending] = useState(60_000);
  const [income, setIncome] = useState(20_000);
  const [rate, setRate] = useState(4);
  const result = useMemo(
    () => portfolioReadiness({ portfolio, annualSpending: spending, annualIncome: income, withdrawalRate: rate / 100 }),
    [income, portfolio, rate, spending],
  );
  return (
    <Tool
      title="Can this portfolio support the plan?"
      description="Compare a portfolio with the spending gap left after durable annual income."
      fields={
        <>
          <Field label="Investable portfolio" value={portfolio} onChange={setPortfolio} step={10_000} />
          <Field label="Annual spending" value={spending} onChange={setSpending} step={1000} />
          <Field label="Social Security, pension, or other income" value={income} onChange={setIncome} step={1000} />
          <Field label="Planning withdrawal rate (%)" value={rate} onChange={setRate} step={0.1} />
        </>
      }
      results={[
        { label: "Portfolio target", value: formatCurrency(result.target) },
        { label: "Funded", value: `${result.fundedPercent.toFixed(0)}%`, accent: true },
        { label: result.surplus >= 0 ? "Surplus" : "Shortfall", value: formatCurrency(Math.abs(result.surplus)) },
      ]}
      note="This estimate assumes the income starts now and continues. If Social Security or a pension starts later, plan separately for the years before it begins."
    />
  );
}

export function GuardrailsCalculator() {
  const [portfolio, setPortfolio] = useState(1_000_000);
  const [rate, setRate] = useState(4);
  const [lower, setLower] = useState(3.2);
  const [upper, setUpper] = useState(4.8);
  const [adjustment, setAdjustment] = useState(10);
  const result = useMemo(
    () => guardrailRange({ portfolio, baselineRate: rate / 100, lowerGuardrail: lower / 100, upperGuardrail: upper / 100, adjustment: adjustment / 100 }),
    [adjustment, lower, portfolio, rate, upper],
  );
  return (
    <Tool
      title="Retirement spending limits"
      description="Set clear points for cutting or raising spending when your investment balance changes."
      fields={
        <>
          <Field label="Starting portfolio" value={portfolio} onChange={setPortfolio} step={10_000} />
          <Field label="Initial withdrawal rate (%)" value={rate} onChange={setRate} step={0.1} />
          <Field label="Rate for raising spending (%)" value={lower} onChange={setLower} step={0.1} />
          <Field label="Rate for cutting spending (%)" value={upper} onChange={setUpper} step={0.1} />
          <Field label="Spending adjustment (%)" value={adjustment} onChange={setAdjustment} />
        </>
      }
      results={[
        { label: "Starting annual spend", value: formatCurrency(result.baseline) },
        { label: "Cut trigger below", value: formatCurrency(result.lowerPortfolio) },
        { label: "Raise trigger above", value: formatCurrency(result.upperPortfolio), accent: true },
        { label: "Reduced annual spend", value: formatCurrency(result.reducedSpending) },
        { label: "Increased annual spend", value: formatCurrency(result.increasedSpending) },
      ]}
      note="This worksheet shows when your rules would call for a change. It does not test the rules against past markets. Decide how often you will review the plan and how you will handle inflation."
    />
  );
}

export function RothConversionCalculator() {
  const [balance, setBalance] = useState(800_000);
  const [conversion, setConversion] = useState(60_000);
  const [years, setYears] = useState(5);
  const [taxRate, setTaxRate] = useState(12);
  const result = useMemo(
    () => rothConversionEstimate({ pretaxBalance: balance, annualConversion: conversion, years, marginalTaxRate: taxRate / 100 }),
    [balance, conversion, taxRate, years],
  );
  return (
    <Tool
      title="Roth conversion plan"
      description="Estimate how much money you could move from a traditional retirement account to a Roth account over several years."
      fields={
        <>
          <Field label="Traditional retirement account balance" value={balance} onChange={setBalance} step={10_000} />
          <Field label="Annual conversion" value={conversion} onChange={setConversion} step={1000} />
          <Field label="Conversion years" value={years} onChange={setYears} />
          <Field label="Estimated federal tax rate on the conversion (%)" value={taxRate} onChange={setTaxRate} step={0.1} />
        </>
      }
      results={[
        { label: "Total converted", value: formatCurrency(result.converted), accent: true },
        { label: "Simplified federal tax", value: formatCurrency(result.estimatedFederalTax) },
        { label: "Traditional account remaining", value: formatCurrency(result.remainingPretax) },
      ]}
      note="Educational estimate only. Actual taxes may change because of deductions, state taxes, health-insurance assistance, Medicare charges, investment growth, and Roth withdrawal rules."
    />
  );
}

export function HealthcareBudgetCalculator() {
  const [premium, setPremium] = useState(900);
  const [outOfPocket, setOutOfPocket] = useState(4_000);
  const [dentalVision, setDentalVision] = useState(1_500);
  const [subsidy, setSubsidy] = useState(3_000);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(5);
  const result = useMemo(
    () => healthcareBudget({ monthlyPremium: premium, annualOutOfPocket: outOfPocket, annualDentalVision: dentalVision, annualSubsidy: subsidy, yearsToMedicare: years, medicalInflation: inflation / 100 }),
    [dentalVision, inflation, outOfPocket, premium, subsidy, years],
  );
  return (
    <Tool
      title="Pre-Medicare healthcare budget"
      description="Estimate health costs from the year you retire until Medicare begins, usually at age 65."
      fields={
        <>
          <Field label="Monthly household premium" value={premium} onChange={setPremium} step={50} />
          <Field label="Expected annual out-of-pocket cost" value={outOfPocket} onChange={setOutOfPocket} step={500} />
          <Field label="Annual dental and vision" value={dentalVision} onChange={setDentalVision} step={250} />
          <Field label="Estimated annual premium subsidy" value={subsidy} onChange={setSubsidy} step={500} />
          <Field label="Years until Medicare" value={years} onChange={setYears} />
          <Field label="Medical cost inflation (%)" value={inflation} onChange={setInflation} step={0.1} />
        </>
      }
      results={[
        { label: "First-year budget", value: formatCurrency(result.firstYear) },
        { label: "Monthly equivalent", value: formatCurrency(result.monthlyEquivalent), accent: true },
        { label: "Total before Medicare", value: formatCurrency(result.total) },
      ]}
      note="Subsidies depend on household income, household size, location, and current law. Re-price plans annually and keep a separate emergency reserve."
    />
  );
}
