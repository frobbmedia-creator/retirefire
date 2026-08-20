import { calculateCoastFire, calculateFireNumber } from "@/lib/calculations";

export type DecisionTable = {
  caption: string;
  headers: string[];
  rows: string[][];
};

export type DecisionPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  datePublished: string;
  dateModified: string;
  intro: string[];
  takeaway: string;
  sections: Array<{
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
    table?: DecisionTable;
  }>;
  faq: Array<{ question: string; answer: string }>;
  related: Array<{ href: string; label: string }>;
  calculatorHref: string;
  calculatorLabel: string;
  embeddedIncomeCalculator?: boolean;
  download?: { href: string; label: string };
};

const published = "2026-08-12";
const expanded = "2026-08-20";
const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const swrTable = (annualSpending: number): DecisionTable => ({
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
});

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

const evergreenPages: DecisionPage[] = [
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
  {
    slug: "fire-calculator-with-social-security",
    title: "FIRE calculator with Social Security",
    description:
      "Estimate how Social Security may reduce the later portfolio-funded spending gap without incorrectly using future benefits to fund the early-retirement bridge.",
    eyebrow: "Two-phase retirement math",
    datePublished: published,
    dateModified: expanded,
    intro: [
      "Social Security can reduce the amount a portfolio must provide after benefits begin. It does not fund the years before claiming, and a simple subtraction can understate the bridge required for early retirement.",
      "Use the calculator below for the later steady-state gap, then separately reserve for the pre-benefit years.",
    ],
    takeaway:
      "Subtract Social Security only from spending in years when the benefit is expected, and separately fund the bridge before claiming.",
    sections: [
      {
        heading: "Two-phase method",
        bullets: [
          "Phase 1: retirement date through the year before benefits begin. The portfolio covers the full spending gap.",
          "Phase 2: benefit years. Subtract expected Social Security and other durable income from spending.",
          "Stress both phases for taxes, benefit uncertainty, survivor changes, and poor early returns.",
        ],
      },
      {
        heading: "Example",
        paragraphs: [
          "A household spends $72,000 and expects $30,000 of annual Social Security beginning in ten years. At 4%, the later steady-state gap of $42,000 corresponds to $1.05 million. That does not include the first ten years of larger withdrawals, so $1.05 million is not the complete retirement target.",
        ],
      },
      {
        heading: "What this quick calculator omits",
        bullets: [
          "Benefit taxation and account-specific withdrawal taxes.",
          "Cost-of-living adjustments and claiming-age tradeoffs.",
          "Survivor and spousal benefit rules.",
          "Sequence risk during the bridge.",
        ],
      },
    ],
    faq: [
      {
        question: "Does a FIRE number include Social Security?",
        answer:
          "A basic FIRE number usually does not. Social Security can be modeled as later income that reduces the spending gap after benefits begin.",
      },
      {
        question: "Can I subtract my full estimated benefit?",
        answer:
          "Use a conservative, current estimate and account for taxes, claiming age, and timing. Do not subtract it from years before it begins.",
      },
      {
        question: "What if I plan to claim at 70?",
        answer:
          "The later benefit may be higher, but the portfolio must fund a longer bridge. Compare both the benefit amount and the additional bridge withdrawals.",
      },
    ],
    related: [
      { href: "/retire-at-50", label: "Retire at 50" },
      { href: "/retire-at-55", label: "Retire at 55" },
      { href: "/fire-calculator-with-pension", label: "Include pension income" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
    ],
    calculatorHref: "/calculators/fire-number",
    calculatorLabel: "Open the full FIRE calculator",
    embeddedIncomeCalculator: true,
  },
  {
    slug: "fire-calculator-with-pension",
    title: "FIRE calculator with pension income",
    description:
      "Estimate how pension income changes a portfolio target while keeping pension start dates, inflation protection, survivor benefits, and the bridge visible.",
    eyebrow: "Income-gap calculator",
    datePublished: published,
    dateModified: expanded,
    intro: [
      "A pension can shrink the portfolio-funded spending gap, but only after payments begin and only for as long as the chosen benefit continues. Treat a pension as an income stream, not as a reason to ignore timing or survivor risk.",
      "Use the quick calculator for a steady-state estimate, then separately fund any years before the pension starts.",
    ],
    takeaway:
      "At a 4% planning rate, every reliable $10,000 of annual pension income reduces a simple steady-state portfolio target by about $250,000.",
    sections: [
      {
        heading: "Steady-state formula",
        paragraphs: [
          "Portfolio gap = annual spending − pension − Social Security − other durable income. Portfolio target = portfolio gap ÷ planning withdrawal rate.",
        ],
      },
      {
        heading: "Pension details that change the answer",
        bullets: [
          "Start date and whether payments are reduced for early commencement.",
          "Cost-of-living adjustment or loss of purchasing power.",
          "Single-life versus survivor benefit election.",
          "Plan credit quality and any benefit limits.",
          "Taxes and health benefits tied to the pension.",
        ],
      },
      {
        heading: "Bridge example",
        paragraphs: [
          "If retirement begins at 55 and a $24,000 pension begins at 60, the portfolio covers five years without that income. Subtracting the pension from every retirement year would understate the amount required.",
        ],
      },
    ],
    faq: [
      {
        question: "How much does a pension reduce a FIRE number?",
        answer:
          "Divide reliable annual pension income by the planning withdrawal rate for a steady-state estimate. At 4%, $20,000 corresponds to $500,000, but timing and benefit terms still matter.",
      },
      {
        question: "Should a non-COLA pension be treated at face value?",
        answer:
          "A level payment loses purchasing power over time. Model it conservatively rather than treating it as constant real income.",
      },
      {
        question: "How should a survivor pension be modeled?",
        answer:
          "Use the actual survivor election and compare household spending after one death. Do not assume the original payment continues unchanged.",
      },
    ],
    related: [
      { href: "/fire-calculator-with-social-security", label: "Include Social Security" },
      { href: "/calculators/fire-number", label: "FIRE Number calculator" },
      { href: "/can-i-retire-with-1-million", label: "Test a $1M portfolio" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
    ],
    calculatorHref: "/calculators/fire-number",
    calculatorLabel: "Open the full FIRE calculator",
    embeddedIncomeCalculator: true,
  },
  {
    slug: "early-retirement-health-insurance",
    title: "Early-retirement health insurance: build an honest FIRE budget",
    description:
      "Plan the health-insurance bridge before Medicare using premiums, out-of-pocket exposure, household income, plan changes, and a dedicated contingency.",
    eyebrow: "Healthcare before Medicare",
    datePublished: published,
    dateModified: expanded,
    intro: [
      "Healthcare is not a footnote in early retirement. Before Medicare eligibility, premiums and out-of-pocket costs can change the spending target by hundreds of thousands of dollars when converted into a portfolio requirement.",
      "This page is a budgeting framework, not insurance or tax advice. Obtain current quotes for your household and state before making an employment decision.",
    ],
    takeaway:
      "Every permanent $10,000 of additional healthcare spending adds roughly $250,000 at 4% or $333,000 at 3% to a simple portfolio target.",
    sections: [
      {
        heading: "Build the annual healthcare line",
        bullets: [
          "Twelve months of net premiums based on a current quote.",
          "Expected deductibles, copays, prescriptions, dental, and vision.",
          "A reserve for an out-of-network or high-utilization year.",
          "Travel coverage or multi-state network needs.",
          "Costs for every household member and the date each becomes Medicare-eligible.",
        ],
      },
      {
        heading: "Keep subsidies and taxes in the same model",
        paragraphs: [
          "Marketplace assistance can depend on household income. Portfolio withdrawals, Roth conversions, capital gains, and earned income may affect that calculation. A tax move that looks attractive alone can raise healthcare costs.",
          "Rules and plan pricing change. Use current official marketplace information and qualified advice for decisions.",
        ],
      },
      {
        heading: "Stress-test the bridge",
        bullets: [
          "Model the quoted premium, quoted premium plus 20%, and the full unsubsidized premium.",
          "Use at least one high out-of-pocket year.",
          "Test the loss of a spouse’s employer plan or part-time benefit.",
          "Do not assume Medicare eliminates premiums or out-of-pocket costs at 65.",
        ],
      },
    ],
    faq: [
      {
        question: "How much should I budget for healthcare before Medicare?",
        answer:
          "Use current household-specific quotes plus expected out-of-pocket costs and a contingency. National averages are not a substitute for age, location, income, and plan design.",
      },
      {
        question: "Should health insurance be included in my FIRE number?",
        answer:
          "Yes, include the portion funded by portfolio withdrawals. If the cost changes at Medicare eligibility, model separate phases.",
      },
      {
        question: "Can Barista FIRE solve healthcare?",
        answer:
          "It may if a specific job offers durable coverage at the expected hours. Verify eligibility, employee premiums, waiting periods, and the risk that benefits or hours change.",
      },
    ],
    related: [
      { href: "/calculators/barista-fire", label: "Barista FIRE calculator" },
      { href: "/blog/barista-fire-healthcare-benefits-cliffs", label: "Benefits-cliff guide" },
      { href: "/retire-at-50", label: "Retiring at 50" },
      { href: "/retire-at-55", label: "Retiring at 55" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
    ],
    calculatorHref: "/calculators/fire-number",
    calculatorLabel: "Add healthcare to annual spending",
  },
  {
    slug: "fire-number-by-age",
    title: "FIRE number by age: what actually changes?",
    description:
      "Understand how age affects FIRE through retirement horizon, healthcare, benefit timing, flexibility, and sequence risk—not through a different core formula.",
    eyebrow: "Age and retirement math",
    datePublished: published,
    dateModified: expanded,
    intro: [
      "The core FIRE formula does not contain age: annual portfolio-funded spending divided by a planning withdrawal rate. Age changes the surrounding assumptions—how long withdrawals may last, when healthcare and benefits begin, and how much time remains to recover from a poor sequence.",
      "Use age to choose stress tests and phases, not to manufacture a universal age-based target.",
    ],
    takeaway:
      "Age does not change the spending ÷ withdrawal-rate identity; it changes the horizon, bridge periods, and level of uncertainty that should shape the inputs.",
    sections: [
      {
        heading: "What changes by retirement age",
        table: {
          caption: "Planning emphasis by retirement starting age",
          headers: ["Starting age", "Illustrative horizon", "Planning emphasis"],
          rows: [
            ["40", "50+ years", "Very long horizon, healthcare bridge, high flexibility value"],
            ["45", "45–50 years", "Long healthcare bridge, sequence risk, benefit timing"],
            ["50", "40+ years", "Medicare and Social Security bridges, sequence risk"],
            ["55", "35–40 years", "Healthcare bridge, account access, later-income phases"],
            ["60", "30–35 years", "Benefit timing, healthcare transition, tax windows"],
            ["65", "25–30 years", "Medicare choices, Social Security, RMD planning"],
          ],
        },
      },
      {
        heading: "Do not use age as a shortcut for spending",
        paragraphs: [
          "Two people of the same age can require radically different portfolios because their spending, pensions, taxes, housing, and flexibility differ. Build the cash-flow requirement first.",
        ],
      },
      {
        heading: "Use the correct age-specific bridge",
        bullets: [
          "Retirement date to Medicare eligibility.",
          "Retirement date to pension start.",
          "Retirement date to Social Security claiming.",
          "Years until penalty-free or practical account access.",
        ],
      },
    ],
    faq: [
      {
        question: "Does FIRE require more money at a younger age?",
        answer:
          "Often, because the potential withdrawal horizon is longer and benefit bridges are larger. The exact difference depends on spending and plan design.",
      },
      {
        question: "Is 25× spending enough at every age?",
        answer:
          "No single multiple is guaranteed. Longer horizons often justify testing lower withdrawal rates and flexible spending rules.",
      },
      {
        question: "What is the best age to calculate FIRE?",
        answer:
          "Calculate it at any age, then update the inputs whenever spending, savings, family structure, or retirement timing changes.",
      },
    ],
    related: [
      { href: "/retire-at-40", label: "Retire at 40" },
      { href: "/retire-at-45", label: "Retire at 45" },
      { href: "/retire-at-50", label: "Retire at 50" },
      { href: "/retire-at-55", label: "Retire at 55" },
      { href: "/retire-at-60", label: "Retire at 60" },
      { href: "/fire-number-by-spending", label: "FIRE number by spending" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
    ],
    calculatorHref: "/calculators/years-to-fire",
    calculatorLabel: "Estimate your timeline",
  },
];

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

export const DECISION_PAGES: DecisionPage[] = [
  retireAtPage(40),
  retireAtPage(45),
  retireAtPage(50),
  retireAtPage(55),
  retireAtPage(60),
  portfolioPage(500_000),
  portfolioPage(750_000),
  portfolioPage(1_000_000),
  portfolioPage(1_500_000),
  portfolioPage(2_000_000),
  portfolioPage(3_000_000),
  ...evergreenPages,
  ...researchPages,
];

export function getDecisionPage(slug: string): DecisionPage | undefined {
  return DECISION_PAGES.find((page) => page.slug === slug);
}
