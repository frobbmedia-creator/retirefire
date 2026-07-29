import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

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

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-zinc-900/80 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/25">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            One place to plan for retirement — from first checkup to FIRE deep dive
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Is your household on track for retirement?
            <span className="mt-1 block text-emerald-400">
              Get a clear answer and your next three moves.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            In about three minutes, see an estimated retirement age, the yearly
            spending your plan may support, and the changes that could help
            most. No account, sales call, or financial jargon.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
            <Link href="/retirement-checkup" className={btnPrimary}>
              Start free checkup
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/calculators" className={btnSecondary}>
              <BookOpen className="h-4 w-4" aria-hidden />
              Explore expert FIRE tools
            </Link>
          </div>

          </div>

          <div className="relative lg:justify-self-end">
            <div
              aria-hidden
              className="absolute -inset-8 rounded-full bg-emerald-500/10 blur-3xl"
            />
            <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-zinc-900/85 shadow-2xl shadow-black/40">
              <div className="border-b border-zinc-800 px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-400">
                      Your retirement checkup
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      A clear starting point
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/25">
                    Free
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="rounded-2xl bg-emerald-500/10 p-4 ring-1 ring-emerald-500/25">
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      className="h-7 w-7 text-emerald-300"
                      aria-hidden
                    />
                    <div>
                      <p className="text-xl font-semibold text-emerald-300">
                        One clear status
                      </p>
                      <p className="mt-1 text-sm text-zinc-300">
                        On track, close, or needs work
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {[
                    ["Retirement age", "Estimated"],
                    ["Yearly spending", "Supported"],
                    ["Next steps", "Top 3"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-zinc-800 bg-zinc-950/65 p-3"
                    >
                      <p className="text-[11px] text-zinc-500">{label}</p>
                      <p className="mt-1 font-semibold text-zinc-100">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-2.5">
                  {[
                    "Use your real savings and spending",
                    "See the assumptions behind the answer",
                    "Open advanced FIRE tools when you are ready",
                  ].map((item) => (
                    <p
                      key={item}
                      className="flex items-center gap-2 text-sm text-zinc-400"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs text-emerald-300">
                        ✓
                      </span>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
