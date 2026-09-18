"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { VideoReel } from "@/components/site/VideoReel";

export type VibeVideo = { src: string; label: string };

const AUTOPLAY_MS = 7000;

/**
 * Reel rail - snap carousel with active-card focus.
 * Swipe/drag on touch, arrows + dots on desktop, gentle auto-advance
 * that pauses on hover, touch, focus or hidden tab.
 */
export function VibeCarousel({
  videos,
  className = "",
}: {
  videos: VibeVideo[];
  className?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const pausedRef = useRef(false);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const updateActive = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const center = rail.scrollLeft + rail.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive((prev) => (prev === best ? prev : best));
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    };
    updateActive();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateActive]);

  const goTo = useCallback(
    (i: number) => {
      const rail = railRef.current;
      const card =
        cardRefs.current[((i % videos.length) + videos.length) % videos.length];
      if (!rail || !card) return;
      rail.scrollTo({
        left: card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    },
    [videos.length]
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      goTo(activeRef.current + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [goTo]);

  const setPaused = (v: boolean) => {
    pausedRef.current = v;
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Design Dialect vibe reels"
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {videos.map((video, i) => {
          const isActive = i === active;
          return (
            <figure
              key={video.src}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${videos.length}`}
              className={`w-[228px] shrink-0 snap-center transition-all duration-500 ease-out sm:w-[250px] ${
                isActive
                  ? "scale-100 opacity-100"
                  : "scale-[0.93] opacity-55"
              }`}
            >
              <div
                className={`rounded-xl transition-all duration-500 ${
                  isActive
                    ? "shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)] ring-1 ring-copper/70"
                    : "ring-1 ring-hairline"
                }`}
              >
                <VideoReel src={video.src} label={video.label} />
              </div>
            </figure>
          );
        })}
      </div>

      <p className="mt-5 text-center text-[12px] tracking-wide text-slate">
        Design Dialect 2.0 • Ludhiana
        <span className="ml-3 hidden text-slate/70 sm:inline">
          Drag or use arrows to explore
        </span>
      </p>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose reel">
          {videos.map((video, i) => (
            <button
              key={video.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to reel ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-7 bg-copper"
                  : "w-2 bg-hairline hover:bg-slate"
              }`}
            />
          ))}
        </div>

        <p className="figure text-[15px] tabular-nums text-mist" aria-live="polite">
          {String(active + 1).padStart(2, "0")}
          <span className="mx-1 text-slate">/</span>
          <span className="text-slate">{String(videos.length).padStart(2, "0")}</span>
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Previous reel"
            className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-mist transition-all hover:scale-105 hover:border-copper hover:text-copper"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Next reel"
            className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-mist transition-all hover:scale-105 hover:border-copper hover:text-copper"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
