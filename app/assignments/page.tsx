import type { Metadata } from "next";
import Link from "next/link";
import {
  AcademyShell,
  btnPrimaryClass,
  cardInteractiveClass,
  PageHeader,
  PageMain,
  StatusBadge,
  TrackBadge,
} from "@/components/academy-shell";
import { assignmentSummaries } from "@/lib/assignments";

export const metadata: Metadata = {
  title: "Assignments — AI Academy",
  description: "Complete weekly missions and submit proof of work.",
};

export default function AssignmentsPage() {
  return (
    <AcademyShell activeKey="assignments" pageLabel="Assignments">
      <PageMain>
        <PageHeader
          label="Assignments"
          title="Assignments"
          description="Complete weekly missions and submit proof of work."
        />

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {assignmentSummaries.map((assignment) => (
            <article
              key={assignment.id}
              className={`${cardInteractiveClass} flex flex-col p-6`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <TrackBadge label={assignment.track} />
                <StatusBadge status={assignment.status} />
              </div>

              <h2 className="mt-4 text-xl font-semibold text-white">
                {assignment.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                {assignment.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-zinc-800 pt-5 text-sm">
                {assignment.dueDate && (
                  <span className="text-zinc-500">{assignment.dueDate}</span>
                )}
                <span className="font-semibold text-emerald-400">
                  +{assignment.xp} XP
                </span>
              </div>

              <Link
                href={`/assignments/${assignment.id}`}
                className={`mt-5 w-full ${btnPrimaryClass}`}
              >
                View Assignment
              </Link>
            </article>
          ))}
        </section>
      </PageMain>
    </AcademyShell>
  );
}
