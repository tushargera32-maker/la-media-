// One-off: reproduce the exact contactSubmission.create path. Delete after use.
import fs from "node:fs";

async function main() {
  for (const line of fs.readFileSync(".env", "utf8").split("\n")) {
    const m = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) {
      process.env[m[1]] = m[2].replace(/^"|"$/g, "");
    }
  }

  const { prisma } = await import("../lib/prisma");
  const row = await prisma.contactSubmission.create({
    data: {
      name: "Debug Test",
      email: "debug@example.com",
      phone: null,
      company: null,
      message: "diagnostic - ignore",
      status: "new",
    },
  });
  console.log("CREATE_OK", row.id);
  await prisma.contactSubmission.delete({ where: { id: row.id } });
  console.log("DELETE_OK");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("REPRO_FAILED:", e instanceof Error ? e.message.slice(0, 500) : e);
  process.exit(1);
});
