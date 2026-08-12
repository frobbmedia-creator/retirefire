import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { activeEntitlements } from "@/lib/entitlements";

export const metadata = { title: "Your RetireFire account", robots: { index: false } };
export default async function AccountPage({ searchParams }: { searchParams: Promise<{ recovered?: string; error?: string }> }) {
  const user = await currentUser().catch(() => null);
  if (!user) redirect("/account/login?returnTo=/account");
  const entitlements = await activeEntitlements(user.id);
  const params = await searchParams;
  return <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">Your account</p>
    <h1 className="mt-2 text-4xl font-semibold text-zinc-50">Account and purchases</h1>
    <p className="mt-3 text-zinc-400">Signed in as {user.email}</p>
    {params.recovered && <p role="status" className="mt-6 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100 ring-1 ring-emerald-500/30">Purchase recovery finished. {params.recovered} purchase(s) linked.</p>}
    {params.error && <p role="alert" className="mt-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-200 ring-1 ring-red-500/30">{params.error}</p>}
    <section className="mt-8 rounded-2xl bg-zinc-900/60 p-6 ring-1 ring-zinc-800"><h2 className="text-xl font-semibold text-zinc-50">Access</h2>
      {entitlements.length ? <ul className="mt-4 space-y-3">{entitlements.map((item, index) => <li key={`${item.stripe_checkout_session_id}-${index}`} className="flex items-center justify-between rounded-xl bg-zinc-950/60 px-4 py-3"><span className="capitalize text-zinc-200">{item.plan} access</span><span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase text-emerald-300">{item.status}</span></li>)}</ul> : <p className="mt-3 text-zinc-400">No active purchase is linked yet.</p>}
      <div className="mt-6 flex flex-wrap gap-3">{entitlements.length > 0 && <><Link href="/pro/workspace" className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-zinc-950">Open Pro workspace</Link><form action="/api/stripe/portal" method="post"><button className="rounded-xl bg-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-100">Manage billing</button></form></>}<form action="/api/stripe/recover" method="post"><button className="rounded-xl border border-zinc-700 px-4 py-3 text-sm font-semibold text-zinc-200">Recover purchases</button></form></div>
      <p className="mt-4 text-xs leading-relaxed text-zinc-500">Recovery searches Stripe for completed purchases made with this account’s email address.</p>
    </section>
    <form action="/api/auth/logout" method="post" className="mt-8"><button className="text-sm text-zinc-400 underline underline-offset-4 hover:text-zinc-200">Sign out</button></form>
  </main>;
}
