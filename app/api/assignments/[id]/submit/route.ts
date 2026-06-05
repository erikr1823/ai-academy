import { NextRequest, NextResponse } from "next/server";
import { submitAssignment } from "@/lib/assignments-db";
import { getAuthenticatedStudentId } from "@/lib/student-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const studentId = await getAuthenticatedStudentId();
    if (!studentId) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 },
      );
    }

    const { id: assignmentId } = await context.params;
    const body = (await request.json()) as { response?: string };

    if (!body.response?.trim()) {
      return NextResponse.json(
        { success: false, error: "Response is required." },
        { status: 400 },
      );
    }

    const result = await submitAssignment(
      assignmentId,
      studentId,
      body.response,
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to submit assignment.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
