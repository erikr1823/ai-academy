import type { Metadata } from "next";
import Link from "next/link";
import styles from "../../login.module.css";
import { LoginForm } from "../login-form";

export const metadata: Metadata = {
  title: "Login — AI Academy",
  description: "Log in to your AI Academy account.",
};

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
];

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden>
        <div className={styles.glowOrb} />
      </div>

      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            AI <span className={styles.logoAccent}>Academy</span>
          </Link>

          <div className={styles.navCenter}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.navActions}>
            <Link href="/login" className={styles.loginLink}>
              Login
            </Link>
            <Link href="/signup" className={styles.btnPrimary}>
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.wrap}>
          <div className={styles.hero}>
            <p className={styles.eyebrow}>Login</p>
            <h1 className={styles.title}>Welcome back</h1>
            <p className={styles.subtitle}>
              Sign in to access your dashboard, courses, and learning progress.
            </p>
          </div>

          <LoginForm />

          <Link href="/" className={styles.backLink}>
            <span>← Back to home</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
