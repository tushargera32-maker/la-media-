"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Status = "checking" | "paid" | "pending" | "failed" | "unknown";

export function PaymentStatus() {
  const params = useSearchParams();
  const orderId = params.get("order_id") ?? "";
  const [status, setStatus] = useState<Status>(orderId ? "checking" : "unknown");

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;
    let attempts = 0;
    async function poll() {
      attempts += 1;
      try {
        const res = await fetch(`/api/payments/status?order_id=${encodeURIComponent(orderId)}`);
        const data = (await res.json().catch(() => null)) as { status?: string } | null;
        const s = data?.status ?? "";
        if (cancelled) return;
        if (s === "paid") {
          setStatus("paid");
          return;
        }
        if (s === "failed" || attempts >= 8) {
          setStatus(s === "failed" ? "failed" : "pending");
          return;
        }
        window.setTimeout(poll, 3000);
      } catch {
        if (!cancelled) setStatus(attempts >= 8 ? "pending" : status);
        if (!cancelled && attempts < 8) window.setTimeout(poll, 3000);
      }
    }
    poll();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  if (status === "checking") {
    return (
      <>
        <p className="eyebrow">Confirming payment</p>
        <h1 className="h-display mt-7 text-[clamp(2rem,5vw,3.6rem)]">Please wait…</h1>
        <p className="mt-5 text-[16px] text-mist">We are confirming your payment with the bank.</p>
      </>
    );
  }

  if (status === "paid") {
    return (
      <>
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-copper/20">
          <svg className="h-8 w-8 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="eyebrow">Booking confirmed</p>
        <h1 className="h-display mt-7 text-[clamp(2rem,5vw,3.6rem)]">
          You&apos;re all set!
        </h1>
        <p className="mx-auto mt-5 max-w-[46ch] text-[16px] text-mist">
          Your paid consultation is booked. Our senior architect will call you within 24 hours.
        </p>
        <p className="mx-auto mt-6 max-w-[46ch] rounded-xl border border-hairline bg-navy-2/50 px-5 py-4 text-[14px] text-mist">
          Booking reference: <span className="font-bold text-bone">{orderId}</span>
          <br />
          A payment receipt has been sent to your email.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/build-right" className="btn btn-fill">
            Back to Build Right
          </Link>
          <Link href="/" className="btn btn-ghost">
            Homepage
          </Link>
        </div>
      </>
    );
  }

  if (status === "failed") {
    return (
      <>
        <p className="eyebrow">Payment failed</p>
        <h1 className="h-display mt-7 text-[clamp(2rem,5vw,3.6rem)]">Payment didn&apos;t go through</h1>
        <p className="mx-auto mt-5 max-w-[46ch] text-[16px] text-mist">
          No money was deducted. Please try again from the Build Right page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/build-right#inquiry" className="btn btn-fill">
            Try again
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="eyebrow">Almost there</p>
      <h1 className="h-display mt-7 text-[clamp(2rem,5vw,3.6rem)]">Confirming your payment…</h1>
      <p className="mx-auto mt-5 max-w-[46ch] text-[16px] text-mist">
        This can take a minute. Your booking reference is <span className="font-bold text-bone">{orderId || "—"}</span>.
        If the amount was deducted, it will reflect here shortly — otherwise it auto-refunds.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/build-right#inquiry" className="btn btn-line">
          Back to Build Right
        </Link>
      </div>
    </>
  );
}
