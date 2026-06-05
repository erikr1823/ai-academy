import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssignmentSubmitForm } from "@/components/assignment-submit-form";
import { PortalShell } from "@/components/portal-shell";
import {
  getAssignmentForStudent,
  isUuid,
} from "@/lib/assignments-db";
import { getAuthenticatedStudentId } from "@/lib/student-auth";
import styles from "../assignments.module.css";

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatDueDate(value: Date | null): string {
  if (!value) return "No due date";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const studentId = await getAuthenticatedStudentId();
  if (!studentId) return { title: "Assignment — AI Academy" };

  const data = await getAssignmentForStudent(id, studentId);
  return {
    title: data
      ? `${data.assignment.title} — AI Academy`
      : "Assignment Not Found — AI Academy",
  };
}

export const dynamic = "force-dynamic";

export default async function AssignmentDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (!isUuid(id)) notFound();

  const studentId = await getAuthenticatedStudentId();
  if (!studentId) notFound();

  const data = await getAssignmentForStudent(id, studentId);
  if (!data) notFound();

  const { assignment, submission } = data;

  return (
    <PortalShell activeKey="assignments" pageLabel="Assignment">
      <Link href="/assignments" className={styles.linkAccent}>
        ← Back to Assignments
      </Link>

      <div className={styles.detailCard}>
        <p className={styles.pageEyebrow}>{assignment.course_title}</p>
        <h1 className={styles.pageTitle}>{assignment.title}</h1>

        <div className={styles.detailMeta}>
          <span>
            Due: <strong>{formatDueDate(assignment.due_date)}</strong>
          </span>
          {assignment.lesson_title && (
            <span>
              Lesson: <strong>{assignment.lesson_title}</strong>
            </span>
          )}
          <span>
            Status:{" "}
            <strong>
              {submission
                ? submission.status === "reviewed"
                  ? "Reviewed"
                  : "Submitted"
                : "Not submitted"}
            </strong>
          </span>
        </div>

        {assignment.instructions && (
          <div className={styles.instructions}>{assignment.instructions}</div>
        )}

        {submission ? (
          <>
            <div className={styles.submittedBox}>
              <p className={styles.submittedTitle}>Your submission</p>
              <p className={styles.submittedText}>{submission.response}</p>
              <p
                className={styles.submittedText}
                style={{ marginTop: "0.5rem", color: "#71717a" }}
              >
                Submitted{" "}
                {new Date(submission.submitted_at).toLocaleString("en-US")}
              </p>
            </div>
            {(submission.feedback || submission.grade) && (
              <div className={styles.feedbackBox}>
                {submission.grade && (
                  <p className={styles.label}>Grade: {submission.grade}</p>
                )}
                {submission.feedback && (
                  <p className={styles.instructions}>{submission.feedback}</p>
                )}
              </div>
            )}
          </>
        ) : (
          <AssignmentSubmitForm assignmentId={assignment.id} />
        )}
      </div>
    </PortalShell>
  );
}
