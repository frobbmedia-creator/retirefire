# Launch checklist (user-friendly)

Site is live at **https://retirefire.net**.  
Do these in order. After each section, you can reply to the agent: `gsc done` / `social done` / `autodeploy done`.

---

## 1. Google Search Console (SEO)

### A. Open Search Console

1. Go to: https://search.google.com/search-console  
2. Sign in with the Google account you want as owner.

### B. Add the site (if not already)

**Option A — Domain (best)**  
1. Click **Add property**  
2. Choose **Domain**  
3. Enter: `retirefire.net` (no `https://`)  
4. Google shows a **TXT record** to add at your DNS (wherever you bought the domain: Namecheap, Cloudflare, GoDaddy, etc.)  
5. Add that TXT record → wait a few minutes → click **Verify**

**Option B — URL prefix (easier if DNS is hard)**  
1. **Add property** → **URL prefix**  
2. Enter: `https://retirefire.net`  
3. Choose **HTML tag** or **HTML file** verification, or  
4. **Google Analytics** if you already have GA on the site  
5. Or **DNS** same as above

### C. Submit the sitemap (after verified)

1. Left menu → **Sitemaps**  
2. Under “Add a new sitemap” paste:

```text
https://retirefire.net/sitemap.xml
```

3. Click **Submit**  
4. Status should become **Success** (may take minutes).

### D. Request indexing (high value pages)

For each URL below:

1. Top search bar in GSC → paste URL → **Enter**  
2. Click **Request indexing**  
3. Wait for confirmation

Priority list:

```text
https://retirefire.net/
https://retirefire.net/calculators/coast-fire
https://retirefire.net/calculators/years-to-fire
https://retirefire.net/resources
https://retirefire.net/resources/coast-fire-checklist
https://retirefire.net/approach
https://retirefire.net/methodology
https://retirefire.net/blog/how-to-stress-test-coast-fire-number
https://retirefire.net/blog/lean-regular-fat-fire-numbers-2026
https://retirefire.net/blog/retirefire-methodology-explained
https://retirefire.net/blog/when-can-you-stop-saving-for-retirement
```

You don’t need all of them in one sitting — do the first 5 if short on time.

---

## 2. Social pin (X / Twitter)

### A. Claim / create account

1. https://x.com/i/flow/signup (or log in)  
2. Suggested handle: `@retirefire` or `@retirefirenet` if taken  

### B. Bio (paste)

```text
Free FIRE calculators with transparent math.
Coast · Barista · FIRE number · years to FI.
No paywall. No hype. Methodology published.
```

Website / link: `https://retirefire.net`

### C. Post this thread, then pin it

Post as a **thread** (reply to your own post for 2–6):

**1/**  
```text
“When can I stop saving for retirement?”
is not the same as
“When can I retire?”

Coast FIRE is usually the right frame for the first question.
```

**2/**  
```text
Coast number ≈ full FIRE ÷ (1+r)^n

Example: $80k spend, 4% SWR → FIRE $2M.
Age 38 → 65 (27 yrs), 5% real → coast ≈ $534k.

Model says: if you hold ≥ that and life gates pass, aggressive retirement contributions might drop.
```

**3/**  
```text
What “stop saving” should mean in practice:
• Not zero savings forever
• Often keep employer match / emergency fund / anti-creep floor
• Still work for lifestyle until full FI or another plan
```

**4/**  
```text
Decision gates before you cut:
• Surplus still exists at lower r and stricter SWR
• Sequence stress tails acceptable
• Healthcare + emergency fund not inside the coast pile
• Partner saw the same share link
```

**5/**  
```text
Free tools for the workflow:
Coast calc + age table + free 1k-path stress test
Checklist: https://retirefire.net/resources/coast-fire-checklist
Guide: https://retirefire.net/blog/when-can-you-stop-saving-for-retirement
```

**6/**  
```text
Educational only. Prefer ranges over green lights.
Disclaimer: https://retirefire.net/disclaimer
```

### D. Pin

1. Open the **first** post of the thread on your profile  
2. Click **⋯** → **Pin to your profile**

### LinkedIn (optional, same day)

Paste a shortened version:

```text
“When can I stop saving for retirement?” ≠ “When can I retire?”

Coast FIRE answers the first question under clear assumptions.
We published free Coast tools + a basic sequence stress test + a printable checklist.

Coast: https://retirefire.net/calculators/coast-fire
Checklist: https://retirefire.net/resources/coast-fire-checklist

Educational only — not financial advice.
```

---

## 3. Auto-deploy (so you don’t need me next time)

GitHub Actions needs a clean token. **Easier option: connect GitHub inside Vercel** so every push to `main` deploys automatically.

### Path A — Connect Git (recommended)

1. https://vercel.com/dashboard → project **retirefire**  
2. **Settings** (top or gear)  
3. **Git**  
4. If it says **Connect Git Repository** / **Disconnected**:
   - Connect **GitHub**
   - Authorize **frobbmedia-creator/retirefire**
5. Production branch: **`main`**  
6. Save  
7. Test: any small push to `main` should create a new **Production** deployment automatically  

You may see toggles like:
- **Production Branch** = `main`  
- **Auto-deploy** enabled  

### Path B — Fix GitHub secret (only if you want Actions)

1. https://vercel.com/account/tokens → **Create**  
2. Copy token (one long string, **no spaces**, usually **no** `-` `.` `/` `:`)  
3. https://github.com/frobbmedia-creator/retirefire/settings/secrets/actions  
4. Update **`VERCEL_TOKEN`** → paste only the token → Save  
5. Tell agent: `token fixed` to re-test  

### Fallback if auto-deploy breaks again

From the machine that already logged into Vercel CLI (this project already works):

```bash
cd /Users/frobbclaw/retirefire
NODE_TLS_REJECT_UNAUTHORIZED=0 vercel deploy --prod --yes
```

(Agent can run this when asked: **redeploy**.)

---

## 4. Optional — Show HN (only after GSC + social if you want)

1. https://news.ycombinator.com/submit  
2. Title:

```text
Show HN: RetireFire – free FIRE calculators with published formulas and a free Monte Carlo stress test
```

3. URL: `https://retirefire.net`  
4. Or text post body from `docs/growth/18-show-hn-launch.md`  
5. Stay available 1–2 hours for comments  

---

## Quick “is production OK?” links

- https://retirefire.net/resources  
- https://retirefire.net/calculators/coast-fire  
- https://retirefire.net/blog/how-to-stress-test-coast-fire-number  
- https://retirefire.net/sitemap.xml  
