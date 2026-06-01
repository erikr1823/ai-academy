import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssignmentSubmitProof } from "@/components/assignment-submit-proof";
import {
  AcademyShell,
  btnPrimaryClass,
  cardClass,
  linkAccentClass,
  PageMain,
  SectionHeader,
  StatusBadge,
  TrackBadge,
} from "@/components/academy-shell";
import {
  getAllAssignmentIds,
  getAssignmentById,
  type ChecklistStatus,
} from "@/lib/assignments";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllAssignmentIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const assignment = getAssignmentById(id);

  if (!assignment) {
    return { title: "Assignment Not Found — AI Academy" };
  }

  return {
    title: `${assignment.title} — AI Academy`,
    description: assignment.missionBrief,
  };
}

function ChecklistIcon({ status }: { status: ChecklistStatus }) {
  if (status === "complete") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-black">
        ✓
      </span>
    );
  }

  if (status === "in_progress") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-500/10 text-[10px] font-bold text-emerald-400">
        …
      </span>
    );
  }

  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-[10px] text-zinc-600">
      ○
    </span>
  );
}

function checklistLabel(status: ChecklistStatus) {
  if (status === "complete") return "Complete";
  if (status === "in_progress") return "In Progress";
  return "Not Started";
}

export default async function AssignmentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const assignment = getAssignmentById(id);

  if (!assignment) notFound();

  const isSubmitted =
    assignment.status === "Completed" || assignment.status === "In Review";

  return (
    <AcademyShell activeKey="assignments" pageLabel="Assignment">
      <PageMain>
        <Link href="/assignments" className={`inline-flex ${linkAccentClass}`}>
          ← Back to Assignments
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <TrackBadge label={assignment.track} />
            <StatusBadge status={assignment.status} />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {assignment.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-400">
            {assignment.dueDate && <span>{assignment.dueDate}</span>}
            <span className="font-semibold text-emerald-400">
              +{assignment.xp} XP
            </span>
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Mission Brief" />
              <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                {assignment.missionBrief}
              </p>
            </section>

            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Instructions" />
              <ol className="space-y-4">
                {assignment.instructions.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-sm font-bold text-emerald-400">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm text-zinc-300 sm:text-base">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Checklist" />
              <ul className="space-y-4">
                {assignment.checklist.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-start gap-3 border-b border-zinc-800/80 pb-4 last:border-0 last:pb-0"
                  >
                    <ChecklistIcon status={item.status} />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium sm:text-base ${
                          item.status === "complete"
                            ? "text-zinc-300"
                            : "text-white"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p
                        className={`mt-1 text-xs ${
                          item.status === "complete"
                            ? "text-emerald-400"
                            : item.status === "in_progress"
                              ? "text-emerald-300"
                              : "text-zinc-600"
                        }`}
                      >
                        {checklistLabel(item.status)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Submit Proof" />
              <AssignmentSubmitProof disabled={isSubmitted} />
            </section>

            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Reflection" />
              <p className="mb-4 text-sm text-zinc-400">
                Answer these prompts in your submission reflection:
              </p>
              <ul className="space-y-3">
                {assignment.reflectionPrompts.map((prompt) => (
                  <li
                    key={prompt}
                    className="flex items-start gap-3 text-sm text-zinc-300"
                  >
                    <span className="mt-0.5 font-bold text-emerald-400">+</span>
                    {prompt}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div>
            <section className="sticky top-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-zinc-950 p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                AI Mentor Help
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {assignment.mentorHelp}
              </p>
              <Link
                href="/mentor"
                className={`mt-5 w-full ${btnPrimaryClass} px-4 py-3`}
              >
                Ask AI Mentor
              </Link>
            </section>
          </div>
        </div>
      </PageMain>
    </AcademyShell>
  );
}
