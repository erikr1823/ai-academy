"use client";

import { useState } from "react";
import {
  btnPrimaryClass,
  cardInteractiveClass,
  cardClass,
  PageHeader,
  StatusBadge,
} from "@/components/academy-shell";
import {
  workplaceRoles,
  type WorkplaceRole,
} from "@/lib/workplace-simulator";

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const styles =
    difficulty === "Advanced"
      ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
      : difficulty === "Intermediate"
        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
        : "border-zinc-700 bg-zinc-900 text-zinc-300";

  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}>
      {difficulty}
    </span>
  );
}

function CoachPanel() {
  return (
    <aside className={`${cardClass} border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-zinc-950 p-6`}>
      <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
        AI Practice Coach
      </p>
      <h2 className="mt-3 text-lg font-semibold text-white">How it works</h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        Choose a role, complete a scenario, and learn how AI can improve your
        daily workflow.
      </p>
      <ul className="mt-5 space-y-3 text-sm text-zinc-400">
        <li className="flex gap-2">
          <span className="font-bold text-emerald-400">1.</span>
          Pick a job role that matches your work
        </li>
        <li className="flex gap-2">
          <span className="font-bold text-emerald-400">2.</span>
          Review real-world AI exercise scenarios
        </li>
        <li className="flex gap-2">
          <span className="font-bold text-emerald-400">3.</span>
          Practice prompts you can use on the job
        </li>
      </ul>
      <p className="mt-5 text-xs text-zinc-600">
        Mock exercises only — live AI coaching coming soon.
      </p>
    </aside>
  );
}

function RoleDetail({ role }: { role: WorkplaceRole }) {
  return (
    <div className="space-y-6">
      <div className={`${cardClass} p-6`}>
        <StatusBadge status="In Progress" />
        <h2 className="mt-4 text-2xl font-bold text-white">{role.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          {role.description}
        </p>
      </div>

      <div className="space-y-4">
        {role.exercises.map((exercise, index) => (
          <article key={exercise.title} className={`${cardInteractiveClass} p-5`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Exercise {index + 1}
                </p>
                <h3 className="mt-2 text-base font-semibold text-white sm:text-lg">
                  {exercise.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <DifficultyBadge difficulty={exercise.difficulty} />
                  <span className="text-xs text-zinc-500">
                    {exercise.estimatedMinutes} min
                  </span>
                </div>
              </div>
              <button type="button" className={`shrink-0 ${btnPrimaryClass}`}>
                Start Exercise
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function WorkplaceSimulator() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(
    workplaceRoles[0].id
  );

  const selectedRole =
    workplaceRoles.find((role) => role.id === selectedRoleId) ?? workplaceRoles[0];

  return (
    <div>
      <PageHeader
        label="Workplace Simulator"
        title="Practice AI for your job"
        description="Choose a real-world role and work through practical AI exercises designed for everyday professional tasks."
      />

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className={`${cardClass} mb-6 p-4`}>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Select a role
            </p>
            <div className="flex flex-wrap gap-2">
              {workplaceRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                    selectedRoleId === role.id
                      ? "bg-emerald-500 text-black"
                      : "border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  {role.title}
                </button>
              ))}
            </div>
          </div>

          <RoleDetail role={selectedRole} />
        </div>

        <div className="xl:sticky xl:top-8 xl:self-start">
          <CoachPanel />
        </div>
      </div>
    </div>
  );
}
