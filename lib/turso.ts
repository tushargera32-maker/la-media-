import { prisma } from './prisma';

// Deprecated: kept for backwards-compat imports.
// Use `@/lib/prisma` directly — it handles Turso/libSQL + local SQLite
// and is safe when env vars are missing at build time.
export { prisma };
export default prisma;
