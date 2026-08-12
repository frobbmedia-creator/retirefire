import { NextResponse, type NextRequest } from "next/server";
import { requestUser } from "@/lib/auth";
import { getStripe } from "@/lib/stripe/client";
import { STRIPE_PLANS, type PlanId } from "@/lib/stripe/config";
import { upsertCheckoutEntitlement } from "@/lib/entitlements";

export async function POST(request: NextRequest) {
  const user = await requestUser(request).catch(() => null);
  if (!user) return NextResponse.redirect(new URL("/account/login?returnTo=/account", request.url), 303);
  try {
    const stripe = getStripe();
    const customers = await stripe.customers.list({ email: user.email, limit: 100 });
    let recovered = 0;
    for (const customer of customers.data) {
      const sessions = await stripe.checkout.sessions.list({ customer: customer.id, limit: 100 });
      for (const session of sessions.data) {
        const plan = session.metadata?.plan as PlanId | undefined;
        if (!plan || !(plan in STRIPE_PLANS) || session.metadata?.product !== "retirefire_pro" || !["paid", "no_payment_required"].includes(session.payment_status)) continue;
        let status = plan === "report" ? "lifetime" : "active";
        const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          status = subscription.status;
          if (!["active", "trialing"].includes(status)) continue;
        }
        await upsertCheckoutEntitlement({ userId: user.id, plan, status, sessionId: session.id, customerId: customer.id, subscriptionId });
        recovered += 1;
      }
    }
    return NextResponse.redirect(new URL(`/account?recovered=${recovered}`, request.url), 303);
  } catch (error) {
    console.error("[stripe/recover]", error);
    return NextResponse.redirect(new URL("/account?error=Purchase%20recovery%20could%20not%20be%20completed.", request.url), 303);
  }
}
