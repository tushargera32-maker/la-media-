import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/*
  Auth-gated CSV export. Middleware lets all GETs through on /api, so this
  route must check the session itself - otherwise the whole mailing list is
  one guessed URL away.
*/

function cell(value: unknown): string {
  const raw = value === null || value === undefined ? "" : String(value);
  // Excel executes cells starting with = + - or @ as formulas.
  const guarded = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `"${guarded.replace(/"/g, '""')}"`;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const rows = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  const csv =
    "\uFEFF" +
    [
      ["Email", "Status", "Subscribed"].map(cell).join(","),
      ...rows.map((r) => [r.email, r.status, r.createdAt.toISOString()].map(cell).join(",")),
    ].join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
