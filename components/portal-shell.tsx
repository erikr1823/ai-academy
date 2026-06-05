import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./portal-shell.module.css";
import {
  demoFlowSteps,
  getNextDemoStep,
  getPrevDemoStep,
} from "@/lib/demo-flow";
import { portalNavLinks, type PortalNavKey } from "@/lib/portal-nav";

export { styles as portalStyles };

export function PortalProgressBar({ value }: { value: number }) {
  return (
    <div
      className={styles.progressTrack}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={styles.progressFill} style={{ width: `${value}%` }} />
    </div>
  );
}

function DemoFlowBar({ step }: { step: number }) {
  const current = demoFlowSteps.find((item) => item.step === step);
  const prev = getPrevDemoStep(step);
  const next = getNextDemoStep(step);

  return (
    <div className={styles.demoBar}>
      <div className={styles.demoBarInner}>
        <div>
          <p className={styles.demoLabel}>
            Demo Flow · Step {step} of {demoFlowSteps.length}
          </p>
          <p className={styles.demoCurrent}>
            Current: <strong>{current?.label}</strong>
          </p>
        </div>
        <div className={styles.demoActions}>
          {prev && (
            <Link href={prev.href} className={styles.btnSecondary}>
              ← {prev.label}
            </Link>
          )}
          {next ? (
            <Link href={next.href} className={styles.btnPrimary}>
              Next: {next.label} →
            </Link>
          ) : (
            <Link href="/" className={styles.btnPrimary}>
              Demo Complete · Back to Landing
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function PortalShell({
  activeKey,
  pageLabel,
  children,
  demoStep,
}: {
  activeKey: PortalNavKey;
  pageLabel: string;
  children: ReactNode;
  demoStep?: number;
}) {
  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden>
        <div className={styles.glowOrb1} />
        <div className={styles.glowOrb2} />
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarBrand}>
            <Link href="/" className={styles.sidebarLogo}>
              AI <span className={styles.sidebarLogoAccent}>Academy</span>
            </Link>
          </div>
          <nav className={styles.sidebarNav}>
            {portalNavLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`${styles.sidebarLink} ${
                  link.key === activeKey ? styles.sidebarLinkActive : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className={styles.sidebarFooter}>
            <div className={styles.sidebarCard}>
              <p className={styles.sidebarCardLabel}>Student Portal</p>
              <p className={styles.sidebarCardText}>
                Track courses, complete lessons, and earn certificates.
              </p>
              <Link href="/demo" className={styles.sidebarCardLink}>
                Tour the demo →
              </Link>
            </div>
          </div>
        </aside>

        <div className={styles.mainCol}>
          <header className={styles.topBar}>
            <div className={styles.topBarInner}>
              <div className={styles.topBarLeft}>
                <details className={styles.mobileMenu}>
                  <summary className={styles.menuSummary}>Menu</summary>
                  <div className={styles.mobileDrawer}>
                    <div className={styles.mobileOverlay} />
                    <div className={styles.mobilePanel}>
                      <div className={styles.mobilePanelHeader}>
                        <Link href="/" className={styles.mobileTitle}>
                          AI{" "}
                          <span className={styles.sidebarLogoAccent}>
                            Academy
                          </span>
                        </Link>
                      </div>
                      <nav className={styles.mobilePanelNav}>
                        {portalNavLinks.map((link) => (
                          <Link
                            key={link.key}
                            href={link.href}
                            className={`${styles.sidebarLink} ${
                              link.key === activeKey
                                ? styles.sidebarLinkActive
                                : ""
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </div>
                </details>
                <Link href="/" className={styles.mobileTitle}>
                  AI <span className={styles.sidebarLogoAccent}>Academy</span>
                </Link>
              </div>
              <div className={styles.topBarTitleWrap}>
                <p className={styles.topBarEyebrow}>AI Academy</p>
                <p className={styles.topBarTitle}>{pageLabel}</p>
              </div>
              <div className={styles.topBarLeft}>
                <span className={styles.pageBadge}>{pageLabel}</span>
                <Link href="/" className={styles.landingLink}>
                  Landing
                </Link>
              </div>
            </div>
            {demoStep !== undefined && <DemoFlowBar step={demoStep} />}
          </header>

          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </div>
  );
}
