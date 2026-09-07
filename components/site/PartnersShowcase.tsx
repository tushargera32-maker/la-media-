'use client';

import { useEffect, useState } from 'react';
import { PartnersShowcaseClient } from './PartnersShowcaseClient';

interface Partner {
  id: string;
  name: string;
  logo: string | null;
  website: string | null;
  category: string;
  order: number;
}

export function PartnersShowcase() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

        const response = await fetch('/api/partners?published=true&limit=100', {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error('Failed to fetch partners');
        const data = await response.json();
        setPartners(data.partners || []);
      } catch (error) {
        console.error('Error fetching partners:', error);
        // Don't block the UI - just hide section if it fails
      } finally {
        setLoading(false);
      }
    };

    // Small delay to let the page load first
    const timer = setTimeout(() => {
      fetchPartners();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Don't render anything while loading - prevents layout shift
  if (loading || partners.length === 0) {
    return null;
  }

  return <PartnersShowcaseClient partners={partners} />;
}
