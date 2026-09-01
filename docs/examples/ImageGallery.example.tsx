'use client';

import ImageGallery, { GalleryImage } from './ImageGallery';

// Sample gallery images
const sampleImages: GalleryImage[] = [
  {
    id: 1,
    src: '/images/gallery/project-1.jpg',
    alt: 'Modern brand identity design',
    title: 'Brand Identity Design',
    description: 'Complete brand overhaul for a tech startup',
    category: 'Branding',
    aspectRatio: 16 / 9,
  },
  {
    id: 2,
    src: '/images/gallery/project-2.jpg',
    alt: 'Creative social media campaign',
    title: 'Social Media Campaign',
    description: 'Viral campaign reaching 2M+ impressions',
    category: 'Social Media',
    aspectRatio: 4 / 5,
  },
  {
    id: 3,
    src: '/images/gallery/project-3.jpg',
    alt: 'Professional website design',
    title: 'Website Redesign',
    description: 'Modern, responsive website for e-commerce',
    category: 'Web Design',
    aspectRatio: 16 / 10,
  },
  {
    id: 4,
    src: '/images/gallery/project-4.jpg',
    alt: 'Print design portfolio',
    title: 'Print Campaign',
    description: 'Award-winning print advertising series',
    category: 'Print',
    aspectRatio: 3 / 4,
  },
  {
    id: 5,
    src: '/images/gallery/project-5.jpg',
    alt: 'Mobile app interface',
    title: 'Mobile App UI',
    description: 'Intuitive interface design for iOS & Android',
    category: 'UI/UX',
    aspectRatio: 9 / 16,
  },
  {
    id: 6,
    src: '/images/gallery/project-6.jpg',
    alt: 'Video production stills',
    title: 'Video Production',
    description: 'Corporate video production and editing',
    category: 'Video',
    aspectRatio: 16 / 9,
  },
  {
    id: 7,
    src: '/images/gallery/project-7.jpg',
    alt: 'Photography portfolio',
    title: 'Product Photography',
    description: 'High-end product photography for luxury brands',
    category: 'Photography',
    aspectRatio: 1,
  },
  {
    id: 8,
    src: '/images/gallery/project-8.jpg',
    alt: 'Packaging design',
    title: 'Packaging Design',
    description: 'Sustainable packaging for organic products',
    category: 'Packaging',
    aspectRatio: 4 / 3,
  },
  {
    id: 9,
    src: '/images/gallery/project-9.jpg',
    alt: 'Illustration work',
    title: 'Custom Illustration',
    description: 'Bespoke illustrations for editorial content',
    category: 'Illustration',
    aspectRatio: 3 / 4,
  },
  {
    id: 10,
    src: '/images/gallery/project-10.jpg',
    alt: 'Motion graphics',
    title: 'Motion Graphics',
    description: 'Animated explainer videos and graphics',
    category: 'Animation',
    aspectRatio: 16 / 9,
  },
  {
    id: 11,
    src: '/images/gallery/project-11.jpg',
    alt: 'Event branding',
    title: 'Event Branding',
    description: 'Complete branding for corporate events',
    category: 'Events',
    aspectRatio: 5 / 4,
  },
  {
    id: 12,
    src: '/images/gallery/project-12.jpg',
    alt: 'Logo design',
    title: 'Logo Design',
    description: 'Minimalist logo for modern businesses',
    category: 'Branding',
    aspectRatio: 1,
  },
];

export default function ImageGalleryExample() {
  const handleImageClick = (image: GalleryImage) => {
    console.log('Image clicked:', image);
    // Handle image click - could open a modal, navigate to detail page, etc.
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="w-full max-w-content mx-auto px-6 md:px-12 pt-24 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-mono uppercase tracking-wider text-accent mb-4 block">
            Our Portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Featured Work
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed">
            Explore our latest projects and creative solutions that helped
            brands stand out and connect with their audiences.
          </p>
        </div>
      </div>

      {/* Gallery with default settings */}
      <ImageGallery
        images={sampleImages}
        columns={{ default: 1, sm: 2, md: 3, lg: 4 }}
        gap={4}
        showOverlay={true}
        onImageClick={handleImageClick}
      />

      {/* Alternative: 2-column layout */}
      {/* <ImageGallery
        images={sampleImages}
        columns={{ default: 1, md: 2 }}
        gap={6}
        showOverlay={true}
        onImageClick={handleImageClick}
      /> */}

      {/* Alternative: Dense 5-column layout */}
      {/* <ImageGallery
        images={sampleImages}
        columns={{ default: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
        gap={2}
        showOverlay={true}
        onImageClick={handleImageClick}
      /> */}

      {/* Alternative: Without overlay */}
      {/* <ImageGallery
        images={sampleImages}
        columns={{ default: 1, sm: 2, md: 3 }}
        gap={4}
        showOverlay={false}
      /> */}
    </div>
  );
}
