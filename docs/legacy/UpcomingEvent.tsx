"use client";

import React from 'react';
import Image from 'next/image';

interface EventStat {
  value: string;
  label: string;
}

interface UpcomingEventProps {
  stats?: EventStat[];
  eventTitle?: string;
  eventDate?: string;
  eventLocation?: string;
  tagline?: string;
  description?: string;
  videoThumbnail?: string;
  videoUrl?: string;
  registrationLink?: string;
  learnMoreLink?: string;
}

/**
 * Every default here used to be invented placeholder copy — including
 * "Design Dialect 2025", "March 15-17, 2025" and a location of
 * "San Francisco, CA". Any omitted prop silently rendered fiction.
 * Defaults are now empty; supply real values or leave the section off.
 */
export default function UpcomingEvent({
  eventTitle = "",
  eventDate = "",
  eventLocation = "",
  tagline = "",
  description = "",
  videoThumbnail = "/event-placeholder.svg",
  videoUrl = "",
  registrationLink = "",
  learnMoreLink = "",
  stats = [],
}: UpcomingEventProps) {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  return (
    <section className="relative w-full bg-accent overflow-hidden">
      {/* Background Pattern/Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent to-accent-dark opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="relative max-w-content mx-auto px-6 lg:px-8 py-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Content Section */}
          <div className="space-y-8 text-white">
            {/* Eyebrow */}
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-mono uppercase tracking-wider">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Upcoming Event
              </span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                {eventTitle}
              </h2>
              <p className="text-2xl md:text-3xl font-light text-white/90">
                {tagline}
              </p>
            </div>

            {/* Event Details */}
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">{eventDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium">{eventLocation}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl leading-relaxed text-white/90 max-w-xl">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={registrationLink}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-accent font-bold rounded-full hover:bg-white/90 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 hover:scale-105"
              >
                Register Now
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
              <a
                href={learnMoreLink}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                Learn More
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Video Preview Section */}
          <div className="relative group">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border-2 border-white/20 shadow-2xl">
              {!isVideoPlaying ? (
                <>
                  {/* Video Thumbnail */}
                  <Image
                    src={videoThumbnail}
                    alt={`${eventTitle} Preview`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Play Button */}
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group/play"
                    aria-label="Play video"
                  >
                    <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-2xl transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-white/95">
                      <svg
                        className="w-8 h-8 ml-1 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>

                  {/* Video Label */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-accent">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 6h2v12H4zm4 0h2v12H8zm4 0h2v12h-2zm4 0h2v12h-2z" />
                      </svg>
                      Watch Event Preview
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <iframe
                    src={videoUrl}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={`${eventTitle} Video`}
                  />
                </div>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -inset-4 bg-white/5 rounded-3xl blur-2xl" />
          </div>
        </div>

        {/* Additional Info Strip.
            Previously hard-coded "50+ Speakers / 30+ Workshops / 1000+ Attendees / 3 Days"
            directly in the markup — unsubstantiated, and it would reappear for any future
            event. Now driven by a `stats` prop that defaults to empty. */}
        {stats.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/80">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-8">
                  {i > 0 && <div className="w-px h-12 bg-white/20" />}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm font-mono uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
