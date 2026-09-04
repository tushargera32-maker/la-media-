"use client";

import { useState } from "react";
import { Arrow } from "@/components/ui/Primitives";
import { HEARD_ABOUT_OPTIONS } from "@/lib/content";

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  firmName: string;
  designation: string;
  coaNumber: string;
  heardAbout: string;
  consent: boolean;
};

const EMPTY: Values = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  firmName: "",
  designation: "",
  coaNumber: "",
  heardAbout: "",
  consent: false,
};

type Errors = Partial<Record<keyof Values, string>>;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isPhone = (v: string) => /^0?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ""));

export function ArchitectRegistrationForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((p) => ({ ...p, [key]: value }));
    setErrors((p) => (p[key] ? { ...p, [key]: undefined } : p));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const found: Errors = {};
    if (!values.firstName.trim()) found.firstName = "Required";
    if (!values.lastName.trim()) found.lastName = "Required";
    if (!values.email.trim()) found.email = "Required";
    else if (!isEmail(values.email)) found.email = "That email doesn't look right";
    if (!values.phone.trim()) found.phone = "Required";
    else if (!isPhone(values.phone)) found.phone = "Enter a valid 10-digit mobile number";
    if (!values.firmName.trim()) found.firmName = "Required";
    if (!values.designation.trim()) found.designation = "Required";
    if (!values.coaNumber.trim()) found.coaNumber = "COA number is required for architects";
    if (!values.heardAbout) found.heardAbout = "Please pick one";
    if (!values.consent) found.consent = "Please accept the terms to continue";

    setErrors(found);
    if (Object.keys(found).length) {
      document.querySelector<HTMLElement>("[data-invalid='true']")?.focus();
      return;
    }

    setStatus("sending");
    setServerError(null);

    try {
      const res = await fetch("/api/registrations/architect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          phone: `+91${values.phone.replace(/[\s-]/g, "").slice(-10)}`,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Registration failed. Please try again.");
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
      <div className="py-10">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cobalt/20">
          <svg className="h-8 w-8 text-cobalt-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="eyebrow text-cobalt-soft">Registration successful</p>
        <h2 className="h-tight mt-6 text-[clamp(1.6rem,3vw,2.2rem)]">
          You&rsquo;re registered!
        </h2>
        <p className="mt-5 text-[15.5px] text-mist">
          We&rsquo;ve received your registration. Check your email for confirmation
          and further details about the event.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-8">
          Register someone else
        </button>
      </div>
    );
  }

  return (
    <>
      <p className="eyebrow text-cobalt-soft">Architect Registration</p>
      <p className="mt-4 text-[15px] text-mist">
        Please fill in your details to register as an architect.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Text
            label="First Name"
            required
            value={values.firstName}
            error={errors.firstName}
            onChange={(v) => set("firstName", v)}
            autoComplete="given-name"
            placeholder="First Name"
          />
          <Text
            label="Last Name"
            required
            value={values.lastName}
            error={errors.lastName}
            onChange={(v) => set("lastName", v)}
            autoComplete="family-name"
            placeholder="Last Name"
          />
        </div>

        <div className="mt-5">
          <Text
            label="Email Address"
            required
            type="email"
            value={values.email}
            error={errors.email}
            onChange={(v) => set("email", v)}
            autoComplete="email"
            placeholder="your.email@example.com"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="phone" className="field-label">
            Phone Number *
          </label>
          <div className="flex">
            <span className="field-input flex w-20 shrink-0 items-center justify-center border-r-0 text-mist">
              +91
            </span>
            <input
              id="phone"
              type="tel"
              value={values.phone}
              required
              autoComplete="tel"
              placeholder="Enter your phone number"
              aria-invalid={errors.phone ? true : undefined}
              data-invalid={errors.phone ? "true" : undefined}
              onChange={(e) => set("phone", e.target.value)}
              className="field-input"
            />
          </div>
          {errors.phone && <p className="mt-2 text-[13px] text-copper">{errors.phone}</p>}
        </div>

        <div className="mt-5">
          <Text
            label="Firm Name"
            required
            value={values.firmName}
            error={errors.firmName}
            onChange={(v) => set("firmName", v)}
            autoComplete="organization"
            placeholder="Your firm or company name"
          />
        </div>

        <div className="mt-5">
          <Text
            label="Designation"
            required
            value={values.designation}
            error={errors.designation}
            onChange={(v) => set("designation", v)}
            autoComplete="organization-title"
            placeholder="Your designation or role"
          />
        </div>

        <div className="mt-5">
          <Text
            label="COA Number"
            required
            value={values.coaNumber}
            error={errors.coaNumber}
            onChange={(v) => set("coaNumber", v)}
            placeholder="Council of Architecture registration number"
          />
          <p className="mt-1.5 text-[12px] text-slate">
            Required for verification as a registered architect
          </p>
        </div>

        <div className="mt-5">
          <Select
            label="How did you hear about us?"
            required
            value={values.heardAbout}
            error={errors.heardAbout}
            onChange={(v) => set("heardAbout", v)}
            options={HEARD_ABOUT_OPTIONS}
            placeholder="Select an option"
          />
        </div>

        <label className="mt-7 flex items-start gap-3 text-[14px] text-mist">
          <input
            type="checkbox"
            checked={values.consent}
            data-invalid={errors.consent ? "true" : undefined}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-1 h-4 w-4 accent-[var(--color-copper)]"
          />
          <span>
            I agree to the{" "}
            <a href="/privacy" className="text-copper underline underline-offset-4">
              privacy policy
            </a>{" "}
            and{" "}
            <a href="/terms" className="text-copper underline underline-offset-4">
              terms of use
            </a>
            .
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
          className="btn btn-line mt-8 w-full justify-center border-cobalt text-cobalt hover:bg-cobalt hover:text-white disabled:opacity-60"
        >
          {status === "sending" ? "Registering…" : "Register now"}
          {status !== "sending" && <Arrow />}
        </button>

        <p className="mt-4 text-center text-[12px] text-slate">
          Your information is secure and will never be shared.
        </p>
      </form>
    </>
  );
}

function Text({
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  autoComplete,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="text-copper"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        data-invalid={error ? "true" : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
      />
      {error && <p className="mt-2 text-[13px] text-copper">{error}</p>}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  error,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
  required?: boolean;
  placeholder: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="text-copper"> *</span>}
      </label>
      <select
        id={id}
        value={value}
        required={required}
        aria-invalid={error ? true : undefined}
        data-invalid={error ? "true" : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`field-input ${value ? "" : "text-slate"}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-bone">
            {o}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-[13px] text-copper">{error}</p>}
    </div>
  );
}
