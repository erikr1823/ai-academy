"use client";

import { useState } from "react";
import Link from "next/link";
import { AssignmentSubmitProof } from "@/components/assignment-submit-proof";
import {
  btnPrimaryClass,
  cardClass,
  linkAccentClass,
  SectionHeader,
  StatusBadge,
  TrackBadge,
} from "@/components/academy-shell";
import type { AssignmentDetail } from "@/lib/assignments";

type TabId = "instructions" | "resources" | "submit" | "mentor";

const tabs: { id: TabId; label: string }[] = [
  { id: "instructions", label: "Instructions" },
  { id: "resources", label: "Resources" },
  { id: "submit", label: "Submit Work" },
  { id: "mentor", label: "AI Mentor Help" },
];

function DifficultyBadge({
  difficulty,
}: {
  difficulty: AssignmentDetail["difficulty"];
}) {
  const styles: Record<AssignmentDetail["difficulty"], string> = {
    Beginner: "border-zinc-700 bg-zinc-900 text-zinc-300",
    Intermediate: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    Advanced: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}

export function AssignmentDetailTabs({
  assignment,
}: {
  assignment: AssignmentDetail;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("instructions");
  const isLocked =
    assignment.status === "Completed" || assignment.status === "In Review";

  return (
    <>
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <TrackBadge label={assignment.track} />
          <DifficultyBadge difficulty={assignment.difficulty} />
          <StatusBadge status={assignment.status} />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {assignment.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="font-semibold text-emerald-400">
            +{assignment.xp} XP Reward
          </span>
          <span className="text-zinc-400">{assignment.dueDate}</span>
        </div>
      </header>

      <div className="mt-8 border-b border-zinc-800">
        <nav
          className="-mb-px flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Assignment sections"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-8">
        {activeTab === "instructions" && (
          <div className="space-y-6">
            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Mission Brief" />
              <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                {assignment.missionBrief}
              </p>
            </section>

            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Step-by-Step Instructions" />
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
              <ul className="space-y-3">
                {assignment.checklist.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-3 text-sm text-zinc-300"
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        item.status === "complete"
                          ? "bg-emerald-500 text-black"
                          : item.status === "in_progress"
                            ? "border border-emerald-500/50 text-emerald-400"
                            : "border border-zinc-700 text-zinc-600"
                      }`}
                    >
                      {item.status === "complete" ? "✓" : item.status === "in_progress" ? "…" : "○"}
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </section>

            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Reflection Prompts" />
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
        )}

        {activeTab === "resources" && (
          <section className={`${cardClass} p-6`}>
            <SectionHeader title="Resources" />
            <p className="mb-6 text-sm text-zinc-400">
              Use these materials to complete your assignment.
            </p>
            <ul className="space-y-3">
              {assignment.resources.map((resource) => (
                <li key={resource.label}>
                  {resource.href.startsWith("/") ? (
                    <Link
                      href={resource.href}
                      className={`${linkAccentClass} inline-flex items-center gap-2`}
                    >
                      {resource.label} →
                    </Link>
                  ) : (
                    <span className="text-sm text-zinc-400">{resource.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeTab === "submit" && (
          <section className={`${cardClass} p-6`}>
            <SectionHeader title="Submit Work" />
            <AssignmentSubmitProof
              xp={assignment.xp}
              disabled={isLocked}
            />
          </section>
        )}

        {activeTab === "mentor" && (
          <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-zinc-950 p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
              AI Mentor Help
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
              {assignment.mentorHelp}
            </p>
            <Link
              href="/mentor"
              className={`mt-6 inline-flex ${btnPrimaryClass} px-6 py-3`}
            >
              Ask AI Mentor
            </Link>
          </section>
        )}
      </div>
    </>
  );
}
