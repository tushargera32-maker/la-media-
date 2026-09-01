import { prisma } from "@/lib/prisma";
import { Shell, PageHeader, Stat, Panel, EmptyState, AdminButton, Badge } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

/* ==================================================================
   DASHBOARD

   Server component reading Prisma directly. The previous version was a
   client component with hardcoded quick-action tiles and no real counts,
   so it told you nothing about the state of the site.

   Every number here is live, and every tile links to the screen where
   you can act on it.
   ================================================================== */

export default async function AdminDashboard() {
  const [
    events,
    publishedEvents,
    registrations,
    newRegistrations,
    posts,
    publishedPosts,
    gallery,
    partners,
    applications,
    enquiries,
    newEnquiries,
    subscribers,
    recentRegistrations,
    recentEnquiries,
  ] = await Promise.all([
    prisma.event.count(),
    prisma.event.count({ where: { published: true } }),
    prisma.eventRegistration.count(),
    prisma.eventRegistration.count({ where: { handled: false } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.galleryImage.count(),
    prisma.partner.count(),
    prisma.collaborationRequest.count(),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.newsletterSubscriber.count(),
    prisma.eventRegistration.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const date = (d: Date) =>
    d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

  return (
    <Shell>
      <PageHeader
        title="Dashboard"
        description="LA Media & Communications - including the Build Right Advisors platform."
        action={<AdminButton href="/admin/events/new">New event</AdminButton>}
      />

      {/* --- Needs attention ---------------------------------------
          Surfaced first and separately: these are the two numbers that
          represent a person waiting for a reply. */}
      <section className="mt-8">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
          Needs attention
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Stat
            label="New registrations"
            value={newRegistrations}
            href="/admin/registrations"
            hint={newRegistrations === 0 ? "All caught up" : "Unprocessed sign-ups"}
          />
          <Stat
            label="New enquiries"
            value={newEnquiries}
            href="/admin/contacts"
            hint={newEnquiries === 0 ? "All caught up" : "Awaiting a reply"}
          />
        </div>
      </section>

      {/* --- Everything else ---------------------------------------- */}
      <section className="mt-10">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
          Across the site
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Events" value={events} href="/admin/events" hint={`${publishedEvents} published`} />
          <Stat label="Registrations" value={registrations} href="/admin/registrations" hint="All time" />
          <Stat label="Articles" value={posts} href="/admin/blog" hint={`${publishedPosts} published`} />
          <Stat label="Gallery images" value={gallery} href="/admin/gallery" />
          <Stat label="Partners" value={partners} href="/admin/partners" />
          <Stat label="Applications" value={applications} href="/admin/collaborations" hint="Brand & architect" />
          <Stat label="Enquiries" value={enquiries} href="/admin/contacts" hint="All time" />
          <Stat label="Subscribers" value={subscribers} href="/admin/newsletter" />
        </div>
      </section>

      {/* --- Recent activity ---------------------------------------- */}
      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
            Latest registrations
          </h2>
          <div className="mt-3">
            {recentRegistrations.length === 0 ? (
              <EmptyState
                title="No registrations yet"
                body="Sign-ups from the public registration page will appear here."
              />
            ) : (
              <Panel>
                <ul className="divide-y divide-black/5">
                  {recentRegistrations.map((r) => (
                    <li key={r.id} className="flex items-start justify-between gap-4 px-5 py-4">
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-medium">{r.fullName}</p>
                        <p className="mt-0.5 truncate text-[13px] text-neutral-500">
                          {r.profile} &middot; {r.city}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-[12px] text-neutral-400">{date(r.createdAt)}</p>
                        {!r.handled && <Badge tone="accent">New</Badge>}
                      </div>
                    </li>
                  ))}
                </ul>
              </Panel>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
            Latest enquiries
          </h2>
          <div className="mt-3">
            {recentEnquiries.length === 0 ? (
              <EmptyState
                title="No enquiries yet"
                body="Messages from the contact and partner forms will appear here."
              />
            ) : (
              <Panel>
                <ul className="divide-y divide-black/5">
                  {recentEnquiries.map((c) => (
                    <li key={c.id} className="flex items-start justify-between gap-4 px-5 py-4">
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-medium">{c.name}</p>
                        <p className="mt-0.5 truncate text-[13px] text-neutral-500">{c.email}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-[12px] text-neutral-400">{date(c.createdAt)}</p>
                        {c.status === "new" && <Badge tone="accent">New</Badge>}
                      </div>
                    </li>
                  ))}
                </ul>
              </Panel>
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
}
