export type Student = {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: Date;
};

export type StudentProfile = {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  full_name: string;
  created_at: Date;
  current_track: string | null;
  courses_enrolled: number;
  lessons_completed: number;
  completion_percent: number;
  certificates_earned: number;
};
