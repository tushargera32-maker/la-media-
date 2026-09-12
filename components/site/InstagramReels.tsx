"use client";

import { useEffect } from "react";
import Script from "next/script";
import { Reveal } from "@/components/motion/Motion";
import { Eyebrow } from "@/components/ui/Primitives";

/*
  Instagram Reels previews via Instagram's official embed (no API key needed).
  - Add public reel/post URLs to REELS below (e.g. https://www.instagram.com/reel/XXXX/).
  - Renders nothing until at least one URL is present, so the section can
    never appear broken/half-built on the live site.
*/

const REELS: { url: string; label: string }[] = [
  // Example: { url: "https://www.instagram.com/reel/XXXXXXXXXXX/", label: "Design Dialect 2.0" },
];

const PROFILE_URL = "https://www.instagram.com/designdialect.india/";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export function InstagramReels() {
  useEffect(() => {
    // Re-run Instagram's embed parser whenever the section mounts.
    let tries = 0;
    const timer = setInterval(() => {
      if (window.instgrm?.Embeds) {
        window.instgrm.Embeds.process();
        clearInterval(timer);
      } else if (++tries > 20) {
        clearInterval(timer);
      }
    }, 500);
    return () => clearInterval(timer);
  }, []);

  if (REELS.length === 0) return null;

  return (
    <>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds.process()}
      />
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>On Instagram</Eyebrow>
                <h2 className="h-tight mt-6 max-w-[18ch] text-[clamp(1.6rem,6vw,3.2rem)]">
                  Reels from the community.
                </h2>
              </div>
              <a
                href={PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                Follow @designdialect.india
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </Reveal>

          <div className="mt-10 grid justify-items-center gap-6 md:mt-14 md:grid-cols-3">
            {REELS.map((reel) => (
              <div key={reel.url} className="w-full max-w-[360px]">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={reel.url}
                  data-instgrm-version="14"
                  style={{ margin: "0 auto", maxWidth: "360px", width: "100%" }}
                >
                  <a href={reel.url} target="_blank" rel="noopener noreferrer">
                    {reel.label} — watch on Instagram
                  </a>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
