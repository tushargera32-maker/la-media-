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
    // Get total visitors
    const totalVisitors = await prisma.siteVisitor.count();

    // Get today's visitors
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayVisitors = await prisma.siteVisitor.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    // Get this week's visitors
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekVisitors = await prisma.siteVisitor.count({
      where: {
        createdAt: {
          gte: weekAgo,
        },
      },
    });

    // Get recent visitors (last 50)
    const recentVisitors = await prisma.siteVisitor.findMany({
      take: 50,
      orderBy: {
        lastVisitedAt: 'desc',
      },
      select: {
        id: true,
        sessionId: true,
        country: true,
        city: true,
        device: true,
        browser: true,
        os: true,
        landingPage: true,
        visitCount: true,
        lastVisitedAt: true,
        createdAt: true,
      },
    });

    // Get most viewed pages
    const pageViews = await prisma.pageView.groupBy({
      by: ['path'],
      _count: {
        path: true,
      },
      orderBy: {
        _count: {
          path: 'desc',
        },
      },
      take: 10,
    });

    // Get device breakdown
    const deviceStats = await prisma.siteVisitor.groupBy({
      by: ['device'],
      _count: {
        device: true,
      },
    });

    // Get browser breakdown
    const browserStats = await prisma.siteVisitor.groupBy({
      by: ['browser'],
      _count: {
        browser: true,
      },
    });

    return NextResponse.json({
      stats: {
        total: totalVisitors,
        today: todayVisitors,
        thisWeek: weekVisitors,
      },
      recentVisitors,
      topPages: pageViews.map(pv => ({
        path: pv.path,
        views: pv._count.path,
      })),
      deviceStats: deviceStats.map(ds => ({
        device: ds.device,
        count: ds._count.device,
      })),
      browserStats: browserStats.map(bs => ({
        browser: bs.browser,
        count: bs._count.browser,
      })),
    });
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitor stats' },
      { status: 500 }
    );
  }
}
