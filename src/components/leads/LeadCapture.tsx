"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LeadSource } from "@/lib/leads";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";

export function LeadCapture({
  source,
  heading = "Optional notes, not a paywall",
  blurb = "Leave an email if you want occasional FIRE planning notes from RetireFire. The tools and this page stay free either way. No spam. Unsubscribe anytime.",
}: {
  source: LeadSource;
  heading?: string;
  blurb?: string;
}) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source,
          website: honeypot,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Could not save that email.");
      }
      setStatus("success");
      trackEvent(AnalyticsEvents.EMAIL_CAPTURE, { source });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not save that email.");
    }
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
        Optional
      </p>
      <h2 className="mt-2 text-lg font-semibold text-zinc-50">{heading}</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{blurb}</p>
      {status === "success" ? (
        <p className="mt-4 text-sm text-emerald-300">
          Saved. Core calculators stay free — no account required.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor={`lead-email-${source}`}>
            Email
          </label>
          <Input
            id={`lead-email-${source}`}
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sm:flex-1"
          />
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
          />
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Saving…" : "Keep me posted"}
          </Button>
        </form>
      )}
      {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
      <p className="mt-3 text-xs text-zinc-600">
        Educational only — not financial advice. We never sell the list.
      </p>
    </section>
  );
}
