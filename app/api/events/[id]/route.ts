import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { eventSchema } from '@/lib/validations/event';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: (await params).id },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();

    const validatedData = eventSchema.parse(body);

    // Preserve explicit 0 (|| would turn it into null); only empty/NaN becomes null.
    const numOrNull = (v: unknown) =>
      typeof v === 'number' && !Number.isNaN(v) ? v : null;

    const event = await prisma.event.update({
      where: { id: (await params).id },
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

    return NextResponse.json(event);
  } catch (error: any) {
    console.error('Error updating event:', error);

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

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await prisma.event.delete({
      where: { id: (await params).id },
    });

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting event:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
