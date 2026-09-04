import type { Metadata } from "next";
import Link from "next/link";
import { Media, Arrow } from "@/components/ui/Primitives";
import { ArchitectRegistrationForm } from "@/components/forms/ArchitectRegistrationForm";
import { FAQSection } from "@/components/site/FAQSection";
import { EVENT, BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Architect Registration",
  description: `Register as an architect for ${EVENT.name} ${EVENT.city}`,
};

export default function ArchitectRegistrationPage() {
  return (
    <div className="min-h-screen">
      {/* Slim bar */}
      <header className="sticky top-0 z-50 border-b border-hairline bg-navy/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-shell items-center justify-between gap-6 px-gutter py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-[24px] font-bold leading-none tracking-[0.08em]">LA</span>
            <span className="hidden text-[9px] font-semibold uppercase leading-[1.35] tracking-[0.14em] sm:block">
              Media &amp;<br />Communications
            </span>
          </Link>
          <Link href="/register" className="link-arrow">
            <span className="rotate-180"><Arrow /></span> Back to options
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-shell gap-10 px-gutter py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
        {/* LEFT - event story */}
        <aside>
          <p className="eyebrow text-cobalt-soft">Architect Registration</p>

          <h1 className="h-display mt-6 text-[clamp(2.2rem,5vw,3.8rem)]">
            {EVENT.name.split(" ").map((w) => (
              <span key={w} className="block">{w}</span>
            ))}
            <span className="block text-cobalt-soft">{EVENT.city}</span>
          </h1>

          <p className="mt-6 text-[clamp(1rem,1.6vw,1.2rem)] font-medium">{EVENT.tagline}</p>

          <p className="mt-6 max-w-[42ch] text-[15.5px] leading-relaxed text-mist">
            {EVENT.intro}
          </p>

          <dl className="mt-10 space-y-6">
            {[
              ["Date", EVENT.date, EVENT.day],
              ["Time", EVENT.time, EVENT.timeNote],
              ["Venue", EVENT.venue, EVENT.venueAddress],
            ].map(([label, value, note]) => (
              <div key={label} className="flex gap-5 border-t border-hairline pt-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cobalt/50 text-[10px] font-semibold uppercase tracking-[0.1em] text-cobalt">
                  {label.slice(0, 2)}
                </span>
                <div>
                  <dt className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate">{label}</dt>
                  <dd className="mt-1 text-[16px] font-medium">{value}</dd>
                  <dd className="mt-0.5 text-[13px] text-mist">{note}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="panel mt-10 p-6">
            <p className="eyebrow text-cobalt-soft">What to expect</p>
            <ul className="mt-5 grid grid-cols-2 gap-5">
              {EVENT.expect.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-px w-4 shrink-0 bg-cobalt" />
                  <span className="text-[13.5px] leading-snug text-mist">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel mt-6 flex items-center gap-5 overflow-hidden">
            <div className="w-32 shrink-0">
              <Media label="VENUE - 1:1" ratio="1/1" src="/venue.jpg" className="border-0 ring-0" />
            </div>
            <div className="py-5 pr-6">
              <p className="text-[14px] font-semibold">Be part of the conversation.</p>
              <p className="mt-1 text-[13px] text-mist">Limited seats available.</p>
            </div>
          </div>

          <p className="mt-8 text-[13px] text-slate">
            Questions? Write to{" "}
            <a href={`mailto:${BRAND.email}`} className="text-cobalt hover:underline">{BRAND.email}</a>
          </p>
        </aside>

        {/* RIGHT - form */}
        <section className="panel h-fit p-6 lg:p-10">
          <ArchitectRegistrationForm />
        </section>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
