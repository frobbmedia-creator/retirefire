import type { DecisionPage } from "@/content/decision-shared";
import { expanded, money, published, swrTable } from "@/content/decision-shared";

type Faq = { question: string; answer: string };

type RetireAtCopy = {
  description: string;
  introB: string;
  rangeNote: string;
  spendingHeading: string;
  spendingBullets: string[];
  incomeHeading: string;
  incomeParagraphs: string[];
  riskHeading: string;
  riskParagraphs: string[];
  riskBullets: string[];
  faq: Faq[];
};

const RETIRE_AT_COPY: Record<40 | 45 | 50 | 55 | 60, RetireAtCopy> = {
  40: {
    description:
      "Retiring at 40 means funding 50+ years. Estimate the portfolio you need, price a 25-year healthcare bridge, and stress-test withdrawal rates for a half-century horizon.",
    introB:
      "At 40 the math is dominated by time, not by the starting balance. Fifty-plus years of inflation and market cycles will do more to your plan than the first five years of returns — which is why the spending number matters more than the portfolio number at this age.",
    rangeNote:
      "The table prices $60,000 of annual spending — read each row as the cost of one year of retirement, then remember you are buying fifty of them.",
    spendingHeading: "Build the spending number for a 50-year retirement",
    spendingBullets: [
      "Separate essential spending from discretionary spending you could cut for a decade, not just a year — at 40, a bad sequence can outlast your patience.",
      "Get real quotes for the 25 years of health coverage before Medicare; compounding a guess over 25 years produces fiction, not a plan.",
      "Add taxes and account-access constraints; a $60,000 lifestyle may require more than $60,000 of gross withdrawals, and at 40 most of the money is still behind age-59½ rules.",
      "List large irregular expenses — vehicles, roofs, college, family support — outside the monthly budget; over 50 years these are certainties, not surprises.",
    ],
    incomeHeading: "Treat Social Security as a bonus, not a pillar",
    incomeParagraphs: [
      "At 40, Social Security is 22 years from its earliest start and decades of legislation away. Model it as upside: run the plan with zero Social Security first, then see how claiming later improves the outcome.",
      "The useful two-phase split at this age is different: phase one is the decades you fund entirely yourself, phase two is whatever backstop exists later. If the plan needs the backstop to survive, it is not a 40-year-old's plan.",
    ],
    riskHeading: "The risk that compounds for 50 years",
    riskParagraphs: [
      "Over half a century, two risks dominate everything else: inflation quietly repricing your spending, and poor returns early in the drawdown phase. A 4% starting rate tested against 30-year histories is thinner armor over 50 years.",
    ],
    riskBullets: [
      "Test 3% and 3.5% alongside 4% — the gap between them is the price of a 50-year horizon.",
      "Stress a 20% permanent spending increase (lifestyle creep is the silent killer at 40) and a market decline in the first five years.",
      "Write down the income response you would actually use — at 40, part-time work is the cheapest hedge you own.",
    ],
    faq: [
      {
        question: "Is $1 million enough to retire at 40?",
        answer:
          "At 4%, $1 million supports $40,000 a year before taxes and fees. Over a 50-plus-year horizon that leaves almost no margin for healthcare inflation, spending creep, or a bad first decade. Most 40-year-old plans that work on paper use 3% to 3.5% — which means $1 million covers more like $30,000 to $35,000.",
      },
      {
        question: "What withdrawal rate should someone retiring at 40 use?",
        answer:
          "There is no safe rate, only tested ones — and the tests get thinner past 30 years. Run 3%, 3.5%, and 4% side by side and treat the difference as the cost of retiring with half a century ahead.",
      },
      {
        question: "Should I count on Social Security at 40?",
        answer:
          "Count on the plan working without it. Anything Social Security adds later is margin. Twenty-two years of earnings, inflation, and legislation sit between you and the first check.",
      },
    ],
  },
  45: {
    description:
      "Retiring at 45 trades peak earning years for time. Estimate the portfolio for a 50-year horizon, model the 20-year healthcare bridge, and test 3%–4% withdrawal rates.",
    introB:
      "At 45 you are trading peak earning years for time. The math has to clear a higher bar than at 60: a 50-year horizon, a 20-year healthcare bridge, and every year of foregone salary compounding against you.",
    rangeNote:
      "The table prices $60,000 of annual spending. At 45 the question is not whether the multiple works on paper but whether the spending figure survives fifty years of reality.",
    spendingHeading: "Build the spending number for a 50-year horizon",
    spendingBullets: [
      "Separate essential spending from discretionary spending you could reduce for years at a time.",
      "Quote health coverage for the 20 years before Medicare — at 45 this bridge is often the single largest line item people underestimate.",
      "Add taxes and account-access rules; most of the portfolio is still behind the age-59½ wall for another 15 years.",
      "Price the opportunity cost honestly: each year retired at 45 is a peak-earning year not saved. The spending number has to survive that comparison.",
    ],
    incomeHeading: "Keep Social Security in the model, out of the plan",
    incomeParagraphs: [
      "Seventeen years to the earliest claiming age is close enough to model but too far to depend on. Run the core plan without it; then layer it in as a second phase that starts at 62 and improves the later decades.",
      "If the plan only works with full Social Security from day one of eligibility, the spending number is too high for 45.",
    ],
    riskHeading: "Sequence risk with 50 years of consequences",
    riskParagraphs: [
      "A bad first decade at 45 does not just dent the portfolio — it collides with the years you would otherwise have been saving the most. That double hit is why early-retirement failures cluster around high starting withdrawal rates.",
    ],
    riskBullets: [
      "Test 3% and 3.5% alongside 4%; the lower rates are the premium for a 50-year horizon.",
      "Stress a market decline in years one through five combined with a 20% spending overrun.",
      "Write down the re-entry plan: at 45, returning to work for two years is a legitimate lever, not a failure.",
    ],
    faq: [
      {
        question: "Is $1 million enough to retire at 45?",
        answer:
          "A 4% planning rate turns $1 million into $40,000 a year before taxes and fees. Over 50 years with a 20-year healthcare bridge, that is lean for most households. Tested at 3%–3.5%, the same million covers roughly $30,000–$35,000 — workable only if spending is genuinely controlled.",
      },
      {
        question: "What withdrawal rate should someone retiring at 45 use?",
        answer:
          "Test 3% to 3.5% as the serious range and 4% as the optimistic one. The historical 4% reference was built on 30-year windows; you are planning for 50.",
      },
      {
        question: "Am I giving up too much by quitting at peak earnings?",
        answer:
          "That is the right question. Compare the foregone savings of ages 45–55 against the freedom bought. If the plan survives only by assuming peak savings continue, it is not a retirement plan — it is a wish.",
      },
    ],
  },
  50: {
    description:
      "Retiring at 50 hinges on two bridges: 15 years to Medicare, 12 to Social Security. Estimate the portfolio, model each bridge separately, and plan the withdrawal order.",
    introB:
      "Fifty is the hinge age: close enough to traditional retirement that the standard tools almost work, far enough that they don't. A 15-year healthcare bridge and a 12-year wait for Social Security are the two gaps that break most age-50 plans.",
    rangeNote:
      "The table prices $60,000 of annual spending. Fund the two bridges — 15 years to Medicare, 12 to Social Security — out of the portfolio first, then read the steady state.",
    spendingHeading: "Build the spending number for the two bridges",
    spendingBullets: [
      "Separate essential from discretionary spending; at 50, flexibility is worth more than precision.",
      "Quote 15 years of health coverage before Medicare — shorter than at 40, but hitting exactly when premiums are highest.",
      "Add taxes and the age-59½ access wall: the first decade runs on taxable accounts and Roth contributions, so the mix of accounts matters as much as the total.",
      "Catch-up contributions are now available on workplace plans — the last decade of saving can still move the number if you keep earning.",
    ],
    incomeHeading: "Model the 12-year Social Security bridge explicitly",
    incomeParagraphs: [
      "Twelve years is bridgeable: total the spending for those years, fund it from the portfolio, then let Social Security reduce the draw from 62 on. The mistake is blending — subtracting a future benefit from today's spending as if the checks already arrived.",
      "Run the claiming ages separately. The difference between 62 and 70 is a second decision layered on top of the bridge; don't let it contaminate the first one.",
    ],
    riskHeading: "The red-zone decade",
    riskParagraphs: [
      "The years just before and after 50 are when a market decline does maximum damage: the portfolio is near its peak, contributions are stopping, and withdrawals are starting. This is the retirement red zone, and the defense is a lower starting rate plus a written spending response.",
    ],
    riskBullets: [
      "Test 3%, 3.5%, and 4% — at a 40-year horizon the spread between them is the whole margin of safety.",
      "Stress a 30% market decline in the first three years with spending held flat.",
      "Keep two years of spending in cash-like reserves; at 50, selling into a decline is the unforced error to avoid.",
    ],
    faq: [
      {
        question: "Is $1 million enough to retire at 50?",
        answer:
          "At 4%, $1 million supports $40,000 a year before taxes and fees, minus a 15-year healthcare bridge that can eat a third of it. At 3.5% the support is $35,000 — the more honest planning number for a 40-year horizon.",
      },
      {
        question: "What withdrawal rate should someone retiring at 50 use?",
        answer:
          "Use 3% to 3.5% as the planning band. Four percent is the historical reference, not a promise, and your horizon is a decade longer than the one it was tested on.",
      },
      {
        question: "Can I use the rule of 55?",
        answer:
          "If you separate from your employer in or after the year you turn 55, you can generally tap that employer's 401(k) penalty-free — which reshapes the age-59½ access problem. It doesn't change how much you need, but it changes which accounts fund the first years.",
      },
    ],
  },
  55: {
    description:
      "Retiring at 55 is a sequencing problem: a 10-year healthcare bridge, 7 years to Social Security, and a Roth conversion window. Estimate the portfolio and the order of operations.",
    introB:
      "At 55 the question changes from 'can I?' to 'in what order?' A 10-year healthcare bridge, 7 years to Social Security, and penalty-free access to the current 401(k) make this a sequencing problem more than a savings problem.",
    rangeNote:
      "The table prices $60,000 of annual spending. At 55 the multiple is only half the answer; the other half is the order you tap accounts and claim benefits.",
    spendingHeading: "Build the spending number for a 10-year bridge",
    spendingBullets: [
      "Separate essential from discretionary spending; with a shorter horizon, a flexible 10% matters more than a precise 1%.",
      "Quote 10 years of pre-Medicare coverage — the shortest bridge yet, but still the line item most plans get wrong.",
      "Map which accounts fund which years: the current employer's 401(k) is now accessible penalty-free after separation, which changes the withdrawal order.",
      "Add taxes with an eye on the Roth window — low-income years before Social Security and required distributions are the cheapest conversions you'll ever get.",
    ],
    incomeHeading: "Social Security is now a claiming decision",
    incomeParagraphs: [
      "Seven years out, the benefit is close enough to plan around. Model 62, 67, and 70 as three distinct second phases and fund the bridge to each separately — the 'right' claiming age depends on the bridge cost, not just the monthly amount.",
      "Coordinate with Roth conversions: every low-income year before 62 is a year to shift pre-tax dollars at lower rates.",
    ],
    riskHeading: "Tax risk joins market risk",
    riskParagraphs: [
      "At 55 the portfolio is big enough that the tax bill becomes a first-order risk. Required minimum distributions are still years away, but every pre-tax dollar left untouched now is a bigger forced withdrawal later. The defense is sequencing: Roth conversions in the gap years, taxable-account spending first, and a withdrawal order written down before it matters.",
    ],
    riskBullets: [
      "Test 3.5% and 4% as the serious range — at 35–40 years the historical reference carries more weight than at 40.",
      "Model the Roth conversion window: ages 55–62 at low income are often the cheapest tax years of a retiree's life.",
      "Stress healthcare inflation separately — a 10-year bridge at rising premiums can exceed the market-risk damage.",
    ],
    faq: [
      {
        question: "Is $1 million enough to retire at 55?",
        answer:
          "$1 million at a 4% planning rate means $40,000 a year before taxes and fees. With only a 10-year healthcare bridge and Social Security 7 years out, this is the first age where $1 million starts looking sufficient for a moderate lifestyle — provided the bridge years are funded separately.",
      },
      {
        question: "What withdrawal rate should someone retiring at 55 use?",
        answer:
          "3.5% to 4% is the defensible band at this horizon. The bigger lever is no longer the rate — it's the claiming age and the Roth conversion window.",
      },
      {
        question: "Should I do Roth conversions before 62?",
        answer:
          "Often yes, in the low-income gap years. Converting while your bracket is temporarily low can cut lifetime taxes more than any withdrawal-rate tweak. Run the brackets year by year rather than guessing.",
      },
    ],
  },
  60: {
    description:
      "Retiring at 60 is about timing: 5 years to Medicare, 2 to Social Security. Estimate the portfolio, decide the claiming age, and plan required distributions before they plan you.",
    introB:
      "At 60 this is no longer early retirement — it's retirement timing. Five years to Medicare, two to Social Security, and a 30-year horizon mean the standard framework finally fits; the work is in the details, not the model.",
    rangeNote:
      "The table prices $60,000 of annual spending. With Social Security two years out, subtract the expected benefit from spending first — then see what multiple the remaining gap actually needs.",
    spendingHeading: "Build the spending number with Social Security two years out",
    spendingBullets: [
      "Separate essential from discretionary spending; the horizon is short enough that precision beats flexibility now.",
      "Quote just 5 years of pre-Medicare coverage — COBRA or the marketplace for a defined, short bridge.",
      "Add taxes with Medicare premium surcharges in view; crossing an income threshold at 63 can raise Part B premiums two years later.",
      "List the one-time costs of the transition years — the spending number at 60 should reflect real life, not a spreadsheet.",
    ],
    incomeHeading: "Claiming Social Security is the decision",
    incomeParagraphs: [
      "Two years out, this is no longer modeling — it's a choice with a breakeven. Run 62 versus 70 against your health, your spouse's benefit, and the bridge cost of waiting. The portfolio funds the wait either way; the question is what the wait buys.",
      "After 65, required minimum distributions enter the picture in your mid-70s. The Roth conversion window is now short — use the years between retirement and 65 deliberately.",
    ],
    riskHeading: "Longevity risk replaces sequence risk as the headline",
    riskParagraphs: [
      "A 30-year horizon still demands respect for early market declines, but the dominant risk at 60 is outliving the plan's assumptions — particularly for a surviving spouse. The defense shifts from withdrawal rate to structure: guaranteed income flooring, tax diversification, and a plan for the second death, not just the first.",
    ],
    riskBullets: [
      "Test 4% as the reference and 3.5% as the cushion — at 30–35 years the historical framework applies most directly here.",
      "Model the survivor scenario: whichever spouse lives longer often faces single filer brackets on a similar portfolio.",
      "Stress a long-term-care event in the plan's second half; at 60 this is plannable, at 80 it is not.",
    ],
    faq: [
      {
        question: "Is $1 million enough to retire at 60?",
        answer:
          "At 4%, $1 million supports $40,000 a year before taxes and fees, with Social Security arriving in two years and Medicare in five. For a moderate lifestyle, this is the first age where $1 million is genuinely enough for many households — the bridges are short and the backstops are near.",
      },
      {
        question: "What withdrawal rate should someone retiring at 60 use?",
        answer:
          "4% is a reasonable planning reference at a 30-year horizon; 3.5% is the cushion. Fine-tune with the claiming decision, which moves the math more than half a point of withdrawal rate.",
      },
      {
        question: "When should I claim Social Security?",
        answer:
          "There is no universal answer — 62 buys early cash flow at a permanent discount, 70 buys the maximum monthly check at the cost of funding the wait. Model both against your spending, health, and spousal benefit, and remember the decision is usually irrevocable after 12 months.",
      },
    ],
  },
};

