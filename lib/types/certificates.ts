export type Certificate = {
  id: string;
  student_id: string;
  course_id: string;
  title: string;
  certificate_code: string;
  issued_at: Date;
};

export type CertificateWithDetails = Certificate & {
  course_title: string;
  student_name: string;
  student_email: string;
};

export type CourseCertificateStatus = {
  course_id: string;
  course_title: string;
  progress_percent: number;
  completed_count: number;
  lesson_count: number;
  certificate: Certificate | null;
  status: "earned" | "in_progress" | "locked";
};

export type AdminCertificateRow = Certificate & {
  student_name: string;
  student_email: string;
  course_title: string;
};
