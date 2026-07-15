"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { MessageSquarePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const messageId = useId();

  const close = useCallback(() => {
    setOpen(false);
    setStatus("idle");
    setError(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  useEffect(() => {
    if (open) {
      const el = dialogRef.current?.querySelector<HTMLTextAreaElement>("textarea");
      el?.focus();
    }
  }, [open]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          email,
          website: honeypot,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
      };

      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage("");
      setEmail("");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full",
          "bg-emerald-500 px-4 py-3 text-sm font-semibold text-zinc-950",
          "shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40",
          "transition hover:bg-emerald-400 focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <MessageSquarePlus className="h-4 w-4" aria-hidden />
        Feedback
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            aria-label="Close feedback dialog"
            onClick={close}
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id={titleId} className="text-lg font-semibold text-zinc-50">
                  Send feedback
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  What should we improve? Message goes straight to us.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {status === "success" ? (
              <div className="mt-6 space-y-4">
                <p className="text-sm leading-relaxed text-zinc-300">
                  Thanks — we got it. Your note helps shape what we build next.
                </p>
                <Button type="button" variant="secondary" className="w-full" onClick={close}>
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-5 space-y-4">
                {/* Honeypot */}
                <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden>
                  <label htmlFor="feedback-website">Website</label>
                  <input
                    id="feedback-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="flex w-full flex-col gap-1.5">
                  <label
                    htmlFor={messageId}
                    className="text-sm font-medium text-zinc-300"
                  >
                    Your message
                  </label>
                  <textarea
                    id={messageId}
                    name="message"
                    required
                    rows={5}
                    maxLength={4000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Bugs, ideas, confusion — anything helps."
                    className={cn(
                      "w-full resize-y rounded-xl border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5",
                      "text-sm text-zinc-100 outline-none transition",
                      "placeholder:text-zinc-600",
                      "focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20",
                    )}
                  />
                </div>

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  hint="Optional — only if you want a reply."
                />

                {error && (
                  <p className="text-sm text-red-400" role="alert">
                    {error}
                  </p>
                )}

                <div className="flex gap-2 pt-1">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={close}
                    disabled={status === "submitting"}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={status === "submitting" || message.trim().length < 3}
                  >
                    {status === "submitting" ? "Sending…" : "Send"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
