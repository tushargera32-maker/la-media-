import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/ui/Primitives";
import { SponsorRegistrationForm } from "@/components/forms/SponsorRegistrationForm";
import { EVENT, BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book Your Stall",
  description: `Book a stall at ${EVENT.name} ${EVENT.city} - Showcase your brand to architects`,
};

export default function SponsorRegistrationPage() {
  return (
    <div className="min-h-screen">
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
        {/* LEFT - sponsor story */}
        <aside>
          <p className="eyebrow">Book Your Stall</p>
          <h1 className="h-display mt-6 text-[clamp(2.2rem,5vw,3.8rem)]">
            <span className="block">Showcase at</span>
            <span className="block">{EVENT.name}</span>
            <span className="block text-copper">{EVENT.city}</span>
          </h1>

          <p className="mt-6 max-w-[42ch] text-[15.5px] leading-relaxed text-mist">
            Put your brand in front of hundreds of architects, designers and built
            environment professionals at one of Punjab's premier design conclaves.
          </p>

          <dl className="mt-10 space-y-6">
            {[
              ["Date", EVENT.date, EVENT.day],
              ["Venue", EVENT.venue, EVENT.venueAddress],
              ["Audience", "300+ Professionals", "Architects, designers, industry leaders"],
            ].map(([label, value, note]) => (
              <div key={label} className="flex gap-5 border-t border-hairline pt-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-copper/50 text-[10px] font-semibold uppercase tracking-[0.1em] text-copper">
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
            <p className="eyebrow">Why exhibit with us</p>
            <ul className="mt-5 space-y-4">
              {[
                "Direct access to 300+ architects & designers",
                "Premium brand visibility across all event collateral",
                "Live product demonstrations to relevant audience",
                "Featured in event media coverage & social posts",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-px w-4 shrink-0 bg-copper" />
                  <span className="text-[13.5px] leading-snug text-mist">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel mt-6 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">Stall sizes available</p>
            <div className="mt-4 grid grid-cols-3 divide-x divide-hairline">
              {[["Small", "3×3 m"], ["Standard", "3×6 m"], ["Large", "6×6 m"]].map(([size, dims]) => (
                <div key={size} className="px-4 py-3 text-center">
                  <p className="text-[13px] font-semibold text-copper">{size}</p>
                  <p className="mt-1 text-[12px] text-mist">{dims}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-[13px] text-slate">
            Questions about stall packages?{" "}
            <a href={`mailto:${BRAND.email}`} className="text-copper hover:underline">{BRAND.email}</a>
          </p>
        </aside>

        {/* RIGHT - form */}
        <section className="panel h-fit p-6 lg:p-10">
          <SponsorRegistrationForm />
        </section>
      </div>
    </div>
  );
}
