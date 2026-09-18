import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/*
  CSV export of registrations. Auth-gated: this is personal data, and an
  unauthenticated export endpoint would hand the entire list to anyone
  who guessed the URL.
*/

/**
 * Escapes a value for CSV.
 *
 * The leading apostrophe guard matters: Excel executes a cell beginning
 * with = + - or @ as a formula, so an attacker can put =HYPERLINK(...) in
 * a free-text field and attack whoever opens the export. Prefixing with a
 * quote neutralises it.
 */
function cell(value: unknown): string {
  const raw = value === null || value === undefined ? "" : String(value);
  const guarded = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `"${guarded.replace(/"/g, '""')}"`;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const [general, architects, sponsors] = await Promise.all([
    prisma.eventRegistration.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.architectRegistration.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.sponsorRegistration.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const headers = [
    "Type", "Name", "Email", "Phone", "Firm / Company", "Designation / Contact",
    "COA", "GST", "Stall Size", "City", "Heard About", "Handled", "Received",
  ];

  const iso = (d: Date) => d.toISOString();

  const body: string[] = [
    ...general.map((r) =>
      ["General", `${r.firstName} ${r.lastName}`, r.email, r.phone,
        r.firmName, r.designation, r.coaNumber, r.gstNumber, "",
        "", r.heardAbout, r.handled ? "Yes" : "No", iso(r.createdAt),
      ].map(cell).join(",")),
    ...architects.map((r) =>
      ["Architect", `${r.firstName} ${r.lastName}`, r.email, r.phone,
        r.firmName, r.designation, r.coaNumber, "", "", "",
        r.heardAbout, r.handled ? "Yes" : "No", iso(r.createdAt),
      ].map(cell).join(",")),
    ...sponsors.map((r) =>
      ["Sponsor", r.companyName, r.email, r.phone, r.companyName,
        r.contactName, "", r.gstNumber, r.stallSize, r.city,
        r.heardAbout, r.handled ? "Yes" : "No", iso(r.createdAt),
      ].map(cell).join(",")),
  ];

  // BOM so Excel opens UTF-8 names correctly instead of mangling them.
  const csv = "\uFEFF" + [headers.map(cell).join(","), ...body].join("\r\n");
  const stamp = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="registrations-${stamp}.csv"`,
    },
  });
}
