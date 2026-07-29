import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { DECISION_PAGES } from "@/content/decision-pages";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/research", {
  title: "RetireFire Research & Downloadable FIRE Data",
  description:
    "Original FIRE planning tables, transparent assumptions, and downloadable CSV data covering Coast FIRE by age, retirement timing, and calculator differences.",
  openGraph: {
    title: "RetireFire Research & Data",
    description:
      "Downloadable retirement-planning tables with formulas and limitations published beside the results.",
  },
});

const slugs = [
  "coast-fire-by-age",
  "one-year-of-waiting-fire-number",
  "retire-at-50-vs-55-vs-60",
  "why-fire-calculators-disagree",
] as const;

export default function ResearchPage() {
  const pages = slugs
    .map((slug) => DECISION_PAGES.find((page) => page.slug === slug))
    .filter((page) => page !== undefined);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Research", path: "/research" },
        ]}
      />
      <header className="mt-6 max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
          Reuse the numbers
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          RetireFire research and data
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-400">
          Original planning tables with formulas, assumptions, limitations,
          and downloadable CSV files. Cite or reuse them with attribution to
          RetireFire and a link to the source page.
        </p>
      </header>

      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {pages.map((page) => (
          <li key={page.slug}>
            <article className="flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-emerald-400">
                Data + methodology
              </p>
              <h2 className="mt-2 text-lg font-medium text-zinc-100">
                <Link href={`/${page.slug}`} className="hover:text-emerald-400">
                  {page.title}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">
                {page.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <Link
                  href={`/${page.slug}`}
                  className="font-medium text-emerald-400 hover:underline"
                >
                  Read the analysis →
                </Link>
                {page.download && (
                  <a
                    href={page.download.href}
                    download
                    className="text-zinc-400 hover:text-zinc-200"
                  >
                    Download CSV ↓
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>

      <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="text-lg font-semibold text-zinc-50">
          Methodology before headlines
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          These tables are educational illustrations, not forecasts. The
          assumptions remain visible so readers can reproduce, challenge, and
          replace them.
        </p>
        <Link
          href="/methodology"
          className="mt-4 inline-block font-medium text-emerald-400 hover:underline"
        >
          Read the methodology →
        </Link>
      </section>
    </main>
  );
}
