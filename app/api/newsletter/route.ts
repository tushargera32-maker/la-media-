import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNewsletterWelcome, sendAdminNotification } from "@/lib/resend";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.email = {
        contains: search,
        mode: "insensitive",
      };
    }

    const [subscribers, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.newsletterSubscriber.count({ where }),
    ]);

    return NextResponse.json({
      subscribers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletter subscribers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingSubscriber) {
      if (existingSubscriber.status === "active") {
        return NextResponse.json(
          { error: "This email is already subscribed" },
          { status: 409 }
        );
      } else {
        // Reactivate if previously unsubscribed
        const updatedSubscriber = await prisma.newsletterSubscriber.update({
          where: { email: email.toLowerCase() },
          data: { status: "active" },
        });

        // Send welcome email
        sendNewsletterWelcome(email.toLowerCase()).catch(err =>
          console.error('Failed to send newsletter welcome:', err)
        );

        return NextResponse.json(updatedSubscriber, { status: 200 });
      }
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase(),
        status: "active",
      },
    });

    // Send welcome email to subscriber
    sendNewsletterWelcome(email.toLowerCase()).catch(err =>
      console.error('Failed to send newsletter welcome:', err)
    );

    // Notify admin
    sendAdminNotification({
      type: 'newsletter',
      email: email.toLowerCase(),
      details: 'New newsletter subscription',
    }).catch(err => console.error('Failed to send admin notification:', err));

    return NextResponse.json(subscriber, { status: 201 });
  } catch (error) {
    console.error("Error creating newsletter subscriber:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}

