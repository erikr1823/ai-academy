import type { LessonContentBlock } from "@/lib/types/lesson-content";

export type AdminCourse = {
  id: string;
  title: string;
  slug: string | null;
  description: string;
  difficulty: string;
  category: string;
  image_url: string | null;
  track: string | null;
  created_at: Date;
  lesson_count?: number;
};

export type AdminLesson = {
  id: string;
  course_id: string;
  title: string;
  description: string;
  video_url: string | null;
  lesson_order: number;
  content: LessonContentBlock[];
  created_at: Date;
};

export type AdminDashboardStats = {
  total_students: number;
  total_courses: number;
  total_lessons: number;
  total_progress_records: number;
  recent_signups: {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    created_at: Date;
  }[];
};

export type AdminStudentRow = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  full_name: string;
  created_at: Date;
  progress_percent: number;
  courses_enrolled: number;
  lessons_completed: number;
};

export type AdminAnalytics = {
  total_users: number;
  active_users: number;
  course_completion_rates: {
    course_id: string;
    title: string;
    completion_rate: number;
    enrolled_students: number;
  }[];
  most_popular_course: {
    course_id: string;
    title: string;
    progress_count: number;
  } | null;
};

export type CourseInput = {
  title: string;
  slug: string;
  description: string;
  level: string;
  category: string;
  image_url?: string | null;
  track: string;
};

export type LessonInput = {
  title: string;
  description: string;
  content: LessonContentBlock[];
  order_number: number;
  video_url?: string | null;
};
