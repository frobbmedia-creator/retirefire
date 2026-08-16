import type { Metadata } from "next";
import Link from "next/link";
import { SeppCalculator } from "@/components/calculators/SeppCalculator";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CALCULATION_REGISTRY } from "@/lib/calculation-registry";
import { SEPP_SOURCES } from "@/lib/sepp";
import { pageMeta, webPageJsonLd } from "@/lib/seo";

const path = "/calculators/72t-sepp";
const title = "72(t) SEPP Methodology Preview — Validation Pending";
const description =
  "Explore the inputs and Notice 2022-6 methodology for substantially equal periodic payments. Numeric payment output is withheld pending independent professional validation.";

export const metadata: Metadata = pageMeta(path, {
  title,
  description,
  openGraph: {
    title: `${title} · RetireFire`,
    description,
  },
});

const seppRegistry = CALCULATION_REGISTRY.find(
  (method) => method.id === "sepp-72t",
);

export default function SeppMethodologyPreviewPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd
        data={webPageJsonLd({
          title,
          description,
          path,
          datePublished: "2026-08-15",
          dateModified: "2026-08-15",
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" },
          { name: "72(t) SEPP preview", path },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
            Methodology preview
          </p>
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
            Validation pending
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          72(t) SEPP methodology preview
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-400">
          Review example inputs and the structure of IRS Notice 2022-6 without
          receiving a payment amount.
        </p>
      </header>

      <aside className="mt-8 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5 text-sm leading-relaxed text-zinc-300">
        <h2 className="font-semibold text-amber-200">
          External professional validation is pending
        </h2>
        <p className="mt-2">
          This page is educational and is not tax, legal, or investment advice.
          Starting or modifying a SEPP series can have material tax consequences.
          RetireFire does not currently provide an actionable payment amount;
          consult a qualified tax professional before acting.
        </p>
      </aside>

      <div className="mt-8">
        <SeppCalculator
          registryStatus={seppRegistry?.status ?? "missing_registry_status"}
        />
      </div>

      <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-zinc-50">
          Methodology covered by the preview
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
            <h3 className="font-medium text-zinc-100">
              Required minimum distribution
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Uses an eligible account balance and life-expectancy factor. The
              balance, factor, and annual amount are redetermined for each
              distribution year using the same selected table. The first
              distribution date stays the modification-period anchor under
              Notice 2022-6 §2.04.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
            <h3 className="font-medium text-zinc-100">Fixed amortization</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Amortizes the account using a permitted interest rate and an
              eligible life-expectancy table. The permitted rate depends on
              Notice 2022-6 and official rates for the two preceding months.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 sm:col-span-2">
            <h3 className="font-medium text-zinc-100">
              Fixed annuitization and joint-life paths are unavailable
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Fixed annuitization remains unavailable because its distinct
              mortality-table path has not been reproducibly verified. The Joint
              and Last Survivor Table is also unavailable pending authoritative
              transcription and external review. This preview does not substitute
              another table or formula for either path.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-zinc-50">Key limitations</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
            <li>No eligibility determination or individualized tax guidance.</li>
            <li>No actionable annual or periodic payment output.</li>
            <li>
              No recapture-tax or interest calculation after a modification.
              Notice 2022-6 §2.04 is the cited modification/recapture rule.
            </li>
            <li>No automatic retrieval of the current federal mid-term rates.</li>
            <li>Each series and its withdrawals must be evaluated account by account.</li>
            <li>
              Pre-2022 commencements are outside this Notice 2022-6 preview and
              fail closed.
            </li>
            <li>
              Official 120% mid-term rate coverage currently supports first-payment
              months only through September 2026; later starts fail closed.
            </li>
            <li>
              Fixed-method 2022 starts fail closed because verified 2021 lookback
              rates are not in the ledger.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-zinc-50">
            Planning alternatives to explore
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            <li>
              <Link
                href="/calculators/roth-conversion"
                className="text-emerald-400 hover:underline"
              >
                Review a 2026 Roth conversion estimate
              </Link>
            </li>
            <li>
              <Link
                href="/calculators/barista-fire"
                className="text-emerald-400 hover:underline"
              >
                Model part-time income with Barista FIRE
              </Link>
            </li>
            <li className="text-zinc-400">
              Discuss taxable savings, cash reserves, Rule of 55 eligibility, and
              other bridge strategies with a qualified professional.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10 border-t border-zinc-800 pt-8">
        <h2 className="text-xl font-semibold text-zinc-50">Official sources</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <a
              href={SEPP_SOURCES.notice.url}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:underline"
            >
              IRS Notice 2022-6 (PDF)
            </a>
          </li>
          <li>
            <a
              href={SEPP_SOURCES.faq.url}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:underline"
            >
              IRS substantially equal periodic payments guidance
            </a>
          </li>
          <li>
            <a
              href={SEPP_SOURCES.singleLife.url}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:underline"
            >
              IRS Publication 590-B life-expectancy tables
            </a>
          </li>
          <li>
            <a
              href={SEPP_SOURCES.regulation.url}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:underline"
            >
              T.D. 9930 life-expectancy and distribution-period tables
            </a>
          </li>
        </ul>
        <p className="mt-4 text-xs text-zinc-500">
          Methodology record v{seppRegistry?.version ?? "unavailable"} · status:
          validation pending · page dated August 15, 2026
        </p>
      </section>
    </main>
  );
}
