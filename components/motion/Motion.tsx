"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Desktop pointer only - magnetic effects drift tap targets on touch. */
const finePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1024px)").matches &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Lenis + ScrollTrigger.
 *
 * Lenis owns scroll position, so ScrollTrigger must read from it rather
 * than from native scroll - otherwise every trigger fires at the wrong
 * offset and the whole page feels a beat behind.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (reduced()) return;

    let lenis: { raf: (t: number) => void; destroy: () => void; on: (e: string, cb: () => void) => void } | null = null;
    let frame = 0;
    let cancelled = false;

    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (t: number) => {
        lenis?.raf(t);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    const t = gsap.to(el, {
      opacity: 1, y: 0, duration: 1, delay, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); };
  }, [delay]);

  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

/**
 * Staggered reveal for a group of siblings.
 * One trigger for the whole grid rather than one per card - on twelve
 * cards that is eleven fewer recalculations on every resize.
 */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !el.children.length) return;
    if (reduced()) {
      gsap.set(el.children, { opacity: 1, y: 0 });
      return;
    }
    const t = gsap.fromTo(
      el.children,
      { opacity: 0, y: 26 },
      {
        opacity: 1, y: 0, duration: 0.9, stagger, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      },
    );
    return () => { t.scrollTrigger?.kill(); t.kill(); };
  }, [stagger]);

  return <div ref={ref} className={className}>{children}</div>;
}

/** Line-by-line masked heading reveal. */
export function HeadingLines({
  lines,
  className = "",
  accentIndex = -1,
}: {
  lines: readonly string[];
  className?: string;
  accentIndex?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll("[data-line]");
    if (reduced()) {
      gsap.set(targets, { y: 0, opacity: 1 });
      return;
    }
    const t = gsap.to(targets, {
      y: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: "power3.out", delay: 0.12,
    });
    return () => t.kill();
  }, [lines]);

  return (
    <h1 ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <span
            data-line
            className={`block translate-y-full opacity-0 ${i === accentIndex ? "text-copper" : ""}`}
          >
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}

/** Counts a statistic up as it enters, keeping any suffix intact. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const m = value.match(/^([\d.]+)(.*)$/);
    if (!m || reduced()) { el.textContent = value; return; }

    const target = parseFloat(m[1]);
    const suffix = m[2];
    const counter = { n: 0 };

    const t = gsap.to(counter, {
      n: target, duration: 1.5, ease: "power2.out",
      // Round every frame - a raw float leaks "24.99999" into the DOM.
      onUpdate: () => { el.textContent = `${Math.round(counter.n)}${suffix}`; },
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); };
  }, [value]);

  return <span ref={ref} className={className}>0</span>;
}

/** Magnetic CTA. No-ops on touch, where there is no cursor to lean toward. */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reduced()) return;

    const move = (e: MouseEvent) => {
      const b = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (b.left + b.width / 2)) * strength,
        y: (e.clientY - (b.top + b.height / 2)) * strength,
        duration: 0.6, ease: "power3.out",
      });
    };
    const reset = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return <div ref={ref} className="inline-block">{children}</div>;
}

/** Slow parallax drift, tied to scroll rather than a fixed duration. */
export function Parallax({
  children,
  amount = 60,
  className = "",
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const t = gsap.to(el, {
      y: amount, ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); };
  }, [amount]);

  return <div ref={ref} className={className}>{children}</div>;
}

/** Thin scroll-progress rule, scrubbed so it stays in sync with Lenis. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = gsap.fromTo(el, { scaleX: 0 }, {
      scaleX: 1, ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-copper"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
