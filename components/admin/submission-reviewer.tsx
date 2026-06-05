"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminStyles } from "@/components/admin-shell";
import type { AdminSubmissionRow } from "@/lib/types/assignments";

type SubmissionReviewerProps = {
  initialSubmissions: AdminSubmissionRow[];
};

type ReviewState = {
  feedback: string;
  grade: string;
};

export function SubmissionReviewer({
  initialSubmissions,
}: SubmissionReviewerProps) {
  const router = useRouter();
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [reviews, setReviews] = useState<Record<string, ReviewState>>(() =>
    Object.fromEntries(
      initialSubmissions.map((s) => [
        s.id,
        { feedback: s.feedback ?? "", grade: s.grade ?? "" },
      ]),
    ),
  );
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  function formatDate(value: Date): string {
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  async function handleReview(submissionId: string) {
    setLoadingId(submissionId);
    setError(null);
    setMessage(null);

    const review = reviews[submissionId];
    const response = await fetch(`/api/admin/submissions/${submissionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feedback: review.feedback,
        grade: review.grade,
        status: "reviewed",
      }),
    });
    const data = (await response.json()) as { success: boolean; error?: string };

    setLoadingId(null);
    if (!response.ok || !data.success) {
      setError(data.error ?? "Failed to save review.");
      return;
    }

    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId ? { ...s, status: "reviewed" } : s,
      ),
    );
    setMessage("Review saved.");
    router.refresh();
  }

  return (
    <>
      {error && <p className={adminStyles.error}>{error}</p>}
      {message && <p className={adminStyles.success}>{message}</p>}

      <div className={adminStyles.tableWrap}>
        <table className={adminStyles.table}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Assignment</th>
              <th>Response</th>
              <th>Status</th>
              <th>Grade</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={7}>No submissions yet.</td>
              </tr>
            ) : (
              submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>
                    <div>{submission.student_name}</div>
                    <div style={{ color: "#71717a", fontSize: "0.75rem" }}>
                      {submission.student_email}
                    </div>
                    <div style={{ color: "#71717a", fontSize: "0.75rem" }}>
                      {formatDate(submission.submitted_at)}
                    </div>
                  </td>
                  <td>
                    <div>{submission.assignment_title}</div>
                    <div style={{ color: "#71717a", fontSize: "0.75rem" }}>
                      {submission.course_title}
                    </div>
                  </td>
                  <td style={{ maxWidth: "16rem", whiteSpace: "pre-wrap" }}>
                    {submission.response}
                  </td>
                  <td>{submission.status}</td>
                  <td>
                    <input
                      className={adminStyles.input}
                      value={reviews[submission.id]?.grade ?? ""}
                      onChange={(e) =>
                        setReviews((prev) => ({
                          ...prev,
                          [submission.id]: {
                            ...prev[submission.id],
                            grade: e.target.value,
                          },
                        }))
                      }
                      placeholder="A, B+, etc."
                    />
                  </td>
                  <td>
                    <textarea
                      className={adminStyles.textarea}
                      style={{ minHeight: "5rem" }}
                      value={reviews[submission.id]?.feedback ?? ""}
                      onChange={(e) =>
                        setReviews((prev) => ({
                          ...prev,
                          [submission.id]: {
                            ...prev[submission.id],
                            feedback: e.target.value,
                          },
                        }))
                      }
                      placeholder="Mentor feedback..."
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className={adminStyles.btnPrimary}
                      disabled={loadingId === submission.id}
                      onClick={() => handleReview(submission.id)}
                    >
                      {loadingId === submission.id ? "Saving..." : "Review"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
