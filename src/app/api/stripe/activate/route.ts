import { type NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import {
  ENTITLEMENT_COOKIE,
  signEntitlement,
} from "@/lib/stripe/entitlement";
import { STRIPE_PLANS, type PlanId } from "@/lib/stripe/config";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  const failure = new URL("/pro?activation=failed", request.url);
  if (!sessionId?.startsWith("cs_")) return NextResponse.redirect(failure);

  try {
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

    const customerId =
      typeof session.customer === "string" ? session.customer : undefined;
    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : undefined;
    const maxAge = plan === "report" ? 365 * 24 * 60 * 60 : 30 * 24 * 60 * 60;
    const token = signEntitlement({
      plan,
      sessionId,
      customerId,
      subscriptionId,
      exp: Date.now() + maxAge * 1000,
    });
    const response = NextResponse.redirect(new URL("/pro/workspace", request.url));
    response.cookies.set(ENTITLEMENT_COOKIE, token, {
      httpOnly: true,
      secure: request.nextUrl.protocol === "https:",
      sameSite: "lax",
      path: "/",
      maxAge,
      priority: "high",
    });
    return response;
  } catch (error) {
    console.error("[stripe/activate]", error);
    return NextResponse.redirect(failure);
  }
}
