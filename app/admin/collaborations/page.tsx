import { prisma } from "@/lib/prisma";
import { Shell, PageHeader, TableWrap, Th, EmptyState, Badge } from "@/components/admin/ui";
import { StatusSelect, DeleteButton } from "@/components/admin/RowActions";
import { setCollaborationStatus, deleteCollaboration } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

// Matches the schema default of "pending" - not "new".
const STATUSES = ["pending", "reviewing", "accepted", "declined"];

/** Applications from the Partner With Us page: brands and architects. */
export default async function AdminCollaborationsPage() {
  const requests = await prisma.collaborationRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const brands = requests.filter((r) => r.type === "brand").length;
  const architects = requests.filter((r) => r.type === "architect").length;

  return (
    <Shell>
      <PageHeader
        title="Applications"
        description={
          requests.length === 0
            ? "Brand and architect applications"
            : `${requests.length} total · ${brands} brand · ${architects} architect`
        }
      />

      {requests.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No applications yet"
            body="Submissions from the Partner With Us page will appear here."
          />
        </div>
      ) : (
        <div className="mt-8">
          <TableWrap>
            <table className="w-full min-w-[940px] text-left text-sm">
              <thead className="border-b border-black/10 bg-neutral-50">
                <tr>
                  <Th>Applicant</Th>
                  <Th>Type</Th>
                  <Th>Message</Th>
                  <Th>Status</Th>
                  <Th>Received</Th>
                  <Th>&nbsp;</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {requests.map((item) => (
                  <tr key={item.id} className="align-top hover:bg-neutral-50/60">
                    <td className="px-4 py-4">
                      <p className="font-medium">{item.name}</p>
                      <a href={`mailto:${item.email}`} className="text-[13px] text-[#8C1D34] hover:underline">
                        {item.email}
                      </a>
                      {item.phone && <p className="mt-0.5 text-[13px] text-neutral-500">{item.phone}</p>}
                      {item.company && <p className="mt-0.5 text-[13px] text-neutral-500">{item.company}</p>}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <Badge tone={item.type === "brand" ? "accent" : "neutral"}>
                        {item.type}
                      </Badge>
                    </td>
                    <td className="max-w-[360px] px-4 py-4 text-[13px] text-neutral-700">
                      {item.message}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <StatusSelect
                        value={item.status}
                        options={STATUSES}
                        onChange={async (next) => {
                          "use server";
                          await setCollaborationStatus(item.id, next);
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
                        confirmText={`Delete the application from ${item.name}? This cannot be undone.`}
                        onDelete={async () => {
                          "use server";
                          await deleteCollaboration(item.id);
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
