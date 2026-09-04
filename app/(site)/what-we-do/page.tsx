import type { Metadata } from "next";
import { Reveal, RevealGroup, CountUp } from "@/components/motion/Motion";
import { Media, Eyebrow, ArrowLink, ArrowCircle, Button, Unverified } from "@/components/ui/Primitives";
import { CAPABILITIES, STATS } from "@/lib/content";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Events and experiences, media and content, community and networks, brand and partnerships.",
};

export default function WhatWeDoPage() {
  return (
    <>
      {/* 01 - LEAD with the stat rail, as in the reference ----------- */}
      <section className="relative overflow-hidden pb-section-sm pt-40">
        <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
          <Media label="WHAT WE DO - STAIRCASE, LIT EDGE - 4:3" ratio="4/3" src="/what-we-do-header.jpg" className="h-full border-0 ring-0" />
          <span className="absolute inset-0 bg-gradient-to-r from-navy via-navy/55 to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-shell gap-12 px-gutter lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
            <h1 className="h-display mt-7 max-w-[16ch] text-[clamp(2.2rem,5.2vw,4.2rem)]">
              We design platforms that spark ideas and{" "}
              <span className="text-copper">drive impact</span>.
            </h1>
            <p className="mt-8 max-w-[44ch] text-[17px] leading-relaxed text-mist">
              From conversations to experiences, we create meaningful touchpoints that connect
              people, knowledge and purpose.
            </p>
            <ArrowLink href="/work" className="mt-9">Explore our work</ArrowLink>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="divide-y divide-hairline border-y border-hairline">
              {STATS.map((s) => (
                <li key={s.label} className="flex items-center gap-6 py-5">
                  <span className="figure w-24 shrink-0 text-[clamp(1.5rem,2.4vw,2rem)]">
                    <CountUp value={s.value} />
                  </span>
                  <span className="text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-slate">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12px] text-slate">
              Figures as given in the design reference<Unverified>Needs sign-off</Unverified>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 02 - CAPABILITY CARDS -------------------------------------- */}
      <section className="pb-section">
        <div className="mx-auto max-w-shell px-gutter">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c, i) => {
              const capabilityImages = [
                "/capability-1.jpg",
                "/capability-2.jpg",
                "/capability-3.jpg",
                "/capability-4.jpg"
              ];
              return (
                <article key={c.slug} className="panel flex h-full flex-col overflow-hidden">
                <div className="flex items-center justify-between p-7 pb-0">
                  <span className="figure text-[1.5rem]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px w-8 bg-copper" />
                </div>
                <div className="p-7 pt-5">
                  <h2 className="text-[14px] font-semibold uppercase tracking-[0.06em]">{c.title}</h2>
                  <p className="mt-4 text-[14px] leading-relaxed text-mist">{c.blurb}</p>
                </div>
                <div className="relative mt-auto">
                  <Media label={`${c.title.toUpperCase()} - 16:9`} ratio="16/9" src={capabilityImages[i]} className="border-0 ring-0" />
                  <div className="absolute bottom-4 right-4">
                    <ArrowCircle href="/work" label={`See ${c.title} work`} />
                  </div>
                </div>
              </article>
            );
          })}
          </RevealGroup>

          <Reveal>
            <div className="panel mt-8 flex flex-wrap items-center justify-between gap-8 p-8">
              <p className="max-w-[46ch] border-l border-copper pl-6 text-[16px] text-mist">
                We believe in the power of ideas, the strength of community and the impact of
                meaningful conversations.
              </p>
              <Button href="/register" variant="fill">Join the next edition</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
