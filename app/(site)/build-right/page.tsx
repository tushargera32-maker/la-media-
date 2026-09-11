import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal, RevealGroup } from "@/components/motion/Motion";
import { Eyebrow, Button } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Build Right Advisors - Construction Advisory Services | Ludhiana",
  description: "Expert construction advisory services in Ludhiana. From pre-build planning to post-construction support. Get professional guidance for your building project from Ludhiana's trusted advisors.",
  keywords: "construction advisory Ludhiana, Build Right Advisors, Vastu consultation Ludhiana, construction planning Punjab, building consultants Ludhiana, space planning services",
};

const SERVICES = [
  {
    number: "01",
    title: "Pre-Build Planning",
    description: "We help establish the right foundation before construction begins. Our advisory covers site analysis, project feasibility, preliminary planning, budget considerations and regulatory guidance, helping identify potential challenges and opportunities at an early stage.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Layout / Space Planning",
    description: "We focus on making every part of the available space work effectively for the client's requirements. This includes functional space optimization, room arrangement, circulation, ergonomic considerations and future expansion planning, balancing practicality with the intended lifestyle or use of the property.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Vastu Consultation",
    description: "We integrate traditional Vastu Shastra principles with contemporary architectural planning to support informed design decisions. Guidance can include site orientation, spatial positioning, energy-flow considerations and practical remedial solutions, while maintaining functional and modern requirements.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Interiors",
    description: "Our interior advisory helps clients make coordinated and practical decisions throughout the interior planning process. This includes material and finish selection, furniture layouts, lighting considerations, spatial functionality and budget-conscious solutions aligned with the overall project vision.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Construction Advisory",
    description: "During execution, we provide professional guidance to help maintain quality, coordination and project control. Advisory support includes site supervision guidance, quality-control protocols, contractor management support, construction monitoring and safety considerations throughout the build.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Construction Issue Resolution",
    description: "Construction projects can encounter technical, coordination or execution-related challenges. We assist with on-site problem diagnosis, technical issue assessment, dispute mediation, structural concerns and remedial action planning, helping clients understand the issue and determine an appropriate course of action.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    number: "07",
    title: "Post-Build Support",
    description: "Our involvement can continue beyond physical completion of the project. Post-build support includes final inspection guidance, maintenance planning, warranty documentation, defect-liability-period support and long-term upkeep recommendations to help clients transition from construction into ongoing use.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    number: "08",
    title: "Complete Consultation Package",
    description: "For clients seeking comprehensive support, the Complete Consultation Package brings the advisory services together under one coordinated engagement. It includes end-to-end project advisory, a dedicated project advisor, regular progress reviews and priority support, providing a single point of professional guidance across the project lifecycle.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

// Instagram live feed — paste your SnapWidget (or Elfsight) Instagram Grid embed
// URL here to show live posts from @buildrightadvisors on this page.
// Free 5-min setup: snapwidget.com → Instagram Grid → @buildrightadvisors → copy embed URL.
// Until then, the highlights grid below shows instead — no empty space.
const INSTAGRAM_WIDGET_URL = "";

/* Highlights shown until the live widget URL above is set.
   Swap images/captions anytime — every card links to the profile. */
const INSTA_HIGHLIGHTS: { title: string; blurb: string; src?: string; quote?: string }[] = [
  {
    title: "Site Diaries",
    blurb: "Ongoing projects, from slab to finishing — as it happens.",
    src: "/firm-build-right.png",
  },
  {
    title: "Before → After",
    blurb: "Transformations across Ludhiana and Punjab.",
    src: "/BUILD RIGHT COVER PIC SUB PAGE .png",
  },
  {
    title: "Expert Tips",
    blurb: "Practical advice that saves lakhs. New tips every week.",
    quote: "Right Advice Today. Lakhs Saved Tomorrow.",
  },
];
export default function BuildRightPage() {
  return (
    <>
      {/* HEADER WITH LOGO */}
      <header className="fixed top-0 z-50 w-full border-b border-hairline bg-navy/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-shell items-center justify-between px-gutter py-3 md:py-4">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="relative h-10 w-32 md:h-12 md:w-40">
              <Image
                src="/firm-la-media.png"
                alt="LA Media & Communications"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <a href="#inquiry" className="btn btn-fill px-4 text-[11px] md:px-6 md:text-[11px]">
            Book Expert Consultation — ₹10,000
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[62vh] overflow-hidden pt-24 md:min-h-[80vh] md:pt-32">
        <div className="absolute inset-0 bg-navy-2">
          <div className="relative h-full w-full">
            <Image
              src="/BUILD RIGHT COVER PIC SUB PAGE .png"
              alt="Build Right Advisory"
              fill
              className="object-contain object-center md:object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40" />
        </div>

        <div className="relative mx-auto max-w-shell px-gutter pb-12 md:pb-20">
          <Reveal>
            <div className="inline-block rounded-full border border-copper/50 bg-copper/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-copper">
              Build Right Advisors
            </div>
            <h1 className="mt-6 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1]">
              Expert Construction<br />
              <span className="text-copper">Advisory Services</span>
            </h1>
            <p className="mt-6 max-w-[50ch] text-[18px] leading-relaxed text-mist">
              Comprehensive construction guidance from pre-build planning to post-construction support.
              Your trusted partner for building projects in Ludhiana and Punjab.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 md:mt-10 md:gap-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper/20 md:h-12 md:w-12">
                  <svg className="h-5 w-5 text-copper md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-copper md:text-[13px]">Experience</p>
                  <p className="text-[14px] font-bold md:text-[16px]">25+ Years</p>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper/20 md:h-12 md:w-12">
                  <svg className="h-5 w-5 text-copper md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-copper md:text-[13px]">Projects</p>
                  <p className="text-[14px] font-bold md:text-[16px]">300+ Advised</p>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper/20 md:h-12 md:w-12">
                  <svg className="h-5 w-5 text-copper md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-copper md:text-[13px]">Satisfaction</p>
                  <p className="text-[14px] font-bold md:text-[16px]">98% Rating</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 md:mt-12 md:gap-4">
              <a href="#inquiry" className="btn btn-fill text-[13px] md:text-[16px]">
                Book Expert Consultation — ₹10,000
              </a>
              <a href="tel:+919888078580" className="btn btn-line text-[13px] md:text-[16px]">
                Call Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Our Services</Eyebrow>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
              Comprehensive Construction Advisory
            </h2>
            <p className="mt-6 max-w-[60ch] text-[17px] text-mist">
              From initial planning to final inspection, we guide you through every stage of your building project
              with expert advice and professional support.
            </p>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <div key={service.number} className="panel group p-5 transition-all hover:border-copper md:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-copper/10 text-copper transition-all group-hover:bg-copper group-hover:text-white md:h-14 md:w-14">
                    {service.icon}
                  </div>
                  <span className="text-[2rem] font-bold leading-none text-copper/20 md:text-[2.5rem]">{service.number}</span>
                </div>
                <h3 className="mt-5 text-[15px] font-bold transition-colors group-hover:text-copper md:mt-6 md:text-[16px]">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-mist md:mt-3 md:text-[14px]">
                  {service.description}
                </p>
              </div>
            ))}
          </RevealGroup>

          <Reveal>
            <div className="mt-12 text-center">
              <a href="#inquiry" className="btn btn-fill">
                Discuss Your Project
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT US - ULTRA PREMIUM SECTION */}
      <section className="relative border-t border-hairline py-section overflow-hidden">
        {/* Papa Wala Glow Effect - Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Gradient Orbs */}
          <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-br from-copper/20 via-copper/10 to-transparent blur-[120px]" style={{ animationDuration: '4s' }} />
          <div className="absolute right-1/4 bottom-1/4 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-tl from-copper/15 via-copper/5 to-transparent blur-[100px]" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-copper/10 to-transparent blur-[90px]" style={{ animationDuration: '6s', animationDelay: '2s' }} />

          {/* Diagonal Lines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 50px, rgb(214 158 106 / 0.1) 50px, rgb(214 158 106 / 0.1) 51px)`,
          }} />
        </div>

        <div className="relative mx-auto max-w-shell px-gutter">
          {/* Section Header - Asymmetric */}
          <Reveal>
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-copper/30 bg-copper/10 px-6 py-3 backdrop-blur-sm">
                <div className="h-2 w-2 animate-pulse rounded-full bg-copper" />
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-copper">Meet The Visionaries</span>
              </div>
              <h2 className="mt-10 text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight">
                Building Punjab's<br />
                <span className="relative inline-block -rotate-1">
                  <span className="bg-gradient-to-r from-copper via-copper-soft to-copper bg-clip-text text-transparent">
                    Future.
                  </span>
                </span>
                <br />
                <span className="inline-block rotate-1">One Project at a Time.</span>
              </h2>
              <p className="mt-10 max-w-[65ch] text-[19px] leading-relaxed text-mist">
                Three distinguished architects. Over <span className="font-bold text-copper">75 years</span> of combined experience.
                <br />United by a shared vision to transform construction advisory across Punjab and beyond.
              </p>
            </div>
          </Reveal>

          {/* Stats Grid - BENTO STYLE WITH DIFFERENT SIZES */}
          <div className="mt-12 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-4">
            {/* Stat 1 - Combined Years */}
            <Reveal>
              <div className="col-span-2 md:col-span-2">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-copper/20 bg-gradient-to-br from-navy-2/50 via-navy/50 to-navy-2/50 p-5 backdrop-blur-sm transition-all duration-500 hover:border-copper hover:shadow-2xl hover:shadow-copper/20 md:rounded-3xl md:p-8">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-copper/5 blur-3xl transition-all duration-500 group-hover:bg-copper/20" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="text-[2rem] opacity-80 md:text-[3rem]">⏱️</div>
                    <div>
                      <p className="text-[2.5rem] font-black leading-none text-copper transition-all duration-500 group-hover:scale-110 md:text-[4rem]">75+</p>
                      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate md:mt-3 md:text-[13px]">Combined Years</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Stat 2 - Projects */}
            <Reveal>
              <div className="col-span-1 md:col-span-1">
                <div className="group relative overflow-hidden rounded-3xl border border-copper/20 bg-gradient-to-br from-navy-2/50 via-navy/50 to-navy-2/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-copper hover:shadow-2xl hover:shadow-copper/20">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-copper/5 blur-3xl transition-all duration-500 group-hover:bg-copper/20" />
                  <div className="relative text-center">
                    <div className="mb-3 text-[2.5rem] opacity-80">🏗️</div>
                    <p className="text-[3.5rem] font-black leading-none text-copper transition-all duration-500 group-hover:scale-110">500+</p>
                    <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.15em] text-slate">Projects</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Stat 3 - Awards */}
            <Reveal>
              <div className="col-span-1 md:col-span-1">
                <div className="group relative overflow-hidden rounded-3xl border border-copper/20 bg-gradient-to-br from-navy-2/50 via-navy/50 to-navy-2/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-copper hover:shadow-2xl hover:shadow-copper/20">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-copper/5 blur-3xl transition-all duration-500 group-hover:bg-copper/20" />
                  <div className="relative text-center">
                    <div className="mb-3 text-[2.5rem] opacity-80">🏆</div>
                    <p className="text-[3.5rem] font-black leading-none text-copper transition-all duration-500 group-hover:scale-110">25+</p>
                    <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.15em] text-slate">Awards</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Stat 4 - Founding Partners */}
            <Reveal>
              <div className="col-span-2 md:col-span-4">
                <div className="group relative overflow-hidden rounded-3xl border border-copper/20 bg-gradient-to-br from-navy-2/50 via-navy/50 to-navy-2/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-copper hover:shadow-2xl hover:shadow-copper/20">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-copper/5 blur-3xl transition-all duration-500 group-hover:bg-copper/20" />
                  <div className="relative text-center">
                    <div className="mb-3 text-[2.5rem] opacity-80">👥</div>
                    <p className="text-[3.5rem] font-black leading-none text-copper transition-all duration-500 group-hover:scale-110">3</p>
                    <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.15em] text-slate">Founding Partners</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>


          {/* Team Section - VERTICAL INTERACTIVE CARDS */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* AR. ARJUN DEEP - VERTICAL CARD */}
            <Link href="/build-right/architects/arjun-deep" className="group panel overflow-hidden transition-all hover:border-copper">
              <div className="cursor-pointer">
                {/* Photo - Full Width on Top */}
                <div className="relative aspect-[3/4] overflow-hidden ring-2 ring-copper/20 transition-all group-hover:ring-copper group-hover:shadow-[0_0_30px_rgba(217,119,6,0.3)]">
                  <Image
                    src="/team/ar-arjun-sharma.jpg"
                    alt="Ar. Arjun Deep"
                    fill
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                  />
                </div>

                {/* Content Below Photo */}
                <div className="p-6">
                  <h3 className="text-[24px] font-bold group-hover:text-copper transition-colors">Ar. Arjun Deep</h3>
                  <p className="mt-2 text-[13px] text-mist">Principal Architect</p>
                  <p className="text-[13px] font-semibold text-copper">Arjun Sharma & Associates</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-4 text-center">
                      <div>
                        <p className="text-[20px] font-bold text-copper">25+</p>
                        <p className="text-[10px] uppercase tracking-wider text-slate">Years</p>
                      </div>
                      <div>
                        <p className="text-[20px] font-bold text-copper">180+</p>
                        <p className="text-[10px] uppercase tracking-wider text-slate">Projects</p>
                      </div>
                      <div>
                        <p className="text-[20px] font-bold text-copper">17+</p>
                        <p className="text-[10px] uppercase tracking-wider text-slate">Awards</p>
                      </div>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper/10 transition-all group-hover:bg-copper">
                      <svg className="h-5 w-5 text-copper group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 text-[13px] text-slate">Click to view full profile →</div>
                </div>
              </div>
            </Link>

            {/* AR. NEERAJ SHARMA - VERTICAL CARD */}
            <Link href="/build-right/architects/neeraj-sharma" className="group panel overflow-hidden transition-all hover:border-copper">
              <div className="cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden ring-2 ring-copper/20 transition-all group-hover:ring-copper group-hover:shadow-[0_0_30px_rgba(217,119,6,0.3)]">
                  <Image
                    src="/team/ar-neeraj-sharma.jpg"
                    alt="Ar. Neeraj Sharma"
                    fill
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-[24px] font-bold group-hover:text-copper transition-colors">Ar. Neeraj Sharma</h3>
                  <p className="mt-2 text-[13px] text-mist">Principal Architect</p>
                  <p className="text-[13px] font-semibold text-copper">Infinity Architects</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-4 text-center">
                      <div>
                        <p className="text-[20px] font-bold text-copper">25+</p>
                        <p className="text-[10px] uppercase tracking-wider text-slate">Years</p>
                      </div>
                      <div>
                        <p className="text-[20px] font-bold text-copper">300+</p>
                        <p className="text-[10px] uppercase tracking-wider text-slate">Projects</p>
                      </div>
                      <div>
                        <p className="text-[20px] font-bold text-copper">LAA</p>
                        <p className="text-[10px] uppercase tracking-wider text-slate">Treasurer</p>
                      </div>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper/10 transition-all group-hover:bg-copper">
                      <svg className="h-5 w-5 text-copper group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 text-[13px] text-slate">Click to view full profile →</div>
                </div>
              </div>
            </Link>

            {/* AR. SHAM SUNDER GUPTA - VERTICAL CARD */}
            <Link href="/build-right/architects/sham-sunder-gupta" className="group panel overflow-hidden transition-all hover:border-copper">
              <div className="cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden ring-2 ring-copper/20 transition-all group-hover:ring-copper group-hover:shadow-[0_0_30px_rgba(217,119,6,0.3)]">
                  <Image
                    src="/team/ar-sham-gupta.jpg"
                    alt="Ar. Sham Sunder Gupta"
                    fill
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-[24px] font-bold group-hover:text-copper transition-colors">Ar. Sham Sunder Gupta</h3>
                  <p className="mt-2 text-[13px] text-mist">Principal Architect</p>
                  <p className="text-[13px] font-semibold text-copper">Axis of Design</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-4 text-center">
                      <div>
                        <p className="text-[20px] font-bold text-copper">25+</p>
                        <p className="text-[10px] uppercase tracking-wider text-slate">Years</p>
                      </div>
                      <div>
                        <p className="text-[20px] font-bold text-copper">150+</p>
                        <p className="text-[10px] uppercase tracking-wider text-slate">Projects</p>
                      </div>
                      <div>
                        <p className="text-[20px] font-bold text-copper">LAA</p>
                        <p className="text-[10px] uppercase tracking-wider text-slate">Gen Sec</p>
                      </div>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper/10 transition-all group-hover:bg-copper">
                      <svg className="h-5 w-5 text-copper group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 text-[13px] text-slate">Click to view full profile →</div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section id="instagram" className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Instagram</Eyebrow>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
              Watch Us Build, <span className="text-copper">Live on Instagram</span>
            </h2>
            <p className="mt-4 max-w-[60ch] text-[17px] text-mist">
              Site visits, before-and-afters, material picks and expert tips — follow{" "}
              <a
                href="https://www.instagram.com/buildrightadvisors/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-copper hover:text-copper-soft"
              >
                @buildrightadvisors
              </a>{" "}
              to see every project as it happens.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel mt-10 flex flex-wrap items-center justify-between gap-6 p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-copper/20">
                  <svg className="h-7 w-7 text-copper" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[18px] font-bold">@buildrightadvisors</p>
                  <p className="mt-1 text-[14px] text-mist">Construction advisory · Ludhiana, Punjab</p>
                </div>
              </div>
              <a
                href="https://www.instagram.com/buildrightadvisors/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-fill text-[13px] md:text-[15px]"
              >
                Follow on Instagram
              </a>
            </div>
          </Reveal>

          {INSTAGRAM_WIDGET_URL ? (
            <Reveal delay={0.15}>
              <div className="panel mt-6 overflow-hidden p-2">
                <iframe
                  src={INSTAGRAM_WIDGET_URL}
                  title="Build Right Advisors — live Instagram feed"
                  className="h-[560px] w-full border-0"
                  loading="lazy"
                />
              </div>
            </Reveal>
          ) : (
            <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
              {INSTA_HIGHLIGHTS.map((post) => (
                <a
                  key={post.title}
                  href="https://www.instagram.com/buildrightadvisors/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel group overflow-hidden transition-all hover:border-copper"
                >
                  {post.src ? (
                    <div className="overflow-hidden">
                      <Media
                        label={post.title}
                        ratio="1/1"
                        src={post.src}
                        className="border-0 ring-0 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="grid aspect-square place-items-center bg-gradient-to-br from-copper-deep via-copper to-copper-soft p-8 text-center">
                      <p className="text-[clamp(1.4rem,2.4vw,2rem)] font-bold leading-tight text-white">
                        {post.quote}
                      </p>
                    </div>
                  )}
                  <div className="p-5 md:p-6">
                    <h3 className="text-[17px] font-bold transition-colors group-hover:text-copper">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-mist">{post.blurb}</p>
                    <span className="mt-4 block text-[12px] font-semibold uppercase tracking-[0.14em] text-copper">
                      View on Instagram →
                    </span>
                  </div>
                </a>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section id="inquiry" className="border-t border-hairline py-section">
        <div className="mx-auto max-w-3xl px-gutter">
          <Reveal>
            <Eyebrow>Get Started</Eyebrow>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
              Book Your Expert Consultation
            </h2>
            <p className="mt-4 text-[17px] text-mist">
              One session with senior architects. Clear guidance before you build. Fee: ₹10,000. We respond within 24 hours.
            </p>
          </Reveal>

          <form className="mt-12 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="field-input mt-2"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="field-input mt-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="field-input mt-2"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
                Project Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                placeholder="e.g., Ludhiana, Punjab"
                className="field-input mt-2"
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
                Service Required *
              </label>
              <select
                id="service"
                name="service"
                required
                className="field-input mt-2"
              >
                <option value="">Select a service</option>
                <option value="pre-build">Pre-Build Planning</option>
                <option value="space-planning">Layout / Space Planning</option>
                <option value="vastu">Vastu Consultation</option>
                <option value="interiors">Interiors</option>
                <option value="construction-advisory">Construction Advisory</option>
                <option value="issue-resolution">Construction Issue Resolution</option>
                <option value="post-build">Post-Build Support</option>
                <option value="complete-package">Complete Consultation Package</option>
              </select>
            </div>

            <div>
              <label htmlFor="projectType" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
                Project Type
              </label>
              <select
                id="projectType"
                name="projectType"
                className="field-input mt-2"
              >
                <option value="">Select type</option>
                <option value="residential">Residential (Home)</option>
                <option value="commercial">Commercial (Office/Shop)</option>
                <option value="renovation">Renovation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about your project requirements, timeline, budget, etc."
                className="field-input mt-2"
              />
            </div>

            <button type="submit" className="btn btn-fill w-full text-[16px]">
              Submit Inquiry
            </button>

            <p className="text-center text-[13px] text-slate">
              We typically respond within 24 hours. For urgent queries, call us directly.
            </p>
          </form>
        </div>
      </section>

      {/* CONTACT US */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Contact Build Right</Eyebrow>
              <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
                Let's Build Right Together
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-mist">
                Our team of construction experts is here to guide you through every stage of your building project.
                Reach out today. Right Advice Today. Lakhs Saved Tomorrow.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-copper/20">
                    <svg className="h-7 w-7 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold uppercase tracking-wider text-slate">Phone</p>
                    <a href="tel:+919888078580" className="mt-2 block text-[18px] font-bold text-copper hover:text-copper-soft">
                      98880 78580
                    </a>
                    <a href="tel:+919988800389" className="block text-[16px] text-mist hover:text-copper">
                      99888 00389
                    </a>
                    <a href="tel:+919815100385" className="block text-[16px] text-mist hover:text-copper">
                      98151 00385
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-copper/20">
                    <svg className="h-7 w-7 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold uppercase tracking-wider text-slate">Email</p>
                    <a href="mailto:buildright@lamediacommunications.com" className="mt-2 block text-[16px] text-copper hover:text-copper-soft">
                      buildright@lamediacommunications.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-copper/20">
                    <svg className="h-7 w-7 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold uppercase tracking-wider text-slate">Hours</p>
                    <p className="mt-2 text-[16px] text-mist">Monday - Saturday: 9 AM - 6 PM</p>
                    <p className="text-[16px] text-mist">Sunday: By Appointment</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-copper/20">
                    <svg className="h-7 w-7 text-copper" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold uppercase tracking-wider text-slate">Follow Us</p>
                    <a
                      href="https://www.instagram.com/buildrightadvisors/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-[16px] text-copper hover:text-copper-soft"
                    >
                      @buildrightadvisors
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel p-8">
              <h3 className="text-[20px] font-bold">Why Choose Build Right?</h3>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-copper" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[15px] text-mist">25+ years of construction industry experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-copper" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[15px] text-mist">300+ successful projects across Punjab</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-copper" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[15px] text-mist">Comprehensive advisory from planning to post-construction</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-copper" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[15px] text-mist">Expert Vastu consultation integrated with modern design</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-copper" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[15px] text-mist">Transparent pricing with no hidden costs</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-copper" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[15px] text-mist">Dedicated support throughout your project journey</span>
                </li>
              </ul>

              <p className="mt-6 rounded-xl border border-copper/30 bg-copper/10 px-4 py-3 text-center text-[15px] font-black uppercase tracking-wide text-copper">
                Right Advice Today. Lakhs Saved Tomorrow.
              </p>

              <div className="mt-8 border-t border-hairline pt-8">
                <p className="text-[14px] font-semibold">Quick Links</p>
                <div className="mt-4 space-y-3">
                  <Link href="/" className="block text-[15px] text-mist transition-colors hover:text-copper">
                    ← Back to LA Media Homepage
                  </Link>
                  <Link href="/register" className="block text-[15px] text-mist transition-colors hover:text-copper">
                    Design Dialect Event
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
