import { NextResponse } from "next/server";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { isAllowedOrigin } from "@/lib/origin";
import { maskEmail } from "@/lib/log";

/**
 * Newsletter subscribe — currently logs to console.
 * Wire to your ESP (Resend/Mailchimp/Beehiiv) when you have API keys; the client
 * contract is unchanged.
 */

const MAX_EMAIL_LEN = 254; // RFC 5321 upper bound

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const key = clientKey(req);
  const rl = rateLimit(`newsletter:${key}`, {
    limit: 5,
    windowMs: 5 * 60_000,
    banMs: 15 * 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please slow down." },
      {
        status: 429,
        headers: { "retry-after": String(Math.ceil(rl.retryAfterMs / 1000)) },
      }
    );
  }

  let body: { email?: string; honey?: string } = {};
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }
    body = parsed as { email?: string; honey?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  if (body.honey) {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email || "").slice(0, MAX_EMAIL_LEN).trim().toLowerCase();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  console.log("[newsletter] subscribe:", maskEmail(email));

  return NextResponse.json({ ok: true });
}
