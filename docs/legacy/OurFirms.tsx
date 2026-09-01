"use client";

import React from 'react';

interface Firm {
  name: string;
  tagline: string;
  description: string;
  services: string[];
  logo: string;
  color: string;
  website: string;
}

const firms: Firm[] = [
  {
    name: "LA Media & Communication",
    tagline: "Strategic Communication Excellence",
    description: "LA Media & Communication is a premium strategic communications and public relations firm specializing in corporate communications, brand strategy, and media relations. We craft compelling narratives that elevate brands and drive meaningful engagement across all channels.",
    services: [
      "Corporate Communications",
      "Brand Strategy & Positioning",
      "Media Relations & PR",
      "Crisis Communication",
      "Digital Marketing",
      "Content Creation"
    ],
    logo: "LA",
    color: "from-amber-600 to-orange-700",
    website: "lamedia.com"
  },
  {
    name: "Build Right Advisors",
    tagline: "Engineering Tomorrow's Infrastructure",
    description: "Build Right Advisors is a premier construction and infrastructure advisory firm delivering comprehensive solutions in project management, engineering consulting, and construction oversight. We transform vision into reality through precision planning and execution excellence.",
    services: [
      "Project Management",
      "Construction Consulting",
      "Infrastructure Planning",
      "Quality Assurance",
      "Risk Management",
      "Sustainable Development"
    ],
    logo: "BR",
    color: "from-slate-700 to-slate-900",
    website: "buildrightadvisors.com"
  }
];

export default function OurFirms() {
  return (
    <section className="py-section px-6">
      <div className="max-w-content mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-wider uppercase text-sm mb-4">
            Our Network
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Excellence Across Industries
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Two premier firms united by a commitment to exceptional service, strategic insight, and transformative results.
          </p>
        </div>

        {/* Firms Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {firms.map((firm, index) => (
            <article
              key={firm.name}
              className="group relative bg-surface rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Gradient Header */}
              <div className={`h-48 bg-gradient-to-br ${firm.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/90 text-7xl font-bold tracking-tighter">
                    {firm.logo}
                  </div>
                </div>
                {/* Decorative pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Firm Name */}
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {firm.name}
                </h3>

                {/* Tagline */}
                <p className="text-accent font-medium mb-4">
                  {firm.tagline}
                </p>

                {/* Description */}
                <p className="text-muted leading-relaxed mb-6">
                  {firm.description}
                </p>

                {/* Services */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                    Core Services
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {firm.services.map((service) => (
                      <div
                        key={service}
                        className="flex items-center text-sm text-muted"
                      >
                        <svg
                          className="w-4 h-4 mr-2 text-accent flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={`https://${firm.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-accent hover:text-accent-dark font-medium group/link"
                >
                  <span>Visit {firm.name}</span>
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/20 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              Partner With Us
            </a>
            <a
              href="/about"
              className="px-8 py-4 border-2 border-border hover:border-accent text-foreground hover:text-accent font-semibold rounded-lg transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
