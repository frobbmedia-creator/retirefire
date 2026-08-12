import { NextResponse, type NextRequest } from "next/server";
import { revokeSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  await revokeSession(request.cookies.get(SESSION_COOKIE)?.value).catch(() => undefined);
  const response = NextResponse.redirect(new URL("/", request.url), 303);
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
