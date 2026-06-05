import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CertificatePrintButton } from "@/components/certificate-print-button";
import { PortalShell, portalStyles } from "@/components/portal-shell";
import {
  getCertificateByIdForStudent,
  isUuid,
} from "@/lib/certificates-db";
import { getAuthenticatedStudentId } from "@/lib/student-auth";
import styles from "../certificate-detail.module.css";

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatDate(value: Date): string {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const studentId = await getAuthenticatedStudentId();
  if (!studentId) return { title: "Certificate — AI Academy" };

  const certificate = await getCertificateByIdForStudent(id, studentId);
  return {
    title: certificate
      ? `${certificate.title} — AI Academy`
      : "Certificate Not Found — AI Academy",
  };
}

export const dynamic = "force-dynamic";

export default async function CertificateDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (!isUuid(id)) notFound();

  const studentId = await getAuthenticatedStudentId();
  if (!studentId) notFound();

  const certificate = await getCertificateByIdForStudent(id, studentId);
  if (!certificate) notFound();

  return (
    <PortalShell activeKey="certificates" pageLabel="Certificate">
      <Link href="/certificates" className={portalStyles.linkAccent}>
        ← Back to Certificates
      </Link>

      <div className={styles.detailWrap}>
        <div className={styles.printBar}>
          <CertificatePrintButton />
        </div>

        <article className={styles.certificate}>
          <p className={styles.brand}>AI Academy</p>
          <h1 className={styles.brandTitle}>Certificate of Completion</h1>
          <p className={styles.subtitle}>Learn. Build. Deploy.</p>

          <div className={styles.divider} />

          <p className={styles.presented}>This certificate is presented to</p>
          <p className={styles.studentName}>{certificate.student_name}</p>

          <p className={styles.presented} style={{ marginTop: "1.5rem" }}>
            For successfully completing
          </p>
          <p className={styles.certTitle}>{certificate.title}</p>
          <p className={styles.courseTitle}>{certificate.course_title}</p>

          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Issue Date</p>
              <p className={styles.metaValue}>
                {formatDate(certificate.issued_at)}
              </p>
            </div>
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Certificate Code</p>
              <p className={styles.metaValue}>
                {certificate.certificate_code}
              </p>
            </div>
          </div>
        </article>
      </div>
    </PortalShell>
  );
}
