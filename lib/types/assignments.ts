export type Assignment = {
  id: string;
  course_id: string;
  lesson_id: string | null;
  title: string;
  instructions: string | null;
  due_date: Date | null;
  created_at: Date;
};

export type AssignmentWithCourse = Assignment & {
  course_title: string;
  lesson_title: string | null;
};

export type StudentAssignmentRow = AssignmentWithCourse & {
  submission_status: string | null;
  submitted_at: Date | null;
};

export type Submission = {
  id: string;
  assignment_id: string;
  student_id: string;
  response: string;
  status: string;
  feedback: string | null;
  grade: string | null;
  submitted_at: Date;
  reviewed_at: Date | null;
};

export type SubmissionWithAssignment = Submission & {
  assignment: AssignmentWithCourse;
};

export type AdminSubmissionRow = Submission & {
  student_name: string;
  student_email: string;
  assignment_title: string;
  course_title: string;
};

export type AssignmentInput = {
  course_id: string;
  lesson_id?: string | null;
  title: string;
  instructions?: string | null;
  due_date?: string | null;
};

export type SubmissionReviewInput = {
  feedback?: string | null;
  grade?: string | null;
  status?: string;
};
