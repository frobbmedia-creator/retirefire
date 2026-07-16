# Deploy RetireFire to retirefire.net (Vercel)

## Prerequisites

- GitHub account
- Vercel account (free tier is fine)
- Domain `retirefire.net` at your registrar

`gh` and `vercel` CLIs are optional — the dashboard works fully.

## 1. Push the repo

```bash
cd /Users/frobbclaw/retirefire
git add -A
git commit -m "RetireFire MVP: calculators, blog, SEO, shareable state"
# Create empty repo on GitHub, then:
git remote add origin git@github.com:YOUR_USER/retirefire.git
git branch -M main
git push -u origin main
```

## 2. Import on Vercel

1. [vercel.com/new](https://vercel.com/new) → import the GitHub repo
2. Framework: **Next.js** (auto-detected)
3. Build command: `npm run build` (default)
4. Output: default (no override)
5. **Environment variables** (optional for core site; required for feedback).

   **Required for feedback:**
   - `FEEDBACK_TO_EMAIL` — real inbox (not empty). Must be a valid email string.

   The widget submits **from the browser** via [FormSubmit](https://formsubmit.co)
   (free form APIs block Vercel server IPs).  
   **First send:** FormSubmit emails that inbox an activation link — click once, then
   feedback works.  
   `RESEND_API_KEY` is unused for feedback now (safe to delete).

   **Optional:** `WEB3FORMS_ACCESS_KEY` or `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` —
   if set, Web3Forms is used instead (also client-side).

   After changing env vars, create a **new deploy** (Git push or new deployment).
6. Deploy

## 3. Attach retirefire.net

1. Project → **Settings** → **Domains**
2. Add `retirefire.net` and `www.retirefire.net` (optional redirect www → apex)
3. At your DNS provider, add the records Vercel shows (typically):
   - **A** `@` → `76.76.21.21`
   - **CNAME** `www` → `cname.vercel-dns.com`
4. Wait for TLS certificate (usually minutes)

## 4. Analytics

`@vercel/analytics` + Speed Insights are wired in `src/app/layout.tsx`.

1. Vercel project → **Analytics** → enable **Web Analytics**
2. No cookies / no personal data collection by default
3. Works only on Vercel production (no-ops locally)

### Optional: GA4 + Plausible

Full steps: `docs/growth/02-analytics-setup.md`.

| Env var | Purpose |
|---------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Measurement ID (`G-…`) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | e.g. `retirefire.net` |

Leave unset to keep Vercel-only analytics. Custom events (`share_link_copy`, `csv_export`) fire to any provider present via `src/lib/analytics.ts`.

## 5. Post-deploy checklist

- [ ] `https://retirefire.net` loads over HTTPS
- [ ] Calculators work on mobile
- [ ] `/methodology`, `/approach`, `/disclaimer`, `/blog`, `/resources` resolve
- [ ] Coast / Years: free stress-test panel runs (success rate + paths)
- [ ] `/resources/coast-fire-checklist` Print / Save PDF works
- [ ] `/sitemap.xml` and `/robots.txt` OK
- [ ] Share link copies a URL with query params after changing inputs
- [ ] CSV export downloads from a calculator
- [ ] Lighthouse (Chrome DevTools): Performance / Accessibility / SEO ≥ 90 target
- [ ] **www → apex:** In Vercel → Domains, set `www.retirefire.net` to redirect to `retirefire.net` (301). Confirm `curl -sI https://www.retirefire.net` shows Location to apex.
- [ ] View source on `/` and a calculator page: self-referencing `rel="canonical"` present
- [ ] GSC: submit sitemap; request index on `/`, Coast, checklist, top blog pillars
- [ ] Optional launch: social pin + Show HN draft in `docs/growth/18-show-hn-launch.md`

### Current local status (ops)

If `git status` shows `main` ahead of `origin/main`, production is behind until:

```bash
cd /Users/frobbclaw/retirefire
git push origin main
```

Do **not** force-push. Confirm a **new** Vercel Production deployment appears for the latest commit (not an old 5c66bee-era deploy).

### Deploy from Vercel dashboard (no GitHub token needed)

Use this when GitHub Actions fails on `VERCEL_TOKEN`:

1. Open [vercel.com/dashboard](https://vercel.com/dashboard) → project **retirefire**
2. Top right: **Deployments**
3. Click **Create Deployment** (not “Redeploy” on an old row)
4. Choose:
   - **Git repository** `frobbmedia-creator/retirefire` (connect GitHub if prompted)
   - Branch: **`main`**
   - Commit should be recent (e.g. `3817e15` or “Polish hub” / “W30”) — **not** `5c66bee`
5. Deploy → Production
6. Wait until status is **Ready**
7. Check: https://retirefire.net/resources (must be **200**, not 404)

**Redeploy** on an old row only rebuilds that old commit — it will **not** ship the new blog/tools.

### SEO / Search Console (ops)

1. [Google Search Console](https://search.google.com/search-console) → add `retirefire.net` (Domain property preferred)
2. Verify via DNS TXT (or HTML file in `public/` if needed)
3. Submit sitemap: `https://retirefire.net/sitemap.xml`
4. Optional: Bing Webmaster Tools → import from GSC
5. After indexation: Rich Results Test on home (FAQ) and a blog post (Article)

### Quick Lighthouse pass tips (already addressed in code)

- Static generation for marketing pages
- Dark theme, large touch targets on mobile inputs
- Semantic headings, FAQ / SoftwareApplication / BlogPosting JSON-LD, OG image
- Per-page canonicals; calculator pages include crawlable how-to copy
- No layout-blocking third-party scripts beyond Analytics

## 6. Optional: CLI deploy

```bash
npm i -g vercel
cd /Users/frobbclaw/retirefire
vercel          # preview
vercel --prod   # production
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Domain pending | DNS propagation; check Vercel domain status |
| 404 on refresh for client routes | Should not apply — App Router uses static/SSR |
| Analytics empty | Enable Web Analytics in project settings; wait for traffic |
| OG image 500 | Check `/opengraph-image` route in deployment logs |

## Support contacts

Keep registrar login + Vercel team access somewhere safe. Domain DNS is the usual launch blocker.
