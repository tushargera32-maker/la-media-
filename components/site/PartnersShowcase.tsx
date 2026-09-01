'use client';

import { useEffect, useState } from 'react';
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

export function PartnersShowcase() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('/api/partners?published=true&limit=100');
        if (!response.ok) throw new Error('Failed to fetch partners');
        const data = await response.json();
        setPartners(data.partners);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-shell px-gutter">
          <div className="panel px-8 py-20 text-center">
            <p className="text-slate">Loading partners...</p>
          </div>
        </div>
      </section>
    );
  }

  if (partners.length === 0) {
    return null;
  }

  // Group partners by category
  const groupedPartners = partners.reduce((acc, partner) => {
    if (!acc[partner.category]) {
      acc[partner.category] = [];
    }
    acc[partner.category].push(partner);
    return acc;
  }, {} as Record<string, Partner[]>);

  return (
    <section className="border-t border-hairline py-section">
      <div className="mx-auto max-w-shell px-gutter">
        <Reveal>
          <Eyebrow>Our partners</Eyebrow>
          <h2 className="h-tight mt-6 max-w-[18ch] text-[clamp(1.9rem,4vw,3.2rem)]">
            Building the future together.
          </h2>
          <p className="mt-6 max-w-[54ch] text-[17px] text-mist">
            We collaborate with leading brands and organisations who share our vision for
            innovation and excellence in the built environment.
          </p>
        </Reveal>

        <div className="mt-14 space-y-12">
          {Object.entries(groupedPartners).map(([category, categoryPartners]) => (
            <div key={category}>
              <Reveal>
                <h3 className="mb-6 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
                  {category}
                </h3>
              </Reveal>

              <RevealGroup className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categoryPartners.map((partner) => (
                  <article
                    key={partner.id}
                    className="panel group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="relative flex aspect-video items-center justify-center bg-bone/5 p-8">
                      {partner.logo ? (
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={200}
                          height={100}
                          className="h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate">
                          {partner.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-5">
                      <h4 className="text-[14px] font-semibold leading-snug">{partner.name}</h4>

                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 text-[12px] text-copper transition-colors hover:text-copper-soft"
                        >
                          Visit website →
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
