import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const registrations = await prisma.eventRegistration.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}
