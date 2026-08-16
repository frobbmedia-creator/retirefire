"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Gauge,
  RotateCcw,
} from "lucide-react";
import { calculateRetirementCheckup } from "@/lib/retirement-checkup";
import { formatCurrency } from "@/lib/format";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";

type Answers = {
  currentAge: number;
  retirementAge: number;
  portfolio: number;
  annualContribution: number;
  annualSpending: number;
  annualRetirementIncome: number;
};

const initial: Answers = {
  currentAge: 45,
  retirementAge: 65,
  portfolio: 350_000,
  annualContribution: 24_000,
  annualSpending: 60_000,
  annualRetirementIncome: 24_000,
};

const inputClass =
  "mt-2 h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-base text-zinc-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15";

export function RetirementCheckup() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState(initial);
  const result = useMemo(
    () =>
      calculateRetirementCheckup({
        ...answers,
        realReturn: 0.05,
        withdrawalRate: 0.04,
      }),
    [answers],
  );

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    setAnswers(initial);
    setStep(1);
  }

  function advance() {
    const nextStep = step + 1;
    trackEvent(
      nextStep === 4
        ? AnalyticsEvents.CHECKUP_COMPLETE
        : AnalyticsEvents.CHECKUP_STEP,
      nextStep === 4
        ? { status: result.status }
        : { step: `step_${nextStep}` },
    );
    setStep(nextStep);
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 shadow-2xl shadow-black/20">
      <div className="border-b border-zinc-800 px-5 py-4 sm:px-7">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-zinc-300">
            {step < 4 ? `Step ${step} of 3` : "Your checkup"}
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            Start over
          </button>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2" aria-hidden>
          {[1, 2, 3].map((number) => (
            <div
              key={number}
              className={`h-1.5 rounded-full ${number <= Math.min(step, 3) ? "bg-emerald-500" : "bg-zinc-800"}`}
            />
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-7 lg:p-9">
        {step === 1 && (
          <Step
            title="When would you like to retire?"
            description="A best guess is fine. You can change it later."
          >
            <NumberField
              label="Your current age"
              value={answers.currentAge}
              onChange={(value) => set("currentAge", value)}
              suffix="years old"
            />
            <NumberField
              label="Age you would like to retire"
              value={answers.retirementAge}
              onChange={(value) => set("retirementAge", value)}
              suffix="years old"
            />
            {answers.retirementAge < answers.currentAge && (
              <Message>
                Retirement age must be the same as or later than your current
                age.
              </Message>
            )}
          </Step>
        )}

        {step === 2 && (
          <Step
            title="What have you saved so far?"
            description="Use retirement accounts and other investments meant to support retirement. Do not include your home unless you plan to sell it."
          >
            <MoneyField
              label="Current retirement investments"
              value={answers.portfolio}
              onChange={(value) => set("portfolio", value)}
            />
            <MoneyField
              label="Amount added each year"
              value={answers.annualContribution}
              onChange={(value) => set("annualContribution", value)}
              hint="Include your contributions and any employer match."
            />
          </Step>
        )}

        {step === 3 && (
          <Step
            title="What will retirement cost?"
            description="Estimate yearly spending in today’s dollars. Then add income you expect every year, such as Social Security or a pension."
          >
            <MoneyField
              label="Yearly retirement spending"
              value={answers.annualSpending}
              onChange={(value) => set("annualSpending", value)}
              hint="Include housing, food, taxes, travel, and healthcare."
            />
            <MoneyField
              label="Yearly Social Security, pension, or other reliable income"
              value={answers.annualRetirementIncome}
              onChange={(value) => set("annualRetirementIncome", value)}
              hint="Use $0 if you are not ready to estimate this."
            />
          </Step>
        )}

        {step === 4 && <Results result={result} answers={answers} />}
      </div>

      {step < 4 && (
        <div className="flex items-center justify-between gap-3 border-t border-zinc-800 bg-zinc-950/40 px-5 py-4 sm:px-7">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((current) => current - 1)}
              className="inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            disabled={
              step === 1 &&
              (answers.retirementAge < answers.currentAge ||
                answers.currentAge <= 0)
            }
            onClick={advance}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === 3 ? "See my results" : "Continue"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}

function Step({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function NumberField({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix: string;
}) {
  return (
    <label className="text-sm font-medium text-zinc-200">
      {label}
      <input
        className={inputClass}
        type="number"
        min={18}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <span className="mt-1.5 block text-xs font-normal text-zinc-500">
        {suffix}
      </span>
    </label>
  );
}

function MoneyField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
}) {
  return (
    <label className="text-sm font-medium text-zinc-200">
      {label}
      <span className="relative block">
        <span className="pointer-events-none absolute left-4 top-1/2 mt-1 -translate-y-1/2 text-zinc-500">
          $
        </span>
        <input
          className={`${inputClass} pl-8`}
          type="number"
          min={0}
          step={1000}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </span>
      {hint && (
        <span className="mt-1.5 block text-xs font-normal leading-relaxed text-zinc-500">
          {hint}
        </span>
      )}
    </label>
  );
}

function Message({ children }: { children: React.ReactNode }) {
  return (
    <p className="sm:col-span-2 rounded-xl bg-amber-500/10 px-4 py-3 text-sm text-amber-200 ring-1 ring-amber-500/25">
      {children}
    </p>
  );
}

function Results({
  result,
  answers,
}: {
  result: ReturnType<typeof calculateRetirementCheckup>;
  answers: Answers;
}) {
  const styles = {
    "on-track": {
      label: "On track",
      text: "Your current plan reaches the estimated target by your chosen retirement age.",
      icon: CheckCircle2,
      color: "text-emerald-300",
      background: "bg-emerald-500/10 ring-emerald-500/25",
    },
    close: {
      label: "Close",
      text: "Your plan is within reach, but a few changes could make it stronger.",
      icon: Gauge,
      color: "text-amber-300",
      background: "bg-amber-500/10 ring-amber-500/25",
    },
    "needs-work": {
      label: "Needs work",
      text: "The current plan does not yet reach the estimated target. The options below show where to start.",
      icon: CircleAlert,
      color: "text-rose-300",
      background: "bg-rose-500/10 ring-rose-500/25",
    },
  } as const;
  const status = styles[result.status];
  const Icon = status.icon;

  return (
    <section aria-live="polite">
      <div className={`rounded-2xl p-5 ring-1 ${status.background}`}>
        <div className="flex items-center gap-3">
          <Icon className={`h-7 w-7 ${status.color}`} aria-hidden />
          <div>
            <p className={`text-2xl font-semibold ${status.color}`}>
              {status.label}
            </p>
            <p className="mt-1 text-sm text-zinc-300">{status.text}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <ResultCard
          label="Estimated retirement age"
          value={
            result.estimatedRetirementAge == null
              ? "Not reached"
              : result.estimatedRetirementAge.toFixed(0)
          }
        />
        <ResultCard
          label={`Projected savings at age ${answers.retirementAge}`}
          value={formatCurrency(result.projectedPortfolio)}
        />
        <ResultCard
          label="Yearly spending this plan may support"
          value={formatCurrency(result.supportedAnnualSpending)}
        />
      </div>

      <div className="mt-7">
        <h2 className="text-xl font-semibold text-zinc-50">
          Three ways to strengthen the plan
        </h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <Action
            number="1"
            title="Save more each year"
            body={
              result.annualSavingsChange > 0
                ? `Adding about ${formatCurrency(result.annualSavingsChange)} more each year could close the estimated gap by age ${answers.retirementAge}.`
                : "Your current yearly savings are enough for this estimate. Keep reviewing the amount as life changes."
            }
          />
          <Action
            number="2"
            title="Adjust retirement spending"
            body={
              result.annualSpendingChange > 0
                ? `This plan currently supports about ${formatCurrency(result.supportedAnnualSpending)} a year—${formatCurrency(result.annualSpendingChange)} below your spending estimate.`
                : "The projected savings support your current spending estimate under these assumptions."
            }
          />
          <Action
            number="3"
            title="Give investments more time"
            body={
              result.estimatedRetirementAge != null &&
              result.estimatedRetirementAge > answers.retirementAge
                ? `At the current pace, the estimate reaches the target near age ${result.estimatedRetirementAge.toFixed(0)}.`
                : "The estimate reaches the target by your chosen age. Test an earlier date to see how much flexibility you have."
            }
          />
        </div>
      </div>

      <div className="mt-7 rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5">
        <h2 className="font-semibold text-zinc-100">What this checkup assumes</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Investments grow 5% per year after inflation, and retirement starts
          with a 4% yearly withdrawal. The estimate does not include taxes,
          fees, changes in Social Security, long-term care, or the order of good
          and bad market years.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link href="/calculators" className="text-emerald-400 hover:underline">
            Explore detailed calculators
          </Link>
          <Link href="/methodology" className="text-emerald-400 hover:underline">
            Read how the math works
          </Link>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-emerald-500/10 p-5 ring-1 ring-emerald-500/25">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
          Want a deeper plan?
        </p>
        <h2 className="mt-2 text-xl font-semibold text-zinc-50">
          Compare more scenarios with RetireFire Pro.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          Build a printable detailed report in the protected Pro workspace.
          Subscription billing can be managed directly through Stripe.
        </p>
        <Link
          href="/pro"
          onClick={() =>
            trackEvent(AnalyticsEvents.PRO_INTEREST, {
              source: "checkup_results",
              status: result.status,
            })
          }
          className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
        >
          Explore RetireFire Pro
        </Link>
      </div>
    </section>
  );
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
      <p className="text-xs leading-snug text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50">
        {value}
      </p>
    </div>
  );
}

function Action({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-950/45 p-4">
      <p className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-semibold text-emerald-300">
        {number}
      </p>
      <h3 className="mt-3 font-semibold text-zinc-100">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
    </article>
  );
}
