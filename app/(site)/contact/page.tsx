import type { Metadata } from "next";
import { Reveal, RevealGroup } from "@/components/motion/Motion";
import { Media, Eyebrow } from "@/components/ui/Primitives";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { BRAND, CONTACT_ROUTES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have an idea, collaboration or enquiry? We'd love to hear from you.",
};

export default function ContactPage() {
  const details = [
    { label: "Address", value: BRAND.address },
    { label: "Phone", value: BRAND.phone, tel: true },
    { label: "Email", value: BRAND.email, mailto: true },
    { label: "Office hours", value: BRAND.hours },
  ];

  return (
    <>
      <section className="relative overflow-hidden pb-section pt-40">
        <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
          <Media label="CONTACT - LIT COLONNADE AT NIGHT - 3:4" ratio="3/4" src="/contact-side.jpg" className="h-full border-0 ring-0" />
          <span className="absolute inset-0 bg-gradient-to-r from-navy via-navy/40 to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-shell gap-12 px-gutter lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Eyebrow>Contact us</Eyebrow>
            <h1 className="h-display mt-7 max-w-[12ch] text-[clamp(1.8rem,5vw,4rem)]">
              Let&rsquo;s start a conversation<span className="text-copper">.</span>
            </h1>
            <p className="mt-7 max-w-[36ch] text-[17px] leading-relaxed text-mist">
              Have an idea, collaboration or enquiry? We&rsquo;d love to hear from you.
            </p>

            <dl className="mt-12 space-y-7">
              {details.map((d) => (
                <div key={d.label} className="flex gap-5 border-t border-hairline pt-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-copper/50 text-[10px] font-semibold uppercase tracking-[0.1em] text-copper">
                    {d.label.slice(0, 2)}
                  </span>
                  <div>
                    <dt className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate">
                      {d.label}
                    </dt>
                    <dd className="mt-1.5 max-w-[32ch] text-[15px]">
                      {d.mailto ? (
                        <a href={`mailto:${d.value}`} className="text-copper hover:underline">{d.value}</a>
                      ) : d.tel ? (
                        <a href={`tel:${d.value.replace(/\s/g, '')}`} className="text-copper hover:underline">{d.value}</a>
                      ) : d.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel p-7 lg:p-10">
              <p className="eyebrow">Send us a message</p>
              <div className="mt-8">
                <EnquiryForm kind="general" submitLabel="Send message" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Routed enquiry addresses */}
      <section className="border-t border-hairline py-section-sm">
        <div className="mx-auto max-w-shell px-gutter">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_ROUTES.map((r) => (
              <article key={r.key} className="panel flex h-full flex-col p-7">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-copper/50 text-[10px] font-semibold uppercase tracking-[0.1em] text-copper">
                  {r.title.slice(0, 2)}
                </span>
                <h2 className="mt-6 text-[13px] font-semibold uppercase tracking-[0.08em]">{r.title}</h2>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-mist">{r.blurb}</p>
                <a
                  href={`mailto:${r.email}`}
                  className="mt-6 break-all text-[12.5px] text-copper transition-colors hover:text-copper-soft"
                >
                  {r.email} &rarr;
                </a>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
