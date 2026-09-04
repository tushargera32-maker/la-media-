import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { Reveal, RevealGroup } from '@/components/motion/Motion';
import { Eyebrow } from '@/components/ui/Primitives';
import { PartnersShowcaseClient } from './PartnersShowcaseClient';

export async function PartnersShowcase() {
  // Fetch partners on server side
  const partners = await prisma.partner.findMany({
    where: { published: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    take: 100,
  });

  if (!partners || partners.length === 0) {
    return null; // Don't show section if no partners
  }

  return <PartnersShowcaseClient partners={partners} />;
}
