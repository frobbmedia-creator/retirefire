import {
  ArrowRight,
  BookOpen,
  ChartNoAxesCombined,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { AnalyticsEvents } from "@/lib/analytics";

const btnPrimary =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-base font-medium text-zinc-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 sm:w-auto";
const btnSecondary =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-800 px-6 text-base font-medium text-zinc-100 ring-1 ring-zinc-700 transition hover:bg-zinc-700 sm:w-auto";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800/60 lg:flex lg:min-h-[calc(100svh-18rem)] lg:items-center">
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
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            The number is either enough — or it is not.
            <span className="mt-1 block text-emerald-400">
              Get the clear answer and your next three moves.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            In about three minutes, see an estimated retirement age, the yearly
            spending your plan may support, and the changes that matter most.
            Transparent math. No account. No soft language.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
            <TrackedLink
              href="/retirement-checkup"
              className={btnPrimary}
              eventName={AnalyticsEvents.CHECKUP_START}
              eventProps={{ source: "homepage_hero" }}
            >
              Start free checkup
              <ArrowRight className="h-4 w-4" aria-hidden />
            </TrackedLink>
            <TrackedLink
              href="/calculators"
              className={btnSecondary}
              eventName={AnalyticsEvents.CTA_CLICK}
              eventProps={{ source: "homepage_hero", destination: "calculators" }}
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              Explore the FIRE tools
            </TrackedLink>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
            <span>✓ No signup required</span>
            <span>✓ Assumptions shown</span>
            <span>✓ Private in your browser</span>
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
                      Advanced FIRE features
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Professional-grade depth
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/25">
                    Core tools free
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="rounded-2xl bg-emerald-500/10 p-4 ring-1 ring-emerald-500/25">
                  <div className="flex items-center gap-3">
                    <ChartNoAxesCombined
                      className="h-7 w-7 text-emerald-300"
                      aria-hidden
                    />
                    <div>
                      <p className="text-xl font-semibold text-emerald-300">
                        Transparent portfolio analysis
                      </p>
                      <p className="mt-1 text-sm text-zinc-300">
                        Full assumptions, formulas, and limitations
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {[
                    ["FIRE paths", "Coast + Barista"],
                    ["Market risk", "1k paths"],
                    ["Research", "Data + methods"],
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
                    "Compare scenarios and withdrawal rates",
                    "Test the order of good and bad market years",
                    "Download data and inspect every formula",
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

                <TrackedLink
                  href="/pro"
                  eventName={AnalyticsEvents.PRO_INTEREST}
                  eventProps={{ source: "homepage_feature_card" }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                >
                  Explore RetireFire Pro
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
