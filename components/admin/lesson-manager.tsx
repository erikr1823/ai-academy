"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ContentEditor } from "@/components/admin/content-editor";
import { adminStyles } from "@/components/admin-shell";
import { defaultLessonContent } from "@/lib/types/lesson-content";
import type { AdminCourse, AdminLesson, LessonInput } from "@/lib/types/admin";

type LessonManagerProps = {
  course: AdminCourse;
  initialLessons: AdminLesson[];
};

const emptyLesson = (order: number): LessonInput => ({
  title: "",
  description: "",
  content: defaultLessonContent,
  order_number: order,
  video_url: "",
});

export function LessonManager({ course, initialLessons }: LessonManagerProps) {
  const router = useRouter();
  const [lessons, setLessons] = useState(initialLessons);
  const [form, setForm] = useState<LessonInput>(
    emptyLesson(initialLessons.length + 1),
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function refreshLessons() {
    const response = await fetch(`/api/admin/courses/${course.id}`);
    const data = (await response.json()) as {
      success: boolean;
      lessons?: AdminLesson[];
    };
    if (data.lessons) {
      setLessons(data.lessons);
      setForm(emptyLesson(data.lessons.length + 1));
    }
    router.refresh();
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch(`/api/admin/courses/${course.id}/lessons`, {
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
      setError(data.error ?? "Failed to create lesson.");
      return;
    }

    setMessage("Lesson created.");
    await refreshLessons();
  }

  async function handleUpdate(lessonId: string, input: LessonInput) {
    setLoading(true);
    setError(null);

    const response = await fetch(`/api/admin/lessons/${lessonId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = (await response.json()) as {
      success: boolean;
      error?: string;
    };

    setLoading(false);
    if (!response.ok || !data.success) {
      setError(data.error ?? "Failed to update lesson.");
      return;
    }

    setEditingId(null);
    setMessage("Lesson updated.");
    await refreshLessons();
  }

  async function handleDelete(lessonId: string, title: string) {
    if (!confirm(`Delete lesson "${title}"?`)) return;

    setLoading(true);
    const response = await fetch(`/api/admin/lessons/${lessonId}`, {
      method: "DELETE",
    });
    const data = (await response.json()) as { success: boolean };
    setLoading(false);

    if (!response.ok || !data.success) {
      setError("Failed to delete lesson.");
      return;
    }

    setMessage("Lesson deleted.");
    await refreshLessons();
  }

  async function moveLesson(lessonId: string, direction: "up" | "down") {
    const index = lessons.findIndex((l) => l.id === lessonId);
    if (index < 0) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= lessons.length) return;

    const ordered = [...lessons];
    [ordered[index], ordered[targetIndex]] = [
      ordered[targetIndex],
      ordered[index],
    ];

    setLoading(true);
    const response = await fetch("/api/admin/lessons/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: course.id,
        orderedLessonIds: ordered.map((l) => l.id),
      }),
    });
    setLoading(false);

    if (!response.ok) {
      setError("Failed to reorder lessons.");
      return;
    }

    setLessons(ordered.map((lesson, i) => ({ ...lesson, lesson_order: i + 1 })));
    setMessage("Lesson order updated.");
    router.refresh();
  }

  return (
    <>
      <section className={adminStyles.card}>
        <h2 className={adminStyles.sectionTitle}>Add Lesson</h2>
        <form onSubmit={handleCreate} className={adminStyles.formGrid}>
          <LessonFields form={form} onChange={setForm} />
          <button
            type="submit"
            className={adminStyles.btnPrimary}
            disabled={loading}
          >
            Add Lesson
          </button>
        </form>
      </section>

      {error && <p className={adminStyles.error}>{error}</p>}
      {message && <p className={adminStyles.success}>{message}</p>}

      <section className={adminStyles.section}>
        <h2 className={adminStyles.sectionTitle}>Lessons</h2>
        <div className={adminStyles.tableWrap}>
          <table className={adminStyles.table}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.length === 0 ? (
                <tr>
                  <td colSpan={4}>No lessons yet.</td>
                </tr>
              ) : (
                lessons.map((lesson, index) => (
                  <tr key={lesson.id}>
                    <td>{lesson.lesson_order}</td>
                    <td>{lesson.title}</td>
                    <td>{lesson.description}</td>
                    <td>
                      <div className={adminStyles.rowActions}>
                        <button
                          type="button"
                          className={adminStyles.btnSecondary}
                          disabled={index === 0 || loading}
                          onClick={() => moveLesson(lesson.id, "up")}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          className={adminStyles.btnSecondary}
                          disabled={
                            index === lessons.length - 1 || loading
                          }
                          onClick={() => moveLesson(lesson.id, "down")}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          className={adminStyles.btnSecondary}
                          onClick={() => setEditingId(lesson.id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className={adminStyles.btnDanger}
                          onClick={() =>
                            handleDelete(lesson.id, lesson.title)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {editingId && (
        <EditLessonPanel
          lesson={lessons.find((l) => l.id === editingId)!}
          loading={loading}
          onClose={() => setEditingId(null)}
          onSave={(input) => handleUpdate(editingId, input)}
        />
      )}
    </>
  );
}

function LessonFields({
  form,
  onChange,
}: {
  form: LessonInput;
  onChange: (value: LessonInput) => void;
}) {
  return (
    <>
      <div className={`${adminStyles.formGrid} ${adminStyles.formGrid2}`}>
        <div className={adminStyles.field}>
          <label className={adminStyles.label}>Title</label>
          <input
            className={adminStyles.input}
            required
            value={form.title}
            onChange={(e) => onChange({ ...form, title: e.target.value })}
          />
        </div>
        <div className={adminStyles.field}>
          <label className={adminStyles.label}>Order</label>
          <input
            className={adminStyles.input}
            type="number"
            min={1}
            required
            value={form.order_number}
            onChange={(e) =>
              onChange({ ...form, order_number: Number(e.target.value) })
            }
          />
        </div>
      </div>
      <div className={adminStyles.field}>
        <label className={adminStyles.label}>Description</label>
        <textarea
          className={adminStyles.textarea}
          required
          value={form.description}
          onChange={(e) => onChange({ ...form, description: e.target.value })}
        />
      </div>
      <div className={adminStyles.field}>
        <label className={adminStyles.label}>Video URL (optional)</label>
        <input
          className={adminStyles.input}
          value={form.video_url ?? ""}
          onChange={(e) => onChange({ ...form, video_url: e.target.value })}
        />
      </div>
      <div className={adminStyles.field}>
        <label className={adminStyles.label}>Lesson Content</label>
        <ContentEditor
          value={form.content}
          onChange={(content) => onChange({ ...form, content })}
        />
      </div>
    </>
  );
}

function EditLessonPanel({
  lesson,
  loading,
  onClose,
  onSave,
}: {
  lesson: AdminLesson;
  loading: boolean;
  onClose: () => void;
  onSave: (input: LessonInput) => void;
}) {
  const [form, setForm] = useState<LessonInput>({
    title: lesson.title,
    description: lesson.description,
    content: lesson.content,
    order_number: lesson.lesson_order,
    video_url: lesson.video_url ?? "",
  });

  return (
    <section className={adminStyles.section}>
      <div className={adminStyles.card}>
        <h2 className={adminStyles.sectionTitle}>Edit Lesson</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className={adminStyles.formGrid}
        >
          <LessonFields form={form} onChange={setForm} />
          <div className={adminStyles.rowActions}>
            <button
              type="submit"
              className={adminStyles.btnPrimary}
              disabled={loading}
            >
              Save Lesson
            </button>
            <button
              type="button"
              className={adminStyles.btnSecondary}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
