'use client';

import Image from 'next/image';
import { Reveal, RevealGroup } from '@/components/motion/Motion';
import { Eyebrow } from '@/components/ui/Primitives';

const PARTNER_LOGOS = [
  '/partners/partners  (1).png',
  '/partners/partners  (2).png',
  '/partners/partners  (3).png',
  '/partners/partners  (4).png',
  '/partners/partners  (5).png',
  '/partners/partners  (6).png',
  '/partners/partners  (7).png',
  '/partners/partners  (8).png',
  '/partners/partners  (9).png',
  '/partners/partners  (10).png',
  '/partners/partners  (11).png',
  '/partners/partners  (12).png',
  '/partners/partners  (13).png',
  '/partners/partners  (14).png',
  '/partners/partners  (15).png',
  '/partners/partners  (16).png',
  '/partners/partners  (17).png',
  '/partners/partners  (18).png',
  '/partners/partners  (19).png',
];

export function PartnersShowcase() {
  return (
    <section className="border-t border-hairline py-section">
      <div className="mx-auto max-w-shell px-gutter">
        <Reveal>
          <Eyebrow>Our Sponsors</Eyebrow>
          <h2 className="h-display mt-6 text-[clamp(2rem,4vw,3.2rem)]">
            Building together with <span className="text-copper">industry leaders</span>
          </h2>
        </Reveal>

        <div className="mt-16">
          <RevealGroup className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {PARTNER_LOGOS.map((logo, index) => (
              <div
                key={index}
                className="panel group flex aspect-[3/2] items-center justify-center overflow-hidden bg-white/[0.02] p-6 transition-all hover:bg-white/5"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    fill
                    className="object-contain grayscale transition-all group-hover:grayscale-0"
                  />
                </div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
