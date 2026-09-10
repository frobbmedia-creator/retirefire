import type { DecisionPage } from "@/content/decision-shared";
import { expanded, money, published, swrTable } from "@/content/decision-shared";

function retireAtPage(age: 40 | 45 | 50 | 55 | 60): DecisionPage {
  const horizon =
    age === 40
      ? "50–55 years or more"
      : age === 45
        ? "50 years or more"
        : age === 50
          ? "40 years or more"
          : age === 55
            ? "35–40 years"
            : "30–35 years";
  const bridge = 62 - age;
  const medicareBridge = 65 - age;
  return {
    slug: `retire-at-${age}`,
    title: `How much do you need to retire at ${age}?`,
    description: `Estimate the portfolio needed to retire at ${age}, including spending, withdrawal-rate, healthcare, Social Security, and sequence-risk considerations.`,
    eyebrow: `Retire by age ${age}`,
    datePublished: age === 40 || age === 45 ? expanded : published,
    dateModified: expanded,
    intro: [
      `Retiring at ${age} is not one number. It is a funding problem with several clocks: your portfolio may need to support roughly ${horizon}, Medicare does not normally begin until 65, and Social Security cannot start before 62.`,
      "The fastest honest estimate starts with annual spending, divides by a planning withdrawal rate, and then separates income that begins later from expenses that begin immediately.",
    ],
    takeaway:
      `Start with 25× to 33.3× the annual spending your portfolio must cover, then model a ${medicareBridge}-year Medicare bridge and a ${Math.max(0, bridge)}-year bridge to the earliest Social Security claiming age separately.`,
    sections: [
      {
        heading: `A practical starting range at age ${age}`,
        paragraphs: [
          "The table below is a pre-tax illustration in today’s dollars. It does not include Social Security, a pension, taxes, fees, or one-time expenses.",
        ],
        table: swrTable(60_000),
      },
      {
        heading: "Build the spending number before the portfolio number",
        bullets: [
          "Separate essential spending from discretionary spending you could reduce after a poor market year.",
          `Quote health coverage for the ${medicareBridge} years before Medicare rather than using a generic inflation estimate.`,
          "Add taxes and account-access constraints; a $60,000 lifestyle may require more than $60,000 of gross withdrawals.",
          "List large irregular expenses such as vehicles, roofs, family support, and long trips outside the monthly budget.",
        ],
      },
      {
        heading: "Treat later income as a second phase",
        paragraphs: [
          "A pension or Social Security benefit can reduce the portfolio draw later, but it does not pay bills before it begins. Model the early bridge and the later steady state as two distinct phases.",
          "For a quick steady-state estimate, subtract reliable annual income from annual spending and divide the remaining gap by the withdrawal rate. Then separately fund the years before that income begins.",
        ],
      },
      {
        heading: "The risk that matters most near the starting line",
        paragraphs: [
          "Poor returns in the first several years can do more damage than the same returns later because withdrawals remove shares before they recover. A lower starting rate, flexible discretionary spending, cash reserves, or optional earned income can create response capacity.",
        ],
        bullets: [
          "Run at least 3%, 3.5%, and 4% rather than defending one answer.",
          "Test a 20% spending overrun and a market decline early in retirement.",
          "Write down the spending cut or income response you would actually use.",
        ],
      },
    ],
    faq: [
      {
        question: `Is $1 million enough to retire at ${age}?`,
        answer:
          "At a 4% planning rate, $1 million supports an initial $40,000 portfolio withdrawal before taxes and fees. Whether that is enough depends on spending, healthcare, later income, flexibility, and the length of retirement.",
      },
      {
        question: `What withdrawal rate should someone retiring at ${age} use?`,
        answer:
          "There is no universally safe rate. Longer horizons often motivate testing 3% to 3.5% alongside the historical 4% reference and considering flexible spending rules.",
      },
      {
        question: "Should Social Security be subtracted from annual spending?",
        answer:
          "Only for the years in which the benefit is actually expected. Keep the pre-benefit bridge separate so later income is not incorrectly used to fund earlier years.",
      },
    ],
    related: [
      { href: "/fire-number-by-spending", label: "FIRE number by spending" },
      { href: "/can-i-retire-with-1-million", label: "Can I retire with $1M?" },
      { href: "/fire-calculator-with-social-security", label: "Include Social Security" },
      { href: "/early-retirement-health-insurance", label: "Healthcare before Medicare" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
      { href: "/blog/safe-withdrawal-rate-3-vs-4-percent", label: "Withdrawal-rate deep dive" },
    ],
    calculatorHref: "/calculators/fire-number",
    calculatorLabel: "Run the FIRE Number calculator",
  };
}

function portfolioPage(
  amount: 500_000 | 750_000 | 1_000_000 | 1_500_000 | 2_000_000 | 3_000_000,
): DecisionPage {
  const labelMap: Record<number, string> = {
    500_000: "$500,000",
    750_000: "$750,000",
    1_000_000: "$1 million",
    1_500_000: "$1.5 million",
    2_000_000: "$2 million",
    3_000_000: "$3 million",
  };
  const slugMap: Record<number, string> = {
    500_000: "500k",
    750_000: "750k",
    1_000_000: "1-million",
    1_500_000: "1-5-million",
    2_000_000: "2-million",
    3_000_000: "3-million",
  };
  const label = labelMap[amount];
  const slugAmount = slugMap[amount];
  const rows = [0.03, 0.035, 0.04].map((rate) => [
    `${(rate * 100).toFixed(rate === 0.035 ? 1 : 0)}%`,
    money.format(amount * rate),
    money.format((amount * rate) / 12),
  ]);
  return {
    slug: `can-i-retire-with-${slugAmount}`,
    title: `Can I retire with ${label}?`,
    description: `See the annual spending ${label} may support at 3%, 3.5%, and 4%, then test taxes, healthcare, Social Security, and flexibility.`,
    eyebrow: "Portfolio reality check",
    datePublished:
      amount === 500_000 ||
      amount === 750_000 ||
      amount === 1_500_000 ||
      amount === 3_000_000
        ? expanded
        : published,
    dateModified: expanded,
    intro: [
      `${label} is not automatically enough or insufficient. The answer depends primarily on how much the portfolio must supply each year, for how long, and how flexible that spending is after weak markets.`,
      "Translate the balance into spending first. Then add later income and liabilities rather than comparing the account balance with someone else’s retirement number.",
    ],
    takeaway: `${label} supports an initial portfolio withdrawal of roughly ${money.format(amount * 0.03)} to ${money.format(amount * 0.04)} a year at 3%–4%, before taxes and fees.`,
    sections: [
      {
        heading: `What ${label} may support`,
        table: {
          caption: "Illustrative first-year portfolio withdrawals",
          headers: ["Planning rate", "Annual withdrawal", "Monthly equivalent"],
          rows,
        },
      },
      {
        heading: "Convert lifestyle spending into the portfolio gap",
        paragraphs: [
          "Start with total annual spending, add taxes and recurring healthcare, and subtract only durable income expected in the same year. If spending is $70,000 and a pension supplies $20,000, the steady-state portfolio gap is $50,000.",
          "A later Social Security benefit may improve the later years without solving the early bridge. Model the timing explicitly.",
        ],
      },
      {
        heading: "Three reasons the same balance produces different answers",
        bullets: [
          "Age and horizon: a retirement beginning at 45 carries a different planning horizon from one beginning at 67.",
          "Spending flexibility: households with meaningful discretionary spending have more room to respond to poor returns.",
          "Other income and liabilities: pensions, Social Security, debt, taxes, and healthcare change the portfolio burden.",
        ],
      },
      {
        heading: "Run a go / caution / stop test",
        bullets: [
          "Go: the plan works at conservative assumptions and retains emergency and irregular-expense reserves.",
          "Caution: it works only at 4% with no spending surprises or weak-return response.",
          "Stop: planned spending exceeds the portfolio’s tested range before taxes, healthcare, or major expenses are included.",
        ],
      },
    ],
    faq: [
      {
        question: `How much income can ${label} generate?`,
        answer: `A simple 3%–4% planning range is ${money.format(amount * 0.03)} to ${money.format(amount * 0.04)} in the first year before taxes and fees. It is a planning illustration, not guaranteed income.`,
      },
      {
        question: `How long will ${label} last?`,
        answer:
          "There is no fixed duration without specifying withdrawals, returns, inflation, fees, and income. Sequence of returns can make equal average returns produce very different outcomes.",
      },
      {
        question: "Does the 4% rule include Social Security?",
        answer:
          "The classic portfolio rule concerns withdrawals from the invested portfolio. Social Security or pension income can reduce the amount the portfolio must provide when those benefits begin.",
      },
    ],
    related: [
      { href: "/calculators/fire-number", label: "FIRE Number calculator" },
      { href: "/can-i-retire-with-1-million", label: "Can I retire with $1M?" },
      { href: "/can-i-retire-with-500k", label: "Can I retire with $500k?" },
      { href: "/fire-calculator-with-social-security", label: "Add Social Security" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
      { href: "/blog/safe-withdrawal-rate-3-vs-4-percent", label: "Compare withdrawal rates" },
      { href: "/resources/sequence-risk-guide", label: "Sequence-risk guide" },
    ],
    calculatorHref: "/calculators/fire-number",
    calculatorLabel: "Test your spending",
  };
}

export { retireAtPage, portfolioPage };
