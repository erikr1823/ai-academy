import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonManager } from "@/components/admin/lesson-manager";
import { AdminShell, adminStyles } from "@/components/admin-shell";
import {
  getAdminCourseById,
  getAdminLessonsByCourse,
} from "@/lib/admin-courses-db";
import { isUuid } from "@/lib/courses-db";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getAdminCourseById(id);
  return {
    title: course
      ? `${course.title} — Lesson Builder`
      : "Course Not Found — AI Academy Admin",
  };
}

export default async function AdminCourseDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (!isUuid(id)) notFound();

  const [course, lessons] = await Promise.all([
    getAdminCourseById(id),
    getAdminLessonsByCourse(id),
  ]);

  if (!course) notFound();

  return (
    <AdminShell activeKey="courses" pageLabel="Lesson Builder">
      <Link href="/admin/courses" className={adminStyles.linkAccent}>
        ← Back to courses
      </Link>

      <header className={adminStyles.pageHeader}>
        <p className={adminStyles.pageEyebrow}>{course.track ?? "Course"}</p>
        <h1 className={adminStyles.pageTitle}>{course.title}</h1>
        <p className={adminStyles.pageDesc}>{course.description}</p>
      </header>

      <LessonManager course={course} initialLessons={lessons} />
    </AdminShell>
  );
}
