import { query } from "@/lib/db";
import { runWithSchemaLock } from "@/lib/schema-lock";
import { getAuthenticatedStudentId } from "@/lib/student-auth";
import { parseLessonContent } from "@/lib/types/lesson-content";
import type { LessonContentBlock } from "@/lib/types/lesson-content";
import { COURSE_IDS, LESSON_IDS } from "@/lib/course-seed-ids";
import type {
  CourseDetail,
  CourseWithProgress,
  DashboardStats,
  LessonWithProgress,
} from "@/lib/types/courses";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

let courseSchemaPromise: Promise<void> | null = null;

export async function ensureCourseSchema(): Promise<void> {
  courseSchemaPromise ??= runWithSchemaLock(async () => {
    await query(`
    CREATE TABLE IF NOT EXISTS courses (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS lessons (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      video_url TEXT,
      lesson_order INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS user_progress (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id TEXT NOT NULL,
      lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
      completed BOOLEAN NOT NULL DEFAULT false,
      completed_at TIMESTAMPTZ,
      UNIQUE (user_id, lesson_id)
    );

    CREATE INDEX IF NOT EXISTS lessons_course_id_idx ON lessons (course_id);
    CREATE INDEX IF NOT EXISTS lessons_course_order_idx ON lessons (course_id, lesson_order);
    CREATE INDEX IF NOT EXISTS user_progress_user_id_idx ON user_progress (user_id);
    CREATE INDEX IF NOT EXISTS user_progress_lesson_id_idx ON user_progress (lesson_id);

    ALTER TABLE courses ADD COLUMN IF NOT EXISTS slug TEXT;
    ALTER TABLE courses ADD COLUMN IF NOT EXISTS track TEXT;
    ALTER TABLE lessons ADD COLUMN IF NOT EXISTS content JSONB DEFAULT '[]'::jsonb;
    CREATE UNIQUE INDEX IF NOT EXISTS courses_slug_unique_idx ON courses (slug) WHERE slug IS NOT NULL;
  `);
  });
  return courseSchemaPromise;
}

const SEED_COURSES = [
  {
    id: COURSE_IDS.essentials,
    title: "AI Essentials",
    description:
      "Master AI fundamentals for everyday work — prompts, productivity, and practical workflows.",
    difficulty: "Beginner",
    category: "Essentials",
    image_url:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    id: COURSE_IDS.builder,
    title: "AI Builder Academy",
    description:
      "Build and deploy AI agents, automate workflows, and ship production-ready tools.",
    difficulty: "Intermediate",
    category: "Builder",
    image_url:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
  },
] as const;

const SEED_LESSONS = [
  {
    id: LESSON_IDS.introToAi,
    course_id: COURSE_IDS.essentials,
    title: "Introduction to AI",
    description:
      "Understand what AI can do at work, how large language models behave, and where to start safely.",
    video_url: null,
    lesson_order: 1,
  },
  {
    id: LESSON_IDS.promptEngineering,
    course_id: COURSE_IDS.essentials,
    title: "Prompt Engineering",
    description:
      "Write clear, reusable prompts with role, context, format, and constraints for reliable output.",
    video_url: null,
    lesson_order: 2,
  },
  {
    id: LESSON_IDS.aiProductivity,
    course_id: COURSE_IDS.essentials,
    title: "AI Productivity",
    description:
      "Apply AI to email, summaries, and daily tasks while keeping quality and accuracy high.",
    video_url: null,
    lesson_order: 3,
  },
  {
    id: LESSON_IDS.aiAgents,
    course_id: COURSE_IDS.builder,
    title: "AI Agents",
    description:
      "Design agent goals, tools, and guardrails for autonomous task completion.",
    video_url: null,
    lesson_order: 1,
  },
  {
    id: LESSON_IDS.workflowAutomation,
    course_id: COURSE_IDS.builder,
    title: "Workflow Automation",
    description:
      "Chain AI steps into repeatable workflows that integrate with your team's tools.",
    video_url: null,
    lesson_order: 2,
  },
  {
    id: LESSON_IDS.deployingAiTools,
    course_id: COURSE_IDS.builder,
    title: "Deploying AI Tools",
    description:
      "Ship AI features with monitoring, fallbacks, and a production readiness checklist.",
    video_url: null,
    lesson_order: 3,
  },
] as const;

