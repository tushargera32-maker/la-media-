import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { HEARD_ABOUT_OPTIONS, DIETARY_OPTIONS } from "@/lib/content";

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
  const organisation = str(d.organisation, 160);
  const designation  = str(d.designation, 160);
  const heardAbout   = str(d.heardAbout, 60);
  const dietary      = str(d.dietary, 60);
  const consent      = d.consent === true;

  const errors: string[] = [];
  if (!firstName) errors.push("First name is required.");
  if (!lastName) errors.push("Last name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push("A valid email is required.");
  if (!/^\+91[6-9]\d{9}$/.test(phone)) errors.push("A valid Indian mobile number is required.");
  // Whitelisted so the stored value can only ever be one we render.
  if (!HEARD_ABOUT_OPTIONS.includes(heardAbout)) errors.push("Select how you heard about us.");
  if (dietary && !DIETARY_OPTIONS.includes(dietary)) errors.push("Select a valid dietary preference.");
  if (!consent) errors.push("Consent is required.");

  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
  }

  try {
    await prisma.eventRegistration.create({
      data: {
        firstName, lastName, email, phone,
        organisation: organisation || null,
        designation: designation || null,
        heardAbout: heardAbout || null,
        dietary: dietary || null,
        consent,
      },
    });
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
