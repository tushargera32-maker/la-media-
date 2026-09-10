import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Get all counts
    const [
      eventRegistrations,
      architectRegistrations,
      sponsorRegistrations,
      contactSubmissions,
      newsletterSubscribers,
      todayRegistrations,
      weekRegistrations,
    ] = await Promise.all([
      prisma.eventRegistration.count(),
      prisma.architectRegistration.count(),
      prisma.sponsorRegistration.count(),
      prisma.contactSubmission.count(),
      prisma.newsletterSubscriber.count({
        where: { status: 'active' },
      }),
      prisma.eventRegistration.count({
        where: {
          createdAt: {
            gte: today,
          },
        },
      }),
      prisma.eventRegistration.count({
        where: {
          createdAt: {
            gte: weekAgo,
          },
        },
      }),
    ]);

    return NextResponse.json({
      eventRegistrations,
      architectRegistrations,
      sponsorRegistrations,
      contactSubmissions,
      newsletterSubscribers,
      todayRegistrations,
      weekRegistrations,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
