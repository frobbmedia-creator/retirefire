import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/constants";

const btnPrimary =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-base font-medium text-zinc-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 sm:w-auto";
const btnSecondary =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-800 px-6 text-base font-medium text-zinc-100 ring-1 ring-zinc-700 transition hover:bg-zinc-700 sm:w-auto";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800/60">
      {/* Soft gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.12),_transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-zinc-900/80 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/25">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            Transparent math · Risk-aware · Free core
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Free FIRE calculators
            <span className="mt-1 block text-emerald-400">
              Coast, Barista &amp; your number — with clear assumptions.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {SITE.description} Built for people who want published formulas,
            conservative defaults, and honest limits — not hype.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/#calculators" className={btnPrimary}>
              Open calculators
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/methodology" className={btnSecondary}>
              <BookOpen className="h-4 w-4" aria-hidden />
              Read methodology
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-3 sm:max-w-lg sm:gap-4">
            {[
              { label: "Tools", value: "Coast+" },
              { label: "Paywall", value: "None" },
              { label: "Advice?", value: "No" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-3 py-3 text-center sm:px-4"
              >
                <dt className="text-[11px] uppercase tracking-wide text-zinc-500">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-lg font-semibold text-zinc-100 sm:text-xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
