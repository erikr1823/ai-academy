import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PortalShell, portalStyles } from "@/components/portal-shell";
import { getStudentProfile } from "@/lib/student-profile";
import styles from "./profile.module.css";

export const metadata: Metadata = {
  title: "Profile — AI Academy",
  description: "Your AI Academy student profile.",
};

function formatJoinDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function ProfilePage() {
  const profile = await getStudentProfile();

  if (!profile) {
    redirect("/login");
  }

  return (
    <PortalShell activeKey="profile" pageLabel="Profile">
      <header className={portalStyles.pageHeader}>
        <p className={portalStyles.pageEyebrow}>Profile</p>
        <h1 className={portalStyles.pageTitle}>{profile.full_name}</h1>
        <p className={portalStyles.pageDesc}>
          Your account details and learning progress at AI Academy.
        </p>
      </header>

      <section className={styles.cardGrid}>
        <article className={styles.infoCard}>
          <p className={styles.cardLabel}>Name</p>
          <p className={styles.cardValue}>{profile.full_name}</p>
        </article>

        <article className={styles.infoCard}>
          <p className={styles.cardLabel}>Email</p>
          <p className={styles.cardValueSm}>{profile.email}</p>
        </article>

        <article className={styles.infoCard}>
          <p className={styles.cardLabel}>Join Date</p>
          <p className={styles.cardValueSm}>
            {formatJoinDate(profile.created_at)}
          </p>
        </article>

        <article className={styles.infoCard}>
          <p className={styles.cardLabel}>Current Track</p>
          <div className={styles.cardValueWrap}>
            {profile.current_track ? (
              <span className={portalStyles.badge}>{profile.current_track}</span>
            ) : (
              <p className={styles.emptyTrack}>No track selected yet</p>
            )}
          </div>
        </article>
      </section>

      <section className={styles.statsGrid}>
        <article className={styles.statCard}>
          <p className={styles.statLabel}>Courses Enrolled</p>
          <p className={styles.statValue}>{profile.courses_enrolled}</p>
        </article>
        <article className={styles.statCard}>
          <p className={styles.statLabel}>Lessons Completed</p>
          <p className={styles.statValue}>{profile.lessons_completed}</p>
        </article>
        <article className={styles.statCard}>
          <p className={styles.statLabel}>Completion</p>
          <p className={styles.statValue}>{profile.completion_percent}%</p>
        </article>
        <article className={styles.statCard}>
          <p className={styles.statLabel}>Certificates Earned</p>
          <p className={styles.statValue}>{profile.certificates_earned}</p>
        </article>
      </section>

      <section className={styles.noteCard}>
        <p className={styles.noteText}>
          Profile editing and track changes will expand in a future phase. Your
          course progress is saved to your authenticated student account.
        </p>
        <div className={styles.noteActions}>
          <Link href="/dashboard" className={portalStyles.btnSecondary}>
            Back to dashboard
          </Link>
          <Link href="/courses" className={portalStyles.btnPrimary}>
            Browse courses
          </Link>
        </div>
      </section>
    </PortalShell>
  );
}
