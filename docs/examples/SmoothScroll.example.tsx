'use client';

import SmoothScroll from './SmoothScroll';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Example usage of SmoothScroll component with GSAP ScrollTrigger animations
 */
export default function SmoothScrollExample() {
  const fadeInRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Example 1: Fade in on scroll
    if (fadeInRef.current) {
      gsap.fromTo(
        fadeInRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: fadeInRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }

    // Example 2: Parallax effect
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        y: -200,
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Example 3: Pin section while scrolling
    if (pinSectionRef.current) {
      ScrollTrigger.create({
        trigger: pinSectionRef.current,
        start: 'top top',
        end: '+=500',
        pin: true,
        pinSpacing: true,
      });
    }
  }, []);

  return (
    <SmoothScroll
      options={{
        duration: 1.2,
        smooth: true,
        smoothTouch: false,
      }}
    >
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
          <h1 className="text-6xl font-bold text-white">Smooth Scroll Demo</h1>
        </section>

        {/* Fade In Section */}
        <section className="min-h-screen flex items-center justify-center bg-gray-100">
          <div
            ref={fadeInRef}
            className="max-w-2xl p-8 bg-white rounded-lg shadow-xl"
          >
            <h2 className="text-4xl font-bold mb-4">Fade In Animation</h2>
            <p className="text-gray-600">
              This section fades in as you scroll down. The animation is
              synchronized with Lenis smooth scroll.
            </p>
          </div>
        </section>

        {/* Parallax Section */}
        <section className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
          <div
            ref={parallaxRef}
            className="max-w-2xl p-8 bg-white rounded-lg shadow-xl"
          >
            <h2 className="text-4xl font-bold mb-4">Parallax Effect</h2>
            <p className="text-gray-600">
              This element moves at a different speed than the scroll,
              creating a parallax effect.
            </p>
          </div>
        </section>

        {/* Pin Section */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
          <div
            ref={pinSectionRef}
            className="max-w-2xl p-8 bg-white rounded-lg shadow-xl"
          >
            <h2 className="text-4xl font-bold mb-4">Pinned Section</h2>
            <p className="text-gray-600">
              This section pins to the top of the viewport as you scroll,
              then unpins after scrolling 500px.
            </p>
          </div>
        </section>

        {/* Final Section */}
        <section className="min-h-screen flex items-center justify-center bg-gray-800">
          <div className="max-w-2xl p-8 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">End of Demo</h2>
            <p className="text-gray-300">
              Scroll back up to see the animations again!
            </p>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
}

/**
 * Programmatic control example:
 *
 * You can control Lenis from anywhere in your app:
 *
 * // Scroll to top
 * window.lenis?.scrollTo(0);
 *
 * // Scroll to element
 * window.lenis?.scrollTo('#section-id');
 *
 * // Stop smooth scroll
 * window.lenis?.stop();
 *
 * // Resume smooth scroll
 * window.lenis?.start();
 *
 * // Scroll to specific position with options
 * window.lenis?.scrollTo(500, {
 *   offset: 0,
 *   duration: 2,
 *   easing: (t) => t,
 * });
 */
