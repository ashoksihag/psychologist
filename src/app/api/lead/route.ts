import { NextResponse } from "next/server";

import type { LeadPayload } from "@/content/form-options";

/**
 * Lead intake → automation bridge.
 *
 * The browser POSTs JSON here; this handler validates, then forwards to
 * LEAD_WEBHOOK_URL (Make.com / Pabbly Connect / Zapier / n8n …) server-side,
 * so the automation endpoint is never shipped in the client bundle.
 *
 * Environment:
 *   LEAD_WEBHOOK_URL  — destination endpoint (required to deliver)
 *   LEAD_WEBHOOK_TOKEN — optional bearer token / shared secret
 */

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BODY_BYTES = 16_000;

type ValidationResult =
  | { ok: true; data: LeadPayload }
  | { ok: false; errors: Record<string, string> };

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validate(body: unknown): ValidationResult {
  const input = (body ?? {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const name = str(input.name);
  const phone = str(input.phone);
  const email = str(input.email);
  const seekingSupportFor = str(input.seekingSupportFor);
  const primaryConcern = str(input.primaryConcern);
  const preferredMode = str(input.preferredMode);
  const notes = str(input.notes);

  if (name.length < 2) errors.name = "Full name is required.";
  if (phone.replace(/\D/g, "").length < 10) {
    errors.phone = "A reachable phone number is required.";
  }
  if (email && !EMAIL_RE.test(email)) errors.email = "Invalid email address.";
  if (!seekingSupportFor) {
    errors.seekingSupportFor = "Select who is seeking support.";
  }
  if (!primaryConcern) errors.primaryConcern = "Select a primary concern.";
  if (!preferredMode) errors.preferredMode = "Select a preferred mode.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      phone,
      email,
      seekingSupportFor,
      primaryConcern,
      preferredMode,
      notes: notes || undefined,
      source: str(input.source) || "manmitra-website",
      submittedAt: str(input.submittedAt) || new Date().toISOString(),
    },
  };
}

export async function POST(request: Request) {
  // 1. Cheap abuse guard: reject oversized bodies before parsing.
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Request too large." },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  // 2. Validate shape before anything leaves the server.
  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fieldErrors: result.errors },
      { status: 422 },
    );
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    // Local development / preview: accept and log so the flow is testable.
    if (process.env.NODE_ENV !== "production") {
      console.info("[manmitra] LEAD_WEBHOOK_URL not set — lead captured locally:", {
        ...result.data,
      });
      return NextResponse.json({ ok: true, delivered: false, mode: "log" });
    }
    return NextResponse.json(
      { error: "Enquiries are temporarily unavailable. Please call the clinic." },
      { status: 503 },
    );
  }

  // 3. Forward to the automation endpoint.
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (process.env.LEAD_WEBHOOK_TOKEN) {
    headers.Authorization = `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}`;
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(result.data),
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      console.error(
        `[manmitra] webhook responded ${upstream.status}`,
        await upstream.text().catch(() => ""),
      );
      return NextResponse.json(
        { error: "We could not reach our enquiry service. Please call the clinic." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[manmitra] webhook delivery failed:", error);
    return NextResponse.json(
      { error: "We could not send your request. Please call the clinic." },
      { status: 502 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: true, endpoint: "manmitra/lead", configured: Boolean(process.env.LEAD_WEBHOOK_URL) },
    { status: 200 },
  );
}
