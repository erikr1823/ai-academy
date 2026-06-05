import type { Metadata } from "next";
import Link from "next/link";
import { PortalShell, portalStyles } from "@/components/portal-shell";
import { getActiveUserId, getDashboardStats } from "@/lib/courses-db";
import styles from "./profile.module.css";

export const metadata: Metadata = {
  title: "Profile — AI Academy",
  description: "Your AI Academy student profile.",
};

export default async function ProfilePage() {
  const userId = await getActiveUserId();
  const stats = await getDashboardStats(userId);

  return (
    <PortalShell activeKey="profile" pageLabel="Profile">
      <header className={portalStyles.pageHeader}>
        <p className={portalStyles.pageEyebrow}>Profile</p>
        <h1 className={portalStyles.pageTitle}>
          {stats.user_name ? stats.user_name : "Student Profile"}
        </h1>
        <p className={portalStyles.pageDesc}>
          Your learning profile and track information. Full account settings
          arrive in Phase 2.
        </p>
      </header>

      <section className={styles.cardGrid}>
        <article className={styles.infoCard}>
          <p className={styles.cardLabel}>Current Track</p>
          <div>
            {stats.current_track ? (
              <span className={portalStyles.badge}>{stats.current_track}</span>
            ) : (
              <p className={styles.emptyTrack}>
                Sign up to enroll in a track.
              </p>
            )}
          </div>
        </article>

        <article className={styles.infoCard}>
          <p className={styles.cardLabel}>Learning Progress</p>
          <p className={styles.cardValue}>{stats.completion_percent}%</p>
          <p className={styles.cardMeta}>
            {stats.lessons_completed} lessons completed across{" "}
            {stats.courses_enrolled} courses
          </p>
        </article>
      </section>

      <section className={styles.noteCard}>
        <p className={styles.noteText}>
          Authentication and profile editing are coming in Phase 2. For now,
          progress is linked to the most recent student account in the database.
        </p>
        <div className={styles.noteActions}>
          <Link href="/signup" className={portalStyles.btnSecondary}>
            Create account
          </Link>
          <Link href="/dashboard" className={portalStyles.btnSecondary}>
            Back to dashboard
          </Link>
        </div>
      </section>
    </PortalShell>
  );
}
