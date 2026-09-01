import type { Metadata } from "next";
import { Reveal, RevealGroup, CountUp } from "@/components/motion/Motion";
import { Media, Eyebrow, ArrowLink, Button, Unverified } from "@/components/ui/Primitives";
import { OurFirms } from "@/components/site/OurFirms";
import { STATS, ECOSYSTEM, LEADERSHIP, BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "LA Media & Communications creates meaningful dialogue and connections within the architecture, design and built environment community.",
};

export default function AboutPage() {
  return (
    <>
      {/* 01 - LEAD -------------------------------------------------- */}
      <section className="relative overflow-hidden pb-section-sm pt-40">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Media label="ABOUT - CURVED ARCHITECTURAL FORM - 4:3" ratio="4/3" src="/about-header.jpg" className="h-full border-0 ring-0" />
          <span className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>About us</Eyebrow>
            <h1 className="h-display mt-7 max-w-[16ch] text-[clamp(2.2rem,5.5vw,4.4rem)]">
              Building conversations that shape the future.
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
        </div>
      </section>

      {/* 01B - MISSION & VISION -------------------------------------- */}
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

      {/* 01C - VALUES ------------------------------------------------ */}
      <section className="border-t border-hairline py-section-sm">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Our values</Eyebrow>
            <h2 className="h-tight mt-6 max-w-[18ch] text-[clamp(1.9rem,4vw,3.2rem)]">
              What drives us forward.
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {BRAND.values.map((value) => (
              <article key={value.title} className="panel p-6">
                <h3 className="text-[14px] font-semibold uppercase tracking-[0.06em] text-copper">
                  {value.title}
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-mist">{value.description}</p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 02 - FIGURES ----------------------------------------------- */}
      <section className="mx-auto max-w-shell px-gutter">
        <Reveal>
          <div className="panel grid divide-hairline sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-6 py-8">
                <p className="figure text-[clamp(1.8rem,3vw,2.4rem)]">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-3 text-[10.5px] font-semibold uppercase leading-snug tracking-[0.14em] text-slate">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        <p className="mt-4 text-[12px] text-slate">
          Figures transcribed from the design reference<Unverified>Needs sign-off</Unverified>
        </p>
      </section>

      {/* 03 - ECOSYSTEM --------------------------------------------- */}
      <section className="py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal><Eyebrow>Our ecosystem</Eyebrow></Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ECOSYSTEM.map((item) => (
              <article key={item.title} className="border-t border-hairline pt-6">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-copper/50 text-[11px] font-semibold uppercase tracking-[0.1em] text-copper">
                  {item.title.slice(0, 2)}
                </span>
                <h2 className="mt-6 text-[14px] font-semibold uppercase tracking-[0.06em]">
                  {item.title}
                </h2>
                <p className="mt-4 text-[14px] leading-relaxed text-mist">{item.blurb}</p>
                <ArrowLink href="/what-we-do" className="mt-6">
                  <span className="sr-only">More about {item.title}</span>
                </ArrowLink>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 04 - OUR FIRMS --------------------------------------------- */}
      <OurFirms />

      {/* 05 - LEADERSHIP -------------------------------------------- */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Our leadership</Eyebrow>
            <h2 className="h-display mt-6 max-w-[14ch] text-[clamp(2rem,4.4vw,3.6rem)]">
              The minds behind the vision.
            </h2>
            <p className="mt-7 max-w-[50ch] text-[17px] text-mist">
              We are a team of strategists, designers and storytellers who bring ideas to life
              through meaningful conversations and creative execution.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {LEADERSHIP.map((person, i) => (
              <article key={person.name} className="panel flex h-full flex-col overflow-hidden">
                <Media
                  label={`PORTRAIT - ${person.name.toUpperCase()} - 4:3`}
                  ratio="4/3"
                  src={`/team-${i + 1}.jpg`}
                  className="border-0 ring-0"
                />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="h-tight text-[clamp(1.3rem,2.2vw,1.7rem)]">{person.name}</h3>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-copper">
                    {person.role}
                  </p>
                  <span className="mt-4 block h-px w-8 bg-copper" />
                  <p className="mt-5 flex-1 text-[14px] leading-relaxed text-mist">{person.bio}</p>
                  <div className="mt-7">
                    <ArrowLink href="/contact">
                      <span className="sr-only">Contact {person.name}</span>
                    </ArrowLink>
                  </div>
                </div>
              </article>
            ))}
          </RevealGroup>

          {/* These bios came from a mockup, not from the people in them. */}
          <p className="mt-8 text-[12px] text-slate">
            Roles and biographies transcribed from the design reference
            <Unverified>Needs each person&rsquo;s approval</Unverified>
          </p>
        </div>
      </section>

      {/* 06 - CTA ---------------------------------------------------- */}
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
