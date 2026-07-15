import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PrintButton } from "@/components/ui/print-button";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/resources/sequence-risk-guide", {
  title: "Sequence of Returns Risk Guide",
  description:
    "Plain-language guide to sequence-of-returns risk for FIRE and Coast FIRE: constant returns vs stress tests, how to read success rates, and a practical checklist.",
  openGraph: {
    title: "Sequence of Returns Risk Guide · RetireFire",
    description:
      "Educational guide to path risk — without false precision. Free tools linked.",
  },
});

export default function SequenceRiskGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          {
            name: "Sequence risk guide",
            path: "/resources/sequence-risk-guide",
          },
        ]}
      />
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-emerald-400">Free resource</p>
        <PrintButton />
      </div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Sequence of returns risk — a practical guide
      </h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        Sequence risk is why two plans with the same average return can end in
        very different places. This page is a plain-language field guide for
        FIRE and Coast FIRE planners. Print or save as PDF if useful.
        Educational only — not financial advice.
      </p>

      <div className="prose-invert mt-12 space-y-10 text-[15px] leading-relaxed text-zinc-300">
        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            1. What sequence risk is
          </h2>
          <p className="mt-3 text-zinc-400">
            Average return answers “how much growth over many years on paper.”
            Sequence answers “in what order did good and bad years arrive?” Bad
            years early — especially while withdrawing — hurt more than the
            same bad years later, because you sell more shares when prices are
            down and leave less capital to recover.
          </p>
          <p className="mt-3 text-zinc-400">
            Coast FIRE is mostly an accumulation question, but sequence still
            matters if you later withdraw early, if you stop contributing with
            no cushion, or if lifestyle creep raises your full FIRE target.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            2. Constant-return calculators
          </h2>
          <p className="mt-3 text-zinc-400">
            Simple tools (including RetireFire&apos;s primary numbers) assume a
            smooth real return every year. That is excellent for learning
            formulas and comparing levers. It is incomplete for path risk. Treat
            constant-return Coast and Years results as{" "}
            <strong className="text-zinc-200">illustrations under assumptions</strong>
            , not destinies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            3. Two ways to explore path risk
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-400">
            <li>
              <strong className="text-zinc-200">Lower the assumed return</strong>{" "}
              (and SWR). Crude, honest, available everywhere.
            </li>
            <li>
              <strong className="text-zinc-200">Simulations</strong> — Monte
              Carlo (random paths from a model) or historical cycles (replay past
              markets). Different strengths; neither is a life probability.
            </li>
          </ul>
          <p className="mt-3 text-zinc-400">
            Deep dive:{" "}
            <Link
              href="/blog/monte-carlo-vs-historical-cycles-fire"
              className="text-emerald-400 hover:underline"
            >
              Monte Carlo vs historical cycles
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            4. How to read a success rate
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-400">
            <li>Ask what “success” means (terminal ≥ target? portfolio lasts N years?).</li>
            <li>Ask which model produced the paths (mean, volatility, history set).</li>
            <li>Prefer p10 / median / p90 bands over a single percentage.</li>
            <li>
              Never translate “82% of paths” into “82% chance my retirement works”
              without taxes, healthcare, and flexibility.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            5. RetireFire free stress test (what it is)
          </h2>
          <p className="mt-3 text-zinc-400">
            On Coast FIRE and Years to FIRE we run 1,000 paths with independent
            annual shocks around your shared mean real return and a fixed
            volatility preset. Success = terminal wealth ≥ target. Model details
            live on{" "}
            <Link href="/methodology" className="text-emerald-400 hover:underline">
              Methodology
            </Link>
            . Core tools and this basic stress test stay free.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            6. Checklist before you change behavior
          </h2>
          <ul className="mt-3 space-y-2">
            {[
              "I ran full FIRE at 3.5% and 4% SWR (or my own pair).",
              "I re-ran Coast / Years at a lower real return.",
              "I looked at p10 vs median on a stress test (or accepted I am using only sensitivity).",
              "Emergency fund and healthcare are separate from the FIRE multiple.",
              "If I stop contributing, I have a rule against lifestyle creep raising T.",
              "A partner saw the same assumptions (share link / CSV / A-B compare).",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-300"
              >
                <span className="text-zinc-500" aria-hidden>
                  ☐
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="text-lg font-semibold text-zinc-50">Tools</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-400">
          <li>
            <Link
              href="/calculators/coast-fire"
              className="text-emerald-400 hover:underline"
            >
              Coast FIRE + free stress test
            </Link>
          </li>
          <li>
            <Link
              href="/calculators/years-to-fire"
              className="text-emerald-400 hover:underline"
            >
              Years to FIRE + free stress test
            </Link>
          </li>
          <li>
            <Link
              href="/resources/coast-fire-checklist"
              className="text-emerald-400 hover:underline"
            >
              Coast FIRE assumptions checklist
            </Link>
          </li>
          <li>
            <Link href="/approach" className="text-emerald-400 hover:underline">
              Approach &amp; limitations
            </Link>
          </li>
        </ul>
        <p className="mt-4 text-xs text-zinc-600">
          <Link href="/disclaimer" className="hover:text-emerald-400">
            Disclaimer
          </Link>
          . Not a forecast.
        </p>
      </section>
    </div>
  );
}
