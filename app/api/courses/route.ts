import { NextRequest, NextResponse } from "next/server";
import { getCoursesWithProgress } from "@/lib/courses-db";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    const courses = await getCoursesWithProgress(userId);

    return NextResponse.json({ success: true, courses });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load courses.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
