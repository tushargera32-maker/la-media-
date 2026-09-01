import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { galleryImageUpdateSchema } from '@/lib/validations/gallery';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const image = await prisma.galleryImage.findUnique({
      where: { id: (await params).id },
    });

    if (!image) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(image);
  } catch (error) {
    console.error('Error fetching gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery image' },
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

    const validatedData = galleryImageUpdateSchema.parse(body);

    const updateData: any = {};
    if (validatedData.title !== undefined) updateData.title = validatedData.title || null;
    if (validatedData.image !== undefined) updateData.image = validatedData.image;
    if (validatedData.eventId !== undefined) updateData.eventId = validatedData.eventId || null;
    if (validatedData.category !== undefined) updateData.category = validatedData.category || null;
    if (validatedData.order !== undefined) updateData.order = validatedData.order;
    if (validatedData.published !== undefined) updateData.published = validatedData.published;

    const image = await prisma.galleryImage.update({
      where: { id: (await params).id },
      data: updateData,
    });

    return NextResponse.json(image);
  } catch (error: any) {
    console.error('Error updating gallery image:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update gallery image' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await prisma.galleryImage.delete({
      where: { id: (await params).id },
    });

    return NextResponse.json({ message: 'Gallery image deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting gallery image:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete gallery image' },
      { status: 500 }
    );
  }
}
