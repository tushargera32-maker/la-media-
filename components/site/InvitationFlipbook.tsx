"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export const INVITATION_PAGES = [
  { src: "/media/invitation/invite-1.jpg", alt: "Previous Design Dialect (2026) invitation card — Page 1" },
  { src: "/media/invitation/invite-2.jpg", alt: "Previous Design Dialect (2026) invitation card — Page 2, event schedule" },
  { src: "/media/invitation/invite-3.jpg", alt: "Previous Design Dialect (2026) invitation card — Page 3, panel discussion" },
];

const FLIP_MS = 650;
const AUTOPLAY_MS = 6000;

/**
 * InvitationFlipbook — book style slider with a page-turn animation.
 * Single page visible at a time, flips with a 3D rotateY turn.
 * Arrows + dots + thumbnails + swipe + keyboard + gentle autoplay.
 */
export function InvitationFlipbook({
  pages = INVITATION_PAGES,
  className = "",
}: {
  pages?: { src: string; alt: string }[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [flipping, setFlipping] = useState(false);
  const indexRef = useRef(0);
  const flippingRef = useRef(false);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      const total = pages.length;
      const target = ((next % total) + total) % total;
      const cur = indexRef.current;
      if (target === cur || flippingRef.current) return;
      setDirection(target > cur || (cur === total - 1 && target === 0) ? 1 : -1);
      setPrevIndex(cur);
      indexRef.current = target;
      setIndex(target);
      flippingRef.current = true;
      setFlipping(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        flippingRef.current = false;
        setFlipping(false);
        setPrevIndex(null);
      }, FLIP_MS);
    },
    [pages.length]
  );

  const next = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  // Gentle autoplay — pauses on hover / touch / hidden tab / reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (pausedRef.current || document.hidden || flippingRef.current) return;
      goTo(indexRef.current + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [goTo]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Invitation card flipbook"
      className={className}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onTouchStart={() => (pausedRef.current = true)}
      onTouchEnd={() => (pausedRef.current = false)}
    >
      <div className="mx-auto w-full max-w-[520px]">
        {/* ---- Book stage ---- */}
        <div
          className="relative mx-auto w-full max-w-[520px]"
          style={{ perspective: "1600px" }}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) {
              if (dx < 0) next();
              else prev();
            }
            touchX.current = null;
          }}
        >
          {/* soft floor shadow */}
          <div
            aria-hidden
            className="absolute -bottom-6 left-1/2 h-10 w-[80%] -translate-x-1/2 rounded-[100%] bg-black/60 blur-2xl"
          />
          {/* book frame */}
          <div className="panel-solid relative overflow-hidden p-2 sm:p-3">
            <div
              className="relative aspect-[1613/2400] w-full overflow-hidden bg-navy-2"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* outgoing page — stays underneath during flip */}
              {prevIndex != null && flipping && (
                <div className="absolute inset-0">
                  <Image
                    src={pages[prevIndex].src}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(max-width: 640px) 92vw, 520px"
                    className="object-contain"
                  />
                  {/* curl shading while turning */}
                  <span className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/40" />
                </div>
              )}

              {/* incoming page — does the 3D turn */}
              <div
                key={index}
                className="absolute inset-0 origin-left bg-navy-2"
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  transform: flipping
                    ? direction === 1
                      ? "rotateY(0deg)"
                      : "rotateY(0deg)"
                    : "rotateY(0deg)",
                  animation: flipping
                    ? direction === 1
                      ? `invite-turn-next ${FLIP_MS}ms cubic-bezier(.3,.7,.3,1) both`
                      : `invite-turn-prev ${FLIP_MS}ms cubic-bezier(.3,.7,.3,1) both`
                    : undefined,
                  boxShadow: flipping
                    ? "12px 0 40px rgba(0,0,0,.45)"
                    : undefined,
                }}
              >
                <Image
                  src={pages[index].src}
                  alt={pages[index].alt}
                  fill
                  sizes="(max-width: 640px) 92vw, 520px"
                  priority
                  className="object-contain"
                />
                {/* paper sheen sweeping across while turning */}
                {flipping && (
                  <span
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(100deg, transparent 30%, rgba(255,255,255,.22) 48%, rgba(0,0,0,.28) 62%, transparent 80%)",
                      animation: `invite-sheen ${FLIP_MS}ms ease both`,
                    }}
                  />
                )}
                {/* spine fold */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-[10px] bg-gradient-to-r from-black/50 via-black/10 to-transparent"
                />
              </div>

              {/* page edge lines (right side stack) */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-2 right-0 w-[4px] rounded-r bg-gradient-to-b from-white/15 via-white/5 to-white/15"
              />

              {/* corner hint */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 h-14 w-14 bg-gradient-to-bl from-white/12 to-transparent"
                style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
              />
            </div>

            {/* caption bar */}
            <div className="flex items-center justify-between px-2 pb-1 pt-3 sm:px-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate">
                Previous Edition Invitation
              </p>
              <p className="figure text-[15px] tabular-nums" aria-live="polite">
                {String(index + 1).padStart(2, "0")}
                <span className="mx-1 text-slate">/</span>
                <span className="text-slate">{String(pages.length).padStart(2, "0")}</span>
              </p>
            </div>
          </div>

          {/* arrows overlapping the book */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous invitation page"
            className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-hairline bg-navy/85 text-mist backdrop-blur transition-all hover:scale-105 hover:border-copper hover:text-copper sm:-left-6"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next invitation page"
            className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-hairline bg-navy/85 text-mist backdrop-blur transition-all hover:scale-105 hover:border-copper hover:text-copper sm:-right-6"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* page-turn keyframes, scoped to this component */}
      <style>{`
        @keyframes invite-turn-next {
          0% { transform: rotateY(-72deg); opacity: .35; transform-origin: left center; filter: brightness(.75); }
          55% { transform: rotateY(-14deg); opacity: 1; filter: brightness(1.05); }
          100% { transform: rotateY(0deg); opacity: 1; filter: brightness(1); }
        }
        @keyframes invite-turn-prev {
          0% { transform: rotateY(72deg); opacity: .35; transform-origin: right center; filter: brightness(.75); }
          55% { transform: rotateY(14deg); opacity: 1; filter: brightness(1.05); }
          100% { transform: rotateY(0deg); opacity: 1; filter: brightness(1); }
        }
        @keyframes invite-sheen {
          0% { opacity: 0; transform: translateX(-18%); }
          35% { opacity: 1; }
          100% { opacity: 0; transform: translateX(18%); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="invite-turn"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
