import { calculateCoastFire } from "@/lib/calculations";
import type { DecisionPage } from "@/content/decision-shared";
import { expanded, money, published } from "@/content/decision-shared";

const spendingRows = [30_000, 40_000, 50_000, 60_000, 80_000, 100_000, 120_000, 150_000].map(
  (spend) => [
    money.format(spend),
    money.format(spend / 0.04),
    money.format(spend / 0.035),
    money.format(spend / 0.03),
  ],
);

const coastRows = [25, 30, 35, 40, 45, 50, 55, 60].map((age) => {
  const fireNumber = 1_500_000;
  const result = calculateCoastFire({
    fireNumber,
    currentPortfolio: 0,
    currentAge: age,
    retirementAge: 65,
    annualReturn: 0.05,
  });
  return [String(age), String(65 - age), money.format(result.coastNumber)];
});

export const evergreenPagesA: DecisionPage[] = [
  {
    slug: "fire-number-by-spending",
    title: "FIRE number by annual spending",
    description:
      "Compare FIRE portfolio targets for $30,000–$150,000 of annual spending at 3%, 3.5%, and 4% planning withdrawal rates.",
    eyebrow: "Original planning table",
    datePublished: published,
    dateModified: expanded,
    intro: [
      "Annual spending is the strongest direct input in a simple FIRE target. Every permanent $10,000 of portfolio-funded spending adds $250,000 at 4%, about $286,000 at 3.5%, or about $333,000 at 3%.",
      "Use this table as a sensitivity map, not a verdict. Replace the example row with your own all-in spending and account separately for taxes, later income, fees, and large irregular expenses.",
    ],
    takeaway:
      "A permanent $10,000 spending change moves a simple FIRE target by roughly $250,000–$333,000 across the 4%–3% planning range.",
    sections: [
      {
        heading: "FIRE targets from $30,000 to $150,000 of spending",
        table: {
          caption: "Portfolio target = annual spending ÷ planning withdrawal rate",
          headers: ["Annual spending", "4% target", "3.5% target", "3% target"],
          rows: spendingRows,
        },
      },
      {
        heading: "What belongs in annual spending",
        bullets: [
          "Housing, food, transportation, insurance, healthcare, travel, gifts, and taxes paid from withdrawals.",
          "Annualized irregular expenses such as vehicles, home repairs, technology, and major dental work.",
          "A realistic replacement for employer-paid benefits that disappear.",
          "Not savings contributions that end when retirement begins, unless they fund another goal.",
        ],
      },
      {
        heading: "Why lowering spending has double leverage",
        paragraphs: [
          "Lower spending reduces the target and may increase the amount you can invest while working. That is more controllable than assuming a higher return. But a budget that survives only through permanent deprivation is not a durable retirement plan.",
        ],
      },
    ],
    faq: [
      {
        question: "How is a FIRE number calculated?",
        answer: "Divide annual portfolio-funded spending by the planning withdrawal rate.",
      },
      {
        question: "Should taxes be included in spending?",
        answer:
          "Include taxes that must be paid from portfolio withdrawals. The amount depends on account types and withdrawal order, which a simple table does not model.",
      },
      {
        question: "Why show three withdrawal rates?",
        answer:
          "Withdrawal-rate choice materially changes the target. Showing 3%, 3.5%, and 4% makes that sensitivity visible rather than hiding it behind one default.",
      },
    ],
    related: [
      { href: "/calculators/fire-number", label: "Calculate your FIRE number" },
      { href: "/can-i-retire-with-1-million", label: "Can I retire with $1M?" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
      { href: "/blog/lean-regular-fat-fire-numbers-2026", label: "Lean, Regular, and Fat examples" },
      { href: "/blog/safe-withdrawal-rate-3-vs-4-percent", label: "Choose a planning range" },
    ],
    calculatorHref: "/calculators/fire-number",
    calculatorLabel: "Use your exact spending",
  },
  {
    slug: "coast-fire-by-age",
    title: "Coast FIRE number by age",
    description:
      "Compare illustrative Coast FIRE numbers from age 25 to 60 for a $1.5 million target at a 5% real return and retirement at 65.",
    eyebrow: "Original age table",
    datePublished: published,
    dateModified: expanded,
    intro: [
      "A Coast FIRE number is the amount invested today that could grow to a future FIRE target without additional retirement contributions. Age matters because compounding has more years to work.",
      "The table holds the target, retirement age, and real return constant so you can see the age effect clearly. It is not a forecast.",
    ],
    takeaway:
      "Under a smooth 5% real-return illustration, waiting from age 30 to 40 roughly doubles the amount needed today for the same age-65 target.",
    sections: [
      {
        heading: "Age 25–60 Coast FIRE table",
        table: {
          caption: "$1.5M target at age 65, assuming 5% real growth and no new contributions",
          headers: ["Current age", "Years to 65", "Illustrative Coast number"],
          rows: coastRows,
        },
      },
      {
        heading: "Formula",
        paragraphs: [
          "Coast number = future FIRE target ÷ (1 + real return) ^ years. The formula is intentionally simple: it assumes a constant return and ignores the path markets take.",
        ],
      },
      {
        heading: "Stress the assumptions before reducing contributions",
        bullets: [
          "Lower the real-return assumption from 5% to 4% or 3%.",
          "Raise the spending target by 10%–20%.",
          "Test a later or earlier retirement age.",
          "Keep emergency savings and near-term goals separate from the Coast portfolio.",
        ],
      },
    ],
    faq: [
      {
        question: "What age is best for Coast FIRE?",
        answer:
          "There is no best age. Earlier ages benefit from more compounding time, while later ages reduce uncertainty about spending and career plans.",
      },
      {
        question: "Does Coast FIRE mean I can retire now?",
        answer:
          "No. Coast FIRE normally means current investments may fund a later retirement target while work still covers current living expenses.",
      },
      {
        question: "Does the Coast number include future contributions?",
        answer:
          "The basic definition assumes no additional retirement contributions. A two-phase plan can model continued contributions before a later coast period.",
      },
    ],
    related: [
      { href: "/calculators/coast-fire", label: "Coast FIRE calculator" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
      { href: "/blog/coast-fire-by-age-tables", label: "More Coast age examples" },
      { href: "/resources/coast-fire-checklist", label: "Coast assumptions checklist" },
      { href: "/blog/how-to-stress-test-coast-fire-number", label: "Stress-test the result" },
    ],
    calculatorHref: "/calculators/coast-fire",
    calculatorLabel: "Calculate your Coast number",
    download: {
      href: "/data/coast-fire-by-age.csv",
      label: "Download the Coast-by-age table (CSV)",
    },
  },
  {
    slug: "coast-fire-for-couples",
    title: "Coast FIRE for couples",
    description:
      "Plan Coast FIRE for two people using shared spending, separate retirement dates, account ownership, benefits, and survivor scenarios.",
    eyebrow: "Household planning",
    datePublished: published,
    dateModified: expanded,
    intro: [
      "Couples do not need two independent Coast FIRE numbers if they fund one shared household. They need a household target that respects different ages, account ownership, benefit dates, and what happens when one income or one person is gone.",
      "Start with shared spending, then model each partner’s timeline rather than averaging ages and hoping the difference disappears.",
    ],
    takeaway:
      "Use one household spending target, but keep each partner’s age, account access, Social Security or pension timing, and survivor needs separate.",
    sections: [
      {
        heading: "A five-step couples workflow",
        bullets: [
          "Build one retirement budget and identify costs that will not fall by half for a survivor.",
          "List accounts by owner, tax type, and earliest practical access date.",
          "Calculate the household FIRE target from the portfolio-funded spending gap.",
          "Discount the target across each relevant time horizon rather than using an average age.",
          "Run one-partner-working, both-coasting, and survivor scenarios.",
        ],
      },
      {
        heading: "Do not average away important differences",
        paragraphs: [
          "Ages, health coverage, pensions, and Social Security claiming dates can differ. An average age may be acceptable for a rough sketch but can hide a long coverage bridge or an account-access problem.",
        ],
      },
      {
        heading: "Questions to answer before either partner cuts back",
        bullets: [
          "Whose employment supplies health insurance?",
          "Can either partner return to full-time work if the plan underperforms?",
          "How are unpaid care, chores, and free time expected to change?",
          "What spending remains if one partner dies?",
        ],
      },
    ],
    faq: [
      {
        question: "Should couples combine retirement accounts?",
        answer:
          "The planning view can combine balances, but legal ownership and tax treatment remain account-specific. Preserve those distinctions in implementation.",
      },
      {
        question: "Can one partner Coast FIRE while the other keeps saving?",
        answer:
          "Yes. Model each contribution stream and the shared target explicitly rather than applying one label to both people.",
      },
      {
        question: "Should couples use joint spending?",
        answer:
          "Usually yes for the household target, with separate timing for benefits, account access, and survivor adjustments.",
      },
    ],
    related: [
      { href: "/calculators/coast-fire", label: "Coast FIRE calculator" },
      { href: "/calculators/barista-fire", label: "Model part-time income" },
      { href: "/fire-calculator-with-social-security", label: "Add later income" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
    ],
    calculatorHref: "/calculators/coast-fire",
    calculatorLabel: "Run a household Coast scenario",
  },
];
