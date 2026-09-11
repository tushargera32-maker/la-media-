import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";
import { sendAdminNotification } from "@/lib/resend";

/* ==================================================================
   Cashfree PG integration (direct REST, no SDK dependency).

   Env:
     CASHFREE_APP_ID, CASHFREE_SECRET_KEY, CASHFREE_ENV=sandbox|production
   ================================================================== */

const API_VERSION = "2023-08-01";

function baseUrl(): string {
  return process.env.CASHFREE_ENV === "production"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";
}

function credentials(): { appId: string; secret: string } {
  const appId = process.env.CASHFREE_APP_ID ?? "";
  const secret = process.env.CASHFREE_SECRET_KEY ?? "";
  if (!appId || !secret) {
    throw new Error("Cashfree API keys are not configured.");
  }
  return { appId, secret };
}

async function cfFetch(path: string, init?: RequestInit): Promise<unknown> {
  const { appId, secret } = credentials();
  const res = await fetch(`${baseUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-client-id": appId,
      "x-client-secret": secret,
      "x-api-version": API_VERSION,
      ...(init?.headers ?? {}),
    },
  });
  const data = (await res.json().catch(() => null)) as Record<string, unknown> | null;
  if (!res.ok) {
    const message =
      (data?.message as string) || `Cashfree API error (${res.status})`;
    throw new Error(message);
  }
  return data;
}

export type CashfreeOrder = {
  payment_session_id: string;
  order_id: string;
  order_status: string;
};

export async function createCashfreeOrder(input: {
  orderId: string;
  amount: number;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  returnUrl: string;
  notifyUrl: string;
}): Promise<CashfreeOrder> {
  const data = (await cfFetch("/orders", {
    method: "POST",
    body: JSON.stringify({
      order_id: input.orderId,
      order_amount: input.amount,
      order_currency: "INR",
      customer_details: {
        customer_id: input.customerId,
        customer_name: input.customerName,
        customer_email: input.customerEmail,
        customer_phone: input.customerPhone,
      },
      order_meta: {
        return_url: input.returnUrl,
        notify_url: input.notifyUrl,
      },
    }),
  })) as CashfreeOrder;
  if (!data?.payment_session_id) {
    throw new Error("Cashfree did not return a payment session.");
  }
  return data;
}

export type CashfreeOrderStatus = {
  order_status: string;
  cfPaymentId?: string;
  cfAmount?: number;
};

export async function fetchCashfreeOrderStatus(
  orderId: string
): Promise<CashfreeOrderStatus> {
  const data = (await cfFetch(`/orders/${encodeURIComponent(orderId)}`)) as {
    order_status?: string;
    payments?: { cf_payment_id?: string; payment_amount?: number }[];
    order_amount?: number;
  };
  const firstPayment = data?.payments?.[0];
  return {
    order_status: data?.order_status ?? "UNKNOWN",
    cfPaymentId: firstPayment?.cf_payment_id,
    cfAmount: firstPayment?.payment_amount ?? data?.order_amount,
  };
}

/** Verify Cashfree PG webhook signature (HMAC-SHA256 of timestamp + raw body). */
export function verifyCashfreeWebhook(
  rawBody: string,
  timestamp: string,
  signature: string
): boolean {
  const { secret } = credentials();
  if (!timestamp || !signature) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(timestamp + rawBody)
    .digest("base64");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function cashfreeMode(): "sandbox" | "production" {
  return (process.env.CASHFREE_ENV ?? "").toLowerCase() === "production"
    ? "production"
    : "sandbox";
}

function parseNotes(notes: string | null): Record<string, string> {
  try {
    const v: unknown = JSON.parse(notes ?? "{}");
    if (v && typeof v === "object") return v as Record<string, string>;
  } catch {
    /* ignore */
  }
  return {};
}

/**
 * Confirm a Cashfree order server-side and fulfil it exactly once.
 * Safe to call from webhook, return-URL polling, or admin retry.
 */
export async function markPaymentPaid(
  cfOrderId: string
): Promise<{ paid: boolean; alreadyFulfilled?: boolean }> {
  const payment = await prisma.payment.findUnique({
    where: { cfOrderId },
  });
  if (!payment) return { paid: false };
  if (payment.status === "paid") return { paid: true, alreadyFulfilled: true };

  const cf = await fetchCashfreeOrderStatus(cfOrderId);
  if (cf.order_status !== "PAID") return { paid: false };
  // Anti-tamper: amount paid must match the order amount.
  if (typeof cf.cfAmount === "number" && cf.cfAmount !== payment.amount) {
    console.error(`Payment amount mismatch for order ${cfOrderId}`);
    return { paid: false };
  }

  await prisma.payment.update({
    where: { cfOrderId },
    data: {
      status: "paid",
      cfPaymentId: cf.cfPaymentId ?? null,
      fulfilled: true,
    },
  });

  // Record the consultation inquiry so it appears in the existing admin flow.
  const notes = parseNotes(payment.notes);
  const inquiry = [
    `PAID CONSULTATION — ₹${payment.amount}`,
    `Cashfree payment: ${cf.cfPaymentId ?? "n/a"}`,
    `Service: ${notes.service || "Not specified"}`,
    `Location: ${notes.location || "Not specified"}`,
    `Project type: ${notes.projectType || "Not specified"}`,
    "",
    `Details: ${notes.message || "—"}`,
  ].join("\n");
  await prisma.contactSubmission.create({
    data: {
      name: payment.name,
      email: payment.email,
      phone: payment.phone,
      company: `Build Right (Paid) - ${notes.location || "—"}`,
      message: inquiry,
      status: "new",
    },
  });

  sendAdminNotification({
    type: "contact",
    name: payment.name,
    email: payment.email,
    details: `Phone: ${payment.phone}\n${inquiry}`,
  }).catch((err) => console.error("Failed to send payment admin email:", err));

  return { paid: true };
}
