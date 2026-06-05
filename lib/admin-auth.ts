import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-db";

export async function requireAdmin(): Promise<string> {
  const { userId } = await auth();
  if (!userId || !(await isAdmin(userId))) {
    redirect("/dashboard");
  }
  return userId;
}

export async function assertAdminApi(): Promise<
  { ok: true; clerkId: string } | { ok: false; status: number; error: string }
> {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false, status: 401, error: "Authentication required." };
  }
  if (!(await isAdmin(userId))) {
    return { ok: false, status: 403, error: "Admin access required." };
  }
  return { ok: true, clerkId: userId };
}
