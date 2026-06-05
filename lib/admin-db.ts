import { query } from "@/lib/db";
import { runWithSchemaLock } from "@/lib/schema-lock";
import { ensureCourseSchema } from "@/lib/courses-db";
import { ensureStudentsSchema } from "@/lib/students-db";
import type {
  AdminAnalytics,
  AdminDashboardStats,
  AdminStudentRow,
} from "@/lib/types/admin";

let adminSchemaPromise: Promise<void> | null = null;

export async function ensureAdminSchema(): Promise<void> {
  adminSchemaPromise ??= runWithSchemaLock(async () => {
    await query(`
    CREATE TABLE IF NOT EXISTS admins (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      clerk_id TEXT UNIQUE NOT NULL,
      email TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS admins_clerk_id_idx ON admins (clerk_id);
  `);
  });
  return adminSchemaPromise;
}

export async function ensureCourseBuilderSchema(): Promise<void> {
  await ensureCourseSchema();
}

export async function isAdmin(clerkId: string): Promise<boolean> {
  await ensureAdminSchema();
  const result = await query<{ exists: boolean }>(
    `SELECT EXISTS(SELECT 1 FROM admins WHERE clerk_id = $1) AS exists`,
    [clerkId],
  );
  return result.rows[0]?.exists ?? false;
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  await ensureAdminSchema();
  await ensureStudentsSchema();
  await ensureCourseBuilderSchema();

  const [students, courses, lessons, progress, recent] = await Promise.all([
    query<{ count: string }>("SELECT COUNT(*)::text AS count FROM students"),
    query<{ count: string }>("SELECT COUNT(*)::text AS count FROM courses"),
    query<{ count: string }>("SELECT COUNT(*)::text AS count FROM lessons"),
    query<{ count: string }>(
      "SELECT COUNT(*)::text AS count FROM user_progress",
    ),
    query<{
      id: string;
      email: string;
      first_name: string | null;
      last_name: string | null;
      created_at: Date;
    }>(
      `SELECT id, email, first_name, last_name, created_at
       FROM students ORDER BY created_at DESC LIMIT 8`,
    ),
  ]);

  return {
    total_students: Number(students.rows[0]?.count ?? 0),
    total_courses: Number(courses.rows[0]?.count ?? 0),
    total_lessons: Number(lessons.rows[0]?.count ?? 0),
    total_progress_records: Number(progress.rows[0]?.count ?? 0),
    recent_signups: recent.rows,
  };
}

function calcPercent(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export async function getAdminStudents(
  search?: string,
): Promise<AdminStudentRow[]> {
  await ensureStudentsSchema();
  await ensureCourseBuilderSchema();

  const courseCount = await query<{ count: string }>(
    "SELECT COUNT(*)::text AS count FROM courses",
  );
  const totalCourses = Number(courseCount.rows[0]?.count ?? 0);
  const totalLessonsResult = await query<{ count: string }>(
    "SELECT COUNT(*)::text AS count FROM lessons",
  );
  const totalLessons = Number(totalLessonsResult.rows[0]?.count ?? 0);

  const searchTerm = search?.trim() ? `%${search.trim()}%` : null;

  const students = await query<{
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    created_at: Date;
    lessons_completed: string;
  }>(
    `
    SELECT
      s.id,
      s.email,
      s.first_name,
      s.last_name,
      s.created_at,
      COUNT(*) FILTER (WHERE up.completed = true)::text AS lessons_completed
    FROM students s
    LEFT JOIN user_progress up ON up.user_id = s.id::text
    WHERE (
      $1::text IS NULL OR
      s.email ILIKE $1 OR
      s.first_name ILIKE $1 OR
      s.last_name ILIKE $1 OR
      CONCAT(s.first_name, ' ', s.last_name) ILIKE $1
    )
    GROUP BY s.id
    ORDER BY s.created_at DESC
    `,
    [searchTerm],
  );

  return students.rows.map((row) => {
    const lessons_completed = Number(row.lessons_completed ?? 0);
    const full_name =
      [row.first_name, row.last_name].filter(Boolean).join(" ") || row.email;

    return {
      id: row.id,
      email: row.email,
      first_name: row.first_name,
      last_name: row.last_name,
      full_name,
      created_at: row.created_at,
      lessons_completed,
      progress_percent: calcPercent(lessons_completed, totalLessons),
      courses_enrolled: totalCourses,
    };
  });
}

export async function getAdminAnalytics(): Promise<AdminAnalytics> {
  await ensureStudentsSchema();
  await ensureCourseBuilderSchema();

  const totalUsers = await query<{ count: string }>(
    "SELECT COUNT(*)::text AS count FROM students",
  );

  const activeUsers = await query<{ count: string }>(
    `
    SELECT COUNT(DISTINCT user_id)::text AS count
    FROM user_progress
    WHERE completed = true
    `,
  );

  const courseRates = await query<{
    course_id: string;
    title: string;
    progress_count: string;
    completed_count: string;
    student_count: string;
  }>(
    `
    SELECT
      c.id AS course_id,
      c.title,
      COUNT(up.id)::text AS progress_count,
      COUNT(*) FILTER (WHERE up.completed = true)::text AS completed_count,
      (SELECT COUNT(*)::text FROM students) AS student_count
    FROM courses c
    LEFT JOIN lessons l ON l.course_id = c.id
    LEFT JOIN user_progress up ON up.lesson_id = l.id
    GROUP BY c.id
    ORDER BY COUNT(up.id) DESC
    `,
  );

  const course_completion_rates = courseRates.rows.map((row) => {
    const students = Number(row.student_count ?? 0);
    const completed = Number(row.completed_count ?? 0);
    const lessonProgress = Number(row.progress_count ?? 0);
    const rate =
      students > 0
        ? Math.round((completed / Math.max(students, 1)) * 100) / 100
        : 0;

    return {
      course_id: row.course_id,
      title: row.title,
      completion_rate: Math.min(
        100,
        lessonProgress > 0
          ? Math.round((completed / lessonProgress) * 100)
          : rate,
      ),
      enrolled_students: students,
    };
  });

  const top = courseRates.rows[0];

  return {
    total_users: Number(totalUsers.rows[0]?.count ?? 0),
    active_users: Number(activeUsers.rows[0]?.count ?? 0),
    course_completion_rates,
    most_popular_course: top
      ? {
          course_id: top.course_id,
          title: top.title,
          progress_count: Number(top.progress_count ?? 0),
        }
      : null,
  };
}
