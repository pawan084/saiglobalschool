import { NextResponse } from "next/server";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { maskEmail } from "@/lib/log";

/**
 * Admission application receiver — currently logs a sanitized record + returns a
 * tracking reference. Wire to your CRM / email when keys land; client contract
 * is stable.
 */

const MAX_FIELD_LEN = 500;
const MAX_NOTES_LEN = 2000;

/** Same-origin check: rejects cross-origin POSTs to thwart CSRF / scraping.
 *  Browsers send Origin on every cross-origin write. Same-origin browser POSTs
 *  send Origin = our host. Server-to-server requests typically have no Origin
 *  — those we let through (rate limiting + honeypot still apply). */
function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // no Origin → not a browser cross-origin write
  try {
    const reqUrl = new URL(req.url);
    const originUrl = new URL(origin);
    return reqUrl.host === originUrl.host;
  } catch {
    return false;
  }
}

function reference() {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SSSGS-${ts}-${rnd}`;
}

function cap(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.slice(0, max);
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  // Rate limit per IP — 6 applications per 10 minutes is generous for a
  // legitimate family but kills script abuse.
  const key = clientKey(req);
  const rl = rateLimit(`apply:${key}`, {
    limit: 6,
    windowMs: 10 * 60_000,
    banMs: 20 * 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please slow down." },
      {
        status: 429,
        headers: { "retry-after": String(Math.ceil(rl.retryAfterMs / 1000)) },
      }
    );
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  if (typeof body.honey === "string" && body.honey) {
    // Honeypot — silently OK
    return NextResponse.json({ ok: true, reference: reference() });
  }

  // Cap every field so giant blobs can't exhaust memory / log lines.
  const data = {
    parentName: cap(body.parentName, MAX_FIELD_LEN),
    parentEmail: cap(body.parentEmail, MAX_FIELD_LEN),
    parentPhone: cap(body.parentPhone, MAX_FIELD_LEN),
    childName: cap(body.childName, MAX_FIELD_LEN),
    childGrade: cap(body.childGrade, MAX_FIELD_LEN),
    notes: cap(body.notes, MAX_NOTES_LEN),
  };

  const required = ["parentName", "parentEmail", "parentPhone", "childName", "childGrade"] as const;
  for (const k of required) {
    if (!data[k]) {
      return NextResponse.json({ ok: false, error: `Missing field: ${k}` }, { status: 400 });
    }
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.parentEmail)) {
    return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }

  const ref = reference();
  // Log only sanitized, non-PII fields at INFO level. Mask the email.
  console.log("[apply] received", {
    ref,
    emailMasked: maskEmail(data.parentEmail),
    grade: data.childGrade,
  });

  return NextResponse.json({ ok: true, reference: ref });
}
