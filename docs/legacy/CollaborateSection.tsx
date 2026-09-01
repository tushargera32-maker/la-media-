"use client";

import React from 'react';

interface CollaborationType {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: string;
  ctaText: string;
  ctaLink: string;
  gradient: string;
}

const collaborationTypes: CollaborationType[] = [
  {
    id: "speaker",
    title: "Speaker Collaboration",
    description: "Share your expertise and insights with our audience through speaking engagements, webinars, and panel discussions.",
    benefits: ["Thought Leadership", "Audience Reach", "Brand Visibility"],
    icon: "🎤",
    ctaText: "Become a Speaker",
    ctaLink: "/collaborate/speaker",
    gradient: "from-purple-600 to-indigo-700"
  },
  {
    id: "partner",
    title: "Strategic Partnership",
    description: "Join forces to create synergies, expand capabilities, and deliver exceptional value to our combined audiences.",
    benefits: ["Mutual Growth", "Resource Sharing", "Market Expansion"],
    icon: "🤝",
    ctaText: "Partner With Us",
    ctaLink: "/collaborate/partner",
    gradient: "from-blue-600 to-cyan-700"
  },
  {
    id: "media",
    title: "Media Collaboration",
    description: "Work with us on content creation, press coverage, and media campaigns that amplify your message and reach.",
    benefits: ["Press Coverage", "Content Distribution", "Media Exposure"],
    icon: "📰",
    ctaText: "Connect on Media",
    ctaLink: "/collaborate/media",
    gradient: "from-amber-600 to-orange-700"
  },
  {
    id: "influencer",
    title: "Influencer Partnership",
    description: "Leverage your influence to create authentic connections and engage audiences through compelling storytelling.",
    benefits: ["Brand Advocacy", "Authentic Reach", "Community Building"],
    icon: "⭐",
    ctaText: "Join as Influencer",
    ctaLink: "/collaborate/influencer",
    gradient: "from-pink-600 to-rose-700"
  },
  {
    id: "brand",
    title: "Brand Collaboration",
    description: "Co-create innovative campaigns and experiences that resonate with your target audience and drive measurable results.",
    benefits: ["Co-Branding", "Creative Campaigns", "Market Impact"],
    icon: "🎨",
    ctaText: "Collaborate on Brand",
    ctaLink: "/collaborate/brand",
    gradient: "from-emerald-600 to-teal-700"
  },
  {
    id: "knowledge",
    title: "Knowledge Exchange",
    description: "Share insights, research, and expertise to advance industry knowledge and foster innovation together.",
    benefits: ["Industry Insights", "Research Sharing", "Innovation"],
    icon: "📚",
    ctaText: "Share Knowledge",
    ctaLink: "/collaborate/knowledge",
    gradient: "from-violet-600 to-purple-700"
  }
];

export default function CollaborateSection() {
  return (
    <section className="py-section px-6">
      <div className="max-w-content mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-wider uppercase text-sm mb-4">
            Collaboration Opportunities
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Let's Create Together
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover diverse ways to collaborate, co-create, and build meaningful partnerships that drive innovation and shared success.
          </p>
        </div>

        {/* Collaboration Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collaborationTypes.map((type) => (
            <article
              key={type.id}
              className="group relative bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2"
            >
              {/* Gradient Header with Icon */}
              <div className={`relative h-32 bg-gradient-to-br ${type.gradient} overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
                    {type.icon}
                  </div>
                </div>
                {/* Decorative circle */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground tracking-tight">
                  {type.title}
                </h3>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed">
                  {type.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2 pt-2">
                  {type.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-foreground"
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
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <a
                    href={type.ctaLink}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 group/btn"
                  >
                    <span>{type.ctaText}</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform"
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
              </div>

              {/* Accent Line on Hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-light to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </article>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-surface border border-border rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Don't See Your Collaboration Type?
          </h3>
          <p className="text-muted text-lg mb-6 max-w-2xl mx-auto">
            We're always open to exploring new partnership opportunities. Reach out and let's discuss how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:scale-105"
            >
              Get In Touch
            </a>
            <a
              href="/about"
              className="px-8 py-4 border-2 border-border hover:border-accent text-foreground hover:text-accent font-semibold rounded-full transition-all duration-300"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