export async function seedCoursesIfEmpty(): Promise<{ seeded: boolean }> {
  await ensureCourseSchema();

  const existing = await query<{ count: string }>(
    "SELECT COUNT(*)::text AS count FROM courses",
  );

  if (Number(existing.rows[0]?.count ?? 0) > 0) {
    return { seeded: false };
  }

  for (const course of SEED_COURSES) {
    await query(
      `INSERT INTO courses (id, title, description, difficulty, category, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO NOTHING`,
      [
        course.id,
        course.title,
        course.description,
        course.difficulty,
        course.category,
        course.image_url,
      ],
    );
  }

  for (const lesson of SEED_LESSONS) {
    await query(
      `INSERT INTO lessons (id, course_id, title, description, video_url, lesson_order)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO NOTHING`,
      [
        lesson.id,
        lesson.course_id,
        lesson.title,
        lesson.description,
        lesson.video_url,
        lesson.lesson_order,
      ],
    );
  }

  return { seeded: true };
}

export async function getActiveUserId(
  userId?: string | null,
): Promise<string | null> {
  const authenticatedStudentId = await getAuthenticatedStudentId();
  if (authenticatedStudentId) return authenticatedStudentId;

  if (userId) {
    const student = await query<{ id: string }>(
      "SELECT id::text AS id FROM students WHERE id::text = $1 LIMIT 1",
      [userId],
    );
    if (student.rows[0]) return student.rows[0].id;

    const legacyUser = await query<{ id: string }>(
      "SELECT id::text AS id FROM users WHERE id::text = $1 LIMIT 1",
      [userId],
    );
    if (legacyUser.rows[0]) return legacyUser.rows[0].id;
  }

  return null;
}

function calcProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export async function getCoursesWithProgress(
  userId?: string | null,
): Promise<CourseWithProgress[]> {
  await seedCoursesIfEmpty();
  const activeUserId = await getActiveUserId(userId);

  const result = await query<CourseWithProgress>(
    `
    SELECT
      c.id,
      c.title,
      c.description,
      c.difficulty,
      c.category,
      c.image_url,
      c.created_at,
      COUNT(l.id)::int AS lesson_count,
      COUNT(l.id) FILTER (
        WHERE up.completed = true
      )::int AS completed_count,
      CASE
        WHEN COUNT(l.id) = 0 THEN 0
        ELSE ROUND(
          (COUNT(l.id) FILTER (WHERE up.completed = true)::numeric / COUNT(l.id)::numeric) * 100
        )::int
      END AS progress_percent
    FROM courses c
    LEFT JOIN lessons l ON l.course_id = c.id
    LEFT JOIN user_progress up ON up.lesson_id = l.id
      AND up.user_id = $1
    GROUP BY c.id
    ORDER BY c.created_at ASC
    `,
    [activeUserId],
  );

  return result.rows;
}

export async function getCourseById(
  courseId: string,
  userId?: string | null,
): Promise<CourseDetail | null> {
  await seedCoursesIfEmpty();
  const activeUserId = await getActiveUserId(userId);

  const courseResult = await query<{
    id: string;
    title: string;
    description: string;
    difficulty: string;
    category: string;
    image_url: string | null;
    created_at: Date;
  }>(
    `SELECT id, title, description, difficulty, category, image_url, created_at
     FROM courses WHERE id = $1`,
    [courseId],
  );

  const course = courseResult.rows[0];
  if (!course) return null;

  const lessonsResult = await query<LessonWithProgress>(
    `
    SELECT
      l.id,
      l.course_id,
      l.title,
      l.description,
      l.video_url,
      l.lesson_order,
      l.created_at,
      COALESCE(up.completed, false) AS completed,
      up.completed_at
    FROM lessons l
    LEFT JOIN user_progress up ON up.lesson_id = l.id
      AND up.user_id = $2
    WHERE l.course_id = $1
    ORDER BY l.lesson_order ASC
    `,
    [courseId, activeUserId],
  );

  const lessons = lessonsResult.rows;
  const lesson_count = lessons.length;
  const completed_count = lessons.filter((l) => l.completed).length;

  return {
    ...course,
    lessons,
    lesson_count,
    completed_count,
    progress_percent: calcProgress(completed_count, lesson_count),
  };
}

export async function getLessonById(
  courseId: string,
  lessonId: string,
  userId?: string | null,
): Promise<(LessonWithProgress & { course_title: string }) | null> {
  await seedCoursesIfEmpty();
  const activeUserId = await getActiveUserId(userId);

  const result = await query<
    LessonWithProgress & {
      course_title: string;
      content: LessonContentBlock[] | null;
    }
  >(
    `
    SELECT
      l.id,
      l.course_id,
      l.title,
      l.description,
      l.video_url,
      l.lesson_order,
      l.created_at,
      l.content,
      COALESCE(up.completed, false) AS completed,
      up.completed_at,
      c.title AS course_title
    FROM lessons l
    JOIN courses c ON c.id = l.course_id
    LEFT JOIN user_progress up ON up.lesson_id = l.id
      AND up.user_id = $3
    WHERE l.course_id = $1 AND l.id = $2
    `,
    [courseId, lessonId, activeUserId],
  );

  const row = result.rows[0];
  if (!row) return null;

  return {
    ...row,
    content: parseLessonContent(row.content),
  };
}

