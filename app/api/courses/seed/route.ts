import { NextResponse } from "next/server";
import { seedCoursesIfEmpty } from "@/lib/courses-db";

export async function POST() {
  try {
    const result = await seedCoursesIfEmpty();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to seed courses.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
