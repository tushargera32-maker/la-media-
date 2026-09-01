"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState, type ReactNode } from "react";

/* ==================================================================
   ADMIN SHELL

   One persistent chrome for every admin screen, so the panel stops
   feeling like a pile of separate pages. Sidebar on desktop, slide-in
   drawer on mobile, same nav in both.

   Auth is enforced in middleware.ts, not here - this component only
   handles layout. The login screen renders bare (see below).
   ================================================================== */

type NavItem = { href: string; label: string; icon: string };
type NavGroup = { title: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    title: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: "▦" }],
  },
  {
    title: "Events",
    items: [
      { href: "/admin/events", label: "Events", icon: "◈" },
      { href: "/admin/registrations", label: "Registrations", icon: "◉" },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/blog", label: "Insights & articles", icon: "✎" },
      { href: "/admin/gallery", label: "Gallery", icon: "▧" },
    ],
  },
  {
    title: "Network",
    items: [
      { href: "/admin/partners", label: "Partners", icon: "◇" },
      { href: "/admin/collaborations", label: "Applications", icon: "⇄" },
    ],
  },
  {
    title: "Inbox",
    items: [
      { href: "/admin/contacts", label: "Enquiries", icon: "✉" },
      { href: "/admin/newsletter", label: "Newsletter", icon: "◎" },
    ],
  },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The login screen sits inside /admin but must not get the chrome -
  // showing a nav to someone who isn't signed in is nonsense.
  const bare = pathname?.startsWith("/admin/login");

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (bare) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#F4F3F1] text-[#1A1A1A]">
      {/* --- Mobile top bar --------------------------------------- */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-black/10 bg-white px-4 py-3 lg:hidden">
        <Brand compact />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="admin-nav"
          className="rounded border border-black/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
        >
          Menu
        </button>
      </div>

      {/* --- Mobile drawer ---------------------------------------- */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute inset-y-0 left-0 flex w-[280px] flex-col bg-white shadow-xl">
            <SidebarContent pathname={pathname} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:flex">
        {/* --- Desktop sidebar ------------------------------------ */}
        <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col border-r border-black/10 bg-white lg:flex">
          <SidebarContent pathname={pathname} />
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

/* ---- Brand lockup ------------------------------------------------
   Both firms appear deliberately. LA Media & Communications is the
   primary firm; Build Right Advisors is a platform inside that
   ecosystem, not a separate company, so it is nested beneath - never
   presented as a sibling brand.
   ------------------------------------------------------------------ */

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "" : "border-b border-black/10 px-5 py-5"}>
      <Link href="/admin" className="flex items-baseline gap-2.5">
        <span className="font-serif text-2xl leading-none tracking-tight">LA</span>
        <span className="text-[9px] font-semibold uppercase leading-[1.3] tracking-[0.12em] text-[#1A1A1A]">
          Media &amp;<br />Communications
        </span>
      </Link>

      {!compact && (
        <div className="mt-4 border-l-2 border-[#8C1D34] pl-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
            Ecosystem
          </p>
          <p className="mt-1 text-[12px] font-medium text-neutral-700">Build Right Advisors</p>
        </div>
      )}
    </div>
  );
}

function SidebarContent({
  pathname,
  onClose,
}: {
  pathname: string | null;
  onClose?: () => void;
}) {
  return (
    <>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Brand />
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="m-4 text-lg leading-none text-neutral-500"
          >
            ×
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {NAV.map((group) => (
          <div key={group.title} className="mb-6">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
              {group.title}
            </p>
            <ul className="mt-2 space-y-0.5">
              {group.items.map((item) => {
                // Exact match for the dashboard, prefix match elsewhere -
                // otherwise /admin stays highlighted on every single page.
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname?.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded px-3 py-2 text-[14px] transition-colors ${
                        active
                          ? "bg-[#8C1D34] text-white"
                          : "text-neutral-700 hover:bg-black/[0.04]"
                      }`}
                    >
                      <span aria-hidden className="w-4 text-center text-[13px] opacity-70">
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-black/10 p-4">
        <Link
          href="/"
          className="block rounded px-3 py-2 text-[13px] text-neutral-600 hover:bg-black/[0.04]"
        >
          ↗ View live site
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="mt-1 w-full rounded px-3 py-2 text-left text-[13px] text-neutral-600 hover:bg-black/[0.04]"
        >
          Sign out
        </button>
      </div>
    </>
  );
}
