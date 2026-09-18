import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

type RegType = 'general' | 'architect' | 'sponsor';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const { handled, type } = body as { handled?: unknown; type?: unknown };

    if (typeof handled !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid handled value' },
        { status: 400 }
      );
    }

    const regType: RegType =
      type === 'architect' || type === 'sponsor' ? type : 'general';

    const model =
      regType === 'architect'
        ? prisma.architectRegistration
        : regType === 'sponsor'
          ? prisma.sponsorRegistration
          : prisma.eventRegistration;

    const registration = await model.update({
      where: { id },
      data: { handled },
    });

    return NextResponse.json(registration);
  } catch (error) {
    console.error('Error updating registration:', error);
    return NextResponse.json(
      { error: 'Failed to update registration' },
      { status: 500 }
    );
  }
}
