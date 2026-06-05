-- Run this in your Neon SQL editor to create the users table.

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  track TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student',
  status TEXT NOT NULL DEFAULT 'pending',
  email_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS users_email_idx ON users (email);

-- Courses, lessons, and progress (Day 3)

CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  video_url TEXT,
  lesson_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  UNIQUE (user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS lessons_course_id_idx ON lessons (course_id);
CREATE INDEX IF NOT EXISTS lessons_course_order_idx ON lessons (course_id, lesson_order);
CREATE INDEX IF NOT EXISTS user_progress_user_id_idx ON user_progress (user_id);
CREATE INDEX IF NOT EXISTS user_progress_lesson_id_idx ON user_progress (lesson_id);

-- Clerk-authenticated students

CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS students_clerk_id_idx ON students (clerk_id);
CREATE INDEX IF NOT EXISTS students_email_idx ON students (email);

-- Admin portal

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admins_clerk_id_idx ON admins (clerk_id);

-- Course builder columns

ALTER TABLE courses ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS track TEXT;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS content JSONB DEFAULT '[]'::jsonb;
CREATE UNIQUE INDEX IF NOT EXISTS courses_slug_unique_idx ON courses (slug) WHERE slug IS NOT NULL;

-- Assignments and submissions

CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  instructions TEXT,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  response TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted',
  feedback TEXT,
  grade TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  UNIQUE (assignment_id, student_id)
);

CREATE INDEX IF NOT EXISTS assignments_course_id_idx ON assignments (course_id);
CREATE INDEX IF NOT EXISTS assignments_lesson_id_idx ON assignments (lesson_id);
CREATE INDEX IF NOT EXISTS submissions_assignment_id_idx ON submissions (assignment_id);
CREATE INDEX IF NOT EXISTS submissions_student_id_idx ON submissions (student_id);
