import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { eventSchema } from '@/lib/validations/event';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const published = searchParams.get('published');

    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (featured !== null) where.featured = featured === 'true';
    if (published !== null) where.published = published === 'true';

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.event.count({ where }),
    ]);

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = eventSchema.parse(body);

    // Preserve explicit 0 (|| would turn it into null); only empty/NaN becomes null.
    const numOrNull = (v: unknown) =>
      typeof v === 'number' && !Number.isNaN(v) ? v : null;

    const event = await prisma.event.create({
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        image: validatedData.image || null,
        video: validatedData.video || null,
        expectedAttendees: numOrNull(validatedData.expectedAttendees),
        registeredCount: numOrNull(validatedData.registeredCount),
        brandPartners: numOrNull(validatedData.brandPartners),
        speakers: numOrNull(validatedData.speakers),
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error: any) {
    console.error('Error creating event:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'An event with this slug already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
