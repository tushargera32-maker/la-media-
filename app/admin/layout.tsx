import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin - LA Media & Communications",
  description:
    "Content and enquiry management for LA Media & Communications and Build Right Advisors.",
  robots: { index: false, follow: false },
};

/**
 * Every /admin screen gets the shell. The login page renders bare -
 * AdminShell checks the pathname and skips its own chrome there.
 * Auth itself is enforced in middleware.ts.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
