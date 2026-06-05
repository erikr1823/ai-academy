import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkLessonComplete } from "@/components/mark-lesson-complete";
import { PortalShell, portalStyles } from "@/components/portal-shell";
import {
  getActiveUserId,
  getLessonById,
  isUuid,
} from "@/lib/courses-db";
import styles from "../../../lesson.module.css";

type PageProps = {
  params: Promise<{ id: string; lessonId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, lessonId } = await params;
  const lesson = await getLessonById(id, lessonId);

  if (!lesson) {
    return { title: "Lesson Not Found — AI Academy" };
  }

  return {
    title: `${lesson.title} — AI Academy`,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { id, lessonId } = await params;

  if (!isUuid(id) || !isUuid(lessonId)) {
    notFound();
  }

  const userId = await getActiveUserId();
  const lesson = await getLessonById(id, lessonId, userId);

  if (!lesson) notFound();

  return (
    <PortalShell activeKey="courses" pageLabel="Lesson" demoStep={6}>
      <Link href={`/courses/${id}`} className={portalStyles.linkAccent}>
        ← Back to course
      </Link>

      <header className={styles.lessonHeader}>
        <span className={portalStyles.badge}>{lesson.course_title}</span>
        <h1 className={styles.lessonTitle}>{lesson.title}</h1>
        <p className={styles.lessonDesc}>{lesson.description}</p>
      </header>

      <div className={styles.contentGrid}>
        <div className={styles.mainCol}>
          <section className={styles.videoCard}>
            <div className={styles.videoHeader}>
              <h2 className={styles.videoTitle}>Lesson Video</h2>
            </div>
            <div className={styles.videoArea}>
              {lesson.video_url ? (
                <iframe
                  src={lesson.video_url}
                  title={lesson.title}
                  className={styles.videoIframe}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className={styles.videoPlaceholder}>
                  <p className={styles.videoPlaceholderTitle}>
                    Video placeholder
                  </p>
                  <p className={styles.videoPlaceholderSub}>
                    Lesson {lesson.lesson_order} · Video content coming soon
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className={styles.aboutCard}>
            <h2 className={styles.aboutTitle}>About this lesson</h2>
            <p className={styles.aboutText}>{lesson.description}</p>
          </section>
        </div>

        <div className={styles.sideCol}>
          <MarkLessonComplete
            userId={userId}
            lessonId={lesson.id}
            courseId={id}
            initialCompleted={lesson.completed}
          />

          <section className={styles.mentorCard}>
            <p className={styles.mentorLabel}>AI Mentor Help</p>
            <p className={styles.mentorText}>
              Stuck on this lesson? Ask your AI Mentor for a walkthrough or
              practice feedback.
            </p>
            <Link href="/mentor" className={styles.mentorBtn}>
              Ask AI Mentor
            </Link>
          </section>
        </div>
      </div>
    </PortalShell>
  );
}
