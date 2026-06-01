import type { Metadata } from "next";
import Link from "next/link";
import {
  AcademyShell,
  btnPrimaryClass,
  btnSecondaryClass,
  cardClass,
  PageHeader,
  PageMain,
  ProgressBar,
  SectionHeader,
} from "@/components/academy-shell";
import {
  adminStats,
  builderOverview,
  essentialsOverview,
  recentAlerts,
  simulatorOverview,
  students,
  type StudentStatus,
} from "@/lib/admin-mock";

export const metadata: Metadata = {
  title: "Admin Dashboard — AI Academy",
  description: "Manage students, tracks, assignments, and progress.",
};

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className={`${cardClass} p-5`}>
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">{value}</p>
    </div>
  );
}

function StudentStatusBadge({ status }: { status: StudentStatus }) {
  const styles: Record<StudentStatus, string> = {
    Active: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    "Needs Help": "border-amber-500/30 bg-amber-500/10 text-amber-400",
    Inactive: "border-zinc-700 bg-zinc-900 text-zinc-500",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function StudentTable() {
  return (
    <>
      {/* Desktop table */}
      <div className={`${cardClass} hidden overflow-x-auto md:block`}>
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
              <th className="px-5 py-4 font-medium">Student</th>
              <th className="px-5 py-4 font-medium">Track</th>
              <th className="px-5 py-4 font-medium">Current Week</th>
              <th className="px-5 py-4 font-medium">Progress</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Last Active</th>
              <th className="px-5 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-b border-zinc-800/80 last:border-0"
              >
                <td className="px-5 py-4 font-medium text-white">
                  {student.name}
                </td>
                <td className="px-5 py-4 text-zinc-400">{student.track}</td>
                <td className="px-5 py-4 text-zinc-300">
                  Week {student.currentWeek}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24">
                      <ProgressBar value={student.progress} />
                    </div>
                    <span className="text-zinc-400">{student.progress}%</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <StudentStatusBadge status={student.status} />
                </td>
                <td className="px-5 py-4 text-zinc-500">{student.lastActive}</td>
                <td className="px-5 py-4">
                  <Link href="/dashboard" className={btnSecondaryClass}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-4 md:hidden">
        {students.map((student) => (
          <article key={student.id} className={`${cardClass} p-5`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-white">{student.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">{student.track}</p>
              </div>
              <StudentStatusBadge status={student.status} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-zinc-500">Current Week</p>
                <p className="mt-1 text-zinc-300">Week {student.currentWeek}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Last Active</p>
                <p className="mt-1 text-zinc-300">{student.lastActive}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-zinc-500">Progress</span>
                <span className="text-zinc-300">{student.progress}%</span>
              </div>
              <ProgressBar value={student.progress} />
            </div>
            <Link href="/dashboard" className={`mt-4 inline-flex ${btnSecondaryClass}`}>
              View
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}

export default function AdminPage() {
  return (
    <AcademyShell activeKey="admin" pageLabel="Admin" demoStep={10}>
      <PageMain>
        <PageHeader
          label="Admin"
          title="Admin Dashboard"
          description="Manage students, tracks, assignments, and progress."
        />

        <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total Students" value={adminStats.totalStudents} />
          <StatCard label="Active This Week" value={adminStats.activeThisWeek} />
          <StatCard
            label="Average Completion"
            value={`${adminStats.averageCompletion}%`}
          />
          <StatCard
            label="Certificates Earned"
            value={adminStats.certificatesEarned}
          />
        </section>

        <section className="mt-10">
          <SectionHeader title="Students" />
          <StudentTable />
        </section>

        <section className="mt-10">
          <SectionHeader title="Assignment Management" />
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button type="button" className={btnPrimaryClass}>
              Create Assignment
            </button>
            <button type="button" className={btnSecondaryClass}>
              Review Submissions
            </button>
            <button type="button" className={btnSecondaryClass}>
              Send Announcement
            </button>
          </div>
        </section>

        <section className="mt-10">
          <SectionHeader title="Track Overview" />
          <div className="grid gap-4 lg:grid-cols-3">
            <article className={`${cardClass} p-6`}>
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                Track
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {essentialsOverview.name}
              </h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Enrolled</span>
                  <span className="text-zinc-300">{essentialsOverview.enrolled}</span>
                </div>
                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-zinc-500">Avg. progress</span>
                    <span className="text-emerald-400">
                      {essentialsOverview.avgProgress}%
                    </span>
                  </div>
                  <ProgressBar value={essentialsOverview.avgProgress} />
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Completions this month</span>
                  <span className="text-zinc-300">
                    {essentialsOverview.completionsThisMonth}
                  </span>
                </div>
              </div>
            </article>

            <article className={`${cardClass} p-6`}>
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                Track
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {builderOverview.name}
              </h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Enrolled</span>
                  <span className="text-zinc-300">{builderOverview.enrolled}</span>
                </div>
                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-zinc-500">Avg. progress</span>
                    <span className="text-emerald-400">{builderOverview.avgProgress}%</span>
                  </div>
                  <ProgressBar value={builderOverview.avgProgress} />
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Completions this month</span>
                  <span className="text-zinc-300">{builderOverview.completionsThisMonth}</span>
                </div>
              </div>
            </article>

            <article className={`${cardClass} p-6`}>
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                Tool Usage
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {simulatorOverview.name}
              </h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Sessions this month</span>
                  <span className="text-zinc-300">{simulatorOverview.usageSessions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Active users</span>
                  <span className="text-zinc-300">{simulatorOverview.activeUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Top role</span>
                  <span className="text-emerald-400">{simulatorOverview.topRole}</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="mt-10">
          <SectionHeader title="Recent Alerts" />
          <div className={`${cardClass} divide-y divide-zinc-800`}>
            {recentAlerts.map((alert) => (
              <div
                key={alert}
                className="flex items-start gap-3 px-5 py-4 text-sm text-zinc-300"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                {alert}
              </div>
            ))}
          </div>
        </section>
      </PageMain>
    </AcademyShell>
  );
}
