import { NextResponse } from "next/server";

/**
 * Admission application receiver — currently logs to server console + returns a fake
 * tracking reference. Wire to your CRM / email when keys land; client contract is stable.
 */

function reference() {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SSSGS-${ts}-${rnd}`;
}

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  if (typeof body["honey"] === "string" && body["honey"]) {
    // Honeypot — silently OK
    return NextResponse.json({ ok: true, reference: reference() });
  }

  const required = ["parentName", "parentEmail", "parentPhone", "childName", "childGrade"];
  for (const k of required) {
    if (!body[k]) {
      return NextResponse.json({ ok: false, error: `Missing field: ${k}` }, { status: 400 });
    }
  }

  // Stub: log essentials only (no PII at INFO level in real prod)
  const ref = reference();
  console.log("[apply] received", { ref, email: body.parentEmail, grade: body.childGrade });

  return NextResponse.json({ ok: true, reference: ref });
}
