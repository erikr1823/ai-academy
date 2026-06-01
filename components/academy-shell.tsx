import Link from "next/link";
import type { ReactNode } from "react";
import {
  demoFlowSteps,
  getNextDemoStep,
  getPrevDemoStep,
} from "@/lib/demo-flow";

export type NavKey =
  | "dashboard"
  | "choose-track"
  | "onboarding"
  | "demo"
  | "essentials"
  | "builder"
  | "courses"
  | "assignments"
  | "submissions"
  | "projects"
  | "mentor"
  | "workplace-simulator"
  | "certificates"
  | "roadmap"
  | "admin"
  | "settings";

export const academyNavLinks: {
  label: string;
  href: string;
  key: NavKey;
}[] = [
  { label: "Dashboard", href: "/dashboard", key: "dashboard" },
  { label: "Choose Track", href: "/choose-track", key: "choose-track" },
  { label: "Onboarding", href: "/onboarding", key: "onboarding" },
  { label: "Demo", href: "/demo", key: "demo" },
  { label: "Courses", href: "/courses", key: "courses" },
  { label: "Assignments", href: "/assignments", key: "assignments" },
  { label: "Submissions", href: "/submissions", key: "submissions" },
  { label: "Projects", href: "/projects", key: "projects" },
  { label: "AI Mentor", href: "/mentor", key: "mentor" },
  {
    label: "Workplace Simulator",
    href: "/workplace-simulator",
    key: "workplace-simulator",
  },
  { label: "Certificates", href: "/certificates", key: "certificates" },
  { label: "Roadmap", href: "/roadmap", key: "roadmap" },
  { label: "Admin", href: "/admin", key: "admin" },
];

export const pageMainClass =
  "mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8";

export const cardClass =
  "rounded-2xl border border-zinc-800 bg-zinc-950";

export const cardInteractiveClass =
  "rounded-2xl border border-zinc-800 bg-zinc-950 transition-all duration-200 hover:border-emerald-500/30";

export const btnPrimaryClass =
  "inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]";

export const btnSecondaryClass =
  "inline-flex items-center justify-center rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-emerald-500/50 hover:text-emerald-400";

export const linkAccentClass =
  "text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300";

export const sectionTitleClass = "text-xl font-semibold text-white";

function isNavActive(linkKey: NavKey, activeKey: NavKey) {
  if (linkKey === activeKey) return true;
  if (
    activeKey === "courses" &&
    (linkKey === "essentials" || linkKey === "builder")
  ) {
    return true;
  }
  return false;
}

function DemoFlowBar({ step }: { step: number }) {
  const current = demoFlowSteps.find((item) => item.step === step);
  const prev = getPrevDemoStep(step);
  const next = getNextDemoStep(step);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
          Demo Flow · Step {step} of {demoFlowSteps.length}
        </p>
        <p className="mt-1 truncate text-sm text-zinc-300">
          Current: <span className="text-white">{current?.label}</span>
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {prev && (
          <Link href={prev.href} className={btnSecondaryClass}>
            ← {prev.label}
          </Link>
        )}
        {next ? (
          <Link href={next.href} className={btnPrimaryClass}>
            Next: {next.label} →
          </Link>
        ) : (
          <Link href="/" className={btnPrimaryClass}>
            Demo Complete · Back to Landing
          </Link>
        )}
      </div>
    </div>
  );
}

function Sidebar({
  activeKey,
  className = "",
}: {
  activeKey: NavKey;
  className?: string;
}) {
  return (
    <aside
      className={`flex w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 ${className}`}
    >
      <div className="border-b border-zinc-800 px-6 py-5">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white transition-colors hover:text-emerald-400"
        >
          AI <span className="text-emerald-400">Academy</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        {academyNavLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              isNavActive(link.key, activeKey)
                ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <span className="mt-2 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600">
          Settings
        </span>
      </nav>

      <div className="border-t border-zinc-800 p-4">
        <div className={`${cardInteractiveClass} p-4`}>
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
            Demo Mode
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Mock data only. Follow the demo flow banner to tour the MVP.
          </p>
          <Link href="/choose-track" className={`mt-3 ${linkAccentClass}`}>
            Restart demo →
          </Link>
        </div>
      </div>
    </aside>
  );
}

export function AcademyShell({
  activeKey,
  pageLabel,
  children,
  fullWidth = false,
  demoStep,
}: {
  activeKey: NavKey;
  pageLabel: string;
  children: ReactNode;
  fullWidth?: boolean;
  demoStep?: number;
}) {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-emerald-400/5 blur-[80px]" />
      </div>

      <div className="relative flex min-h-screen">
        <Sidebar activeKey={activeKey} className="hidden lg:flex" />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
            <div className="flex items-center justify-between px-4 py-4 lg:px-8">
              <div className="lg:hidden">
                <Link href="/" className="text-base font-semibold text-white">
                  AI <span className="text-emerald-400">Academy</span>
                </Link>
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                  AI Academy
                </p>
                <p className="text-lg font-semibold text-white">{pageLabel}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 lg:hidden">
                  {pageLabel}
                </span>
                <Link
                  href="/"
                  className={`hidden sm:inline-flex ${btnSecondaryClass} px-3 py-1.5 text-xs`}
                >
                  Landing
                </Link>
              </div>
            </div>

            <nav className="flex gap-2 overflow-x-auto border-t border-zinc-800/80 px-4 py-3 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {academyNavLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    isNavActive(link.key, activeKey)
                      ? "bg-emerald-500 text-black"
                      : "border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-emerald-500/30 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {demoStep !== undefined && (
              <div className="border-t border-zinc-800/80 px-4 py-4 lg:px-8">
                <DemoFlowBar step={demoStep} />
              </div>
            )}
          </header>

          <div className={fullWidth ? "flex min-h-0 flex-1 flex-col" : undefined}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageMain({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={`${pageMainClass} ${className}`}>{children}</main>;
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="h-2 overflow-hidden rounded-full bg-zinc-800"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-emerald-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Complete" ||
    status === "Completed" ||
    status === "Earned"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      : status === "Review" || status === "In Review"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
        : status === "Submitted"
          ? "border-zinc-700 bg-zinc-900 text-zinc-300"
          : status === "Approved"
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            : status === "Needs Revision"
              ? "border-red-500/30 bg-red-500/10 text-red-400"
              : status === "In Progress"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
          : status === "Not Started"
            ? "border-zinc-800 bg-zinc-950 text-zinc-500"
            : "border-zinc-700 bg-zinc-900 text-zinc-300";

  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
}

export function TrackBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
      {label}
    </span>
  );
}

export function PageHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section>
      <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
        {label}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-base text-zinc-400 sm:text-lg">
        {description}
      </p>
    </section>
  );
}

export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className={sectionTitleClass}>{title}</h2>
      {action}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className={`${cardClass} border-dashed p-8 text-center`}>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
