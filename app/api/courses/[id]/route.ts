import { NextRequest, NextResponse } from "next/server";
import { getCourseById } from "@/lib/courses-db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const userId = request.nextUrl.searchParams.get("userId");

    const course = await getCourseById(id, userId);

    if (!course) {
      return NextResponse.json(
        { success: false, error: "Course not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, course });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load course.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
