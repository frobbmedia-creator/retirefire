# Lean FIRE Pillar + 3 Clusters — Deploy Pack

**Status:** Ready to ship  
**Site:** retirefire.net  
**Voice:** transparent, anti-hype, math-first, educational only  
**Ship date target:** 2026-07-21+

---

## Architecture

| Role | Slug | Primary KW | Intent |
|------|------|------------|--------|
| **Pillar** | `/blog/lean-fire-explained` | lean fire | Educate / define |
| **Cluster 1** | `/blog/lean-fire-number-how-much` | lean fire number | Tool / table |
| **Cluster 2** | `/blog/lean-fire-budget-lifestyle` | lean fire budget | Lifestyle / how-to |
| **Cluster 3** | `/blog/lean-fire-path-years-savings-rate` | lean fire savings rate | Path / years math |

**Related existing (do not duplicate; interlink):**
- `lean-regular-fat-fire-numbers-2026`
- `what-is-a-fire-number`
- `safe-withdrawal-rate-3-vs-4-percent`
- `how-many-years-until-fire`
- FIRE Number calculator (`/calculators/fire-number`)

**Internal link graph:**
```
lean-fire-explained (pillar)
  ├─→ Cluster 1 number
  ├─→ Cluster 2 budget
  ├─→ Cluster 3 path
  ├─→ lean-regular-fat-fire-numbers-2026
  ├─→ SWR deep dive
  └─→ /calculators/fire-number + years + coast + barista
```

---

## 1. Reddit Pack

### Target subs

| Sub | Role | Notes |
|-----|------|-------|
| r/financialindependence | Primary | Value-first; disclose if self-linking |
| r/FIRE | Broader | Shorter hooks |
| r/leanfire | Core niche | Highest fit — lead with numbers, not site |
| r/personalfinance | Rare | Only pure education, no promo |
| r/Frugal | Occasional | Budget cluster angle only |

### Title options (A/B)

**Pillar-adjacent**
1. Lean FIRE is not a personality test — it’s spending ÷ SWR (worked $25k–$50k tables)
2. My Lean FIRE number at 3% / 3.5% / 4% (and why 4% is a conversation, not a contract)
3. What “Lean” actually means in the math (spoiler: the label is not a standard)

**Cluster 1 — number**
4. Lean FIRE numbers: $30k / $40k / $50k spend at 3–4% SWR
5. $40k Lean at 4% is $1M. At 3% it’s ~$1.33M. Here’s the full grid.

**Cluster 2 — budget**
6. Designing a Lean FIRE budget that survives healthcare and housing (not just coffee math)
7. Lean FIRE in HCOL: when the label fails and the spreadsheet wins

**Cluster 3 — path**
8. Savings-rate math: how long to Lean FIRE from $0 / $100k / $250k portfolio
9. Lean Coast vs full Lean FIRE — when stopping contributions still makes sense

### Full Reddit draft (post-ready)

See §3 Ready Assets → Reddit post.

### Posting tips

1. **First 24h:** Answer every serious comment with math, not links.
2. **Self-promo rule:** Disclose affiliation; prefer “run spending ÷ SWR yourself” over hard URL.
3. **Tables win:** Paste plain-text tables; mobile-friendly rows.
4. **Never claim:** “safe forever,” “guaranteed,” tax/healthcare certainty.
5. **Cadence:** 1 long post / week max per sub; 3–5 helpful comments elsewhere.
6. **Best days (US):** Tue–Thu morning local; avoid pure weekend dump.
7. **Follow-up:** After engagement, soft CTA to free calculator in a reply if asked for tools.

---

## 2. SEO Plan

### Keyword map

| Priority | Keyword | Type | Page |
|----------|---------|------|------|
| P0 | lean fire | Pillar head | lean-fire-explained |
| P0 | lean fire number | Cluster | lean-fire-number-how-much |
| P1 | lean fire budget | Cluster | lean-fire-budget-lifestyle |
| P1 | lean fire savings rate | Cluster | lean-fire-path-years-savings-rate |
| P1 | how much for lean fire | Cluster 1 long-tail | number page |
| P2 | lean fire vs regular fire | Interlink | existing lean-regular-fat |
| P2 | lean coast fire | Cluster 3 / coast tool | path + coast calc |
| P2 | lean fire 40000 | Supporting | number tables |
| P2 | frugal fire number | Supporting | pillar + number |

### Pillar outline (target 1,800–2,500 words on-page)

1. Hook — Lean is a spending input, not moral rank  
2. Definition — community label; RetireFire $40k example preset  
3. Core formula — FIRE = spend ÷ SWR  
4. Worked bands — $25k / $40k / $50k  
5. Path math — savings rate & years sketch  
6. Risks — sequence, healthcare, HCOL, under-spending fragility  
7. vs Regular / Fat / Coast / Barista  
8. How to use RetireFire tools  
9. FAQ (schema-ready)  
10. Disclaimer  

### Cluster outlines

**C1 Number:** formula → 3×3 table → 25×/30×/33× multiples → SWR sensitivity → CTA FIRE Number calc  
**C2 Budget:** categories → fixed vs flexible → healthcare & housing → HCOL reality → tracking loop  
**C3 Path:** years equation intuition → savings-rate table → Coast hybrid → lever ranking → Years calc  

