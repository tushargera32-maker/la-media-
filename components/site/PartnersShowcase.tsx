import { prisma } from '@/lib/prisma';
import { PartnersShowcaseClient } from './PartnersShowcaseClient';

export async function PartnersShowcase() {
  try {
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
  } catch (error) {
    // During build time or if DB not available, skip partners section
    console.log('Partners section skipped:', error instanceof Error ? error.message : 'Database unavailable');
    return null;
  }
}
