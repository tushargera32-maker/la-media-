"use client";

import { useState } from "react";
import { Arrow } from "@/components/ui/Primitives";

/* ==================================================================
   ENQUIRY FORM - used by the contact page.
   Posts to the existing /api/contacts route.
   ================================================================== */

type Values = { name: string; email: string; subject: string; message: string; consent: boolean };
const EMPTY: Values = { name: "", email: "", subject: "", message: "", consent: false };
type Errors = Partial<Record<keyof Values, string>>;

/** Deliberately permissive - an over-strict pattern rejects real addresses. */
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export function EnquiryForm({
  kind = "general",
  submitLabel = "Send message",
}: {
  kind?: string;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((p) => ({ ...p, [key]: value }));
    // Clear the field's error the moment the person starts fixing it.
    setErrors((p) => (p[key] ? { ...p, [key]: undefined } : p));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const found: Errors = {};
    if (!values.name.trim()) found.name = "Please enter your name";
    if (!values.email.trim()) found.email = "Please enter your email";
    else if (!isEmail(values.email)) found.email = "That email doesn't look right";
    if (!values.message.trim()) found.message = "Please tell us what you're after";
    if (!values.consent) found.consent = "Please accept the privacy policy to continue";

    setErrors(found);
    if (Object.keys(found).length) {
      document.querySelector<HTMLElement>("[data-invalid='true']")?.focus();
      return;
    }

    setStatus("sending");
    setServerError(null);

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, kind }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Couldn't send that. Please try again.");
      }
      setStatus("done");
      setValues(EMPTY);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div>
        <h3 className="h-tight text-[1.5rem]">Thank you - message received.</h3>
        <p className="mt-4 text-[15px] text-mist">
          Someone from the team will reply to the address you gave us.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-8">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your Name" value={values.name} error={errors.name}
               onChange={(v) => set("name", v)} autoComplete="name" required />
        <Field label="Your Email" type="email" value={values.email} error={errors.email}
               onChange={(v) => set("email", v)} autoComplete="email" required />
      </div>

      <div className="mt-5">
        <Field label="Subject" value={values.subject} onChange={(v) => set("subject", v)} />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="field-label">Your Message *</label>
        <textarea
          id="message"
          rows={6}
          value={values.message}
          required
          aria-invalid={errors.message ? true : undefined}
          data-invalid={errors.message ? "true" : undefined}
          onChange={(e) => set("message", e.target.value)}
          className="field-input resize-y"
        />
        {errors.message && <p className="mt-2 text-[13px] text-copper">{errors.message}</p>}
      </div>

      <label className="mt-6 flex items-start gap-3 text-[14px] text-mist">
        <input
          type="checkbox"
          checked={values.consent}
          data-invalid={errors.consent ? "true" : undefined}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-1 h-4 w-4 accent-[var(--color-copper)]"
        />
        <span>
          I agree to the <a href="/privacy" className="text-copper underline underline-offset-4">privacy policy</a>{" "}
          and <a href="/terms" className="text-copper underline underline-offset-4">terms of use</a>.
        </span>
      </label>
      {errors.consent && <p className="mt-2 text-[13px] text-copper">{errors.consent}</p>}

      {serverError && (
        <p role="alert" className="mt-6 border border-copper/40 px-4 py-3 text-[14px] text-copper">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-fill mt-8 w-full justify-center disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : submitLabel}
        {status !== "sending" && <Arrow />}
      </button>
    </form>
  );
}

function Field({
  label, value, onChange, error, type = "text", autoComplete, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  error?: string; type?: string; autoComplete?: string; required?: boolean;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}{required && " *"}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        data-invalid={error ? "true" : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
      />
      {error && <p className="mt-2 text-[13px] text-copper">{error}</p>}
    </div>
  );
}
