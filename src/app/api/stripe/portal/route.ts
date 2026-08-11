import { type NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import {
  ENTITLEMENT_COOKIE,
  validateEntitlement,
  verifyEntitlement,
} from "@/lib/stripe/entitlement";

export async function POST(request: NextRequest) {
  const payload = verifyEntitlement(
    request.cookies.get(ENTITLEMENT_COOKIE)?.value,
  );
  if (!payload?.customerId) {
    return NextResponse.redirect(new URL("/pro?access=required", request.url), 303);
  }
  const active = await validateEntitlement(payload);
  if (!active) {
    return NextResponse.redirect(new URL("/pro?access=expired", request.url), 303);
  }
  const portal = await getStripe().billingPortal.sessions.create({
    customer: payload.customerId,
    return_url: new URL("/pro/workspace", request.url).toString(),
  });
  return NextResponse.redirect(portal.url, 303);
}
