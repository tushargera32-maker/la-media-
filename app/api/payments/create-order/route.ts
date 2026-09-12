import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCashfreeOrder } from "@/lib/cashfree";
import { rateLimit, rateLimitResponse } from "@/lib/ratelimit";

/** Paid Build Right consultation fee (INR). GST-inclusive flat price. */
export const CONSULTATION_FEE = 10000;

function str(value: unknown, max = 300): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function siteUrl(request: Request): string {
  const env = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  if (env) return env;
  return new URL(request.url).origin;
}

export async function POST(request: Request) {
  if (!rateLimit(request, "payments:create-order", 10)) return rateLimitResponse();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  const d = body as Record<string, unknown>;

  const name = str(d.name, 120);
  const email = str(d.email, 190).toLowerCase();
  const digits = str(d.phone, 24).replace(/\D/g, "").slice(-10);
  const location = str(d.location, 100);
  const service = str(d.service, 120);
  const projectType = str(d.projectType, 60);
  const message = str(d.message, 1000);

  if (!name) return NextResponse.json({ error: "Full name is required." }, { status: 422 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required for payment receipt." }, { status: 422 });
  }
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return NextResponse.json({ error: "A valid 10-digit mobile number is required." }, { status: 422 });
  }

  if (!process.env.TURSO_DATABASE_URL && !process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Payments temporarily unavailable (database not configured)." },
      { status: 503 }
    );
  }

  const orderId = `BR-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const origin = siteUrl(request);

  try {
    await prisma.payment.create({
      data: {
        cfOrderId: orderId,
        amount: CONSULTATION_FEE,
        currency: "INR",
        status: "created",
        purpose: "consultation",
        name,
        email,
        phone: `+91${digits}`,
        notes: JSON.stringify({ location, service, projectType, message }),
      },
    });

    const order = await createCashfreeOrder({
      orderId,
      amount: CONSULTATION_FEE,
      customerId: `cus-${digits}`,
      customerName: name,
      customerEmail: email,
      customerPhone: digits,
      returnUrl: `${origin}/build-right/success?order_id=${orderId}`,
      notifyUrl: `${origin}/api/payments/webhook`,
    });

    return NextResponse.json(
      { order_id: orderId, payment_session_id: order.payment_session_id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Cashfree order creation failed:", error);
    await prisma.payment
      .update({ where: { cfOrderId: orderId }, data: { status: "failed" } })
      .catch(() => undefined);
    const message =
      error instanceof Error && process.env.CASHFREE_ENV !== "production"
        ? error.message
        : "We couldn't start the payment. Please try again.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
