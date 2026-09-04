import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal, RevealGroup } from "@/components/motion/Motion";
import { Media, Eyebrow, ArrowCircle, Button, Unverified } from "@/components/ui/Primitives";
import { CAPABILITIES, EVENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Platforms, events and experiences created by LA Media & Communications.",
};

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-section-sm pt-40">
        <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
          <Media label="WORK - EVENT STAGE, AUDIENCE - 4:3" ratio="4/3" src="/work-header.jpg" className="h-full border-0 ring-0" />
          <span className="absolute inset-0 bg-gradient-to-r from-navy via-navy/55 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Our work</Eyebrow>
            <h1 className="h-display mt-7 max-w-[15ch] text-[clamp(2.2rem,5.5vw,4.4rem)]">
              Platforms that bring an industry together.
            </h1>
            <p className="mt-8 max-w-[44ch] text-[17px] leading-relaxed text-mist">
              Conferences, talks, panel discussions and immersive experiences - designed so the
              conversation continues long after the evening ends.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured edition - Upcoming */}
      <section className="mx-auto max-w-shell px-gutter pb-section">
        <Reveal>
          <div className="mb-8">
            <Eyebrow>Upcoming Event</Eyebrow>
            <h2 className="h-tight mt-6 max-w-[18ch] text-[clamp(1.9rem,4vw,3.2rem)]">
              <span className="text-copper">Design Dialects 2.0</span>
            </h2>
          </div>

          <article className="panel-solid relative overflow-hidden">
            <span className="bloom opacity-50" />
            <div className="relative grid lg:grid-cols-[1.1fr_1fr]">
              <div className="relative">
                {/* Main Poster */}
                <div className="aspect-video lg:aspect-auto">
                  <Image
                    src="/DD 2.0_Page (1).png"
                    alt="Design Dialects 2.0"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Supported By Banner - Below Poster */}
                <div className="relative w-full bg-navy-2 p-4">
                  <Image
                    src="/SUPPORTED BY.png"
                    alt="Supported By Partners"
                    width={600}
                    height={300}
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-copper/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-copper">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-copper"></span>
                  </span>
                  Upcoming
                </div>

                <h3 className="h-tight text-[clamp(1.6rem,3vw,2.4rem)]">
                  {EVENT.name} <span className="text-copper">{EVENT.city}</span>
                </h3>
                <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate">
                  {EVENT.tagline}
                </p>
                <p className="mt-6 max-w-[44ch] text-[15.5px] leading-relaxed text-mist">
                  {EVENT.intro}
                </p>
                <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                  {[["Date", `${EVENT.date} · ${EVENT.day}`], ["Time", EVENT.time],
                    ["Venue", EVENT.venue], ["Address", EVENT.venueAddress]].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate">{k}</dt>
                      <dd className="mt-1.5 text-[14.5px]">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-9 flex flex-wrap gap-4">
                  <Button href="/register/architect" variant="fill">Register as Architect</Button>
                  <Button href="/register/sponsor" variant="line">Book Your Stall</Button>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </section>

      {/* Past Events - Completed Design Dialects */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Past Events</Eyebrow>
            <h2 className="h-tight mt-6 max-w-[18ch] text-[clamp(1.9rem,4vw,3.2rem)]">
              Previous <span className="text-copper">Design Dialects</span> Editions
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-8 md:grid-cols-2">
            {/* Design Dialects 1.0 */}
            <article className="panel group overflow-hidden">
              <div className="relative aspect-video overflow-hidden bg-navy-2">
                <Image
                  src="/past-event-1.jpg"
                  alt="Design Dialects 1.0"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-copper/90 text-white">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center gap-4 text-[12px] text-slate">
                  <span>May 2024</span>
                  <span>•</span>
                  <span>Ludhiana, Punjab</span>
                  <span>•</span>
                  <span className="text-copper">200+ Attendees</span>
                </div>

                <h3 className="text-[22px] font-bold">Design Dialects 1.0</h3>
                <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate">
                  Ideas. Conversations. Impact.
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-[14px] text-mist">
                    <span className="h-1 w-1 rounded-full bg-copper"></span>
                    <span>Industry thought leaders</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-mist">
                    <span className="h-1 w-1 rounded-full bg-copper"></span>
                    <span>Immersive experiences</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-mist">
                    <span className="h-1 w-1 rounded-full bg-copper"></span>
                    <span>Networking opportunities</span>
                  </div>
                </div>

                <Link
                  href="/design-dialects"
                  className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-copper transition-colors hover:text-copper-soft"
                >
                  View Event Details
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </article>

            {/* Placeholder for more past events */}
            <div className="panel flex items-center justify-center p-12 text-center">
              <div>
                <p className="text-[15px] text-mist">More past event highlights coming soon</p>
                <Link href="/design-dialects" className="btn btn-ghost mx-auto mt-6">
                  Explore Design Dialects
                </Link>
              </div>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* What each strand looks like */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal><Eyebrow>Strands of work</Eyebrow></Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
            {CAPABILITIES.map((c, i) => {
              const capabilityImages = [
                "/capability-1.jpg",
                "/capability-2.jpg",
                "/capability-3.jpg",
                "/capability-4.jpg"
              ];
              return (
                <article key={c.slug} className="panel flex h-full flex-col overflow-hidden">
                  <Media label={`${c.title.toUpperCase()} - 16:9`} ratio="16/9" src={capabilityImages[i]} className="border-0 ring-0" />
                <div className="flex flex-1 items-end justify-between gap-6 p-7">
                  <div>
                    <h2 className="text-[14px] font-semibold uppercase tracking-[0.06em]">{c.title}</h2>
                    <p className="mt-3 max-w-[38ch] text-[14px] leading-relaxed text-mist">{c.blurb}</p>
                  </div>
                  <ArrowCircle href="/what-we-do" label={`More about ${c.title}`} />
                </div>
              </article>
            );
          })}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
