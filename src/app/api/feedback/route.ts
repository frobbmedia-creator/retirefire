import { NextResponse } from "next/server";

type FeedbackBody = {
  message?: string;
  email?: string;
  /** Honeypot — must stay empty */
  website?: string;
};

const MAX_MESSAGE = 4000;
const MAX_EMAIL = 254;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * FormSubmit — only needs FEEDBACK_TO_EMAIL (no API key, no domain verify).
 * First submission sends an activation link to that inbox; after confirm, mail flows.
 * https://formsubmit.co/ajax-documentation
 */
async function sendViaFormSubmit(opts: {
  to: string;
  email: string;
  message: string;
}): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(opts.to)}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: "RetireFire visitor",
      email: opts.email || "noreply@retirefire.net",
      _replyto: opts.email || opts.to,
      _subject: opts.email
        ? `RetireFire feedback from ${opts.email}`
        : "RetireFire feedback",
      _template: "table",
      _captcha: "false",
      message: opts.message,
      source: "retirefire.net",
      submitted_at: new Date().toISOString(),
    }),
  });

  const raw = await res.text().catch(() => "");
  let data: { success?: string | boolean; message?: string } = {};
  try {
    data = JSON.parse(raw) as typeof data;
  } catch {
    /* non-JSON */
  }

  if (!res.ok) {
    console.error("FormSubmit error", res.status, raw.slice(0, 500));
    // Common first-time / blocked cases
    if (/activate|confirm|check your email/i.test(raw)) {
      return {
        ok: false,
        status: 502,
        error:
          "Check the FEEDBACK_TO_EMAIL inbox for a FormSubmit activation link, then try again.",
      };
    }
    return {
      ok: false,
      status: 502,
      error: data.message || "Could not send feedback. Please try again.",
    };
  }

  // FormSubmit returns 200 with success: false in some cases
  if (data.success === false || data.success === "false") {
    console.error("FormSubmit rejected", data);
    return {
      ok: false,
      status: 502,
      error: data.message || "Could not send feedback. Please try again.",
    };
  }

  return { ok: true };
}

async function sendViaWeb3Forms(opts: {
  accessKey: string;
  email: string;
  message: string;
}): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: opts.accessKey,
      subject: opts.email
        ? `RetireFire feedback from ${opts.email}`
        : "RetireFire feedback",
      from_name: "RetireFire",
      email: opts.email || "anonymous@retirefire.net",
      message: opts.message,
      ...(opts.email ? { replyto: opts.email } : {}),
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };

  if (!res.ok || data.success === false) {
    console.error("Web3Forms error", res.status, data);
    return {
      ok: false,
      status: 502,
      error: data.message || "Could not send feedback. Please try again.",
    };
  }
  return { ok: true };
}

export async function POST(request: Request) {
  let body: FeedbackBody;
  try {
    body = (await request.json()) as FeedbackBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const message = (body.message ?? "").trim();
  const email = (body.email ?? "").trim();

  if (message.length < 3) {
    return NextResponse.json(
      { error: "Please write a short message." },
      { status: 400 },
    );
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }
  if (email && (email.length > MAX_EMAIL || !isValidEmail(email))) {
    return NextResponse.json({ error: "That email looks invalid." }, { status: 400 });
  }

  const to = (process.env.FEEDBACK_TO_EMAIL ?? "").trim();
  const web3Key = (process.env.WEB3FORMS_ACCESS_KEY ?? "").trim();

  // Prefer Web3Forms when explicitly configured
  if (web3Key) {
    const result = await sendViaWeb3Forms({
      accessKey: web3Key,
      email,
      message,
    });
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }
    return NextResponse.json({ ok: true });
  }

  // Default: FormSubmit with FEEDBACK_TO_EMAIL only (no Resend domain/API limits)
  if (to && isValidEmail(to)) {
    const result = await sendViaFormSubmit({ to, email, message });
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }
    return NextResponse.json({ ok: true });
  }

  console.error(
    "Feedback API missing FEEDBACK_TO_EMAIL (valid email) or WEB3FORMS_ACCESS_KEY",
  );
  return NextResponse.json(
    {
      error:
        "Feedback is not configured. Set FEEDBACK_TO_EMAIL in Vercel to a real inbox, then redeploy.",
    },
    { status: 503 },
  );
}
