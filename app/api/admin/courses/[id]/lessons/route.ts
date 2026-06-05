import { NextRequest, NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/admin-auth";
import { createLesson } from "@/lib/admin-courses-db";
import type { LessonInput } from "@/lib/types/admin";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const auth = await assertAdminApi();
  if (!auth.ok) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: auth.status },
    );
  }

  try {
    const { id: courseId } = await context.params;
    const body = (await request.json()) as LessonInput;

    if (!body.title?.trim() || !body.description?.trim()) {
      return NextResponse.json(
        { success: false, error: "Title and description are required." },
        { status: 400 },
      );
    }

    const result = await createLesson(courseId, body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create lesson.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
