import { NextRequest, NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/admin-auth";
import { reorderLessons } from "@/lib/admin-courses-db";

export async function POST(request: NextRequest) {
  const auth = await assertAdminApi();
  if (!auth.ok) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: auth.status },
    );
  }

  try {
    const body = (await request.json()) as {
      courseId?: string;
      orderedLessonIds?: string[];
    };

    if (!body.courseId || !Array.isArray(body.orderedLessonIds)) {
      return NextResponse.json(
        { success: false, error: "courseId and orderedLessonIds are required." },
        { status: 400 },
      );
    }

    await reorderLessons(body.courseId, body.orderedLessonIds);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to reorder lessons.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
