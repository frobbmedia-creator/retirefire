import { calculateFireNumber } from "@/lib/calculations";
import type { DecisionPage } from "@/content/decision-shared";

const septBoost = "2026-09-10";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function swrTable(annualSpending: number) {
  return {
    caption: `${money.format(annualSpending)} annual spending at common planning withdrawal rates`,
    headers: ["Planning withdrawal rate", "Portfolio multiple", "Portfolio target"],
    rows: [0.03, 0.035, 0.04].map((rate) => {
      const result = calculateFireNumber({
        annualExpenses: annualSpending,
        withdrawalRate: rate,
      });
      return [
        `${(rate * 100).toFixed(rate === 0.035 ? 1 : 0)}%`,
        `${result.multiplier.toFixed(1)}×`,
        money.format(result.fireNumber),
      ];
    }),
  };
}

const retireAt62Page: DecisionPage = {
  slug: "retire-at-62",
  title: "How much do you need to retire at 62?",
  description:
    "Retire at 62 with Social Security available immediately and Medicare three years away. Portfolio multiples, claiming-age tradeoffs, and a free calculator.",
  eyebrow: "Retire by age 62",
  datePublished: septBoost,
  dateModified: septBoost,
  intro: [
    "Age 62 is the first year most people can claim Social Security. That does not make it an automatic retirement date. Claiming early locks in a permanently smaller benefit, Medicare still waits until 65, and the portfolio may need to last 25–30 years.",
    "The honest estimate is still spending-first: decide what the household must spend before Medicare and after benefits begin, then test whether the portfolio can cover the gap at 3%, 3.5%, and 4%.",
  ],
  takeaway:
    "Treat 62 as two plans in one: a three-year pre-Medicare bridge plus a later Social Security phase. Claiming at 62 reduces the later benefit; delaying can shrink the portfolio gap if you can fund the wait.",
  sections: [
    {
      heading: "A practical starting range at age 62",
      paragraphs: [
        "The table below is a pre-tax illustration in today’s dollars for $60,000 of portfolio-funded spending. It does not include Social Security, a pension, taxes, fees, or one-time expenses.",
      ],
      table: swrTable(60_000),
    },
    {
      heading: "Why 62 is different from 50 or 65",
      bullets: [
        "Social Security can start now — but the monthly check is smaller than at full retirement age or 70.",
        "Medicare still begins at 65 for most people, so budget a three-year health-insurance bridge.",
        "The planning horizon is closer to a classic 30-year study window than a retire-at-40 plan, which is why 4% is more commonly used as a starting point — still not a promise.",
        "Account access is usually easier than at 50: IRAs and 401(k)s are generally available after 59½.",
      ],
    },
    {
      heading: "Model the claiming decision separately",
      paragraphs: [
        "A larger check at 67 or 70 can reduce the portfolio withdrawal later. It does not pay the bills at 62. Keep the early years and the later years as two phases, then decide whether delaying is funded by work, cash, or extra portfolio draw.",
        "For a quick later-phase estimate, subtract expected annual Social Security from annual spending and divide the remaining gap by the withdrawal rate. Fund the years before that higher benefit separately.",
      ],
    },
    {
      heading: "The risk that still matters at 62",
      paragraphs: [
        "Sequence of returns still dominates the first decade. A poor market in years 62–67 can force larger withdrawals just as healthcare is self-funded.",
      ],
      bullets: [
        "Run 3%, 3.5%, and 4% rather than defending one rate.",
        "Price actual pre-Medicare coverage instead of using a generic inflation add-on.",
        "Write the spending cut or part-time income you would use after a 20% drop.",
      ],
    },
  ],
  faq: [
    {
      question: "Is $1 million enough to retire at 62?",
      answer:
        "At 4%, $1 million supports about $40,000 of first-year portfolio withdrawals before taxes. With Social Security starting at 62, the combined cash flow may be enough for modest spending — and still fail if healthcare, housing, or early market losses are larger than planned.",
    },
    {
      question: "Should I claim Social Security at 62?",
      answer:
        "Claiming at 62 increases cash now and permanently reduces the later benefit. The better educational test is whether the portfolio can fund a delay. RetireFire does not recommend a claiming age.",
    },
    {
      question: "Do I still need a Medicare bridge at 62?",
      answer:
        "Yes for most people. Medicare generally begins at 65. Price three years of health coverage, including premiums, deductibles, and the loss of employer benefits.",
    },
  ],
  related: [
    { href: "/retire-at-60", label: "Retire at 60" },
    { href: "/can-i-retire-with-1-million", label: "Can I retire with $1M?" },
    { href: "/fire-calculator-with-social-security", label: "Include Social Security" },
    { href: "/early-retirement-health-insurance", label: "Healthcare before Medicare" },
    { href: "/blog/social-security-62-vs-70-fire", label: "Social Security 62 vs 70" },
    { href: "/series/arya-21-day", label: "Arya 21-day series" },
  ],
  calculatorHref: "/calculators/fire-number",
  calculatorLabel: "Run the FIRE Number calculator",
};

