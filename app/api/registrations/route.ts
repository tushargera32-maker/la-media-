import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { HEARD_ABOUT_OPTIONS } from "@/lib/content";
import { sendAdminNotification, sendUserConfirmation } from "@/lib/resend";

/*
  Server-side validation is not a duplicate of the client's - it is the
  real one. Anything can POST here; the browser check is a convenience.
*/

function str(value: unknown, max = 300): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const d = body as Record<string, unknown>;

  const firstName    = str(d.firstName, 120);
  const lastName     = str(d.lastName, 120);
  const email        = str(d.email, 190).toLowerCase();
  const phone        = str(d.phone, 24);
  const firmName     = str(d.firmName, 160);
  const designation  = str(d.designation, 160);
  const coaNumber    = str(d.coaNumber, 60);
  const gstNumber    = str(d.gstNumber, 60);
  const heardAbout   = str(d.heardAbout, 60);
  const consent      = d.consent === true;

  const errors: string[] = [];
  if (!firstName) errors.push("First name is required.");
  if (!lastName) errors.push("Last name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push("A valid email is required.");
  if (!/^\+91[6-9]\d{9}$/.test(phone)) errors.push("A valid Indian mobile number is required.");
  if (!firmName) errors.push("Firm name is required.");
  if (!designation) errors.push("Designation is required.");
  // Whitelisted so the stored value can only ever be one we render.
  if (!HEARD_ABOUT_OPTIONS.includes(heardAbout)) errors.push("Select how you heard about us.");
  if (!consent) errors.push("Consent is required.");

  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
  }

  try {
    await prisma.eventRegistration.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        firmName: firmName || null,
        designation: designation || null,
        coaNumber: coaNumber || null,
        gstNumber: gstNumber || null,
        heardAbout: heardAbout || null,
        consent,
      },
    });

    // Send emails (don't wait for them to complete)
    const fullName = `${firstName} ${lastName}`;

    // Send confirmation to user
    sendUserConfirmation({
      name: fullName,
      email,
      type: 'registration',
    }).catch(err => console.error('Failed to send user confirmation:', err));

    // Send notification to admin
    sendAdminNotification({
      type: 'registration',
      name: fullName,
      email,
      details: `
        Phone: ${phone}
        Firm: ${firmName}
        Designation: ${designation}
        ${coaNumber ? `COA: ${coaNumber}` : ''}
        ${gstNumber ? `GST: ${gstNumber}` : ''}
        Heard About: ${heardAbout}
      `,
    }).catch(err => console.error('Failed to send admin notification:', err));

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    // Never leak the database error to the browser.
    console.error("Registration insert failed:", error);
    return NextResponse.json(
      { error: "We couldn't save your registration. Please try again." },
      { status: 500 },
    );
  }
}


