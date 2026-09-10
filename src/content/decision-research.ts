import type { DecisionPage } from "@/content/decision-shared";
import { expanded, money, published } from "@/content/decision-shared";

const researchPages: DecisionPage[] = [
  {
    slug: "one-year-of-waiting-fire-number",
    title: "What one more year can change on the path to FIRE",
    description:
      "See how one additional year of contributions and 5% real growth changes portfolios from $100,000 to $1 million, with the assumptions kept visible.",
    eyebrow: "RetireFire Research",
    datePublished: published,
    dateModified: expanded,
    intro: [
      "One more working year affects a FIRE plan through new contributions, potential portfolio growth, one fewer year of withdrawals, and sometimes lower annual spending or better benefits. The first two effects are easy to isolate.",
      "This table holds the annual contribution at $40,000 and the illustrative real return at 5%. Actual markets do not deliver a smooth return, and waiting has a life cost that a portfolio table cannot value.",
    ],
    takeaway:
      "With a $40,000 contribution and 5% real growth, one year adds roughly $45,000 to a $100,000 starting portfolio and $90,000 to a $1 million starting portfolio before taxes or fees.",
    sections: [
      {
        heading: "One-year portfolio change",
        table: {
          caption: "Starting portfolio × 1.05 + $40,000 end-of-year contribution",
          headers: ["Starting portfolio", "Growth at 5%", "Contribution", "After one year", "Change"],
          rows: [100_000, 250_000, 500_000, 1_000_000].map((portfolio) => {
            const growth = portfolio * 0.05;
            const contribution = 40_000;
            return [
              money.format(portfolio),
              money.format(growth),
              money.format(contribution),
              money.format(portfolio + growth + contribution),
              money.format(growth + contribution),
            ];
          }),
        },
      },
      {
        heading: "Why the answer grows with the portfolio",
        paragraphs: [
          "The contribution is identical in every row. The difference comes from the amount exposed to the assumed return. This is why late-stage FIRE progress can become more sensitive to market paths than to savings alone.",
        ],
      },
      {
        heading: "What the table deliberately leaves out",
        bullets: [
          "A negative or unusually strong market year.",
          "Employer match, taxes, fees, and changing contributions.",
          "The value of health coverage, vesting, or a pension credit.",
          "The personal cost of delaying a life change by one year.",
        ],
      },
    ],
    faq: [
      {
        question: "Does working one more year always improve a FIRE plan?",
        answer:
          "Financially it often adds savings and shortens the withdrawal horizon, but markets can fall and the personal tradeoff may still make waiting unattractive.",
      },
      {
        question: "Why use a real return?",
        answer:
          "A real return keeps the portfolio and spending target in today’s purchasing power rather than mixing nominal growth with current-dollar expenses.",
      },
      {
        question: "Should I assume 5% every year?",
        answer:
          "No. Five percent is a smooth planning illustration. Stress-test lower returns and adverse sequences.",
      },
    ],
    related: [
      { href: "/calculators/years-to-fire", label: "Years to FIRE calculator" },
      { href: "/resources/sequence-risk-guide", label: "Sequence-risk guide" },
      { href: "/blog/years-to-fire-which-lever-moves-the-needle", label: "Compare the levers" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
    ],
    calculatorHref: "/calculators/years-to-fire",
    calculatorLabel: "Model your next year",
    download: {
      href: "/data/one-year-fire-impact.csv",
      label: "Download the one-year data (CSV)",
    },
  },
  {
    slug: "retire-at-50-vs-55-vs-60",
    title: "Retire at 50 vs 55 vs 60: which bridges change?",
    description:
      "Compare planning horizons, Medicare gaps, Social Security bridges, and account-access considerations when retirement begins at 50, 55, or 60.",
    eyebrow: "RetireFire Research",
    datePublished: published,
    dateModified: expanded,
    intro: [
      "The same annual spending can produce very different implementation problems at 50, 55, and 60. The core portfolio formula is unchanged; the length of the healthcare, benefit, and account-access bridges is not.",
      "This comparison isolates those timelines so a later benefit is not accidentally used to pay an earlier bill.",
    ],
    takeaway:
      "Moving the retirement date from 50 to 60 removes ten portfolio-funded years, shortens the Medicare bridge from 15 years to five, and shortens the bridge to Social Security age 67 from 17 years to seven.",
    sections: [
      {
        heading: "Timeline comparison",
        table: {
          caption: "Illustrative planning milestones; Social Security shown at age 67",
          headers: ["Retirement age", "Years to Medicare 65", "Years to SS 67", "Illustrative horizon to 95", "Primary issue"],
          rows: [
            ["50", "15", "17", "45", "Long healthcare and benefit bridges"],
            ["55", "10", "12", "40", "Healthcare plus account access"],
            ["60", "5", "7", "35", "Benefit timing and tax-window choices"],
          ],
        },
      },
      {
        heading: "What does not change automatically",
        bullets: [
          "Your desired annual lifestyle spending.",
          "The need to include taxes, fees, and irregular expenses.",
          "The uncertainty of future market returns.",
          "The need for a response plan after poor early returns.",
        ],
      },
      {
        heading: "The value of waiting is not only the contribution",
        paragraphs: [
          "A later date may add contributions, allow more compounding, reduce years of withdrawals, shorten private-healthcare exposure, increase expected Social Security, and improve pension terms. Evaluate each separately rather than compressing them into one optimistic return assumption.",
        ],
      },
    ],
    faq: [
      {
        question: "Is retiring at 60 much cheaper than 50?",
        answer:
          "It often requires fewer bridge years and a shorter withdrawal horizon, but the dollar difference depends on spending, savings accumulated during the decade, healthcare, and benefits.",
      },
      {
        question: "Does the 4% rule work for age 50?",
        answer:
          "The classic research reference was commonly framed around roughly 30 years. A retirement at 50 may last much longer, so test lower rates and flexible spending.",
      },
      {
        question: "Why compare to age 95?",
        answer:
          "It is an illustration, not a longevity prediction. Use a horizon and survivor assumptions appropriate to your household.",
      },
    ],
    related: [
      { href: "/retire-at-50", label: "Retire at 50 guide" },
      { href: "/retire-at-55", label: "Retire at 55 guide" },
      { href: "/retire-at-60", label: "Retire at 60 guide" },
      { href: "/early-retirement-health-insurance", label: "Healthcare bridge" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
    ],
    calculatorHref: "/calculators/years-to-fire",
    calculatorLabel: "Compare retirement dates",
    download: {
      href: "/data/retirement-age-bridges.csv",
      label: "Download the age comparison (CSV)",
    },
  },
  {
    slug: "why-fire-calculators-disagree",
    title: "Why FIRE calculators disagree",
    description:
      "Seven assumptions that make FIRE calculators produce different answers, plus a checklist for comparing tools without mistaking precision for truth.",
    eyebrow: "RetireFire Research",
    datePublished: published,
    dateModified: expanded,
    intro: [
      "Two FIRE calculators can receive the same balance and spending but return different dates. That does not automatically mean one is broken. They may be answering different questions with different timing, inflation, contribution, and withdrawal conventions.",
      "A useful calculator publishes those conventions. A useful comparison changes one assumption at a time.",
    ],
    takeaway:
      "Most calculator disagreements come from hidden differences in real versus nominal returns, contribution timing, target definition, withdrawal rates, later income, taxes, or the treatment of market paths.",
    sections: [
      {
        heading: "Seven assumptions to compare",
        table: {
          caption: "Common sources of calculator disagreement",
          headers: ["Assumption", "Version A", "Version B", "Why it matters"],
          rows: [
            ["Returns", "7% nominal", "5% real", "Inflation may be counted differently"],
            ["Contributions", "Beginning of year", "End of year", "Earlier deposits compound longer"],
            ["Target", "25× spending", "33.3× spending", "4% versus 3% planning rate"],
            ["Income", "Ignores benefits", "Includes later income", "Changes the portfolio-funded gap"],
            ["Path", "Constant return", "Monte Carlo / history", "Sequence risk changes ranges"],
            ["Taxes and fees", "Excluded", "Estimated", "Gross withdrawals can exceed spending"],
            ["Stopping rule", "Fractional year", "Whole year", "Displayed date may differ"],
          ],
        },
      },
      {
        heading: "A fair comparison protocol",
        bullets: [
          "Use the same current portfolio, contribution, spending, and target.",
          "Convert nominal and inflation assumptions into one real return.",
          "Match contribution timing and withdrawal timing.",
          "Disable Social Security, pensions, taxes, and fees unless both tools model them.",
          "Compare deterministic results first, then compare stress-test methodology separately.",
        ],
      },
      {
        heading: "Precision is not accuracy",
        paragraphs: [
          "A result of 12.43 years can still rely on uncertain returns and spending. More decimal places do not make the future more knowable. Use outputs as sensitivity maps and decision triggers.",
        ],
      },
    ],
    faq: [
      {
        question: "Which FIRE calculator is correct?",
        answer:
          "A calculator is correct relative to its formula and inputs. The more important question is whether its assumptions match the decision you are making.",
      },
      {
        question: "Should I use real or nominal returns?",
        answer:
          "Either can work if inflation is handled consistently. RetireFire uses real returns by default so targets stay in today’s dollars.",
      },
      {
        question: "Why does contribution timing matter?",
        answer:
          "Money contributed earlier receives more compounding. End-of-year contributions are a conservative simplification for many planning models.",
      },
    ],
    related: [
      { href: "/methodology", label: "RetireFire methodology" },
      { href: "/blog/why-simple-fire-calculators-fail", label: "Simple calculator limitations" },
      { href: "/blog/monte-carlo-vs-historical-cycles-fire", label: "Monte Carlo vs history" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
    ],
    calculatorHref: "/calculators",
    calculatorLabel: "Compare transparent calculators",
    download: {
      href: "/data/fire-calculator-assumptions.csv",
      label: "Download the comparison checklist (CSV)",
    },
  },
];

export { researchPages };