### E-E-A-T

| Signal | Implementation |
|--------|----------------|
| Experience | Worked USD tables; “replace presets with your budget” |
| Expertise | Link Methodology, SWR lineage (Bengen/Trinity as history, not warranty) |
| Authoritativeness | Consistent formulas with live calculators; no contradictory defaults |
| Trust | Educational-only disclaimer; no guarantees; cite limits (tax/health omitted) |

### Schema

- `BlogPosting` (already via `blogPostingJsonLd`)
- Optional `FAQPage` JSON-LD if FAQ blocks expanded on pillar
- `BreadcrumbList` on blog routes
- Cross-link `SoftwareApplication` (FIRE Number calculator) in body CTAs

### Meta patterns

```
Title: Lean FIRE Explained: Definition, Math, Path & Risks | RetireFire
Desc: Lean FIRE is a spending-based FI target. Formulas, $25k–$50k tables,
3–4% SWR grids, path math, and free calculators — educational only.

Title: Lean FIRE Number: How Much Do You Need? (Tables)
Desc: Lean FIRE number = annual spend ÷ withdrawal rate. Full tables at
$30k/$40k/$50k and 3%–4% SWR — run your own inputs free.
```

---

## 3. Ready Assets

- Live drafts: `src/content/blog/posts.ts` (4 posts, 2026-07-21)
- Reddit full post: below (also usable as social pin source)
- SEO outline/draft: pillar body in posts.ts + this file’s outlines

### Reddit post (full)

**Sub:** r/leanfire or r/financialindependence  
**Title:** Lean FIRE is spending ÷ SWR — $25k / $40k / $50k tables at 3%, 3.5%, 4%

**Body:**

```
Lean FIRE is not a vibe check. In the math, it’s just a lifestyle spending
level you plug into:

  FIRE number = annual spending ÷ withdrawal rate

Community labels vary. RetireFire’s *example* Lean preset is $40k/year
spending (not a research standard). Your rent and healthcare can move you
out of “Lean” overnight — the spreadsheet doesn’t care about the nickname.

### Quick grid (pre-tax illustration, USD)

| Annual spend | 4% SWR | 3.5% SWR | 3% SWR |
|-------------:|-------:|---------:|-------:|
| $25,000      | $625k  | ~$714k   | ~$833k |
| $40,000      | $1.00M | ~$1.14M  | ~$1.33M|
| $50,000      | $1.25M | ~$1.43M  | ~$1.67M|

Moving 4% → 3% raises the target by **one-third** for the same lifestyle.

### Multiples (same idea)

- 4% → 25× annual spend
- 3.5% → ~28.6×
- 3% → ~33.3×

### Path intuition (not a forecast)

If you save aggressively, Lean’s smaller target is the whole advantage.
If you under-count healthcare or housing, “Lean” becomes fragile early
retirement — sequence risk hits harder when there’s less fat in the budget.

### What this deliberately ignores

Taxes, account location, RMDs, fees-as-drag, Social Security, and real
health insurance quotes. Those can dominate.

Curious how others here define Lean in *dollars*, not aesthetics:
- What’s your all-in annual spend target?
- Which SWR do you plan with for a long horizon?
- Anyone Lean in true HCOL without geo arbitrage?

(I work on free transparent FIRE calculators — happy to share formulas;
not pitching. Educational only, not advice.)
```

---

## 4. Deployment Steps

```bash
cd /Users/frobbclaw/retirefire

# Confirm posts present
rg -n "lean-fire-explained|lean-fire-number-how-much|lean-fire-budget-lifestyle|lean-fire-path" src/content/blog/posts.ts

# Typecheck / build
npm run build

# Stage only Lean FIRE pack files (avoid unrelated dirty tree)
git add \
  docs/growth/20-lean-fire-pillar-cluster-pack.md \
  docs/growth/05-content-calendar-60d.md \
  src/content/blog/posts.ts \
  src/app/blog/\[slug\]/page.tsx

git status
git commit -m "Content: Lean FIRE pillar + 3 keyword clusters

- Pillar: lean-fire-explained (definition, math, risks, path)
- Clusters: number tables, budget/lifestyle, years/savings-rate path
- Growth pack: Reddit titles, SEO map, E-E-A-T, deploy steps"

git push origin main
# Vercel production deploy follows git push if project is linked
```

### Post-deploy checklist

- [ ] https://retirefire.net/blog/lean-fire-explained → 200
- [ ] https://retirefire.net/blog/lean-fire-number-how-much → 200
- [ ] https://retirefire.net/blog/lean-fire-budget-lifestyle → 200
- [ ] https://retirefire.net/blog/lean-fire-path-years-savings-rate → 200
- [ ] GSC → URL inspection → Request indexing (pillar first)
- [ ] Sitemap includes new slugs (`/sitemap.xml`)
- [ ] Reddit: post value thread; link only if culture-appropriate
- [ ] Internal: from Lean/Regular/Fat post, add link to new pillar (optional follow-up)

### Next content commands

```bash
# Optional: social batch from social foundation template
# Edit docs/growth/16-social-batch-content-wave.md with Lean hooks

# Optional interlink patch on lean-regular-fat post
# (CTA: "Deep dive: Lean FIRE explained")
```
```
