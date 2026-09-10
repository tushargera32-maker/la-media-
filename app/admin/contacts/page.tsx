import { prisma } from "@/lib/prisma";
import { Shell, PageHeader, TableWrap, Th, EmptyState } from "@/components/admin/ui";
import { StatusSelect, DeleteButton } from "@/components/admin/RowActions";
import { setContactStatus, deleteContact } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "read", "replied", "archived"];

/*
  Server component. The previous version was a client component that
  fetched on mount and held a copy of the list in state - which meant a
  spinner on every visit and a second source of truth to drift.
*/
export default async function AdminContactsPage() {
  let submissions: Awaited<ReturnType<typeof prisma.contactSubmission.findMany>> = [];
  try {
    submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Admin contacts: failed to fetch submissions:", error);
    submissions = [];
  }

  const unread = submissions.filter((s) => s.status === "new").length;

  return (
    <Shell>
      <PageHeader
        title="Enquiries"
        description={
          submissions.length === 0
            ? "Messages from the contact form"
            : `${submissions.length} total · ${unread} unread`
        }
      />

      {submissions.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No enquiries yet"
            body="Messages sent through the contact form will appear here."
          />
        </div>
      ) : (
        <div className="mt-8">
          <TableWrap>
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-black/10 bg-neutral-50">
                <tr>
                  <Th>From</Th>
                  <Th>Message</Th>
                  <Th>Status</Th>
                  <Th>Received</Th>
                  <Th>&nbsp;</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {submissions.map((item) => (
                  <tr key={item.id} className="align-top hover:bg-neutral-50/60">
                    <td className="px-4 py-4">
                      <p className="font-medium">{item.name}</p>
                      <a href={`mailto:${item.email}`} className="text-[13px] text-[#8C1D34] hover:underline">
                        {item.email}
                      </a>
                      {item.phone && <p className="mt-0.5 text-[13px] text-neutral-500">{item.phone}</p>}
                      {item.company && <p className="mt-0.5 text-[13px] text-neutral-500">{item.company}</p>}
                    </td>
                    <td className="max-w-[420px] px-4 py-4 text-[13px] text-neutral-700">
                      {item.message}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <StatusSelect
                        value={item.status}
                        options={STATUSES}
                        onChange={async (next) => {
                          "use server";
                          await setContactStatus(item.id, next);
                        }}
                      />
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-[13px] text-neutral-500">
                      {item.createdAt.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <DeleteButton
                        confirmText={`Delete the enquiry from ${item.name}? This cannot be undone.`}
                        onDelete={async () => {
                          "use server";
                          await deleteContact(item.id);
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
    </Shell>
  );
}
