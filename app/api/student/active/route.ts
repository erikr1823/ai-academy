import { NextRequest, NextResponse } from "next/server";
import { getActiveUserId } from "@/lib/courses-db";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const activeUserId = await getActiveUserId(userId);

    return NextResponse.json({
      success: true,
      userId: activeUserId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to resolve active user.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