export async function markLessonComplete(
  userId: string,
  lessonId: string,
): Promise<{ success: boolean; error?: string }> {
  await ensureCourseSchema();

  if (!isUuid(lessonId)) {
    return { success: false, error: "Invalid lesson id." };
  }

  const userCheck = await query<{ id: string }>(
    `SELECT id::text AS id FROM students WHERE id::text = $1
     UNION ALL
     SELECT id::text AS id FROM users WHERE id::text = $1
     LIMIT 1`,
    [userId],
  );
  if (!userCheck.rows[0]) {
    return { success: false, error: "Student not found." };
  }

  const lessonCheck = await query<{ id: string }>(
    "SELECT id FROM lessons WHERE id = $1",
    [lessonId],
  );
  if (!lessonCheck.rows[0]) {
    return { success: false, error: "Lesson not found." };
  }

  await query(
    `
    INSERT INTO user_progress (user_id, lesson_id, completed, completed_at)
    VALUES ($1, $2, true, NOW())
    ON CONFLICT (user_id, lesson_id)
    DO UPDATE SET completed = true, completed_at = NOW()
    `,
    [userId, lessonId],
  );

  return { success: true };
}

export async function getDashboardStats(
  userId?: string | null,
): Promise<DashboardStats> {
  await seedCoursesIfEmpty();
  const activeUserId = await getActiveUserId(userId);

  if (!activeUserId) {
    const courseCount = await query<{ count: string }>(
      "SELECT COUNT(*)::text AS count FROM courses",
    );
    return {
      courses_enrolled: Number(courseCount.rows[0]?.count ?? 0),
      lessons_completed: 0,
      completion_percent: 0,
      current_track: null,
      user_name: null,
      first_name: null,
      last_name: null,
      email: null,
      created_at: null,
      certificates_earned: 0,
    };
  }

  const studentResult = await query<{
    first_name: string | null;
    last_name: string | null;
    email: string;
    created_at: Date;
  }>(
    `SELECT first_name, last_name, email, created_at
     FROM students WHERE id::text = $1`,
    [activeUserId],
  );
  const student = studentResult.rows[0];

  const legacyUserResult = student
    ? await query<{ track: string }>(
        "SELECT track FROM users WHERE email = $1 LIMIT 1",
        [student.email],
      )
    : { rows: [] as { track: string }[] };

  const progressResult = await query<{
    lessons_completed: string;
    total_lessons: string;
  }>(
    `
    SELECT
      COUNT(*) FILTER (WHERE up.completed = true)::text AS lessons_completed,
      COUNT(l.id)::text AS total_lessons
    FROM lessons l
    LEFT JOIN user_progress up ON up.lesson_id = l.id AND up.user_id = $1
    `,
    [activeUserId],
  );

  const courseCountResult = await query<{ count: string }>(
    "SELECT COUNT(*)::text AS count FROM courses",
  );

  const lessons_completed = Number(
    progressResult.rows[0]?.lessons_completed ?? 0,
  );
  const total_lessons = Number(progressResult.rows[0]?.total_lessons ?? 0);

  const track = legacyUserResult.rows[0]?.track;
  const trackLabel =
    track === "builder"
      ? "AI Builder Academy"
      : track === "essentials"
        ? "AI Essentials"
        : track ?? null;

  const fullName = [student?.first_name, student?.last_name]
    .filter(Boolean)
    .join(" ");

  const courses = await getCoursesWithProgress(activeUserId);
  const certificates_earned = courses.filter(
    (course) => course.progress_percent === 100,
  ).length;

  return {
    courses_enrolled: Number(courseCountResult.rows[0]?.count ?? 0),
    lessons_completed,
    completion_percent: calcProgress(lessons_completed, total_lessons),
    current_track: trackLabel,
    user_name: fullName || student?.email || null,
    first_name: student?.first_name ?? null,
    last_name: student?.last_name ?? null,
    email: student?.email ?? null,
    created_at: student?.created_at ?? null,
    certificates_earned,
  };
}

export async function getRecentCourses(
  userId?: string | null,
  limit = 4,
): Promise<CourseWithProgress[]> {
  const courses = await getCoursesWithProgress(userId);
  return courses.slice(0, limit);
}
