import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendAdminNotification } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, location, service, stage, size, query } = body;

    // Validate required fields
    if (!name || !phone || !email || !location || !service || !stage || !query) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Store in ContactSubmission table
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        company: `Build Right - ${location}`,
        message: `
SERVICE REQUIRED: ${service}
PROJECT LOCATION: ${location}
PROJECT STAGE: ${stage}
PROJECT SIZE: ${size || "Not specified"}

REQUIREMENT/QUERY:
${query}
        `.trim(),
        status: "new",
      },
    });

    // Notify admin (don't wait for it to complete)
    sendAdminNotification({
      type: 'contact',
      name,
      email,
      details: `
        Phone: ${phone}
        Project Location: ${location}
        Service: ${service}
        Stage: ${stage}
        Size: ${size || "Not specified"}
        Query: ${query}
      `,
    }).catch(err => console.error('Failed to send admin notification:', err));

    return NextResponse.json(
      { success: true, message: "Consultation request received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Build Right inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
