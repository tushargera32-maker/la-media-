import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { markPaymentPaid } from "@/lib/cashfree";

/** Client polling fallback — confirms status server-side (never trust the browser). */
export async function GET(request: Request) {
  const orderId = new URL(request.url).searchParams.get("order_id") ?? "";
  if (!orderId) return NextResponse.json({ error: "Missing order id." }, { status: 400 });

  const payment = await prisma.payment.findUnique({ where: { cfOrderId: orderId } });
  if (!payment) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  if (payment.status === "paid") {
    return NextResponse.json({ status: "paid", order_id: orderId });
  }

  try {
    const result = await markPaymentPaid(orderId);
    const fresh = result.paid
      ? "paid"
      : (await prisma.payment.findUnique({ where: { cfOrderId: orderId } }))?.status ?? "created";
    return NextResponse.json({ status: fresh, order_id: orderId });
  } catch (error) {
    console.error("Payment status check failed:", error);
    return NextResponse.json({ status: payment.status, order_id: orderId });
  }
}
