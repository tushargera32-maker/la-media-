import type { Metadata } from "next";
import { Reveal, MaskReveal } from "@/components/motion/Motion";
import { Media, Eyebrow, ArrowLink } from "@/components/ui/Primitives";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Partner with LA Media & Communications - for material brands and for architects joining the network.",
};

/*
  Two clearly separated routes into the business, as briefed. Each panel is
  a full editorial block with its own form rather than a lead-gen card, so
  the page doesn't read as a landing page.
*/
export default function PartnerPage() {
  return (
    <>
      {/* 01 - LEAD -------------------------------------------------- */}
      <section className="grid lg:grid-cols-[1fr_1fr]">
        <div className="px-gutter pb-section-sm pt-16 lg:pt-24">
          <Reveal>
            <Eyebrow>Partner with us</Eyebrow>
            <h1 className="display mt-8 max-w-[13ch] text-[clamp(2.2rem,5.4vw,4.6rem)] uppercase">
              Let&rsquo;s build something meaningful together.
            </h1>
            <p className="mt-9 max-w-[40ch] border-l border-wine pl-6 text-[17px] text-ink-body">
              We collaborate with brands and architects who share our vision for a
              better built environment.
            </p>
            <p className="mt-7 text-[16px] text-ink-body">Choose your profile to get started.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-6">
              <ArrowLink href="#brand">I am a brand</ArrowLink>
              <ArrowLink href="#architect">I am an architect</ArrowLink>
            </div>
          </Reveal>
        </div>
        <MaskReveal className="h-full">
          <Media label="PARTNER - ARCHITECTURAL SPACE - 4:3" ratio="4/3" src="/capability-4.jpg" className="h-full min-h-[260px]" />
        </MaskReveal>
      </section>

      {/* 02 - BRAND ------------------------------------------------- */}
      <section id="brand" className="scroll-mt-24 border-t border-ink/10 bg-wine-tint">
        <div className="grid gap-10 px-gutter py-section lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-wine">I am a</p>
            <h2 className="display mt-4 text-[clamp(2.2rem,5vw,4rem)] uppercase">Brand</h2>
            <span className="mt-7 block h-px w-12 bg-wine" />
            <p className="mt-8 max-w-[42ch] text-[17px] text-ink-body">
              Partner with us to showcase your products, connect with the right
              audience and build your brand presence among the architects and
              designers who specify.
            </p>
            <ul className="mt-9 space-y-4">
              {[
                "Presence inside the programme, not around it",
                "Direct access to a specifying audience",
                "Editorial and press coverage across our platforms",
              ].map((point) => (
                <li key={point} className="flex gap-4 border-t border-ink/15 pt-4 text-[16px] text-ink-body">
                  <span className="text-wine">&mdash;</span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <EnquiryForm kind="brand" heading="Apply as a brand" submitLabel="Apply as brand" />
          </Reveal>
        </div>
      </section>

      {/* 03 - ARCHITECT --------------------------------------------- */}
      <section id="architect" className="scroll-mt-24 border-t border-ink/10">
        <div className="grid gap-10 px-gutter py-section lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-wine">I am an</p>
            <h2 className="display mt-4 text-[clamp(2.2rem,5vw,4rem)] uppercase">Architect</h2>
            <span className="mt-7 block h-px w-12 bg-wine" />
            <p className="mt-8 max-w-[42ch] text-[17px] text-ink-body">
              Join our network, collaborate on meaningful initiatives and be part of
              the conversations that shape the industry.
            </p>
            <ul className="mt-9 space-y-4">
              {[
                "A standing network rather than a one-off guest list",
                "A seat in the room on every edition",
                "Opportunities to speak, host and contribute editorially",
              ].map((point) => (
                <li key={point} className="flex gap-4 border-t border-ink/15 pt-4 text-[16px] text-ink-body">
                  <span className="text-wine">&mdash;</span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <EnquiryForm kind="architect" heading="Apply as an architect" submitLabel="Apply as architect" />
          </Reveal>
        </div>
      </section>

      {/* 04 - CLOSE -------------------------------------------------- */}
      <section className="bg-ivory-2 px-gutter py-section-sm">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <p className="max-w-[52ch] text-[17px] text-ink-body">
              Let&rsquo;s collaborate to inspire ideas, create impact and build a
              stronger design community.
            </p>
            <a href={`mailto:${BRAND.email}`} className="btn btn-outline">
              {BRAND.email}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
