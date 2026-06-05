import { NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/admin-auth";
import { deleteAssignment } from "@/lib/assignments-db";

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await assertAdminApi();
  if (!auth.ok) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: auth.status },
    );
  }

  try {
    const { id } = await context.params;
    await deleteAssignment(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete assignment.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
