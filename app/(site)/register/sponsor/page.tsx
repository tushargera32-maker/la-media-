import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Motion";
import { Eyebrow } from "@/components/ui/Primitives";
import { SponsorRegistrationForm } from "@/components/forms/SponsorRegistrationForm";

export const metadata: Metadata = {
  title: "Book Your Stall - Exhibit at Design Dialect 2.0 | LA Media",
  description:
    "Exhibit your brand at Design Dialect 2.0, Ludhiana's premier architecture conference. Book a stall and put your products in front of 300+ architects and designers.",
};

const STALL_SIZES = ["Small (3×3 m)", "Standard (3×6 m)", "Large (6×6 m)", "Custom Size"];

export default function SponsorRegisterPage() {
  return (
    <>
      {/* INTRO */}
      <section className="relative overflow-hidden pb-section-sm pt-32 md:pt-40">
        <div className="relative mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Exhibit Your Brand</Eyebrow>
            <h1 className="h-display mt-7 max-w-[16ch] text-[clamp(2.2rem,5.5vw,4.4rem)]">
              Book Your Stall at Design Dialect 2.0.
            </h1>
            <span className="mt-8 block h-px w-14 bg-copper" />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[46ch] text-[17px] leading-relaxed text-mist">
              Put your products and materials in front of 300+ architects,
              designers and decision makers from across Punjab and beyond.
              Fill in your company details and our team will reach out within
              24 hours with payment and setup information.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              {STALL_SIZES.map((size) => (
                <span
                  key={size}
                  className="rounded-full border border-copper/30 bg-copper/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-copper"
                >
                  {size}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto max-w-shell px-gutter pb-section">
        <Reveal>
          <div className="panel mx-auto max-w-3xl p-6 sm:p-10">
            <SponsorRegistrationForm />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-between gap-4">
            <Link href="/register" className="text-[14px] text-mist transition-colors hover:text-copper">
              ← Back to registration
            </Link>
            <a
              href="mailto:lamediacommunications@gmail.com"
              className="text-[14px] text-copper hover:text-copper-soft"
            >
              Questions? lamediacommunications@gmail.com
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
