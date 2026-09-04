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

const COLLAPSED_COUNT = 8;

export function PartnersShowcaseClient({ partners }: { partners: Partner[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Group by category
  const categories = Array.from(new Set(partners.map((p) => p.category)));

  const toggleCategory = (category: string) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const scroll = (category: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[category];
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="border-t border-hairline py-section">
      <div className="mx-auto max-w-shell px-gutter">
        <Reveal>
          <Eyebrow>Our partners</Eyebrow>
          <h2 className="h-display mt-6 text-[clamp(2rem,4vw,3.2rem)]">
            Building together with <span className="text-copper">industry leaders</span>
          </h2>
        </Reveal>

        <div className="mt-16 space-y-12">
          {categories.map((category) => {
            const categoryPartners = partners.filter((p) => p.category === category);
            const isExpanded = expanded[category];
            const displayedPartners = isExpanded
              ? categoryPartners
              : categoryPartners.slice(0, COLLAPSED_COUNT);
            const hasMore = categoryPartners.length > COLLAPSED_COUNT;

            return (
              <div key={category}>
                <Reveal>
                  <div className="mb-8 flex items-center justify-between">
                    <h3 className="text-[18px] font-semibold uppercase tracking-[0.06em]">
                      {category}
                    </h3>

                    {/* Mobile Scroll Arrows */}
                    {isMobile && categoryPartners.length > 2 && (
                      <div className="flex gap-2 md:hidden">
                        <button
                          onClick={() => scroll(category, 'left')}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white active:scale-95"
                          aria-label="Scroll left"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => scroll(category, 'right')}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white active:scale-95"
                          aria-label="Scroll right"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </Reveal>

                {/* Desktop Grid View */}
                <div className="hidden md:block">
                  <RevealGroup className="grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-5">
                    {displayedPartners.map((partner) => (
                      <PartnerCard key={partner.id} partner={partner} />
                    ))}
                  </RevealGroup>
                </div>

                {/* Mobile Horizontal Scroll View - Apple Style */}
                <div
                  ref={(el) => {
                    scrollRefs.current[category] = el;
                  }}
                  className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth md:hidden"
                  style={{
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  {displayedPartners.map((partner) => (
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

                {hasMore && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => toggleCategory(category)}
                      className="link-arrow inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em]"
                    >
                      {isExpanded ? 'Show less' : `Show all ${categoryPartners.length} partners`}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
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
