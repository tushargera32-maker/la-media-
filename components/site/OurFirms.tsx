"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Motion";
import { Eyebrow, Media } from "@/components/ui/Primitives";
import { BuildRightModal } from "./BuildRightModal";

/* ==================================================================
   LA MEDIA VERTICALS

   LA Media & Communications is the single parent brand with two
   distinct verticals: Design Dialect (events/content) and Build Right
   (advisory). This section presents them as part of the LA Media
   ecosystem, not as separate firms.
   ================================================================== */

const VERTICALS = [
  {
    slug: "design-dialects",
    code: "DD",
    name: "Design Dialect",
    discipline: "Events · Content · Community · Platforms",
    blurb:
      "Thought-provoking talks, immersive experiences, and meaningful conversations that bring the architecture and design community together.",
    image: "/firm-la-media.jpg",
    color: "copper",
  },
  {
    slug: "build-right",
    code: "BR",
    name: "Build Right Advisors",
    discipline: "Advisory · Products · Materials · Processes",
    blurb:
      "Expert advisory for building products, materials, and construction processes. Helping you make informed decisions for your project.",
    image: "/firm-build-right.png",
    color: "cobalt",
  },
];

export function OurFirms() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Our Verticals</Eyebrow>
            <h2 className="h-tight mt-6 max-w-[18ch] text-[clamp(1.9rem,4vw,3.2rem)]">
              Two distinct platforms, one vision.
            </h2>
            <p className="mt-6 max-w-[54ch] text-[17px] text-mist">
              Under LA Media &amp; Communications, we operate two specialized verticals
              serving the architecture and built environment community.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {VERTICALS.map((vertical, i) => {
              const isDesignDialects = vertical.slug === "design-dialects";
              const colorClass = vertical.color === "copper" ? "copper" : "cobalt-soft";
              const borderClass = vertical.color === "copper" ? "copper/60" : "cobalt/60";

              return (
                <Reveal key={vertical.slug} delay={i * 0.1}>
                  <article
                    className={`relative flex h-full flex-col overflow-hidden ${
                      isDesignDialects ? "panel-solid" : "panel"
                    }`}
                  >
                    {isDesignDialects && <span className="bloom opacity-70" />}

                    <div className="relative">
                      <Media
                        label={`${vertical.name.toUpperCase()} - 16:9`}
                        ratio="16/9"
                        src={vertical.image}
                        className="border-0 ring-0"
                      />
                    </div>

                    <div className="relative flex flex-1 flex-col p-8 lg:p-10">
                      <div className="flex items-center gap-4">
                        <span
                          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-${borderClass} text-[12px] font-semibold tracking-[0.08em] text-${colorClass}`}
                        >
                          {vertical.code}
                        </span>
                        <p className={`text-[10.5px] font-semibold uppercase tracking-[0.16em] text-${colorClass}`}>
                          LA Media Vertical
                        </p>
                      </div>

                      <h3 className="h-tight mt-6 text-[clamp(1.3rem,2.4vw,1.9rem)]">
                        {vertical.name}
                      </h3>

                      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                        {vertical.discipline}
                      </p>

                      <p className="mt-6 flex-1 text-[15.5px] leading-relaxed text-mist">
                        {vertical.blurb}
                      </p>

                      {!isDesignDialects && (
                        <button
                          onClick={() => setModalOpen(true)}
                          className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-cobalt-soft transition-colors hover:text-cobalt"
                        >
                          Request Consultation
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <BuildRightModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
