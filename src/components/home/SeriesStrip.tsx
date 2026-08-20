import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export function SeriesStrip() {
  return (
    <section className="border-b border-zinc-800/60 bg-zinc-900/25">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-400">
            21-day series · Arya
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
            Pressure-test your plan in 21 short lessons
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            FIRE math, Coast, Barista, Monte Carlo, and sequence risk — each day
            links to a free tool. No hype. No account.
          </p>
        </div>
        <Link
          href="/series/arya-21-day"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-medium text-zinc-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
        >
          <Play className="h-4 w-4" aria-hidden />
          Open the series
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
