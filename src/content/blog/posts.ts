export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  /** Simple paragraphs + optional headings for MVP (no MDX dependency) */
  body: Array<{ type: "p" | "h2" | "ul"; content: string | string[] }>;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "monte-carlo-vs-historical-cycles-fire",
    title: "Monte Carlo vs historical cycles: what free FIRE tools can teach",
    description:
      "How simple Monte Carlo stress tests differ from historical cycle backtests — success rates, limitations, and how to use each without false precision.",
    date: "2026-07-17",
    readingMinutes: 11,
    tags: ["sequence-risk", "stress-test", "methodology"],
    body: [
      {
        type: "p",
        content:
          "Once you leave constant-return FIRE math, two families of tools dominate: historical cycle backtests and Monte Carlo simulations. Both are useful. Neither is a crystal ball. This guide explains what free tools can honestly teach — and how RetireFire’s free stress test fits.",
      },
      {
        type: "h2",
        content: "Historical cycles (the cFIREsim / FIRECalc tradition)",
      },
      {
        type: "ul",
        content: [
          "Replay overlapping periods of real market history (and often inflation) through your plan.",
          "Strength: paths come from markets that actually happened, with real sequence clusters.",
          "Limit: the future will not be a shuffle of 1871–present; sample size of independent long retirements is smaller than it looks; US-centric history is common.",
        ],
      },
      {
        type: "h2",
        content: "Monte Carlo (random paths from a model)",
      },
      {
        type: "ul",
        content: [
          "Draw many return sequences from a statistical model (e.g. mean + volatility shocks).",
          "Strength: easy to explore “what if volatility is higher?” and to produce percentile bands.",
          "Limit: garbage-in assumptions (mean, σ, independence) dominate the pretty success rate; i.i.d. years miss regime crashes and autocorrelation unless the model adds them.",
        ],
      },
      {
        type: "h2",
        content: "What “success rate” means (and does not)",
      },
      {
        type: "p",
        content:
          "In accumulation stress tests, success often means terminal wealth ≥ target. In withdrawal tests, it often means the portfolio lasts N years. That percentage is the share of simulated or historical paths meeting the definition — not the probability that your life, taxes, and healthcare work out. If the definition is wrong for your question, the percentage is theater.",
      },
      {
        type: "h2",
        content: "How RetireFire’s free stress test works",
      },
      {
        type: "ul",
        content: [
          "1,000 paths, fixed volatility presets (12% / 15% / 18%).",
          "Mean return = the same shared real return as the main calculators.",
          "Annual independent shocks: r = mean + σ·Z (clipped), end-of-year contributions.",
          "Coast: contributions = 0; target = full FIRE. Years: keep contributions; target = FIRE number.",
          "Reports success rate, p10/p50/p90, sample paths, terminal histogram.",
          "Documented on Methodology; labeled educational, not historical backtesting.",
        ],
      },
      {
        type: "h2",
        content: "A practical workflow",
      },
      {
        type: "ul",
        content: [
          "Start with transparent constant-return Coast / FIRE / Barista numbers.",
          "Sensitivity: lower r and SWR before you celebrate.",
          "Run the free Monte Carlo for dispersion under a stated toy model.",
          "If the plan is high-stakes, graduate to a historical-cycle tool (cFIREsim lineage, etc.) and/or a planner.",
          "Never skip taxes, healthcare, and flexibility — tools omit them for a reason.",
        ],
      },
      {
        type: "h2",
        content: "What we are not claiming",
      },
      {
        type: "p",
        content:
          "We are not claiming Monte Carlo is “better” than history, or that 1,000 paths equal truth. We are claiming that a free, documented range next to a deterministic number beats a single green checkmark. Advanced paths, regimes, and historical engines may appear later as optional depth — core tools and a useful free stress test stay free.",
      },
      {
        type: "p",
        content:
          "Try Coast and Years stress tests on RetireFire, read Methodology, and use the Coast checklist before changing savings behavior. Educational only — not advice.",
      },
    ],
  },
  {
    slug: "coast-fire-by-age-tables",
    title: "Coast FIRE by age: tables and worked examples",
    description:
      "Age-by-age Coast FIRE numbers for common spending levels, with 4% vs 5% real return stress columns and clear assumptions — plus how to run your own table.",
    date: "2026-07-17",
    readingMinutes: 12,
    tags: ["coast-fire", "tables", "linkable"],
    body: [
      {
        type: "p",
        content:
          "Coast FIRE is mostly a function of three inputs: your full FIRE target (spending ÷ withdrawal rate), years until a traditional retirement age, and an assumed real return. That makes age-by-age tables useful — if every assumption is listed. Below are transparent tables you can re-run in the calculator.",
      },
      {
        type: "h2",
        content: "Assumptions for all tables on this page",
      },
      {
        type: "ul",
        content: [
          "Traditional retirement age = 65",
          "Withdrawal rate for full FIRE = 4% (25× spending)",
          "Primary real return = 5%; stress column = 4%",
          "No future contributions after the coast number is held",
          "No taxes, fees, sequence risk, or Social Security in the table itself",
        ],
      },
      {
        type: "p",
        content:
          "Formula: coast ≈ FIRE ÷ (1+r)^n where n = 65 − current age. Educational only — not advice and not a promise markets deliver a constant real return.",
      },
      {
        type: "h2",
        content: "Table A — $60,000 spending → FIRE $1,500,000",
      },
      {
        type: "ul",
        content: [
          "Age 25 (40y): ~$213k @ 5% · ~$304k @ 4%",
          "Age 30 (35y): ~$272k @ 5% · ~$370k @ 4%",
          "Age 35 (30y): ~$347k @ 5% · ~$450k @ 4%",
          "Age 40 (25y): ~$443k @ 5% · ~$547k @ 4%",
          "Age 45 (20y): ~$565k @ 5% · ~$684k @ 4%",
          "Age 50 (15y): ~$722k @ 5% · ~$833k @ 4%",
          "Age 55 (10y): ~$921k @ 5% · ~$1.01M @ 4%",
        ],
      },
      {
        type: "h2",
        content: "Table B — $40,000 spending → FIRE $1,000,000",
      },
      {
        type: "ul",
        content: [
          "Age 30: ~$181k @ 5% · ~$247k @ 4%",
          "Age 35: ~$231k @ 5% · ~$300k @ 4%",
          "Age 40: ~$295k @ 5% · ~$365k @ 4%",
          "Age 45: ~$377k @ 5% · ~$456k @ 4%",
          "Age 50: ~$481k @ 5% · ~$555k @ 4%",
        ],
      },
      {
        type: "h2",
        content: "Table C — $100,000 spending → FIRE $2,500,000",
      },
      {
        type: "ul",
        content: [
          "Age 30: ~$453k @ 5% · ~$617k @ 4%",
          "Age 35: ~$578k @ 5% · ~$750k @ 4%",
          "Age 40: ~$738k @ 5% · ~$912k @ 4%",
          "Age 45: ~$942k @ 5% · ~$1.14M @ 4%",
          "Age 50: ~$1.20M @ 5% · ~$1.39M @ 4%",
        ],
      },
      {
        type: "h2",
        content: "How to read these without fooling yourself",
      },
      {
        type: "ul",
        content: [
          "Coast is not early retirement. You still need income for spending until traditional retirement age (or you switch to a different plan).",
          "Lower r always raises the coast bar — if only 5% “works,” the plan is fragile.",
          "If spending rises, every cell in the table scales up with FIRE.",
          "Sequence risk is not in the table. Use the free stress test on the Coast calculator for dispersion of terminal wealth.",
        ],
      },
      {
        type: "h2",
        content: "Worked example — age 35, $60k lifestyle",
      },
      {
        type: "p",
        content:
          "Full FIRE at 4% is $1.5M. With 30 years to age 65 and 5% real, coast ≈ $347k. At 4% real, coast ≈ $450k. If you hold $300k today, you are short on both columns — more savings, lower spending, or a longer horizon closes the gap. If you hold $500k, the constant-return model says you are past coast at 5% real, but you should still keep emergency funds and healthcare planned separately.",
      },
      {
        type: "h2",
        content: "Build your own live table",
      },
      {
        type: "p",
        content:
          "Open the Coast FIRE calculator, set spending, withdrawal rate, and retirement age. The interactive age table updates from shared assumptions and can be exported as CSV. Compare Barista FIRE if your question is semi-retirement cash flow rather than stopping contributions. Methodology documents formulas; Approach documents limits.",
      },
      {
        type: "p",
        content:
          "Educational illustration only — not financial, tax, or investment advice.",
      },
    ],
  },
  {
    slug: "why-simple-fire-calculators-fail",
    title: "Why most simple FIRE calculators fail long-term planners",
    description:
      "Constant returns, missing sequence risk, taxes, and lifestyle — what simple FIRE math gets right, what it quietly omits, and how to use tools without false confidence.",
    date: "2026-07-16",
    readingMinutes: 11,
    tags: ["basics", "sequence-risk", "methodology"],
    body: [
      {
        type: "p",
        content:
          "Simple FIRE calculators are not scams. Most of them implement clear formulas: spending ÷ withdrawal rate, compound growth with constant contributions, a Coast discount, a Barista gap. The failure mode is subtler: long-term planners treat a single smooth path as a plan, then discover markets, taxes, and life do not follow the chart.",
      },
      {
        type: "h2",
        content: "What simple calculators get right",
      },
      {
        type: "ul",
        content: [
          "They force you to name spending, savings, and a withdrawal rate.",
          "They show leverage: savings rate often moves the timeline more than optimistic return assumptions.",
          "They make Coast vs full FIRE vs Barista distinctions computable.",
          "When formulas are published, you can audit the math in minutes.",
        ],
      },
      {
        type: "h2",
        content: "Failure mode 1: constant returns as destiny",
      },
      {
        type: "p",
        content:
          "A 5% real return every year is an illustration, not a forecast. Two sequences with the same average return can leave very different portfolios — especially if you withdraw, but also if you stop contributing after “hitting Coast” with no cushion. Sequence of returns is the order problem: bad years early hurt more when cash flows are fragile.",
      },
      {
        type: "h2",
        content: "Failure mode 2: one withdrawal rate forever",
      },
      {
        type: "p",
        content:
          "The 4% starting point is research history, not a warranty. Early retirement horizons (40–50+ years), high equity concentration, inflexible spending, and concentrated human-capital risk all argue for stress-testing lower rates (3–3.5%) or flexible spending rules. A calculator that only highlights 4% invites overconfidence.",
      },
      {
        type: "h2",
        content: "Failure mode 3: taxes, fees, and account plumbing",
      },
      {
        type: "ul",
        content: [
          "Effective withdrawal rates after tax differ from pre-tax spreadsheet rates.",
          "Fees compound against you silently.",
          "401(k)/IRA/taxable withdrawal order changes longevity in ways a single “portfolio” box cannot see.",
        ],
      },
      {
        type: "h2",
        content: "Failure mode 4: lifestyle and optionality",
      },
      {
        type: "p",
        content:
          "Healthcare cliffs, housing, kids, career shocks, and lifestyle creep can dominate the gap between a pretty chart and a durable plan. Semi-retirement income is rarely a flat annuity. Coast FIRE is not early retirement. If the tool’s copy does not say that, the user often invents a friendlier story.",
      },
      {
        type: "h2",
        content: "How to use simple tools without lying to yourself",
      },
      {
        type: "ul",
        content: [
          "Run ranges: lower r, lower SWR, higher spending.",
          "Prefer surplus cushions over exact “I hit the number today” narratives.",
          "Separate emergency funds and healthcare from the FIRE multiple.",
          "Use a sequence stress test (even a simple Monte Carlo) to see dispersion — not to claim a true probability of life success.",
          "Read what the model omits before you change jobs or savings rate.",
        ],
      },
      {
        type: "h2",
        content: "How RetireFire is designed around this",
      },
      {
        type: "p",
        content:
          "We keep deterministic calculators primary and transparent. Shared assumptions sync across FIRE number, years, Coast, and Barista. Share links and CSV export keep scenarios honest offline. Coast and Years include a free basic stress test (1,000 paths, fixed volatility presets) with success rate and percentile terminals — labeled as educational, not prophecy. Methodology and Approach pages list formulas and limits in plain language.",
      },
      {
        type: "p",
        content:
          "Educational only — not financial advice. Tools inform judgment; they do not replace it. See the disclaimer.",
      },
    ],
  },
  {
    slug: "realistic-fire-numbers-2026",
    title: "Realistic FIRE numbers in 2026 (with stress-test context)",
    description:
      "Worked FIRE, Coast, and Barista numbers for common spending levels in 2026 — plus how lower SWR and sequence stress tests change the story.",
    date: "2026-07-16",
    readingMinutes: 12,
    tags: ["fire-number", "coast-fire", "2026"],
    body: [
      {
        type: "p",
        content:
          "“What’s a realistic FIRE number in 2026?” is really three questions: how much do you spend, what withdrawal rate are you willing to plan with, and how much path risk can you tolerate? Below are transparent worked examples — not benchmarks you must match, and not advice.",
      },
      {
        type: "h2",
        content: "Full FIRE at common spending levels (4% and 3.5%)",
      },
      {
        type: "ul",
        content: [
          "$40k spend → $1.0M at 4% · ~$1.14M at 3.5%",
          "$60k spend → $1.5M at 4% · ~$1.71M at 3.5%",
          "$80k spend → $2.0M at 4% · ~$2.29M at 3.5%",
          "$100k spend → $2.5M at 4% · ~$2.86M at 3.5%",
        ],
      },
      {
        type: "p",
        content:
          "The jump from 4% to 3.5% is large in dollars because the multiplier moves from 25× to about 28.6×. Early retirees often explore that band precisely because horizons are long and sequence risk is less forgiving.",
      },
      {
        type: "h2",
        content: "Coast examples (age 35 → 65, 5% real)",
      },
      {
        type: "ul",
        content: [
          "Full FIRE $1.5M → coast ≈ $1.5M ÷ (1.05)^30 ≈ $347k",
          "Full FIRE $2.0M → coast ≈ $463k",
          "Same $1.5M target at 4% real → coast ≈ $462k (lower r raises today’s bar)",
        ],
      },
      {
        type: "p",
        content:
          "Coast numbers look “small” next to full FIRE because they are not funding early retirement spending from the portfolio. They only ask whether growth may finish the nest egg by a traditional retirement age if contributions stop.",
      },
      {
        type: "h2",
        content: "Barista examples ($60k spend, 4% SWR)",
      },
      {
        type: "ul",
        content: [
          "$0 work income → $1.5M (full FIRE)",
          "$15k work income → gap $45k → $1.125M",
          "$25k work income → gap $35k → $875k",
          "$40k work income → gap $20k → $500k",
        ],
      },
      {
        type: "p",
        content:
          "Barista math only helps if the work income is realistic after taxes, benefits cliffs, and dry spells. Semi-retirement is a cash-flow design, not a slogan.",
      },
      {
        type: "h2",
        content: "Add stress-test context",
      },
      {
        type: "p",
        content:
          "A constant 5% real path to a $1.5M target can look tidy while a 1,000-path stress test with 15% volatility shows a wide band of terminal wealth. Success rate is the share of simulated paths that finish at or above target under the toy model — not the probability that your life works out. Use it to see whether you need more surplus, more savings years, or a lower lifestyle assumption.",
      },
      {
        type: "h2",
        content: "A 2026 planning checklist",
      },
      {
        type: "ul",
        content: [
          "Write annual spending in today’s dollars (include healthcare realistically).",
          "Compute FIRE at 3%, 3.5%, and 4%.",
          "Compute Coast with 4% and 5% real over your true horizon.",
          "If semi-retiring, stress work income at 50% of the hopeful number.",
          "Run the free sequence stress test on Coast/Years and note p10 vs median.",
          "Export CSV or share the URL so a partner sees the same assumptions.",
        ],
      },
      {
        type: "h2",
        content: "Run the numbers",
      },
      {
        type: "p",
        content:
          "Use the free FIRE Number, Years to FIRE, Coast FIRE, and Barista FIRE calculators on RetireFire with shared assumptions. Read Methodology for formulas and the stress-test model. Educational only — not advice.",
      },
    ],
  },
  {
    slug: "coast-fire-sequence-of-returns-risk",
    title: "Coast FIRE with sequence of returns risk",
    description:
      "Why a single Coast FIRE number can look safe under constant returns — and how sequence risk, lower return assumptions, and stress testing change the picture.",
    date: "2026-07-15",
    readingMinutes: 12,
    tags: ["coast-fire", "sequence-risk", "stress-test"],
    body: [
      {
        type: "p",
        content:
          "Coast FIRE answers a focused question: do you already have enough invested that, with no further contributions, compound growth may reach full FIRE by a traditional retirement age under an assumed real return? The classic answer is a single discounted number. That number is useful — and incomplete — because it usually assumes a smooth return every year.",
      },
      {
        type: "h2",
        content: "The coast formula (and what it hides)",
      },
      {
        type: "p",
        content:
          "If full FIRE is T, real return is r, and years until traditional retirement is n: coast number ≈ T ÷ (1+r)^n. Example: T = $1,500,000, r = 5%, n = 20 → coast ≈ $565,000. Under those assumptions, holding roughly that amount today and never contributing again is modeled as “enough” for full FIRE by the horizon age.",
      },
      {
        type: "p",
        content:
          "What the formula hides: markets do not deliver 5% real every calendar year. Some decades are friendly; some open with long drawdowns. Sequence of returns risk is the idea that the order of good and bad years matters — especially when you later withdraw, but also when you treat a point estimate as a green light to change savings behavior.",
      },
      {
        type: "h2",
        content: "Stress-test the return before you celebrate",
      },
      {
        type: "ul",
        content: [
          "Same $1.5M target, 20-year horizon, 5% real → coast ≈ $565k",
          "Same target and horizon, 4% real → coast ≈ $684k",
          "Same target and horizon, 3% real → coast ≈ $831k",
        ],
      },
      {
        type: "p",
        content:
          "Lowering r is a crude but honest stress test available in any transparent calculator. If only the optimistic r “works,” the plan is fragile. Early “coasters” who also reduce savings and increase lifestyle stack multiple risks: lower future contributions, higher spending (higher T), and path-dependent markets.",
      },
      {
        type: "h2",
        content: "Coast FIRE is not early retirement",
      },
      {
        type: "ul",
        content: [
          "You may still need earned income for decades of spending before traditional retirement age.",
          "Healthcare, housing, and career optionality are outside the discount formula.",
          "Hitting coast does not immunize you against a bad decade if you later switch to full withdrawals early.",
        ],
      },
      {
        type: "h2",
        content: "What simple calculators get right — and wrong",
      },
      {
        type: "p",
        content:
          "Simple models get the discount math right and keep assumptions visible. They get long-term decision quality wrong when users treat constant r as a forecast, ignore sequence risk, or skip taxes and fees. Historical cycle tools and Monte Carlo stress tests address path risk with different trade-offs: history is path-rich but not a crystal ball; Monte Carlo is flexible but depends on the return distribution you assume.",
      },
      {
        type: "h2",
        content: "A practical checklist",
      },
      {
        type: "ul",
        content: [
          "Run coast at 3%, 4%, and 5% real with the same spending and SWR.",
          "Recompute full FIRE at 3–4% SWR; early horizons often warrant lower SWR.",
          "Keep an emergency fund and healthcare plan separate from the coast number.",
          "If you stop contributing, track whether lifestyle creep raises T faster than markets help.",
          "Prefer ranges and surplus cushions over exact “I hit coast today” narratives.",
        ],
      },
      {
        type: "h2",
        content: "How to use RetireFire",
      },
      {
        type: "p",
        content:
          "Open the Coast FIRE calculator, set your spending, portfolio, ages, withdrawal rate, and real return. Copy a share link or export CSV for your notes. Compare with full FIRE and Barista FIRE under the same shared assumptions. Read Methodology for formulas and Our Approach for what we deliberately omit — including the upcoming transparent stress-test mode.",
      },
      {
        type: "p",
        content:
          "Educational illustration only — not financial advice. Past returns do not guarantee future results. See the disclaimer before making decisions.",
      },
    ],
  },
  {
    slug: "barista-fire-vs-coast-fire",
    title: "Barista FIRE vs Coast FIRE: a data-driven comparison",
    description:
      "Same spending, different questions: stopping contributions (Coast) versus covering part of spend with work income (Barista). Formulas, tables, and when each frame helps.",
    date: "2026-07-15",
    readingMinutes: 11,
    tags: ["barista-fire", "coast-fire", "comparison"],
    body: [
      {
        type: "p",
        content:
          "Coast FIRE and Barista FIRE are often mixed up in headlines. Both can lower pressure versus classic full FIRE, but they answer different planning questions. Confusing them produces the wrong savings target and the wrong lifestyle story.",
      },
      {
        type: "h2",
        content: "Definitions that actually compute",
      },
      {
        type: "ul",
        content: [
          "Full FIRE number ≈ annual spending ÷ withdrawal rate (e.g. $60k ÷ 4% = $1.5M).",
          "Coast number ≈ full FIRE ÷ (1+r)^years until traditional retirement age — portfolio that may grow to full FIRE with zero future contributions.",
          "Barista number ≈ max(0, spending − work income) ÷ withdrawal rate — portfolio that funds only the gap while work covers the rest.",
        ],
      },
      {
        type: "h2",
        content: "Worked comparison at $60k spending, 4% SWR, 5% real",
      },
      {
        type: "ul",
        content: [
          "Full FIRE: $1,500,000",
          "Coast (age 35 → 65, 30 years): coast ≈ $1,500,000 ÷ (1.05)^30 ≈ $347,000",
          "Barista ($20k work income): gap $40k → barista number $1,000,000",
          "Barista ($30k work income): gap $30k → barista number $750,000",
        ],
      },
      {
        type: "p",
        content:
          "Notice the intuition trap: Coast can show a much smaller number than Barista because Coast is not funding early retirement spending from the portfolio — it is only asking whether growth can finish the nest egg by a later age while you still cover life with earnings. Barista is about semi-retirement cash flow now.",
      },
      {
        type: "h2",
        content: "When Coast is the better frame",
      },
      {
        type: "ul",
        content: [
          "You still plan to work (full- or part-time) for many years.",
          "You want permission to reduce savings rate or career intensity without claiming early retirement.",
          "Your question is “can compounding finish the job?” not “can I live on withdrawals + side income this year?”",
        ],
      },
      {
        type: "h2",
        content: "When Barista is the better frame",
      },
      {
        type: "ul",
        content: [
          "You want a near-term semi-retirement lifestyle with intentional work income.",
          "Benefits, structure, or purpose from work matter as much as the math.",
          "You need a portfolio target that funds a spending gap, not a distant full FIRE discount.",
        ],
      },
      {
        type: "h2",
        content: "Shared risks (do not skip)",
      },
      {
        type: "ul",
        content: [
          "Work income can be uneven; benefits can cliff.",
          "Sequence risk still matters if you withdraw from the portfolio.",
          "Taxes, healthcare, and housing can dominate spreadsheet gaps.",
          "Lifestyle creep can erase both Coast surplus and Barista gap math.",
        ],
      },
      {
        type: "h2",
        content: "How to compare on RetireFire",
      },
      {
        type: "p",
        content:
          "Set one spending level and withdrawal rate in shared assumptions. Read Coast FIRE and Barista FIRE side by side. Export CSV or copy a share link so a partner sees the same scenario. Stress-test by lowering r and SWR. Methodology documents formulas; Our Approach documents limits and the roadmap for explicit stress tests.",
      },
      {
        type: "p",
        content:
          "Educational only — not advice. Use professionals for personal decisions.",
      },
    ],
  },
  {
    slug: "safe-withdrawal-rate-3-vs-4-percent",
    title: "Safe withdrawal rate: 3% vs 3.5% vs 4%",
    description:
      "How to choose a starting withdrawal rate for FIRE planning — and why early retirees often stress-test below 4%.",
    date: "2026-07-14",
    readingMinutes: 8,
    tags: ["swr", "fire-number", "basics"],
    body: [
      {
        type: "p",
        content:
          "A safe withdrawal rate (SWR) is the percentage of your portfolio you plan to spend in year one of retirement, typically adjusted for inflation afterward. Combined with annual spending, it sets your FIRE number: spending ÷ withdrawal rate.",
      },
      {
        type: "h2",
        content: "Where 4% comes from",
      },
      {
        type: "p",
        content:
          "The classic 4% starting point is associated with William Bengen’s research and the Trinity Study lineage on historical U.S. stock/bond portfolios. It is a research-based rule of thumb for multi-decade retirements — not a guarantee that markets will behave the same way for the next 30–50 years.",
      },
      {
        type: "h2",
        content: "Why early retirees often use 3–3.5%",
      },
      {
        type: "ul",
        content: [
          "Longer horizon: retiring at 40 can mean 50+ years of withdrawals.",
          "Sequence-of-returns risk: poor markets early in retirement hurt more when the plan is longer.",
          "Flexibility trade-offs: lower SWR means a larger nest egg, but more buffer if returns disappoint.",
        ],
      },
      {
        type: "h2",
        content: "A simple comparison at $60,000 spending",
      },
      {
        type: "ul",
        content: [
          "4.0% → FIRE number $1,500,000 (25×)",
          "3.5% → FIRE number about $1,714,000 (~28.6×)",
          "3.0% → FIRE number $2,000,000 (~33.3×)",
        ],
      },
      {
        type: "p",
        content:
          "That is a $500,000 spread between 4% and 3% for the same lifestyle. The “right” rate depends on your flexibility to cut spending, other income (Social Security, part-time work), asset allocation, and risk tolerance — none of which a single percentage captures perfectly.",
      },
      {
        type: "h2",
        content: "How to use SWR in RetireFire",
      },
      {
        type: "p",
        content:
          "Treat SWR as a dial, not a destiny. Run your FIRE number at 3%, 3.5%, and 4%. If only the optimistic case works, the plan is fragile. Pair the number with the years-to-FIRE and Coast/Barista tools to see whether work income or a longer accumulation period closes the gap.",
      },
      {
        type: "p",
        content:
          "Educational illustration only — not financial advice. See the Methodology page for formula notes and the disclaimer before making decisions.",
      },
    ],
  },
  {
    slug: "how-many-years-until-fire",
    title: "How many years until FIRE?",
    description:
      "The levers that move your timeline to financial independence: savings rate, spending, portfolio, and return assumptions.",
    date: "2026-07-13",
    readingMinutes: 7,
    tags: ["years-to-fire", "basics"],
    body: [
      {
        type: "p",
        content:
          "“Years to FIRE” is the planning question after you know a target nest egg: given what you have, what you save, and what you assume markets return (in real terms), how long might it take to reach financial independence?",
      },
      {
        type: "h2",
        content: "The four main levers",
      },
      {
        type: "ul",
        content: [
          "Current invested portfolio — starting capital compounds.",
          "Annual savings (or savings rate) — usually the lever you control most.",
          "FIRE target — driven by spending and withdrawal rate.",
          "Expected real return — powerful, but easiest to over-assume.",
        ],
      },
      {
        type: "h2",
        content: "Why savings rate dominates",
      },
      {
        type: "p",
        content:
          "Raising savings often does double duty: more money invested each year and, if spending falls, a lower FIRE number. Assuming a higher return shortens the timeline on a spreadsheet but does not put cash in your brokerage account. Conservative planners stress-test lower returns rather than banking on bull markets.",
      },
      {
        type: "h2",
        content: "A worked sketch",
      },
      {
        type: "p",
        content:
          "Imagine $200,000 invested, $40,000 saved per year, a $1,500,000 target ($60k spend at 4%), and a 5% real return. A constant-return model will show a multi-year path with a growth chart. Change only the savings amount or only the return to see which move changes the finish line more for your situation.",
      },
      {
        type: "h2",
        content: "What the model leaves out",
      },
      {
        type: "ul",
        content: [
          "Market volatility and sequence risk",
          "Career interruptions, raises, and windfalls",
          "Taxes, fees, and account-type constraints",
          "Lifestyle changes as you approach FI",
        ],
      },
      {
        type: "p",
        content:
          "Use the free Years to FIRE calculator on RetireFire for an interactive timeline, then cross-check the target with the FIRE Number tool and Methodology notes.",
      },
    ],
  },
  {
    slug: "coast-fire-number-formula-examples",
    title: "Coast FIRE number: formula and examples",
    description:
      "How to calculate a Coast FI number, with a clear discount formula and numeric examples you can re-run in the calculator.",
    date: "2026-07-12",
    readingMinutes: 7,
    tags: ["coast-fire", "basics"],
    body: [
      {
        type: "p",
        content:
          "Your Coast FIRE number is the portfolio you need today so that, with no further contributions, compound growth may reach full FIRE by a traditional retirement age under an assumed real return.",
      },
      {
        type: "h2",
        content: "The discount formula",
      },
      {
        type: "p",
        content:
          "If full FIRE is T, real return is r, and years until traditional retirement is n: coast number ≈ T ÷ (1+r)^n. You are discounting the future target back to today.",
      },
      {
        type: "h2",
        content: "Example A — 20-year runway",
      },
      {
        type: "p",
        content:
          "Full FIRE $1,500,000, r = 5%, n = 20. Coast number ≈ $1,500,000 ÷ (1.05)^20 ≈ $565,000. With roughly that amount invested today (under those assumptions), the model says growth alone could finish the job by traditional retirement age.",
      },
      {
        type: "h2",
        content: "Example B — shorter runway",
      },
      {
        type: "p",
        content:
          "Same $1,500,000 target and 5% real return, but only 10 years left: coast ≈ $1,500,000 ÷ (1.05)^10 ≈ $921,000. Less time means less help from compounding, so you need more capital today.",
      },
      {
        type: "h2",
        content: "Stress-test the return",
      },
      {
        type: "p",
        content:
          "At 4% real over 20 years, coast ≈ $1,500,000 ÷ (1.04)^20 ≈ $684,000. Lower assumed growth raises the coast number. When in doubt, use a more conservative r rather than a heroic one.",
      },
      {
        type: "h2",
        content: "What Coast FIRE is not",
      },
      {
        type: "ul",
        content: [
          "Not early retirement by itself",
          "Not a substitute for an emergency fund or healthcare plan",
          "Not a guarantee of constant real returns",
        ],
      },
      {
        type: "p",
        content:
          "Run your own numbers in the Coast FIRE calculator, compare with full FIRE and Barista FIRE, and read the Methodology page for model details.",
      },
    ],
  },
  {
    slug: "barista-fire-number-formula-examples",
    title: "Barista FIRE number: formula and examples",
    description:
      "How part-time income shrinks the portfolio you need — with clear semi-retirement math and examples.",
    date: "2026-07-11",
    readingMinutes: 6,
    tags: ["barista-fire", "semi-retirement"],
    body: [
      {
        type: "p",
        content:
          "Barista FIRE (semi-retirement) means intentional work income covers part of your spending so your portfolio only funds the gap. The barista number is usually smaller than full FIRE — if the work income is realistic.",
      },
      {
        type: "h2",
        content: "The formula",
      },
      {
        type: "p",
        content:
          "Gap expenses = max(0, annual spending − work income). Barista number = gap expenses ÷ withdrawal rate. At 4%, that is gap × 25.",
      },
      {
        type: "h2",
        content: "Example — $20k part-time income",
      },
      {
        type: "p",
        content:
          "Spend $60,000, earn $20,000 part-time, use 4% SWR. Gap = $40,000. Barista number = $40,000 ÷ 0.04 = $1,000,000. Full FIRE at the same spend would be $1,500,000 — a $500,000 difference.",
      },
      {
        type: "h2",
        content: "Example — lower SWR",
      },
      {
        type: "p",
        content:
          "Same $40,000 gap at 3.5% SWR: barista number ≈ $1,143,000. More conservative withdrawals still need a larger portfolio even when work income helps.",
      },
      {
        type: "h2",
        content: "Practical caveats",
      },
      {
        type: "ul",
        content: [
          "Income can be uneven; plan for dry spells.",
          "Benefits cliffs (healthcare, employer perks) can change the math overnight.",
          "Self-employment taxes and expenses reduce “take-home” work income.",
          "Spending sometimes rises when you have more free time.",
        ],
      },
      {
        type: "p",
        content:
          "Use the Barista FIRE calculator to dial income and spending, then compare Coast FIRE if your question is about stopping contributions rather than partial work in retirement.",
      },
    ],
  },
  {
    slug: "barista-fire-and-semi-retirement",
    title: "Barista FIRE and semi-retirement",
    description:
      "How part-time income changes the portfolio you need — and what the model leaves out.",
    date: "2026-07-10",
    readingMinutes: 5,
    tags: ["barista-fire", "semi-retirement"],
    body: [
      {
        type: "p",
        content:
          "Barista FIRE (sometimes called semi-retirement) blends portfolio withdrawals with intentional work income. The portfolio only needs to cover the spending gap: max(0, expenses − work income) ÷ withdrawal rate.",
      },
      {
        type: "h2",
        content: "Why people choose it",
      },
      {
        type: "ul",
        content: [
          "Lower savings target than full FIRE.",
          "Structure, community, or health benefits from light work.",
          "Bridge years before Social Security or Medicare eligibility.",
        ],
      },
      {
        type: "h2",
        content: "Model limitations",
      },
      {
        type: "p",
        content:
          "Simple calculators do not capture job reliability, benefit cliffs, self-employment taxes, or how spending changes when you have more free time. Treat Barista FIRE numbers as a planning conversation starter, not a paycheck replacement plan.",
      },
      {
        type: "p",
        content:
          "Try the free Barista FIRE calculator at /calculators/barista-fire, then compare with full FIRE and Coast FIRE on RetireFire.",
      },
    ],
  },
  {
    slug: "coast-fire-explained",
    title: "Coast FIRE explained",
    description:
      "Why “coasting” is about stopping aggressive saving — not retiring tomorrow.",
    date: "2026-07-05",
    readingMinutes: 6,
    tags: ["coast-fire", "basics"],
    body: [
      {
        type: "p",
        content:
          "Coast FIRE answers a different question than classic FIRE. Instead of “Can I quit forever today?”, it asks: “Do I already have enough invested that compound growth can reach my full FIRE number by a traditional retirement age — even if I never invest another dollar?”",
      },
      {
        type: "h2",
        content: "The discount formula",
      },
      {
        type: "p",
        content:
          "If full FIRE is T, real return is r, and years until traditional retirement is n, then coast number ≈ T ÷ (1+r)^n. The longer the runway and the higher the assumed return, the smaller the nest egg you need today.",
      },
      {
        type: "h2",
        content: "What Coast FIRE is not",
      },
      {
        type: "ul",
        content: [
          "Not permission to ignore healthcare or emergency funds.",
          "Not a guarantee markets will deliver a constant real return.",
          "Not early retirement — many “coasters” still work for lifestyle, purpose, or benefits.",
        ],
      },
      {
        type: "p",
        content:
          "Use the Coast FIRE calculator at /calculators/coast-fire to compare shortfall vs surplus under conservative returns. When in doubt, lower r and extend your horizon.",
      },
    ],
  },
  {
    slug: "what-is-a-fire-number",
    title: "What is a FIRE number?",
    description:
      "A plain-English guide to the portfolio multiple that underpins Lean, Regular, and Fat FIRE.",
    date: "2026-07-01",
    readingMinutes: 5,
    tags: ["basics", "fire-number"],
    body: [
      {
        type: "p",
        content:
          "Your FIRE number is the size of the invested portfolio that can support a chosen lifestyle without relying on a traditional paycheck. The classic starting formula is simple: annual spending divided by a safe withdrawal rate.",
      },
      {
        type: "h2",
        content: "The 25× rule of thumb",
      },
      {
        type: "p",
        content:
          "At a 4% withdrawal rate, you need 25 times annual spending (because 1 ÷ 0.04 = 25). Spending $60,000 per year implies a $1.5 million FIRE number. Lower withdrawal rates (3–3.5%) mean larger multiples and more buffer for long early-retirement horizons.",
      },
      {
        type: "h2",
        content: "Lean, Regular, and Fat",
      },
      {
        type: "ul",
        content: [
          "Lean FIRE: lower spending target; frugal but intentional lifestyle.",
          "Regular FIRE: middle-class comfort in retirement spending.",
          "Fat FIRE: higher discretionary spending — travel, housing, hobbies.",
        ],
      },
      {
        type: "p",
        content:
          "These labels are not academic categories. Use them as presets, then replace them with your actual budget. Taxes, healthcare, and housing choices matter more than the nickname.",
      },
      {
        type: "p",
        content:
          "Try the free FIRE Number calculator at /calculators/fire-number, then stress-test withdrawal rates on the Methodology page and the SWR guide on this blog.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}
