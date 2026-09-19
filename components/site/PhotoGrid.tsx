"use client";

import { useState } from "react";
import Image from "next/image";

export interface GridPhoto {
  src: string;
  alt: string;
}

/**
 * Photo grid with progressive disclosure - shows a few first,
 * expands to all on tap. Keeps phone load light with many photos.
 */
export function PhotoGrid({
  photos,
  initial = 9,
  className = "",
}: {
  photos: GridPhoto[];
  initial?: number;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? photos : photos.slice(0, initial);

  return (
    <div className={className}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {visible.map((photo, i) => (
          <figure
            key={photo.src}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-navy-2 ring-1 ring-hairline transition-all hover:ring-copper/60"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading={i < 3 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </figure>
        ))}
      </div>

      {photos.length > initial && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="btn btn-line"
          >
            {expanded
              ? "Show less"
              : `View all ${photos.length} photos`}
          </button>
        </div>
      )}
    </div>
  );
}
