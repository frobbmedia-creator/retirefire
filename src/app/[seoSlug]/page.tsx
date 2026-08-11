import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IncomeGapCalculator } from "@/components/calculators/IncomeGapCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  DECISION_PAGES,
  getDecisionPage,
} from "@/content/decision-pages";
import {
  faqPageJsonLd,
  pageMeta,
  webPageJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ seoSlug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return DECISION_PAGES.map((page) => ({ seoSlug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoSlug } = await params;
  const page = getDecisionPage(seoSlug);
  if (!page) return { title: "Page not found" };

  return pageMeta(`/${page.slug}`, {
    title: page.title,
    description: page.description,
    openGraph: {
      title: `${page.title} · RetireFire`,
      description: page.description,
      type: "article",
      publishedTime: page.datePublished,
      modifiedTime: page.dateModified,
    },
  });
}

export default async function DecisionPage({ params }: Props) {
  const { seoSlug } = await params;
  const page = getDecisionPage(seoSlug);
  if (!page) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd
        data={webPageJsonLd({
          title: page.title,
          description: page.description,
          path: `/${page.slug}`,
          datePublished: page.datePublished,
          dateModified: page.dateModified,
        })}
      />
      <JsonLd data={faqPageJsonLd(page.faq)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: page.title, path: `/${page.slug}` },
        ]}
      />

      <header className="mt-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
          {page.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-400">
          {page.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>Published {page.datePublished}</span>
          <span aria-hidden>·</span>
          <span>Updated {page.dateModified}</span>
        </div>
      </header>

      <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-zinc-300">
        {page.intro.map((paragraph) => (
          <p key={paragraph} className="text-zinc-400">
            {paragraph}
          </p>
        ))}
      </div>

      <aside className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-400">
          Bottom line
        </p>
        <p className="mt-2 leading-relaxed text-zinc-200">{page.takeaway}</p>
      </aside>

      {page.embeddedIncomeCalculator && (
        <div className="mt-10">
          <IncomeGapCalculator />
        </div>
      )}

      <div className="mt-10 space-y-10">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              {section.heading}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-[15px] leading-relaxed text-zinc-400"
              >
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-zinc-400">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {section.table && (
              <div className="mt-5 overflow-x-auto rounded-2xl border border-zinc-800">
                <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                  <caption className="border-b border-zinc-800 bg-zinc-900/70 px-4 py-3 text-left text-xs text-zinc-500">
                    {section.table.caption}
                  </caption>
                  <thead className="bg-zinc-900">
                    <tr>
                      {section.table.headers.map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="px-4 py-3 font-medium text-zinc-300"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr
                        key={row.join("|")}
                        className="border-t border-zinc-800/80"
                      >
                        {row.map((cell, index) => (
                          <td
                            key={`${index}-${cell}`}
                            className={
                              index === 0
                                ? "px-4 py-3 font-medium text-zinc-300"
                                : "px-4 py-3 text-zinc-400"
                            }
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Frequently asked questions
        </h2>
        <dl className="mt-5 space-y-4">
          {page.faq.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5"
            >
              <dt className="font-medium text-zinc-100">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-400">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <h2 className="text-lg font-semibold text-zinc-50">Keep planning</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {page.related.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full bg-zinc-950 px-3 py-1.5 text-sm text-zinc-400 ring-1 ring-zinc-800 hover:text-emerald-400"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <p className="mt-5">
          <Link
            href={page.calculatorHref}
            className="font-medium text-emerald-400 hover:underline"
          >
            {page.calculatorLabel} →
          </Link>
        </p>
        {page.download && (
          <p className="mt-3">
            <a
              href={page.download.href}
              download
              className="text-sm font-medium text-zinc-300 hover:text-emerald-400"
            >
              {page.download.label} ↓
            </a>
          </p>
        )}
      </section>

      <p className="mt-8 text-xs leading-relaxed text-zinc-600">
        Educational illustration only — not financial, investment, tax, legal,
        medical, or insurance advice. Calculations use simplified assumptions
        and do not predict future returns or benefits.
      </p>
    </article>
  );
}
