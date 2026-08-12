import { NextResponse, type NextRequest } from "next/server";
import { authenticate, issueSession, safeReturnTo, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const returnTo = safeReturnTo(form.get("returnTo"));
  const user = await authenticate(String(form.get("email") || ""), String(form.get("password") || "")).catch(() => null);
  if (!user) {
    const url = new URL("/account/login", request.url);
    url.searchParams.set("error", "Email or password is incorrect.");
    url.searchParams.set("returnTo", returnTo);
    return NextResponse.redirect(url, 303);
  }
  const session = await issueSession(user.id);
  const response = NextResponse.redirect(new URL(returnTo, request.url), 303);
  setSessionCookie(response, session.token, session.expiresAt, request.nextUrl.protocol === "https:");
  return response;
}
