import type { Metadata } from "next";
import Link from "next/link";
import {
  AcademyShell,
  btnSecondaryClass,
  cardClass,
  cardInteractiveClass,
  linkAccentClass,
  PageHeader,
  PageMain,
  SectionHeader,
  TrackBadge,
} from "@/components/academy-shell";
import { achievementBadges, submissions, type SubmissionStatus } from "@/lib/submissions";

export const metadata: Metadata = {
  title: "Submissions — AI Academy",
  description: "View all submitted assignments and earned achievement badges.",
};

function SubmissionStatusBadge({ status }: { status: SubmissionStatus }) {
  const styles: Record<SubmissionStatus, string> = {
    Submitted: "border-zinc-700 bg-zinc-900 text-zinc-300",
    "In Review": "border-amber-500/30 bg-amber-500/10 text-amber-400",
    Approved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    "Needs Revision": "border-red-500/30 bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function SubmissionsPage() {
  return (
    <AcademyShell activeKey="submissions" pageLabel="Submissions">
      <PageMain>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <PageHeader
            label="Assignment Center"
            title="Submissions"
            description="Track submitted assignments, review status, and feedback from your mentor."
          />
          <Link
            href="/assignments"
            className={`shrink-0 self-start ${btnSecondaryClass}`}
          >
            ← Back to Assignments
          </Link>
        </div>

        <section className="mt-10">
          <SectionHeader title="All Submissions" />
          <div className="space-y-4">
            {submissions.map((submission) => (
              <article
                key={submission.id}
                className={`${cardInteractiveClass} p-5 sm:p-6`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <TrackBadge label={submission.track} />
                      <SubmissionStatusBadge status={submission.status} />
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {submission.assignmentTitle}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-zinc-500">
                      <span>Submitted {submission.submittedAt}</span>
                      <span className="font-semibold text-emerald-400">
                        +{submission.xp} XP
                      </span>
                    </div>
                    {submission.feedback && (
                      <p className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm leading-relaxed text-zinc-400">
                        {submission.feedback}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/assignments/${submission.assignmentId}`}
                    className={`shrink-0 ${linkAccentClass}`}
                  >
                    View Assignment →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader title="Achievement Badges" />
          <div className="grid gap-4 sm:grid-cols-2">
            {achievementBadges.map((badge) => (
              <article
                key={badge.id}
                className={`${cardClass} p-5 ${badge.earned ? "" : "opacity-60"}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                      badge.earned
                        ? "bg-emerald-500 text-black"
                        : "border border-zinc-800 bg-zinc-900 text-zinc-600"
                    }`}
                  >
                    {badge.earned ? badge.icon : "?"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-white">
                        {badge.name}
                      </h3>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                          badge.earned
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-zinc-800 text-zinc-600"
                        }`}
                      >
                        {badge.earned ? "Earned" : "Locked"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {badge.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </PageMain>
    </AcademyShell>
  );
}
