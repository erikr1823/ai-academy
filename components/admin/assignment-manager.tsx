"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminStyles } from "@/components/admin-shell";
import type { AdminCourse } from "@/lib/types/admin";
import type { AssignmentInput, AssignmentWithCourse } from "@/lib/types/assignments";

type LessonOption = { id: string; title: string };

const emptyForm: AssignmentInput = {
  course_id: "",
  lesson_id: null,
  title: "",
  instructions: "",
  due_date: "",
};

type AssignmentManagerProps = {
  initialAssignments: AssignmentWithCourse[];
  courses: AdminCourse[];
};

export function AssignmentManager({
  initialAssignments,
  courses,
}: AssignmentManagerProps) {
  const router = useRouter();
  const [assignments, setAssignments] = useState(initialAssignments);
  const [form, setForm] = useState<AssignmentInput>(emptyForm);
  const [lessons, setLessons] = useState<LessonOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!form.course_id) {
      setLessons([]);
      return;
    }

    async function loadLessons() {
      const response = await fetch(`/api/admin/courses/${form.course_id}`);
      const data = (await response.json()) as {
        success: boolean;
        lessons?: { id: string; title: string }[];
      };
      if (data.lessons) {
        setLessons(
          data.lessons.map((l) => ({ id: l.id, title: l.title })),
        );
      }
    }

    void loadLessons();
  }, [form.course_id]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/admin/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = (await response.json()) as {
      success: boolean;
      error?: string;
    };

    setLoading(false);
    if (!response.ok || !data.success) {
      setError(data.error ?? "Failed to create assignment.");
      return;
    }

    setForm(emptyForm);
    setMessage("Assignment created.");
    router.refresh();
    const listResponse = await fetch("/api/admin/assignments");
    const listData = (await listResponse.json()) as {
      success: boolean;
      assignments?: AssignmentWithCourse[];
    };
    if (listData.assignments) setAssignments(listData.assignments);
  }

  async function handleDelete(assignmentId: string, title: string) {
    if (!confirm(`Delete assignment "${title}"?`)) return;

    setLoading(true);
    setError(null);
    const response = await fetch(`/api/admin/assignments/${assignmentId}`, {
      method: "DELETE",
    });
    const data = (await response.json()) as { success: boolean };
    setLoading(false);

    if (!response.ok || !data.success) {
      setError("Failed to delete assignment.");
      return;
    }

    setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
    setMessage("Assignment deleted.");
    router.refresh();
  }

  function formatDueDate(value: Date | null): string {
    if (!value) return "—";
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <>
      <section className={adminStyles.card}>
        <h2 className={adminStyles.sectionTitle}>Create Assignment</h2>
        <form onSubmit={handleCreate} className={adminStyles.formGrid}>
          <div className={`${adminStyles.formGrid} ${adminStyles.formGrid2}`}>
            <div className={adminStyles.field}>
              <label className={adminStyles.label}>Course</label>
              <select
                className={adminStyles.select}
                required
                value={form.course_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    course_id: e.target.value,
                    lesson_id: null,
                  })
                }
              >
                <option value="">Select course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
            <div className={adminStyles.field}>
              <label className={adminStyles.label}>Lesson (optional)</label>
              <select
                className={adminStyles.select}
                value={form.lesson_id ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    lesson_id: e.target.value || null,
                  })
                }
                disabled={!form.course_id}
              >
                <option value="">No specific lesson</option>
                {lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={adminStyles.field}>
            <label className={adminStyles.label}>Title</label>
            <input
              className={adminStyles.input}
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className={adminStyles.field}>
            <label className={adminStyles.label}>Instructions</label>
            <textarea
              className={adminStyles.textarea}
              value={form.instructions ?? ""}
              onChange={(e) =>
                setForm({ ...form, instructions: e.target.value })
              }
            />
          </div>
          <div className={adminStyles.field}>
            <label className={adminStyles.label}>Due date</label>
            <input
              className={adminStyles.input}
              type="datetime-local"
              value={form.due_date ?? ""}
              onChange={(e) => setForm({ ...form, due_date: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className={adminStyles.btnPrimary}
            disabled={loading}
          >
            Create Assignment
          </button>
        </form>
      </section>

      {error && <p className={adminStyles.error}>{error}</p>}
      {message && <p className={adminStyles.success}>{message}</p>}

      <section className={adminStyles.section}>
        <h2 className={adminStyles.sectionTitle}>All Assignments</h2>
        <div className={adminStyles.tableWrap}>
          <table className={adminStyles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Course</th>
                <th>Lesson</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length === 0 ? (
                <tr>
                  <td colSpan={5}>No assignments yet.</td>
                </tr>
              ) : (
                assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td>{assignment.title}</td>
                    <td>{assignment.course_title}</td>
                    <td>{assignment.lesson_title ?? "—"}</td>
                    <td>{formatDueDate(assignment.due_date)}</td>
                    <td>
                      <button
                        type="button"
                        className={adminStyles.btnDanger}
                        onClick={() =>
                          handleDelete(assignment.id, assignment.title)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
