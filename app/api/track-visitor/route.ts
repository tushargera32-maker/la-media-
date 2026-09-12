import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit, rateLimitResponse } from '@/lib/ratelimit';

export async function POST(request: NextRequest) {
  // Analytics ping fires on every page view, so the budget is generous —
  // it only needs to stop abusive loops, not humans.
  if (!rateLimit(request, "track-visitor", 180)) return rateLimitResponse();
  try {
    const body = await request.json();
    const { sessionId, path, title } = body;

    // Get visitor info from headers
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';
    const ipAddress = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      'unknown';

    // Parse user agent for device/browser/os info
    const isMobile = /mobile/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent);
    const device = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

    let browser = 'unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    let os = 'unknown';
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'MacOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS') || userAgent.includes('iPhone')) os = 'iOS';

    // Check if visitor already exists
    const existingVisitor = await prisma.siteVisitor.findUnique({
      where: { sessionId },
    });

    if (existingVisitor) {
      // Update existing visitor
      await prisma.siteVisitor.update({
        where: { sessionId },
        data: {
          visitCount: { increment: 1 },
          lastVisitedAt: new Date(),
        },
      });
    } else {
      // Create new visitor
      await prisma.siteVisitor.create({
        data: {
          sessionId,
          ipAddress,
          userAgent,
          referrer: referrer || null,
          landingPage: path,
          device,
          browser,
          os,
        },
      });
    }

    // Track page view
    await prisma.pageView.create({
      data: {
        sessionId,
        path,
        title: title || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}
