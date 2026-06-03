import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query<{ now: string }>("SELECT NOW() as now");
    const now = result.rows[0]?.now;

    return NextResponse.json({
      success: true,
      now,
    });
  } catch (error) {
    console.error("Database test error:", error);

    const message =
      error instanceof Error ? error.message : "Database connection failed";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
