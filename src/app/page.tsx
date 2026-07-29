import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/constants";
import {
  pageMeta,
  webApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta("/", {
  title: {
    absolute: `${SITE.title} · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.title} · ${SITE.name}`,
    description: SITE.description,
  },
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd
        data={webApplicationJsonLd({
          name: SITE.name,
          description: SITE.description,
          url: `https://${SITE.domain}`,
        })}
      />

      <Hero />
      <section className="border-b border-zinc-800/60 bg-zinc-900/20">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-7 sm:px-6 sm:py-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400">
              Start here
            </p>
            <h2 className="mt-2 text-xl font-semibold text-zinc-50">
              Make the household decision
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Find out whether your current savings, family spending, and
              expected retirement income point to the retirement age you want.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link
                href="/retirement-checkup"
                className="font-semibold text-emerald-400 hover:underline"
              >
                Retirement checkup →
              </Link>
              <Link
                href="/calculators/retirement-age"
                className="text-zinc-300 hover:text-emerald-400"
              >
                Retirement age
              </Link>
              <Link
                href="/calculators/couples-fire"
                className="text-zinc-300 hover:text-emerald-400"
              >
                Couples
              </Link>
              <Link
                href="/calculators/healthcare-budget"
                className="text-zinc-300 hover:text-emerald-400"
              >
                Healthcare
              </Link>
            </div>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/45 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Go deeper
            </p>
            <h2 className="mt-2 text-xl font-semibold text-zinc-50">
              Advanced FIRE and portfolio analysis
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Use transparent formulas, market-path testing, downloadable data,
              and specialist FIRE tools without hiding the assumptions.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link
                href="/calculators"
                className="font-semibold text-emerald-400 hover:underline"
              >
                All advanced tools →
              </Link>
              <Link
                href="/methodology"
                className="text-zinc-300 hover:text-emerald-400"
              >
                Methodology
              </Link>
              <Link
                href="/research"
                className="text-zinc-300 hover:text-emerald-400"
              >
                Research
              </Link>
              <Link
                href="/resources/sequence-risk-guide"
                className="text-zinc-300 hover:text-emerald-400"
              >
                Market risk
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
