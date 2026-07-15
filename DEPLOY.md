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

   **Easiest (recommended):** [Web3Forms](https://web3forms.com) — free, no domain verify.
   - Create an access key (enter the inbox you want feedback in)
   - Add `WEB3FORMS_ACCESS_KEY` = that key (Production)

   **Or Resend:**
   - `RESEND_API_KEY` — from [resend.com](https://resend.com)
   - `FEEDBACK_TO_EMAIL` — must be **the same email as your Resend account** while using the free test sender
   - `FEEDBACK_FROM_EMAIL` — optional; defaults to `RetireFire <onboarding@resend.dev>`  
     Custom from-addresses only work after you verify a domain in Resend.

   If both are set, **Web3Forms is used**. Redeploy after changing env vars (new deploy, not prebuilt redeploy).
6. Deploy

## 3. Attach retirefire.net

1. Project → **Settings** → **Domains**
2. Add `retirefire.net` and `www.retirefire.net` (optional redirect www → apex)
3. At your DNS provider, add the records Vercel shows (typically):
   - **A** `@` → `76.76.21.21`
   - **CNAME** `www` → `cname.vercel-dns.com`
4. Wait for TLS certificate (usually minutes)

## 4. Analytics

`@vercel/analytics` is already wired in `src/app/layout.tsx`.

1. Vercel project → **Analytics** → enable **Web Analytics**
2. No cookies / no personal data collection by default
3. Works only on Vercel production (no-ops locally)

## 5. Post-deploy checklist

- [ ] `https://retirefire.net` loads over HTTPS
- [ ] Calculators work on mobile
- [ ] `/methodology`, `/disclaimer`, `/blog` resolve
- [ ] `/sitemap.xml` and `/robots.txt` OK
- [ ] Share link copies a URL with query params after changing inputs
- [ ] Lighthouse (Chrome DevTools): Performance / Accessibility / SEO ≥ 90 target
- [ ] **www → apex:** In Vercel → Domains, set `www.retirefire.net` to redirect to `retirefire.net` (301). Confirm `curl -sI https://www.retirefire.net` shows Location to apex.
- [ ] View source on `/` and a calculator page: self-referencing `rel="canonical"` present

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
