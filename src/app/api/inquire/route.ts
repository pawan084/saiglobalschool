import { NextResponse } from "next/server";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { isAllowedOrigin } from "@/lib/origin";
import { maskEmail } from "@/lib/log";
import { getSmtpConfig, sendSmtpMail } from "@/lib/smtp";

/**
 * Inquire / RSVP / tour-booking receiver.
 *
 * Sends a notification email to the school office and returns a tracking
 * reference. The client contract is stable across contact, inquiry and RSVP
 * forms.
 */

const MAX_FIELD_LEN = 200;
const MAX_TOPIC_LEN = 1000;
const MAX_GUESTS = 8;

function reference() {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `INQ-${ts}-${rnd}`;
}

function cap(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.slice(0, max);
}

function boundedInt(v: unknown, max: number): number | undefined {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0) return undefined;
  return Math.min(Math.floor(n), max);
}

type MailRow = readonly [label: string, value: string | undefined];

function mailRows(rows: MailRow[]) {
  return rows
    .filter((row): row is readonly [string, string] => Boolean(row[1]?.trim()))
    .map(([label, value]) => `${label.padEnd(16, " ")}: ${value.trim()}`);
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  // Rate limit per IP — 8 submissions per 5 minutes
  const key = clientKey(req);
  const rl = rateLimit(`inquire:${key}`, { limit: 8, windowMs: 5 * 60_000, banMs: 10 * 60_000 });
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please slow down." },
      {
        status: 429,
        headers: { "retry-after": String(Math.ceil(rl.retryAfterMs / 1000)) },
      }
    );
  }

  let body: Record<string, unknown> = {};
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const data = {
    name: cap(body.name, MAX_FIELD_LEN).trim(),
    email: cap(body.email, MAX_FIELD_LEN).trim().toLowerCase(),
    phone: cap(body.phone, MAX_FIELD_LEN),
    preferredContact: cap(body.preferred_contact, MAX_FIELD_LEN),
    bestTime: cap(body.best_time, MAX_FIELD_LEN),
    childName: cap(body.child_name, MAX_FIELD_LEN),
    childAge: cap(body.child_age, MAX_FIELD_LEN),
    grade: cap(body.grade, MAX_FIELD_LEN),
    currentSchool: cap(body.current_school, MAX_FIELD_LEN),
    currentCurriculum: cap(body.current_curriculum, MAX_FIELD_LEN),
    joiningTimeline: cap(body.joining_timeline, MAX_FIELD_LEN),
    tourType: cap(body.tour_type, MAX_FIELD_LEN),
    tourDate: cap(body.tour_date, MAX_FIELD_LEN),
    topic: cap(body.topic, MAX_TOPIC_LEN),
    message: cap(body.message, MAX_TOPIC_LEN),
    eventTitle: cap(body.eventTitle, MAX_FIELD_LEN),
    slot: cap(body.slot, MAX_FIELD_LEN),
    source: cap(body.source, MAX_FIELD_LEN) || "inquire",
    guests: boundedInt(body.guests, MAX_GUESTS),
  };

  if (!data.name) {
    return NextResponse.json({ ok: false, error: "Name is required" }, { status: 400 });
  }
  if (data.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }

  const ref = reference();
  const smtp = getSmtpConfig();
  if (!smtp) {
    console.error("[inquire] SMTP is not configured", { ref });
    return NextResponse.json(
      { ok: false, error: "Email is not configured. Please call or WhatsApp us." },
      { status: 500 }
    );
  }

  const recipient = process.env.SMTP_TO || process.env.SMTP_FROM || smtp.user;
  const from = process.env.SMTP_FROM || smtp.user;
  const subjectParts = ["SSSGS website inquiry", data.source, data.grade || data.topic || data.eventTitle]
    .filter(Boolean)
    .join(" - ");
  const contactRows = mailRows([
    ["Name", data.name],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone],
    ["Contact method", data.preferredContact],
    ["Best time", data.bestTime],
  ]);
  const inquiryRows = mailRows([
    ["Child name", data.childName],
    ["Child age", data.childAge],
    ["Child grade", data.grade],
    ["Current school", data.currentSchool],
    ["Curriculum", data.currentCurriculum],
    ["Joining timeline", data.joiningTimeline],
    ["Visit type", data.tourType],
    ["Preferred date", data.tourDate],
    ["Topic", data.topic],
    ["Event", data.eventTitle],
    ["Slot", data.slot],
    ["Guests", data.guests?.toString()],
  ]);
  const submittedAt = new Date().toLocaleString("en-SG", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Singapore",
  });
  const text = [
    "New SSSGS website enquiry",
    "========================",
    "",
    `Reference       : ${ref}`,
    `Submitted at    : ${submittedAt} SGT`,
    `Form source     : ${data.source}`,
    "",
    "Parent / Contact details",
    "------------------------",
    ...contactRows,
    ...(inquiryRows.length
      ? [
          "",
          "Inquiry details",
          "---------------",
          ...inquiryRows,
        ]
      : []),
    "",
    "Message:",
    data.message || "-",
    "",
    "Reply directly to this email to contact the parent.",
  ].join("\n");

  try {
    await sendSmtpMail(smtp, {
      to: recipient,
      from,
      replyTo: data.email || undefined,
      subject: subjectParts,
      text,
    });
  } catch (error) {
    console.error("[inquire] failed to send email", {
      ref,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { ok: false, error: "Could not send email right now. Please call or WhatsApp us." },
      { status: 502 }
    );
  }

  console.log("[inquire] received", {
    ref,
    source: data.source,
    emailMasked: data.email ? maskEmail(data.email) : undefined,
    grade: data.grade || undefined,
    eventTitle: data.eventTitle || undefined,
    topicLen: data.topic.length || undefined,
    guests: data.guests,
  });

  return NextResponse.json({ ok: true, reference: ref });
}
