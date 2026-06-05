"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./mark-lesson-complete.module.css";

type MarkLessonCompleteProps = {
  userId: string | null;
  lessonId: string;
  courseId: string;
  initialCompleted: boolean;
};

export function MarkLessonComplete({
  userId,
  lessonId,
  courseId,
  initialCompleted,
}: MarkLessonCompleteProps) {
  const router = useRouter();
  const [completed, setCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleMarkComplete() {
    if (!userId) {
      setError(
        "No student account found. Sign up first to save lesson progress.",
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, lessonId }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !data.success) {
        setError(data.error ?? "Failed to save progress.");
        return;
      }

      setCompleted(true);
      router.refresh();
    } catch {
      setError("Unable to reach the progress API.");
    } finally {
      setLoading(false);
    }
  }

  if (completed) {
    return (
      <div className={`${styles.card} ${styles.cardDone}`}>
        <p className={`${styles.title} ${styles.titleDone}`}>
          Lesson completed
        </p>
        <p className={styles.desc}>
          Your progress has been saved. Course completion has been updated.
        </p>
        <a href={`/courses/${courseId}`} className={styles.btnSecondary}>
          Back to course
        </a>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <p className={styles.title}>Mark your progress</p>
      <p className={styles.desc}>
        Complete this lesson to update your course percentage and dashboard
        stats.
      </p>
      {error && <p className={styles.error}>{error}</p>}
      <button
        type="button"
        onClick={handleMarkComplete}
        disabled={loading}
        className={styles.btnPrimary}
      >
        {loading ? "Saving…" : "Mark Complete"}
      </button>
    </div>
  );
}
