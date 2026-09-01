'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface GalleryImage {
  id: string | number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  aspectRatio?: number;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  showOverlay?: boolean;
  onImageClick?: (image: GalleryImage) => void;
}

export default function ImageGallery({
  images,
  columns = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 4,
  showOverlay = true,
  onImageClick,
}: ImageGalleryProps) {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  /**
   * Tailwind scans source for complete class strings, so `columns-${n}`
   * and `gap-${n}` were never generated — the gallery had no columns and
   * no gap. Static lookup maps keep the class names literal.
   */
  const COL: Record<number, string> = {
    1: 'columns-1', 2: 'columns-2', 3: 'columns-3', 4: 'columns-4', 5: 'columns-5',
  };
  const COL_SM: Record<number, string> = {
    1: 'sm:columns-1', 2: 'sm:columns-2', 3: 'sm:columns-3', 4: 'sm:columns-4',
  };
  const COL_MD: Record<number, string> = {
    1: 'md:columns-1', 2: 'md:columns-2', 3: 'md:columns-3', 4: 'md:columns-4',
  };
  const COL_LG: Record<number, string> = {
    1: 'lg:columns-1', 2: 'lg:columns-2', 3: 'lg:columns-3', 4: 'lg:columns-4',
  };
  const GAP: Record<number, string> = {
    2: 'gap-2 space-y-2', 4: 'gap-4 space-y-4', 6: 'gap-6 space-y-6', 8: 'gap-8 space-y-8',
  };

  const getColumnClass = () =>
    [
      COL[columns.default] ?? 'columns-1',
      columns.sm ? COL_SM[columns.sm] : '',
      columns.md ? COL_MD[columns.md] : '',
      columns.lg ? COL_LG[columns.lg] : '',
    ]
      .filter(Boolean)
      .join(' ');

  const getGapClass = () => GAP[gap] ?? 'gap-4 space-y-4';

  if (images.length === 0) return null;

  return (
    <div className="w-full max-w-content mx-auto px-6 md:px-12 py-section-sm">
      <div className={`${getColumnClass()} ${getGapClass()}`}>
        {images.map((image) => (
          <div
            key={image.id}
            className="break-inside-avoid mb-4 group cursor-pointer"
            onMouseEnter={() => setHoveredId(image.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onImageClick?.(image)}
          >
            <div className="relative overflow-hidden rounded-lg bg-surface shadow-md hover:shadow-xl transition-shadow duration-300">
              {/* Image Container */}
              <div className="relative w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={image.aspectRatio ? 800 / image.aspectRatio : 600}
                  className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Hover Overlay */}
                {showOverlay && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                      hoveredId === image.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {/* Category Badge */}
                      {image.category && (
                        <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider bg-accent text-white rounded-full mb-3">
                          {image.category}
                        </span>
                      )}

                      {/* Title */}
                      {image.title && (
                        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                          {image.title}
                        </h3>
                      )}

                      {/* Description */}
                      {image.description && (
                        <p className="text-white/90 text-sm line-clamp-2">
                          {image.description}
                        </p>
                      )}

                      {/* View Indicator */}
                      <div className="mt-4 flex items-center text-white text-sm font-medium">
                        <span>View Details</span>
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accent Border on Hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-dark transition-transform duration-300 origin-left ${
                  hoveredId === image.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
