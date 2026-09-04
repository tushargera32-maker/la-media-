"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface BuildRightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICE_OPTIONS = [
  "Pre-Build Planning",
  "Layout/Space Planning",
  "Vastu",
  "Interiors",
  "Construction Advisory",
  "Construction Issue",
  "Post-Build",
  "Complete Consultation",
];

const PROJECT_STAGES = [
  "Planning Stage",
  "Design Stage",
  "Construction Stage",
  "Post-Construction",
  "Other",
];

export function BuildRightModal({ isOpen, onClose }: BuildRightModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    service: "",
    stage: "",
    size: "",
    query: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/build-right-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({
            name: "",
            phone: "",
            email: "",
            location: "",
            service: "",
            stage: "",
            size: "",
            query: "",
          });
        }, 2500);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] animate-fadeIn bg-gradient-to-br from-navy/95 via-navy/90 to-navy/95 backdrop-blur-lg"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-[9999] w-[95vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 animate-modalSlideIn">
        <div className="relative max-h-[90vh] overflow-hidden rounded-2xl shadow-[0_25px_100px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
          {/* Premium glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cobalt/15 via-transparent to-cobalt/15 opacity-40 blur-2xl" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-navy/60 text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-white/50 hover:bg-navy/80"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative grid overflow-y-auto bg-gradient-to-br from-navy via-navy-2 to-navy md:max-h-[90vh] md:grid-cols-[1fr_1.2fr]">
            {/* Left: Build Right Visual */}
            <div className="relative hidden border-r border-hairline bg-navy-2/50 md:flex md:flex-col md:items-center md:justify-center md:p-10">
              <div className="relative w-full max-w-[350px]">
                <Image
                  src="/firm-build-right.jpg"
                  alt="Build Right Advisors"
                  width={400}
                  height={500}
                  className="h-auto w-full rounded-lg shadow-lg"
                />
              </div>

              <div className="mt-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-cobalt/60 text-[14px] font-bold tracking-[0.08em] text-cobalt-soft">
                  BR
                </div>
                <h3 className="text-[20px] font-bold uppercase tracking-[0.04em]">
                  Build Right Advisors
                </h3>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-cobalt-soft">
                  Advisory · Products · Materials · Processes
                </p>
              </div>

              {/* Contact Details */}
              <div className="mt-8 space-y-4 text-center text-[13px] text-mist">
                <div className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 text-cobalt-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>98880 78580 / 99888 00389</span>
                </div>
                <div className="flex items-start justify-center gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-cobalt-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="max-w-[200px] leading-relaxed">
                    12 A, Basant City, Sua Road<br />
                    Ludhiana West, Ludhiana<br />
                    Punjab, India – 142022
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Consultation Form */}
            <div className="p-8 md:p-10">
              {submitted ? (
                <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cobalt/20 text-cobalt-soft">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-[22px] font-bold">Thank You!</h3>
                  <p className="mt-3 max-w-[32ch] text-[14px] text-mist">
                    Your consultation request has been received. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-[26px] font-bold uppercase tracking-[0.02em]">
                      Request a Consultation
                    </h2>
                    <p className="mt-3 text-[14px] text-mist">
                      Get expert advisory on building products, materials, and processes for your project.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="br-name" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="br-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg border border-hairline bg-navy-2/50 px-4 py-3 text-[14px] text-bone transition-all focus:border-cobalt/50 focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="br-phone" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          id="br-phone"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-lg border border-hairline bg-navy-2/50 px-4 py-3 text-[14px] text-bone transition-all focus:border-cobalt/50 focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                          placeholder="+91 98880 78580"
                        />
                      </div>

                      <div>
                        <label htmlFor="br-email" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="br-email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-lg border border-hairline bg-navy-2/50 px-4 py-3 text-[14px] text-bone transition-all focus:border-cobalt/50 focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="br-location" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                        Project Location *
                      </label>
                      <input
                        type="text"
                        id="br-location"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full rounded-lg border border-hairline bg-navy-2/50 px-4 py-3 text-[14px] text-bone transition-all focus:border-cobalt/50 focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                        placeholder="City, State"
                      />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="br-service" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                          Service Required *
                        </label>
                        <select
                          id="br-service"
                          required
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full rounded-lg border border-hairline bg-navy-2/50 px-4 py-3 text-[14px] text-bone transition-all focus:border-cobalt/50 focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                        >
                          <option value="">Select service</option>
                          {SERVICE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="br-stage" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                          Project Stage *
                        </label>
                        <select
                          id="br-stage"
                          required
                          value={formData.stage}
                          onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                          className="w-full rounded-lg border border-hairline bg-navy-2/50 px-4 py-3 text-[14px] text-bone transition-all focus:border-cobalt/50 focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                        >
                          <option value="">Select stage</option>
                          {PROJECT_STAGES.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="br-size" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                        Project Size <span className="text-slate/60">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="br-size"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        className="w-full rounded-lg border border-hairline bg-navy-2/50 px-4 py-3 text-[14px] text-bone transition-all focus:border-cobalt/50 focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                        placeholder="e.g., 2000 sq ft, 5 BHK"
                      />
                    </div>

                    <div>
                      <label htmlFor="br-query" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                        Requirement / Query *
                      </label>
                      <textarea
                        id="br-query"
                        required
                        rows={4}
                        value={formData.query}
                        onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                        className="w-full rounded-lg border border-hairline bg-navy-2/50 px-4 py-3 text-[14px] text-bone transition-all focus:border-cobalt/50 focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                        placeholder="Tell us about your project and requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-lg bg-cobalt px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-cobalt-soft disabled:opacity-50"
                    >
                      {submitting ? "SUBMITTING..." : "REQUEST A CONSULTATION"}
                    </button>
                  </form>

                  {/* Mobile Contact Details */}
                  <div className="mt-8 space-y-3 border-t border-hairline pt-6 text-[12px] text-mist md:hidden">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold text-cobalt-soft">Phone:</span>
                      98880 78580 / 99888 00389
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="shrink-0 font-semibold text-cobalt-soft">Address:</span>
                      <span>12 A, Basant City, Sua Road, Ludhiana West, Ludhiana, Punjab – 142022</span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -45%) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .animate-modalSlideIn {
          animation: modalSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}
