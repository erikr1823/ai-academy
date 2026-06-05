import { NextRequest, NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/admin-auth";
import { updateSubmissionReview } from "@/lib/assignments-db";
import type { SubmissionReviewInput } from "@/lib/types/assignments";

type RouteContext = { params: Promise<{ id: string }> };

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
    const body = (await request.json()) as SubmissionReviewInput;
    const result = await updateSubmissionReview(id, body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save review.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
