"use client";

import { cn } from "@/lib/utils";

type TabOption<T extends string> = {
  id: T;
  label: string;
  description?: string;
};

type TabsProps<T extends string> = {
  options: readonly TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
};

export function Tabs<T extends string>({
  options,
  value,
  onChange,
  className,
  size = "md",
}: TabsProps<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex flex-wrap gap-2 rounded-xl bg-zinc-950/60 p-1 ring-1 ring-zinc-800",
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={cn(
              "min-w-0 flex-1 rounded-lg text-center transition",
              size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm",
              active
                ? "bg-emerald-500/15 font-medium text-emerald-300 ring-1 ring-emerald-500/40"
                : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200",
            )}
          >
            <span className="block truncate">{opt.label}</span>
            {opt.description && size !== "sm" && (
              <span
                className={cn(
                  "mt-0.5 hidden text-[11px] leading-tight sm:block",
                  active ? "text-emerald-400/80" : "text-zinc-600",
                )}
              >
                {opt.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
