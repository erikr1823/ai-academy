import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import {
  getCourseById,
  getDashboardStats,
  getActiveUserId,
  markLessonComplete,
} from "@/lib/courses-db";

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 },
      );
    }

    const body = (await request.json()) as {
      lessonId?: string;
    };

    if (!body.lessonId) {
      return NextResponse.json(
        { success: false, error: "lessonId is required." },
        { status: 400 },
      );
    }

    const studentId = await getActiveUserId();
    if (!studentId) {
      return NextResponse.json(
        { success: false, error: "Student record not found." },
        { status: 404 },
      );
    }

    const result = await markLessonComplete(studentId, body.lessonId);

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
