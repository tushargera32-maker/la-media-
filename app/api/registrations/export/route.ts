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

  const rows = await prisma.eventRegistration.findMany({
    orderBy: { createdAt: "desc" },
  });

  const headers = [
    "First name", "Last name", "Email", "Phone", "Organisation",
    "Designation", "Heard about", "Dietary", "Received",
  ];

  const body = rows.map((r) =>
    [
      r.firstName, r.lastName, r.email, r.phone, r.organisation,
      r.designation, r.heardAbout, r.dietary, r.createdAt.toISOString(),
    ].map(cell).join(","),
  );

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
