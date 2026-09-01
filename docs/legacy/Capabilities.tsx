"use client";

import React from 'react';

interface Capability {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const capabilities: Capability[] = [
  {
    id: 1,
    title: "Brand Strategy & Identity",
    description: "Crafting distinctive brand narratives that resonate with your audience and stand the test of time.",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    features: ["Visual Identity Design", "Brand Positioning", "Brand Guidelines", "Market Research"]
  },
  {
    id: 2,
    title: "Digital Marketing",
    description: "Data-driven digital strategies that amplify your reach and drive measurable business growth.",
    icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
    features: ["SEO Optimization", "Social Media Strategy", "Campaign Management", "Performance Analytics"]
  },
  {
    id: 3,
    title: "Creative Content",
    description: "Compelling content that tells your story and engages audiences across all platforms.",
    icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
    features: ["Copywriting", "Video Production", "Photography", "Graphic Design"]
  },
  {
    id: 4,
    title: "Media Relations",
    description: "Building meaningful relationships with media outlets to amplify your voice and visibility.",
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
    features: ["Press Release Distribution", "Media Outreach", "Thought Leadership", "Crisis Communications"]
  },
  {
    id: 5,
    title: "Web & Digital Design",
    description: "User-centric digital experiences that blend aesthetics with functionality seamlessly.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    features: ["Website Development", "UI/UX Design", "Mobile App Design", "E-commerce Solutions"]
  },
  {
    id: 6,
    title: "Strategic Consulting",
    description: "Expert guidance to navigate complex challenges and unlock new opportunities for growth.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    features: ["Business Strategy", "Market Analysis", "Competitive Intelligence", "Growth Planning"]
  }
];

export default function Capabilities() {
  return (
    <section className="py-section">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-wider uppercase text-sm mb-4">
            What We Do
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Our Capabilities
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto">
            Comprehensive solutions tailored to elevate your brand and drive meaningful results across every touchpoint.
          </p>
        </div>

        {/* Capabilities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={capability.id}
              className="group relative bg-surface border border-border rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1 hover:border-accent/30"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Icon */}
              <div className="mb-6 relative">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-500">
                  <svg
                    className="w-7 h-7 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={capability.icon}
                    />
                  </svg>
                </div>
                {/* Decorative element */}
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-accent/5 rounded-lg -z-10 group-hover:scale-110 transition-transform duration-500" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-accent transition-colors duration-300">
                {capability.title}
              </h3>

              {/* Description */}
              <p className="text-muted leading-relaxed mb-6">
                {capability.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2.5">
                {capability.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start text-sm text-muted group-hover:text-foreground transition-colors duration-300"
                  >
                    <svg
                      className="w-5 h-5 mr-2.5 text-accent flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-muted mb-6 text-lg">
            Ready to transform your brand?
          </p>
          <button className="px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:scale-105">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
