import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Arrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/motion/Motion";

export const metadata: Metadata = {
  title: "Build Right Advisors - LA Media",
  description: "Expert advisory for building products, materials, and construction processes",
};

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

export default function BuildRightPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-hairline bg-navy/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-shell items-center justify-between gap-6 px-gutter py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-[24px] font-bold leading-none tracking-[0.08em]">LA</span>
            <span className="hidden text-[9px] font-semibold uppercase leading-[1.35] tracking-[0.14em] sm:block">
              Media &amp;<br />Communications
            </span>
          </Link>
          <Link href="/" className="link-arrow">
            <span className="rotate-180"><Arrow /></span> Back to site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-shell px-gutter py-16">
        {/* Hero Section */}
        <Reveal>
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-cobalt/60 text-[16px] font-bold tracking-[0.08em] text-cobalt-soft">
              BR
            </div>
            <h1 className="h-display text-[clamp(2.5rem,6vw,5rem)]">
              Build Right Advisors
            </h1>
            <p className="mx-auto mt-6 max-w-[70ch] text-[18px] leading-relaxed text-mist">
              Comprehensive construction advisory services covering every stage of your project. From pre-build planning and Vastu consultation to space planning, interiors, construction guidance, issue resolution, and post-build support—we provide expert advice to ensure your project is built right, from foundation to finish.
            </p>
          </div>
        </Reveal>

        {/* Build Right Poster */}
        <Reveal delay={0.1}>
          <div className="panel relative mx-auto mt-12 max-w-4xl overflow-hidden">
            <Image
              src="/BUILD RIGHT COVER PIC SUB PAGE .png"
              alt="Build Right Advisors"
              width={1200}
              height={1600}
              className="h-auto w-full"
            />
          </div>
        </Reveal>

        {/* Contact Details */}
        <Reveal delay={0.15}>
          <div className="panel mx-auto mt-12 max-w-3xl p-8">
            <h2 className="mb-6 text-center text-[22px] font-bold uppercase tracking-[0.04em]">
              Get in Touch
            </h2>
            <div className="space-y-4 text-center text-[15px] text-mist">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-cobalt-soft">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-semibold">Phone</span>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold">98880 78580</p>
                  <p className="font-semibold">99888 00389</p>
                  <p className="font-semibold">98151 00385</p>
                </div>
              </div>
              <div className="flex items-start justify-center gap-3 pt-2">
                <svg className="mt-1 h-5 w-5 shrink-0 text-cobalt-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="leading-relaxed">
                  12 A, Basant City, Sua Road<br />
                  Ludhiana West, Ludhiana<br />
                  Punjab, India – 142022
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Consultation Form */}
        <Reveal delay={0.2}>
          <div className="panel-solid relative mx-auto mt-16 max-w-4xl overflow-hidden">
            <span className="bloom opacity-40" />
            <div className="relative p-8 md:p-12">
              <div className="mb-8 text-center">
                <h2 className="text-[28px] font-bold uppercase tracking-[0.02em]">
                  Request a Consultation
                </h2>
                <p className="mt-3 text-[15px] text-mist">
                  Fill out the form below and our experts will get back to you shortly
                </p>
              </div>

              <form action="/api/build-right-inquiry" method="POST" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-lg border border-hairline bg-navy-2/50 px-4 py-3 text-[14px] text-bone transition-all focus:border-cobalt/50 focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full rounded-lg border border-hairline bg-navy-2/50 px-4 py-3 text-[14px] text-bone transition-all focus:border-cobalt/50 focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                      placeholder="+91 98880 78580"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-hairline bg-navy-2/50 px-4 py-3 text-[14px] text-bone transition-all focus:border-cobalt/50 focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                    Project Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    className="w-full rounded-lg border border-hairline bg-navy-2/50 px-4 py-3 text-[14px] text-bone transition-all focus:border-cobalt/50 focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                    placeholder="City, State"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="service" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                      Service Required *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
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
                    <label htmlFor="stage" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                      Project Stage *
                    </label>
                    <select
                      id="stage"
                      name="stage"
                      required
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
                  <label htmlFor="size" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                    Project Size <span className="text-slate/60">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="size"
                    name="size"
                    className="w-full rounded-lg border border-hairline bg-navy-2/50 px-4 py-3 text-[14px] text-bone transition-all focus:border-cobalt/50 focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                    placeholder="e.g., 2000 sq ft, 5 BHK"
                  />
                </div>

                <div>
                  <label htmlFor="query" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                    Requirement / Query *
                  </label>
                  <textarea
                    id="query"
                    name="query"
                    required
                    rows={5}
                    className="w-full rounded-lg border border-hairline bg-navy-2/50 px-4 py-3 text-[14px] text-bone transition-all focus:border-cobalt/50 focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                    placeholder="Tell us about your project and requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-cobalt px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-cobalt-soft"
                >
                  Request a Consultation
                </button>
              </form>
            </div>
          </div>
        </Reveal>

        {/* Additional Services Info */}
        <Reveal delay={0.25}>
          <div className="panel mx-auto mt-12 max-w-4xl p-8">
            <h3 className="mb-6 text-center text-[20px] font-bold">Our Services</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-cobalt-soft">
                  Pre-Construction Advisory
                </h4>
                <ul className="space-y-2 text-[14px] text-mist">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cobalt-soft"></span>
                    <span>Pre-Build Planning & Consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cobalt-soft"></span>
                    <span>Layout & Space Planning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cobalt-soft"></span>
                    <span>Vastu Consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cobalt-soft"></span>
                    <span>Interior Design Advisory</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-cobalt-soft">
                  Construction Support
                </h4>
                <ul className="space-y-2 text-[14px] text-mist">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cobalt-soft"></span>
                    <span>Construction Advisory Services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cobalt-soft"></span>
                    <span>Construction Issue Resolution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cobalt-soft"></span>
                    <span>Post-Build Assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cobalt-soft"></span>
                    <span>Complete End-to-End Consultation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
