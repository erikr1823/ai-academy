import { NextRequest, NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/admin-auth";
import { createCourse, listAdminCourses } from "@/lib/admin-courses-db";
import type { CourseInput } from "@/lib/types/admin";

export async function GET() {
  const auth = await assertAdminApi();
  if (!auth.ok) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: auth.status },
    );
  }

  try {
    const courses = await listAdminCourses();
    return NextResponse.json({ success: true, courses });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load courses.";
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
    const body = (await request.json()) as CourseInput;
    if (!body.title?.trim() || !body.description?.trim()) {
      return NextResponse.json(
        { success: false, error: "Title and description are required." },
        { status: 400 },
      );
    }

    const result = await createCourse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create course.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