function retireAtPage(age: 40 | 45 | 50 | 55 | 60): DecisionPage {
  const copy = RETIRE_AT_COPY[age];
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
    description: copy.description,
    eyebrow: `Retire by age ${age}`,
    datePublished: age === 40 || age === 45 ? expanded : published,
    dateModified: expanded,
    intro: [
      `Retiring at ${age} is not one number. It is a funding problem with several clocks: your portfolio may need to support roughly ${horizon}, Medicare does not normally begin until 65, and Social Security cannot start before 62.`,
      copy.introB,
    ],
    takeaway:
      `Start with 25× to 33.3× the annual spending your portfolio must cover, then model a ${medicareBridge}-year Medicare bridge and a ${Math.max(0, bridge)}-year bridge to the earliest Social Security claiming age separately.`,
    sections: [
      {
        heading: `A practical starting range at age ${age}`,
        paragraphs: [copy.rangeNote],
        table: swrTable(60_000),
      },
      {
        heading: copy.spendingHeading,
        bullets: copy.spendingBullets,
      },
      {
        heading: copy.incomeHeading,
        paragraphs: copy.incomeParagraphs,
      },
      {
        heading: copy.riskHeading,
        paragraphs: copy.riskParagraphs,
        bullets: copy.riskBullets,
      },
    ],
    faq: copy.faq,
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

type PortfolioCopy = {
  description: string;
  intro: string[];
  supportNote: string;
  gapHeading: string;
  gapParagraphs: string[];
  reasonsHeading: string;
  reasonsBullets: string[];
  testHeading: string;
  testBullets: string[];
  faq: Faq[];
};

const PORTFOLIO_COPY: Record<
  500_000 | 750_000 | 1_000_000 | 1_500_000 | 2_000_000 | 3_000_000,
  PortfolioCopy
> = {
  500_000: {
    description:
      "See what $500,000 may support — roughly $15,000 to $20,000 a year — and what it needs to pair with: part-time work, a pension, or a paid-off house.",
    intro: [
      "$500,000 is not a full retirement for most households — it is a foundation. At 3% to 4% it supplies roughly $15,000 to $20,000 a year before taxes and fees, which means the real question is what it pairs with: part-time work, a pension, a paid-off house, or a later Social Security check.",
      "Translate the balance into spending first, then build the rest of the income stack around it. Judged alone, $500,000 fails most retirement tests; judged as one pillar, it can carry real weight.",
    ],
    supportNote:
      "The table is the whole story in miniature: $15,000 to $20,000 a year. That covers a lean budget's essentials in a low-cost area, or roughly half a moderate budget anywhere else. The planning move at this tier is deciding what covers the other half.",
    gapHeading: "Decide what covers the other half",
    gapParagraphs: [
      "Start with total annual spending, add taxes and healthcare, then subtract every durable income source — part-time work, pension, rental income, Social Security when it begins. If spending is $45,000 and part-time work plus Social Security supply $30,000, the portfolio gap is $15,000 — which $500,000 covers at 3%.",
      "At this tier the gap math is the entire plan. There is no margin for vague income assumptions.",
    ],
    reasonsHeading: "Three ways $500,000 succeeds or fails",
    reasonsBullets: [
      "Paired income: with $20,000 of part-time or pension income, $500,000 completes a $40,000 lifestyle. Without it, the same balance funds $20,000.",
      "Housing: a paid-off home can cut the spending the portfolio must cover by a third or more.",
      "Healthcare: at this tier, one uninsured stretch can exceed the entire annual withdrawal — coverage is not optional.",
    ],
    testHeading: "Run a go / caution / stop test",
    testBullets: [
      "Go: total spending minus all durable income leaves $20,000 or less for the portfolio at 4%, with healthcare covered.",
      "Caution: the plan needs the full 4% plus part-time work that might not last.",
      "Stop: the portfolio alone is expected to fund a full lifestyle — $500,000 cannot do that job.",
    ],
    faq: [
      {
        question: "How much income can $500,000 generate?",
        answer:
          "$15,000 to $20,000 a year at 3%–4% before taxes and fees — a supplement or a lean budget's base, not a full retirement income for most households.",
      },
      {
        question: "Can I retire with $500,000 at 60?",
        answer:
          "Only with help: a paid-off house, part-time income, or a pension plus Social Security. The portfolio covers roughly $1,250 to $1,670 a month — the rest has to come from somewhere durable.",
      },
      {
        question: "Is $500,000 enough for Coast FIRE?",
        answer:
          "Often yes — that is this tier's best use. Left invested, $500,000 compounding for 20–30 years can become a full retirement without another dollar saved, while work covers today's bills.",
      },
    ],
  },
  750_000: {
    description:
      "See what $750,000 may support — roughly $22,500 to $30,000 a year — and why spending accuracy decides everything at this tier.",
    intro: [
      "$750,000 sits in the most psychologically difficult tier: enough to imagine retiring, not enough to do it carelessly. At 3% to 4% it supplies roughly $22,500 to $30,000 a year before taxes and fees.",
      "The question at this tier is precision. A $5,000 spending error is a 20% error here — so the spending number has to be built from real quotes, not round numbers.",
    ],
    supportNote:
      "$22,500 to $30,000 a year funds a genuinely lean retirement outright, or a moderate one paired with part-time income or an early Social Security claim. This is the tier where geographic arbitrage — a lower-cost area — moves the needle most.",
    gapHeading: "Close a $25,000 gap, not a $50,000 one",
    gapParagraphs: [
      "Start with total spending, add taxes and healthcare, subtract durable income. If spending is $55,000 and Social Security plus part-time work supply $30,000, the gap is $25,000 — inside this tier's range at 3.5%.",
      "At $750,000 the plan lives or dies on the spending estimate. Rebuild it from bank statements, not memory.",
    ],
    reasonsHeading: "Three levers that decide it at $750,000",
    reasonsBullets: [
      "Spending accuracy: a $5,000 miss here is a 20% miss — the largest relative error of any tier.",
      "Location: moving the same lifestyle to a lower-cost area can cut the required portfolio by six figures.",
      "Social Security timing: claiming early adds income sooner but permanently less; at this tier that tradeoff is often the whole margin.",
    ],
    testHeading: "The $750,000 stress test",
    testBullets: [
      "Go: the gap is $26,000 or less at 3.5% with healthcare quoted, not guessed.",
      "Caution: it works at 4% only, with no reserve for spending surprises.",
      "Stop: the gap exceeds $30,000 before taxes — the portfolio cannot hold that at any defensible rate.",
    ],
    faq: [
      {
        question: "How much income can $750,000 generate?",
        answer:
          "$22,500 to $30,000 a year at 3%–4% before taxes and fees — roughly $1,875 to $2,500 a month.",
      },
      {
        question: "Can I retire with $750,000 at 55?",
        answer:
          "Possibly, if spending is lean and verified — roughly $2,000 a month from the portfolio plus whatever else is durable. The 10-year healthcare bridge is the swing factor; price it first.",
      },
      {
        question: "What is the biggest risk at $750,000?",
        answer:
          "Spending drift. This tier has no slack: a lifestyle that creeps 15% turns a working plan into a failing one. The defense is a hard spending ceiling, not a higher withdrawal rate.",
      },
    ],
  },
  1_000_000: {
    description:
      "See what $1 million may support at 3%, 3.5%, and 4% — then test taxes, healthcare, Social Security, and sequence risk against the benchmark.",
    intro: [
      "$1 million is the benchmark every retirement article is written around — which makes it the most misunderstood number in personal finance. At 3% to 4% it supplies roughly $30,000 to $40,000 a year before taxes and fees.",
      "The 4% rule was literally calibrated on portfolios like this one. That makes $1 million the tier where the textbook math applies most directly — and where its limits matter most.",
    ],
    supportNote:
      "$30,000 to $40,000 a year is a complete lean retirement or a moderate one with Social Security layered in. After taxes and healthcare, the take-home reality is closer to $25,000–$32,000 — plan on that, not the headline.",
    gapHeading: "Subtract before you divide",
    gapParagraphs: [
      "Start with total spending, add taxes and healthcare, then subtract Social Security and any pension — only for the years those benefits actually pay. If spending is $65,000 and Social Security supplies $25,000 from 67, the portfolio gap is $40,000 — exactly what $1 million covers at 4%.",
      "The classic error at this tier is dividing first: $1M ÷ 25 = $40k of 'income' without ever building the spending side. Build spending first.",
    ],
    reasonsHeading: "Three reasons $1 million works or doesn't",
    reasonsBullets: [
      "Taxes: $40,000 of withdrawals is not $40,000 of spending — pre-tax accounts can shave 15–25% off the top.",
      "Healthcare: a decade of pre-Medicare premiums can consume a quarter of the annual withdrawal.",
      "Sequence: the 4% rule survived historical backtests, not guarantees — a bad first decade still breaks it.",
    ],
    testHeading: "Run a go / caution / stop test",
    testBullets: [
      "Go: the gap is $35,000 or less at 3.5%, healthcare quoted, two years of reserves held.",
      "Caution: it needs the full 4% with no flexibility — one bad decade away from trouble.",
      "Stop: spending needs exceed $40,000 before taxes with no other income — the math does not close.",
    ],
    faq: [
      {
        question: "How much income can $1 million generate?",
        answer:
          "$30,000 to $40,000 a year at 3%–4% before taxes and fees — roughly $2,500 to $3,300 a month.",
      },
      {
        question: "How long will $1 million last?",
        answer:
          "At $40,000 a year with average markets, decades; with poor early returns, far fewer. Duration is a function of withdrawals and sequence, not a property of the balance.",
      },
      {
        question: "Is $1 million still enough in 2026?",
        answer:
          "It buys what it always bought: about $35,000 a year of sustainable spending. What changed is the price of everything else — healthcare and housing inflation did more to this question than markets did.",
      },
    ],
  },
  1_500_000: {
    description:
      "See what $1.5 million may support — roughly $45,000 to $60,000 a year — and where the planning shifts from survival to tax optimization.",
    intro: [
      "$1.5 million is where retirement stops being a survival question and becomes an optimization question. At 3% to 4% it supplies roughly $45,000 to $60,000 a year before taxes and fees — enough for a comfortable lifestyle in most of the country.",
      "The risk at this tier is no longer running out of money in the textbook sense. It is paying too much tax, claiming Social Security at the wrong time, and leaving the withdrawal order to chance.",
    ],
    supportNote:
      "$45,000 to $60,000 a year funds a genuinely comfortable retirement — travel, hobbies, generosity — with Social Security as margin rather than necessity. Planning shifts from 'can I?' to 'how do I keep the most of it?'",
    gapHeading: "Optimize the gap, not just close it",
    gapParagraphs: [
      "Start with total spending, add taxes and healthcare, subtract Social Security and pensions. If spending is $90,000 and Social Security supplies $30,000, the $60,000 gap sits at the top of this tier's range — workable, but the withdrawal order now matters: taxable accounts first, then pre-tax, Roth last is the textbook sequence, tuned to your brackets.",
      "At $1.5 million, a 1% tax drag costs $15,000 a year. Asset location deserves the attention the withdrawal rate used to get.",
    ],
    reasonsHeading: "Three things that matter more than the withdrawal rate here",
    reasonsBullets: [
      "Withdrawal order: which account you tap each year can move lifetime taxes by six figures.",
      "Social Security timing: with the portfolio covering the bridge, delaying to 70 is affordable — and often optimal.",
      "Healthcare: still the wild card, but now a budgeting problem rather than an existential one.",
    ],
    testHeading: "Test the plan, then test the taxes",
    testBullets: [
      "Go: the gap is $52,500 or less at 3.5% with a written withdrawal order.",
      "Caution: the plan works but no tax planning exists — the leak is silent, not fatal.",
      "Stop: spending exceeds $60,000 with no Social Security — you're spending into the next tier's territory.",
    ],
    faq: [
      {
        question: "How much income can $1.5 million generate?",
        answer:
          "$45,000 to $60,000 a year at 3%–4% before taxes and fees — roughly $3,750 to $5,000 a month.",
      },
      {
        question: "What should I do differently at $1.5 million?",
        answer:
          "Plan the withdrawal order and the Roth conversion window. The extra half-million over $1M buys optionality — spend it on tax efficiency, not lifestyle creep.",
      },
      {
        question: "Can I retire early with $1.5 million?",
        answer:
          "At 55, yes for most lifestyles — $52,500 a year at 3.5% with Social Security later as margin. Price the healthcare bridge first; it's the only structural risk left.",
      },
    ],
  },
  2_000_000: {
    description:
      "See what $2 million may support — roughly $60,000 to $80,000 a year — and why the real work at this tier is Roth conversions, RMDs, and withdrawal order.",
    intro: [
      "$2 million is the tier where the withdrawal rate stops being the binding constraint. At 3% to 4% it supplies roughly $60,000 to $80,000 a year before taxes and fees — more than most households spend.",
      "The planning problem inverts: instead of stretching the portfolio to cover spending, you are managing taxes, required distributions, and what is left over. This is a tax problem wearing a retirement problem's clothes.",
    ],
    supportNote:
      "$60,000 to $80,000 a year exceeds median household spending with room to spare. The table below is almost academic — the real questions are Roth conversions before required distributions, capital-gains bracket management, and Medicare premium thresholds.",
    gapHeading: "The gap is negative — plan the surplus",
    gapParagraphs: [
      "Start with total spending, add taxes and healthcare, subtract Social Security and pensions. If spending is $100,000 and income supplies $40,000, the $60,000 gap is covered at 3% — the lowest planning rate. The surplus question: which dollars to convert, gift, or spend first.",
      "Model required minimum distributions in your mid-70s now. Every pre-tax dollar is a future forced withdrawal at unknown rates.",
    ],
    reasonsHeading: "Three tax problems that replace the money problem",
    reasonsBullets: [
      "Required distributions: pre-tax balances keep growing into forced withdrawals — the conversion window before 65 and before Social Security is the counter.",
      "Medicare surcharges: crossing an income threshold can raise Part B premiums two years later — a cliff, not a slope.",
      "Legacy: at this tier the plan outlives you; beneficiary designations and step-up basis matter more than another year of work.",
    ],
    testHeading: "Test the tax plan, not the balance",
    testBullets: [
      "Go: spending is covered at 3% with a Roth conversion plan through the gap years.",
      "Caution: no tax plan — the money works, the IRS takes more than necessary.",
      "Stop: rarely applies on math; applies when the estate plan doesn't exist.",
    ],
    faq: [
      {
        question: "How much income can $2 million generate?",
        answer:
          "$60,000 to $80,000 a year at 3%–4% before taxes and fees — roughly $5,000 to $6,700 a month.",
      },
      {
        question: "Do I still need a withdrawal rate at $2 million?",
        answer:
          "As a guardrail, not a lifeline. The rate tells you the ceiling; the actual work is withdrawal order, conversions, and distribution management.",
      },
      {
        question: "Should I delay Social Security to 70 with $2 million?",
        answer:
          "Usually yes — the portfolio funds the bridge comfortably, and the larger inflation-adjusted check is longevity insurance for the surviving spouse. Run your numbers, but the default flips to delay at this tier.",
      },
    ],
  },
  3_000_000: {
    description:
      "See what $3 million may support — roughly $90,000 to $120,000 a year — and why the risks here are taxes, concentration, and estate friction, not withdrawal rates.",
    intro: [
      "$3 million is not a retirement question — it is a wealth-management question. At 3% to 4% it supplies roughly $90,000 to $120,000 a year before taxes and fees, beyond what all but the highest-spending households need.",
      "Nobody runs out of money at $3 million by accident. They do it through concentration, taxes, or family dynamics. The plan here is about structure, not sufficiency.",
    ],
    supportNote:
      "The table below confirms what you already suspect: $90,000 to $120,000 a year. If you are reading this page, the binding constraints are taxes, estate law, and purpose — not the withdrawal math.",
    gapHeading: "Spending is not the constraint",
    gapParagraphs: [
      "Run the gap math anyway — spending minus durable income — if only to size the surplus honestly. A $120,000 lifestyle against $40,000 of Social Security and pension income leaves an $80,000 gap, covered at under 3%.",
      "Then redirect planning effort: estate documents, beneficiary reviews, charitable vehicles, and the tax-efficient transfer of what remains.",
    ],
    reasonsHeading: "Three things that actually threaten $3 million",
    reasonsBullets: [
      "Concentration: a single stock or business-sale proceeds left concentrated is a bigger risk than any withdrawal rate.",
      "Taxes across decades: required distributions, estate inclusion, and state taxes compound into the largest lifetime cost.",
      "Purpose: without a spending and giving plan, the default outcome is accidental accumulation — fine for heirs, empty for you.",
    ],
    testHeading: "The only test that matters",
    testBullets: [
      "Go: the estate plan exists, beneficiaries are current, and the withdrawal order is written.",
      "Caution: $3 million with no estate documents — the money is safe, the transfer isn't.",
      "Stop: concentrated single-stock risk with no diversification plan.",
    ],
    faq: [
      {
        question: "How much income can $3 million generate?",
        answer:
          "$90,000 to $120,000 a year at 3%–4% before taxes and fees — roughly $7,500 to $10,000 a month.",
      },
      {
        question: "What is the biggest mistake at $3 million?",
        answer:
          "Treating it as a bigger version of $1 million. The failure modes are completely different: taxes, concentration, and estate friction — not withdrawal rates.",
      },
      {
        question: "Do I need a financial advisor at $3 million?",
        answer:
          "You need an estate attorney and a tax strategist more than an investment picker. Pay for planning, not for portfolio assembly.",
      },
    ],
  },
};

function portfolioPage(
  amount: 500_000 | 750_000 | 1_000_000 | 1_500_000 | 2_000_000 | 3_000_000,
): DecisionPage {
  const copy = PORTFOLIO_COPY[amount];
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
    description: copy.description,
    eyebrow: "Portfolio reality check",
    datePublished:
      amount === 500_000 ||
      amount === 750_000 ||
      amount === 1_500_000 ||
      amount === 3_000_000
        ? expanded
        : published,
    dateModified: expanded,
    intro: copy.intro,
    takeaway: `${label} supports an initial portfolio withdrawal of roughly ${money.format(amount * 0.03)} to ${money.format(amount * 0.04)} a year at 3%–4%, before taxes and fees.`,
    sections: [
      {
        heading: `What ${label} may support`,
        paragraphs: [copy.supportNote],
        table: {
          caption: "Illustrative first-year portfolio withdrawals",
          headers: ["Planning rate", "Annual withdrawal", "Monthly equivalent"],
          rows,
        },
      },
      {
        heading: copy.gapHeading,
        paragraphs: copy.gapParagraphs,
      },
      {
        heading: copy.reasonsHeading,
        bullets: copy.reasonsBullets,
      },
      {
        heading: copy.testHeading,
        bullets: copy.testBullets,
      },
    ],
    faq: copy.faq,
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
