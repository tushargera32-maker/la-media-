# SmoothScroll Component

A React wrapper component that integrates Lenis smooth scrolling with GSAP ScrollTrigger for Next.js applications.

## Features

- 🎯 Seamless Lenis smooth scroll integration
- 🎨 Full GSAP ScrollTrigger support
- ⚡ Optimized performance with RAF synchronization
- 🎮 Programmatic scroll control
- 📱 Touch device configuration
- 🔧 Customizable easing and duration
- 💪 TypeScript support

## Installation

The required dependencies are already installed in this project:
- `@studio-freight/lenis` (v1.0.42)
- `gsap` (v3.15.0)

## Basic Usage

Wrap your page content with the `SmoothScroll` component in your layout or page:

```tsx
import SmoothScroll from '@/components/SmoothScroll';

export default function Layout({ children }) {
  return (
    <SmoothScroll>
      {children}
    </SmoothScroll>
  );
}
```

## Advanced Configuration

Customize the smooth scroll behavior with options:

```tsx
<SmoothScroll
  options={{
    duration: 1.2,          // Scroll animation duration (default: 1.2)
    easing: (t) => t,       // Easing function (default: expo ease-out)
    smooth: true,           // Enable smooth scroll (default: true)
    smoothTouch: false,     // Enable on touch devices (default: false)
    touchMultiplier: 2,     // Touch scroll speed multiplier (default: 2)
  }}
>
  {children}
</SmoothScroll>
```

## GSAP ScrollTrigger Integration

The component automatically syncs Lenis with GSAP ScrollTrigger. Use ScrollTrigger animations as normal:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AnimatedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div ref={sectionRef}>
      <h2>This fades in on scroll</h2>
    </div>
  );
}
```

## Programmatic Control

The Lenis instance is available globally via `window.lenis`:

```tsx
// Scroll to top
window.lenis?.scrollTo(0);

// Scroll to element
window.lenis?.scrollTo('#section-id');

// Scroll to element with offset
window.lenis?.scrollTo('#section-id', { offset: -100 });

// Stop smooth scroll (useful for modals)
window.lenis?.stop();

// Resume smooth scroll
window.lenis?.start();

// Scroll to position with custom duration
window.lenis?.scrollTo(500, {
  duration: 2,
  easing: (t) => t,
});
```

## Common Use Cases

### 1. Fade In on Scroll

```tsx
gsap.fromTo(
  element,
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 50%',
      scrub: true,
    },
  }
);
```

### 2. Parallax Effect

```tsx
gsap.to(element, {
  y: -200,
  scrollTrigger: {
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});
```

### 3. Pin Section

```tsx
ScrollTrigger.create({
  trigger: element,
  start: 'top top',
  end: '+=500',
  pin: true,
  pinSpacing: true,
});
```

### 4. Horizontal Scroll

```tsx
gsap.to(container, {
  x: () => -(container.scrollWidth - window.innerWidth),
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: () => `+=${container.scrollWidth}`,
    scrub: true,
    pin: true,
  },
});
```

## Disabling Smooth Scroll for Modals

When opening modals or overlays, you should disable smooth scroll:

```tsx
const openModal = () => {
  window.lenis?.stop();
  setModalOpen(true);
};

const closeModal = () => {
  window.lenis?.start();
  setModalOpen(false);
};
```

## Performance Tips

1. Use `scrub: true` for scroll-linked animations to sync with Lenis
2. Avoid `scrub: false` with Lenis as it may cause timing issues
3. Set `smoothTouch: false` for better mobile performance
4. Use `will-change: transform` CSS for animated elements

## TypeScript Support

The component is fully typed with TypeScript:

```tsx
interface SmoothScrollProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    smooth?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
  };
}
```

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile Safari: Limited (smoothTouch disabled by default)
- Mobile Chrome: Limited (smoothTouch disabled by default)

## Troubleshooting

### Scroll animations not working

Ensure you're registering ScrollTrigger in your component:
```tsx
gsap.registerPlugin(ScrollTrigger);
```

### Fixed navigation jumping

Set `position: fixed` elements to use `position: absolute` within the scroll container, or exclude them from the smooth scroll wrapper.

### Mobile scroll feels sluggish

Set `smoothTouch: false` in options (default behavior).

### ScrollTrigger not updating

The component automatically syncs ScrollTrigger with Lenis. If issues persist, manually refresh:
```tsx
ScrollTrigger.refresh();
```

## Example

See `SmoothScroll.example.tsx` for a complete working example with multiple animation types.

## Credits

- [Lenis](https://github.com/studio-freight/lenis) by Studio Freight
- [GSAP](https://greensock.com/gsap/) by GreenSock
