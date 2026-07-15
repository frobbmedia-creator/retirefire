import Link from "next/link";
import type { CalculatorSeoContent } from "@/content/calculator-seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";

export function CalculatorSeoSection({
  content,
}: {
  content: CalculatorSeoContent;
}) {
  return (
    <section className="mt-14 max-w-3xl border-t border-zinc-800/80 pt-12">
      <JsonLd data={faqPageJsonLd(content.faq)} />

      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
        How this {content.title.replace(/ Calculator$/i, "").toLowerCase()}{" "}
        calculator works
      </h2>
      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-zinc-400">
        {content.howItWorks.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
      </div>

      <h3 className="mt-10 text-lg font-semibold text-zinc-100">Formula</h3>
      <pre className="mt-3 overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-emerald-300 ring-1 ring-zinc-800">
        {content.formula}
      </pre>

      <h3 className="mt-10 text-lg font-semibold text-zinc-100">
        {content.exampleTitle}
      </h3>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-zinc-400">
        {content.exampleBody.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">When to use it</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
            {content.whenToUse.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">Limitations</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
            {content.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="mt-10 text-lg font-semibold text-zinc-100">
        Related guides & tools
      </h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {content.related.map((r) => (
          <li key={r.href}>
            <Link
              href={r.href}
              className="inline-flex rounded-full bg-zinc-900 px-3 py-1.5 text-sm text-emerald-400 ring-1 ring-zinc-800 transition hover:bg-zinc-800 hover:ring-emerald-500/30"
            >
              {r.label}
            </Link>
          </li>
        ))}
      </ul>

      <h3 className="mt-10 text-lg font-semibold text-zinc-100">FAQ</h3>
      <dl className="mt-4 space-y-3">
        {content.faq.map((item) => (
          <div
            key={item.question}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4"
          >
            <dt className="font-medium text-zinc-100">{item.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-zinc-400">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 text-xs leading-relaxed text-zinc-600">
        Educational illustration only — not financial, investment, tax, or legal
        advice.{" "}
        <Link href="/disclaimer" className="text-zinc-500 hover:text-emerald-400">
          Full disclaimer
        </Link>
        .
      </p>
    </section>
  );
}
