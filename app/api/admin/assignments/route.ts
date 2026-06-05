import { NextRequest, NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/admin-auth";
import {
  createAssignment,
  listAdminAssignments,
} from "@/lib/assignments-db";
import type { AssignmentInput } from "@/lib/types/assignments";

export async function GET() {
  const auth = await assertAdminApi();
  if (!auth.ok) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: auth.status },
    );
  }

  try {
    const assignments = await listAdminAssignments();
    return NextResponse.json({ success: true, assignments });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load assignments.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await assertAdminApi();
  if (!auth.ok) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: auth.status },
    );
  }

  try {
    const body = (await request.json()) as AssignmentInput;
    const result = await createAssignment(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create assignment.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
