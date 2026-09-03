import { NextResponse } from "next/server";

export async function GET() {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  return NextResponse.json({
    api: "working",
    webhookConfigured: Boolean(webhookUrl),
    webhookHost: webhookUrl
      ? new URL(webhookUrl).hostname
      : null,
  });
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  console.log("[enquiry] API called");
  console.log("[enquiry] Webhook configured:", Boolean(webhookUrl));

  if (!webhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        step: "environment-variable",
        error: "GOOGLE_SHEETS_WEBHOOK_URL is missing",
      },
      { status: 503 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        step: "request-json",
        error: "Invalid JSON request",
      },
      { status: 400 }
    );
  }

  console.log("[enquiry] Request received");

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      redirect: "follow",
      cache: "no-store",
    });

    const text = await response.text();

    console.log("[enquiry] Apps Script status:", response.status);
    console.log("[enquiry] Apps Script response:", text);

    return NextResponse.json({
      ok: response.ok,
      step: "google-apps-script",
      status: response.status,
      response: text,
    });
  } catch (error) {
    console.error("[enquiry] Fetch failed:", error);

    return NextResponse.json(
      {
        ok: false,
        step: "google-apps-script-request",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 502 }
    );
  }
}