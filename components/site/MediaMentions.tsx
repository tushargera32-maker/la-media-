'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/motion/Motion';

interface MediaMention {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

const DEFAULT_MENTIONS: MediaMention[] = [
  { id: '1', name: 'The Times of India', logo: '/media-mentions/toi.png' },
  { id: '2', name: 'Architectural Digest', logo: '/media-mentions/ad.png' },
  { id: '3', name: 'Economic Times', logo: '/media-mentions/et.png' },
  { id: '4', name: 'Hindu Business Line', logo: '/media-mentions/hbl.png' },
  { id: '5', name: 'Architecture + Design', logo: '/media-mentions/aand.png' },
  { id: '6', name: 'Forbes India', logo: '/media-mentions/forbes.png' },
];

export function MediaMentions() {
  const [mentions, setMentions] = useState<MediaMention[]>(DEFAULT_MENTIONS);

  return (
    <section className="border-t border-hairline py-section-sm">
      <div className="mx-auto max-w-shell px-gutter">
        <Reveal>
          <p className="eyebrow text-center">As Featured In</p>
          <h2 className="mt-4 text-center text-[1.2rem] font-semibold text-mist">
            Recognized by leading media outlets
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {mentions.map((mention) => (
              <div
                key={mention.id}
                className="group flex items-center justify-center grayscale transition-all duration-500 hover:grayscale-0"
              >
                {mention.logo.startsWith('/') ? (
                  <div className="flex h-16 w-full items-center justify-center">
                    <Image
                      src={mention.logo}
                      alt={mention.name}
                      width={120}
                      height={60}
                      className="h-auto w-auto max-h-12 max-w-full object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                ) : (
                  <div className="flex h-16 w-full items-center justify-center rounded-lg border border-hairline bg-navy-2/40 p-4 transition-all duration-300 group-hover:border-copper/30">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate transition-colors group-hover:text-bone">
                      {mention.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-[13px] text-slate">
            Featured across major publications for innovation in architecture and design events
          </p>
        </Reveal>
      </div>
    </section>
  );
}
