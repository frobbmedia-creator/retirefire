import Link from "next/link";

export function AccountForm({ mode, error, returnTo }: { mode: "login" | "register"; error?: string; returnTo: string }) {
  const register = mode === "register";
  return <main className="mx-auto max-w-md px-4 py-16 sm:py-24">
    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">RetireFire account</p>
    <h1 className="mt-3 text-4xl font-semibold text-zinc-50">{register ? "Create your account" : "Welcome back"}</h1>
    <p className="mt-4 text-zinc-400">{register ? "Save access and recover purchases on any device." : "Sign in to your plans, purchases, and billing controls."}</p>
    {error && <p role="alert" className="mt-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-200 ring-1 ring-red-500/30">{error}</p>}
    <form action={`/api/auth/${mode}`} method="post" className="mt-8 space-y-5">
      <input type="hidden" name="returnTo" value={returnTo} />
      <label className="block text-sm font-medium text-zinc-200">Email<input required autoComplete="email" type="email" name="email" className="mt-2 h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-zinc-50 outline-none focus:border-emerald-500" /></label>
      <label className="block text-sm font-medium text-zinc-200">Password<input required minLength={register ? 12 : undefined} autoComplete={register ? "new-password" : "current-password"} type="password" name="password" className="mt-2 h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-zinc-50 outline-none focus:border-emerald-500" />{register && <span className="mt-2 block text-xs text-zinc-500">Use at least 12 characters.</span>}</label>
      <button className="h-12 w-full rounded-xl bg-emerald-500 font-semibold text-zinc-950 hover:bg-emerald-400">{register ? "Create account" : "Sign in"}</button>
    </form>
    <p className="mt-6 text-sm text-zinc-400">{register ? "Already have an account?" : "New to RetireFire?"} <Link className="font-medium text-emerald-400" href={`${register ? "/account/login" : "/account/register"}?returnTo=${encodeURIComponent(returnTo)}`}>{register ? "Sign in" : "Create an account"}</Link></p>
  </main>;
}
