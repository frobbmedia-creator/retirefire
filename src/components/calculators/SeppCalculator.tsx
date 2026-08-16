"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { MoneyInput } from "@/components/ui/money-input";
import {
  calculateSepp,
  type SeppCalculationInput,
  type SeppLifeExpectancyTable,
  type SeppMethod,
} from "@/lib/sepp";

export type SeppUiModel = Readonly<{
  phase: "review_pending" | "unavailable";
  inputState: "recognized" | "invalid";
  exposesMethodology: true;
  exposesExampleInputs: true;
  paymentOutput: null;
  message: string;
}>;

const REVIEW_PENDING_MESSAGE =
  "Payment output is unavailable while independent professional validation is pending.";
const UNAVAILABLE_MESSAGE =
  "Payment output is unavailable because the calculator release status is not recognized as review-pending.";

/**
 * Convert the governed SEPP core into a public, fail-closed UI state.
 * Never return the raw result: it contains a numeric payment even though the
 * current core marks that result non-actionable.
 */
export function seppUiModel(
  registryStatus: unknown,
  inputs: unknown,
): SeppUiModel {
  if (registryStatus !== "blocked_external_review") {
    return {
      phase: "unavailable",
      inputState: "invalid",
      exposesMethodology: true,
      exposesExampleInputs: true,
      paymentOutput: null,
      message: UNAVAILABLE_MESSAGE,
    };
  }

  const result = calculateSepp(inputs as SeppCalculationInput);
  return {
    phase: "review_pending",
    inputState: result.ok ? "recognized" : "invalid",
    exposesMethodology: true,
    exposesExampleInputs: true,
    paymentOutput: null,
    message: REVIEW_PENDING_MESSAGE,
  };
}

export function SeppCalculator({ registryStatus }: { registryStatus: unknown }) {
  const [accountBalance, setAccountBalance] = useState(400_000);
  const [birthDate, setBirthDate] = useState("1973-06-15");
  const [firstDistributionDate, setFirstDistributionDate] =
    useState("2023-01-15");
  const [distributionYear, setDistributionYear] = useState(2023);
  const [method, setMethod] = useState<Exclude<SeppMethod, "fixed-annuitization">>(
    "required-minimum-distribution",
  );
  const [lifeExpectancyTable, setLifeExpectancyTable] =
    useState<Exclude<SeppLifeExpectancyTable, "joint-and-last-survivor">>(
      "single-life",
    );
  const [interestRatePct, setInterestRatePct] = useState(4);

  const exampleInputs = useMemo<SeppCalculationInput>(() => {
    const common = {
      accountBalance,
      birthDate,
      firstDistributionDate,
      lifeExpectancyTable,
    };

    return method === "required-minimum-distribution"
      ? { ...common, method, distributionYear }
      : { ...common, method, interestRate: interestRatePct / 100 };
  }, [
    accountBalance,
    birthDate,
    distributionYear,
    firstDistributionDate,
    interestRatePct,
    lifeExpectancyTable,
    method,
  ]);
  const model = useMemo(
    () => seppUiModel(registryStatus, exampleInputs),
    [exampleInputs, registryStatus],
  );

  const selectClass =
    "mt-1 h-11 w-full rounded-xl border border-zinc-700/80 bg-zinc-950/80 px-3 text-sm text-zinc-100 outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20";

  return (
    <section
      className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5 sm:p-6"
      aria-labelledby="sepp-preview-title"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
            Example inputs only
          </p>
          <h2
            id="sepp-preview-title"
            className="mt-2 text-xl font-semibold text-zinc-50"
          >
            Explore the Notice 2022-6 input model
          </h2>
        </div>
        <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
          Validation pending
        </span>
      </div>

      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
        Change the example values to see which facts the methodology requires.
        This preview intentionally produces no payment amount.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <MoneyInput
          id="sepp-account-balance"
          label="Example single-account balance"
          value={accountBalance}
          onChange={setAccountBalance}
          min={0}
          step={10_000}
          hint="A SEPP series is tied to one account."
        />
        <Input
          id="sepp-birth-date"
          label="Example birth date"
          type="date"
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
        />
        <Input
          id="sepp-first-distribution-date"
          label="Example first distribution date"
          type="date"
          value={firstDistributionDate}
          onChange={(event) => setFirstDistributionDate(event.target.value)}
          hint="This date is the commencement and modification-period anchor."
        />
        <label className="text-sm font-medium text-zinc-300">
          Method
          <select
            className={selectClass}
            value={method}
            onChange={(event) =>
              setMethod(
                event.target.value as Exclude<SeppMethod, "fixed-annuitization">,
              )
            }
          >
            <option value="required-minimum-distribution">
              Required minimum distribution
            </option>
            <option value="fixed-amortization">Fixed amortization</option>
            <option value="fixed-annuitization" disabled>
              Fixed annuitization — unavailable
            </option>
          </select>
        </label>
        <label className="text-sm font-medium text-zinc-300">
          Life-expectancy table
          <select
            className={selectClass}
            value={lifeExpectancyTable}
            onChange={(event) =>
              setLifeExpectancyTable(
                event.target.value as Exclude<
                  SeppLifeExpectancyTable,
                  "joint-and-last-survivor"
                >,
              )
            }
          >
            <option value="single-life">Single Life Table</option>
            <option value="uniform-lifetime">Uniform Lifetime Table</option>
            <option value="joint-and-last-survivor" disabled>
              Joint and Last Survivor Table — unavailable
            </option>
          </select>
        </label>
        {method === "required-minimum-distribution" ? (
          <Input
            id="sepp-distribution-year"
            label="Example distribution year"
            type="number"
            min={2022}
            max={9999}
            step={1}
            value={distributionYear}
            onChange={(event) => setDistributionYear(Number(event.target.value))}
            hint="RMD inputs are redetermined for each distribution year."
          />
        ) : (
          <Input
            id="sepp-interest-rate"
            label="Example annual interest rate"
            type="number"
            min={0}
            step={0.01}
            value={interestRatePct}
            onChange={(event) => setInterestRatePct(Number(event.target.value))}
            suffix="%"
            hint="The permitted ceiling depends on official rates for the two prior months."
          />
        )}
      </div>

      <div
        className="mt-6 rounded-xl border border-amber-500/25 bg-zinc-950/70 p-4"
        role="status"
      >
        <p className="font-medium text-amber-200">No payment output</p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-400">
          {model.message}
        </p>
        {model.phase === "review_pending" && model.inputState === "invalid" && (
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            These example values do not currently form a supported core input.
            No calculation details are exposed in review-pending mode.
          </p>
        )}
      </div>
    </section>
  );
}
