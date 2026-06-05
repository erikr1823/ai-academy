import { auth, currentUser } from "@clerk/nextjs/server";
import { getOrCreateStudent } from "@/lib/students-db";
import type { Student } from "@/lib/types/student";

export async function getAuthenticatedStudent(): Promise<Student | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  if (!user) return null;

  const email =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress;

  if (!email) return null;

  return getOrCreateStudent({
    clerkId: userId,
    email,
    firstName: user.firstName,
    lastName: user.lastName,
  });
}

export async function getAuthenticatedStudentId(): Promise<string | null> {
  const student = await getAuthenticatedStudent();
  return student?.id ?? null;
}
