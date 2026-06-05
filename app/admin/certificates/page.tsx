import type { Metadata } from "next";
import { AdminShell, adminStyles } from "@/components/admin-shell";
import { listAdminCertificates } from "@/lib/certificates-db";

export const metadata: Metadata = {
  title: "Certificates — AI Academy Admin",
  description: "View issued course completion certificates.",
};

function formatDate(value: Date): string {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminCertificatesPage() {
  const certificates = await listAdminCertificates();

  return (
    <AdminShell activeKey="certificates" pageLabel="Certificates">
      <header className={adminStyles.pageHeader}>
        <p className={adminStyles.pageEyebrow}>Completion Awards</p>
        <h1 className={adminStyles.pageTitle}>Issued Certificates</h1>
        <p className={adminStyles.pageDesc}>
          Certificates auto-issued when students complete 100% of course
          lessons.
        </p>
      </header>

      <section className={adminStyles.statsGrid}>
        <div className={adminStyles.statCard}>
          <p className={adminStyles.statLabel}>Total Issued</p>
          <p className={adminStyles.statValue}>{certificates.length}</p>
        </div>
      </section>

      <section className={adminStyles.section}>
        <div className={adminStyles.tableWrap}>
          <table className={adminStyles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Certificate</th>
                <th>Issue Date</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              {certificates.length === 0 ? (
                <tr>
                  <td colSpan={5}>No certificates issued yet.</td>
                </tr>
              ) : (
                certificates.map((cert) => (
                  <tr key={cert.id}>
                    <td>
                      <div>{cert.student_name}</div>
                      <div style={{ color: "#71717a", fontSize: "0.75rem" }}>
                        {cert.student_email}
                      </div>
                    </td>
                    <td>{cert.course_title}</td>
                    <td>{cert.title}</td>
                    <td>{formatDate(cert.issued_at)}</td>
                    <td>{cert.certificate_code}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
