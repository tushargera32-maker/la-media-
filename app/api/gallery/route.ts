import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { galleryImageSchema } from '@/lib/validations/gallery';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const eventId = searchParams.get('eventId');
    const published = searchParams.get('published');

    const skip = (page - 1) * limit;

    const where: any = {};
    if (category) where.category = category;
    if (eventId) where.eventId = eventId;
    if (published !== null && published !== '') where.published = published === 'true';

    const [images, total] = await Promise.all([
      prisma.galleryImage.findMany({
        where,
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit,
      }),
      prisma.galleryImage.count({ where }),
    ]);

    return NextResponse.json({
      images,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = galleryImageSchema.parse(body);

    const image = await prisma.galleryImage.create({
      data: {
        title: validatedData.title || null,
        image: validatedData.image,
        eventId: validatedData.eventId || null,
        category: validatedData.category || null,
        order: validatedData.order || 0,
        published: validatedData.published ?? true,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error: any) {
    console.error('Error creating gallery image:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    );
  }
}
