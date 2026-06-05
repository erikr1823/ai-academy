import type { Metadata } from "next";
import { AdminShell, adminStyles } from "@/components/admin-shell";
import { getAdminStudents } from "@/lib/admin-db";

export const metadata: Metadata = {
  title: "Students — AI Academy Admin",
  description: "View and search enrolled students.",
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

function formatDate(value: Date): string {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AdminStudentsPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const students = await getAdminStudents(q);

  return (
    <AdminShell activeKey="students" pageLabel="Students">
      <header className={adminStyles.pageHeader}>
        <p className={adminStyles.pageEyebrow}>Student Management</p>
        <h1 className={adminStyles.pageTitle}>Students</h1>
        <p className={adminStyles.pageDesc}>
          Search students and review enrollment progress.
        </p>
      </header>

      <form method="get" className={adminStyles.section}>
        <input
          type="search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search by name or email..."
          className={adminStyles.searchInput}
        />
      </form>

      <section className={adminStyles.section}>
        <div className={adminStyles.tableWrap}>
          <table className={adminStyles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Join Date</th>
                <th>Progress</th>
                <th>Courses Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5}>No students found.</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.full_name}</td>
                    <td>{student.email}</td>
                    <td>{formatDate(student.created_at)}</td>
                    <td>{student.progress_percent}%</td>
                    <td>{student.courses_enrolled}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
