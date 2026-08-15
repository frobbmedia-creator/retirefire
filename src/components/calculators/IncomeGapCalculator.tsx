"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import {
  estimateSocialSecurityClaim,
  estimateTaxableSocialSecurity,
  type TaxableSocialSecurityFilingStatus,
} from "@/lib/retirement-income";

type BenefitMode = "manual" | "claim_estimate";

export function IncomeGapCalculator() {
  const [spending, setSpending] = useState(72_000);
  const [benefitMode, setBenefitMode] = useState<BenefitMode>("manual");
  const [manualSocialSecurity, setManualSocialSecurity] = useState(30_000);
  const [birthYear, setBirthYear] = useState(1960);
  const [fullRetirementAgeMonthlyBenefit, setFullRetirementAgeMonthlyBenefit] =
    useState(2_500);
  const [claimAgeYears, setClaimAgeYears] = useState(67);
  const [claimAgeMonths, setClaimAgeMonths] = useState(0);
  const [pension, setPension] = useState(0);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [filingStatus, setFilingStatus] =
    useState<TaxableSocialSecurityFilingStatus>("single");
  const [otherIncome, setOtherIncome] = useState(30_000);
  const [taxExemptInterest, setTaxExemptInterest] = useState(0);

  const claimEstimate = useMemo(
    () =>
      estimateSocialSecurityClaim({
        birthYear,
        fullRetirementAgeMonthlyBenefit,
        claimAgeYears,
        claimAgeMonths,
      }),
    [
      birthYear,
      claimAgeMonths,
      claimAgeYears,
      fullRetirementAgeMonthlyBenefit,
    ],
  );

  const grossSocialSecurity =
    benefitMode === "manual"
      ? Math.max(0, manualSocialSecurity)
      : claimEstimate.ok
        ? claimEstimate.estimatedAnnualBenefit
        : 0;

  const taxableEstimate = useMemo(
    () =>
      estimateTaxableSocialSecurity({
        taxYear: 2025,
        filingStatus,
        annualSocialSecurityBenefits: grossSocialSecurity,
        otherIncome,
        taxExemptInterest,
      }),
    [filingStatus, grossSocialSecurity, otherIncome, taxExemptInterest],
  );

  const result = useMemo(() => {
    const gap = Math.max(0, spending - grossSocialSecurity - pension);
    const rate = Math.max(0.1, withdrawalRate) / 100;
    return {
      gap,
      target: gap / rate,
    };
  }, [grossSocialSecurity, pension, spending, withdrawalRate]);

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
          Estimate the portfolio target after gross Social Security or pension
          income begins. Fund the years before those payments separately.
        </p>
      </div>

      <fieldset className="mt-5 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
        <legend className="px-1 text-sm font-medium text-zinc-200">
          Social Security benefit input
        </legend>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-5">
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="radio"
              name="social-security-mode"
              value="manual"
              checked={benefitMode === "manual"}
              onChange={() => setBenefitMode("manual")}
            />
            Use my annual SSA estimate
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="radio"
              name="social-security-mode"
              value="claim_estimate"
              checked={benefitMode === "claim_estimate"}
              onChange={() => setBenefitMode("claim_estimate")}
            />
            Estimate from my FRA amount
          </label>
        </div>

        {benefitMode === "manual" ? (
          <label className="mt-4 block text-sm text-zinc-300">
            Gross annual Social Security from my SSA estimate
            <input
              className={fieldClass}
              type="number"
              min={0}
              step={1000}
              value={manualSocialSecurity}
              onChange={(event) =>
                setManualSocialSecurity(Number(event.target.value))
              }
            />
          </label>
        ) : (
          <div className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-zinc-300">
                SSA-effective birth year
                <input
                  className={fieldClass}
                  type="number"
                  min={1933}
                  step={1}
                  value={birthYear}
                  onChange={(event) => setBirthYear(Number(event.target.value))}
                />
              </label>
              <label className="text-sm text-zinc-300">
                Monthly benefit at full retirement age
                <input
                  className={fieldClass}
                  type="number"
                  min={0}
                  step={50}
                  value={fullRetirementAgeMonthlyBenefit}
                  onChange={(event) =>
                    setFullRetirementAgeMonthlyBenefit(Number(event.target.value))
                  }
                />
              </label>
              <label className="text-sm text-zinc-300">
                Claim age — years
                <input
                  className={fieldClass}
                  type="number"
                  min={62}
                  max={70}
                  step={1}
                  value={claimAgeYears}
                  onChange={(event) =>
                    setClaimAgeYears(Number(event.target.value))
                  }
                />
              </label>
              <label className="text-sm text-zinc-300">
                Claim age — additional months
                <input
                  className={fieldClass}
                  type="number"
                  min={0}
                  max={11}
                  step={1}
                  value={claimAgeMonths}
                  onChange={(event) =>
                    setClaimAgeMonths(Number(event.target.value))
                  }
                />
              </label>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-500">
              If your birthday is January 1, SSA says to enter the prior birth
              year. Claim age must be a whole month from 62 through exactly 70.
            </p>
            {claimEstimate.ok ? (
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                FRA {claimEstimate.fullRetirementAge.years} years{" "}
                {claimEstimate.fullRetirementAge.months} months · claim-age
                factor {(claimEstimate.adjustmentFactor * 100).toFixed(1)}% ·
                estimated gross monthly benefit{" "}
                {formatCurrency(claimEstimate.estimatedMonthlyBenefit)} · method
                v{claimEstimate.methodVersion}
              </p>
            ) : (
              <p className="mt-2 text-xs text-amber-300" role="alert">
                No claim estimate: {claimEstimate.errors.join("; ")}
              </p>
            )}
          </div>
        )}
      </fieldset>

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

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
          <p className="text-xs text-zinc-500">Gross annual Social Security</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-50">
            {formatCurrency(grossSocialSecurity)}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
          <p className="text-xs text-zinc-500">Later annual portfolio gap</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-50">
            {formatCurrency(result.gap)}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-zinc-950/70 p-4">
          <p className="text-xs text-zinc-500">Target after income begins</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-300">
            {formatCurrency(result.target)}
          </p>
        </div>
      </div>

      <fieldset className="mt-5 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
        <legend className="px-1 text-sm font-medium text-zinc-200">
          2025 federal taxable-benefit estimate
        </legend>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          This estimates how much of the gross benefit enters federal taxable
          income. It is not the tax owed and does not change the gross income
          used in the portfolio-gap calculation.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="text-sm text-zinc-300">
            Filing status
            <select
              className={fieldClass}
              value={filingStatus}
              onChange={(event) =>
                setFilingStatus(
                  event.target.value as TaxableSocialSecurityFilingStatus,
                )
              }
            >
              <option value="single">Single</option>
              <option value="married_filing_jointly">
                Married filing jointly
              </option>
            </select>
          </label>
          <label className="text-sm text-zinc-300">
            Other annual income before Social Security
            <input
              className={fieldClass}
              type="number"
              min={0}
              step={1000}
              value={otherIncome}
              onChange={(event) => setOtherIncome(Number(event.target.value))}
            />
          </label>
          <label className="text-sm text-zinc-300">
            Annual tax-exempt interest
            <input
              className={fieldClass}
              type="number"
              min={0}
              step={100}
              value={taxExemptInterest}
              onChange={(event) =>
                setTaxExemptInterest(Number(event.target.value))
              }
            />
          </label>
        </div>
        {taxableEstimate.ok &&
        (benefitMode === "manual" || claimEstimate.ok) ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-3">
              <p className="text-xs text-zinc-500">
                Gross annual benefit (cash received)
              </p>
              <p className="mt-1 text-lg font-semibold text-zinc-100">
                {formatCurrency(taxableEstimate.grossAnnualBenefits)}
              </p>
            </div>
            <div className="rounded-lg border border-amber-500/20 bg-zinc-950/70 p-3">
              <p className="text-xs text-zinc-500">
                Included in federal taxable income
              </p>
              <p className="mt-1 text-lg font-semibold text-amber-200">
                {formatCurrency(taxableEstimate.taxableAnnualBenefits)}
              </p>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500 sm:col-span-2">
              Provisional income: {formatCurrency(taxableEstimate.provisionalIncome)} ·
              federally tax-free benefit portion:{" "}
              {formatCurrency(taxableEstimate.federallyTaxFreeAnnualBenefits)} ·
              method v{taxableEstimate.methodVersion}. Uses IRS Publication 915
              (2025), the latest completed worksheet reviewed on August 15, 2026.
            </p>
          </div>
        ) : taxableEstimate.ok ? null : (
          <p className="mt-3 text-xs text-amber-300" role="alert">
            No federal estimate: {taxableEstimate.errors.join("; ")}
          </p>
        )}
      </fieldset>

      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        Educational estimates only, not individualized Social Security, tax,
        investment, or financial advice. Claim estimates are retired-worker
        comparisons based on the FRA amount you enter; verify benefits with SSA.
        Federal taxable-benefit estimates exclude state tax and special IRS
        worksheet situations. Exact inputs and results stay in this browser.
      </p>
    </section>
  );
}
