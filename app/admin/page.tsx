import type { Metadata } from "next";
import { AdminShell, adminStyles } from "@/components/admin-shell";
import { getAdminDashboardStats } from "@/lib/admin-db";

export const metadata: Metadata = {
  title: "Admin Dashboard — AI Academy",
  description: "Manage courses, students, and academy analytics.",
};

function formatDate(value: Date): string {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  return (
    <AdminShell activeKey="dashboard" pageLabel="Dashboard">
      <header className={adminStyles.pageHeader}>
        <p className={adminStyles.pageEyebrow}>Overview</p>
        <h1 className={adminStyles.pageTitle}>Admin Dashboard</h1>
        <p className={adminStyles.pageDesc}>
          Monitor students, courses, lessons, and progress across AI Academy.
        </p>
      </header>

      <section className={adminStyles.statsGrid}>
        <div className={adminStyles.statCard}>
          <p className={adminStyles.statLabel}>Total Students</p>
          <p className={adminStyles.statValue}>{stats.total_students}</p>
        </div>
        <div className={adminStyles.statCard}>
          <p className={adminStyles.statLabel}>Total Courses</p>
          <p className={adminStyles.statValue}>{stats.total_courses}</p>
        </div>
        <div className={adminStyles.statCard}>
          <p className={adminStyles.statLabel}>Total Lessons</p>
          <p className={adminStyles.statValue}>{stats.total_lessons}</p>
        </div>
        <div className={adminStyles.statCard}>
          <p className={adminStyles.statLabel}>Progress Records</p>
          <p className={adminStyles.statValue}>
            {stats.total_progress_records}
          </p>
        </div>
      </section>

      <section className={adminStyles.section}>
        <h2 className={adminStyles.sectionTitle}>Recent Signups</h2>
        <div className={adminStyles.tableWrap}>
          <table className={adminStyles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent_signups.length === 0 ? (
                <tr>
                  <td colSpan={3}>No students yet.</td>
                </tr>
              ) : (
                stats.recent_signups.map((student) => {
                  const name =
                    [student.first_name, student.last_name]
                      .filter(Boolean)
                      .join(" ") || "—";
                  return (
                    <tr key={student.id}>
                      <td>{name}</td>
                      <td>{student.email}</td>
                      <td>{formatDate(student.created_at)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
