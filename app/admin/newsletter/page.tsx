import { prisma } from "@/lib/prisma";
import { Shell, PageHeader, TableWrap, Th, EmptyState, Badge, AdminButton } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/RowActions";
import { deleteSubscriber } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  const active = subscribers.filter((s) => s.status === "active").length;

  return (
    <Shell>
      <PageHeader
        title="Newsletter"
        description={
          subscribers.length === 0
            ? "Mailing list subscribers"
            : `${subscribers.length} total · ${active} active`
        }
        action={
          subscribers.length > 0 ? (
            <AdminButton href="/api/newsletter/export" variant="secondary">
              Export CSV
            </AdminButton>
          ) : undefined
        }
      />

      {subscribers.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No subscribers yet"
            body="Sign-ups from the newsletter form will appear here."
          />
        </div>
      ) : (
        <div className="mt-8">
          <TableWrap>
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-b border-black/10 bg-neutral-50">
                <tr>
                  <Th>Email</Th>
                  <Th>Status</Th>
                  <Th>Subscribed</Th>
                  <Th>&nbsp;</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {subscribers.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/60">
                    <td className="px-4 py-3.5">
                      <a href={`mailto:${item.email}`} className="text-[#8C1D34] hover:underline">
                        {item.email}
                      </a>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge tone={item.status === "active" ? "success" : "neutral"}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-[13px] text-neutral-500">
                      {item.createdAt.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5">
                      <DeleteButton
                        label="Remove"
                        confirmText={`Remove ${item.email} from the list?`}
                        onDelete={async () => {
                          "use server";
                          await deleteSubscriber(item.id);
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
