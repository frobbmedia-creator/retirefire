"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PlanId } from "@/lib/stripe/config";

type Props = {
  plan: PlanId;
  label: string;
  className?: string;
  recommended?: boolean;
};

export function CheckoutButton({ plan, label, className, recommended }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Checkout failed");
        setLoading(false);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError("No checkout URL returned");
    } catch {
      setError("Network error \u2014 try again");
    }
    setLoading(false);
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={cn(
          "inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition",
          recommended
            ? "bg-emerald-600 text-white hover:bg-emerald-500 disabled:bg-emerald-600/50"
            : "bg-zinc-100 text-zinc-900 hover:bg-white disabled:bg-zinc-100/50",
          className,
        )}
      >
        {loading ? "Redirecting to Stripe\u2026" : label}
      </button>
      {error && (
        <p className="mt-2 text-center text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
