import { prisma } from "@/lib/prisma";
import { Shell, PageHeader, TableWrap, Th, EmptyState, AdminButton } from "@/components/admin/ui";
import { HandledToggle } from "@/components/admin/RowActions";
import { toggleRegistrationHandled } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

/* ==================================================================
   ADMIN - EVENT REGISTRATIONS

   This page exists because the public form had nowhere to land. A form
   that writes to a table nobody can read is worse than no form: it
   silently collects leads that never reach anyone.

   Server component reading Prisma directly - no API round trip, no
   loading spinner, and the data never reaches the browser except as
   rendered HTML behind the auth check.
   ================================================================== */

export default async function AdminRegistrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Auth is enforced in middleware.ts for the whole /admin tree.
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1) || 1);
  const perPage = 25;

  const [registrations, total] = await Promise.all([
    prisma.eventRegistration.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.eventRegistration.count(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <Shell>
      <PageHeader
        title="Event registrations"
        description={`${total} total ${total === 1 ? "registration" : "registrations"}`}
        action={
          <AdminButton href="/api/registrations/export" variant="secondary">
            Export CSV
          </AdminButton>
        }
      />

      {registrations.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No registrations yet"
            body="Submissions from the public registration page will appear here."
          />
        </div>
      ) : (
        <div className="mt-8">
          <TableWrap>
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="border-b border-black/10 bg-neutral-50">
                <tr>
                  {["Name", "Contact", "Organisation", "Dietary", "Heard about us", "Designation", "Received", "Handled"].map((h) => (
                    <Th key={h}>{h}</Th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {registrations.map((r) => (
                  <tr key={r.id} className="align-top hover:bg-neutral-50">
                    <td className="px-4 py-4">
                      <p className="font-medium">{`${r.firstName} ${r.lastName}`}</p>
                      
                    </td>
                    <td className="px-4 py-4">
                      <a href={`mailto:${r.email}`} className="text-blue-700 hover:underline">{r.email}</a>
                      <p className="mt-1 text-neutral-600">{r.phone}</p>
                    </td>
                    <td className="px-4 py-4 text-neutral-700">{r.organisation ?? "-"}</td>
                    <td className="px-4 py-4 text-neutral-700">{r.dietary ?? "-"}</td>
                    <td className="px-4 py-4 text-neutral-700">{r.heardAbout ?? "-"}</td>
                    <td className="px-4 py-4 text-neutral-700">{r.designation ?? "-"}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-neutral-500">
                      {r.createdAt.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <HandledToggle
                        handled={r.handled}
                        onToggle={async (next) => {
                          "use server";
                          await toggleRegistrationHandled(r.id, next);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-neutral-500">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            {page > 1 && (
              <AdminButton href={`/admin/registrations?page=${page - 1}`} variant="secondary">
                Previous
              </AdminButton>
            )}
            {page < totalPages && (
              <AdminButton href={`/admin/registrations?page=${page + 1}`} variant="secondary">
                Next
              </AdminButton>
            )}
          </div>
        </div>
      )}
    </Shell>
  );
}
