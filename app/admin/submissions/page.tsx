import type { Metadata } from "next";
import { SubmissionReviewer } from "@/components/admin/submission-reviewer";
import { AdminShell, adminStyles } from "@/components/admin-shell";
import { listAdminSubmissions } from "@/lib/assignments-db";

export const metadata: Metadata = {
  title: "Submissions — AI Academy Admin",
  description: "Review student assignment submissions.",
};

export default async function AdminSubmissionsPage() {
  const submissions = await listAdminSubmissions();

  return (
    <AdminShell activeKey="submissions" pageLabel="Submissions">
      <header className={adminStyles.pageHeader}>
        <p className={adminStyles.pageEyebrow}>Student Work</p>
        <h1 className={adminStyles.pageTitle}>Submissions</h1>
        <p className={adminStyles.pageDesc}>
          Review responses, assign grades, and leave feedback.
        </p>
      </header>
      <SubmissionReviewer initialSubmissions={submissions} />
    </AdminShell>
  );
}
