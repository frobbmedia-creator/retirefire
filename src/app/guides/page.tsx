import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { DECISION_PAGES } from "@/content/decision-pages";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/guides", {
  title: "FIRE Planning Guides by Question",
  description:
    "Practical FIRE planning guides organized by retirement age, annual spending, portfolio size, Coast FIRE, Social Security, pensions, and healthcare.",
  openGraph: {
    title: "FIRE Planning Guides by Question · RetireFire",
    description:
      "Find the calculator, table, or planning guide that matches the retirement question you are trying to answer.",
  },
});

const groups = [
  {
    title: "Retire by age",
    description: "Bridge healthcare and later income without hiding the timeline.",
    slugs: ["retire-at-50", "retire-at-55", "retire-at-60", "fire-number-by-age"],
  },
  {
    title: "Start with a portfolio or lifestyle",
    description: "Translate balances and annual spending into a tested range.",
    slugs: [
      "can-i-retire-with-1-million",
      "can-i-retire-with-2-million",
      "fire-number-by-spending",
    ],
  },
  {
    title: "Model the household",
    description: "Add later income, two-person timelines, and healthcare costs.",
    slugs: [
      "coast-fire-for-couples",
      "fire-calculator-with-social-security",
      "fire-calculator-with-pension",
      "early-retirement-health-insurance",
    ],
  },
  {
    title: "Coast FIRE",
    description: "See how time changes the amount required today.",
    slugs: ["coast-fire-by-age"],
  },
] as const;

export default function GuidesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ]}
      />
      <header className="mt-6 max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
          Start with your question
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          FIRE planning guides
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-400">
          Retirement math becomes easier when the page matches the decision.
          Choose an age, portfolio, spending level, or income source, then move
          into the full calculator with the assumptions visible.
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {groups.map((group) => {
          const pages = group.slugs
            .map((slug) => DECISION_PAGES.find((page) => page.slug === slug))
            .filter((page) => page !== undefined);

          return (
            <section key={group.title}>
              <h2 className="text-xl font-semibold text-zinc-50">
                {group.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">{group.description}</p>
              <ul className="mt-4 grid gap-4 md:grid-cols-2">
                {pages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/${page.slug}`}
                      className="block h-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-emerald-500/30 hover:bg-zinc-900"
                    >
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-emerald-400">
                        {page.eyebrow}
                      </p>
                      <h3 className="mt-2 font-medium text-zinc-100">
                        {page.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                        {page.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="mt-12 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
        <h2 className="text-lg font-semibold text-zinc-50">
          Prefer to start with the numbers?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Use the calculator hub for FIRE number, Years to FIRE, Coast FIRE,
          and Barista FIRE tools with shared assumptions.
        </p>
        <Link
          href="/calculators"
          className="mt-4 inline-block font-medium text-emerald-400 hover:underline"
        >
          Browse all calculators →
        </Link>
      </section>
    </main>
  );
}
