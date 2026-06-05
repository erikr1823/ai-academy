import { randomBytes } from "crypto";
import { ensureCourseSchema } from "@/lib/courses-db";
import { query } from "@/lib/db";
import { runWithSchemaLock } from "@/lib/schema-lock";
import { ensureStudentsSchema } from "@/lib/students-db";
import type {
  AdminCertificateRow,
  Certificate,
  CertificateWithDetails,
  CourseCertificateStatus,
} from "@/lib/types/certificates";

let certificatesSchemaPromise: Promise<void> | null = null;

export async function ensureCertificatesSchema(): Promise<void> {
  certificatesSchemaPromise ??= runWithSchemaLock(async () => {
    await ensureCourseSchema();
    await ensureStudentsSchema();
    await query(`
      CREATE TABLE IF NOT EXISTS certificates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        certificate_code TEXT UNIQUE NOT NULL,
        issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE UNIQUE INDEX IF NOT EXISTS certificates_student_course_unique_idx
        ON certificates (student_id, course_id);
      CREATE INDEX IF NOT EXISTS certificates_student_id_idx ON certificates (student_id);
      CREATE INDEX IF NOT EXISTS certificates_course_id_idx ON certificates (course_id);
      CREATE INDEX IF NOT EXISTS certificates_code_idx ON certificates (certificate_code);
    `);
  });
  return certificatesSchemaPromise;
}

function calcProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

async function generateUniqueCertificateCode(): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const code = `AAC-${randomBytes(4).toString("hex").toUpperCase()}`;
    const existing = await query<{ id: string }>(
      "SELECT id FROM certificates WHERE certificate_code = $1",
      [code],
    );
    if (!existing.rows[0]) return code;
  }
  throw new Error("Failed to generate a unique certificate code.");
}

async function isCourseFullyComplete(
  studentId: string,
  courseId: string,
): Promise<boolean> {
  const result = await query<{ total: string; completed: string }>(
    `
    SELECT
      COUNT(l.id)::text AS total,
      COUNT(*) FILTER (WHERE up.completed = true)::text AS completed
    FROM lessons l
    LEFT JOIN user_progress up ON up.lesson_id = l.id AND up.user_id = $1
    WHERE l.course_id = $2
    `,
    [studentId, courseId],
  );

  const total = Number(result.rows[0]?.total ?? 0);
  const completed = Number(result.rows[0]?.completed ?? 0);
  return total > 0 && total === completed;
}

export async function tryIssueCertificateOnCourseComplete(
  studentId: string,
  courseId: string,
): Promise<{ issued: boolean; certificateId?: string }> {
  await ensureCertificatesSchema();

  const existing = await query<{ id: string }>(
    "SELECT id FROM certificates WHERE student_id = $1 AND course_id = $2",
    [studentId, courseId],
  );
  if (existing.rows[0]) {
    return { issued: false, certificateId: existing.rows[0].id };
  }

  const complete = await isCourseFullyComplete(studentId, courseId);
  if (!complete) return { issued: false };

  const courseResult = await query<{ title: string }>(
    "SELECT title FROM courses WHERE id = $1",
    [courseId],
  );
  const courseTitle = courseResult.rows[0]?.title;
  if (!courseTitle) return { issued: false };

  const code = await generateUniqueCertificateCode();
  const title = `${courseTitle} — Certificate of Completion`;

  const inserted = await query<{ id: string }>(
    `
    INSERT INTO certificates (student_id, course_id, title, certificate_code)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (student_id, course_id) DO NOTHING
    RETURNING id
    `,
    [studentId, courseId, title, code],
  );

  if (inserted.rows[0]) {
    return { issued: true, certificateId: inserted.rows[0].id };
  }

  const fallback = await query<{ id: string }>(
    "SELECT id FROM certificates WHERE student_id = $1 AND course_id = $2",
    [studentId, courseId],
  );

  return { issued: false, certificateId: fallback.rows[0]?.id };
}

