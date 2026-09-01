'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface VideoHeroProps {
  videoSrc?: string;
  videoPoster?: string;
  title: string;
  subtitle?: string;
  description?: string;
  stats?: Stat[];
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  overlayOpacity?: number;
}

export default function VideoHero({
  videoSrc,
  videoPoster,
  title,
  subtitle,
  description,
  stats = [],
  ctaText,
  ctaHref,
  onCtaClick,
  overlayOpacity = 0.5,
}: VideoHeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-foreground">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {videoSrc && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={videoPoster}
          onLoadedData={handleVideoLoad}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        )}

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
          style={{ opacity: overlayOpacity }}
        />

        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          {/* Subtitle with dramatic entrance */}
          {subtitle && (
            <div
              className={`mb-4 transition-all duration-1000 delay-200 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-8'
              }`}
            >
              <span className="inline-block px-4 py-2 text-sm sm:text-base font-medium tracking-wider uppercase text-accent-light bg-accent-dark/30 backdrop-blur-sm rounded-full border border-accent-light/20">
                {subtitle}
              </span>
            </div>
          )}

          {/* Main Title with staggered animation */}
          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6 transition-all duration-1000 delay-400 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p
              className={`text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed transition-all duration-1000 delay-600 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {description}
            </p>
          )}

          {/* CTA Button */}
          {ctaText && (
            <div
              className={`mb-16 transition-all duration-1000 delay-800 ${
                isVisible
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
            >
              {ctaHref ? (
                <a
                  href={ctaHref}
                  className="inline-block px-8 py-4 text-base sm:text-lg font-semibold text-white bg-accent hover:bg-accent-dark border-2 border-accent hover:border-accent-light rounded-full shadow-2xl hover:shadow-accent/50 hover:scale-105 transform transition-all duration-300"
                >
                  {ctaText}
                </a>
              ) : (
                <button
                  onClick={onCtaClick}
                  className="inline-block px-8 py-4 text-base sm:text-lg font-semibold text-white bg-accent hover:bg-accent-dark border-2 border-accent hover:border-accent-light rounded-full shadow-2xl hover:shadow-accent/50 hover:scale-105 transform transition-all duration-300"
                >
                  {ctaText}
                </button>
              )}
            </div>
          )}

          {/* Stats Overlay */}
          {stats.length > 0 && (
            <div
              className={`grid grid-cols-2 sm:grid-cols-${Math.min(
                stats.length,
                4
              )} gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto transition-all duration-1000 delay-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  style={{
                    transitionDelay: `${1000 + index * 100}ms`,
                  }}
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-light mb-2">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-2xl sm:text-3xl">{stat.suffix}</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-white/80 uppercase tracking-wide font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 delay-1200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/60 text-sm uppercase tracking-wider">Scroll</span>
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
