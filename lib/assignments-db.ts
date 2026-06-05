import { ensureCourseSchema } from "@/lib/courses-db";
import { query } from "@/lib/db";
import { runWithSchemaLock } from "@/lib/schema-lock";
import { ensureStudentsSchema } from "@/lib/students-db";
import type {
  AdminSubmissionRow,
  AssignmentInput,
  AssignmentWithCourse,
  StudentAssignmentRow,
  Submission,
  SubmissionReviewInput,
} from "@/lib/types/assignments";

let assignmentsSchemaPromise: Promise<void> | null = null;

export async function ensureAssignmentsSchema(): Promise<void> {
  assignmentsSchemaPromise ??= runWithSchemaLock(async () => {
    await ensureCourseSchema();
    await ensureStudentsSchema();
    await query(`
      CREATE TABLE IF NOT EXISTS assignments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
        lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
        title TEXT NOT NULL,
        instructions TEXT,
        due_date TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS submissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
        student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        response TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'submitted',
        feedback TEXT,
        grade TEXT,
        submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        reviewed_at TIMESTAMPTZ,
        UNIQUE (assignment_id, student_id)
      );

      CREATE INDEX IF NOT EXISTS assignments_course_id_idx ON assignments (course_id);
      CREATE INDEX IF NOT EXISTS assignments_lesson_id_idx ON assignments (lesson_id);
      CREATE INDEX IF NOT EXISTS submissions_assignment_id_idx ON submissions (assignment_id);
      CREATE INDEX IF NOT EXISTS submissions_student_id_idx ON submissions (student_id);
    `);
  });
  return assignmentsSchemaPromise;
}

export async function listAdminAssignments(): Promise<AssignmentWithCourse[]> {
  await ensureAssignmentsSchema();
  const result = await query<AssignmentWithCourse>(
    `
    SELECT
      a.id,
      a.course_id,
      a.lesson_id,
      a.title,
      a.instructions,
      a.due_date,
      a.created_at,
      c.title AS course_title,
      l.title AS lesson_title
    FROM assignments a
    JOIN courses c ON c.id = a.course_id
    LEFT JOIN lessons l ON l.id = a.lesson_id
    ORDER BY a.created_at DESC
    `,
  );
  return result.rows;
}

export async function createAssignment(
  input: AssignmentInput,
): Promise<{ success: boolean; id?: string; error?: string }> {
  await ensureAssignmentsSchema();

  if (!input.course_id?.trim() || !input.title?.trim()) {
    return { success: false, error: "Course and title are required." };
  }

  const result = await query<{ id: string }>(
    `
    INSERT INTO assignments (course_id, lesson_id, title, instructions, due_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
    `,
    [
      input.course_id,
      input.lesson_id?.trim() || null,
      input.title.trim(),
      input.instructions?.trim() || null,
      input.due_date ? new Date(input.due_date) : null,
    ],
  );

  return { success: true, id: result.rows[0]?.id };
}

export async function deleteAssignment(
  assignmentId: string,
): Promise<{ success: boolean }> {
  await ensureAssignmentsSchema();
  await query("DELETE FROM assignments WHERE id = $1", [assignmentId]);
  return { success: true };
}

export async function getAssignmentById(
  assignmentId: string,
): Promise<AssignmentWithCourse | null> {
  await ensureAssignmentsSchema();
  const result = await query<AssignmentWithCourse>(
    `
    SELECT
      a.id,
      a.course_id,
      a.lesson_id,
      a.title,
      a.instructions,
      a.due_date,
      a.created_at,
      c.title AS course_title,
      l.title AS lesson_title
    FROM assignments a
    JOIN courses c ON c.id = a.course_id
    LEFT JOIN lessons l ON l.id = a.lesson_id
    WHERE a.id = $1
    `,
    [assignmentId],
  );
  return result.rows[0] ?? null;
}

export async function listStudentAssignments(
  studentId: string,
): Promise<StudentAssignmentRow[]> {
  await ensureAssignmentsSchema();
  const result = await query<StudentAssignmentRow>(
    `
    SELECT
      a.id,
      a.course_id,
      a.lesson_id,
      a.title,
      a.instructions,
      a.due_date,
      a.created_at,
      c.title AS course_title,
      l.title AS lesson_title,
      s.status AS submission_status,
      s.submitted_at
    FROM assignments a
    JOIN courses c ON c.id = a.course_id
    LEFT JOIN lessons l ON l.id = a.lesson_id
    LEFT JOIN submissions s ON s.assignment_id = a.id AND s.student_id = $1
    ORDER BY a.due_date ASC NULLS LAST, a.created_at DESC
    `,
    [studentId],
  );
  return result.rows;
}

export async function getStudentSubmission(
  assignmentId: string,
  studentId: string,
): Promise<Submission | null> {
  await ensureAssignmentsSchema();
  const result = await query<Submission>(
    `
    SELECT id, assignment_id, student_id, response, status, feedback, grade,
           submitted_at, reviewed_at
    FROM submissions
    WHERE assignment_id = $1 AND student_id = $2
    `,
    [assignmentId, studentId],
  );
  return result.rows[0] ?? null;
}

export async function getAssignmentForStudent(
  assignmentId: string,
  studentId: string,
): Promise<{
  assignment: AssignmentWithCourse;
  submission: Submission | null;
} | null> {
  const assignment = await getAssignmentById(assignmentId);
  if (!assignment) return null;

  const submission = await getStudentSubmission(assignmentId, studentId);
  return { assignment, submission };
}

export async function submitAssignment(
  assignmentId: string,
  studentId: string,
  response: string,
): Promise<{ success: boolean; error?: string }> {
  await ensureAssignmentsSchema();

  if (!response.trim()) {
    return { success: false, error: "Response is required." };
  }

  const existing = await getStudentSubmission(assignmentId, studentId);
  if (existing) {
    return { success: false, error: "You have already submitted this assignment." };
  }

  await query(
    `
    INSERT INTO submissions (assignment_id, student_id, response)
    VALUES ($1, $2, $3)
    `,
    [assignmentId, studentId, response.trim()],
  );

  return { success: true };
}

export async function listAdminSubmissions(): Promise<AdminSubmissionRow[]> {
  await ensureAssignmentsSchema();
  const result = await query<AdminSubmissionRow>(
    `
    SELECT
      s.id,
      s.assignment_id,
      s.student_id,
      s.response,
      s.status,
      s.feedback,
      s.grade,
      s.submitted_at,
      s.reviewed_at,
      COALESCE(
        NULLIF(TRIM(CONCAT(st.first_name, ' ', st.last_name)), ''),
        st.email
      ) AS student_name,
      st.email AS student_email,
      a.title AS assignment_title,
      c.title AS course_title
    FROM submissions s
    JOIN students st ON st.id = s.student_id
    JOIN assignments a ON a.id = s.assignment_id
    JOIN courses c ON c.id = a.course_id
    ORDER BY s.submitted_at DESC
    `,
  );
  return result.rows;
}

export async function updateSubmissionReview(
  submissionId: string,
  input: SubmissionReviewInput,
): Promise<{ success: boolean; error?: string }> {
  await ensureAssignmentsSchema();

  await query(
    `
    UPDATE submissions
    SET feedback = $2,
        grade = $3,
        status = COALESCE($4, status),
        reviewed_at = NOW()
    WHERE id = $1
    `,
    [
      submissionId,
      input.feedback?.trim() || null,
      input.grade?.trim() || null,
      input.status?.trim() || "reviewed",
    ],
  );

  return { success: true };
}

export function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value,
  );
}
