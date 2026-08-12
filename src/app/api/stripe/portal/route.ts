import { type NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import { requestUser } from "@/lib/auth";
import { activeEntitlements } from "@/lib/entitlements";

export async function POST(request: NextRequest) {
  const user = await requestUser(request).catch(() => null);
  if (!user) return NextResponse.redirect(new URL("/account/login?returnTo=/account", request.url), 303);
  const customerId = (await activeEntitlements(user.id)).find((item) => item.stripe_customer_id)?.stripe_customer_id;
  if (!customerId) {
    return NextResponse.redirect(new URL("/pro?access=expired", request.url), 303);
  }
  const portal = await getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: new URL("/account", request.url).toString(),
  });
  return NextResponse.redirect(portal.url, 303);
}
