# Technical SEO Audit — RetireFire

**Last updated:** 2026-08-12 (Oracle Twitter-meta fix + GSC handoff)

**Scope:** Codebase + live structure. Rankings still require GSC verification + sitemap submission by the owner.

---

## Already strong

| Item | Status |
|------|--------|
| HTTPS / Vercel | Live production |
| `robots.ts` allow all + sitemap URL | ✓ |
| `sitemap.ts` static + blog + decision pages | ✓ (lastmod refreshed 2026-08-12) |
| Canonicals via `pageMeta` | ✓ |
| OG / Twitter cards | ✓ (Twitter title/desc now inherit page meta — fixed 2026-08-12 evening) |
| FAQ JSON-LD (home + calc pages) | ✓ |
| SoftwareApplication / WebApplication / BlogPosting | ✓ |
| Mobile-first UI | ✓ |
| Internal calc hub + dedicated landings | ✓ |
| Decision pages (`/retire-at-50`, `/can-i-retire-with-1-million`, etc.) | ✓ |

---

## Executed 2026-08-12

1. **Sitemap freshness** — Bumped `lastModified` on homepage, calculators hub, retirement-checkup, core FIRE tools, and blog index to 2026-08-12.
2. **Homepage + calculator meta** — Titles/descriptions tightened for CTR.
3. **Twitter card leak fix** — `pageMeta()` now sets `twitter:title` and `twitter:description` from the page’s own title/description (or OG), so calculator and decision pages no longer inherit the homepage Twitter card when shared on X.
4. **This audit** — Updated.

---

## Prioritized remaining actions

| Priority | Item | Owner | Action |
|----------|------|-------|--------|
| **P0** | Google Search Console | User | Verify property, submit `https://retirefire.net/sitemap.xml` |
| **P0** | Indexation requests | User | Request indexing on the money URLs listed below |
| **P1** | Rich Results validation | User | Run Rich Results Test on homepage, Coast, one decision page, one blog post |
| **P1** | Monitor title performance | User + future pass | Watch GSC for cannibalization or low CTR |
| **P2** | BreadcrumbList coverage | Optional | Every resource + decision page |
| **P2** | Blog `dateModified` | Optional | Keep BlogPosting accurate on edits |
| **P3** | Core Web Vitals | Ongoing | Vercel Speed Insights already on |

---

## Money URLs — request indexing on these first

```
https://retirefire.net/
https://retirefire.net/retirement-checkup
https://retirefire.net/calculators/coast-fire
https://retirefire.net/calculators/barista-fire
https://retirefire.net/calculators/fire-number
https://retirefire.net/calculators/years-to-fire
https://retirefire.net/calculators
https://retirefire.net/retire-at-50
https://retirefire.net/can-i-retire-with-1-million
https://retirefire.net/coast-fire-by-age
https://retirefire.net/resources/sequence-risk-guide
https://retirefire.net/blog
```

Sitemap (submit this once in GSC):

```
https://retirefire.net/sitemap.xml
```

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
- [x] Twitter meta inheritance fixed in `pageMeta`
- [ ] Wait for Vercel production deploy after this commit
- [ ] Spot-check Twitter tags on Coast / FIRE Number (view-source → `twitter:title` should match the page)
- [ ] GSC: property verified + sitemap submitted
- [ ] Request indexing on the money URLs above
- [ ] Rich Results Test on key pages

---

## Notes from the Oracle

Technical foundation is excellent for a young domain. Code-side share/CTR fixes are done. **The remaining bottleneck is 100% owner-side: Google Search Console + index requests.** Do that today and the machine starts working for you.
