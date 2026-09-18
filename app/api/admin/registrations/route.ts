import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const [general, architects, sponsors] = await Promise.all([
      prisma.eventRegistration.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.architectRegistration.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.sponsorRegistration.findMany({ orderBy: { createdAt: 'desc' } }),
    ]);

    return NextResponse.json({ general, architects, sponsors });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}
