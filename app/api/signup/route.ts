import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { isUniqueViolation, validateSignupPayload } from "@/lib/signup-validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateSignupPayload(body);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { firstName, lastName, email, track } = validation.data;
    const name = `${firstName} ${lastName}`;

    const existing = await query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);

    if (existing.rowCount && existing.rowCount > 0) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 },
      );
    }

    await query(
      `INSERT INTO users (name, email, track, role, status, email_verified)
       VALUES ($1, $2, $3, 'student', 'pending', false)`,
      [name, email, track],
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 },
      );
    }

    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 },
    );
  }
}
