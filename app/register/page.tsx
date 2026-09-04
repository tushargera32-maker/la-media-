import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Arrow } from "@/components/ui/Primitives";
import { RegisterChooser } from "@/components/site/RegisterChooser";
import { EVENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Register",
  description: `Register for ${EVENT.name} ${EVENT.city} - Join us as an architect or book your stall`,
};

export default function RegisterLandingPage() {
  return (
    <div className="min-h-screen">
      {/* Slim header */}
      <header className="sticky top-0 z-50 border-b border-hairline bg-navy/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-shell items-center justify-between gap-6 px-gutter py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-[24px] font-bold leading-none tracking-[0.08em]">LA</span>
            <span className="hidden text-[9px] font-semibold uppercase leading-[1.35] tracking-[0.14em] sm:block">
              Media &amp;<br />Communications
            </span>
          </Link>
          <Link href="/" className="link-arrow">
            <span className="rotate-180"><Arrow /></span> Back to site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-shell px-gutter py-16">
        {/* Hero Section */}
        <div className="text-center">
          <p className="eyebrow">Upcoming Event</p>
          <h1 className="h-display mt-6 text-[clamp(2.5rem,6vw,5rem)]">
            {EVENT.name}
          </h1>
          <p className="mt-5 text-[clamp(1rem,2vw,1.3rem)] text-cobalt-soft">
            {EVENT.city} • {EVENT.date}
          </p>
          <p className="mx-auto mt-6 max-w-[50ch] text-[17px] leading-relaxed text-mist">
            {EVENT.intro}
          </p>
        </div>

        {/* Event Poster */}
        <div className="panel relative mx-auto mt-12 max-w-4xl overflow-hidden">
          <Image
            src="/DD 2.0_Page (1).png"
            alt="Design Dialects 2.0 Event Poster"
            width={1200}
            height={1600}
            className="h-auto w-full"
            priority
          />
        </div>

        {/* Registration Options */}
        <div className="mx-auto mt-16 max-w-5xl">
          <h2 className="h-tight text-center text-[clamp(1.8rem,3.5vw,2.8rem)]">
            Join us at <span className="text-copper">Design Dialects 2.0</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[54ch] text-center text-[15.5px] text-mist">
            Choose your registration type below
          </p>

          <RegisterChooser />
        </div>

        {/* Contact Info */}
        <div className="panel mx-auto mt-16 max-w-3xl p-8 text-center">
          <p className="text-[15px] text-mist">
            Have questions or need assistance?
          </p>
          <p className="mt-3 text-[17px]">
            Reach us at{" "}
            <a href="mailto:hello@lamediacommunications.com" className="font-semibold text-copper hover:underline">
              hello@lamediacommunications.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
