import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendAdminNotification } from "@/lib/resend";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    const where: any = {};
    if (status) where.status = status;

    const [contacts, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact submissions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const contact = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        message,
        status: "new",
      },
    });

    // Notify admin (don't wait for it to complete)
    sendAdminNotification({
      type: 'contact',
      name,
      email,
      details: `
        Phone: ${phone || "Not provided"}
        Company: ${company || "Not provided"}
        Message: ${message}
      `,
    }).catch(err => console.error('Failed to send admin notification:', err));

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Error creating contact submission:", error);
    return NextResponse.json(
      { error: "Failed to create contact submission" },
      { status: 500 }
    );
  }
}
