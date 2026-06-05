"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/app/assignments/assignments.module.css";

export function AssignmentSubmitForm({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const router = useRouter();
  const [response, setResponse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch(`/api/assignments/${assignmentId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ response }),
    });
    const data = (await res.json()) as { success: boolean; error?: string };

    setLoading(false);
    if (!res.ok || !data.success) {
      setError(data.error ?? "Failed to submit assignment.");
      return;
    }

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formField}>
        <label className={styles.label} htmlFor="response">
          Your response
        </label>
        <textarea
          id="response"
          className={styles.textarea}
          required
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Type your assignment response here..."
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button
        type="submit"
        className={styles.btnPrimary}
        disabled={loading}
        style={{ marginTop: "1rem" }}
      >
        {loading ? "Submitting..." : "Submit Assignment"}
      </button>
    </form>
  );
}
