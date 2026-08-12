# Customer Support Email Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish one canonical `support@retirefire.net` address in the four customer locations where help is most likely to be needed.

**Architecture:** Store the address on the existing `SITE` constant and render it through a small shared `SupportEmailLink` component in the footer, Account page, purchase-confirmation page, and Refund page. A render-level regression test verifies the customer-visible address and link target without adding a browser-testing dependency.

**Tech Stack:** Next.js 16, React 19, TypeScript, Node.js assertions, existing `tsx` test runner.

## Global Constraints

- Use the exact address `support@retirefire.net`.
- Add no contact form, support API, ticket database, or new third-party service.
- Store no support-message content in RetireFire.
- Keep AI assistance out of scope.

---

### Task 1: Canonical support address and customer links

**Files:**
- Create: `src/components/support/SupportEmailLink.tsx`
- Create: `src/components/support/SupportEmailLink.test.tsx`
- Modify: `src/lib/constants.ts`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/app/account/page.tsx`
- Modify: `src/app/pro/success/page.tsx`
- Modify: `src/app/refunds/page.tsx`
- Modify: `package.json`

**Interfaces:**
- Produces: `SITE.supportEmail: "support@retirefire.net"` and `SupportEmailLink({ className?: string })`
- Consumes: `SupportEmailLink` in all four customer-facing locations.

- [ ] **Step 1: Write the failing test**

Create `src/components/support/SupportEmailLink.test.tsx` that renders `SupportEmailLink` with React DOM’s server renderer and asserts the output contains the visible literal `support@retirefire.net` and `href="mailto:support@retirefire.net"`. Add `test:support` to `package.json`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test:support`

Expected: FAIL because `SupportEmailLink` does not exist.

- [ ] **Step 3: Add the canonical value and links**

Add `supportEmail: "support@retirefire.net"` to `SITE`. Create the shared component:

```tsx
export function SupportEmailLink({ className }: { className?: string }) {
  return <a className={className} href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>;
}
```

Import and render the component with concise surrounding copy appropriate to each page. Replace the Refund page’s instruction to use the feedback control.

- [ ] **Step 4: Run focused and full verification**

Run:

```bash
npm run test:support
npm run lint
npx tsc --noEmit
npm run test:calc
npm run build
```

Expected: all commands exit successfully.

- [ ] **Step 5: Publish and verify**

Create a feature branch, commit the plan and implementation, push it, open a draft PR, wait for Vercel Preview, merge after success, then verify the four public pages return HTTP 200 and contain `mailto:support@retirefire.net`.
