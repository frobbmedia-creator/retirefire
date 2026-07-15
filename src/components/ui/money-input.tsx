"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";

type MoneyInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

/**
 * Mobile-friendly currency input: formatted when blurred, raw digits when focused.
 */
export function MoneyInput({
  label,
  value,
  onChange,
  hint,
  id,
  min = 0,
  max,
  step = 1000,
  className,
}: MoneyInputProps) {
  const inputId = id ?? label.replace(/\s+/g, "-").toLowerCase();
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState(value ? String(Math.round(value)) : "");

  function commit(raw: string) {
    const cleaned = raw.replace(/[$,\s]/g, "");
    let n = Number(cleaned);
    if (!Number.isFinite(n)) n = 0;
    if (min != null) n = Math.max(min, n);
    if (max != null) n = Math.min(max, n);
    onChange(n);
    setDraft(n ? String(Math.round(n)) : "");
  }

  const display = focused
    ? draft
    : value
      ? formatCurrency(value).replace("$", "").trim()
      : "";

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-zinc-300">
        {label}
      </label>
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-3 text-sm text-zinc-500">
          $
        </span>
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          enterKeyHint="done"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className={cn(
            "h-12 w-full rounded-xl border border-zinc-700/80 bg-zinc-950/80 pl-8 pr-3 text-base text-zinc-100 outline-none transition sm:h-11 sm:pr-20 sm:text-sm",
            "placeholder:text-zinc-600",
            "focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20",
          )}
          value={display}
          onFocus={() => {
            setFocused(true);
            setDraft(value ? String(Math.round(value)) : "");
          }}
          onBlur={() => {
            setFocused(false);
            commit(draft);
          }}
          onChange={(e) => {
            const v = e.target.value.replace(/[^\d.]/g, "");
            setDraft(v);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
            }
          }}
          aria-describedby={hint ? `${inputId}-hint` : undefined}
        />
        <div className="absolute right-1.5 hidden gap-0.5 sm:flex">
          <button
            type="button"
            tabIndex={-1}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
            aria-label="Decrease"
            onClick={() => {
              const next = Math.max(min, (value || 0) - step);
              onChange(next);
              setDraft(next ? String(Math.round(next)) : "");
            }}
          >
            −
          </button>
          <button
            type="button"
            tabIndex={-1}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
            aria-label="Increase"
            onClick={() => {
              const next =
                max != null
                  ? Math.min(max, (value || 0) + step)
                  : (value || 0) + step;
              onChange(next);
              setDraft(String(Math.round(next)));
            }}
          >
            +
          </button>
        </div>
      </div>
      {hint && (
        <p id={`${inputId}-hint`} className="text-xs text-zinc-500">
          {hint}
        </p>
      )}
    </div>
  );
}
