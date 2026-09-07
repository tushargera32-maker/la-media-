'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Reveal, RevealGroup } from '@/components/motion/Motion';
import { Eyebrow } from '@/components/ui/Primitives';

interface Partner {
  id: string;
  name: string;
  logo: string | null;
  website: string | null;
  category: string;
  order: number;
}

export function PartnersShowcaseClient({ partners }: { partners: Partner[] }) {
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

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
          {/* Mobile Scroll Arrows */}
          {isMobile && partners.length > 2 && (
            <div className="mb-4 flex justify-end gap-2 md:hidden">
              <button
                onClick={() => scroll('left')}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white active:scale-95"
                aria-label="Scroll left"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white active:scale-95"
                aria-label="Scroll right"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Desktop Grid View */}
          <div className="hidden md:block">
            <RevealGroup className="grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-5">
              {partners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </RevealGroup>
          </div>

          {/* Mobile Horizontal Scroll View */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth md:hidden"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex-shrink-0"
                style={{
                  scrollSnapAlign: 'start',
                  width: 'calc(50% - 8px)',
                  minWidth: '140px',
                }}
              >
                <PartnerCard partner={partner} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="panel group flex aspect-[3/2] items-center justify-center overflow-hidden bg-white/[0.02] p-6 transition-all hover:bg-white/5">
      {partner.logo ? (
        partner.website ? (
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="relative h-full w-full"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              className="object-contain grayscale transition-all group-hover:grayscale-0"
            />
          </a>
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              className="object-contain grayscale transition-all group-hover:grayscale-0"
            />
          </div>
        )
      ) : (
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-slate">
          {partner.name}
        </p>
      )}
    </div>
  );
}
