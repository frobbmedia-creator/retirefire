# Technical SEO Audit — RetireFire

**Last updated:** 2026-08-20 (Oracle: homepage FAQ live + Arya series page)

**Scope:** Codebase + live structure. Rankings still require GSC verification + sitemap submission by the owner.

---

## Already strong

| Item | Status |
|------|--------|
| HTTPS / Vercel | Live production |
| `robots.ts` allow all + sitemap URL | ✓ |
| `sitemap.ts` static + blog + decision pages + Arya series | ✓ |
| Canonicals via `pageMeta` | ✓ |
| OG / Twitter cards | ✓ (Twitter title/desc inherit page meta) |
| FAQ JSON-LD (home + calc pages) | ✓ **Homepage FAQ now rendered** |
| SoftwareApplication / WebApplication / BlogPosting | ✓ |
| Mobile-first UI | ✓ |
| Internal calc hub + dedicated landings | ✓ |
| Decision pages (`/retire-at-50`, `/can-i-retire-with-1-million`, etc.) | ✓ |
| Arya 21-day series hub | ✓ `/series/arya-21-day` |

---

## Executed 2026-08-20

1. **Homepage** — `TrustStrip` + `FaqSection` + `FaqJsonLd` wired (was code-complete but unused).
2. **Arya series page** — Full 21-day map with CTAs to tools; breadcrumbs + WebPage schema.
3. **Sitemap** — Series URL added; homepage lastmod refreshed.
4. **Footer** — Learn → Arya 21-Day Series.

---

## Prioritized remaining actions

| Priority | Item | Owner | Action |
|----------|------|-------|--------|
| **P0** | Google Search Console | User | Verify property, submit sitemap, request indexing |
| **P0** | Indexation requests | User | Money URLs + `/series/arya-21-day` |
| **P1** | Rich Results validation | User | Homepage FAQ, Coast, decision page, series page |
| **P1** | Video hosting | Oracle next | Top 6 Arya clips on CDN then embed |
| **P2** | BreadcrumbList coverage | Optional | Remaining resource pages |
| **P3** | Core Web Vitals | Ongoing | Vercel Speed Insights already on |

---

## Money URLs — request indexing first

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
https://retirefire.net/series/arya-21-day
https://retirefire.net/blog
```

Sitemap: `https://retirefire.net/sitemap.xml`

---

## Notes from the Oracle

Homepage FAQ was the missing rich-result surface. Arya is now the public personality of the brand via `/series/arya-21-day`. **Remaining bottleneck: GSC index requests + optional video CDN for embeds.**
