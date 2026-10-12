import type { BlogPost } from "./posts";

/** Pillar guides: kept in a separate file so posts.ts stays lean. */
export const PILLAR_POSTS: BlogPost[] = [
  {
    slug: "the-complete-coast-fire-guide",
    title: "The Complete Coast FIRE Guide: the math, the mistakes, and whether you're already there",
    description:
      "The definitive Coast FIRE guide: the discount formula, worked examples at every age, return sensitivity, Coast vs Barista vs full FIRE, the five biggest mistakes, and FAQ.",
    date: "2026-10-11",
    readingMinutes: 15,
    tags: ["coast-fire", "basics"],
    sources: [
      {
        label: "RetireFire methodology",
        href: "/methodology",
      },
    ],
    body: [
      {
        type: "p",
        content:
          "Coast FIRE is the least dramatic and most useful idea in the FIRE movement. It does not ask you to quit your job, move somewhere cheap, or live on rice and beans. It asks one question: do you already have enough invested that compound growth can carry you to a full retirement number by a traditional retirement age — even if you never save another dollar?",
      },
      {
        type: "p",
        content:
          "If the answer is yes, you have permission to stop sprinting. You still work. You still cover your bills. But the aggressive accumulation phase — the 40-to-60% savings-rate grind — can end. That is what “coasting” means: your portfolio does the heavy lifting from here, and your paycheck only has to cover your life.",
      },
      {
        type: "p",
        content:
          "This guide is the full treatment: the formula, worked numbers at every age, why the return assumption matters more than everything else combined, how Coast differs from Barista and full FIRE, the five mistakes that wreck Coast plans, and a checklist for deciding whether you are already there. Every example is illustrative — run your own numbers in the Coast FIRE calculator before changing your savings behavior.",
      },
      {
        type: "h2",
        content: "The one formula that matters",
      },
      {
        type: "p",
        content:
          "If your full FIRE target is T, your assumed real (after-inflation) return is r, and the years until a traditional retirement age is n, then your Coast number ≈ T ÷ (1+r)^n. The formula discounts your future target back to today, the same way a bond is priced: money you will have later is worth less than money you have now, and compounding bridges the gap.",
      },
      {
        type: "p",
        content:
          "Each input deserves a sentence. T is annual spending divided by a withdrawal rate: $60,000 of yearly spending at a 4% withdrawal rate means T = $1,500,000. The r is the real return — after inflation, not the number on your brokerage statement. A portfolio earning 8% nominal in a 3% inflation world is earning roughly 5% real, and it is the real number that belongs in the formula. The n is your runway: 65 minus your current age, if 65 is your target retirement age.",
      },
      {
        type: "p",
        content:
          "The shape of the formula is the whole insight. A longer runway or a higher assumed return shrinks the number you need today — exponentially, not linearly. That is why Coast FIRE is a young person's superpower and a 55-year-old's modest discount.",
      },
      {
        type: "h2",
        content: "Worked examples at every age",
      },
      {
        type: "p",
        content:
          "Take $60,000 of annual spending and a 4% withdrawal rate, so the full FIRE target is $1,500,000. Assume 5% real returns and a traditional retirement age of 65:",
      },
      {
        type: "ul",
        content: [
          "Age 25 (40-year runway): $1,500,000 ÷ 1.05^40 ≈ $213,000. A 25-year-old with $213,000 invested may never need to save for retirement again — if the assumptions hold.",
          "Age 35 (30-year runway): $1,500,000 ÷ 1.05^30 ≈ $347,000.",
          "Age 45 (20-year runway): $1,500,000 ÷ 1.05^20 ≈ $565,000.",
          "Age 55 (10-year runway): $1,500,000 ÷ 1.05^10 ≈ $921,000.",
        ],
      },
      {
        type: "p",
        content:
          "Read the table in reverse, too. A 35-year-old with $500,000 already invested is past the Coast number: $500,000 compounding for 30 years at 5% real grows to about $2,160,000, comfortably above the $1.5M target. A 35-year-old with $200,000 is not coasting yet — but that $200,000 still grows to roughly $864,000 over 30 years at 5% real, which means more than half the target is already handled with zero future contributions.",
      },
      {
        type: "p",
        content:
          "Notice what the table does not say. It does not say you can retire. Every one of these examples assumes you keep working and covering all of your spending — housing, food, healthcare, everything — until 65. The portfolio is growing untouched in the background. Coast FIRE funds your 65-year-old self, not your 40-year-old self.",
      },
      {
        type: "h2",
        content: "The return assumption is the whole game",
      },
      {
        type: "p",
        content:
          "The formula is simple. The input is not. Because the return is raised to the power of your runway, small changes in r move the Coast number enormously. Same $1.5M target, same 30-year runway, different real returns:",
      },
      {
        type: "ul",
        content: [
          "3% real → Coast number ≈ $618,000",
          "4% real → Coast number ≈ $462,000",
          "5% real → Coast number ≈ $347,000",
          "6% real → Coast number ≈ $261,000",
          "7% real → Coast number ≈ $197,000",
        ],
      },
      {
        type: "p",
        content:
          "The cautious 3% case demands more than three times the portfolio of the optimistic 7% case. Anyone who shows you a Coast number without showing you this sensitivity is selling certainty they do not have. The honest rule: run your number at 3% and 4% real before you change your savings behavior. If you are only “coasting” at 7% real, you are not coasting — you are hoping.",
      },
      {
        type: "p",
        content:
          "There is a second, subtler trap inside r: sequence risk applies to the growth phase, not just the withdrawal phase. The formula assumes a smooth 5% every year. Real markets deliver 5% average as a lumpy mix of great decades and lost decades. A bad decade early in your coast hurts far more than a bad decade late, because early losses compound against you for longer. That is why the Coast FIRE calculator's sequence stress test exists — use it to see ranges, not just a single number.",
      },
      {
        type: "h2",
        content: "What a lost decade does to a Coast plan",
      },
      {
        type: "p",
        content:
          "Here is the lost decade made concrete. You are 35 with $347,000 — exactly your Coast number for a $1.5M target at 5% real over 30 years. The math checks: $347,000 compounding at 5% real for 30 years becomes $1,500,000 on the nose. Now suppose the first ten years deliver 0% real — a genuine lost decade, the kind markets have delivered before. Your $347,000 is still $347,000, but only 20 years remain. To still reach $1.5M, those 20 years must now deliver about 7.6% real every year. That is a heroic assumption stacked on top of a bad decade.",
      },
      {
        type: "p",
        content:
          "Two lessons. First, the Coast number is most fragile exactly when you stop paying attention to it — early, when compounding has the most time left to work for or against you. Second, margin is not optional: this is the mathematical reason for the “coast at 4%, confirm at 3%” rule. A plan that only works if the first decade cooperates is not a plan.",
      },
      {
        type: "h2",
        content: "Coast vs Barista vs full FIRE",
      },
      {
        type: "p",
        content:
          "Three different questions, three different numbers. Mixing them up produces the wrong savings target and the wrong lifestyle story:",
      },
      {
        type: "ul",
        content: [
          "Full FIRE asks: “Can I stop working forever, today?” Number = annual spending ÷ withdrawal rate. $60,000 at 4% → $1,500,000.",
          "Coast FIRE asks: “Can compounding finish the job by 65 with zero future contributions?” Number = full FIRE ÷ (1+r)^n. At 35 with 5% real → ≈ $347,000. You keep working and covering your bills.",
          "Barista FIRE asks: “Can I semi-retire now if part-time work covers part of my spending?” Number = (spending − work income) ÷ withdrawal rate. $60,000 spending with $20,000 of barista income → $40,000 gap ÷ 4% → $1,000,000.",
        ],
      },
      {
        type: "p",
        content:
          "Here is the intuition trap: Coast often produces a much smaller number than Barista, which makes it look like the easier path. It is not easier — it answers a different question. Coast keeps you in full earning years for decades while the portfolio compounds silently. Barista buys lifestyle freedom now, at the price of a bigger portfolio plus the ongoing need for work income. Choose by which question you are actually asking, not by which number is smaller.",
      },
      {
        type: "h2",
        content: "Where the money lives matters",
      },
      {
        type: "p",
        content:
          "The formula treats all dollars as equal. The tax code does not. A $347,000 Coast number split across a 401(k), a Roth IRA, and a taxable brokerage behaves differently than $347,000 all in one pre-tax account — especially since you cannot touch retirement accounts before age 59 1/2 without penalties and exceptions, while the whole point of coasting is leaving the money alone until 65 anyway.",
      },
      {
        type: "p",
        content:
          "For most Coast plans this is a second-order concern, because you are not withdrawing during the coast — you are letting everything compound. But account placement still shapes the landing: pre-tax dollars will be taxed as ordinary income when withdrawn, Roth dollars will not, and the mix determines your tax bill in the retirement the portfolio is funding. When you run your number, run it against invested assets net of the taxes you will eventually owe, not the gross balance that makes you feel rich.",
      },
      {
        type: "h2",
        content: "Mistake 1: treating “coast” as “retired”",
      },
      {
        type: "p",
        content:
          "The most common and most dangerous error. Hitting your Coast number means your 65-year-old self is funded. It does not fund a single year of spending between now and then. If you quit your job at 40 with a Coast number in hand and no income, you will spend the portfolio that was supposed to compound — and the math collapses. Coast FIRE requires covering 100% of your living costs from earnings until traditional retirement age. The day you stop covering your spending is the day you stop coasting.",
      },
      {
        type: "h2",
        content: "Mistake 2: using nominal returns instead of real ones",
      },
      {
        type: "p",
        content:
          "“The market returns 10% historically” is the fastest way to a fantasy Coast number. Ten percent nominal minus three percent inflation is roughly seven percent real — and even that is generous for planning. Plug 7% real into a 30-year runway and your Coast number drops to $197,000 on a $1.5M target, which feels great and means nothing. Use 3–5% real for planning, and make your go/no-go decision at the low end of that range. Optimism is not a contribution.",
      },
      {
        type: "h2",
        content: "Mistake 3: forgetting the paycheck still has three jobs",
      },
      {
        type: "p",
        content:
          "Once you stop saving aggressively, your paycheck must still do three things without fail: cover all spending, carry health insurance, and maintain an emergency fund. Coast plans die most often on the second one. An uninsured health event in your 50s does not just cost money — it raids the compounding portfolio, which is the entire engine of the plan. Before you downshift, price your healthcare explicitly and keep six months of expenses liquid. The Coast number assumes the portfolio is never touched early; your emergency fund is what makes that true.",
      },
      {
        type: "h2",
        content: "Mistake 4: computing the number once and never revisiting it",
      },
      {
        type: "p",
        content:
          "A Coast number is a snapshot, not a tattoo. Markets fall, spending creeps, inflation runs hot, and assumptions age. Recheck annually: update your invested balance, update your spending (use 12 months of actuals, not a budget you wish were true), and rerun the formula at conservative returns. A plan you never revisit is a plan you will discover is broken at the worst possible time. The five-minute annual recheck is the cheapest insurance in personal finance.",
      },
      {
        type: "h2",
        content: "Mistake 5: ignoring what happens if returns disappoint early",
      },
      {
        type: "p",
        content:
          "The formula's smooth compounding hides the real risk: a poor decade in your 30s damages a Coast plan far more than a poor decade in your 50s. Build margin deliberately. One practical rule: only downshift your savings when you coast at 4% real and are still on track at 3% real. That one-percentage-point buffer is the difference between a plan and a prayer. And keep the ability to restart contributions — the best Coast plans are reversible.",
      },
      {
        type: "h2",
        content: "Checklist: are you actually coasting?",
      },
      {
        type: "ul",
        content: [
          "Price your spending from 12 months of actuals, including healthcare, taxes, and the boring stuff. Add 10% if you are guessing.",
          "Set your full FIRE target: annual spending ÷ withdrawal rate. Use 4% as a starting point, 3–3.5% if your horizon is 40-plus years.",
          "Compute your Coast number at 4% real — then again at 3% real. Downshift only if both say yes.",
          "Count invested assets only. Home equity does not compound into retirement spending; neither does your emergency fund.",
          "Confirm your paycheck covers all spending plus healthcare plus an emergency buffer, with no portfolio withdrawals.",
          "Stress-test the growth phase for bad early decades, not just the average.",
          "Recheck every year. Spending, balances, and assumptions all move.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Does Coast FIRE mean I can quit my job? No. It means you can stop saving aggressively. Your earnings must still cover 100% of your spending until traditional retirement age.",
          "What real return should I assume? Plan at 3–4% real and treat 5% as the optimistic case. Equities have delivered more historically, but planning is about the bad decades, not the average one.",
          "What counts toward my Coast number? Invested assets you will not touch: 401(k)s, IRAs, taxable brokerage. Exclude home equity, emergency funds, and anything you plan to spend.",
          "What if I have a pension? A pension that covers part of your retirement spending lowers your full FIRE target T, which lowers your Coast number through the same formula. Price the pension conservatively.",
          "What if the market crashes right after I stop saving? That is the central risk — early bad returns compound against you longest. This is why you keep margin (the 3% test), keep an emergency fund, and keep the ability to restart contributions.",
          "Can I coast, then un-coast? Yes, and you should expect to. Career breaks, windfalls, and market crashes all change the math. Recompute yearly and adjust without drama.",
          "Does Coast FIRE work if I'm starting from zero at 40? The formula does not care about your past — it only prices the runway ahead. At 40 with 25 years to 65 at 5% real, a $1.5M target needs about $443,000 today ($1,500,000 ÷ 1.05^25). Starting from zero, the question becomes how fast you can save that first chunk; the Years to FIRE calculator models exactly that sprint.",
          "Should I count my house? No. Home equity does not compound into retirement spending unless you plan to sell or downsize, and most people do not. Count invested assets you can actually leave alone for decades.",
          "What about kids and college costs? They belong in your spending number, not as a footnote. If college will cost you $100,000 over four years in your 50s, that money is not compounding toward 65 — model it as spending, or fund it from a separate bucket.",
          "How is Coast FIRE different from just saving normally? It isn't, mechanically — that is the point. Coast FIRE is what normal retirement saving looks like once the balance is large enough that compounding outruns contributions. The label matters because it gives you permission to downshift spending on savings deliberately instead of guiltily, and a formula for knowing when that permission is earned.",
          "Can couples coast on one portfolio? Yes, with one adjustment: use household spending for T and the later of the two retirement ages for n. The partner with the longer runway sets the timeline, because the portfolio must last until both of you are done working. Price healthcare for two — it is the budget line that doubles fastest.",
          "When should I not coast? When the paycheck cannot reliably cover spending, when healthcare is unpriced, when the number only works at 6% real or better, or when you would have to raid the portfolio for anything in the next decade. Coast FIRE rewards the already-stable. If life is volatile, keep saving — flexibility beats a label.",
        ],
      },
      {
        type: "h2",
        content: "The bottom line",
      },
      {
        type: "p",
        content:
          "Coast FIRE is permission to stop sprinting, not permission to stop. The math is one division problem; the discipline is everything around it — honest spending, conservative returns, healthcare covered, margin for bad decades, and a yearly recheck. Get those right and compounding does the rest. Run your number in the Coast FIRE calculator, stress-test it, and walk the checklist before you change anything about how you save. Educational only — not financial advice.",
      },
    ],
  },
  {
    slug: "the-complete-barista-fire-guide",
    title: "The Complete Barista FIRE Guide: the gap math, healthcare, and picking work that pays",
    description:
      "The definitive Barista FIRE guide: the spending-gap formula, worked examples, why healthcare is the number-one risk, how to pick barista work, the Coast vs Barista decision framework, and FAQ.",
    date: "2026-10-11",
    readingMinutes: 15,
    tags: ["barista-fire", "semi-retirement"],
    sources: [
      {
        label: "RetireFire methodology",
        href: "/methodology",
      },
    ],
    body: [
      {
        type: "p",
        content:
          "Barista FIRE is the most lifestyle-honest branch of the FIRE family. The name comes from the stereotype — the burned-out corporate worker pulling espresso shots — but the math does not care what the job is. Barista FIRE means your portfolio covers part of your spending and enjoyable part-time work covers the rest. You are semi-retired now, not at 65.",
      },
      {
        type: "p",
        content:
          "That “now” is what separates Barista from every other FIRE flavor. Full FIRE asks whether you can stop forever. Coast FIRE asks whether compounding can finish the job by 65 while you keep earning. Barista FIRE asks whether you can redesign your working life this year — less pay, less stress, more control — with a portfolio that covers the gap. This guide covers the gap math, worked examples, the healthcare problem that sinks most Barista plans, how to pick work that actually works, and a framework for choosing between Barista and Coast.",
      },
      {
        type: "h2",
        content: "The gap formula",
      },
      {
        type: "p",
        content:
          "If annual spending is S, annual work income is W, and your withdrawal rate is w, then your Barista number ≈ (S − W) ÷ w. The portfolio funds only the gap between what you spend and what you earn. Everything else is commentary.",
      },
      {
        type: "p",
        content:
          "Worked examples at $60,000 of annual spending and a 4% withdrawal rate:",
      },
      {
        type: "ul",
        content: [
          "No work income: $60,000 ÷ 4% = $1,500,000. That is just full FIRE — the formula agrees with itself.",
          "$10,000/year of work: $50,000 gap → $1,250,000.",
          "$20,000/year of work: $40,000 gap → $1,000,000.",
          "$30,000/year of work: $30,000 gap → $750,000.",
          "$40,000/year of work: $20,000 gap → $500,000.",
        ],
      },
      {
        type: "p",
        content:
          "Every $10,000 of durable annual work income erases $250,000 from the portfolio target at a 4% withdrawal rate. That is the core trade of Barista FIRE: income for assets. A second example at lower spending: $48,000 of spending with $24,000 of barista income leaves a $24,000 gap, which needs $600,000 at 4%. The formula scales to any lifestyle — price your spending honestly and it prices your freedom.",
      },
      {
        type: "p",
        content:
          "Two things the formula assumes that you should not. First, it assumes the work income is durable — it shows up every year, not just in good ones. Second, it assumes the gap is measured in after-tax spending covered by after-tax income plus portfolio withdrawals. Taxes are not a footnote here; they are addressed below as mistake number two.",
      },
      {
        type: "h2",
        content: "Healthcare is the number-one Barista risk",
      },
      {
        type: "p",
        content:
          "The gap math above has a hole, and it is shaped like a hospital bill. Employer health insurance is the invisible half of most salaries — worth five figures a year and utterly taken for granted until it is gone. Almost every failed Barista plan fails here: the portfolio math worked, the part-time job was pleasant, and then healthcare cost twice what was budgeted.",
      },
      {
        type: "p",
        content:
          "To feel the scale, take an illustrative example. Suppose you estimate $18,000 a year for premiums plus out-of-pocket costs. At a 4% withdrawal rate, that single budget line demands $450,000 of portfolio — nearly half of a $1M Barista target. Healthcare is not a rounding error in Barista FIRE. It is often the largest line item after housing.",
      },
      {
        type: "ul",
        content: [
          "Price it before you quit, not after. Get real marketplace quotes for your state, age, and household — premiums, deductibles, and out-of-pocket maximums all count, because the bad year is the one that matters.",
          "Do not assume part-time work comes with benefits. Most part-time roles do not. A few large employers famously do offer health coverage at part-time hours — the Barista name is not entirely an accident — but verify the specific employer's current policy in writing rather than trusting the stereotype.",
          "COBRA can bridge up to 18 months after leaving a job, but you pay the full premium plus an admin fee. Price it as the expensive temporary bridge it is, not as a solution.",
          "Lower income in semi-retirement can mean premium tax credits on the marketplace, which genuinely helps many Barista households. But subsidy rules and thresholds change — model them conservatively and recheck every year during open enrollment.",
          "Add healthcare inflation to your fear list, not just your budget. Medical costs have historically risen faster than general inflation, which means a healthcare estimate that is merely adequate today is inadequate in ten years.",
        ],
      },
      {
        type: "p",
        content:
          "The rule is simple: no Barista plan is complete without a written healthcare answer covering premiums, deductibles, and the bad year. If you cannot write that paragraph, you are not ready.",
      },
      {
        type: "h2",
        content: "Picking barista work that actually works",
      },
      {
        type: "p",
        content:
          "The job is half the plan, so choose it with the same seriousness as the portfolio. Five criteria:",
      },
      {
        type: "ul",
        content: [
          "It covers the gap reliably. Income that vanishes in a downturn is not covering the gap — it is a hope. Discount variable or gig income heavily, or require a larger portfolio to compensate.",
          "It is genuinely low-stress and at least somewhat enjoyable. Trading a hated 60-hour job for a hated 25-hour job that pays a third as much is not freedom; it is a pay cut with better hours.",
          "The schedule is controllable. The point of Barista FIRE is time sovereignty. Shift work you cannot refuse is just a job.",
          "Benefits are a massive bonus. A part-time role with health coverage can be worth far more than its wage — run the healthcare math above and you will see why.",
          "The plan survives the job ending. Ask what happens if the work income goes to zero for two years. If the answer is “the portfolio gets raided,” either build a bigger buffer or keep a credible re-entry plan to full-time work.",
        ],
      },
      {
        type: "p",
        content:
          "Common choices that fit the criteria: skilled trades on your own schedule, seasonal work, consulting in your old field at a fraction of the hours, and yes, service jobs with good cultures and benefits. The test is never prestige — it is durability, controllability, and whether you would still like it in year five.",
      },
      {
        type: "p",
        content:
          "Three archetypes pass the test most often. The consultant keeps one or two former clients at ten hours a week — high hourly rate, familiar work, total schedule control, but income that can vanish if a client leaves, so the portfolio should be sized for the smaller W. The tradesperson does skilled physical work a few days a week — durable demand, honest pay, real time off, though the body sets the retirement date for the job itself. The benefits worker takes a deliberately unglamorous part-time role at an employer with health coverage — lower wage, but the healthcare answer alone can be worth more than the paycheck, as the math above showed.",
      },
      {
        type: "p",
        content:
          "Before you quit the day job, trial-run the barista job. Take the part-time role while you are still employed full-time — weekends, evenings, a seasonal stint — and measure three things: the actual hourly pay after taxes, whether you still like it in month four, and what it does to your energy for the rest of life. A three-month trial is cheap. Discovering in year two that you hate the work is expensive, because by then the day job is gone and the gap math assumes income you no longer want to earn.",
      },
      {
        type: "h2",
        content: "Coast vs Barista: the decision framework",
      },
      {
        type: "p",
        content:
          "People agonize over this choice, but it collapses into five questions:",
      },
      {
        type: "ul",
        content: [
          "Do you want lifestyle change now or later? Barista buys freedom this year. Coast keeps you in full earning mode for years while compounding works silently.",
          "Which number are you closer to? A $350,000 portfolio at 35 might already coast to $1.5M by 65 — but it does not fund a $40,000 Barista gap. Compare both numbers against what you actually have.",
          "How do you feel about needing work income indefinitely? Barista requires it; the portfolio only covers the gap. Coast requires only that your paycheck covers your bills — the portfolio needs nothing from you.",
          "Do you have a healthcare answer? This is Barista's hardest problem and Coast's easiest, because Coast keeps you employed and insured.",
          "What role should work play? Barista makes work optional-but-present and lifestyle-shaped. Coast keeps work full-sized for years, then stops. Neither is morally superior — they are different lives.",
        ],
      },
      {
        type: "p",
        content:
          "You can also sequence them: coast in your 30s while compounding runs, then Barista in your late 40s or 50s when the portfolio covers a gap and you want your time back. The frameworks are tools, not identities.",
      },
      {
        type: "h2",
        content: "The glide path: Barista today, full FIRE later",
      },
      {
        type: "p",
        content:
          "Barista FIRE is often a phase, not a destination — and the math of the phase is kinder than it looks. Suppose you semi-retire with $750,000 funding a $30,000 annual gap at 5% real returns. Ten years later, the portfolio is not depleted: $750,000 compounding for ten years grows to about $1,222,000, while ten years of $30,000 withdrawals cost about $377,000 in future value. Net: roughly $844,000. The portfolio funded a decade of the gap and still grew.",
      },
      {
        type: "p",
        content:
          "That is the quiet power of the glide path. Every year the gap is covered, the portfolio keeps working underneath. If barista income ever covers the entire gap — a good year, a working spouse, lower spending — the portfolio compounds untouched and the Barista number silently becomes a full FIRE number. Size the portfolio for the gap you have, but recognize that time plus partial coverage can finish the job that full coverage started.",
      },
      {
        type: "h2",
        content: "Mistake 1: counting income that isn't durable",
      },
      {
        type: "p",
        content:
          "The formula treats W as permanent. Real work income is not. Contract work ends, gig platforms change their pay, small businesses have bad years, and your own energy for the job fades. Price W at what you could reliably earn in a mediocre year, not your best one — or equivalently, size the portfolio for a smaller W than you hope for. A Barista plan built on peak income is a full-FIRE plan with extra steps and extra risk.",
      },
      {
        type: "h2",
        content: "Mistake 2: forgetting taxes",
      },
      {
        type: "p",
        content:
          "The gap is after-tax spending; work income is pre-tax. A $20,000 part-time job does not cover a $20,000 spending gap — after income and payroll taxes it covers meaningfully less, and the portfolio must cover the difference. Meanwhile portfolio withdrawals have their own tax character depending on account type. Model the gap in after-tax dollars on both sides, or the formula quietly lies to you by five figures.",
      },
      {
        type: "h2",
        content: "Mistake 3: having no healthcare answer",
      },
      {
        type: "p",
        content:
          "Covered above at length because it deserves it. The one-line version: if your Barista spreadsheet has a precise portfolio number and a blank cell where healthcare goes, the spreadsheet is fiction. Fill that cell first.",
      },
      {
        type: "h2",
        content: "Mistake 4: using 4% on a 50-year horizon with no margin",
      },
      {
        type: "p",
        content:
          "The 4% rule of thumb comes from research on 30-year retirements. A 40-year-old Barista may need the portfolio to fund a gap for 50 years. That is a different problem, and the honest answer is a lower withdrawal rate — 3 to 3.5% — or a larger portfolio, or both. At 3.5%, a $40,000 gap needs about $1,143,000 instead of $1,000,000. Margin is not pessimism; it is what makes the plan survive contact with reality.",
      },
      {
        type: "h2",
        content: "Mistake 5: lifestyle creep funded by “I can always work more”",
      },
      {
        type: "p",
        content:
          "Barista FIRE has a treadmill in reverse: because work income is available, spending drifts up and the gap quietly widens. The portfolio was sized for the old gap, not the new one. Guard the spending side as carefully as the income side — track the gap yearly, and treat gap growth as the emergency it is.",
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Do I have to work at a coffee shop? No. Any enjoyable, durable part-time work counts — consulting, trades, seasonal work, service jobs. The math only sees dollars of reliable income.",
          "What if I stop working entirely later? Then you need full FIRE, not Barista FIRE. Either the portfolio has grown into the full number by then, or you are spending principal and should recheck the plan.",
          "How does Barista FIRE handle a market crash? The gap still needs funding every year, which means selling in a downturn hurts. Keep a cash buffer of 1–2 years of the gap, keep work income as the shock absorber, and consider a lower withdrawal rate for long horizons.",
          "Can I combine Coast and Barista? Yes — coast in your 30s while compounding runs, then shift to Barista when the portfolio covers a spending gap and you want time back. Many real plans are hybrids.",
          "What about Social Security? Later benefits genuinely help Barista plans by shrinking the gap the portfolio must fund — but benefit formulas depend on your full earnings history, so treat them as a future tailwind, not a current asset.",
          "Is Barista FIRE just semi-retirement with a fancy name? Mostly, yes — and that is fine. The name is marketing; the gap formula is the useful part.",
          "How do taxes change the gap? Work the example: a $20,000 part-time job does not deliver $20,000 of spending power. As an illustration only, if it nets $17,000 after payroll and income taxes, the true gap on $60,000 of spending is $43,000 — which needs $1,075,000 at 4%, not the $1,000,000 the pre-tax math suggests. Always model the gap in after-tax dollars on both sides.",
          "What if my spouse keeps working? A working spouse is the most underrated Barista asset: their income shrinks the gap, their employer plan can solve healthcare, and their earnings history protects future Social Security. Price the plan on the household, not the individual — but also ask what happens if they stop too.",
          "How big a cash buffer do I need? One to two years of the gap, in cash, before you start. The buffer exists so a market crash does not force you to sell the portfolio at the bottom to fund this year's gap. Work income is your first shock absorber; the cash buffer is the second; the withdrawal rate is the third. Barista plans with all three survive bad years. Plans with only the formula do not.",
          "Does an HSA help? If you have access to a high-deductible health plan with a Health Savings Account, it is one of the best Barista tools in existence: contributions are pre-tax, growth is tax-free, and withdrawals for medical costs are tax-free. In a life stage defined by paying your own healthcare, that triple treatment is hard to beat. Check current IRS contribution limits before planning around it.",
          "Can I Barista FIRE with kids? Yes, but the gap math gets stricter: childcare, bigger housing, and family healthcare all raise S while the work hours that fund W compete with parenting time. Many parents Barista later — coasting through the expensive early years, then downshifting work once the kids are in school and the gap shrinks.",
        ],
      },
      {
        type: "h2",
        content: "The bottom line",
      },
      {
        type: "p",
        content:
          "Barista FIRE is a trade: durable part-time income for a smaller portfolio, lifestyle freedom now for work that never fully ends. The formula is one subtraction and one division. The discipline is everything around it — honest after-tax gap math, a written healthcare answer, durable income, margin on the withdrawal rate, and a yearly recheck of the gap. Get those right and semi-retirement is not a fantasy; it is arithmetic. Run your gap in the Barista FIRE calculator, price your healthcare before anything else, and decide with the framework above. Educational only — not financial advice.",
      },
    ],
  }
];
