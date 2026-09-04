import Link from "next/link";
import {
  Reveal, RevealGroup, HeadingLines, CountUp, Magnetic, Parallax,
} from "@/components/motion/Motion";
import {
  Media, Eyebrow, Button, ArrowLink, ArrowCircle, Unverified,
} from "@/components/ui/Primitives";
import { VerticalSwitcher } from "@/components/site/VerticalSwitcher";
import { EventPopup } from "@/components/site/EventPopup";
import { HERO, STATS, EVENT, CAPABILITIES, INSIGHTS } from "@/lib/content";

/* ==================================================================
   HOME - follows the approved PDF: hero with the event card and
   platform rail overlaid, then firms, capabilities, insights, CTA.
   ================================================================== */

export default function HomePage() {
  return (
    <>
      {/* Event Popup */}
      <EventPopup />

      {/* Vertical Switcher - Fixed on right side */}
      <VerticalSwitcher />

      {/* 01 - HERO -------------------------------------------------- */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <Parallax amount={50} className="absolute inset-0">
          <Media label="HERO - ARCHITECTURAL INTERIOR, LIT - 16:9" ratio="16/9" src="/home-hero.jpg" className="h-[112%] border-0 ring-0" priority />
        </Parallax>

        {/* Left-weighted scrim so the headline always holds contrast. */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/70" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-shell flex-col justify-center px-gutter pb-16 pt-32">
          <p className="eyebrow">{HERO.eyebrow}</p>

          <HeadingLines
            lines={HERO.lines}
            accentIndex={2}
            className="h-display mt-7 text-[clamp(2.6rem,7.5vw,6.5rem)]"
          />

          <p className="mt-8 max-w-[44ch] text-[17px] leading-relaxed text-mist">
            {HERO.body}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Magnetic>
              <Button href="/register" variant="fill">Register Now</Button>
            </Magnetic>
            <Magnetic>
              <Button href="/register" variant="line">Connect for sponsorship</Button>
            </Magnetic>
          </div>

          {/* Event card + stats */}
          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-end">
            <Reveal>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
                LA Media & Communications
              </p>
              <div className="mt-5 border-t border-hairline pt-6">
                <h2 className="text-[15px] font-semibold uppercase tracking-[0.08em]">Our Verticals</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-copper/50 text-[11px] font-semibold text-copper">
                      DD
                    </span>
                    <div>
                      <h3 className="text-[13px] font-semibold">Design Dialects</h3>
                      <p className="mt-1 text-[12px] leading-relaxed text-mist">Events, content & community platforms</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cobalt/50 text-[11px] font-semibold text-cobalt-soft">
                      BR
                    </span>
                    <div>
                      <h3 className="text-[13px] font-semibold">Build Right</h3>
                      <p className="mt-1 text-[12px] leading-relaxed text-mist">Advisory for products & materials</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={0.1}>
                <div className="panel relative overflow-hidden p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-copper/10 via-transparent to-cobalt/10" />
                  <div className="relative">
                    <p className="eyebrow text-copper">Don't miss out</p>
                    <h2 className="mt-4 text-[clamp(1.4rem,2.8vw,2rem)] font-bold uppercase tracking-[0.02em]">
                      {EVENT.homeCardName}
                    </h2>
                    <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] text-mist">
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {EVENT.homeCardDate}
                      </span>
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {EVENT.city}, Punjab
                      </span>
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <Button href="/register" variant="fill" className="flex-1">Register Now</Button>
                      <ArrowCircle href="/work" label="View event details" />
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="panel relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/5 via-white/[0.02] to-white/5 ring-1 ring-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-2/60 via-navy-2/30 to-navy-2/60" />
                  <div className="relative grid grid-cols-2 sm:grid-cols-4 divide-x divide-hairline/50">
                    {STATS.map((s) => (
                      <div key={s.label} className="px-6 py-8 text-center">
                        <p className="figure text-[clamp(2rem,4vw,3rem)] font-bold text-copper">
                          <CountUp value={s.value} />
                        </p>
                        <p className="mt-4 text-[11px] font-semibold uppercase leading-snug tracking-[0.12em] text-slate">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 02 - WHAT WE DO -------------------------------------------- */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>What we do</Eyebrow>
                <h2 className="h-tight mt-6 max-w-[18ch] text-[clamp(1.9rem,4vw,3.2rem)]">
                  We design platforms that spark ideas and{" "}
                  <span className="text-copper">drive impact</span>.
                </h2>
              </div>
              <ArrowLink href="/what-we-do">Explore our work</ArrowLink>
            </div>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c, i) => (
              <article key={c.slug} className="panel flex h-full flex-col p-7">
                <p className="figure text-[1.5rem]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-[14px] font-semibold uppercase tracking-[0.06em]">
                  {c.title}
                </h3>
                <p className="mt-4 flex-1 text-[14px] leading-relaxed text-mist">{c.blurb}</p>
                <div className="mt-7">
                  <ArrowCircle href="/what-we-do" label={`More about ${c.title}`} />
                </div>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 03 - INSIGHTS ---------------------------------------------- */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>Insights</Eyebrow>
                <h2 className="h-tight mt-6 max-w-[16ch] text-[clamp(1.9rem,4vw,3.2rem)]">
                  Ideas, perspectives and knowledge.
                </h2>
              </div>
              <ArrowLink href="/insights">Explore all insights</ArrowLink>
            </div>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {INSIGHTS.map((post, i) => {
              const insightImages = [
                "/Cinematic Media Production Studio.png",
                "/Midnight Brand Strategy Session.png",
                "/Creating Experiences That Connect.png"
              ];
              return (
                <article key={post.slug} className="panel flex h-full flex-col overflow-hidden">
                  <Media label={`${post.category.toUpperCase()} - 16:9`} ratio="16/9" src={insightImages[i]} className="border-0 ring-0" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-cobalt-soft">
                      {post.category}
                    </span>
                    <span className="text-[12px] text-slate">{post.date}</span>
                  </div>
                  <h3 className="mt-4 text-[17px] font-semibold leading-snug">{post.title}</h3>
                  <span className="mt-4 block h-px w-8 bg-copper" />
                  <p className="mt-4 flex-1 text-[14px] leading-relaxed text-mist">{post.excerpt}</p>
                  <ArrowLink href="/insights" className="mt-6">Read more</ArrowLink>
                </div>
              </article>
            );
          })}
          </RevealGroup>

          <p className="mt-8 text-[12px] text-slate">
            Article content transcribed from the design reference
            <Unverified>Needs sign-off</Unverified>
          </p>
        </div>
      </section>

      {/* 04 - CTA ---------------------------------------------------- */}
      <section className="relative overflow-hidden border-t border-hairline py-section">
        <span className="bloom opacity-70" />
        <div className="relative mx-auto flex max-w-shell flex-wrap items-center justify-between gap-10 px-gutter">
          <div>
            <h2 className="h-tight max-w-[18ch] text-[clamp(1.9rem,4vw,3.2rem)]">
              Be part of the conversation.
            </h2>
            <p className="mt-5 max-w-[44ch] text-[17px] text-mist">
              Limited seats for the next edition. Register now to secure your spot.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href="/register" variant="fill">Register now</Button>
            <Button href="/contact" variant="ghost">Contact us</Button>
          </div>
        </div>
      </section>
    </>
  );
}
