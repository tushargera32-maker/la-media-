import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { partnerSchema } from '@/lib/validations/partner';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const partner = await prisma.partner.findUnique({
      where: { id: (await params).id },
    });

    if (!partner) {
      return NextResponse.json(
        { error: 'Partner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(partner);
  } catch (error) {
    console.error('Error fetching partner:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partner' },
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

    const validatedData = partnerSchema.parse(body);

    const partner = await prisma.partner.update({
      where: { id: (await params).id },
      data: {
        ...validatedData,
        logo: validatedData.logo || null,
        website: validatedData.website || null,
      },
    });

    return NextResponse.json(partner);
  } catch (error: any) {
    console.error('Error updating partner:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Partner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update partner' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await prisma.partner.delete({
      where: { id: (await params).id },
    });

    return NextResponse.json({ message: 'Partner deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting partner:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Partner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete partner' },
      { status: 500 }
    );
  }
}
