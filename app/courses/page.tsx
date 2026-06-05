import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortalSignOut } from "@/components/portal-sign-out";
import styles from "../courses.module.css";
import {
  demoFlowSteps,
  getNextDemoStep,
  getPrevDemoStep,
} from "@/lib/demo-flow";
import { getCoursesWithProgress } from "@/lib/courses-db";
import type { CourseWithProgress } from "@/lib/types/courses";

export const metadata: Metadata = {
  title: "Courses — AI Academy",
  description: "Browse AI Essentials and AI Builder Academy courses.",
};

export const dynamic = "force-dynamic";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", key: "dashboard" },
  { label: "Courses", href: "/courses", key: "courses" },
  { label: "Assignments", href: "/assignments", key: "assignments" },
  { label: "Roadmap", href: "/roadmap", key: "roadmap" },
  { label: "Certificates", href: "/certificates", key: "certificates" },
  { label: "Profile", href: "/profile", key: "profile" },
];

const DEMO_STEP = 5;

function ProgressBar({ value }: { value: number }) {
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

function PortalSidebar({ activeKey }: { activeKey: string }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <Link href="/" className={styles.sidebarLogo}>
          AI <span className={styles.sidebarLogoAccent}>Academy</span>
        </Link>
      </div>
      <nav className={styles.sidebarNav}>
        {navLinks.map((link) => (
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
          <PortalSignOut className={styles.signOutBtn} />
        </div>
      </div>
    </aside>
  );
}

function MobileNav({ activeKey }: { activeKey: string }) {
  return (
    <details className={styles.mobileMenu}>
      <summary className={styles.menuSummary}>Menu</summary>
      <div className={styles.mobileDrawer}>
        <div className={styles.mobileOverlay} />
        <div className={styles.mobilePanel}>
          <div className={styles.mobilePanelHeader}>
            <Link href="/" className={styles.mobileTitle}>
              AI <span className={styles.sidebarLogoAccent}>Academy</span>
            </Link>
          </div>
          <nav className={styles.mobilePanelNav}>
            {navLinks.map((link) => (
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
            <PortalSignOut className={styles.signOutBtn} />
          </nav>
        </div>
      </div>
    </details>
  );
}

function DemoFlowBar() {
  const current = demoFlowSteps.find((item) => item.step === DEMO_STEP);
  const prev = getPrevDemoStep(DEMO_STEP);
  const next = getNextDemoStep(DEMO_STEP);

  return (
    <div className={styles.demoBar}>
      <div className={styles.demoBarInner}>
        <div>
          <p className={styles.demoLabel}>
            Demo Flow · Step {DEMO_STEP} of {demoFlowSteps.length}
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

function CourseCard({ course }: { course: CourseWithProgress }) {
  return (
    <article className={styles.courseCard}>
      <div className={styles.courseImageWrap}>
        {course.image_url ? (
          <Image
            src={course.image_url}
            alt={course.title}
            fill
            className={styles.courseImage}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className={styles.courseImageFallback}>AI</div>
        )}
        <div className={styles.courseImageOverlay} />
        <div className={styles.courseBadges}>
          <span className={styles.badge}>{course.category}</span>
          <span className={`${styles.badge} ${styles.badgeMuted}`}>
            {course.difficulty}
          </span>
        </div>
      </div>
      <div className={styles.courseBody}>
        <h3 className={styles.courseTitle}>{course.title}</h3>
        <p className={styles.courseDesc}>{course.description}</p>
        <div className={styles.progressMeta}>
          <span className={styles.progressLabel}>Progress</span>
          <span className={styles.progressValue}>{course.progress_percent}%</span>
        </div>
        <ProgressBar value={course.progress_percent} />
        <p className={styles.progressSub}>
          {course.completed_count} of {course.lesson_count} lessons complete
        </p>
        <Link
          href={`/courses/${course.id}`}
          className={`${styles.btnPrimary} ${styles.courseCta}`}
        >
          {course.progress_percent > 0 ? "Continue" : "Start Course"}
        </Link>
      </div>
    </article>
  );
}

export default async function CoursesPage() {
  const courses = await getCoursesWithProgress();

  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden>
        <div className={styles.glowOrb1} />
        <div className={styles.glowOrb2} />
      </div>

      <div className={styles.layout}>
        <PortalSidebar activeKey="courses" />

        <div className={styles.mainCol}>
          <header className={styles.topBar}>
            <div className={styles.topBarInner}>
              <div className={styles.topBarLeft}>
                <MobileNav activeKey="courses" />
                <Link href="/" className={styles.mobileTitle}>
                  AI <span className={styles.sidebarLogoAccent}>Academy</span>
                </Link>
              </div>
              <div className={styles.topBarTitleWrap}>
                <p className={styles.topBarEyebrow}>AI Academy</p>
                <p className={styles.topBarTitle}>Courses</p>
              </div>
              <div className={styles.topBarLeft}>
                <span className={styles.pageBadge}>Courses</span>
                <Link href="/" className={styles.landingLink}>
                  Landing
                </Link>
              </div>
            </div>
            <DemoFlowBar />
          </header>

          <main className={styles.main}>
            <header className={styles.pageHeader}>
              <p className={styles.pageEyebrow}>Courses</p>
              <h1 className={styles.pageTitle}>Your courses</h1>
              <p className={styles.pageDesc}>
                Learn at your own pace. Track progress across AI Essentials and
                AI Builder Academy.
              </p>
            </header>

            <section className={styles.coursesGrid}>
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
