import { NextRequest, NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/admin-auth";
import {
  deleteCourse,
  getAdminCourseById,
  getAdminLessonsByCourse,
  updateCourse,
} from "@/lib/admin-courses-db";
import type { CourseInput } from "@/lib/types/admin";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const auth = await assertAdminApi();
  if (!auth.ok) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: auth.status },
    );
  }

  try {
    const { id } = await context.params;
    const [course, lessons] = await Promise.all([
      getAdminCourseById(id),
      getAdminLessonsByCourse(id),
    ]);

    if (!course) {
      return NextResponse.json(
        { success: false, error: "Course not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, course, lessons });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load course.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

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
    const body = (await request.json()) as CourseInput;
    const result = await updateCourse(id, body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update course.";
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
    await deleteCourse(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete course.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
