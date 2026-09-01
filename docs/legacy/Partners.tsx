"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Stat {
  value: string;
  label: string;
  description: string;
}

interface Partner {
  id: string;
  name: string;
  logo: string | null;
  website: string | null;
  category: string;
  order: number;
  published: boolean;
}

/**
 * Removed as unsubstantiated: "150+ Global Partners", "25+ Countries",
 * "98% Satisfaction Rate", "$2.5B+ Combined Revenue". Do not restore
 * without evidence. Real partner logos load from /api/partners.
 */
const stats: Stat[] = [];

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('/api/partners?published=true&limit=100');
        if (response.ok) {
          const data = await response.json();
          setPartners(data.partners);
        }
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <section className="py-section">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-wider uppercase text-sm mb-4">
            Our Partners
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto">
            We collaborate with world-class brands to deliver exceptional results and drive meaningful impact across industries.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-surface border border-border rounded-2xl p-8 text-center transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 hover:border-accent/30"
              >
                {/* Stat Value */}
                <div className="mb-3">
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-accent via-accent-light to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>

                {/* Stat Label */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </h3>

                {/* Stat Description */}
                <p className="text-sm text-muted leading-relaxed">
                  {stat.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-light to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-2xl" />
              </div>
            ))}
          </div>
        </div>

        {/* Partner Logos Grid */}
        <div className="relative">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-light/5 rounded-3xl -z-10" />

          <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-12">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted">Loading partners...</p>
              </div>
            ) : partners.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted">No partners to display</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8">
                {partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="group relative aspect-square flex items-center justify-center p-6 bg-background border border-border rounded-xl transition-all duration-500 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1"
                  >
                    {/* Logo Container */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      {partner.logo ? (
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={120}
                          height={120}
                          className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                        />
                      ) : (
                        <div className="text-sm text-muted font-medium">
                          {partner.name}
                        </div>
                      )}
                    </div>

                    {/* Tooltip on Hover */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
                      {partner.name}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                    </div>

                    {/* Category Badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {partner.category}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-muted mb-6 text-lg">
            Join our network of successful partnerships
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:scale-105">
              Become a Partner
            </button>
            <button className="px-8 py-4 border-2 border-border hover:border-accent text-foreground hover:text-accent font-semibold rounded-full transition-all duration-300">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
