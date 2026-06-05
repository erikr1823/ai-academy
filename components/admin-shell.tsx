import Link from "next/link";
import type { ReactNode } from "react";
import { PortalSignOut } from "@/components/portal-sign-out";
import styles from "./admin-shell.module.css";
import { adminNavLinks, type AdminNavKey } from "@/lib/admin-nav";

export { styles as adminStyles };

export function AdminShell({
  activeKey,
  pageLabel,
  children,
}: {
  activeKey: AdminNavKey;
  pageLabel: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden>
        <div className={styles.glowOrb1} />
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarBrand}>
            <Link href="/admin" className={styles.sidebarLogo}>
              AI <span className={styles.sidebarLogoAccent}>Academy</span>
            </Link>
            <span className={styles.sidebarBadge}>Admin Portal</span>
          </div>
          <nav className={styles.sidebarNav}>
            {adminNavLinks.map((link) => (
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
            <Link href="/dashboard" className={styles.footerLink}>
              ← Student Dashboard
            </Link>
            <PortalSignOut className={styles.signOutBtn} />
          </div>
        </aside>

        <div className={styles.mainCol}>
          <header className={styles.topBar}>
            <div className={styles.topBarInner}>
              <details className={styles.mobileMenu}>
                <summary className={styles.menuSummary}>Admin Menu</summary>
                <div className={styles.mobileDrawer}>
                  <div className={styles.mobileOverlay} />
                  <div className={styles.mobilePanel}>
                    {adminNavLinks.map((link) => (
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
                    <Link href="/dashboard" className={styles.footerLink}>
                      Student Dashboard
                    </Link>
                    <PortalSignOut className={styles.signOutBtn} />
                  </div>
                </div>
              </details>
              <div>
                <p className={styles.topBarEyebrow}>Admin Portal</p>
                <p className={styles.topBarTitle}>{pageLabel}</p>
              </div>
            </div>
          </header>
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </div>
  );
}
