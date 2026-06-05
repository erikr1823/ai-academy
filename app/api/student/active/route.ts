import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getActiveUserId } from "@/lib/courses-db";
import { getAuthenticatedStudent } from "@/lib/student-auth";

export async function GET() {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 },
      );
    }

    const student = await getAuthenticatedStudent();
    const activeUserId = await getActiveUserId(student?.id);

    return NextResponse.json({
      success: true,
      userId: activeUserId,
      student,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to resolve active user.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
