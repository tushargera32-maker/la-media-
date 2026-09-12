import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Motion";
import { Eyebrow } from "@/components/ui/Primitives";
import { ArchitectRegistrationForm } from "@/components/forms/ArchitectRegistrationForm";

export const metadata: Metadata = {
  title: "Register as Architect - Design Dialect 2.0 | LA Media",
  description:
    "Architects and designers, register for Design Dialect 2.0 in Ludhiana. Two days of talks, workshops and networking with India's architecture community.",
};

export default function ArchitectRegisterPage() {
  return (
    <>
      {/* INTRO */}
      <section className="relative overflow-hidden pb-section-sm pt-32 md:pt-40">
        <div className="relative mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Attend the Conference</Eyebrow>
            <h1 className="h-display mt-7 max-w-[16ch] text-[clamp(1.8rem,5.5vw,4.4rem)]">
              Register as Architect.
            </h1>
            <span className="mt-8 block h-px w-14 bg-copper" />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[46ch] text-[17px] leading-relaxed text-mist">
              Join 300+ architects and designers for two days of talks,
              workshops and meaningful conversations at Design Dialect 2.0,
              February 6-7, 2027 in Ludhiana. Fill in your details and check
              your email for confirmation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto max-w-shell px-gutter pb-section">
        <Reveal>
          <div className="panel mx-auto max-w-3xl p-6 sm:p-10">
            <ArchitectRegistrationForm />
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
