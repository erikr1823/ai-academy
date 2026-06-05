import type { Metadata } from "next";
import { AssignmentManager } from "@/components/admin/assignment-manager";
import { AdminShell, adminStyles } from "@/components/admin-shell";
import { listAdminAssignments } from "@/lib/assignments-db";
import { listAdminCourses } from "@/lib/admin-courses-db";

export const metadata: Metadata = {
  title: "Assignments — AI Academy Admin",
  description: "Create and manage course assignments.",
};

export default async function AdminAssignmentsPage() {
  const [assignments, courses] = await Promise.all([
    listAdminAssignments(),
    listAdminCourses(),
  ]);

  return (
    <AdminShell activeKey="assignments" pageLabel="Assignments">
      <header className={adminStyles.pageHeader}>
        <p className={adminStyles.pageEyebrow}>Assignment Builder</p>
        <h1 className={adminStyles.pageTitle}>Assignments</h1>
        <p className={adminStyles.pageDesc}>
          Create assignments linked to courses and optional lessons.
        </p>
      </header>
      <AssignmentManager
        initialAssignments={assignments}
        courses={courses}
      />
    </AdminShell>
  );
}
