import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Arrow } from "@/components/ui/Primitives";
import { Reveal, RevealGroup } from "@/components/motion/Motion";
import { EVENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Design Dialect - LA Media",
  description: "Thought-provoking talks, immersive experiences, and meaningful conversations for the architecture and design community",
};

// Past events data - you can move this to lib/content.ts later
const PAST_EVENTS = [
  {
    id: "dd-1",
    title: "Design Dialect",
    date: "July 2025",
    location: "Ludhiana, Punjab",
    attendees: "200+",
    image: "/past-event-1.jpg",
    videoUrl: "https://youtube.com/...",
    highlights: [
      "Industry thought leaders",
      "Immersive experiences",
      "Networking opportunities",
    ],
  },
  // Add more past events here
];

export default function DesignDialectsPage() {
  // Calculate time remaining for upcoming event
  const eventDate = new Date("2027-02-13T00:00:00");
  const now = new Date();
  const timeRemaining = eventDate.getTime() - now.getTime();
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-hairline bg-navy/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-shell items-center justify-between gap-6 px-gutter py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-[24px] font-bold leading-none tracking-[0.08em]">LA</span>
            <span className="hidden text-[9px] font-semibold uppercase leading-[1.35] tracking-[0.14em] sm:block">
              Media &amp;<br />Communications
            </span>
          </Link>
          <Link href="/" className="link-arrow">
            <span className="rotate-180"><Arrow /></span> Back to site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-shell px-gutter py-16">
        {/* Hero Section */}
        <Reveal>
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-copper/60 text-[16px] font-bold tracking-[0.08em] text-copper">
              DD
            </div>
            <h1 className="h-display text-[clamp(2.5rem,6vw,5rem)]">
              Design Dialect
            </h1>
            <p className="mx-auto mt-6 max-w-[60ch] text-[18px] leading-relaxed text-mist">
              Thought-provoking talks, immersive experiences, and meaningful conversations
              that bring the architecture and design community together.
            </p>
          </div>
        </Reveal>

        {/* Featured Upcoming Event with Timer */}
        <Reveal delay={0.1}>
          <div className="panel-solid relative mx-auto mt-16 max-w-5xl overflow-hidden">
            <span className="bloom opacity-50" />
            <div className="relative p-8 md:p-12">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-copper/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-copper">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-copper"></span>
                </span>
                Upcoming Event
              </div>

              <h2 className="h-tight text-[clamp(2rem,4vw,3.5rem)]">
                {EVENT.name}
              </h2>

              <div className="mt-6 flex flex-wrap gap-6 text-[15px] text-mist">
                <span className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {EVENT.date}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {EVENT.city}, Punjab
                </span>
              </div>

              {/* Countdown Timer */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                <div className="panel text-center">
                  <p className="figure text-[clamp(1.5rem,4vw,3rem)] text-copper">{Math.floor(daysRemaining)}</p>
                  <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate sm:text-[10px]">Days</p>
                </div>
                <div className="panel text-center">
                  <p className="figure text-[clamp(1.5rem,4vw,3rem)]">00</p>
                  <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate sm:text-[10px]">Hours</p>
                </div>
                <div className="panel text-center">
                  <p className="figure text-[clamp(1.5rem,4vw,3rem)]">00</p>
                  <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate sm:text-[10px]">Minutes</p>
                </div>
                <div className="panel text-center">
                  <p className="figure text-[clamp(1.5rem,4vw,3rem)]">00</p>
                  <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate sm:text-[10px]">Seconds</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/register/architect"
                  className="btn btn-fill flex-1 justify-center min-w-[200px] sm:flex-initial"
                >
                  Register as Architect
                </Link>
                <Link
                  href="/register/sponsor"
                  className="btn btn-line flex-1 justify-center min-w-[200px] sm:flex-initial"
                >
                  Book Your Stall
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Event Poster */}
        <Reveal delay={0.2}>
          <div className="panel relative mx-auto mt-12 max-w-4xl overflow-hidden">
            <Image
              src="/DD 2.0_Page (1).png"
              alt="Design Dialect 2.0 Event Poster"
              width={1200}
              height={1600}
              className="h-auto w-full"
            />
          </div>
        </Reveal>

        {/* Supported By Section */}
        <Reveal delay={0.25}>
          <div className="panel relative mx-auto mt-12 max-w-4xl overflow-hidden">
            <Image
              src="/supported-by.png"
              alt="Supported By Partners"
              width={1200}
              height={600}
              className="h-auto w-full"
            />
          </div>
        </Reveal>

        {/* Past Events Section */}
        <section className="mt-24">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow">Our Journey</p>
              <h2 className="h-tight mt-6 text-[clamp(2rem,4vw,3.5rem)]">
                Past <span className="text-copper">Design Dialect</span> Events
              </h2>
              <p className="mx-auto mt-6 max-w-[54ch] text-[17px] text-mist">
                Relive the moments, conversations, and ideas that shaped meaningful connections
                in the architecture and design community.
              </p>
            </div>
          </Reveal>

          {/* Past Events Grid */}
          <RevealGroup className="mt-14 grid gap-8 md:grid-cols-2">
            {PAST_EVENTS.map((event) => (
              <article key={event.id} className="panel group overflow-hidden">
                <div className="relative aspect-video overflow-hidden bg-navy-2">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {event.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-copper/90 text-white">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-center gap-4 text-[12px] text-slate">
                    <span>{event.date}</span>
                    <span>•</span>
                    <span>{event.location}</span>
                    <span>•</span>
                    <span className="text-copper">{event.attendees} Attendees</span>
                  </div>

                  <h3 className="text-[22px] font-bold">{event.title}</h3>

                  <div className="mt-4 space-y-2">
                    {event.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-[14px] text-mist">
                        <span className="h-1 w-1 rounded-full bg-copper"></span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {event.videoUrl && (
                    <a
                      href={event.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-copper transition-colors hover:text-copper-soft"
                    >
                      Watch Highlights
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </RevealGroup>

          {/* Placeholder for when you have real past events */}
          {PAST_EVENTS.length === 0 && (
            <div className="panel mx-auto mt-14 max-w-2xl p-12 text-center">
              <p className="text-[15px] text-mist">
                Our past event highlights will be showcased here soon. Stay tuned!
              </p>
            </div>
          )}
        </section>

        {/* Gallery Preview */}
        <section className="mt-24">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow">Memories</p>
              <h2 className="h-tight mt-6 text-[clamp(2rem,4vw,3.5rem)]">
                Event Gallery
              </h2>
            </div>
          </Reveal>

          <div className="panel mx-auto mt-14 max-w-4xl p-12 text-center">
            <p className="text-[15px] text-mist">
              Photo galleries from past Design Dialect events coming soon.
            </p>
            <Link href="/" className="btn btn-ghost mx-auto mt-6">
              Browse All Events
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="panel-solid relative mx-auto mt-24 max-w-5xl overflow-hidden">
          <span className="bloom opacity-40" />
          <div className="relative p-12 text-center">
            <h2 className="h-tight text-[clamp(1.8rem,3.5vw,2.8rem)]">
              Don't miss the next edition
            </h2>
            <p className="mx-auto mt-4 max-w-[50ch] text-[16px] text-mist">
              Limited seats available. Register now to be part of meaningful conversations
              that shape the future of design.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/register/architect" className="btn btn-fill">
                Register as Architect
              </Link>
              <Link href="/register/sponsor" className="btn btn-line">
                Book Your Stall
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
