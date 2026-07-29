import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { HomeQuickCalculator } from "@/components/home/HomeQuickCalculator";
import { FaqSection, FaqJsonLd } from "@/components/home/FaqSection";
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
      <FaqJsonLd />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd
        data={webApplicationJsonLd({
          name: SITE.name,
          description: SITE.description,
          url: `https://${SITE.domain}`,
        })}
      />

      <Hero />

      <HomeQuickCalculator />

      <section className="border-b border-zinc-800/60">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-semibold text-zinc-100">
                Simple first answer. Serious FIRE depth.
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                Every advanced tool shows its assumptions, limits, and formulas.
                No account or paywall is required.
              </p>
            </div>
            <p className="flex shrink-0 flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link
                href="/calculators"
                className="font-medium text-emerald-400 hover:underline"
              >
                All FIRE tools
              </Link>
              <Link
                href="/methodology"
                className="font-medium text-emerald-400 hover:underline"
              >
                Methodology
              </Link>
              <Link
                href="/research"
                className="font-medium text-emerald-400 hover:underline"
              >
                Research
              </Link>
              <Link
                href="/guides"
                className="font-medium text-emerald-400 hover:underline"
              >
                Guides
              </Link>
            </p>
          </div>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
