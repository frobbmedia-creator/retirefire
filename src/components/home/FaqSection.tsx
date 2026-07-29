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
      "No. The 4% starting point comes from studies of past U.S. markets. Future results may be different, especially when retirement could last 40 years or more. Try lower rates, such as 3% or 3.5%, to see how much more savings they require.",
  },
  {
    question: "What is Coast FIRE?",
    answer:
      "Coast FIRE means your current retirement savings may grow enough to fund retirement later, even if you stop adding money. You would usually keep working to pay today’s bills. It does not mean you can retire now.",
  },
  {
    question: "What is Barista FIRE?",
    answer:
      "Barista FIRE means working part time while using investments to cover the rest of your expenses. Because work pays some bills, you may need a smaller investment portfolio. Include health insurance and taxes in the plan.",
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
      "The main calculators first show a simple, steady growth estimate. Coast FIRE and Years to FIRE can also test 1,000 possible market paths. This shows how early gains or losses could change the result. It is an educational range, not a prediction.",
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
      <div className="mx-auto max-w-3xl px-4 py-9 sm:px-6 sm:py-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          FAQ
        </h2>
        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
          Quick answers about {SITE.name} tools and FIRE concepts.
        </p>
        <div className="mt-6 divide-y divide-zinc-800 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/35">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group px-4 py-4 open:bg-zinc-900/70 sm:px-5"
            >
              <summary className="cursor-pointer list-none pr-8 font-medium text-zinc-100 marker:content-none">
                {item.question}
                <span className="float-right -mr-6 text-zinc-500 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-sm text-zinc-500">
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
