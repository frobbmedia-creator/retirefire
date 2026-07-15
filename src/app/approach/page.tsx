import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/approach", {
  title: "Our Approach, Limitations & Roadmap",
  description:
    "How RetireFire builds transparent FIRE calculators: philosophy, deliberate limitations, sequence-of-returns roadmap, and what will always stay free.",
  openGraph: {
    title: "Our Approach, Limitations & Roadmap · RetireFire",
    description:
      "Transparency-first FIRE tools — published math, clear limits, free educational stress tests, free core forever.",
  },
});

export default function ApproachPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Approach", path: "/approach" },
        ]}
      />
      <p className="mt-6 text-sm font-medium text-emerald-400">Authority &amp; trust</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Our approach, limitations &amp; roadmap
      </h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        RetireFire exists for people who want{" "}
        <strong className="font-medium text-zinc-200">clear FIRE math</strong>{" "}
        without hype, hidden assumptions, or a forced account wall. This page is
        the product philosophy — companion to the detailed{" "}
        <Link href="/methodology" className="text-emerald-400 hover:underline">
          methodology
        </Link>{" "}
        and the legal{" "}
        <Link href="/disclaimer" className="text-emerald-400 hover:underline">
          disclaimer
        </Link>
        .
      </p>

      <div className="mt-12 space-y-12 text-[15px] leading-relaxed text-zinc-300">
        <section>
          <h2 className="text-xl font-semibold text-zinc-50">1. Philosophy</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-400">
            <li>
              <strong className="text-zinc-200">Transparency first.</strong>{" "}
              Formulas and defaults are published. If we can&apos;t explain an
              input in plain language, it doesn&apos;t ship.
            </li>
            <li>
              <strong className="text-zinc-200">Value first.</strong> Core
              calculators stay free and useful. Growth never depends on
              misleading promises.
            </li>
            <li>
              <strong className="text-zinc-200">Risk-aware, not fear-based.</strong>{" "}
              Sequence of returns, long horizons, and fragile assumptions get
              honest treatment — without theater.
            </li>
            <li>
              <strong className="text-zinc-200">Educational only.</strong> We
              do not provide personalized financial, tax, or investment advice.
              Point estimates are illustrations, not destinies.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            2. What we optimize for
          </h2>
          <p className="mt-3 text-zinc-400">
            Most people arrive with one of four questions:{" "}
            <em className="text-zinc-300">What&apos;s my number?</em>{" "}
            <em className="text-zinc-300">How long might it take?</em>{" "}
            <em className="text-zinc-300">Can I stop aggressive saving?</em>{" "}
            <em className="text-zinc-300">What if I keep some work income?</em>
          </p>
          <p className="mt-3 text-zinc-400">
            That maps to FIRE Number, Years to FIRE, Coast FIRE, and Barista
            FIRE — with shared assumptions so comparisons stay consistent. Share
            links and CSV export exist so scenarios can leave the browser
            without an account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            3. Deliberate limitations (today)
          </h2>
          <p className="mt-3 text-zinc-400">
            Omitting complexity is a product choice when it keeps models
            understandable. Current tools do{" "}
            <strong className="text-zinc-200">not</strong> fully model:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-400">
            <li>Taxes, account types, RMDs, or withdrawal ordering</li>
            <li>Investment fees and advisory costs</li>
            <li>Social Security, pensions, or annuities</li>
            <li>Healthcare premiums and subsidy cliffs</li>
            <li>
              Historical market cycles, taxes inside simulations, and advanced
              regimes (a free basic Monte Carlo stress test is available on
              Coast and Years tools)
            </li>
            <li>Currency risk, home equity strategies, and behavioral spending</li>
          </ul>
          <p className="mt-3 text-zinc-400">
            A clean Coast or FIRE number can still be{" "}
            <em>wrong for decisions</em> if taxes, healthcare, or bad early
            returns dominate. Use ranges, not single-point confidence.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            4. Roadmap teaser (transparent)
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-zinc-800">
            <table className="w-full min-w-[280px] text-left text-sm">
              <thead className="bg-zinc-900 text-zinc-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Horizon</th>
                  <th className="px-4 py-3 font-medium">Focus</th>
                  <th className="px-4 py-3 font-medium">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                <tr>
                  <td className="px-4 py-3">Now</td>
                  <td className="px-4 py-3 text-zinc-400">
                    Deterministic suite, share URLs, CSV export, methodology, and
                    free basic sequence stress test (1,000 paths) on Coast &amp;
                    Years
                  </td>
                  <td className="px-4 py-3 font-medium text-emerald-400">Free</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Later</td>
                  <td className="px-4 py-3 text-zinc-400">
                    More paths, regimes, historical cycles, saved scenarios,
                    detailed reports, optional tax/SS modules
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    Free core + optional Pro
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-zinc-400">
            If Pro ships, the promise is simple:{" "}
            <strong className="text-zinc-200">
              core calculators and a useful basic stress test remain free
            </strong>
            . Paid features must add clear value — not gate the essentials.
            Pricing will be published for approval before launch; nothing is
            final until then.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            5. How we talk about results
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-400">
            <li>Prefer “under these assumptions” over “you will.”</li>
            <li>Prefer ranges and sensitivity over false precision.</li>
            <li>Label research lineage (e.g. 4% starting points) as history-based, not guaranteed.</li>
            <li>Never promise lifestyle, market, or tax outcomes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">6. Feedback loop</h2>
          <p className="mt-3 text-zinc-400">
            If a formula is unclear, an assumption is buried, or a result
            encourages overconfidence, that is a product bug. Use the on-site
            feedback control or compare notes against{" "}
            <Link href="/methodology" className="text-emerald-400 hover:underline">
              Methodology
            </Link>
            .
          </p>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-4 text-sm">
        <Link
          href="/#calculators"
          className="font-medium text-emerald-400 hover:underline"
        >
          ← Open calculators
        </Link>
        <Link
          href="/methodology"
          className="font-medium text-zinc-400 hover:text-emerald-400 hover:underline"
        >
          Methodology
        </Link>
        <Link
          href="/resources/coast-fire-checklist"
          className="font-medium text-zinc-400 hover:text-emerald-400 hover:underline"
        >
          Coast checklist
        </Link>
        <Link
          href="/blog"
          className="font-medium text-zinc-400 hover:text-emerald-400 hover:underline"
        >
          Blog
        </Link>
      </div>
    </div>
  );
}
