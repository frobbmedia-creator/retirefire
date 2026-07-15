import { NextResponse } from "next/server";

/**
 * Public config for the feedback widget.
 * Recipient email is intentionally exposed — it is the public feedback inbox.
 * FormSubmit (and similar free form APIs) block many cloud IPs on free tiers,
 * so the browser must POST to them directly.
 */
export async function GET() {
  const to = (process.env.FEEDBACK_TO_EMAIL ?? "").trim();
  const web3Key = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "").trim()
    || (process.env.WEB3FORMS_ACCESS_KEY ?? "").trim();

  if (web3Key) {
    return NextResponse.json({
      configured: true,
      provider: "web3forms" as const,
      accessKey: web3Key,
    });
  }

  if (to && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return NextResponse.json({
      configured: true,
      provider: "formsubmit" as const,
      to,
    });
  }

  return NextResponse.json({
    configured: false,
    provider: null,
    error:
      "Set FEEDBACK_TO_EMAIL in Vercel (Production) to a real inbox, then redeploy.",
  });
}

/** Kept for honeypot / future server providers; widget uses client-side providers. */
export async function POST() {
  return NextResponse.json(
    {
      error:
        "Use the on-page form. Server-side form APIs are blocked on free tiers.",
    },
    { status: 405 },
  );
}
