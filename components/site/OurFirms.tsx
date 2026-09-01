import { Reveal } from "@/components/motion/Motion";
import { Eyebrow, Media, Unverified } from "@/components/ui/Primitives";
import { FIRMS } from "@/lib/content";

/* ==================================================================
   OUR FIRMS

   Two firms, deliberately unequal. LA Media & Communications is the
   parent and takes the wider column with the lit panel; Build Right
   Advisors sits beside it as a group firm - clearly related, not
   competing. The hierarchy is carried by width and light rather than by
   a badge, which is how the rest of this design already signals weight.
   ================================================================== */

export function OurFirms() {
  return (
    <section className="border-t border-hairline py-section">
      <div className="mx-auto max-w-shell px-gutter">
        <Reveal>
          <Eyebrow>Our firms</Eyebrow>
          <h2 className="h-tight mt-6 max-w-[16ch] text-[clamp(1.9rem,4vw,3.2rem)]">
            One group, two practices.
          </h2>
          <p className="mt-6 max-w-[54ch] text-[17px] text-mist">
            LA Media &amp; Communications is the parent firm. Build Right Advisors operates
            within the same group - a related practice, not a separate venture.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          {FIRMS.map((firm, i) => {
            const parent = firm.role === "Parent firm";
            const firmImage = parent ? "/firm-la-media.jpg" : "/firm-build-right.jpg";
            return (
              <Reveal key={firm.slug} delay={i * 0.1}>
                <article
                  className={`relative flex h-full flex-col overflow-hidden ${
                    parent ? "panel-solid" : "panel"
                  }`}
                >
                  {parent && <span className="bloom opacity-70" />}

                  <div className="relative">
                    <Media
                      label={`${firm.name.toUpperCase()} - 16:9`}
                      ratio="16/9"
                      src={firmImage}
                      className="border-0 ring-0"
                    />
                  </div>

                  <div className="relative flex flex-1 flex-col p-8 lg:p-10">
                    <div className="flex items-center gap-4">
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border text-[12px] font-semibold tracking-[0.08em] ${
                          parent
                            ? "border-copper/60 text-copper"
                            : "border-cobalt/60 text-cobalt-soft"
                        }`}
                      >
                        {firm.code}
                      </span>
                      <p className={`text-[10.5px] font-semibold uppercase tracking-[0.16em] ${
                        parent ? "text-copper" : "text-cobalt-soft"
                      }`}>
                        {firm.role}
                      </p>
                    </div>

                    <h3 className="h-tight mt-6 text-[clamp(1.3rem,2.4vw,1.9rem)]">
                      {firm.name}
                    </h3>

                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                      {firm.discipline}
                    </p>

                    <p className="mt-6 flex-1 text-[15.5px] leading-relaxed text-mist">
                      {firm.blurb}
                    </p>

                    {firm.source === "placeholder" && (
                      <p className="mt-6"><Unverified>Copy to be supplied</Unverified></p>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
