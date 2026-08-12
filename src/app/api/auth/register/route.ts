import { NextResponse, type NextRequest } from "next/server";
import { createAccount, issueSession, safeReturnTo, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const returnTo = safeReturnTo(form.get("returnTo"));
  try {
    const user = await createAccount(String(form.get("email") || ""), String(form.get("password") || ""));
    const session = await issueSession(user.id);
    const response = NextResponse.redirect(new URL(returnTo, request.url), 303);
    setSessionCookie(response, session.token, session.expiresAt, request.nextUrl.protocol === "https:");
    return response;
  } catch (error) {
    const url = new URL("/account/register", request.url);
    url.searchParams.set("error", error instanceof Error ? error.message : "Unable to create account.");
    url.searchParams.set("returnTo", returnTo);
    return NextResponse.redirect(url, 303);
  }
}
