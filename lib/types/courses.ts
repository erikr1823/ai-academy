export type CourseRow = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  image_url: string | null;
  created_at: Date;
};

import type { LessonContentBlock } from "@/lib/types/lesson-content";

export type LessonRow = {
  id: string;
  course_id: string;
  title: string;
  description: string;
  video_url: string | null;
  lesson_order: number;
  content?: LessonContentBlock[];
  created_at: Date;
};

export type UserProgressRow = {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: Date | null;
};

export type CourseWithProgress = CourseRow & {
  lesson_count: number;
  completed_count: number;
  progress_percent: number;
};

export type LessonWithProgress = LessonRow & {
  completed: boolean;
  completed_at: Date | null;
};

export type CourseDetail = CourseRow & {
  lessons: LessonWithProgress[];
  lesson_count: number;
  completed_count: number;
  progress_percent: number;
};

export type DashboardStats = {
  courses_enrolled: number;
  lessons_completed: number;
  completion_percent: number;
  current_track: string | null;
  user_name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  created_at: Date | null;
  certificates_earned: number;
};
