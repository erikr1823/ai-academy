import type { Metadata } from "next";
import { AdminShell, adminStyles } from "@/components/admin-shell";
import { getAdminAnalytics } from "@/lib/admin-db";

export const metadata: Metadata = {
  title: "Analytics — AI Academy Admin",
  description: "Academy usage and completion analytics.",
};

export default async function AdminAnalyticsPage() {
  const analytics = await getAdminAnalytics();

  return (
    <AdminShell activeKey="analytics" pageLabel="Analytics">
      <header className={adminStyles.pageHeader}>
        <p className={adminStyles.pageEyebrow}>Insights</p>
        <h1 className={adminStyles.pageTitle}>Analytics</h1>
        <p className={adminStyles.pageDesc}>
          Track user activity, course completion, and popular content.
        </p>
      </header>

      <section className={adminStyles.statsGrid}>
        <div className={adminStyles.statCard}>
          <p className={adminStyles.statLabel}>Total Users</p>
          <p className={adminStyles.statValue}>{analytics.total_users}</p>
        </div>
        <div className={adminStyles.statCard}>
          <p className={adminStyles.statLabel}>Active Users</p>
          <p className={adminStyles.statValue}>{analytics.active_users}</p>
        </div>
        <div className={adminStyles.statCard}>
          <p className={adminStyles.statLabel}>Most Popular Course</p>
          <p className={adminStyles.statValue} style={{ fontSize: "1.25rem" }}>
            {analytics.most_popular_course?.title ?? "—"}
          </p>
        </div>
        <div className={adminStyles.statCard}>
          <p className={adminStyles.statLabel}>Progress Events</p>
          <p className={adminStyles.statValue}>
            {analytics.most_popular_course?.progress_count ?? 0}
          </p>
        </div>
      </section>

      <section className={adminStyles.section}>
        <h2 className={adminStyles.sectionTitle}>Course Completion Rates</h2>
        <div className={adminStyles.tableWrap}>
          <table className={adminStyles.table}>
            <thead>
              <tr>
                <th>Course</th>
                <th>Completion Rate</th>
                <th>Enrolled Students</th>
              </tr>
            </thead>
            <tbody>
              {analytics.course_completion_rates.length === 0 ? (
                <tr>
                  <td colSpan={3}>No course data yet.</td>
                </tr>
              ) : (
                analytics.course_completion_rates.map((course) => (
                  <tr key={course.course_id}>
                    <td>{course.title}</td>
                    <td>{course.completion_rate}%</td>
                    <td>{course.enrolled_students}</td>
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
