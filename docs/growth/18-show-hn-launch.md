# Show HN / eng launch draft

**When:** After production deploy of latest main (stress test + methodology live).  
**Tone:** Builder honesty. No growth-hack hype. Invite critique of the model.

---

## Show HN (Hacker News)

**Title options (pick one):**

1. `Show HN: RetireFire – free FIRE calculators with published formulas and a free Monte Carlo stress test`
2. `Show HN: Transparent Coast/Barista FIRE calculators (no account, documented MC)`
3. `Show HN: RetireFire – educational FIRE math with shareable scenarios and free sequence stress tests`

**Body:**

```
I built RetireFire (https://retirefire.net) because most free FIRE calculators
either hide formulas or give a single “smooth return” number with no ranges.

What it does:
• FIRE number, years to FI, Coast FIRE, Barista FIRE
• Shared assumptions + shareable URL state + CSV export
• Scenario A/B compare (pin baseline, change one lever)
• Free basic Monte Carlo on Coast & Years (1,000 paths, σ presets, p10/p50/p90,
  seed 42) — educational, not historical backtesting
• Age tables, sensitivity chips, printable Coast checklist
• Methodology + Approach pages (what stays free if Pro ever ships)

What it deliberately does not do:
• Taxes / account plumbing
• Full cFIREsim-style historical cycle engine
• Personalized advice

Stack: Next.js, pure TS calc libs, no account required for core tools.

I’d love feedback on the stress-test model and on copy that might create false
confidence. Methodology: https://retirefire.net/methodology
```

**Comment kit (first reply if asked “vs cFIREsim?”):**

```
Not a replacement. cFIREsim-style historical cycles are deeper for withdrawal
path risk. RetireFire is the transparent first layer: deterministic Coast/FIRE
math + a free toy MC for dispersion. We document limits and point people to
heavier tools when stakes are high.
```

---

## Indie Hackers / builder post (shorter)

```
Building RetireFire in public: free Coast/Barista/FIRE calculators with
published math and a free 1k-path stress test.

Growth bet: integrity + free core > dark-pattern freemium.
Monetization later (optional Pro depth only) after the free product is excellent.

Site: https://retirefire.net
What stays free: https://retirefire.net/approach
```

---

## Product Hunt (optional, later)

**Tagline:** Free FIRE calculators with transparent math and sequence stress tests  
**Description:** Coast, Barista, FIRE number, years — shareable scenarios, free Monte Carlo ranges, no account wall on the core.  
**First comment:** Link methodology, checklist, and stress-test guide; state educational only.

---

## Pre-flight checklist

- [ ] Latest commits deployed to retirefire.net  
- [ ] `/methodology` MC section accurate  
- [ ] Stress test runs on production Coast/Years  
- [ ] Sitemap submitted (GSC)  
- [ ] Soft social already live or ready same day  
- [ ] Founder available for first 2–4 hours of comments  
