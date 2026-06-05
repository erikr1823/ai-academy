import { query } from "@/lib/db";
import { runWithSchemaLock } from "@/lib/schema-lock";
import type { Student } from "@/lib/types/student";

let studentsSchemaPromise: Promise<void> | null = null;

export async function ensureStudentsSchema(): Promise<void> {
  studentsSchemaPromise ??= runWithSchemaLock(async () => {
    await query(`
    CREATE TABLE IF NOT EXISTS students (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      clerk_id TEXT UNIQUE NOT NULL,
      email TEXT NOT NULL,
      first_name TEXT,
      last_name TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS students_clerk_id_idx ON students (clerk_id);
    CREATE INDEX IF NOT EXISTS students_email_idx ON students (email);
  `);
  });
  return studentsSchemaPromise;
}

type StudentRow = {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: Date;
};

function mapStudent(row: StudentRow): Student {
  return {
    id: row.id,
    clerk_id: row.clerk_id,
    email: row.email,
    first_name: row.first_name,
    last_name: row.last_name,
    created_at: row.created_at,
  };
}

export async function getStudentByClerkId(
  clerkId: string,
): Promise<Student | null> {
  await ensureStudentsSchema();

  const result = await query<StudentRow>(
    `SELECT id, clerk_id, email, first_name, last_name, created_at
     FROM students WHERE clerk_id = $1 LIMIT 1`,
    [clerkId],
  );

  return result.rows[0] ? mapStudent(result.rows[0]) : null;
}

export async function getOrCreateStudent(input: {
  clerkId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}): Promise<Student> {
  await ensureStudentsSchema();

  const existing = await getStudentByClerkId(input.clerkId);
  if (existing) {
    const needsUpdate =
      existing.email !== input.email ||
      (input.firstName && existing.first_name !== input.firstName) ||
      (input.lastName && existing.last_name !== input.lastName);

    if (needsUpdate) {
      const updated = await query<StudentRow>(
        `
        UPDATE students
        SET
          email = $2,
          first_name = COALESCE($3, first_name),
          last_name = COALESCE($4, last_name)
        WHERE clerk_id = $1
        RETURNING id, clerk_id, email, first_name, last_name, created_at
        `,
        [
          input.clerkId,
          input.email,
          input.firstName ?? null,
          input.lastName ?? null,
        ],
      );
      return mapStudent(updated.rows[0]);
    }

    return existing;
  }

  const inserted = await query<StudentRow>(
    `
    INSERT INTO students (clerk_id, email, first_name, last_name)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (clerk_id) DO UPDATE SET
      email = EXCLUDED.email,
      first_name = COALESCE(EXCLUDED.first_name, students.first_name),
      last_name = COALESCE(EXCLUDED.last_name, students.last_name)
    RETURNING id, clerk_id, email, first_name, last_name, created_at
    `,
    [
      input.clerkId,
      input.email,
      input.firstName ?? null,
      input.lastName ?? null,
    ],
  );

  return mapStudent(inserted.rows[0]);
}

export async function getStudentById(studentId: string): Promise<Student | null> {
  await ensureStudentsSchema();

  const result = await query<StudentRow>(
    `SELECT id, clerk_id, email, first_name, last_name, created_at
     FROM students WHERE id::text = $1 LIMIT 1`,
    [studentId],
  );

  return result.rows[0] ? mapStudent(result.rows[0]) : null;
}
