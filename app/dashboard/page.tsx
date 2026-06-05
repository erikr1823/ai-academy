import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortalSignOut } from "@/components/portal-sign-out";
import styles from "../dashboard.module.css";
import {
  demoFlowSteps,
  getNextDemoStep,
  getPrevDemoStep,
} from "@/lib/demo-flow";
import {
  getActiveUserId,
  getDashboardStats,
  getRecentCourses,
} from "@/lib/courses-db";
import type { CourseWithProgress } from "@/lib/types/courses";

export const metadata: Metadata = {
  title: "Dashboard — AI Academy",
  description: "Your AI Academy learning dashboard.",
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

const DEMO_STEP = 4;

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

function formatJoinDate(date: Date | null): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
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

function StatCard({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: string;
  detail?: string;
  accent?: "green" | "emerald";
}) {
  return (
    <article className={styles.statCard}>
      <div
        className={`${styles.statAccent} ${
          accent === "green"
            ? styles.statAccentGreen
            : accent === "emerald"
              ? styles.statAccentEmerald
              : ""
        }`}
        aria-hidden
      />
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
      {detail && <p className={styles.statDetail}>{detail}</p>}
    </article>
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

export default async function DashboardPage() {
  const userId = await getActiveUserId();
  const stats = await getDashboardStats(userId);
  const recentCourses = await getRecentCourses(userId);
  const welcomeName = stats.first_name ?? stats.user_name?.split(" ")[0] ?? "Student";

  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden>
        <div className={styles.glowOrb1} />
        <div className={styles.glowOrb2} />
      </div>

      <div className={styles.layout}>
        <PortalSidebar activeKey="dashboard" />

        <div className={styles.mainCol}>
          <header className={styles.topBar}>
            <div className={styles.topBarInner}>
              <div className={styles.topBarLeft}>
                <MobileNav activeKey="dashboard" />
                <Link href="/" className={styles.mobileTitle}>
                  AI <span className={styles.sidebarLogoAccent}>Academy</span>
                </Link>
              </div>
              <div className={styles.topBarTitleWrap}>
                <p className={styles.topBarEyebrow}>AI Academy</p>
                <p className={styles.topBarTitle}>Dashboard</p>
              </div>
              <div className={styles.topBarLeft}>
                <span className={styles.pageBadge}>Dashboard</span>
                <Link href="/" className={styles.landingLink}>
                  Landing
                </Link>
              </div>
            </div>
            <DemoFlowBar />
          </header>

          <main className={styles.main}>
            <header className={styles.pageHeader}>
              <p className={styles.pageEyebrow}>Dashboard</p>
              <h1 className={styles.pageTitle}>Welcome back, {welcomeName}</h1>
              <p className={styles.pageDesc}>
                Track your enrolled courses, completed lessons, and current
                learning path.
              </p>
            </header>

            <section className={styles.userInfoCard}>
              <p className={styles.pageEyebrow}>Your Account</p>
              <div className={styles.userInfoGrid}>
                <div>
                  <p className={styles.userInfoItemLabel}>First Name</p>
                  <p className={styles.userInfoItemValue}>
                    {stats.first_name ?? "—"}
                  </p>
                </div>
                <div>
                  <p className={styles.userInfoItemLabel}>Email</p>
                  <p className={styles.userInfoItemValue}>
                    {stats.email ?? "—"}
                  </p>
                </div>
                <div>
                  <p className={styles.userInfoItemLabel}>Member Since</p>
                  <p className={styles.userInfoItemValue}>
                    {formatJoinDate(stats.created_at)}
                  </p>
                </div>
                <div>
                  <p className={styles.userInfoItemLabel}>Lessons Completed</p>
                  <p className={styles.userInfoItemValue}>
                    {stats.lessons_completed}
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.statsGrid}>
              <StatCard
                label="Courses Enrolled"
                value={String(stats.courses_enrolled)}
                detail="Available learning paths"
              />
              <StatCard
                label="Lessons Completed"
                value={String(stats.lessons_completed)}
                detail="Across all courses"
                accent="green"
              />
              <StatCard
                label="Completion Percentage"
                value={`${stats.completion_percent}%`}
                detail="Overall lesson progress"
              />
              <StatCard
                label="Current Track"
                value={stats.current_track ?? "—"}
                detail={
                  stats.current_track
                    ? "Your enrolled learning path"
                    : "Sign up to select a track"
                }
                accent="emerald"
              />
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Recent Courses</h2>
                <Link href="/courses" className={styles.linkAccent}>
                  View all courses
                </Link>
              </div>
              {recentCourses.length > 0 ? (
                <div className={styles.coursesGrid}>
                  {recentCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <article className={styles.emptyCard}>
                  <p className={styles.emptyTitle}>No courses yet</p>
                  <p className={styles.emptyDesc}>
                    Courses are seeded automatically on first load.
                  </p>
                  <Link href="/courses" className={styles.btnPrimary}>
                    Browse courses
                  </Link>
                </article>
              )}
            </section>

            {recentCourses.length > 0 && (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Quick Progress</h2>
                </div>
                <div className={styles.quickGrid}>
                  {recentCourses.map((course) => (
                    <article key={course.id} className={styles.quickCard}>
                      <div className={styles.quickTop}>
                        <div>
                          <span className={styles.badge}>{course.category}</span>
                          <h3 className={styles.quickTitle}>{course.title}</h3>
                          <p className={styles.quickMeta}>
                            {course.completed_count} of {course.lesson_count}{" "}
                            lessons
                          </p>
                        </div>
                        <span className={styles.quickPercent}>
                          {course.progress_percent}%
                        </span>
                      </div>
                      <div className={styles.quickProgress}>
                        <ProgressBar value={course.progress_percent} />
                      </div>
                      <Link
                        href={`/courses/${course.id}`}
                        className={`${styles.linkAccent} ${styles.quickLink}`}
                      >
                        Open course →
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
