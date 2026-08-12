# Technical SEO Audit — RetireFire

**Last updated:** 2026-08-12 (Oracle execution pass)

**Scope:** Codebase + live structure. Rankings still require GSC verification + sitemap submission by the owner.

---

## Already strong

| Item | Status |
|------|--------|
| HTTPS / Vercel | Live production |
| `robots.ts` allow all + sitemap URL | ✓ |
| `sitemap.ts` static + blog + decision pages | ✓ (lastmod refreshed 2026-08-12) |
| Canonicals via `pageMeta` | ✓ |
| OG / Twitter cards | ✓ |
| FAQ JSON-LD (home + calc pages) | ✓ |
| SoftwareApplication / WebApplication / BlogPosting | ✓ |
| Mobile-first UI | ✓ |
| Internal calc hub + dedicated landings | ✓ |
| Decision pages (`/retire-at-50`, `/can-i-retire-with-1-million`, etc.) | ✓ |

---

## Executed 2026-08-12 (code pushed to main)

1. **Sitemap freshness** — Bumped `lastModified` on homepage, calculators hub, retirement-checkup, core FIRE tools, and blog index to 2026-08-12 so Google sees recent activity.
2. **Homepage meta** — Tightened description for clearer commercial + tool intent while keeping “free / no signup” signals.
3. **Calculator meta titles & descriptions** — Strengthened for higher CTR and keyword match:
   - Coast FIRE Calculator (Free) — Exact Number + Stress Test
   - Barista FIRE Calculator — Semi-Retirement Portfolio Tool
   - FIRE Number Calculator — Free 4% Rule / 25× Tool
   - Years to FIRE Calculator — Timeline + Stress Test
4. **Calculators hub** — Minor description polish for keyword coverage.
5. **This audit** — Updated with current status and remaining owner actions.

---

## Prioritized remaining actions

| Priority | Item | Owner | Action |
|----------|------|-------|--------|
| **P0** | Google Search Console | User | Verify domain (or DNS), submit `https://retirefire.net/sitemap.xml` |
| **P0** | Indexation requests | User | After GSC: request indexing on `/`, `/retirement-checkup`, Coast, Barista, FIRE Number, top decision pages |
| **P1** | Monitor title performance | User + future pass | Watch GSC for cannibalization or low CTR titles; iterate |
| **P1** | Rich Results validation | User | Run Rich Results Test on homepage, Coast, one decision page, one blog post |
| **P2** | BreadcrumbList coverage | Optional | Ensure every resource + decision page emits BreadcrumbList |
| **P2** | Blog `dateModified` | Optional | Keep BlogPosting schema accurate on edits |
| **P3** | Core Web Vitals | Ongoing | Already on Vercel Speed Insights; recheck after major UI changes |
| **P3** | hreflang | Skip for now | Only if multi-region content ships |

---

## Internal linking map (target — still enforced)

```
Home → Calculators + Blog + Approach + Resources + Retirement Checkup
Coast calc → Age table + stress test + checklist + SOR blog + decision pages
Years → Stress test + methodology
Barista → vs Coast blog + coast calc
Blog posts → related tool + resources chips
Resources → tools + methodology
Decision pages → primary calculator CTA + related research
```

---

## Keyword → URL (primary)

| Keyword | URL |
|---------|-----|
| coast fire calculator | `/calculators/coast-fire` |
| barista fire calculator | `/calculators/barista-fire` |
| fire number calculator | `/calculators/fire-number` |
| years to fire calculator | `/calculators/years-to-fire` |
| coast fire by age | `/coast-fire-by-age` + coast tool |
| sequence of returns fire | `/resources/sequence-risk-guide` |
| coast fire checklist | `/resources/coast-fire-checklist` |
| retire at 50 / 55 / 60 | `/retire-at-50` etc. |
| can I retire with 1 million | `/can-i-retire-with-1-million` |

---

## Post-deploy checklist (owner)

- [x] Code changes pushed to `main` (2026-08-12)
- [ ] Wait for Vercel production deploy
- [ ] `curl -sI https://retirefire.net/sitemap.xml` → 200
- [ ] Spot-check new titles in browser source on Coast / Barista / FIRE Number
- [ ] GSC: property verified + sitemap submitted
- [ ] Request indexing on top 8–10 URLs
- [ ] Rich Results Test on key pages
- [ ] Mobile Lighthouse SEO ≥ 90 (should already be)

---

## Notes from the Oracle

Technical foundation is excellent for a young domain. The highest remaining leverage is **GSC + indexation + monitoring**. Code-side CTR improvements are live; the next money lever is getting Google to discover and rank the high-intent pages we just polished.
