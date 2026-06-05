import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  PortalProgressBar,
  PortalShell,
  portalStyles,
} from "@/components/portal-shell";
import { LEGACY_LESSON_REDIRECTS } from "@/lib/course-seed-ids";
import { getActiveUserId, getCourseById, isUuid } from "@/lib/courses-db";
import styles from "../course-detail.module.css";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  if (LEGACY_LESSON_REDIRECTS[id]) {
    return { title: "Redirecting — AI Academy" };
  }

  const course = await getCourseById(id);
  if (!course) {
    return { title: "Course Not Found — AI Academy" };
  }

  return {
    title: `${course.title} — AI Academy`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (LEGACY_LESSON_REDIRECTS[id]) {
    redirect(LEGACY_LESSON_REDIRECTS[id]);
  }

  if (!isUuid(id)) {
    notFound();
  }

  const userId = await getActiveUserId();
  const course = await getCourseById(id, userId);

  if (!course) notFound();

  const nextLesson =
    course.lessons.find((lesson) => !lesson.completed) ?? course.lessons[0];

  return (
    <PortalShell activeKey="courses" pageLabel={course.title}>
      <Link href="/courses" className={portalStyles.linkAccent}>
        ← Back to courses
      </Link>

      <header className={styles.courseHeader}>
        <div className={styles.badgeRow}>
          <span className={portalStyles.badge}>{course.category}</span>
          <span className={`${portalStyles.badge} ${portalStyles.badgeMuted}`}>
            {course.difficulty}
          </span>
        </div>
        <h1 className={styles.courseTitle}>{course.title}</h1>
        <p className={styles.courseDesc}>{course.description}</p>
      </header>

      <section className={styles.progressCard}>
        <div className={styles.progressTop}>
          <div>
            <p className={styles.progressEyebrow}>Course progress</p>
            <p className={styles.progressPercent}>{course.progress_percent}%</p>
            <p className={styles.progressSub}>
              {course.completed_count} of {course.lesson_count} lessons complete
            </p>
          </div>
          {nextLesson && (
            <Link
              href={`/courses/${course.id}/lesson/${nextLesson.id}`}
              className={portalStyles.btnPrimary}
            >
              {course.progress_percent > 0 ? "Continue" : "Start Course"}
            </Link>
          )}
        </div>
        <div className={styles.progressBarWrap}>
          <PortalProgressBar value={course.progress_percent} />
        </div>
      </section>

      <section>
        <div className={portalStyles.sectionHeader}>
          <h2 className={portalStyles.sectionTitle}>Lessons</h2>
        </div>
        <div className={styles.lessonList}>
          {course.lessons.map((lesson) => (
            <article key={lesson.id} className={styles.lessonCard}>
              <div className={styles.lessonRow}>
                <div className={styles.lessonMain}>
                  <div
                    className={`${styles.lessonNumber} ${
                      lesson.completed
                        ? styles.lessonNumberDone
                        : styles.lessonNumberPending
                    }`}
                  >
                    {lesson.completed ? "✓" : lesson.lesson_order}
                  </div>
                  <div className={styles.lessonContent}>
                    <div className={styles.lessonMeta}>
                      <span className={styles.lessonEyebrow}>
                        Lesson {lesson.lesson_order}
                      </span>
                      <span
                        className={`${portalStyles.badge} ${
                          lesson.completed
                            ? portalStyles.badgeComplete
                            : portalStyles.badgeNotStarted
                        }`}
                      >
                        {lesson.completed ? "Completed" : "Not Started"}
                      </span>
                    </div>
                    <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                    <p className={styles.lessonDesc}>{lesson.description}</p>
                  </div>
                </div>
                <Link
                  href={`/courses/${course.id}/lesson/${lesson.id}`}
                  className={`${portalStyles.btnPrimary} ${styles.lessonCta}`}
                >
                  {lesson.completed ? "Review" : "Continue"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PortalShell>
  );
}
