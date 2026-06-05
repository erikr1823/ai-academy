import type { Metadata } from "next";
import { CourseManager } from "@/components/admin/course-manager";
import { AdminShell, adminStyles } from "@/components/admin-shell";
import { listAdminCourses } from "@/lib/admin-courses-db";

export const metadata: Metadata = {
  title: "Course Builder — AI Academy Admin",
  description: "Create and manage courses.",
};

export default async function AdminCoursesPage() {
  const courses = await listAdminCourses();

  return (
    <AdminShell activeKey="courses" pageLabel="Courses">
      <header className={adminStyles.pageHeader}>
        <p className={adminStyles.pageEyebrow}>Course Builder</p>
        <h1 className={adminStyles.pageTitle}>Courses</h1>
        <p className={adminStyles.pageDesc}>
          Create, edit, and delete courses. Open a course to manage its lessons.
        </p>
      </header>
      <CourseManager initialCourses={courses} />
    </AdminShell>
  );
}
