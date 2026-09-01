import type { Metadata } from "next";
import { Reveal, RevealGroup } from "@/components/motion/Motion";
import { Media, Eyebrow, ArrowCircle, Button, Unverified } from "@/components/ui/Primitives";
import { OurFirms } from "@/components/site/OurFirms";
import { CAPABILITIES, EVENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Platforms, events and experiences created by LA Media & Communications.",
};

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-section-sm pt-40">
        <div className="absolute right-0 top-0 h-full w-1/2">
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

      {/* Featured edition */}
      <section className="mx-auto max-w-shell px-gutter pb-section">
        <Reveal>
          <article className="panel grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
            <Media label={`${EVENT.name.toUpperCase()} ${EVENT.city.toUpperCase()} - 16:9`} ratio="16/9" src="/featured-event.jpg" className="border-0 ring-0" />
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="eyebrow">Latest edition</p>
              <h2 className="h-tight mt-5 text-[clamp(1.6rem,3vw,2.4rem)]">
                {EVENT.name} <span className="text-cobalt-soft">{EVENT.city}</span>
              </h2>
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
              <div className="mt-9">
                <Button href="/register" variant="fill">Register now</Button>
              </div>
            </div>
          </article>
        </Reveal>

        {/* The source PDF names and dates this event two different ways. */}
        <p className="mt-4 text-[12px] text-slate">
          The design reference gives two names and two dates for this edition
          <Unverified>Confirm before launch</Unverified>
        </p>
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

      <OurFirms />
    </>
  );
}
