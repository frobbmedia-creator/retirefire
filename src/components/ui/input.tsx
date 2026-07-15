"use client";

import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  prefix?: string;
  suffix?: string;
};

export function Input({
  className,
  label,
  hint,
  prefix,
  suffix,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-zinc-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="pointer-events-none absolute left-3 text-sm text-zinc-500">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            "h-11 w-full rounded-xl border border-zinc-700/80 bg-zinc-950/80 text-sm text-zinc-100 outline-none transition",
            "placeholder:text-zinc-600",
            "focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            prefix ? "pl-8" : "pl-3",
            suffix ? "pr-12" : "pr-3",
            className,
          )}
          {...props}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 text-sm text-zinc-500">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}
