import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ProReportBuilder } from "@/components/pro/ProReportBuilder";
import { ENTITLEMENT_COOKIE, validateEntitlement, verifyEntitlement } from "@/lib/stripe/entitlement";

export const metadata: Metadata = { title: "Your Pro Workspace", robots: { index: false, follow: false } };

export default async function ProWorkspacePage() {
  const token = (await cookies()).get(ENTITLEMENT_COOKIE)?.value;
  const payload = verifyEntitlement(token);
  const active = payload ? await validateEntitlement(payload).catch(() => null) : null;
  if (!active) return <main className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="text-4xl font-semibold">Pro access required</h1><p className="mt-4 text-zinc-400">This browser does not have an active RetireFire purchase session.</p><Link href="/pro" className="mt-7 inline-flex rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-zinc-950">View Pro access</Link></main>;
  return <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">Access verified</p><h1 className="mt-2 text-4xl font-semibold">Your RetireFire workspace</h1><p className="mt-3 text-zinc-400">Plan: {active.payload.plan}. Billing status is checked securely with Stripe.</p></div><div className="flex gap-3">{active.payload.subscriptionId && <form action="/api/stripe/portal" method="post"><button className="rounded-xl bg-zinc-800 px-4 py-3 text-sm font-semibold">Manage billing</button></form>}<form action="/api/stripe/signout" method="post"><button className="rounded-xl border border-zinc-700 px-4 py-3 text-sm">Sign out here</button></form></div></div><ProReportBuilder /></main>;
}
