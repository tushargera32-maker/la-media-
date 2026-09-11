import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Temporary diagnostics: reports whether the LIVE deployment can see
 * database env vars and reach Turso. Returns booleans only — never values.
 * Remove once the production DB connection is confirmed working.
 */
export async function GET() {
  const hasTursoUrl = !!(process.env.TURSO_DATABASE_URL ?? "").trim();
  const hasTursoToken = !!(process.env.TURSO_AUTH_TOKEN ?? "").trim();
  const hasDatabaseUrl = !!(process.env.DATABASE_URL ?? "").trim();

  let reachable: boolean | null = null;
  let error: string | null = null;
  try {
    await prisma.$queryRaw`SELECT 1`;
    reachable = true;
  } catch (e) {
    reachable = false;
    error = e instanceof Error ? e.message.slice(0, 200) : "unknown error";
  }

  return NextResponse.json({
    hasTursoUrl,
    hasTursoToken,
    hasDatabaseUrl,
    reachable,
    error,
  });
}
