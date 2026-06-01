"use client";

import { useState } from "react";
import Link from "next/link";
import { btnPrimaryClass, btnSecondaryClass } from "@/components/academy-shell";

type AssignmentSubmitProofProps = {
  xp: number;
  disabled?: boolean;
};

export function AssignmentSubmitProof({
  xp,
  disabled = false,
}: AssignmentSubmitProofProps) {
  const [reflection, setReflection] = useState("");
  const [completed, setCompleted] = useState(false);

  if (disabled) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
        <p className="text-lg font-semibold text-white">Assignment Submitted</p>
        <p className="mt-2 text-sm text-zinc-400">Waiting for Review</p>
        <Link href="/submissions" className={`mt-5 inline-flex ${btnSecondaryClass}`}>
          View Submissions →
        </Link>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="space-y-4 rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-zinc-950 p-6 sm:p-8">
        <div className="text-center">
          <p className="text-3xl font-bold text-emerald-400">+{xp} XP Earned</p>
          <p className="mt-3 text-lg font-semibold text-white">
            Assignment Submitted
          </p>
          <p className="mt-2 text-sm text-zinc-400">Waiting for Review</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/submissions" className={`${btnPrimaryClass} text-center`}>
            View Submissions
          </Link>
          <Link href="/assignments" className={`${btnSecondaryClass} text-center`}>
            Back to Assignments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="assignment-reflection"
          className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
        >
          Reflection
        </label>
        <textarea
          id="assignment-reflection"
          rows={5}
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="What did you learn? What prompt or workflow worked best?"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 px-6 py-10 text-center">
          <p className="text-sm font-medium text-zinc-400">Upload screenshot</p>
          <p className="mt-2 text-xs text-zinc-600">
            Placeholder — file upload coming soon
          </p>
          <button
            type="button"
            disabled
            className="mt-4 rounded-lg border border-zinc-800 px-4 py-2 text-xs font-medium text-zinc-600"
          >
            Choose Image
          </button>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 px-6 py-10 text-center">
          <p className="text-sm font-medium text-zinc-400">Upload document</p>
          <p className="mt-2 text-xs text-zinc-600">
            PDF, DOCX, or TXT — coming soon
          </p>
          <button
            type="button"
            disabled
            className="mt-4 rounded-lg border border-zinc-800 px-4 py-2 text-xs font-medium text-zinc-600"
          >
            Choose File
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCompleted(true)}
        className={btnPrimaryClass}
      >
        Mark Complete
      </button>
    </div>
  );
}
