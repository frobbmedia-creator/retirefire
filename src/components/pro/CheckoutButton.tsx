"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { StripePlanId } from "@/lib/stripe/config";

export function CheckoutButton({
  plan,
  children,
  variant = "primary",
}: {
  plan: StripePlanId;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const result = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.error || "Unable to start checkout.");
      }

      window.location.assign(result.url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to start checkout.");
      setLoading(false);
    }
  }

  return (
    <div>
      <Button className="w-full" size="lg" variant={variant} onClick={checkout} disabled={loading}>
        {loading ? "Opening secure checkout…" : children}
      </Button>
      {error ? <p className="mt-2 text-sm text-red-400" role="alert">{error}</p> : null}
    </div>
  );
}
