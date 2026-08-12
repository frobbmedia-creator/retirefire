"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PlanId } from "@/lib/stripe/config";

type Props = {
  plan: PlanId;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function CheckoutButton({
  plan,
  children,
  variant = "primary",
  className,
}: Props) {
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
        if (res.status === 401 && data.loginUrl) {
          window.location.href = data.loginUrl;
          return;
        }
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
      setError("Network error — try again");
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
          "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-base font-medium transition",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "primary"
            ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 focus-visible:ring-emerald-400/40"
            : "bg-zinc-800 text-zinc-100 ring-1 ring-zinc-700 hover:bg-zinc-700 focus-visible:ring-zinc-500/40",
          className,
        )}
      >
        {loading ? "Redirecting to Stripe\u2026" : children}
      </button>
      {error && (
        <p className="mt-2 text-center text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
