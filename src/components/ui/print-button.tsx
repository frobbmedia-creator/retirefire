"use client";

import { Printer } from "lucide-react";
import { cn } from "@/lib/utils";

/** Free print / PDF via browser — no account, no watermark gate. */
export function PrintButton({
  label = "Print / save PDF",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-lg bg-zinc-900 px-3 text-xs font-medium text-zinc-300 ring-1 ring-zinc-700 transition hover:bg-zinc-800 hover:text-zinc-100 print:hidden",
        className,
      )}
    >
      <Printer className="h-3.5 w-3.5" aria-hidden />
      {label}
    </button>
  );
}
