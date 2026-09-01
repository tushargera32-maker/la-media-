# ImageGallery Component

A responsive masonry grid image gallery component with smooth hover effects, built for Next.js with TypeScript and Tailwind CSS.

## Features

- **Masonry Grid Layout**: Pinterest-style columns that adapt to different screen sizes
- **Smooth Hover Effects**: Image zoom, overlay fade-in, and accent border animations
- **Responsive**: Configurable columns for different breakpoints
- **TypeScript**: Full type safety with interfaces
- **Next.js Image Optimization**: Automatic image optimization with proper sizing
- **Customizable**: Control columns, gaps, overlay visibility, and click handlers
- **Accessible**: Semantic HTML with proper alt text support

## Installation

The component is already created in your project at:
```
/components/ImageGallery.tsx
```

## Basic Usage

```tsx
import ImageGallery, { GalleryImage } from '@/components/ImageGallery';

const images: GalleryImage[] = [
  {
    id: 1,
    src: '/images/photo-1.jpg',
    alt: 'Description of the image',
    title: 'Image Title',
    description: 'Brief description',
    category: 'Category Name',
    aspectRatio: 16 / 9,
  },
  // ... more images
];

export default function Portfolio() {
  return (
    <ImageGallery
      images={images}
      columns={{ default: 1, sm: 2, md: 3, lg: 4 }}
      gap={4}
    />
  );
}
```

## Props

### `ImageGalleryProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `GalleryImage[]` | **Required** | Array of image objects to display |
| `columns` | `object` | `{ default: 1, sm: 2, md: 3, lg: 4 }` | Number of columns at different breakpoints |
| `gap` | `number` | `4` | Gap size between images (Tailwind spacing scale) |
| `showOverlay` | `boolean` | `true` | Show/hide the hover overlay effect |
| `onImageClick` | `function` | `undefined` | Callback function when an image is clicked |

### `GalleryImage` Interface

```typescript
interface GalleryImage {
  id: string | number;           // Unique identifier
  src: string;                   // Image source URL
  alt: string;                   // Alt text for accessibility
  title?: string;                // Optional title shown on hover
  description?: string;          // Optional description shown on hover
  category?: string;             // Optional category badge
  aspectRatio?: number;          // Optional aspect ratio (width/height)
}
```

## Column Configuration

The `columns` prop accepts an object with breakpoint keys:

```tsx
columns={{
  default: 1,  // Mobile (< 640px)
  sm: 2,       // Small (≥ 640px)
  md: 3,       // Medium (≥ 768px)
  lg: 4,       // Large (≥ 1024px)
  xl: 6,       // Extra Large (≥ 1280px)
}}
```

## Examples

### Basic Gallery (No Overlay)

```tsx
<ImageGallery
  images={images}
  showOverlay={false}
  columns={{ default: 1, md: 2, lg: 3 }}
/>
```

### Dense Grid Layout

```tsx
<ImageGallery
  images={images}
  columns={{ default: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
  gap={2}
/>
```

### Two-Column Layout with Large Gaps

```tsx
<ImageGallery
  images={images}
  columns={{ default: 1, md: 2 }}
  gap={8}
/>
```

### With Click Handler

```tsx
const handleImageClick = (image: GalleryImage) => {
  // Open modal, navigate to detail page, etc.
  console.log('Clicked:', image);
};

<ImageGallery
  images={images}
  onImageClick={handleImageClick}
/>
```

## Hover Effects

The component includes several hover effects:

1. **Image Zoom**: 110% scale on hover with smooth transition
2. **Overlay Fade**: Gradient overlay appears from bottom
3. **Content Slide**: Title and description slide up
4. **Accent Border**: Top border scales in from left
5. **Shadow Enhancement**: Shadow intensifies on hover
6. **Arrow Animation**: "View Details" arrow slides right

## Styling

The component uses Tailwind CSS with custom design tokens:

- `accent`: Primary accent color
- `accent-dark`: Darker accent shade
- `foreground`: Text color
- `muted`: Muted text color
- `surface`: Surface background color
- `border`: Border color

These should be defined in your Tailwind configuration.

## Aspect Ratios

For optimal masonry layout, specify aspect ratios for your images:

```typescript
const images = [
  {
    id: 1,
    src: '/image.jpg',
    alt: 'Image',
    aspectRatio: 16 / 9,  // Landscape
  },
  {
    id: 2,
    src: '/image2.jpg',
    alt: 'Image 2',
    aspectRatio: 4 / 5,   // Portrait
  },
  {
    id: 3,
    src: '/image3.jpg',
    alt: 'Image 3',
    aspectRatio: 1,       // Square
  },
];
```

## Performance

The component uses Next.js `Image` component with:
- Automatic image optimization
- Lazy loading
- Responsive sizes based on column configuration
- Proper width/height attributes to prevent layout shift

## Browser Support

The masonry layout uses CSS `columns` property, which is supported in all modern browsers:
- Chrome/Edge: ✓
- Firefox: ✓
- Safari: ✓
- Mobile browsers: ✓

## Example File

See `ImageGallery.example.tsx` for a complete working example with sample data.

## License

Part of LA Media & Communication project.
