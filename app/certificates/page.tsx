import type { Metadata } from "next";
import Link from "next/link";
import {
  PortalProgressBar,
  PortalShell,
  portalStyles,
} from "@/components/portal-shell";
import { getStudentCertificateOverview } from "@/lib/certificates-db";
import { getAuthenticatedStudentId } from "@/lib/student-auth";
import styles from "./certificates.module.css";

export const metadata: Metadata = {
  title: "Certificates — AI Academy",
  description: "View earned and in-progress course certificates.",
};

export const dynamic = "force-dynamic";

function formatDate(value: Date): string {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "earned":
      return portalStyles.badgeComplete;
    case "in_progress":
      return portalStyles.badgeInProgress;
    default:
      return portalStyles.badgeLocked;
  }
}

function statusLabel(status: string) {
  switch (status) {
    case "earned":
      return "Earned";
    case "in_progress":
      return "In Progress";
    default:
      return "Locked";
  }
}

export default async function CertificatesPage() {
  const studentId = await getAuthenticatedStudentId();
  const overview = studentId
    ? await getStudentCertificateOverview(studentId)
    : { earned: [], courses: [], earned_count: 0 };

  const earnedCourses = overview.courses.filter((c) => c.status === "earned");
  const lockedOrProgress = overview.courses.filter(
    (c) => c.status !== "earned",
  );

  return (
    <PortalShell activeKey="certificates" pageLabel="Certificates">
      <header className={portalStyles.pageHeader}>
        <p className={portalStyles.pageEyebrow}>Completion Awards</p>
        <h1 className={portalStyles.pageTitle}>Certificates</h1>
        <p className={portalStyles.pageDesc}>
          Earn a certificate when you complete 100% of lessons in a course.
        </p>
      </header>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Earned</p>
          <p className={styles.statValue}>{overview.earned_count}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Courses</p>
          <p className={styles.statValue}>{overview.courses.length}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>In Progress</p>
          <p className={styles.statValue}>
            {
              overview.courses.filter((c) => c.status === "in_progress")
                .length
            }
          </p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Locked</p>
          <p className={styles.statValue}>
            {overview.courses.filter((c) => c.status === "locked").length}
          </p>
        </div>
      </section>

      <section className={portalStyles.section}>
        <div className={portalStyles.sectionHeader}>
          <h2 className={portalStyles.sectionTitle}>Earned Certificates</h2>
        </div>
        {earnedCourses.length === 0 ? (
          <p className={styles.empty}>
            Complete all lessons in a course to earn your first certificate.
          </p>
        ) : (
          <div className={styles.certGrid}>
            {earnedCourses.map((course) => (
              <article key={course.course_id} className={styles.certCard}>
                <span
                  className={`${portalStyles.badge} ${portalStyles.badgeComplete}`}
                >
                  Earned
                </span>
                <h3 className={styles.certName}>{course.course_title}</h3>
                <div className={portalStyles.progressMeta}>
                  <span className={portalStyles.progressLabel}>Completion</span>
                  <span className={portalStyles.progressValue}>100%</span>
                </div>
                <PortalProgressBar value={100} />
                {course.certificate && (
                  <>
                    <p className={styles.certMeta}>
                      Issued: {formatDate(course.certificate.issued_at)}
                    </p>
                    <p className={styles.certCode}>
                      Code: {course.certificate.certificate_code}
                    </p>
                    <Link
                      href={`/certificates/${course.certificate.id}`}
                      className={styles.certLink}
                    >
                      View Certificate →
                    </Link>
                  </>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className={portalStyles.section}>
        <div className={portalStyles.sectionHeader}>
          <h2 className={portalStyles.sectionTitle}>
            Locked & In Progress
          </h2>
        </div>
        {lockedOrProgress.length === 0 ? (
          <p className={styles.empty}>All available certificates earned.</p>
        ) : (
          <div className={styles.certGrid}>
            {lockedOrProgress.map((course) => (
              <article
                key={course.course_id}
                className={`${styles.certCard} ${
                  course.status === "locked" ? styles.certCardLocked : ""
                }`}
              >
                <span
                  className={`${portalStyles.badge} ${statusBadgeClass(course.status)}`}
                >
                  {statusLabel(course.status)}
                </span>
                <h3 className={styles.certName}>{course.course_title}</h3>
                <div className={portalStyles.progressMeta}>
                  <span className={portalStyles.progressLabel}>Completion</span>
                  <span className={portalStyles.progressValue}>
                    {course.progress_percent}%
                  </span>
                </div>
                <PortalProgressBar value={course.progress_percent} />
                <p className={styles.certMeta}>
                  {course.completed_count} of {course.lesson_count} lessons
                  complete
                </p>
                {course.status === "locked" && (
                  <p className={styles.certLocked}>
                    Start the course to unlock certificate progress.
                  </p>
                )}
                {course.status === "in_progress" && (
                  <Link
                    href={`/courses/${course.course_id}`}
                    className={styles.certLink}
                  >
                    Continue Course →
                  </Link>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </PortalShell>
  );
}
