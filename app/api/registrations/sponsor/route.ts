import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { HEARD_ABOUT_OPTIONS } from "@/lib/content";
import { sendAdminNotification, sendUserConfirmation } from "@/lib/resend";
import { rateLimit, rateLimitResponse } from "@/lib/ratelimit";

function str(value: unknown, max = 300): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (!rateLimit(request, "registrations:sponsor", 10)) return rateLimitResponse();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const d = body as Record<string, unknown>;

  const companyName = str(d.companyName, 160);
  const contactName = str(d.contactName, 120);
  const email = str(d.email, 190).toLowerCase();
  const phone = str(d.phone, 24);
  const gstNumber = str(d.gstNumber, 20);
  const address = str(d.address, 500);
  const city = str(d.city, 100);
  const state = str(d.state, 100);
  const pincode = str(d.pincode, 10);
  const stallSize = str(d.stallSize, 60);
  const requirements = str(d.requirements, 1000);
  const heardAbout = str(d.heardAbout, 60);
  const consent = d.consent === true;

  const errors: string[] = [];
  if (!companyName) errors.push("Company name is required.");
  if (!contactName) errors.push("Contact person name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push("A valid email is required.");
  if (!/^\+91[6-9]\d{9}$/.test(phone)) errors.push("A valid Indian mobile number is required.");
  if (!gstNumber) errors.push("GST number is required.");
  if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstNumber)) {
    errors.push("Enter a valid 15-digit GST number.");
  }
  if (!address) errors.push("Address is required.");
  if (!city) errors.push("City is required.");
  if (!state) errors.push("State is required.");
  if (!pincode) errors.push("Pincode is required.");
  if (!/^[1-9][0-9]{5}$/.test(pincode)) errors.push("Enter a valid 6-digit pincode.");
  if (!stallSize) errors.push("Stall size is required.");
  if (!HEARD_ABOUT_OPTIONS.includes(heardAbout)) errors.push("Select how you heard about us.");
  if (!consent) errors.push("Consent is required.");

  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
  }

  try {
    await prisma.sponsorRegistration.create({
      data: {
        companyName,
        contactName,
        email,
        phone,
        gstNumber,
        address,
        city,
        state,
        pincode,
        stallSize: stallSize || null,
        requirements: requirements || null,
        heardAbout: heardAbout || null,
        consent,
      },
    });

    // Send emails (don't wait for them to complete)
    sendUserConfirmation({
      name: contactName,
      email,
      type: 'sponsor',
      details: `${companyName} · ${stallSize}`,
    }).catch(err => console.error('Failed to send user confirmation:', err));

    sendAdminNotification({
      type: 'sponsor',
      name: contactName,
      email,
      details: `
        Phone: ${phone}
        Company: ${companyName}
        Stall: ${stallSize}
        GST: ${gstNumber}
        City: ${city}, ${state} - ${pincode}
        Heard About: ${heardAbout}
      `,
    }).catch(err => console.error('Failed to send admin notification:', err));

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Sponsor registration insert failed:", error);
    return NextResponse.json(
      { error: "We couldn't save your booking. Please try again." },
      { status: 500 },
    );
  }
}
