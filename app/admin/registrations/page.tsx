import { prisma } from "@/lib/prisma";
import { Shell, PageHeader, TableWrap, Th, EmptyState, AdminButton } from "@/components/admin/ui";
import { HandledToggle } from "@/components/admin/RowActions";
import { toggleRegistrationHandled } from "@/app/admin/actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

/* ==================================================================
   ADMIN - REGISTRATIONS HUB
   Three types: Legacy (old EventRegistration), Architects, Sponsors
   ================================================================== */

export default async function AdminRegistrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; page?: string }>;
}) {
  const params = await searchParams;
  const type = params.type || "architects"; // default to architects
  const page = Math.max(1, Number(params.page ?? 1) || 1);
  const perPage = 25;

  // Fetch based on type
  let data: any[] = [];
  let total = 0;
  let columns: string[] = [];

  if (type === "architects") {
    [data, total] = await Promise.all([
      prisma.architectRegistration.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.architectRegistration.count(),
    ]);
    columns = ["Name", "Contact", "Firm", "Designation", "COA Number", "Received", "Handled"];
  } else if (type === "sponsors") {
    [data, total] = await Promise.all([
      prisma.sponsorRegistration.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.sponsorRegistration.count(),
    ]);
    columns = ["Company", "Contact Person", "Email/Phone", "GST", "Stall Size", "City", "Received", "Handled"];
  } else {
    [data, total] = await Promise.all([
      prisma.eventRegistration.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.eventRegistration.count(),
    ]);
    columns = ["Name", "Contact", "Firm", "COA/GST", "Received", "Handled"];
  }

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <Shell>
      <PageHeader
        title="Registrations"
        description={`${total} ${type} ${total === 1 ? "registration" : "registrations"}`}
      />

      {/* Tabs */}
      <div className="mt-6 flex gap-2 border-b border-neutral-200">
        {[
          { key: "architects", label: "Architects" },
          { key: "sponsors", label: "Sponsors" },
          { key: "legacy", label: "Legacy" },
        ].map((tab) => (
          <Link
            key={tab.key}
            href={`/admin/registrations?type=${tab.key}`}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              type === tab.key
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {data.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title={`No ${type} registrations yet`}
            body="Submissions will appear here once users register."
          />
        </div>
      ) : (
        <div className="mt-8">
          <TableWrap>
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="border-b border-black/10 bg-neutral-50">
                <tr>
                  {columns.map((h) => (
                    <Th key={h}>{h}</Th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {type === "architects" &&
                  (data as any[]).map((r) => (
                    <tr key={r.id} className="align-top hover:bg-neutral-50">
                      <td className="px-4 py-4">
                        <p className="font-medium">{`${r.firstName} ${r.lastName}`}</p>
                      </td>
                      <td className="px-4 py-4">
                        <a href={`mailto:${r.email}`} className="text-blue-700 hover:underline">
                          {r.email}
                        </a>
                        <p className="mt-1 text-neutral-600">{r.phone}</p>
                      </td>
                      <td className="px-4 py-4 text-neutral-700">{r.firmName}</td>
                      <td className="px-4 py-4 text-neutral-700">{r.designation}</td>
                      <td className="px-4 py-4 text-neutral-700">{r.coaNumber}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-neutral-500">
                        {r.createdAt.toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <span className={r.handled ? "text-green-600" : "text-neutral-400"}>
                          {r.handled ? "✓" : "○"}
                        </span>
                      </td>
                    </tr>
                  ))}

                {type === "sponsors" &&
                  (data as any[]).map((r) => (
                    <tr key={r.id} className="align-top hover:bg-neutral-50">
                      <td className="px-4 py-4">
                        <p className="font-medium">{r.companyName}</p>
                      </td>
                      <td className="px-4 py-4 text-neutral-700">{r.contactName}</td>
                      <td className="px-4 py-4">
                        <a href={`mailto:${r.email}`} className="text-blue-700 hover:underline">
                          {r.email}
                        </a>
                        <p className="mt-1 text-neutral-600">{r.phone}</p>
                      </td>
                      <td className="px-4 py-4 text-neutral-700">{r.gstNumber}</td>
                      <td className="px-4 py-4 text-neutral-700">{r.stallSize || "-"}</td>
                      <td className="px-4 py-4 text-neutral-700">{r.city}, {r.state}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-neutral-500">
                        {r.createdAt.toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <span className={r.handled ? "text-green-600" : "text-neutral-400"}>
                          {r.handled ? "✓" : "○"}
                        </span>
                      </td>
                    </tr>
                  ))}

                {type === "legacy" &&
                  (data as any[]).map((r) => (
                    <tr key={r.id} className="align-top hover:bg-neutral-50">
                      <td className="px-4 py-4">
                        <p className="font-medium">{`${r.firstName} ${r.lastName}`}</p>
                      </td>
                      <td className="px-4 py-4">
                        <a href={`mailto:${r.email}`} className="text-blue-700 hover:underline">
                          {r.email}
                        </a>
                        <p className="mt-1 text-neutral-600">{r.phone}</p>
                      </td>
                      <td className="px-4 py-4 text-neutral-700">{r.firmName ?? "-"}</td>
                      <td className="px-4 py-4 text-neutral-700">
                        {r.coaNumber || r.gstNumber || "-"}
                      </td>
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
          <span className="text-neutral-500">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <AdminButton
                href={`/admin/registrations?type=${type}&page=${page - 1}`}
                variant="secondary"
              >
                Previous
              </AdminButton>
            )}
            {page < totalPages && (
              <AdminButton
                href={`/admin/registrations?type=${type}&page=${page + 1}`}
                variant="secondary"
              >
                Next
              </AdminButton>
            )}
          </div>
        </div>
      )}
    </Shell>
  );
}
