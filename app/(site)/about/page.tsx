import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, RevealGroup, CountUp } from "@/components/motion/Motion";
import { Media, Eyebrow, ArrowLink, Button } from "@/components/ui/Primitives";
import { OurFirms } from "@/components/site/OurFirms";
import { STATS, BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "LA Media & Communications creates meaningful dialogue and connections within the architecture, design and built environment community.",
};

// Top Projects Data
const TOP_PROJECTS = [
  {
    id: "design-dialects-2024",
    title: "Design Dialects 2024",
    description: "Pan-India architecture conference bringing together 300+ architects and designers",
    image: "/project-dd-2024.jpg",
    instagram: "https://instagram.com/lamedia",
    stats: { attendees: "300+", speakers: "15+", cities: "10+" }
  },
  {
    id: "design-dialects-2023",
    title: "Design Dialects 2023",
    description: "Landmark event in Ludhiana showcasing architectural innovation",
    image: "/project-dd-2023.jpg",
    instagram: "https://instagram.com/lamedia",
    stats: { attendees: "250+", speakers: "12+", brands: "50+" }
  },
  {
    id: "architecture-summit",
    title: "Architecture Summit Series",
    description: "Multi-city workshops and panel discussions across North India",
    image: "/project-summit.jpg",
    instagram: "https://instagram.com/lamedia",
    stats: { events: "25+", cities: "8", participants: "2000+" }
  },
];

export default function AboutPage() {
  return (
    <>
      {/* OVERVIEW SECTION */}
      <section className="relative overflow-hidden pb-section-sm pt-40">
        <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
          <Media label="ABOUT - CURVED ARCHITECTURAL FORM - 4:3" ratio="4/3" src="/about-header.jpg" className="h-full border-0 ring-0" />
          <span className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>About LA Media & Communications</Eyebrow>
            <h1 className="h-display mt-7 max-w-[16ch] text-[clamp(2.2rem,5.5vw,4.4rem)]">
              Building platforms for ideas, conversations, and impact.
            </h1>
            <span className="mt-8 block h-px w-14 bg-copper" />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[46ch] text-[17px] leading-relaxed text-mist">
              {BRAND.intro}
            </p>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-mist">
              {BRAND.story}
            </p>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.2}>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="figure text-[clamp(2rem,4vw,3rem)] text-copper">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mx-auto max-w-shell px-gutter pb-section">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="panel p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-copper/50 text-copper">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-[14px] font-semibold uppercase tracking-[0.06em]">Our Mission</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-mist">{BRAND.mission}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-cobalt/50 text-cobalt-soft">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-[14px] font-semibold uppercase tracking-[0.06em]">Our Vision</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-mist">{BRAND.vision}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TOP PROJECTS / EXPERIENCE */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Our Experience</Eyebrow>
            <h2 className="h-display mt-6 max-w-[20ch] text-[clamp(2rem,4.4vw,3.6rem)]">
              Top projects that define our journey.
            </h2>
            <p className="mt-7 max-w-[50ch] text-[17px] text-mist">
              From flagship conferences to multi-city workshops, we've created platforms that bring the architecture and design community together.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-8 lg:grid-cols-3">
            {TOP_PROJECTS.map((project) => (
              <article key={project.id} className="panel group flex h-full flex-col overflow-hidden transition-all hover:border-copper">
                <Link href={`/work/${project.id}`} className="block">
                  <Media
                    label={project.title}
                    ratio="16/9"
                    src={project.image}
                    className="border-0 ring-0 transition-transform group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-7">
                  <Link href={`/work/${project.id}`}>
                    <h3 className="h-tight text-[clamp(1.3rem,2.2vw,1.7rem)] transition-colors group-hover:text-copper">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="mt-4 flex-1 text-[14px] leading-relaxed text-mist">
                    {project.description}
                  </p>

                  {/* Project Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-hairline pt-6">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-[1.3rem] font-bold text-copper">{value}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-wider text-slate">{key}</p>
                      </div>
                    ))}
                  </div>

                  {/* Instagram Link */}
                  <div className="mt-6 flex items-center gap-4">
                    <Link
                      href={project.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-copper transition-colors hover:text-copper-soft"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      View on Instagram
                    </Link>

                    <Link
                      href={`/work/${project.id}`}
                      className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-mist transition-colors hover:text-bone"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* OUR FIRMS */}
      <OurFirms />

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-hairline py-section">
        <span className="bloom opacity-60" />
        <div className="relative mx-auto flex max-w-shell flex-wrap items-center justify-between gap-8 px-gutter">
          <h2 className="h-tight max-w-[18ch] text-[clamp(1.8rem,3.6vw,2.8rem)]">
            Let&rsquo;s build something meaningful together.
          </h2>
          <Button href="/contact" variant="fill">Get in touch</Button>
        </div>
      </section>
    </>
  );
}
