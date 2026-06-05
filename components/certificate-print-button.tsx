"use client";

import styles from "@/app/certificates/certificate-detail.module.css";

export function CertificatePrintButton() {
  return (
    <button
      type="button"
      className={styles.printBtn}
      onClick={() => window.print()}
    >
      Print / Download PDF
    </button>
  );
}
