import { getDashboardStats } from "@/lib/courses-db";
import { getAuthenticatedStudent } from "@/lib/student-auth";
import type { StudentProfile } from "@/lib/types/student";

export async function getStudentProfile(): Promise<StudentProfile | null> {
  const student = await getAuthenticatedStudent();
  if (!student) return null;

  const stats = await getDashboardStats(student.id);

  const fullName =
    [student.first_name, student.last_name].filter(Boolean).join(" ") ||
    student.email;

  return {
    id: student.id,
    clerk_id: student.clerk_id,
    email: student.email,
    first_name: student.first_name,
    last_name: student.last_name,
    full_name: fullName,
    created_at: student.created_at,
    current_track: stats.current_track,
    courses_enrolled: stats.courses_enrolled,
    lessons_completed: stats.lessons_completed,
    completion_percent: stats.completion_percent,
    certificates_earned: stats.certificates_earned,
  };
}
