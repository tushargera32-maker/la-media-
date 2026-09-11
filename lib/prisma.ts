import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function makeClient(): PrismaClient {
  // Pasted env values sometimes carry stray whitespace or surrounding
  // quotes (e.g. copied as KEY="value"). Normalise before using.
  const clean = (v: string | undefined): string =>
    (v ?? "").trim().replace(/^["']|["']$/g, "").trim();

  const url =
    clean(process.env.TURSO_DATABASE_URL) ||
    clean(process.env.DATABASE_URL) ||
    '';

  // Build-safe fallback: during `next build` on Vercel, env vars may be
  // missing/empty which previously caused `URL_INVALID` and failed the
  // whole build in generateStaticParams. Fall back to a local file so the
  // client can at least be constructed; queries are caught per-page.
  if (!url) {
    if (!process.env.DATABASE_URL) {
      process.env.DATABASE_URL = 'file:./dev.db';
    }
    return new PrismaClient();
  }

  // Local SQLite
  if (!url.startsWith('libsql://') && !url.startsWith('http')) {
    return new PrismaClient();
  }

  // Turso / libSQL — the adapter takes a Config ({ url, authToken }),
  // NOT a Client instance. Passing a Client silently breaks the connection
  // (config.url reads as undefined → URL_INVALID at query time).
  const authToken = clean(
    process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN
  );
  return new PrismaClient({
    adapter: new PrismaLibSQL({ url, authToken: authToken || undefined }),
  });
}

export const prisma =
  globalForPrisma.prisma ?? makeClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}