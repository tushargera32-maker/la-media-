import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentStatus } from "./status-client";

export const metadata: Metadata = {
  title: "Booking Confirmed - Build Right Advisors",
  description: "Your paid consultation booking status.",
};

export default function PaymentSuccessPage() {
  return (
    <section className="relative overflow-hidden pb-section pt-32 md:pt-40">
      <div className="relative mx-auto max-w-2xl px-gutter text-center">
        <Suspense fallback={<p className="text-mist">Loading…</p>}>
          <PaymentStatus />
        </Suspense>
      </div>
    </section>
  );
}
