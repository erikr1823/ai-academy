export const adminNavLinks = [
  { label: "Dashboard", href: "/admin", key: "dashboard" },
  { label: "Courses", href: "/admin/courses", key: "courses" },
  { label: "Assignments", href: "/admin/assignments", key: "assignments" },
  { label: "Submissions", href: "/admin/submissions", key: "submissions" },
  { label: "Students", href: "/admin/students", key: "students" },
  { label: "Analytics", href: "/admin/analytics", key: "analytics" },
] as const;

export type AdminNavKey = (typeof adminNavLinks)[number]["key"];