const portfolio400kPage: DecisionPage = {
  slug: "can-i-retire-with-400k",
  title: "Can I retire with $400,000?",
  description:
    "$400,000 supports about $12,000–$16,000 a year at 3%–4% before taxes. See when that works with Social Security, Lean spending, or Barista income — and when it does not.",
  eyebrow: "Portfolio reality check",
  datePublished: septBoost,
  dateModified: septBoost,
  intro: [
    "$400,000 is a common mid-career balance and a common search. It is rarely a full early-retirement portfolio on its own. It can be a viable traditional-retirement or Barista FIRE building block once later income and spending are honest.",
    "Translate the balance into spending first. At 4%, $400,000 supports about $16,000 of first-year portfolio withdrawals before taxes and fees. At 3%, about $12,000. Everything else — Social Security, housing, healthcare, work income — has to close the gap.",
  ],
  takeaway:
    "$400,000 is usually a supplement, not a solo early-retirement plan. It becomes workable when annual portfolio-funded spending stays near $12,000–$16,000, or when Social Security, a pension, or part-time work covers the rest.",
  sections: [
    {
      heading: "What $400,000 may support",
      table: {
        caption: "Illustrative first-year portfolio withdrawals",
        headers: ["Planning rate", "Annual withdrawal", "Monthly equivalent"],
        rows: [0.03, 0.035, 0.04].map((rate) => [
          `${(rate * 100).toFixed(rate === 0.035 ? 1 : 0)}%`,
          money.format(400_000 * rate),
          money.format((400_000 * rate) / 12),
        ]),
      },
    },
    {
      heading: "When $400k can work",
      bullets: [
        "Traditional retirement near 65–70 with Social Security covering a large share of essential spending.",
        "Paid-off housing and Lean annual spending in a lower-cost area.",
        "Barista FIRE: part-time or seasonal work plus a modest portfolio draw.",
        "A Coast checkpoint — $400k today can grow toward a later FIRE number if contributions stop but work income continues.",
      ],
    },
    {
      heading: "When $400k is not enough by itself",
      bullets: [
        "Retiring at 40–55 with $50,000–$80,000 of portfolio-funded spending and no other income.",
        "High housing costs, employer-benefit loss, and a long pre-Medicare gap.",
        "Debt payments that consume most of the 3%–4% withdrawal.",
        "Assuming 4% plus Social Security years before those benefits actually begin.",
      ],
    },
    {
      heading: "A practical next test",
      paragraphs: [
        "Write annual spending. Subtract only income that arrives in the same year. If the remaining gap is larger than $16,000, $400,000 at 4% does not close it. Raise savings, lower spending, add work income, or delay the date — then rerun the calculator.",
      ],
    },
  ],
  faq: [
    {
      question: "How much income can $400,000 generate?",
      answer:
        "A simple 3%–4% planning range is $12,000 to $16,000 in the first year before taxes and fees. It is a planning illustration, not a promised paycheck.",
    },
    {
      question: "Can I retire at 62 with $400,000?",
      answer:
        "Only if Social Security and any other income cover most essential spending, and the portfolio draw stays near the $12,000–$16,000 range after healthcare. Run the numbers rather than using the account balance as a yes/no.",
    },
    {
      question: "Is $400,000 a Coast FIRE number?",
      answer:
        "It can be, depending on age, target spending, and assumed real return. Use the Coast FIRE calculator with your actual target rather than treating $400k as a universal coast line.",
    },
  ],
  related: [
    { href: "/can-i-retire-with-500k", label: "Can I retire with $500k?" },
    { href: "/can-i-retire-with-1-million", label: "Can I retire with $1M?" },
    { href: "/retire-at-62", label: "Retire at 62" },
    { href: "/calculators/barista-fire", label: "Barista FIRE calculator" },
    { href: "/calculators/coast-fire", label: "Coast FIRE calculator" },
    { href: "/series/arya-21-day", label: "Arya 21-day series" },
  ],
  calculatorHref: "/calculators/fire-number",
  calculatorLabel: "Test your spending against $400k",
};

export const septBoostPages: DecisionPage[] = [retireAt62Page, portfolio400kPage];
