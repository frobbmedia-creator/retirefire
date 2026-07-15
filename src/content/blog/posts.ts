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
    slug: "barista-fire-healthcare-benefits-cliffs",
    title: "Barista FIRE healthcare & benefits cliffs (education)",
    description:
      "How employer hours, insurance eligibility, and benefit cliffs can dominate Barista FIRE math — what simple portfolio gap calculators omit, and a practical planning checklist.",
    date: "2026-07-19",
    readingMinutes: 11,
    tags: ["barista-fire", "semi-retirement", "basics"],
    body: [
      {
        type: "p",
        content:
          "Barista FIRE math is seductively clean: portfolio only needs to cover the gap between spending and part-time income. In real households, healthcare and benefits often dwarf that gap. A “cheap” semi-retirement that loses affordable coverage can be more expensive than full FIRE with a larger pile. This guide is educational framing for the cliffs calculators deliberately omit — not tax, legal, or benefits advice.",
      },
      {
        type: "h2",
        content: "What Barista FIRE calculators measure",
      },
      {
        type: "ul",
        content: [
          "Gap spending = max(0, annual expenses − part-time / work income).",
          "Barista number ≈ gap ÷ withdrawal rate (same SWR dial as full FIRE).",
          "They usually ignore premiums, subsidies, payroll taxes, job reliability, and hour thresholds.",
          "They assume work income is a flat annuity. Real gigs are lumpy.",
        ],
      },
      {
        type: "h2",
        content: "The major cliff categories (conceptual)",
      },
      {
        type: "ul",
        content: [
          "Hours eligibility: many employer medical plans require a minimum hours threshold. Dropping below it can mean full retail premiums or marketplace plans.",
          "Household income tests: some subsidies and program eligibility phase out as modified income rises — more work can raise coverage cost nonlinearly.",
          "Age gates: Medicare-era coverage (when eligible) changes the bridge problem; early semi-retirement often means decades before that.",
          "Family structure: partner coverage, dependents, and COBRA-style bridges (time-limited, often expensive) change the math year by year.",
          "Tax treatment of premiums and HSA eligibility can differ by plan type and employment status — model outside the simple gap formula.",
        ],
      },
      {
        type: "h2",
        content: "Why “just earn $25k part-time” is incomplete",
      },
      {
        type: "p",
        content:
          "Suppose spending is $60k and part-time pay is $25k. Gap = $35k. At 4% SWR, barista portfolio ≈ $875k vs full FIRE $1.5M — a big reduction on paper. If leaving full-time work raises healthcare costs by $12k/year, true gap becomes $47k and barista number ≈ $1.175M. If a partner’s plan covers you only while they stay employed, the plan is contingent on their job. The calculator’s gap is not wrong; the spending input was incomplete.",
      },
      {
        type: "h2",
        content: "A practical workflow (still not advice)",
      },
      {
        type: "ul",
        content: [
          "1. Write full lifestyle spending including a realistic healthcare line (premiums + out-of-pocket estimate), not “medical = $0 because employer paid it.”",
          "2. Run Barista FIRE at that all-in spend and your expected work income.",
          "3. Re-run with healthcare +20–50% (premium shock) and with work income −25% (hours cut / dry spell).",
          "4. Compare to full FIRE and Coast: sometimes Coast + continued benefits job is safer than thin Barista + expensive coverage.",
          "5. Use Scenario compare to pin “full-time benefits job” vs “semi-retirement + marketplace-style costs.”",
          "6. Stress SWR (3.5% / 3%) — semi-retirement often still has multi-decade portfolio risk.",
        ],
      },
      {
        type: "h2",
        content: "Benefits that are not only health insurance",
      },
      {
        type: "ul",
        content: [
          "Employer match / stock purchase — walking away can be a high opportunity cost even if you “have enough.”",
          "Disability and life insurance through work — replacing privately can be expensive or underwritten.",
          "Paid leave, training, and network effects — hard to price, easy to miss until gone.",
          "Visa / professional licensing requirements — career-specific constraints calculators never see.",
        ],
      },
      {
        type: "h2",
        content: "Integrity rules for Barista planning",
      },
      {
        type: "ul",
        content: [
          "Never treat part-time income as risk-free forever.",
          "Model coverage separately from portfolio gap for at least two ages (now and 5–10 years out).",
          "If the plan only works with a perfect cheap insurance outcome, it is fragile.",
          "RetireFire will not invent fake precision about your country’s subsidy schedule — you must bring real quotes.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Is Barista always cheaper than full FIRE? Portfolio target yes; total life cost including benefits maybe not.",
          "Should I count employer healthcare as “income”? Better: put true total spend (with premiums) in expenses and leave pay as cash income.",
          "Does stress test cover healthcare cliffs? No — Monte Carlo is market path risk, not benefits policy.",
        ],
      },
      {
        type: "p",
        content:
          "Run numbers in the Barista FIRE calculator, compare Coast vs Barista guides, and read Approach for what models omit. Rules and programs change by jurisdiction and year — verify with official sources or a licensed professional. Educational only — not financial, tax, or insurance advice.",
      },
    ],
  },
  {
    slug: "lean-regular-fat-fire-numbers-2026",
    title: "Lean vs Regular vs Fat FIRE numbers (2026)",
    description:
      "Transparent 2026 FIRE number tables for Lean, Regular, and Fat spending presets at 3%, 3.5%, and 4% withdrawal rates — plus Coast and Barista sketches and stress context.",
    date: "2026-07-19",
    readingMinutes: 10,
    tags: ["fire-number", "2026", "basics"],
    body: [
      {
        type: "p",
        content:
          "Lean, Regular, and Fat FIRE are community labels for lifestyle spending bands — not research standards and not moral ranks. In 2026 they remain useful as transparent presets: pick a spending level, divide by a withdrawal rate, and you have a starting FIRE number. Below uses RetireFire’s published example presets ($40k / $60k / $100k annual spend) so you can re-run every cell yourself.",
      },
      {
        type: "h2",
        content: "Presets (illustrative USD spending)",
      },
      {
        type: "ul",
        content: [
          "Lean FIRE example: $40,000/year lifestyle spend.",
          "Regular FIRE example: $60,000/year.",
          "Fat FIRE example: $100,000/year.",
          "Your real number is your budget, not the label. Housing, healthcare, and family can move you across bands overnight.",
        ],
      },
      {
        type: "h2",
        content: "FIRE number table (spending ÷ SWR)",
      },
      {
        type: "ul",
        content: [
          "Lean $40k: 4% → $1.0M · 3.5% → ≈ $1.14M · 3% → ≈ $1.33M",
          "Regular $60k: 4% → $1.5M · 3.5% → ≈ $1.71M · 3% → $2.0M",
          "Fat $100k: 4% → $2.5M · 3.5% → ≈ $2.86M · 3% → ≈ $3.33M",
        ],
      },
      {
        type: "p",
        content:
          "Moving from 4% to 3% raises the target by one-third for the same lifestyle. That is the core trade-off: lower planned withdrawal rate means more accumulation (or lower spending), and often more buffer for long early-retirement horizons.",
      },
      {
        type: "h2",
        content: "Coast sketch (constant-return illustration)",
      },
      {
        type: "p",
        content:
          "Coast ≈ full FIRE ÷ (1+r)^n. Example: Regular $1.5M full FIRE, n = 25 years to traditional retirement age, r = 5% real → coast ≈ $443k. At 4% real → coast ≈ $563k. Lean and Fat scale linearly with full FIRE. Use the Coast calculator age table and free stress test; do not treat a single coast number as a green light.",
      },
      {
        type: "h2",
        content: "Barista sketch (gap only)",
      },
      {
        type: "p",
        content:
          "If Regular spend is $60k and part-time income is $25k, gap = $35k. At 4% → barista pile ≈ $875k; at 3.5% → ≈ $1.0M. Healthcare cliffs can erase the “savings” versus full FIRE — see the Barista healthcare guide. Labels still apply: Lean Barista vs Fat Barista is still about total lifestyle spend, not virtue.",
      },
      {
        type: "h2",
        content: "2026 planning context (no hype)",
      },
      {
        type: "ul",
        content: [
          "Inflation and local housing mean $60k “Regular” is not the same lifestyle in every city.",
          "Taxes, fees, and account types are outside these pre-tax illustrations.",
          "Long horizons still argue for SWR sensitivity and sequence awareness.",
          "RetireFire defaults (example): 4% SWR starting point, 5% real return — change them; they are not forecasts.",
        ],
      },
      {
        type: "h2",
        content: "How to use the calculators",
      },
      {
        type: "ul",
        content: [
          "FIRE Number: set spend + SWR; try Lean/Regular/Fat style hints if offered.",
          "Years to FIRE: see which lever (spend vs save) closes your band faster.",
          "Coast / Barista: answer different questions with the same shared assumptions.",
          "Scenario compare: pin Regular 4% vs Fat 3.5% side by side.",
          "Export CSV / share URL so labels stay attached to numbers, not vibes.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Is Fat FIRE “better”? Only if it matches your values and funding path — it is a spending choice.",
          "Can I be Lean FIRE in a HCOL city? Maybe with roommates/geo arbitrage; the label does not override rent.",
          "Should I plan Fat spend at Lean SWR? That is a large pile; run ranges honestly rather than marketing a number.",
        ],
      },
      {
        type: "p",
        content:
          "Educational tables only — not financial advice and not a claim that these spends fit you in 2026. Start at the FIRE Number calculator; read Methodology and the disclaimer.",
      },
    ],
  },
  {
    slug: "how-to-stress-test-coast-fire-number",
    title: "How to stress-test your Coast FIRE number (practical guide)",
    description:
      "Step-by-step: deterministic Coast math first, then lower return/SWR sensitivity, free Monte Carlo ranges, and a go/no-go checklist before you change savings.",
    date: "2026-07-18",
    readingMinutes: 12,
    tags: ["coast-fire", "stress-test", "sequence-risk"],
    body: [
      {
        type: "p",
        content:
          "Hitting a Coast FIRE number on a smooth-return calculator feels decisive. It should not be. Coast math answers: “If returns equal my assumed real rate every year until traditional retirement age, is my pile large enough that contributions can drop?” Sequence risk, lower returns, and life plumbing can still make that “yes” fragile. This guide is a practical stress-test workflow you can run in an afternoon.",
      },
      {
        type: "h2",
        content: "What you are testing (and what you are not)",
      },
      {
        type: "ul",
        content: [
          "You are testing whether a coast decision looks robust under worse assumptions and path noise.",
          "You are not proving you can retire early, quit healthcare planning, or ignore taxes.",
          "Success rates from a toy Monte Carlo are model outputs under stated rules — not the probability your life works out.",
          "Coast ≠ Barista. If part-time income covers a spending gap, use Barista math separately.",
        ],
      },
      {
        type: "h2",
        content: "Step 1 — Write the deterministic baseline",
      },
      {
        type: "p",
        content:
          "Open the Coast FIRE calculator. Set annual spending, withdrawal rate, current age, traditional retirement age, current portfolio, and real return. Write down: full FIRE = spending ÷ SWR; coast ≈ FIRE ÷ (1+r)^n with n = retirement age − current age; shortfall or surplus vs portfolio today. Export CSV or copy the share link so the baseline is recoverable.",
      },
      {
        type: "h2",
        content: "Step 2 — Sensitivity before simulation",
      },
      {
        type: "ul",
        content: [
          "Drop real return by ~1 percentage point (e.g. 5% → 4%). Recompute coast.",
          "Drop SWR (e.g. 4% → 3.5% or 3%). Full FIRE and coast both rise.",
          "Raise spending 10% (lifestyle creep or healthcare realism). Recompute.",
          "Use Scenario compare: pin baseline A, change one lever at a time as B.",
          "If surplus disappears under two mild stresses, treat “already coasting” as soft, not permanent.",
        ],
      },
      {
        type: "h2",
        content: "Step 3 — Free sequence stress test (Coast tool)",
      },
      {
        type: "p",
        content:
          "On Coast FIRE, open the stress-test panel. It runs 1,000 paths with the same mean real return and a chosen volatility (12% / 15% / 18% presets), contributions = 0, target = full FIRE, seed 42 for reproducibility. Read: success rate (paths with terminal ≥ full FIRE), p10 / median / p90 terminals, sample paths, and the histogram. Prefer interpreting the band of outcomes over a single green success percentage.",
      },
      {
        type: "h2",
        content: "Step 4 — How to read the results without false precision",
      },
      {
        type: "ul",
        content: [
          "High success + p10 still near target → model says more cushion under this toy path model.",
          "OK median but weak p10 → order risk bites; keep savings, lower spending target, or delay the coast decision.",
          "Changing σ from 12% to 18% swings results a lot → your conclusion depends on volatility assumptions; say so out loud.",
          "Never treat 1,000 i.i.d. annual shocks as historical truth. See Monte Carlo vs historical cycles for the other family of tools.",
        ],
      },
      {
        type: "h2",
        content: "Worked sketch (illustrative only)",
      },
      {
        type: "p",
        content:
          "Spending $60k, SWR 4% → FIRE $1.5M. Age 40 → 65 (25 years), r = 5% real → coast ≈ $443k. Portfolio $500k: constant-return model says past coast. Sensitivity at 4% real and 3.5% SWR can erase that surplus. A free stress test may still show a non-trivial share of paths finishing under $1.5M if σ is high and the horizon is long. Decision: maybe reduce contributions gradually, keep emergency funds, re-run yearly — not “markets are guaranteed.”",
      },
      {
        type: "h2",
        content: "Step 5 — Life gates outside the formula",
      },
      {
        type: "ul",
        content: [
          "Healthcare plan for remaining working years and any gap years.",
          "Emergency fund separate from the invested coast pile.",
          "High-interest debt and near-term cash needs named, not assumed away.",
          "Rule against lifestyle creep silently raising full FIRE after you “coast.”",
          "Partner / co-planner saw the same share link or CSV.",
        ],
      },
      {
        type: "h2",
        content: "Go / no-go hygiene",
      },
      {
        type: "ul",
        content: [
          "Go (cautious): surplus under base + mild stresses; stress-test tails acceptable to you; life gates green.",
          "Hold: base case coasts but stress cases do not — keep contributing a floor amount.",
          "No-go: base case only works at optimistic r and SWR — do not change savings on that alone.",
          "Use the free Coast assumptions checklist as a pre-flight.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Is a 90% success rate “safe”? It is 90% of simulated paths under this model definition — not a warranty.",
          "Should I coast if stress test is “ugly” but constant return is green? Prefer ranges; often keep a savings floor.",
          "Does stress test replace historical tools? No — it is complementary and simpler. Use both families when stakes are high.",
          "Taxes? Not in the model. Effective after-tax plans can need a larger pile.",
        ],
      },
      {
        type: "p",
        content:
          "Run the workflow on the Coast FIRE calculator, read Methodology for formulas, Approach for what stays free, and the sequence-risk guide for path concepts. Educational only — not financial, tax, or investment advice.",
      },
    ],
  },
  {
    slug: "years-to-fire-which-lever-moves-the-needle",
    title: "Years to FIRE: which lever moves the needle most?",
    description:
      "Savings rate, spending, returns, and withdrawal rate ranked by impact on years-to-FIRE — with worked examples, sensitivity tips, and how to stress-test the timeline.",
    date: "2026-07-18",
    readingMinutes: 11,
    tags: ["years-to-fire", "fire-number", "basics"],
    body: [
      {
        type: "p",
        content:
          "Years-to-FIRE calculators solve a compound-growth question: given portfolio, annual savings, spending, real return, and a withdrawal rate that sets the FIRE target, how long until portfolio ≥ spending ÷ SWR? People often obsess over return assumptions. For most mid-journey plans, the levers that move the timeline hardest are closer to your paycheck and lifestyle.",
      },
      {
        type: "h2",
        content: "The levers (ranked for typical workers)",
      },
      {
        type: "ul",
        content: [
          "1. Annual spending (sets FIRE number and how much you can save).",
          "2. Annual savings / savings rate (direct fuel into the portfolio).",
          "3. Withdrawal rate choice (changes the finish line more than people admit).",
          "4. Starting portfolio (big if you already have a large pile; less if early).",
          "5. Assumed real return (matters, but is the least controllable and easiest to overfit).",
        ],
      },
      {
        type: "h2",
        content: "Why spending punches twice",
      },
      {
        type: "p",
        content:
          "Lower spending shrinks full FIRE (spending ÷ SWR) and usually raises how much you can save. That double effect is why “earn more and spend it all” often fails to shorten the timeline as much as a durable spending cut. Raising income only helps years-to-FIRE if the margin becomes invested capital, not lifestyle.",
      },
      {
        type: "h2",
        content: "Worked comparison (illustrative)",
      },
      {
        type: "p",
        content:
          "Start: portfolio $200k, spending $70k, save $30k/year, r = 5% real, SWR 4% → FIRE = $1.75M. Timeline is multi-decade. Case A: cut spending to $60k (FIRE $1.5M) and save $40k — timeline drops sharply. Case B: keep $70k spend, “optimize” return assumption to 7% real — chart looks better, but you did not control markets. Case C: keep spend and save, drop SWR to 3.5% (FIRE ≈ $2.0M) — finish line moves out. Use the Years calculator and Scenario compare to pin A and toggle one input at a time.",
      },
      {
        type: "h2",
        content: "Savings rate vs return (intuition)",
      },
      {
        type: "ul",
        content: [
          "Early years: contributions dominate terminal wealth; return noise matters less than consistent savings.",
          "Late years: portfolio size is large; return and sequence risk dominate residual years.",
          "If you are early, prioritize savings rate and career capital; if late, prioritize sequence cushions and SWR honesty.",
        ],
      },
      {
        type: "h2",
        content: "Withdrawal rate is a finish-line lever",
      },
      {
        type: "p",
        content:
          "Planning at 4% vs 3.5% is a 14% larger pile for the same spending. That is not a free “efficiency tip” — it is a risk preference about long horizons and flexible spending. Early retirees often stress lower rates or flexible rules. See the safe withdrawal rate guide for 3% / 3.5% / 4% framing.",
      },
      {
        type: "h2",
        content: "How to use RetireFire for lever analysis",
      },
      {
        type: "ul",
        content: [
          "Years to FIRE calculator: baseline timeline under shared assumptions.",
          "Sensitivity chips (± return / SWR style controls where available): instant “what if.”",
          "Scenario A/B: pin current plan, change savings or spending, read Δ years.",
          "Stress test on Years: keep contributions, target = FIRE number — see path dispersion around the deterministic date.",
          "CSV export / share URL: keep honest records of which lever you claimed moved the plan.",
        ],
      },
      {
        type: "h2",
        content: "Common mistakes",
      },
      {
        type: "ul",
        content: [
          "Raising assumed returns until the chart hits a preferred year.",
          "Ignoring that higher spending raises FIRE and lowers savings simultaneously.",
          "Treating a single years estimate as a calendar appointment.",
          "Forgetting taxes, fees, and healthcare — all of which can add years in real life.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Is maximizing savings rate always best? Not if it burns you out into a higher future spend; durability beats hero months.",
          "Should I wait for market dips to invest? Timing is not a reliable years-to-FIRE lever in these models.",
          "What about side income? Only the saved portion shortens years; Barista changes the question to semi-retirement cash flow.",
        ],
      },
      {
        type: "p",
        content:
          "Open Years to FIRE, pin a baseline in Scenario compare, and stress-test the timeline. Methodology documents formulas; Approach documents limits. Educational only — not advice.",
      },
    ],
  },
  {
    slug: "when-can-you-stop-saving-for-retirement",
    title: "When can you stop saving for retirement?",
    description:
      "Coast FIRE is the clean answer to “when can I stop aggressive retirement saving?” — definitions, formula, decision gates, and why sequence risk still matters after you coast.",
    date: "2026-07-18",
    readingMinutes: 10,
    tags: ["coast-fire", "basics", "fire-number"],
    body: [
      {
        type: "p",
        content:
          "“When can I stop saving for retirement?” is not the same as “when can I retire?” The Coast FIRE framing is usually the right one: you have enough invested that, if it compounds at an assumed real return until a traditional retirement age, it should reach a full FIRE target without further contributions — while you still earn enough to cover current spending.",
      },
      {
        type: "h2",
        content: "Precise definition",
      },
      {
        type: "ul",
        content: [
          "Full FIRE number ≈ annual spending ÷ planned withdrawal rate.",
          "Coast number ≈ full FIRE ÷ (1 + r)^n, n = years until traditional retirement age.",
          "You are “coasting” (under the model) when current portfolio ≥ coast number.",
          "You still need earned income (or other cash flow) for today’s lifestyle unless you are fully FI.",
        ],
      },
      {
        type: "h2",
        content: "What “stop saving” should mean in practice",
      },
      {
        type: "p",
        content:
          "Stopping aggressive retirement contributions is not the same as zero savings forever. Many people keep a floor: emergency fund top-ups, employer match (often still free money), HSA contributions, or a small default investment habit to fight lifestyle creep. “Stop saving” is better phrased as “stop prioritizing max retirement savings over other life goals under these assumptions.”",
      },
      {
        type: "h2",
        content: "Worked example",
      },
      {
        type: "p",
        content:
          "Spend $80k/year, plan 4% SWR → FIRE $2.0M. Age 38, traditional age 65 → n = 27 years. At 5% real, coast ≈ $2.0M / (1.05)^27 ≈ $534k. If you hold $600k invested (and healthcare/debt are handled), the constant-return model says you can reduce retirement contributions. If you hold $400k, you are not there yet — save more, spend less, or accept a later traditional age.",
      },
      {
        type: "h2",
        content: "Decision gates before you cut contributions",
      },
      {
        type: "ul",
        content: [
          "Surplus still exists at a lower real return (e.g. −1 pp) and a stricter SWR.",
          "Sequence stress test tails are acceptable for your risk tolerance (Coast free stress test).",
          "Healthcare and emergency funds are not “inside” the coast pile.",
          "You will not silently raise spending enough to re-inflate full FIRE.",
          "Partner alignment if household finances are shared.",
          "You re-run the numbers on job change, housing, kids, or market regime shifts.",
        ],
      },
      {
        type: "h2",
        content: "Coast vs Barista vs full FI",
      },
      {
        type: "ul",
        content: [
          "Coast: stop (or reduce) retirement contributions; still work for living expenses.",
          "Barista / semi-retirement: portfolio covers part of spend; part-time income covers the rest.",
          "Full FI: portfolio covers spending at your planned withdrawal rate without required work income.",
        ],
      },
      {
        type: "h2",
        content: "Why people regret stopping too early",
      },
      {
        type: "ul",
        content: [
          "Optimistic return or SWR assumptions that reverse under stress.",
          "Lifestyle creep after “I’m coasting” identity.",
          "Healthcare costs and family changes not in the spreadsheet.",
          "Confusing Coast with early retirement and withdrawing too soon.",
        ],
      },
      {
        type: "h2",
        content: "How to answer the question with RetireFire",
      },
      {
        type: "ul",
        content: [
          "Coast FIRE calculator for the number and age table for horizon intuition.",
          "Free stress test for path ranges (not a single green light).",
          "Scenario compare to pin “keep saving” vs “floor only.”",
          "Coast assumptions checklist as pre-flight before you change behavior.",
          "Methodology for formulas; Approach for limits and free-core promise.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Should I always take the employer match after coasting? Often yes — it is usually a high risk-adjusted return — but this is not personalized advice.",
          "Can I coast at 40 with a 50-year horizon? Full FIRE for early withdrawal is a different problem; coast-to-65 is not early retirement math.",
          "Is there one universal age to stop saving? No — only assumptions + pile + spending + gates.",
        ],
      },
      {
        type: "p",
        content:
          "Educational illustration only — not financial, tax, or investment advice. See the disclaimer. Start with the Coast FIRE calculator and the free assumptions checklist.",
      },
    ],
  },
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
    title: "Safe withdrawal rate: 3% vs 3.5% vs 4% (early retirement deep dive)",
    description:
      "SWR for FIRE and early retirees: research lineage of 4%, why 3–3.5% is common for long horizons, worked multiples, flexibility rules, and how to stress-test without false precision.",
    date: "2026-07-14",
    readingMinutes: 12,
    tags: ["swr", "fire-number", "sequence-risk"],
    body: [
      {
        type: "p",
        content:
          "A safe withdrawal rate (SWR) is the percentage of your portfolio you plan to spend in year one of retirement, often adjusted for inflation afterward. Combined with annual spending, it sets your FIRE number: spending ÷ withdrawal rate. For early retirees, that single dial can move the finish line by hundreds of thousands of dollars — and it still does not capture taxes, fees, or sequence risk by itself.",
      },
      {
        type: "h2",
        content: "Where 4% comes from (and what it is not)",
      },
      {
        type: "p",
        content:
          "The classic 4% starting point is associated with William Bengen’s research and the Trinity Study lineage on historical U.S. stock/bond portfolios. It is a research-based rule of thumb for multi-decade retirements under historical market paths — not a warranty that global markets, valuations, or your personal spending will behave the same way for the next 30–50 years. “4% worked in many past U.S. samples” is not the same as “4% is safe for you.”",
      },
      {
        type: "h2",
        content: "Why early retirees often plan at 3–3.5%",
      },
      {
        type: "ul",
        content: [
          "Longer horizon: retiring at 40 can mean 45–55+ years of withdrawals vs a classic 30-year study window.",
          "Sequence-of-returns risk: poor markets early hurt more when you cannot easily return to peak earnings.",
          "Less flexibility if identity and budget are rigid (“I already retired”).",
          "Higher equity concentration and valuation risk than mid-century samples assumed.",
          "Healthcare and family shocks can force higher spending exactly when markets are down.",
        ],
      },
      {
        type: "h2",
        content: "Multiples table (portfolio ÷ annual spending)",
      },
      {
        type: "ul",
        content: [
          "4.0% SWR → 25× spending",
          "3.5% SWR → ≈ 28.6× spending",
          "3.0% SWR → ≈ 33.3× spending",
          "2.5% SWR → 40× spending (very conservative / large buffer illustrations)",
        ],
      },
      {
        type: "h2",
        content: "Worked comparison at $60,000 spending",
      },
      {
        type: "ul",
        content: [
          "4.0% → FIRE number $1,500,000",
          "3.5% → FIRE number about $1,714,000",
          "3.0% → FIRE number $2,000,000",
        ],
      },
      {
        type: "p",
        content:
          "That is a $500,000 spread between 4% and 3% for the same lifestyle. Scale it: at $100k spend (Fat-style preset), the same rates imply $2.5M / ≈ $2.86M / ≈ $3.33M. The “right” rate depends on flexibility to cut spending, other income (Social Security later, pensions, Barista work), asset allocation, and risk tolerance — none of which a single percentage captures perfectly.",
      },
      {
        type: "h2",
        content: "Horizon intuition (not a formula guarantee)",
      },
      {
        type: "ul",
        content: [
          "≈30-year traditional retirement windows: 4% is the common historical starting conversation.",
          "40–50+ year early retirement windows: many planners stress 3–3.5% or flexible spending rules.",
          "Very long horizons with no cut flexibility: lower starting rates or larger cash buffers often appear in stress discussions.",
          "Always re-check with your actual spend — including healthcare — not a blog example.",
        ],
      },
      {
        type: "h2",
        content: "Fixed SWR vs flexible spending (concept)",
      },
      {
        type: "p",
        content:
          "A fixed inflation-adjusted withdrawal is easy to model and hard to live when markets crash. Flexible approaches (cut discretionary spend after bad years, raise after good years, guardrails) can improve sustainability in research discussions — but they require behavior you will actually execute. Calculators that only show a constant SWR hide that behavioral requirement.",
      },
      {
        type: "h2",
        content: "What SWR does not include",
      },
      {
        type: "ul",
        content: [
          "Taxes and account withdrawal ordering",
          "Investment fees and advisory costs",
          "Sequence risk explicitly (use stress tests / historical tools)",
          "Healthcare cliffs and long-term care",
          "Legacy goals or large one-time expenses",
        ],
      },
      {
        type: "h2",
        content: "How to use SWR in RetireFire",
      },
      {
        type: "ul",
        content: [
          "Treat SWR as a dial: run FIRE number at 3%, 3.5%, and 4% every time.",
          "If only the optimistic case “works,” the plan is fragile — say so.",
          "Pair with Years to FIRE (finish line moves when SWR drops).",
          "Coast and Barista inherit the same SWR via shared assumptions — keep them consistent.",
          "Sensitivity chips and Scenario compare make A/B honest.",
          "Accumulation stress tests (Coast/Years) are not full retirement withdrawal backtests; read Monte Carlo vs historical cycles.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Is 4% dead? No — it remains a historical reference. It is not a personal guarantee.",
          "Is 3% always safer? It buys more buffer for the same spend, at the cost of more capital or lower lifestyle.",
          "Should I change SWR every year? Planning rate vs actual annual spend decision can differ; this site models the planning dial.",
        ],
      },
      {
        type: "p",
        content:
          "Educational illustration only — not financial advice. See Methodology for formula notes, the sequence-risk guide for path concepts, Lean/Regular/Fat tables for 2026 presets, and the disclaimer before decisions.",
      },
    ],
  },
  {
    slug: "how-many-years-until-fire",
    title: "How many years until FIRE?",
    description:
      "The levers that move your timeline to financial independence: savings rate, spending, portfolio, and return assumptions — plus links to deeper lever analysis and stress tests.",
    date: "2026-07-13",
    readingMinutes: 8,
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
          "Raising savings often does double duty: more money invested each year and, if spending falls, a lower FIRE number. Assuming a higher return shortens the timeline on a spreadsheet but does not put cash in your brokerage account. Conservative planners stress-test lower returns rather than banking on bull markets. For a ranked lever deep-dive with Scenario compare workflow, see “Years to FIRE: which lever moves the needle most?”",
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
          "Use the free Years to FIRE calculator for an interactive timeline, Scenario compare to pin lever experiments, and the free stress test on Years for path dispersion around a smooth date. Cross-check the target with the FIRE Number tool and Methodology notes. Educational only.",
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
