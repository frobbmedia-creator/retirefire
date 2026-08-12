import { type NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import { STRIPE_PLANS, type PlanId } from "@/lib/stripe/config";
import { requestUser } from "@/lib/auth";
import { upsertCheckoutEntitlement } from "@/lib/entitlements";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  const failure = new URL("/pro?activation=failed", request.url);
  if (!sessionId?.startsWith("cs_")) return NextResponse.redirect(failure);

  try {
    const user = await requestUser(request);
    if (!user) {
      const login = new URL("/account/login", request.url);
      login.searchParams.set("returnTo", `/api/stripe/activate?session_id=${encodeURIComponent(sessionId)}`);
      return NextResponse.redirect(login);
    }
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const plan = session.metadata?.plan as PlanId | undefined;
    if (
      !plan ||
      !(plan in STRIPE_PLANS) ||
      session.metadata?.product !== "retirefire_pro" ||
      !["paid", "no_payment_required"].includes(session.payment_status)
    ) {
      return NextResponse.redirect(failure);
    }
    if (session.metadata?.user_id && session.metadata.user_id !== user.id) {
      return NextResponse.redirect(failure);
    }

    const customerId =
      typeof session.customer === "string" ? session.customer : undefined;
    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : undefined;
    await upsertCheckoutEntitlement({
      userId: user.id,
      plan,
      status: plan === "report" ? "lifetime" : "active",
      sessionId,
      customerId,
      subscriptionId,
    });
    const response = NextResponse.redirect(new URL("/pro/workspace", request.url));
    return response;
  } catch (error) {
    console.error("[stripe/activate]", error);
    return NextResponse.redirect(failure);
  }
}
