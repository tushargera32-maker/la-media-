"use client";

import { useState } from "react";

type Phase = "idle" | "sending" | "creating" | "paying" | "done" | "error";

function field(form: HTMLFormElement, name: string): string {
  const el = form.elements.namedItem(name);
  return el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement
    ? el.value.trim()
    : "";
}

function loadCashfree(): Promise<{
  checkout: (opts: { paymentSessionId: string; redirectTarget: string }) => Promise<unknown>;
}> {
  const mode = (process.env.NEXT_PUBLIC_CASHFREE_ENV ?? "").toLowerCase() === "production" ? "production" : "sandbox";
  return new Promise((resolve, reject) => {
    const init = (): unknown => {
      const CF = (window as unknown as Record<string, unknown>).Cashfree;
      return typeof CF === "function" ? (CF as (o: { mode: string }) => unknown)({ mode }) : null;
    };
    const existing = init();
    if (existing) {
      resolve(existing as { checkout: (opts: { paymentSessionId: string; redirectTarget: string }) => Promise<unknown> });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => {
      const cf = init();
      if (cf) {
        resolve(cf as { checkout: (opts: { paymentSessionId: string; redirectTarget: string }) => Promise<unknown> });
      } else {
        reject(new Error("Payment gateway failed to initialise. Please retry."));
      }
    };
    script.onerror = () => reject(new Error("Could not load the payment gateway. Check your connection and retry."));
    document.head.appendChild(script);
  });
}

/**
 * Replaces the static inquiry submit: free flow posts the inquiry,
 * paid opt-in creates a Cashfree order and opens checkout.
 * Must be rendered inside the inquiry <form>.
 */
export function ConsultationCheckout() {
  const [paid, setPaid] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    setError(null);

    const payload = {
      name: field(form, "name"),
      phone: field(form, "phone"),
      email: field(form, "email"),
      location: field(form, "location"),
      service: field(form, "service"),
      projectType: field(form, "projectType"),
      message: field(form, "message"),
    };

    if (!payload.name || !payload.phone || !payload.location || !payload.service) {
      setError("Please fill your name, phone, location and service first.");
      setPhase("error");
      return;
    }

    if (!paid) {
      // ---- Free inquiry flow (unchanged behaviour) ----
      setPhase("sending");
      try {
        const res = await fetch("/api/build-right-inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            stage: payload.projectType || "general",
            query: payload.message || "General consultation inquiry",
          }),
        });
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        if (!res.ok) throw new Error(data?.error ?? "Submission failed. Please try again.");
        setPhase("done");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
        setPhase("error");
      }
      return;
    }

    // ---- Paid consultation flow ----
    if (!payload.email) {
      setError("Email is required for paid consultation (payment receipt).");
      setPhase("error");
      return;
    }
    setPhase("creating");
    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as {
        payment_session_id?: string;
        error?: string;
      } | null;
      if (!res.ok || !data?.payment_session_id) {
        throw new Error(data?.error ?? "Could not start the payment. Please try again.");
      }
      setPhase("paying");
      const cashfree = await loadCashfree();
      await cashfree.checkout({ paymentSessionId: data.payment_session_id, redirectTarget: "_self" });
      // _self redirects to the return URL on completion; if we are still here, re-check below.
      setPhase("idle");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment could not start. Please try again.");
      setPhase("error");
    }
  }

  if (phase === "done") {
    return (
      <div className="rounded-xl border border-copper/30 bg-copper/10 px-6 py-8 text-center">
        <p className="text-[18px] font-bold text-copper">Inquiry received!</p>
        <p className="mt-2 text-[15px] text-mist">
          Thank you — our team will respond within 24 hours.
        </p>
      </div>
    );
  }

  const busy = phase === "sending" || phase === "creating" || phase === "paying";

  return (
    <>
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-hairline bg-navy-2/50 p-4 transition-colors hover:border-copper/50">
        <input
          type="checkbox"
          checked={paid}
          onChange={(ev) => {
            setPaid(ev.target.checked);
            setError(null);
            if (phase === "error") setPhase("idle");
          }}
          className="mt-1 h-4 w-4 accent-[var(--color-copper)]"
        />
        <span className="text-[14px] leading-relaxed text-mist">
          I&apos;m opting for <span className="font-bold text-bone">paid consultation (₹10,000)</span> —
          priority scheduling with a senior architect.
        </span>
      </label>

      {error && (
        <p role="alert" className="border border-copper/40 px-4 py-3 text-[14px] text-copper">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleClick}
        disabled={busy}
        className="btn btn-fill w-full justify-center text-[16px] disabled:opacity-60"
      >
        {phase === "sending"
          ? "Submitting…"
          : phase === "creating"
            ? "Creating order…"
            : phase === "paying"
              ? "Opening payment…"
              : paid
                ? "Proceed to Payment — ₹10,000"
                : "Submit Inquiry"}
      </button>
    </>
  );
}
