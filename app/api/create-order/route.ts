import { randomUUID } from "node:crypto";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { pricingPlans } from "@/lib/data";

export const runtime = "nodejs";

function getStatusCode(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null || !("statusCode" in error)) {
    return undefined;
  }

  const statusCode = error.statusCode;
  if (typeof statusCode === "number") return statusCode;
  if (typeof statusCode === "string") return Number(statusCode);
  return undefined;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    Array.isArray(body) ||
    !("planId" in body)
  ) {
    return NextResponse.json({ error: "A valid plan is required." }, { status: 400 });
  }

  const planId = body.planId;
  if (typeof planId !== "string" || "amount" in body) {
    return NextResponse.json(
      { error: "A valid plan is required. Amounts cannot be supplied." },
      { status: 400 }
    );
  }

  const plan = pricingPlans.find(
    (candidate) => candidate.payment?.id === planId
  );
  if (!plan?.payment || !Number.isSafeInteger(plan.payment.amountInPaise)) {
    return NextResponse.json(
      { error: "This plan is not available for payment." },
      { status: 400 }
    );
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.error("[razorpay] Server credentials are not configured.");
    return NextResponse.json(
      { error: "Payment service is not configured. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
    const order = await razorpay.orders.create({
      amount: plan.payment.amountInPaise,
      currency: "INR",
      receipt: `pay_${randomUUID().replaceAll("-", "")}`,
    });

    if (
      typeof order.id !== "string" ||
      Number(order.amount) !== plan.payment.amountInPaise ||
      order.currency !== "INR"
    ) {
      console.error("[razorpay] Order creation returned unexpected order details.");
      return NextResponse.json(
        { error: "Unable to create a valid payment order. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      order_id: order.id,
      amount: Number(order.amount),
      currency: order.currency,
      key_id: keyId,
      name: "TechsBridge",
      description: `${plan.name} plan — ${plan.price} initial payment`,
    });
  } catch (error) {
    const statusCode = getStatusCode(error);

    if (statusCode === 401) {
      console.error("[razorpay] Order creation failed: authentication rejected.");
      return NextResponse.json(
        { error: "Razorpay authentication failed. Check the server credentials." },
        { status: 401 }
      );
    }

    console.error(
      "[razorpay] Order creation failed:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Unable to create a payment order. Please try again." },
      { status: 500 }
    );
  }
}
