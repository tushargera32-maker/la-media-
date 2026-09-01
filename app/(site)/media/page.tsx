import type { Metadata } from "next";
import { Reveal, RevealGroup } from "@/components/motion/Motion";
import { Media, Eyebrow } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Media & Gallery",
  description: "Explore our media gallery showcasing events, moments, and highlights from LA Media & Communications.",
};

export default function MediaPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pb-section-sm pt-40">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Media label="MEDIA GALLERY - 4:3" ratio="4/3" src="/capability-2.jpg" className="h-full border-0 ring-0" />
          <span className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Media & Gallery</Eyebrow>
            <h1 className="h-display mt-7 max-w-[16ch] text-[clamp(2.2rem,5.5vw,4.4rem)]">
              Moments that <span className="text-copper">inspire</span>.
            </h1>
            <p className="mt-8 max-w-[44ch] text-[17px] leading-relaxed text-mist">
              Explore our collection of event highlights, behind-the-scenes moments, and the stories
              that bring our community together.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PLACEHOLDER - Gallery will be populated via admin */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <Reveal>
            <div className="panel p-16 text-center">
              <svg className="mx-auto h-16 w-16 text-copper opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h2 className="mt-6 text-[1.4rem] font-semibold">Gallery Coming Soon</h2>
              <p className="mt-3 text-[15px] text-mist">
                We're curating our media gallery. Upload images through the admin panel to showcase
                your events and moments here.
              </p>
              <a href="/admin/gallery" className="btn btn-line mt-6 inline-flex">
                Go to Gallery Admin
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
