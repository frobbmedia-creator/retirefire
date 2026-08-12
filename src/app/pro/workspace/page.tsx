import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProReportBuilder } from "@/components/pro/ProReportBuilder";
import { currentUser } from "@/lib/auth";
import { activeEntitlements } from "@/lib/entitlements";

export const metadata: Metadata = { title: "Your Pro Workspace", robots: { index: false, follow: false } };

export default async function ProWorkspacePage() {
  const user = await currentUser().catch(() => null);
  if (!user) redirect("/account/login?returnTo=/pro/workspace");
  const access = await activeEntitlements(user.id);
  if (!access.length) return <main className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="text-4xl font-semibold">Pro access required</h1><p className="mt-4 text-zinc-400">No active purchase is linked to your account.</p><div className="mt-7 flex justify-center gap-3"><Link href="/pro" className="inline-flex rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-zinc-950">View Pro access</Link><Link href="/account" className="inline-flex rounded-xl bg-zinc-800 px-6 py-3 font-semibold">Recover a purchase</Link></div></main>;
  return <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">Account access verified</p><h1 className="mt-2 text-4xl font-semibold">Your RetireFire workspace</h1><p className="mt-3 text-zinc-400">Plan: {access[0].plan}. Access is stored with {user.email}.</p></div><div className="flex gap-3"><form action="/api/stripe/portal" method="post"><button className="rounded-xl bg-zinc-800 px-4 py-3 text-sm font-semibold">Manage billing</button></form><Link href="/account" className="rounded-xl border border-zinc-700 px-4 py-3 text-sm">Account</Link></div></div><ProReportBuilder /></main>;
}
