import Link from "next/link";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";

export const FAQ_ITEMS = [
  {
    question: "What is a FIRE number?",
    answer:
      "Your FIRE number is the invested portfolio size that can support your annual spending at a chosen safe withdrawal rate. At 4%, it is 25× annual spending (spending ÷ 0.04). Lean, Regular, and Fat are optional spending presets — not research standards.",
  },
  {
    question: "Is the 4% rule guaranteed?",
    answer:
      "No. The 4% starting point comes from historical U.S. portfolio research (Bengen and the Trinity Study lineage). It is not a guarantee, especially for multi-decade early retirement horizons. Many planners stress-test 3–3.5%. Use the FIRE Number calculator and SWR guide to compare multiples.",
  },
  {
    question: "What is Coast FIRE?",
    answer:
      "Coast FIRE means you have enough invested that, with no further contributions, compound growth may reach full FIRE by a traditional retirement age. You could stop saving aggressively — it does not mean you can stop working yet. Use the Coast checklist before changing savings behavior.",
  },
  {
    question: "What is Barista FIRE?",
    answer:
      "Barista FIRE is semi-retirement: part-time or flexible income covers some spending so your portfolio only needs to fund the remainder. The “barista number” is gap expenses ÷ withdrawal rate. Healthcare and hour cliffs often dominate the gap math — see the Barista healthcare guide.",
  },
  {
    question: "Which lever shortens years to FIRE most?",
    answer:
      "For most mid-journey planners, spending and savings rate move the timeline more than optimistic return assumptions. Spending cuts often help twice (lower target, higher savings). Use Years to FIRE and Scenario compare to change one lever at a time.",
  },
  {
    question: "Do you give financial advice?",
    answer:
      "No. RetireFire provides educational calculators only. Results are simplified illustrations. Consult qualified professionals before making financial decisions. See the full disclaimer.",
  },
  {
    question: "Can I share or print my scenario?",
    answer:
      "Yes. Shared assumptions sync to the URL — use “Copy share link.” Export CSV for notes. Free resource pages (Coast checklist, sequence-risk guide) support browser Print / Save as PDF with no account.",
  },
  {
    question: "Do you model sequence-of-returns risk?",
    answer:
      "Core calculators still use constant-return illustrations. Coast FIRE and Years to FIRE also include a free basic stress test: 1,000 random return paths with fixed volatility, success rate, p10/p50/p90 terminals, and sample paths. It is educational — not a forecast or historical backtest. See Methodology and the sequence-risk guide.",
  },
  {
    question: "How do I compare two plans side by side?",
    answer:
      "Use free Scenario compare on the homepage calculator hub: pin today’s assumptions as baseline A, change shared inputs, and read live B with deltas for FIRE, years, Coast, and Barista. Saved multi-scenario history is a planned Pro depth feature — basic A/B stays free.",
  },
  {
    question: "Will the calculators stay free?",
    answer:
      "Yes for the core tools. If optional Pro features ship later (advanced stress tests, saved scenarios, detailed reports), the basic calculators and a useful free stress-test tier are intended to remain free. See Our Approach for principles.",
  },
] as const;

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 border-b border-zinc-800/60">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          FAQ
        </h2>
        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
          Quick answers about {SITE.name} tools and FIRE concepts.
        </p>
        <dl className="mt-8 space-y-4">
          {FAQ_ITEMS.map((item) => (
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
        <p className="mt-8 text-sm text-zinc-500">
          Go deeper:{" "}
          <Link href="/methodology" className="text-emerald-400 hover:underline">
            Methodology
          </Link>
          {" · "}
          <Link href="/approach" className="text-emerald-400 hover:underline">
            Approach
          </Link>
          {" · "}
          <Link href="/resources" className="text-emerald-400 hover:underline">
            Free resources
          </Link>
          {" · "}
          <Link
            href="/blog/retirefire-methodology-explained"
            className="text-emerald-400 hover:underline"
          >
            Human methodology tour
          </Link>
          {" · "}
          <Link href="/blog" className="text-emerald-400 hover:underline">
            Blog
          </Link>
        </p>
      </div>
    </section>
  );
}

/** JSON-LD for FAQPage rich results */
export function FaqJsonLd() {
  return <JsonLd data={faqPageJsonLd(FAQ_ITEMS)} />;
}
