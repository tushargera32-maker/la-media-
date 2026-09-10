import type { Metadata } from "next";
import Image from "next/image";
import { Reveal, RevealGroup } from "@/components/motion/Motion";
import { Media, Eyebrow } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Media & Gallery - Events & Projects | LA Media",
  description: "Explore our portfolio of curated events, architecture conferences, and memorable moments from Design Dialect and LA Media projects across India.",
};

export const dynamic = 'force-dynamic';

export default async function MediaPage() {
  let galleryImages: any[] = [];

  try {
    // Dynamically import prisma only at runtime
    const { prisma } = await import("@/lib/prisma");

    // Fetch published gallery images
    galleryImages = await prisma.galleryImage.findMany({
      where: { published: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      take: 50, // Limit to 50 recent images
    });
  } catch (error) {
    console.error('Failed to fetch gallery images:', error);
    // Return empty array during build or if DB unavailable
    galleryImages = [];
  }

  // Group by category
  const categories = Array.from(new Set(galleryImages.map(img => img.category).filter(Boolean))) as string[];
  const uncategorized = galleryImages.filter(img => !img.category);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pb-section-sm pt-40">
        <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
          <Media label="MEDIA GALLERY - 4:3" ratio="4/3" src="/capability-2.jpg" className="h-full border-0 ring-0" />
          <span className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Our Projects</Eyebrow>
            <h1 className="h-display mt-7 max-w-[16ch] text-[clamp(2.2rem,5.5vw,4.4rem)]">
              Stories.<br />Moments.<br /><span className="text-copper">Impact.</span>
            </h1>
            <p className="mt-8 max-w-[44ch] text-[17px] leading-relaxed text-mist">
              A visual journey through our conferences, events, and the connections we've built.
              From Design Dialect to architecture summits, explore the moments that shaped India's design community.
            </p>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      {galleryImages.length > 0 ? (
        <>
          {/* Categorized Images */}
          {categories.map((category) => {
            const categoryImages = galleryImages.filter(img => img.category === category);

            return (
              <section key={category} className="border-t border-hairline py-section">
                <div className="mx-auto max-w-shell px-gutter">
                  <Reveal>
                    <Eyebrow>{category}</Eyebrow>
                    <h2 className="mt-6 text-[clamp(1.8rem,3vw,2.4rem)] font-bold">
                      Project Highlights
                    </h2>
                  </Reveal>

                  <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryImages.map((img) => {
                      const isVideo = img.image.match(/\.(mp4|webm|mov)$/i);

                      return (
                        <article key={img.id} className="panel group overflow-hidden transition-all hover:border-copper">
                          <div className="relative aspect-[4/3] overflow-hidden bg-navy-2">
                            {isVideo ? (
                              <video
                                src={img.image}
                                controls
                                className="h-full w-full object-cover"
                                preload="metadata"
                              >
                                Your browser does not support video playback.
                              </video>
                            ) : (
                              <Image
                                src={img.image}
                                alt={img.title || category}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            )}
                          </div>
                          {img.title && (
                            <div className="p-5">
                              <h3 className="text-[15px] font-semibold leading-snug">{img.title}</h3>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </RevealGroup>
                </div>
              </section>
            );
          })}

          {/* Uncategorized Images */}
          {uncategorized.length > 0 && (
            <section className="border-t border-hairline py-section">
              <div className="mx-auto max-w-shell px-gutter">
                <Reveal>
                  <Eyebrow>More From Our Events</Eyebrow>
                  <h2 className="mt-6 text-[clamp(1.8rem,3vw,2.4rem)] font-bold">Gallery</h2>
                </Reveal>

                <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {uncategorized.map((img) => {
                    const isVideo = img.image.match(/\.(mp4|webm|mov)$/i);

                    return (
                      <article key={img.id} className="panel group overflow-hidden transition-all hover:border-copper">
                        <div className="relative aspect-[4/3] overflow-hidden bg-navy-2">
                          {isVideo ? (
                            <video
                              src={img.image}
                              controls
                              className="h-full w-full object-cover"
                              preload="metadata"
                            >
                              Your browser does not support video playback.
                            </video>
                          ) : (
                            <Image
                              src={img.image}
                              alt={img.title || 'Gallery image'}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                        </div>
                        {img.title && (
                          <div className="p-5">
                            <h3 className="text-[15px] font-semibold leading-snug">{img.title}</h3>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </RevealGroup>
              </div>
            </section>
          )}
        </>
      ) : (
        /* EMPTY STATE */
        <section className="border-t border-hairline py-section">
          <div className="mx-auto max-w-shell px-gutter">
            <Reveal>
              <div className="panel p-16 text-center">
                <svg className="mx-auto h-16 w-16 text-copper opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="mt-6 text-[1.8rem] font-semibold">Building Something Special</h2>
                <p className="mt-4 max-w-[48ch] mx-auto text-[16px] leading-relaxed text-mist">
                  We're curating a collection of our most impactful moments—from sold-out conferences
                  to intimate workshops. Our project gallery is coming soon with photos and highlights
                  from Design Dialect, architecture summits, and community events across India.
                </p>
                <p className="mt-6 text-[14px] text-slate">
                  Organizing a project? <a href="/contact" className="text-copper hover:underline">Get in touch</a> to create memorable experiences together.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
