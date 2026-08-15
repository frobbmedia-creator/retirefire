"use client";

import { useEffect, useState } from "react";
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

/** Convert a user-entered currency draft to a bounded number without losing decimals. */
export function normalizeMoneyDraft(raw: string, min: number, max?: number): number {
  const cleaned = raw.replace(/[$,\s]/g, "");
  let value = Number(cleaned);
  if (!Number.isFinite(value)) value = 0;
  value = Math.max(min, value);
  return max == null ? value : Math.min(max, value);
}

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
  const [draft, setDraft] = useState(value ? String(value) : "");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setDraft(value ? String(value) : "");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  function commit(raw: string) {
    const n = normalizeMoneyDraft(raw, min, max);
    onChange(n);
    setDraft(n ? String(n) : "");
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
            setDraft(value ? String(value) : "");
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
              setDraft(next ? String(next) : "");
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
              setDraft(String(next));
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
