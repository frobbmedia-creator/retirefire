# Technical SEO Audit — RetireFire (2026-07-15)

**Scope:** Codebase + live structure. Rankings need GSC after deploy/verify.

---

## Already strong

| Item | Status |
|------|--------|
| HTTPS / Vercel | Assumed production |
| `robots.ts` allow all + sitemap URL | ✓ |
| `sitemap.ts` static + blog posts | ✓ (resources added) |
| Canonicals via `pageMeta` | ✓ |
| OG / Twitter cards | ✓ |
| FAQ JSON-LD (home + calc pages) | ✓ |
| SoftwareApplication / WebApplication / BlogPosting | ✓ |
| Mobile-first UI | ✓ |
| Internal calc hub + dedicated landings | ✓ |

---

## Fixed / improved this pass

1. **Resources hub** `/resources` + sequence risk guide + checklist in sitemap  
2. **Blog footer CTAs** — checklist, sequence guide, A/B, methodology, approach  
3. **Tag → tool map** expanded for sequence-risk, tables, comparison, etc.  
4. **Calculators index meta** refreshed for Coast/stress/compare keywords  
5. **Coast/Barista SEO related** links to new resources and comparison posts  
6. **Footer** Resources link  

---

## Prioritized remaining fixes

| Priority | Item | Action |
|----------|------|--------|
| P0 | Search Console | User: verify domain, submit sitemap |
| P0 | Deploy unpushed commits | User: push main |
| P1 | Index coverage | After GSC: request indexing on `/`, Coast, checklist, top pillars |
| P1 | Title uniqueness | Monitor GSC; tweak if cannibalization |
| P2 | BreadcrumbList on all resource pages | Optional JsonLd |
| P2 | Article `dateModified` when editing posts | Extend blog schema |
| P2 | Image alt / OG per post | Optional branded OG per slug |
| P3 | hreflang | Only if multi-region content ships |
| P3 | Core Web Vitals | Vercel Speed Insights already wired; recheck after stress-test UI |

---

## Internal linking map (target)

```
Home → Calculators + Blog + Approach + Resources
Coast calc → Age table (on-page) + stress test + checklist + SOR blog
Years → Stress test + methodology
Barista → vs Coast blog + coast calc
Blog posts → related tool + resources chips
Resources → tools + methodology
```

---

## Keyword → URL (primary)

| Keyword | URL |
|---------|-----|
| coast fire calculator | `/calculators/coast-fire` |
| barista fire calculator | `/calculators/barista-fire` |
| fire number calculator | `/calculators/fire-number` |
| coast fire by age | `/blog/coast-fire-by-age-tables` + coast tool |
| sequence of returns fire | `/resources/sequence-risk-guide` |
| coast fire checklist | `/resources/coast-fire-checklist` |

---

## Post-deploy checklist

- [ ] `curl -sI https://retirefire.net/sitemap.xml` → 200  
- [ ] Rich Results Test on `/`, `/calculators/coast-fire`, one blog post  
- [ ] GSC: sitemap submitted  
- [ ] Spot-check canonical tags on new resource pages  
- [ ] Mobile Lighthouse SEO ≥ 90  
