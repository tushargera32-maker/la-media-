import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { id },
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(subscriber);
  } catch (error) {
    console.error("Error fetching newsletter subscriber:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletter subscriber" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { email, status } = body;

    // Validate status if provided
    if (status && !["active", "unsubscribed", "bounced"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be active, unsubscribed, or bounced" },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        );
      }

      // Check if email already exists (excluding current subscriber)
      const existingSubscriber = await prisma.newsletterSubscriber.findFirst({
        where: {
          email: email.toLowerCase(),
          NOT: { id },
        },
      });

      if (existingSubscriber) {
        return NextResponse.json(
          { error: "This email is already in use" },
          { status: 409 }
        );
      }
    }

    const subscriber = await prisma.newsletterSubscriber.update({
      where: { id },
      data: {
        ...(email && { email: email.toLowerCase() }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(subscriber);
  } catch (error) {
    console.error("Error updating newsletter subscriber:", error);
    return NextResponse.json(
      { error: "Failed to update newsletter subscriber" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.newsletterSubscriber.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Subscriber deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting newsletter subscriber:", error);
    return NextResponse.json(
      { error: "Failed to delete newsletter subscriber" },
      { status: 500 }
    );
  }
}
