import { NextResponse } from "next/server";
import { verifyCashfreeWebhook, markPaymentPaid } from "@/lib/cashfree";

/** Cashfree notify_url — verifies signature, then fulfils paid orders. */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const timestamp = request.headers.get("x-webhook-timestamp") ?? "";
  const signature = request.headers.get("x-webhook-signature") ?? "";

  let orderId = "";
  try {
    const parsed: unknown = JSON.parse(rawBody);
    const data = (parsed as { data?: { order?: { order_id?: string } } })?.data;
    orderId = data?.order?.order_id ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }
  if (!orderId) return NextResponse.json({ error: "Missing order id." }, { status: 400 });

  if (!verifyCashfreeWebhook(rawBody, timestamp, signature)) {
    console.error(`Cashfree webhook signature mismatch for order ${orderId}`);
    return NextResponse.json({ error: "Bad signature." }, { status: 401 });
  }

  try {
    await markPaymentPaid(orderId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Cashfree webhook fulfilment failed:", error);
    return NextResponse.json({ error: "Fulfilment failed." }, { status: 500 });
  }
}
