import { NextRequest, NextResponse } from "next/server";
import {
  getCourseById,
  getDashboardStats,
  markLessonComplete,
} from "@/lib/courses-db";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      userId?: string;
      lessonId?: string;
    };

    if (!body.userId || !body.lessonId) {
      return NextResponse.json(
        { success: false, error: "userId and lessonId are required." },
        { status: 400 },
      );
    }

    const result = await markLessonComplete(body.userId, body.lessonId);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save progress.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const courseId = request.nextUrl.searchParams.get("courseId");

    if (courseId) {
      const course = await getCourseById(courseId, userId);
      if (!course) {
        return NextResponse.json(
          { success: false, error: "Course not found." },
          { status: 404 },
        );
      }
      return NextResponse.json({
        success: true,
        progress_percent: course.progress_percent,
        completed_count: course.completed_count,
        lesson_count: course.lesson_count,
      });
    }

    const stats = await getDashboardStats(userId);
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load progress.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
