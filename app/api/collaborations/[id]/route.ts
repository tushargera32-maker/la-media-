import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const collaborationRequest = await prisma.collaborationRequest.findUnique({
      where: { id: (await params).id },
    });

    if (!collaborationRequest) {
      return NextResponse.json(
        { error: 'Collaboration request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(collaborationRequest);
  } catch (error) {
    console.error('Error fetching collaboration request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collaboration request' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();

    const collaborationRequest = await prisma.collaborationRequest.update({
      where: { id: (await params).id },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json(collaborationRequest);
  } catch (error: any) {
    console.error('Error updating collaboration request:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Collaboration request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update collaboration request' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await prisma.collaborationRequest.delete({
      where: { id: (await params).id },
    });

    return NextResponse.json({ message: 'Collaboration request deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting collaboration request:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Collaboration request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete collaboration request' },
      { status: 500 }
    );
  }
}
