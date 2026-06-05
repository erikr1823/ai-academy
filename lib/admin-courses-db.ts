import { query } from "@/lib/db";
import { ensureCourseBuilderSchema } from "@/lib/admin-db";
import {
  parseLessonContent,
  type LessonContentBlock,
} from "@/lib/types/lesson-content";
import type {
  AdminCourse,
  AdminLesson,
  CourseInput,
  LessonInput,
} from "@/lib/types/admin";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function listAdminCourses(): Promise<AdminCourse[]> {
  await ensureCourseBuilderSchema();
  const result = await query<AdminCourse & { lesson_count: string }>(
    `
    SELECT
      c.id,
      c.title,
      c.slug,
      c.description,
      c.difficulty,
      c.category,
      c.image_url,
      c.track,
      c.created_at,
      COUNT(l.id)::text AS lesson_count
    FROM courses c
    LEFT JOIN lessons l ON l.course_id = c.id
    GROUP BY c.id
    ORDER BY c.created_at DESC
    `,
  );

  return result.rows.map((row) => ({
    ...row,
    lesson_count: Number(row.lesson_count ?? 0),
  }));
}

export async function getAdminCourseById(
  courseId: string,
): Promise<AdminCourse | null> {
  await ensureCourseBuilderSchema();
  const result = await query<AdminCourse>(
    `SELECT id, title, slug, description, difficulty, category, image_url, track, created_at
     FROM courses WHERE id = $1`,
    [courseId],
  );
  return result.rows[0] ?? null;
}

export async function getAdminLessonsByCourse(
  courseId: string,
): Promise<AdminLesson[]> {
  await ensureCourseBuilderSchema();
  const result = await query<{
    id: string;
    course_id: string;
    title: string;
    description: string;
    video_url: string | null;
    lesson_order: number;
    content: LessonContentBlock[] | null;
    created_at: Date;
  }>(
    `SELECT id, course_id, title, description, video_url, lesson_order, content, created_at
     FROM lessons WHERE course_id = $1 ORDER BY lesson_order ASC`,
    [courseId],
  );

  return result.rows.map((row) => ({
    ...row,
    content: parseLessonContent(row.content),
  }));
}

export async function createCourse(
  input: CourseInput,
): Promise<{ success: boolean; id?: string; error?: string }> {
  await ensureCourseBuilderSchema();
  const slug = input.slug.trim() || slugify(input.title);

  const existing = await query<{ id: string }>(
    "SELECT id FROM courses WHERE slug = $1",
    [slug],
  );
  if (existing.rows[0]) {
    return { success: false, error: "Slug already exists." };
  }

  const result = await query<{ id: string }>(
    `
    INSERT INTO courses (title, slug, description, difficulty, category, image_url, track)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
    `,
    [
      input.title.trim(),
      slug,
      input.description.trim(),
      input.level.trim(),
      input.category.trim(),
      input.image_url?.trim() || null,
      input.track.trim(),
    ],
  );

  return { success: true, id: result.rows[0]?.id };
}

export async function updateCourse(
  courseId: string,
  input: CourseInput,
): Promise<{ success: boolean; error?: string }> {
  await ensureCourseBuilderSchema();
  const slug = input.slug.trim() || slugify(input.title);

  const conflict = await query<{ id: string }>(
    "SELECT id FROM courses WHERE slug = $1 AND id <> $2",
    [slug, courseId],
  );
  if (conflict.rows[0]) {
    return { success: false, error: "Slug already exists." };
  }

  await query(
    `
    UPDATE courses
    SET title = $2, slug = $3, description = $4, difficulty = $5,
        category = $6, image_url = $7, track = $8
    WHERE id = $1
    `,
    [
      courseId,
      input.title.trim(),
      slug,
      input.description.trim(),
      input.level.trim(),
      input.category.trim(),
      input.image_url?.trim() || null,
      input.track.trim(),
    ],
  );

  return { success: true };
}

export async function deleteCourse(
  courseId: string,
): Promise<{ success: boolean }> {
  await ensureCourseBuilderSchema();
  await query("DELETE FROM courses WHERE id = $1", [courseId]);
  return { success: true };
}

export async function createLesson(
  courseId: string,
  input: LessonInput,
): Promise<{ success: boolean; id?: string; error?: string }> {
  await ensureCourseBuilderSchema();

  const result = await query<{ id: string }>(
    `
    INSERT INTO lessons (course_id, title, description, video_url, lesson_order, content)
    VALUES ($1, $2, $3, $4, $5, $6::jsonb)
    RETURNING id
    `,
    [
      courseId,
      input.title.trim(),
      input.description.trim(),
      input.video_url?.trim() || null,
      input.order_number,
      JSON.stringify(input.content),
    ],
  );

  return { success: true, id: result.rows[0]?.id };
}

export async function updateLesson(
  lessonId: string,
  input: LessonInput,
): Promise<{ success: boolean; error?: string }> {
  await ensureCourseBuilderSchema();

  await query(
    `
    UPDATE lessons
    SET title = $2, description = $3, video_url = $4, lesson_order = $5, content = $6::jsonb
    WHERE id = $1
    `,
    [
      lessonId,
      input.title.trim(),
      input.description.trim(),
      input.video_url?.trim() || null,
      input.order_number,
      JSON.stringify(input.content),
    ],
  );

  return { success: true };
}

export async function deleteLesson(
  lessonId: string,
): Promise<{ success: boolean }> {
  await ensureCourseBuilderSchema();
  await query("DELETE FROM lessons WHERE id = $1", [lessonId]);
  return { success: true };
}

export async function reorderLessons(
  courseId: string,
  orderedLessonIds: string[],
): Promise<{ success: boolean }> {
  await ensureCourseBuilderSchema();

  for (let index = 0; index < orderedLessonIds.length; index++) {
    await query(
      `UPDATE lessons SET lesson_order = $3 WHERE id = $1 AND course_id = $2`,
      [orderedLessonIds[index], courseId, index + 1],
    );
  }

  return { success: true };
}
