import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/disclaimer", {
  title: "Disclaimer",
  description:
    "Legal and educational disclaimer for RetireFire calculators. Not financial, investment, tax, or legal advice.",
});

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Disclaimer", path: "/disclaimer" },
        ]}
      />
      <p className="mt-6 text-sm font-medium text-amber-400">Legal</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Disclaimer
      </h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        Please read this carefully before using RetireFire.
      </p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-zinc-300">
        <section className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-amber-100">
            Not financial advice
          </h2>
          <p className="mt-2 text-amber-100/80">
            RetireFire provides general educational information and simplified
            calculators. Nothing on this site is financial, investment, tax,
            accounting, or legal advice. We do not know your full financial
            situation, risk tolerance, tax jurisdiction, or goals. Do not make
            decisions solely based on these tools.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">
            No guarantee of outcomes
          </h2>
          <p className="mt-2 text-zinc-400">
            Markets are uncertain. Historical studies of withdrawal rates (including
            research popularly associated with the “4% rule” and Trinity Study)
            describe past U.S. market periods under specific assumptions. They do
            not guarantee that any portfolio, withdrawal rate, or timeline will
            succeed in the future. Sequence of returns, inflation, fees, taxes,
            longevity, and spending flexibility can all change outcomes
            dramatically.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">
            Simplified models
          </h2>
          <p className="mt-2 text-zinc-400">
            Our calculators use constant returns, simple contribution timing, and
            user-supplied spending and rates. They omit many real-world factors
            (taxes, Social Security, pensions, healthcare costs, required minimum
            distributions, currency risk, home equity, insurance, and more). See{" "}
            <Link href="/methodology" className="text-emerald-400 hover:underline">
              Methodology
            </Link>{" "}
            for formulas and limitations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">
            No client relationship
          </h2>
          <p className="mt-2 text-zinc-400">
            Using this website does not create an advisor–client, fiduciary, or
            professional relationship. We are not a registered investment adviser,
            broker-dealer, or tax professional by virtue of offering these free
            tools.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">
            Consult qualified professionals
          </h2>
          <p className="mt-2 text-zinc-400">
            Before making financial decisions, consider consulting a licensed
            financial planner, tax advisor, and/or attorney who can evaluate your
            circumstances. If you are in financial distress, seek appropriate
            local resources.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">
            Accuracy &amp; availability
          </h2>
          <p className="mt-2 text-zinc-400">
            We aim for careful math and clear communication, but we do not warrant
            that the site is error-free, complete, or continuously available.
            Content may change without notice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">
            Limitation of liability
          </h2>
          <p className="mt-2 text-zinc-400">
            To the fullest extent permitted by law, RetireFire and its operators
            disclaim liability for any loss or damage arising from use of, or
            reliance on, this site or its calculators — including investment
            losses, tax consequences, or opportunity costs.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">Your responsibility</h2>
          <p className="mt-2 text-zinc-400">
            You are solely responsible for how you interpret and act on any
            estimates shown here. Double-check inputs, stress-test assumptions,
            and treat results as one of many planning inputs.
          </p>
        </section>
      </div>

      <p className="mt-12 text-sm text-zinc-500">
        Last updated: July 2026
      </p>
      <p className="mt-4">
        <Link
          href="/"
          className="text-sm font-medium text-emerald-400 hover:underline"
        >
          ← Back home
        </Link>
      </p>
    </div>
  );
}
