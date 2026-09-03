import { NextResponse } from "next/server";
import { serviceOptions, budgetOptions } from "@/lib/data";
import { isValidEmail, isValidPhone, sanitizeText } from "@/lib/utils";

const WEBHOOK_TIMEOUT_MS = 30_000;

type EnquiryPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  description: string;
};

function validate(
  body: Record<string, unknown>
): { data?: EnquiryPayload; error?: string } {
  const name = sanitizeText(body.name, 120);
  const email = sanitizeText(body.email, 200);
  const phone = sanitizeText(body.phone, 30);
  const company = sanitizeText(body.company, 160);
  const service = sanitizeText(body.service, 120);
  const budget = sanitizeText(body.budget, 60);

  // Accept "description" as the primary field.
  // Also accept "details" so the API remains compatible
  // if your frontend still sends the old field name.
  const description = sanitizeText(
    body.description ?? body.details,
    3000
  );

  if (!name) {
    return { error: "Name is required." };
  }

  if (!email || !isValidEmail(email)) {
    return { error: "A valid email is required." };
  }

  if (!phone || !isValidPhone(phone)) {
    return { error: "A valid phone number is required." };
  }

  if (!service || !serviceOptions.includes(service)) {
    return { error: "Please select a service." };
  }

  if (!budget || !budgetOptions.includes(budget)) {
    return { error: "Please select a budget range." };
  }

  if (!description) {
    return { error: "Please describe your project." };
  }

  return {
    data: {
      name,
      email,
      phone,
      company,
      service,
      budget,
      description,
    },
  };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid request.",
      },
      { status: 400 }
    );
  }

  const { data, error } = validate(body);

  if (!data) {
    return NextResponse.json(
      {
        ok: false,
        error,
      },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error(
      "[enquiry] GOOGLE_SHEETS_WEBHOOK_URL is not set."
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          "Enquiry service is not configured yet. Please try again later.",
      },
      { status: 503 }
    );
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, WEBHOOK_TIMEOUT_MS);

  try {
    console.log("[enquiry] Forwarding enquiry to Google Sheets...");

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal: controller.signal,
      redirect: "follow",
      cache: "no-store",
    });

    const responseText = await response.text();

    console.log(
      "[enquiry] Google Apps Script response:",
      response.status,
      responseText
    );

    if (!response.ok) {
      throw new Error(
        `Webhook responded with status ${response.status}: ${responseText}`
      );
    }

    let result: {
      success?: boolean;
      message?: string;
      error?: string;
    } | null = null;

    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error(
        "Google Apps Script returned an invalid JSON response."
      );
    }

    if (result?.success === false) {
      throw new Error(
        result.error ||
          result.message ||
          "Google Apps Script reported failure."
      );
    }

    if (result?.success !== true) {
      throw new Error(
        "Google Apps Script did not confirm successful submission."
      );
    }

    console.log("[enquiry] Enquiry successfully saved.");

    return NextResponse.json({
      ok: true,
      message: "Enquiry submitted successfully.",
    });
  } catch (err) {
    const isAbort =
      err instanceof Error && err.name === "AbortError";

    console.error(
      `[enquiry] Failed to forward enquiry to Google Sheets${
        isAbort ? " (timed out)" : ""
      }:`,
      err instanceof Error ? err.message : err
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong while sending your enquiry. Please try again or contact us directly.",
      },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeout);
  }
}