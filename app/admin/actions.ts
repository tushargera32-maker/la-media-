"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/* ==================================================================
   ADMIN SERVER ACTIONS

   Server actions rather than API routes for these mutations: no fetch,
   no client state, no loading spinner, and the list re-renders from the
   database instead of from optimistic local state that can drift.

   IMPORTANT: middleware.ts does NOT protect server actions - they are
   POSTs to the page's own route, not to /api. Every action below must
   therefore check the session itself. Removing one of these checks makes
   the mutation publicly callable.
   ================================================================== */

async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

/* ---- Enquiries ---------------------------------------------------- */

export async function setContactStatus(id: string, status: string) {
  await requireSession();

  // Whitelist rather than trusting the submitted string.
  const allowed = ["new", "read", "replied", "archived"];
  if (!allowed.includes(status)) throw new Error("Invalid status");

  await prisma.contactSubmission.update({ where: { id }, data: { status } });
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

export async function deleteContact(id: string) {
  await requireSession();
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

/* ---- Registrations ------------------------------------------------ */

export async function toggleRegistrationHandled(id: string, handled: boolean) {
  await requireSession();
  await prisma.eventRegistration.update({ where: { id }, data: { handled } });
  revalidatePath("/admin/registrations");
  revalidatePath("/admin");
}

/* ---- Collaboration applications ----------------------------------- */

export async function setCollaborationStatus(id: string, status: string) {
  await requireSession();

  const allowed = ["pending", "reviewing", "accepted", "declined"];
  if (!allowed.includes(status)) throw new Error("Invalid status");

  await prisma.collaborationRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/collaborations");
  revalidatePath("/admin");
}

export async function deleteCollaboration(id: string) {
  await requireSession();
  await prisma.collaborationRequest.delete({ where: { id } });
  revalidatePath("/admin/collaborations");
  revalidatePath("/admin");
}

/* ---- Newsletter ---------------------------------------------------- */

export async function deleteSubscriber(id: string) {
  await requireSession();
  await prisma.newsletterSubscriber.delete({ where: { id } });
  revalidatePath("/admin/newsletter");
  revalidatePath("/admin");
}
