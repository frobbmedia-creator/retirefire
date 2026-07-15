import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";

export const FAQ_ITEMS = [
  {
    question: "What is a FIRE number?",
    answer:
      "Your FIRE number is the invested portfolio size that can support your annual spending at a chosen safe withdrawal rate. At 4%, it is 25× annual spending (spending ÷ 0.04).",
  },
  {
    question: "Is the 4% rule guaranteed?",
    answer:
      "No. The 4% starting point comes from historical U.S. portfolio research (Bengen and the Trinity Study lineage). It is not a guarantee, especially for multi-decade early retirement horizons. Many planners stress-test 3–3.5%.",
  },
  {
    question: "What is Coast FIRE?",
    answer:
      "Coast FIRE means you have enough invested that, with no further contributions, compound growth may reach full FIRE by a traditional retirement age. You could stop saving aggressively — it does not mean you can stop working yet.",
  },
  {
    question: "What is Barista FIRE?",
    answer:
      "Barista FIRE is semi-retirement: part-time or flexible income covers some spending so your portfolio only needs to fund the remainder. The “barista number” is gap expenses ÷ withdrawal rate.",
  },
  {
    question: "Do you give financial advice?",
    answer:
      "No. RetireFire provides educational calculators only. Results are simplified illustrations. Consult qualified professionals before making financial decisions.",
  },
  {
    question: "Can I share my scenario?",
    answer:
      "Yes. Shared assumptions sync to the URL. Use “Copy share link” so others can open the same inputs.",
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
      </div>
    </section>
  );
}

/** JSON-LD for FAQPage rich results */
export function FaqJsonLd() {
  return <JsonLd data={faqPageJsonLd(FAQ_ITEMS)} />;
}
