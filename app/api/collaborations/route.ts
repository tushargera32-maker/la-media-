import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const skip = (page - 1) * limit;

    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status;

    const [requests, total] = await Promise.all([
      prisma.collaborationRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.collaborationRequest.count({ where }),
    ]);

    return NextResponse.json({
      requests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching collaboration requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collaboration requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const collaborationRequest = await prisma.collaborationRequest.create({
      data: {
        type: body.type,
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        company: body.company || null,
        message: body.message,
        status: body.status || 'pending',
      },
    });

    return NextResponse.json(collaborationRequest, { status: 201 });
  } catch (error: any) {
    console.error('Error creating collaboration request:', error);
    return NextResponse.json(
      { error: 'Failed to create collaboration request' },
      { status: 500 }
    );
  }
}
