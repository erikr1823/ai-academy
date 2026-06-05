"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminStyles } from "@/components/admin-shell";
import type { AdminCourse, CourseInput } from "@/lib/types/admin";

const emptyCourse: CourseInput = {
  title: "",
  slug: "",
  description: "",
  level: "Beginner",
  category: "AI",
  image_url: "",
  track: "Essentials",
};

type CourseManagerProps = {
  initialCourses: AdminCourse[];
};

export function CourseManager({ initialCourses }: CourseManagerProps) {
  const router = useRouter();
  const [courses, setCourses] = useState(initialCourses);
  const [form, setForm] = useState<CourseInput>(emptyCourse);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/admin/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = (await response.json()) as {
      success: boolean;
      error?: string;
      id?: string;
    };

    setLoading(false);
    if (!response.ok || !data.success) {
      setError(data.error ?? "Failed to create course.");
      return;
    }

    setForm(emptyCourse);
    setMessage("Course created.");
    router.refresh();
    const listResponse = await fetch("/api/admin/courses");
    const listData = (await listResponse.json()) as {
      success: boolean;
      courses?: AdminCourse[];
    };
    if (listData.courses) setCourses(listData.courses);
  }

  async function handleUpdate(courseId: string, input: CourseInput) {
    setLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch(`/api/admin/courses/${courseId}`, {
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
      setError(data.error ?? "Failed to update course.");
      return;
    }

    setEditingId(null);
    setMessage("Course updated.");
    router.refresh();
    const listResponse = await fetch("/api/admin/courses");
    const listData = (await listResponse.json()) as {
      success: boolean;
      courses?: AdminCourse[];
    };
    if (listData.courses) setCourses(listData.courses);
  }

  async function handleDelete(courseId: string, title: string) {
    if (!confirm(`Delete course "${title}" and all its lessons?`)) return;

    setLoading(true);
    setError(null);
    const response = await fetch(`/api/admin/courses/${courseId}`, {
      method: "DELETE",
    });
    const data = (await response.json()) as { success: boolean };
    setLoading(false);

    if (!response.ok || !data.success) {
      setError("Failed to delete course.");
      return;
    }

    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    setMessage("Course deleted.");
    router.refresh();
  }

  return (
    <>
      <section className={adminStyles.card}>
        <h2 className={adminStyles.sectionTitle}>Create Course</h2>
        <form onSubmit={handleCreate} className={adminStyles.formGrid}>
          <CourseFields form={form} onChange={setForm} />
          <button
            type="submit"
            className={adminStyles.btnPrimary}
            disabled={loading}
          >
            Create Course
          </button>
        </form>
      </section>

      {error && <p className={adminStyles.error}>{error}</p>}
      {message && <p className={adminStyles.success}>{message}</p>}

      <section className={adminStyles.section}>
        <h2 className={adminStyles.sectionTitle}>All Courses</h2>
        <div className={adminStyles.tableWrap}>
          <table className={adminStyles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Level</th>
                <th>Track</th>
                <th>Lessons</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={6}>No courses yet.</td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.title}</td>
                    <td>{course.slug ?? "—"}</td>
                    <td>{course.difficulty}</td>
                    <td>{course.track ?? "—"}</td>
                    <td>{course.lesson_count ?? 0}</td>
                    <td>
                      <div className={adminStyles.rowActions}>
                        <Link
                          href={`/admin/courses/${course.id}`}
                          className={adminStyles.linkAccent}
                        >
                          Lessons
                        </Link>
                        <button
                          type="button"
                          className={adminStyles.btnSecondary}
                          onClick={() => setEditingId(course.id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className={adminStyles.btnDanger}
                          onClick={() => handleDelete(course.id, course.title)}
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
        <EditCourseModal
          course={courses.find((c) => c.id === editingId)!}
          loading={loading}
          onClose={() => setEditingId(null)}
          onSave={(input) => handleUpdate(editingId, input)}
        />
      )}
    </>
  );
}

function CourseFields({
  form,
  onChange,
}: {
  form: CourseInput;
  onChange: (value: CourseInput) => void;
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
          <label className={adminStyles.label}>Slug</label>
          <input
            className={adminStyles.input}
            placeholder="auto-generated if empty"
            value={form.slug}
            onChange={(e) => onChange({ ...form, slug: e.target.value })}
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
      <div className={`${adminStyles.formGrid} ${adminStyles.formGrid2}`}>
        <div className={adminStyles.field}>
          <label className={adminStyles.label}>Level</label>
          <select
            className={adminStyles.select}
            value={form.level}
            onChange={(e) => onChange({ ...form, level: e.target.value })}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div className={adminStyles.field}>
          <label className={adminStyles.label}>Category</label>
          <input
            className={adminStyles.input}
            required
            value={form.category}
            onChange={(e) => onChange({ ...form, category: e.target.value })}
          />
        </div>
        <div className={adminStyles.field}>
          <label className={adminStyles.label}>Track</label>
          <input
            className={adminStyles.input}
            required
            value={form.track}
            onChange={(e) => onChange({ ...form, track: e.target.value })}
          />
        </div>
        <div className={adminStyles.field}>
          <label className={adminStyles.label}>Image URL</label>
          <input
            className={adminStyles.input}
            value={form.image_url ?? ""}
            onChange={(e) => onChange({ ...form, image_url: e.target.value })}
          />
        </div>
      </div>
    </>
  );
}

function EditCourseModal({
  course,
  loading,
  onClose,
  onSave,
}: {
  course: AdminCourse;
  loading: boolean;
  onClose: () => void;
  onSave: (input: CourseInput) => void;
}) {
  const [form, setForm] = useState<CourseInput>({
    title: course.title,
    slug: course.slug ?? "",
    description: course.description,
    level: course.difficulty,
    category: course.category,
    image_url: course.image_url ?? "",
    track: course.track ?? "",
  });

  return (
    <section className={adminStyles.section}>
      <div className={adminStyles.card}>
        <h2 className={adminStyles.sectionTitle}>Edit Course</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className={adminStyles.formGrid}
        >
          <CourseFields form={form} onChange={setForm} />
          <div className={adminStyles.rowActions}>
            <button
              type="submit"
              className={adminStyles.btnPrimary}
              disabled={loading}
            >
              Save Changes
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
