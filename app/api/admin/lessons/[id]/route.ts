import { NextRequest, NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/admin-auth";
import { deleteLesson, updateLesson } from "@/lib/admin-courses-db";
import type { LessonInput } from "@/lib/types/admin";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = await assertAdminApi();
  if (!auth.ok) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: auth.status },
    );
  }

  try {
    const { id } = await context.params;
    const body = (await request.json()) as LessonInput;
    const result = await updateLesson(id, body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update lesson.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const auth = await assertAdminApi();
  if (!auth.ok) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: auth.status },
    );
  }

  try {
    const { id } = await context.params;
    await deleteLesson(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete lesson.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
