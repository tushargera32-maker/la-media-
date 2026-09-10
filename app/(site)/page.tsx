import type { Metadata } from "next";
import Link from "next/link";
import {
  Reveal, RevealGroup, HeadingLines, CountUp, Magnetic, Parallax,
} from "@/components/motion/Motion";
import {
  Media, Eyebrow, Button, ArrowLink, ArrowCircle, Unverified,
} from "@/components/ui/Primitives";
import { VerticalSwitcher } from "@/components/site/VerticalSwitcher";
import { EventPopup } from "@/components/site/EventPopup";
import { HERO, STATS, EVENT, CAPABILITIES } from "@/lib/content";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "LA Media & Communications - Ludhiana's Best Event Management Firm",
  description:
    "Ludhiana's leading event management firm specializing in architecture and design conferences. We create platforms that bring the built environment community together. Design Dialect, professional events, and meaningful conversations.",
  keywords: "Ludhiana best event management firm, event management Ludhiana, architecture events Ludhiana, Design Dialect, conference planning Punjab, LA Media Communications, corporate events Ludhiana",
};

export const dynamic = "force-dynamic";

/* ==================================================================
   HOME - follows the approved PDF: hero with the event card and
   platform rail overlaid, then firms, capabilities, insights, CTA.
   ================================================================== */

export default async function HomePage() {
  // Fetch latest 3 published blog posts — never crash the homepage if DB is down
  let insights: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    insights = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
  } catch (error) {
    console.error("Homepage: failed to fetch insights, rendering without them:", error);
    insights = [];
  }
  return (
    <>
      {/* Event Popup */}
      <EventPopup />

      {/* 01 - HERO -------------------------------------------------- */}
      <section className="relative min-h-[100svh] overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {/* Desktop Hero */}
          <Media label="LA Media Hero Desktop" ratio="16/9" src="/heromain.png" className="absolute inset-0 hidden h-full border-0 ring-0 md:block" priority />
          {/* Mobile Hero */}
          <Media label="LA Media Hero Mobile" ratio="9/16" src="/hero-mobile.png" className="absolute inset-0 h-full border-0 ring-0 md:hidden" priority />
        </div>

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

          {/* Event card + stats */}
          <div className="mt-12 grid gap-6 md:mt-16 md:gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-end">
            <Reveal>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate sm:text-[10.5px]">
                LA Media & Communications
              </p>
              <div className="mt-4 border-t border-hairline pt-5 md:mt-5 md:pt-6">
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] sm:text-[15px]">Our Verticals</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 md:mt-6 md:gap-4">
                  {/* Design Dialect Card */}
                  <Link
                    href="/register"
                    className="group panel panel-solid flex items-start gap-3 p-4 transition-all hover:scale-105 hover:border-copper sm:gap-4 sm:p-6"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-copper/10 text-[12px] font-bold text-copper transition-all group-hover:bg-copper group-hover:text-white sm:h-12 sm:w-12 sm:text-[14px]">
                      DD
                    </span>
                    <div className="flex-1">
                      <h3 className="text-[14px] font-bold transition-colors group-hover:text-copper sm:text-[16px]">Design Dialect</h3>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-mist sm:mt-2 sm:text-[13px]">Events, content & community platforms</p>
                    </div>
                  </Link>

                  {/* Build Right Card */}
                  <Link
                    href="/build-right"
                    className="group panel panel-solid flex items-start gap-3 p-4 transition-all hover:scale-105 hover:border-cobalt sm:gap-4 sm:p-6"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cobalt/10 text-[12px] font-bold text-cobalt-soft transition-all group-hover:bg-cobalt group-hover:text-white sm:h-12 sm:w-12 sm:text-[14px]">
                      BR
                    </span>
                    <div className="flex-1">
                      <h3 className="text-[14px] font-bold transition-colors group-hover:text-cobalt-soft sm:text-[16px]">Build Right</h3>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-mist sm:mt-2 sm:text-[13px]">Comprehensive construction advisory services</p>
                    </div>
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="space-y-4 md:space-y-6">
              <Reveal delay={0.1}>
                <div className="panel relative overflow-hidden p-5 sm:p-6 md:p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-copper/10 via-transparent to-cobalt/10" />
                  <div className="relative">
                    <p className="eyebrow text-copper">Don't miss out</p>
                    <h2 className="mt-3 text-[clamp(1.2rem,2.8vw,2rem)] font-bold uppercase tracking-[0.02em] md:mt-4">
                      {EVENT.homeCardName}
                    </h2>
                    <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-mist sm:gap-x-6 sm:text-[14.5px] md:mt-4">
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
                    <div className="mt-5 flex items-center gap-3 md:mt-6 md:gap-4">
                      <Button href="/register" variant="fill" className="flex-1 text-[10px] sm:text-[11px]">Register Now</Button>
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
                      <div key={s.label} className="px-3 py-5 text-center sm:px-4 sm:py-6 md:px-6 md:py-8">
                        <p className="figure text-[clamp(1.5rem,4vw,3rem)] font-bold text-copper">
                          <CountUp value={s.value} />
                        </p>
                        <p className="mt-2 text-[9px] font-semibold uppercase leading-snug tracking-[0.12em] text-slate sm:mt-3 sm:text-[10px] md:mt-4 md:text-[11px]">
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

          {/* What We Do Cover Image */}
          <Reveal className="mt-12">
            <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
              <Media
                label="What We Do - LA Media"
                ratio="21/9"
                src="/what-we-do-cover.png"
                className="h-full border-0 ring-0"
              />
            </div>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 md:mt-14 lg:grid-cols-4">
            {CAPABILITIES.map((c, i) => (
              <article key={c.slug} className="panel flex h-full flex-col p-5 sm:p-6 md:p-7">
                <p className="figure text-[1.2rem] sm:text-[1.5rem]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-[13px] font-semibold uppercase tracking-[0.06em] sm:mt-5 sm:text-[14px] md:mt-6">
                  {c.title}
                </h3>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-mist sm:mt-4 sm:text-[14px]">{c.blurb}</p>
                <div className="mt-5 sm:mt-6 md:mt-7">
                  <ArrowCircle href="/register" label={`Learn more about ${c.title}`} />
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
            {insights.map((post, i) => {
              const insightImages = [
                "/blog-cover-1.png",
                "/blog-cover-2.png",
                "/blog-cover-3.png"
              ];
              const publishedDate = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                : new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

              return (
                <article key={post.slug} className="panel flex h-full flex-col overflow-hidden">
                  <Media label={`${post.category.toUpperCase()} - 16:9`} ratio="16/9" src={post.image || insightImages[i]} className="border-0 ring-0" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-cobalt-soft">
                      {post.category}
                    </span>
                    <span className="text-[12px] text-slate">{publishedDate}</span>
                  </div>
                  <h3 className="mt-4 text-[17px] font-semibold leading-snug">{post.title}</h3>
                  <span className="mt-4 block h-px w-8 bg-copper" />
                  <p className="mt-4 flex-1 text-[14px] leading-relaxed text-mist">{post.excerpt}</p>
                  <ArrowLink href={`/insights/${post.slug}`} className="mt-6">Read more</ArrowLink>
                </div>
              </article>
            );
          })}
          </RevealGroup>

          <p className="mt-8 text-[12px] text-slate">
            Latest insights from LA Media & Communications
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
