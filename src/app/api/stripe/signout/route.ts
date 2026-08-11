import { type NextRequest, NextResponse } from "next/server";
import { ENTITLEMENT_COOKIE } from "@/lib/stripe/entitlement";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/pro", request.url), 303);
  response.cookies.delete(ENTITLEMENT_COOKIE);
  return response;
}
