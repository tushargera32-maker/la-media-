"use client";

import { useState } from "react";
import { Arrow } from "@/components/ui/Primitives";
import { HEARD_ABOUT_OPTIONS } from "@/lib/content";

const STALL_SIZES = ["Small (3×3 m)", "Standard (3×6 m)", "Large (6×6 m)", "Custom Size"];

type Values = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  gstNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  stallSize: string;
  requirements: string;
  heardAbout: string;
  consent: boolean;
};

const EMPTY: Values = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  gstNumber: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  stallSize: "",
  requirements: "",
  heardAbout: "",
  consent: false,
};

type Errors = Partial<Record<keyof Values, string>>;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isPhone = (v: string) => /^0?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ""));
const isGST = (v: string) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v.toUpperCase().replace(/\s/g, ""));
const isPincode = (v: string) => /^[1-9][0-9]{5}$/.test(v.replace(/\s/g, ""));

export function SponsorRegistrationForm() {
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
    if (!values.companyName.trim()) found.companyName = "Required";
    if (!values.contactName.trim()) found.contactName = "Required";
    if (!values.email.trim()) found.email = "Required";
    else if (!isEmail(values.email)) found.email = "That email doesn't look right";
    if (!values.phone.trim()) found.phone = "Required";
    else if (!isPhone(values.phone)) found.phone = "Enter a valid 10-digit mobile number";
    if (!values.gstNumber.trim()) found.gstNumber = "GST number is required for billing";
    else if (!isGST(values.gstNumber)) found.gstNumber = "Enter a valid 15-digit GST number";
    if (!values.address.trim()) found.address = "Required";
    if (!values.city.trim()) found.city = "Required";
    if (!values.state.trim()) found.state = "Required";
    if (!values.pincode.trim()) found.pincode = "Required";
    else if (!isPincode(values.pincode)) found.pincode = "Enter a valid 6-digit pincode";
    if (!values.stallSize) found.stallSize = "Please select a stall size";
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
      const res = await fetch("/api/registrations/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          phone: `+91${values.phone.replace(/[\s-]/g, "").slice(-10)}`,
          gstNumber: values.gstNumber.toUpperCase().replace(/\s/g, ""),
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
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-copper/20">
          <svg className="h-8 w-8 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="eyebrow">Booking received</p>
        <h2 className="h-tight mt-6 text-[clamp(1.6rem,3vw,2.2rem)]">
          Your stall is reserved!
        </h2>
        <p className="mt-5 text-[15.5px] text-mist">
          We&rsquo;ve received your stall booking. Our team will reach out within 24 hours
          with payment details and setup information.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-8">
          Book another stall
        </button>
      </div>
    );
  }

  return (
    <>
      <p className="eyebrow">Stall Booking Form</p>
      <p className="mt-4 text-[15px] text-mist">
        Fill in your company details to book a stall at the event.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-8">
        <div className="mt-5">
          <Text
            label="Company Name"
            required
            value={values.companyName}
            error={errors.companyName}
            onChange={(v) => set("companyName", v)}
            autoComplete="organization"
            placeholder="Your company or brand name"
          />
        </div>

        <div className="mt-5">
          <Text
            label="Contact Person Name"
            required
            value={values.contactName}
            error={errors.contactName}
            onChange={(v) => set("contactName", v)}
            autoComplete="name"
            placeholder="Primary contact person"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 mt-5">
          <Text
            label="Email Address"
            required
            type="email"
            value={values.email}
            error={errors.email}
            onChange={(v) => set("email", v)}
            autoComplete="email"
            placeholder="contact@company.com"
          />

          <div>
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
                placeholder="Enter phone number"
                aria-invalid={errors.phone ? true : undefined}
                data-invalid={errors.phone ? "true" : undefined}
                onChange={(e) => set("phone", e.target.value)}
                className="field-input"
              />
            </div>
            {errors.phone && <p className="mt-2 text-[13px] text-copper">{errors.phone}</p>}
          </div>
        </div>

        <div className="mt-5">
          <Text
            label="GST Number"
            required
            value={values.gstNumber}
            error={errors.gstNumber}
            onChange={(v) => set("gstNumber", v)}
            placeholder="22AAAAA0000A1Z5 (15 characters)"
          />
          <p className="mt-1.5 text-[12px] text-slate">
            Required for invoicing and billing
          </p>
        </div>

        <div className="mt-5">
          <label htmlFor="address" className="field-label">
            Address *
          </label>
          <textarea
            id="address"
            value={values.address}
            required
            placeholder="Company address for correspondence and billing"
            aria-invalid={errors.address ? true : undefined}
            data-invalid={errors.address ? "true" : undefined}
            onChange={(e) => set("address", e.target.value)}
            rows={3}
            className="field-input resize-none"
          />
          {errors.address && <p className="mt-2 text-[13px] text-copper">{errors.address}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-3 mt-5">
          <Text
            label="City"
            required
            value={values.city}
            error={errors.city}
            onChange={(v) => set("city", v)}
            autoComplete="address-level2"
            placeholder="City"
          />
          <Text
            label="State"
            required
            value={values.state}
            error={errors.state}
            onChange={(v) => set("state", v)}
            autoComplete="address-level1"
            placeholder="State"
          />
          <Text
            label="Pincode"
            required
            value={values.pincode}
            error={errors.pincode}
            onChange={(v) => set("pincode", v)}
            autoComplete="postal-code"
            placeholder="110001"
          />
        </div>

        <div className="mt-5">
          <Select
            label="Preferred Stall Size"
            required
            value={values.stallSize}
            error={errors.stallSize}
            onChange={(v) => set("stallSize", v)}
            options={STALL_SIZES}
            placeholder="Select stall size"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="requirements" className="field-label">
            Additional Requirements
          </label>
          <textarea
            id="requirements"
            value={values.requirements}
            placeholder="Special setup needs, electrical requirements, product demo space, etc."
            onChange={(e) => set("requirements", e.target.value)}
            rows={4}
            className="field-input resize-none"
          />
          <p className="mt-1.5 text-[12px] text-slate">
            Let us know about any special requirements for your stall
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
          className="btn btn-fill mt-8 w-full justify-center disabled:opacity-60"
        >
          {status === "sending" ? "Submitting…" : "Book Stall Now"}
          {status !== "sending" && <Arrow />}
        </button>

        <p className="mt-4 text-center text-[12px] text-slate">
          Your information is secure. We&rsquo;ll contact you within 24 hours.
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