export async function getStudentCertificateOverview(
  studentId: string,
): Promise<{
  earned: Certificate[];
  courses: CourseCertificateStatus[];
  earned_count: number;
}> {
  await ensureCertificatesSchema();

  const coursesResult = await query<{
    course_id: string;
    course_title: string;
    lesson_count: string;
    completed_count: string;
    certificate_id: string | null;
    certificate_title: string | null;
    certificate_code: string | null;
    issued_at: Date | null;
  }>(
    `
    SELECT
      c.id AS course_id,
      c.title AS course_title,
      COUNT(l.id)::text AS lesson_count,
      COUNT(*) FILTER (WHERE up.completed = true)::text AS completed_count,
      cert.id AS certificate_id,
      cert.title AS certificate_title,
      cert.certificate_code,
      cert.issued_at
    FROM courses c
    LEFT JOIN lessons l ON l.course_id = c.id
    LEFT JOIN user_progress up ON up.lesson_id = l.id AND up.user_id = $1
    LEFT JOIN certificates cert ON cert.course_id = c.id AND cert.student_id = $2::uuid
    GROUP BY c.id, cert.id
    ORDER BY c.created_at ASC
    `,
    [studentId, studentId],
  );

  const earned: Certificate[] = [];
  const courses: CourseCertificateStatus[] = [];

  for (const row of coursesResult.rows) {
    const lesson_count = Number(row.lesson_count ?? 0);
    const completed_count = Number(row.completed_count ?? 0);
    const progress_percent = calcProgress(completed_count, lesson_count);

    const certificate = row.certificate_id
      ? {
          id: row.certificate_id,
          student_id: studentId,
          course_id: row.course_id,
          title: row.certificate_title!,
          certificate_code: row.certificate_code!,
          issued_at: row.issued_at!,
        }
      : null;

    let status: CourseCertificateStatus["status"] = "locked";
    if (certificate) status = "earned";
    else if (progress_percent > 0) status = "in_progress";

    if (certificate) earned.push(certificate);

    courses.push({
      course_id: row.course_id,
      course_title: row.course_title,
      progress_percent,
      completed_count,
      lesson_count,
      certificate,
      status,
    });
  }

  return { earned, courses, earned_count: earned.length };
}

export async function getCertificateByIdForStudent(
  certificateId: string,
  studentId: string,
): Promise<CertificateWithDetails | null> {
  await ensureCertificatesSchema();

  const result = await query<CertificateWithDetails>(
    `
    SELECT
      cert.id,
      cert.student_id,
      cert.course_id,
      cert.title,
      cert.certificate_code,
      cert.issued_at,
      c.title AS course_title,
      COALESCE(
        NULLIF(TRIM(CONCAT(s.first_name, ' ', s.last_name)), ''),
        s.email
      ) AS student_name,
      s.email AS student_email
    FROM certificates cert
    JOIN courses c ON c.id = cert.course_id
    JOIN students s ON s.id = cert.student_id
    WHERE cert.id = $1 AND cert.student_id = $2
    `,
    [certificateId, studentId],
  );

  return result.rows[0] ?? null;
}

export async function countStudentCertificates(
  studentId: string,
): Promise<number> {
  await ensureCertificatesSchema();
  const result = await query<{ count: string }>(
    "SELECT COUNT(*)::text AS count FROM certificates WHERE student_id = $1",
    [studentId],
  );
  return Number(result.rows[0]?.count ?? 0);
}

export async function listAdminCertificates(): Promise<AdminCertificateRow[]> {
  await ensureCertificatesSchema();

  const result = await query<AdminCertificateRow>(
    `
    SELECT
      cert.id,
      cert.student_id,
      cert.course_id,
      cert.title,
      cert.certificate_code,
      cert.issued_at,
      COALESCE(
        NULLIF(TRIM(CONCAT(s.first_name, ' ', s.last_name)), ''),
        s.email
      ) AS student_name,
      s.email AS student_email,
      c.title AS course_title
    FROM certificates cert
    JOIN students s ON s.id = cert.student_id
    JOIN courses c ON c.id = cert.course_id
    ORDER BY cert.issued_at DESC
    `,
  );

  return result.rows;
}

export function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value,
  );
}
