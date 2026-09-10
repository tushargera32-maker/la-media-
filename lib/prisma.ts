import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

/**
 * Prisma client.
 *
 * The live database is libSQL/Turso. Prisma cannot speak to a `libsql://`
 * URL on its own — it needs the driver adapter below, which was missing
 * from this project even though @libsql/client was installed.
 *
 * TO SWITCH TO POSTGRES: set `provider = "postgresql"` in schema.prisma,
 * drop the `previewFeatures` line, and replace the body of makeClient()
 * with `new PrismaClient()`.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function makeClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? '';

  // A local file: URL needs no adapter, which keeps `next dev` working
  // against a plain SQLite file without a Turso connection.
  if (!url.startsWith('libsql://') && !url.startsWith('http')) {
    return new PrismaClient();
  }

  const libsql = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN,
  });

  return new PrismaClient({ adapter: new PrismaLibSQL(libsql) });
}

export const prisma = globalForPrisma.prisma ?? makeClient();

// Reuse the client across hot reloads; otherwise dev exhausts connections.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
