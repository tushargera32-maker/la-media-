import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { partnerSchema } from '@/lib/validations/partner';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const published = searchParams.get('published');

    const skip = (page - 1) * limit;

    const where: any = {};
    if (category) where.category = category;
    if (published !== null) where.published = published === 'true';

    const [partners, total] = await Promise.all([
      prisma.partner.findMany({
        where,
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      prisma.partner.count({ where }),
    ]);

    return NextResponse.json({
      partners,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = partnerSchema.parse(body);

    const partner = await prisma.partner.create({
      data: {
        ...validatedData,
        logo: validatedData.logo || null,
        website: validatedData.website || null,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error: any) {
    console.error('Error creating partner:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create partner' },
      { status: 500 }
    );
  }
}
