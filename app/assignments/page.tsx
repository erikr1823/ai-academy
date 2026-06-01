import type { Metadata } from "next";
import Link from "next/link";
import { AssignmentCard } from "@/components/assignment-card";
import {
  AcademyShell,
  btnSecondaryClass,
  linkAccentClass,
  PageHeader,
  PageMain,
  SectionHeader,
} from "@/components/academy-shell";
import {
  assignmentListSections,
  getAssignmentsBySection,
} from "@/lib/assignments";

export const metadata: Metadata = {
  title: "Assignment Center — AI Academy",
  description: "Complete weekly missions and submit proof of work.",
};

export default function AssignmentsPage() {
  return (
    <AcademyShell activeKey="assignments" pageLabel="Assignments">
      <PageMain>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <PageHeader
            label="Assignment Center"
            title="Assignments"
            description="Complete weekly missions and submit proof of work."
          />
          <Link
            href="/submissions"
            className={`shrink-0 self-start ${btnSecondaryClass}`}
          >
            View Submissions →
          </Link>
        </div>

        <div className="mt-10 space-y-12">
          {assignmentListSections.map((section) => {
            const assignments = getAssignmentsBySection(section.key);

            return (
              <section key={section.key}>
                <SectionHeader title={section.title} />
                <p className="-mt-2 mb-6 text-sm text-zinc-500">
                  {section.description}
                </p>

                {assignments.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {assignments.map((assignment) => (
                      <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 px-6 py-10 text-center text-sm text-zinc-500">
                    No assignments in this section yet.
                  </p>
                )}
              </section>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500">
          Track submission status and earned badges on the{" "}
          <Link href="/submissions" className={linkAccentClass}>
            Submissions page
          </Link>
          .
        </p>
      </PageMain>
    </AcademyShell>
  );
}
