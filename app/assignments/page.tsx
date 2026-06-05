import type { Metadata } from "next";
import Link from "next/link";
import { PortalShell } from "@/components/portal-shell";
import { listStudentAssignments } from "@/lib/assignments-db";
import { getAuthenticatedStudentId } from "@/lib/student-auth";
import styles from "./assignments.module.css";

export const metadata: Metadata = {
  title: "Assignments — AI Academy",
  description: "View and submit course assignments.",
};

export const dynamic = "force-dynamic";

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

function statusClass(status: string | null): string {
  if (!status) return styles.statusPending;
  if (status === "reviewed") return styles.statusReviewed;
  return styles.statusSubmitted;
}

function statusLabel(status: string | null): string {
  if (!status) return "Not submitted";
  if (status === "reviewed") return "Reviewed";
  return "Submitted";
}

export default async function AssignmentsPage() {
  const studentId = await getAuthenticatedStudentId();
  const assignments = studentId
    ? await listStudentAssignments(studentId)
    : [];

  return (
    <PortalShell activeKey="assignments" pageLabel="Assignments">
      <header className={styles.pageHeader}>
        <p className={styles.pageEyebrow}>Assignment Center</p>
        <h1 className={styles.pageTitle}>Assignments</h1>
        <p className={styles.pageDesc}>
          Complete assignments for your courses and submit your work for review.
        </p>
      </header>

      {assignments.length === 0 ? (
        <p className={styles.empty}>No assignments available yet.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Course</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.title}</td>
                  <td>{assignment.course_title}</td>
                  <td>{formatDueDate(assignment.due_date)}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${statusClass(assignment.submission_status)}`}
                    >
                      {statusLabel(assignment.submission_status)}
                    </span>
                  </td>
                  <td>
                    <Link
                      href={`/assignments/${assignment.id}`}
                      className={styles.btnPrimary}
                    >
                      {assignment.submission_status ? "View" : "Submit"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PortalShell>
  );
}
