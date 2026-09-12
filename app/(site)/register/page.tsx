import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal, RevealGroup, CountUp } from "@/components/motion/Motion";
import { Eyebrow, Button } from "@/components/ui/Primitives";
import { RegistrationForm } from "@/components/site/RegistrationForm";

export const metadata: Metadata = {
  title: "Design Dialect 2.0 - Register Now | India's Premier Architecture Conference",
  description: "Join Ludhiana's premier architecture and design conference. 300+ professionals, 15+ speakers, 2 days of innovation. Register now for Design Dialect 2.0.",
};

export default function RegisterPage() {
  return (
    <>
      {/* PREMIUM HEADER */}
      <header className="fixed top-0 z-50 w-full border-b border-copper/20 bg-navy/98 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-shell items-center justify-between px-gutter py-4 md:py-5">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="relative h-10 w-32 md:h-14 md:w-44">
              <Image
                src="/firm-la-media.png"
                alt="LA Media & Communications"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <a href="#register" className="btn btn-fill px-4 text-[13px] md:px-8 md:text-[15px] shadow-lg shadow-copper/30 transition-all hover:shadow-xl hover:shadow-copper/40">
            Register
          </a>
        </div>
      </header>

      {/* PREMIUM HERO - same image on mobile + desktop, sized responsively */}
      <section className="relative min-h-screen overflow-hidden pt-20 md:pt-28">
        <div className="absolute inset-0 bg-navy-2">
          <div className="relative h-full w-full">
            <Image
              src="/herodd.png"
              alt="Design Dialect Hero"
              fill
              className="object-contain object-center md:object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/70 to-navy" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-shell flex-col justify-center px-gutter py-16 md:py-20">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-copper/30 bg-copper/5 px-5 py-2.5 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-copper"></span>
              <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-copper">Limited Seats Available</span>
            </div>

            <h1 className="mt-8 text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight">
              Design<br />
              <span className="bg-gradient-to-r from-copper via-copper-soft to-bone bg-clip-text text-transparent">Dialect 2.0</span>
            </h1>

            <p className="mt-8 max-w-[55ch] text-[clamp(1.1rem,2vw,1.4rem)] leading-relaxed text-mist">
              India's most anticipated architecture and design conference returns. Two days of groundbreaking ideas,
              industry leaders, and career-defining connections.
            </p>

            <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-8 lg:w-2/3">
              <div className="group">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-copper/10 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-copper/20 sm:h-14 sm:w-14">
                    <svg className="h-6 w-6 text-copper sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-copper sm:text-[11px]">Date</p>
                    <p className="mt-1 text-[15px] font-bold sm:text-[17px]">Feb 6-7, 2027</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-copper/10 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-copper/20 sm:h-14 sm:w-14">
                    <svg className="h-6 w-6 text-copper sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-copper sm:text-[11px]">Venue</p>
                    <p className="mt-1 text-[15px] font-bold sm:text-[17px]">To be listed shortly</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-copper/10 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-copper/20 sm:h-14 sm:w-14">
                    <svg className="h-6 w-6 text-copper sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-copper sm:text-[11px]">Attendees</p>
                    <p className="mt-1 text-[15px] font-bold sm:text-[17px]">300+ Professionals</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 sm:mt-14 sm:gap-5">
              <a
                href="#register"
                className="group relative flex items-center gap-2 overflow-hidden rounded-2xl bg-copper px-6 py-4 text-[15px] font-bold text-white shadow-2xl shadow-copper/40 transition-all hover:scale-105 hover:shadow-3xl hover:shadow-copper/60 sm:px-10 sm:py-5 sm:text-[17px]"
              >
                <span className="relative z-10">Register Now</span>
                <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform group-hover:translate-x-full"></div>
              </a>

              <a
                href="/register/sponsor"
                className="group flex items-center gap-2 rounded-2xl border-2 border-copper/30 bg-white/5 px-6 py-3.5 text-[14px] font-semibold backdrop-blur-sm transition-all hover:border-copper hover:bg-white/10 sm:gap-3 sm:px-8 sm:py-4 sm:text-[16px]"
              >
                Exhibit With Us
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="h-8 w-8 text-copper/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* PREMIUM STATS */}
      <section id="about" className="border-t border-copper/20 py-24">
        <div className="mx-auto max-w-shell px-gutter">
          <RevealGroup>
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              <div>
                <Eyebrow>About the Conference</Eyebrow>
                <h2 className="mt-8 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight">
                  Where India's Architecture<br />
                  <span className="text-copper">Elite Gather</span>
                </h2>
                <p className="mt-8 text-[18px] leading-relaxed text-mist">
                  Design Dialect isn't just another conference. It's the definitive gathering for India's architecture
                  and design community—a curated experience where innovation meets inspiration.
                </p>
                <p className="mt-5 text-[18px] leading-relaxed text-mist">
                  Over two transformative days, you'll gain exclusive access to industry pioneers, emerging trends,
                  and the connections that will define your career trajectory.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="group panel panel-solid p-6 sm:p-8 transition-all hover:scale-105 hover:border-copper">
                  <div className="text-[3rem] sm:text-[4.5rem] font-bold leading-none text-copper">
                    <CountUp value="300" />+
                  </div>
                  <p className="mt-3 sm:mt-4 text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.12em] text-slate">Architects & Designers</p>
                </div>
                <div className="group panel panel-solid p-6 sm:p-8 transition-all hover:scale-105 hover:border-copper">
                  <div className="text-[3rem] sm:text-[4.5rem] font-bold leading-none text-copper">
                    <CountUp value="50" />+
                  </div>
                  <p className="mt-3 sm:mt-4 text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.12em] text-slate">Industry Leaders</p>
                </div>
                <div className="group panel panel-solid p-6 sm:p-8 transition-all hover:scale-105 hover:border-copper">
                  <div className="text-[3rem] sm:text-[4.5rem] font-bold leading-none text-copper">
                    <CountUp value="50" />+
                  </div>
                  <p className="mt-3 sm:mt-4 text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.12em] text-slate">Brand Partners</p>
                </div>
                <div className="group panel panel-solid p-6 sm:p-8 transition-all hover:scale-105 hover:border-copper">
                  <div className="text-[3rem] sm:text-[4.5rem] font-bold leading-none text-copper">
                    <CountUp value="2" />
                  </div>
                  <p className="mt-3 sm:mt-4 text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.12em] text-slate">Days of Excellence</p>
                </div>
              </div>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* WHY ATTEND */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Why Attend</Eyebrow>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
              Transform Your Practice
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="panel p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-copper/20">
                <svg className="h-7 w-7 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-[18px] font-bold">Learn from the Best</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">
                Gain insights from India's top architects and designers. Practical knowledge you can apply immediately.
              </p>
            </div>

            <div className="panel p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-copper/20">
                <svg className="h-7 w-7 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-[18px] font-bold">Network with Peers</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">
                Connect with 300+ professionals. Build relationships that last beyond the conference.
              </p>
            </div>

            <div className="panel p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-copper/20">
                <svg className="h-7 w-7 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-[18px] font-bold">Discover Innovations</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">
                Explore the latest products, materials, and technologies from 50+ brands.
              </p>
            </div>

            <div className="panel p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-copper/20">
                <svg className="h-7 w-7 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-[18px] font-bold">Hands-on Workshops</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">
                Participate in interactive sessions. Master new skills through practical experience.
              </p>
            </div>

            <div className="panel p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-copper/20">
                <svg className="h-7 w-7 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-[18px] font-bold">Business Growth</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">
                Discover opportunities for collaboration, partnerships, and business expansion.
              </p>
            </div>

            <div className="panel p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-copper/20">
                <svg className="h-7 w-7 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-[18px] font-bold">Get Certified</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">
                Earn certificates for workshops attended. Add credibility to your professional profile.
              </p>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section id="register" className="border-t border-hairline py-section">
        <div className="mx-auto max-w-3xl px-gutter">
          <Reveal>
            <Eyebrow>Register Now</Eyebrow>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
              Secure Your Spot
            </h2>
            <p className="mt-4 text-[17px] text-mist">
              Limited seats available. Register now to be part of India's premier architecture conference.
            </p>
          </Reveal>

          <div className="mt-12">
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* CONTACT US */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Contact Us</Eyebrow>
              <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
                Have Questions?
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-mist">
                Our team is here to help. Reach out for registration assistance, sponsorship opportunities,
                or any other queries about Design Dialect 2.0.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-copper/20">
                    <svg className="h-6 w-6 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold uppercase tracking-wider text-slate">Email</p>
                    <a href="mailto:lamediacommunications@gmail.com" className="mt-1 text-[16px] text-copper hover:text-copper-soft">
                      lamediacommunications@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-copper/20">
                    <svg className="h-6 w-6 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold uppercase tracking-wider text-slate">Phone</p>
                    <a href="tel:+919888078580" className="mt-1 block text-[16px] text-copper hover:text-copper-soft">
                      +91 98880 78580
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-copper/20">
                    <svg className="h-6 w-6 text-copper" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold uppercase tracking-wider text-slate">Social Media</p>
                    <a
                      href="https://instagram.com/lamedia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-[16px] text-copper hover:text-copper-soft"
                    >
                      @lamedia
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel p-8">
              <h3 className="text-[20px] font-bold">Quick Links</h3>
              <div className="mt-6 space-y-4">
                <Link href="/" className="block text-[15px] text-mist transition-colors hover:text-copper">
                  ← Back to Homepage
                </Link>
                <Link href="/about" className="block text-[15px] text-mist transition-colors hover:text-copper">
                  About LA Media
                </Link>
                <Link href="/insights" className="block text-[15px] text-mist transition-colors hover:text-copper">
                  Read Our Blog
                </Link>
                <Link href="/build-right" className="block text-[15px] text-mist transition-colors hover:text-copper">
                  Build Right Advisors
                </Link>
              </div>

              <div className="mt-8 border-t border-hairline pt-8">
                <p className="text-[14px] font-semibold">For Sponsorship Opportunities:</p>
                <a href="mailto:lamediacommunications@gmail.com" className="mt-2 block text-[15px] text-copper hover:text-copper-soft">
                  lamediacommunications@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
