"use client";

import { useRef, useState } from "react";

/**
 * Autoplaying local reel clip with tap-to-unmute.
 * No poster file needed: preload="metadata" shows the first frame
 * immediately so no black box lingers before playback starts.
 */
export function VideoReel({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div
      className={`group relative aspect-[9/16] overflow-hidden rounded-xl bg-navy-2 ring-1 ring-hairline transition-all hover:ring-copper/60 ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        aria-label={label}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy/70 to-transparent" />
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? `Unmute ${label}` : `Mute ${label}`}
        className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-navy/70 text-bone shadow-lg backdrop-blur transition-all hover:scale-105 hover:bg-copper hover:text-white"
      >
        {muted ? (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H2v6h4l5 4V5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 9l-6 6M17 9l6 6" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H2v6h4l5 4V5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
          </svg>
        )}
      </button>
    </div>
  );
}
