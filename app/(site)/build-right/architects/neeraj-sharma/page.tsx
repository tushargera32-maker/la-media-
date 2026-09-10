import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal, RevealGroup } from "@/components/motion/Motion";
import { Media, Eyebrow } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Ar. Neeraj Sharma - Principal Architect | Build Right Advisors",
  description: "Ar. Neeraj Sharma brings 25+ years of architectural excellence. Principal Architect at Infinity Architects with 300+ projects. LAA Treasurer.",
};

export default function NeerajSharmaPage() {
  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full border-b border-hairline bg-navy/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-shell items-center justify-between px-gutter py-4">
          <Link href="/build-right" className="flex items-center gap-3 text-[14px] text-mist hover:text-copper transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Build Right
          </Link>
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-40">
              <Image
                src="/firm-la-media.png"
                alt="LA Media & Communications"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] overflow-hidden pt-32">
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            <Image
              src="/team/ar-neeraj-sharma.jpg"
              alt="Ar. Neeraj Sharma"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/60" />
          </div>
        </div>

        <div className="relative mx-auto max-w-shell px-gutter pb-20">
          <Reveal>
            <div className="inline-block rounded-full border border-copper/50 bg-copper/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-copper">
              Principal Architect
            </div>
            <h1 className="mt-6 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1]">
              Ar. Neeraj Sharma
            </h1>
            <p className="mt-6 max-w-[50ch] text-[18px] leading-relaxed text-mist">
              25+ years of architectural excellence. 300+ projects. Treasurer of Ludhiana Architects Association. Clarity, transparency, and informed decision-making.
            </p>

            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-copper/20">
                  <svg className="h-6 w-6 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-wider text-copper">Practice</p>
                  <p className="text-[16px] font-bold">Infinity Architects</p>
                </div>
              </div>

              <a
                href="https://instagram.com/mailtoneeraj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-copper/20">
                  <svg className="h-6 w-6 text-copper" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-wider text-copper">Instagram</p>
                  <p className="text-[16px] font-bold hover:text-copper transition-colors">@mailtoneeraj</p>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS GRID */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <RevealGroup className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            <div className="panel p-6 text-center">
              <p className="text-[3rem] font-bold text-copper">25+</p>
              <p className="mt-2 text-[12px] font-semibold uppercase tracking-wider text-slate">Years Experience</p>
            </div>
            <div className="panel p-6 text-center">
              <p className="text-[3rem] font-bold text-copper">300+</p>
              <p className="mt-2 text-[12px] font-semibold uppercase tracking-wider text-slate">Projects Completed</p>
            </div>
            <div className="panel p-6 text-center">
              <p className="text-[3rem] font-bold text-copper">8</p>
              <p className="mt-2 text-[12px] font-semibold uppercase tracking-wider text-slate">Service Offerings</p>
            </div>
            <div className="panel p-6 text-center">
              <p className="text-[3rem] font-bold text-copper">LAA</p>
              <p className="mt-2 text-[12px] font-semibold uppercase tracking-wider text-slate">Treasurer</p>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Reveal>
                <Eyebrow>About</Eyebrow>
                <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
                  Clarity, Transparency, <span className="text-copper">Informed Decisions</span>
                </h2>
              </Reveal>

              <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-mist">
                <p>
                  <strong className="text-bone">Ar. Neeraj Sharma</strong> brings over 25 years of distinguished experience as Principal Architect at Infinity Architects. A proud alumnus of Guru Nanak Dev University, Amritsar (B.Architecture, 1996-2001), he has established himself as one of Punjab's most trusted construction advisors.
                </p>
                <p>
                  His practice encompasses residential villas, commercial complexes, healthcare facilities, hospitality ventures, and institutional developments. As Treasurer of the Ludhiana Architects Association, his approach emphasizes clarity, transparency, and informed decision-making throughout the construction process.
                </p>
                <p>
                  As Co-founder of Fusion Infrastructure and LA Media & Communications LLP, Ar. Neeraj Sharma continues to guide clients through successful building projects across Punjab and beyond.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="panel p-6">
                <p className="text-[13px] font-semibold uppercase tracking-wider text-slate">Education</p>
                <div className="mt-4">
                  <p className="text-[15px] text-mist">B.Architecture</p>
                  <p className="text-[15px] text-mist">Guru Nanak Dev University, Amritsar</p>
                  <p className="text-[14px] text-slate">1996-2001</p>
                </div>
              </div>

              <div className="panel p-6">
                <p className="text-[13px] font-semibold uppercase tracking-wider text-slate">Professional Registration</p>
                <div className="mt-4 space-y-3">
                  <p className="text-[15px] text-mist">Council of Architecture: CA/2002/30177</p>
                  <p className="text-[15px] text-mist">Indian Institute of Architects: 16497</p>
                </div>
              </div>

              <div className="panel p-6">
                <p className="text-[13px] font-semibold uppercase tracking-wider text-slate">Professional Association</p>
                <div className="mt-4">
                  <p className="text-[15px] text-mist">Ludhiana Architects Association</p>
                  <p className="text-[14px] text-copper font-semibold">Treasurer</p>
                </div>
              </div>

              <div className="panel p-6">
                <p className="text-[13px] font-semibold uppercase tracking-wider text-slate">Specializations</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-copper/10 px-3 py-1.5 text-[12px] font-semibold text-copper">Residential</span>
                  <span className="rounded-full bg-copper/10 px-3 py-1.5 text-[12px] font-semibold text-copper">Commercial</span>
                  <span className="rounded-full bg-copper/10 px-3 py-1.5 text-[12px] font-semibold text-copper">Healthcare</span>
                  <span className="rounded-full bg-copper/10 px-3 py-1.5 text-[12px] font-semibold text-copper">Hospitality</span>
                  <span className="rounded-full bg-copper/10 px-3 py-1.5 text-[12px] font-semibold text-copper">Vastu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED PROJECTS */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Portfolio</Eyebrow>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
              Selected Projects
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="panel p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-copper">Commercial</p>
              <p className="mt-3 text-[18px] font-bold">Handa City Center</p>
              <p className="text-[14px] text-slate">Phagwara</p>
            </div>
            <div className="panel p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-copper">Retail</p>
              <p className="mt-3 text-[18px] font-bold">Mask Boutiques</p>
              <p className="text-[14px] text-slate">Multi-city</p>
            </div>
            <div className="panel p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-copper">Hospitality</p>
              <p className="mt-3 text-[18px] font-bold">Palm Garden Resort</p>
              <p className="text-[14px] text-slate">Ludhiana</p>
            </div>
            <div className="panel p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-copper">Healthcare</p>
              <p className="mt-3 text-[18px] font-bold">Delta Scan</p>
              <p className="text-[14px] text-slate">Ludhiana</p>
            </div>
            <div className="panel p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-copper">Residential</p>
              <p className="mt-3 text-[18px] font-bold">Luxury Villa</p>
              <p className="text-[14px] text-slate">Ludhiana</p>
            </div>
            <div className="panel p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-copper">Healthcare</p>
              <p className="mt-3 text-[18px] font-bold">Avo Med Pharmacy</p>
              <p className="text-[14px] text-slate">Ludhiana</p>
            </div>
            <div className="panel p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-copper">Residential</p>
              <p className="mt-3 text-[18px] font-bold">Modern Farmhouse</p>
              <p className="text-[14px] text-slate">Jalandhar</p>
            </div>
            <div className="panel p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-copper">Commercial</p>
              <p className="mt-3 text-[18px] font-bold">Commercial Plaza</p>
              <p className="text-[14px] text-slate">Chandigarh</p>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* PROJECT GALLERY */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Gallery</Eyebrow>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
              Project Gallery
            </h2>
            <p className="mt-4 text-[17px] text-mist">
              A visual journey through selected architectural works
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg bg-navy-2">
                <Media
                  label={`Ar. Neeraj Sharma Project ${i}`}
                  ratio="1/1"
                  src={`/team/projects/neeraj-${i}.jpg`}
                  className="h-full border-0 ring-0 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-3xl px-gutter text-center">
          <Reveal>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
              Work With Ar. Neeraj Sharma
            </h2>
            <p className="mt-6 text-[17px] text-mist">
              Get expert architectural guidance for your next project
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/build-right#inquiry" className="btn btn-fill">
                Request Consultation
              </Link>
              <a href="tel:+919988800389" className="btn btn-line">
                Call: 99888 00389
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
