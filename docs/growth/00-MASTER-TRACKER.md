# RetireFire.net — Master Execution Tracker

**Spec:** Aggressive Growth + Monetization Roadmap v1.0  
**Start:** 2026-07-15  
**Target monetization readiness:** ~Week 11–12 (Oct 2026)  
**Operating mode:** Grok executes autonomously; user approves major decisions / provides access when blocked.

## Status legend

- `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked on user

---

## Phase 1 — Foundation Sprint (Week 1–2)

| Task | Status | Notes |
|------|--------|-------|
| 1.1 Analytics & measurement | `[~]` | Vercel Analytics live. GA4/GSC/Plausible setup guide shipped. Event hooks in code. User must complete GSC DNS + optional GA4/Plausible keys. |
| 1.2 Competitor & keyword baseline | `[x]` | See `01-competitor-keyword-baseline.md` |
| 1.3 Site polish & authority | `[~]` | Approach page, CSV export, event tracking, hero/copy, schema notes shipped. Deploy pending. |
| 1.4 Social foundation | `[x]` | Profiles copy + first 10 posts + 30-day system in `03-social-foundation.md` |
| Content wave 1 outlines | `[x]` | Calendar + 2 pillar drafts in content docs |

### Week 2 success criteria

- [x] Analytics plan + hooks ready (Vercel already live)
- [x] Authority / Approach page written
- [x] Social profiles + first posts drafted
- [x] First content pieces outlined/drafted
- [ ] User: GSC verified + sitemap submitted (access required)
- [ ] User: Social accounts live with copy applied
- [ ] Deploy Phase 1 code to production

---

## Phase 2 — Tool + Content (Week 3–6)

| Task | Status | Notes |
|------|--------|-------|
| 2.1 Monte Carlo stress-test MVP | `[x]` | Free 1k-path stress test on Coast + Years; methodology updated |
| 2.2 UX backlog (export, scenarios, Pro labels) | `[~]` | A/B compare shipped; saved accounts still later |
| 2.3 Content engine (8–12 pieces / 6 weeks) | `[~]` | 6+ new pillars; checklist resource; MC vs history post |
| 2.4 Social amplification daily | `[ ]` | System designed; needs account ownership |

---

## Phase 3 — Scale (Week 7–10)

| Task | Status |
|------|--------|
| 3.1 Backlink / outreach | `[~]` | 30-day list + pitch templates in `13-outreach-30day.md` |
| 3.2 Email list + lead magnets | `[~]` | Checklist + sequence guide live; welcome copy in `14-email-welcome-sequence.md` |
| 3.3 Technical SEO scale | `[~]` | Audit in `15-technical-seo-audit.md`; resources hub + internal links improved |

---

## Phase 4 — Monetization (Week 11–12)

| Task | Status |
|------|--------|
| 4.1 Freemium design + Stripe | `[ ]` — needs user pricing approval |
| 4.2 Soft launch + optimize | `[ ]` |

---

## User action required (only when blocked)

1. **Google Search Console** — verify domain DNS, submit `https://retirefire.net/sitemap.xml`
2. **Optional:** create GA4 property + Plausible site; add env vars (see analytics guide)
3. **Social:** create/claim X + LinkedIn pages; paste bios from social doc
4. **Later:** Stripe account + final pricing approval
5. **Deploy:** merge/push Phase 1 commits if not auto-deployed

---

## Weekly rhythm

- **Monday:** Metrics report (`docs/reports/YYYY-WXX.md`) + 3 recommended actions
- **Tue–Thu:** Content production + social batch
- **Fri:** Feature/code ship window + review accuracy/transparency
- **Ongoing:** Integrity guardrails — no hype CTAs; disclaimers stay prominent

---

## File index

| File | Purpose |
|------|---------|
| `00-MASTER-TRACKER.md` | This file |
| `01-competitor-keyword-baseline.md` | Competitors + 25 keywords |
| `02-analytics-setup.md` | GA4 / GSC / Plausible / events |
| `03-social-foundation.md` | Bios, posts, 30-day system |
| `04-monte-carlo-spec.md` | Stress-test technical spec |
| `05-content-calendar-60d.md` | 60-day calendar |
| `06-feature-backlog-freemium.md` | Prioritized calculator backlog |
| `07-homepage-ux-copy.md` | Homepage/calculator copy notes |
| `08-schema-jsonld.md` | Calculator + FAQ schema reference |
| `09-weekly-metrics-template.md` | Monday report template |
| `10-lead-magnets-email.md` | Phase 3 prep (drafted early) |
| `11-freemium-pricing-draft.md` | Phase 4 design (needs approval) |
| `EXECUTION-SPEC-v1.md` | Full handoff spec snapshot |
