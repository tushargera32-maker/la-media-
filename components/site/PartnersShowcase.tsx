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
        const response = await fetch('/api/partners?published=true&limit=100');
        if (!response.ok) throw new Error('Failed to fetch partners');
        const data = await response.json();
        setPartners(data.partners || []);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading || partners.length === 0) {
    return null; // Don't show section if loading or no partners
  }

  return <PartnersShowcaseClient partners={partners} />;
}
