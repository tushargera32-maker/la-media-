'use client';

import { useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/* Placeholder                                                         */
/* ------------------------------------------------------------------ */

const RATIO: Record<string, string> = {
  '21/9': 'aspect-[21/9]',
  '16/9': 'aspect-[16/9]',
  '3/2': 'aspect-[3/2]',
  '4/5': 'aspect-[4/5]',
  '1/1': 'aspect-square',
};

/**
 * A clearly labelled local placeholder. No Unsplash, no stock.
 *
 * When the real asset arrives, swap `src` in and the layout does not move -
 * the container owns the aspect ratio, not the image.
 */
export function Placeholder({
  label,
  ratio = '16/9',
  src,
  alt,
  className = '',
  priority = false,
}: {
  label: string;
  ratio?: keyof typeof RATIO | string;
  src?: string | null;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const ratioClass = RATIO[ratio] ?? 'aspect-[16/9]';

  return (
    <div
      className={`relative w-full overflow-hidden bg-plaster-2 border border-ink/10 ${ratioClass} ${className}`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? label}
          loading={priority ? 'eager' : 'lazy'}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 grid place-items-center px-4">
            <span className="ref text-slate text-center">[ {label} ]</span>
          </div>
          <div className="absolute left-3 top-3 h-3 w-3 border-l border-t border-ink/20" />
          <div className="absolute right-3 top-3 h-3 w-3 border-r border-t border-ink/20" />
          <div className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-ink/20" />
          <div className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-ink/20" />
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal                                                              */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section scaffolding                                                 */
/* ------------------------------------------------------------------ */

export function SectionHead({
  index,
  title,
  aside,
  onDark = false,
}: {
  index: string;
  title: string;
  aside?: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <div
      className={`mb-[clamp(2rem,4vw,3.5rem)] flex flex-wrap items-baseline justify-between gap-4 border-b pb-3.5 ${
        onDark ? 'border-plaster/20' : 'border-ink/15'
      }`}
    >
      <span className={`ref ${onDark ? 'text-plaster/55' : 'text-slate'}`}>
        {index} - {title}
      </span>
      {aside && (
        <span className={`ref ${onDark ? 'text-plaster/55' : 'text-slate'}`}>
          {aside}
        </span>
      )}
    </div>
  );
}

/**
 * Renders an explicit, visible "needs confirmation" marker.
 * Per the content rule: never silently convert an assumption into copy.
 */
export function Unconfirmed({ children }: { children: React.ReactNode }) {
  return (
    <span className="ref inline-block border border-brass/40 px-1.5 py-0.5 text-[9px] text-brass align-[2px] whitespace-nowrap">
      {children}
    </span>
  );
}
