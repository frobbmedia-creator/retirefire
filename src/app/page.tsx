import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FaqSection, FaqJsonLd } from "@/components/home/FaqSection";
import { PlannerShell } from "@/components/planner/PlannerShell";
import { CalculatorHub } from "@/components/calculators/CalculatorHub";
import { SITE } from "@/lib/constants";

const CALC_LINKS = [
  {
    href: "/calculators/fire-number",
    title: "FIRE Number",
    body: "25× spending at 4% — Lean, Regular, Fat presets",
  },
  {
    href: "/calculators/years-to-fire",
    title: "Years to FIRE",
    body: "Timeline with savings, returns, and growth chart",
  },
  {
    href: "/calculators/coast-fire",
    title: "Coast FIRE",
    body: "Stop saving when growth alone can finish the job",
  },
  {
    href: "/calculators/barista-fire",
    title: "Barista FIRE",
    body: "Part-time income shrinks the portfolio you need",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: SITE.name,
            url: `https://${SITE.domain}`,
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description: SITE.description,
          }),
        }}
      />

      <Hero />
      <TrustStrip />

      <section className="border-b border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Dedicated calculator pages
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CALC_LINKS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 transition hover:border-emerald-500/30 hover:bg-zinc-900"
              >
                <p className="font-medium text-zinc-100">{c.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {c.body}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="calculators"
        className="scroll-mt-20 border-b border-zinc-800/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <PlannerShell sharePath="/">
            <CalculatorHub />
          </PlannerShell>
        </div>
      </section>

      <section className="border-b border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-950 p-6 sm:p-8 lg:p-10">
            <h2 className="text-xl font-semibold text-zinc-50 sm:text-2xl">
              How we approach FIRE math
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              <li>
                <strong className="text-zinc-200">Withdrawal rates</strong> —
                The “4% rule” lineage (Bengen / Trinity Study). Early retirees
                often prefer 3–3.5%.
              </li>
              <li>
                <strong className="text-zinc-200">Real vs nominal</strong> —
                Default is real return (~5%). Toggle nominal and set inflation
                to convert automatically.
              </li>
              <li>
                <strong className="text-zinc-200">Coast &amp; Barista</strong> —
                Discount full FIRE for coasting, or shrink the target when work
                income covers part of spending.
              </li>
            </ul>
            <p className="mt-6 text-sm text-zinc-500">
              Full sources:{" "}
              <Link
                href="/methodology"
                className="font-medium text-emerald-400 underline-offset-2 hover:underline"
              >
                Methodology
              </Link>
              . Guides:{" "}
              <Link
                href="/blog"
                className="font-medium text-emerald-400 underline-offset-2 hover:underline"
              >
                Blog
              </Link>
              . Legal:{" "}
              <Link
                href="/disclaimer"
                className="font-medium text-emerald-400 underline-offset-2 hover:underline"
              >
                Disclaimer
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
