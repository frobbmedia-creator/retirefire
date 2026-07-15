# Homepage & Calculator UX / Copy Recommendations

**Implemented in Phase 1 code:** Hero refresh, FAQ expansion, Approach page, CSV export, Coast card wording.

---

## Homepage

| Element | Recommendation | Status |
|---------|----------------|--------|
| H1 | Lead with Coast + transparency, not generic “FIRE calculators” only | Done |
| Subcopy | “Published formulas, conservative defaults, honest limits” | Done |
| Trust stats | Avoid overclaiming “5 calculators” if savings table is secondary; “Coast+” or “Free core” | Done |
| Secondary CTA | Methodology stays; Approach linked in body | Done |
| Calc cards | Coast wording = accurate “may finish by traditional age” | Done |
| Math section | Add “honest limits” bullet + Approach link | Done |
| FAQ | Sequence risk + free forever Qs | Done |

### Optional next polish (not blocking)

- Add “Coming: sequence stress test” chip near Coast card (link Approach)  
- Sticky mobile CTA: “Open Coast” after scroll  
- Skeleton loaders instead of plain “Loading calculators…” text  
- Trust strip: “Shareable scenarios · CSV export · No account”  

---

## Calculator pages

| UX | Recommendation |
|----|----------------|
| Results | Always pair number with “under these assumptions” |
| Loading | Keep Suspense fallback; consider pulse skeleton |
| Share | Track event (done); toast already “Copied!” |
| Export | CSV button beside share (done) |
| Pro labels | Only after stress test ships — educational, not nagging |
| Mobile | Money inputs already large; keep tap targets ≥44px |
| SEO body | Keep crawlable how-to under fold (CalculatorSeoSection) |

### Tone for CTAs

Prefer:
- “Run your own numbers”  
- “Compare Coast and Barista with the same spending”  
- “Export assumptions for your notes”  

Avoid:
- “Retire rich today”  
- “Guaranteed FIRE number”  
- “Secret formula”  

---

## Trust surfaces

1. Disclaimer banner (global)  
2. Methodology (formulas)  
3. Approach (philosophy + roadmap)  
4. Blog disclaimers  
5. Stress-test copy when live  
