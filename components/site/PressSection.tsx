'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/motion/Motion';

interface PressHighlight {
  id: string;
  source: string;
  date: string;
  excerpt: string;
}

const PRESS_HIGHLIGHTS: PressHighlight[] = [
  {
    id: '1',
    source: 'Punjab Kesari',
    date: 'Aug 03, 2026',
    excerpt: 'Ludhiana Architects Association hosted the inaugural "Design Dialect 2026" Architects Conclave, bringing together nearly 300 architects, designers and industry professionals from across the region.',
  },
  {
    id: '2',
    source: 'Punjab Kesari',
    date: 'Aug 03, 2026',
    excerpt: 'The conclave explored the future of the profession, emerging design challenges and sustainable approaches, alongside an exhibition showcasing the latest building technologies and materials.',
  },
  {
    id: '3',
    source: 'Punjab Kesari',
    date: 'Aug 03, 2026',
    excerpt: 'Architect Jafar Chaudhary joined the event as Chief Guest, with architect Sangeet Sharma and architectural journalist Apurva Bose Dutta sharing their perspectives on contemporary design.',
  },
  {
    id: '4',
    source: 'Media Highlight',
    date: 'Aug 2026',
    excerpt: 'Design Dialect 2026 marked a significant new platform for architects, designers, brands and industry leaders to exchange ideas, perspectives and opportunities.',
  },
];

export function PressSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PRESS_HIGHLIGHTS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Only scroll if the container is already in viewport
    const rect = scrollContainer.getBoundingClientRect();
    const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (!isInViewport) return; // Don't auto-scroll if section not visible

    const card = scrollContainer.children[activeIndex] as HTMLElement | undefined;
    // scrollIntoView centers by the card's real rendered size on any
    // screen, instead of a hand-computed offset that only matched the
    // desktop card width and left mobile permanently mis-centered.
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeIndex]);

  const getCardStyle = (index: number) => {
    // On mobile only one card fits in view at a time - the blur/scale
    // treatment for neighbors just left every card looking permanently
    // hazy, since the "clear" one kept scrolling out of sync.
    if (isMobile) {
      return { opacity: 1, scale: 1, blur: 0, zIndex: 10 };
    }

    const distance = Math.abs(index - activeIndex);

    if (distance === 0) {
      return {
        opacity: 1,
        scale: 1,
        blur: 0,
        zIndex: 10,
      };
    } else if (distance === 1) {
      return {
        opacity: 0.4,
        scale: 0.9,
        blur: 2,
        zIndex: 5,
      };
    } else {
      return {
        opacity: 0.2,
        scale: 0.85,
        blur: 4,
        zIndex: 1,
      };
    }
  };

  return (
    <section className="border-t border-hairline py-section-sm">
      <div className="mx-auto max-w-shell px-gutter">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="eyebrow">In The Press</p>
            <h2 className="mt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold">
              Design Dialect 2026 makes headlines
            </h2>
            <p className="mt-3 text-[14px] text-mist">
              Recognized across media for bringing the architecture community together
            </p>
          </div>
        </Reveal>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory items-center gap-6 overflow-x-auto py-8 md:justify-center md:overflow-x-hidden"
          >
            {PRESS_HIGHLIGHTS.map((highlight, index) => {
              const style = getCardStyle(index);

              return (
                <article
                  key={highlight.id}
                  className="panel w-[85vw] max-w-[420px] flex-shrink-0 snap-center p-6 transition-all duration-700 sm:min-w-[380px] sm:p-8"
                  style={{
                    opacity: style.opacity,
                    transform: `scale(${style.scale})`,
                    filter: `blur(${style.blur}px)`,
                    zIndex: style.zIndex,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-copper"></div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-copper">
                        {highlight.source}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate">{highlight.date}</span>
                  </div>
                  <p className="mt-6 text-[15px] leading-relaxed text-mist">
                    "{highlight.excerpt}"
                  </p>
                </article>
              );
            })}
          </div>

          {/* Navigation dots */}
          <div className="mt-6 flex justify-center gap-2">
            {PRESS_HIGHLIGHTS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 bg-copper'
                    : 'w-2 bg-slate/40 hover:bg-slate/60'
                }`}
                aria-label={`View press highlight ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="panel mt-10 p-6 text-center">
            <p className="text-[13px] leading-relaxed text-mist">
              <span className="font-semibold text-bone">LA Media & Communications</span> documented
              and amplified the conversations, people and ideas shaping Design Dialect 2026.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
