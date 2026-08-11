import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { getStripe } from "@/lib/stripe/client";
import { STRIPE_PLANS, type PlanId } from "@/lib/stripe/config";

export const metadata: Metadata = {
  title: "Purchase confirmed",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function ProSuccessPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;
  let purchase: { name: string; paid: boolean } | undefined;

  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      const plan = session.metadata?.plan as PlanId | undefined;
      if (
        session.metadata?.product === "retirefire_pro" &&
        plan &&
        plan in STRIPE_PLANS
      ) {
        purchase = {
          name: STRIPE_PLANS[plan].name,
          paid: session.payment_status === "paid",
        };
      }
    } catch (error) {
      console.error("[stripe/success] unable to retrieve session", error);
    }
  }

  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
      {purchase?.paid ? (
        <>
          <CheckCircle2 className="size-14 text-emerald-400" aria-hidden="true" />
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Payment confirmed
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50">
            Thank you for supporting RetireFire.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            Your purchase of {purchase.name} is complete.
            Stripe will send your receipt and purchase details by email.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50">
            We’re checking your payment.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            We could not verify this Checkout session yet. Check your Stripe
            receipt, or return to pricing and try again.
          </p>
        </>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/calculators"
          className="rounded-xl bg-emerald-500 px-5 py-3 font-medium text-zinc-950 transition hover:bg-emerald-400"
        >
          Explore calculators
        </Link>
        <Link
          href="/pro"
          className="rounded-xl bg-zinc-800 px-5 py-3 font-medium text-zinc-100 ring-1 ring-zinc-700 transition hover:bg-zinc-700"
        >
          Back to Pro
        </Link>
      </div>
    </main>
  );
}
