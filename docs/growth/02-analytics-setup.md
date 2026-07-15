# Analytics & Measurement Setup — RetireFire

**Status:** Vercel Analytics + Speed Insights already live in production.  
**This doc:** GA4, Search Console, optional Plausible, conversion events, weekly dashboard.

---

## Current state (as of 2026-07-15)

| Layer | Status |
|-------|--------|
| Vercel Web Analytics | Wired in `src/app/layout.tsx` — enable in Vercel dashboard if not already |
| Vercel Speed Insights | Wired |
| Event helpers | `src/lib/analytics.ts` + share/CSV/calculate events |
| Optional GA4 / Plausible | `AnalyticsScripts` loads when env vars set |
| Search Console | User action: verify domain + submit sitemap |

---

## A. Google Analytics 4 (optional but recommended for funnel depth)

### Steps

1. Go to [analytics.google.com](https://analytics.google.com) → **Admin** → **Create property**  
   - Name: `RetireFire`  
   - Time zone: your primary audience TZ (e.g. America/New_York)  
   - Currency: USD  
2. Create a **Web** data stream:  
   - URL: `https://retirefire.net`  
   - Stream name: `retirefire-web`  
3. Copy **Measurement ID** (`G-XXXXXXXX`).  
4. In Vercel → Project → Settings → Environment Variables (Production):  
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXX`  
5. Redeploy. Confirm in GA4 **Realtime** after visiting the site.

### Privacy note

GA4 uses cookies / client IDs. Keep disclaimer + privacy language honest. Prefer Vercel Analytics / Plausible as primary if you want minimal tracking; use GA4 for deeper conversion debugging.

---

## B. Google Search Console (required)

1. [search.google.com/search-console](https://search.google.com/search-console)  
2. Add property → prefer **Domain** `retirefire.net`  
3. Verify via **DNS TXT** at your registrar (most reliable).  
4. After verified:  
   - **Sitemaps** → submit `https://retirefire.net/sitemap.xml`  
   - Confirm `/robots.txt` allows crawl  
5. Optional: Bing Webmaster → import from GSC.

### Rich results checks

- Home: FAQ JSON-LD  
- Blog posts: BlogPosting  
- Calculators: SoftwareApplication / WebApplication  
- Use [Rich Results Test](https://search.google.com/test/rich-results)

---

## C. Plausible (recommended privacy-friendly complement)

1. Sign up at [plausible.io](https://plausible.io) (or self-host).  
2. Add site `retirefire.net`.  
3. Vercel env:  
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = `retirefire.net`  
4. Redeploy. Script loads from `https://plausible.io/js/script.js` when set.  
5. Optional custom events (already named in code):  
   - `calculator_interact`  
   - `share_link_copy`  
   - `csv_export`  
   - `calc_page_view` (if instrumented)

---

## D. Event / conversion tracking (implemented in code)

Use `trackEvent(name, props)` from `@/lib/analytics`.

| Event | When | Props |
|-------|------|-------|
| `share_link_copy` | Copy share link | `path` |
| `csv_export` | Download scenario CSV | `path` |
| `calculator_interact` | Significant field change (debounced optional) | `tool`, `field` |
| `cta_click` | Primary CTAs | `label`, `href` |

### GA4 recommended custom conversions

In GA4 → Admin → Events → mark as conversion:

- `share_link_copy`  
- `csv_export`  
- (later) `signup_start`, `checkout_start`, `purchase`

### Future signup / payment events (Phase 4)

```
signup_start → signup_complete
checkout_start → purchase (value, currency)
feature_gate_hit (pro_feature_name)
```

---

## E. Master dashboard (weekly)

### Sources

1. **Vercel Analytics** — pageviews, top pages, referrers  
2. **Search Console** — clicks, impressions, CTR, position (last 7 / 28 days)  
3. **Plausible / GA4** — events, bounce, countries  
4. **Social** (manual): X analytics, LinkedIn, Reddit mentions  
5. **Site:** feedback widget volume (qualitative)

### Dashboard layout (Notion / sheet columns)

| Metric | Source | Target (Week 2) | Target (Week 6) | Target (Week 12) |
|--------|--------|-----------------|-----------------|------------------|
| Sessions / week | Vercel/Plausible | Baseline | +50% | +200% |
| Calculator pageviews | Vercel | Baseline | +80% | +250% |
| Share link copies | Events | >0 | Growing | Growing |
| GSC impressions | GSC | Indexing starts | Rising | Primary KWs moving |
| Blog posts live | CMS | 7+ | 15+ | 25+ |
| Social posts / week | Manual | 5–10 | 14–21 | 14–21 |
| Email subs | Phase 3 | 0 | 0–50 | 200+ |
| Paying users | Phase 4 | 0 | 0 | First $ |

---

## F. Weekly metrics report template

See `09-weekly-metrics-template.md`. Grok runs this every Monday.

---

## G. Env var checklist

```bash
# Optional — leave unset to keep Vercel-only analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=retirefire.net

# Already used
FEEDBACK_TO_EMAIL=you@example.com
```

---

## H. User action checklist

- [ ] Enable Vercel Web Analytics (if not already)  
- [ ] Verify Search Console domain + submit sitemap  
- [ ] Optional: create GA4 + set env + redeploy  
- [ ] Optional: create Plausible + set env + redeploy  
- [ ] Confirm Realtime / Plausible shows a test visit  
- [ ] Bookmark Vercel Analytics + GSC for Monday reviews  
