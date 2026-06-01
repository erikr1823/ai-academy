"use client";

import { useState } from "react";
import { btnPrimaryClass } from "@/components/academy-shell";

type AssignmentSubmitProofProps = {
  disabled?: boolean;
};

export function AssignmentSubmitProof({
  disabled = false,
}: AssignmentSubmitProofProps) {
  const [reflection, setReflection] = useState("");
  const [completed, setCompleted] = useState(false);

  return (
    <div className="space-y-4">
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
          Choose File
        </button>
      </div>

      <div>
        <label
          htmlFor="assignment-reflection"
          className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
        >
          Reflection
        </label>
        <textarea
          id="assignment-reflection"
          rows={4}
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          disabled={disabled || completed}
          placeholder="What did you learn? What prompt or workflow worked best?"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <button
        type="button"
        onClick={() => setCompleted(true)}
        disabled={disabled || completed}
        className={`${btnPrimaryClass} disabled:cursor-not-allowed disabled:opacity-60 ${completed ? "opacity-80" : ""}`}
      >
        {completed ? "Marked Complete ✓" : "Mark Complete"}
      </button>

      {completed && (
        <p className="text-sm text-emerald-400">
          Great work! XP will be recorded when progress tracking is enabled.
        </p>
      )}

      {disabled && !completed && (
        <p className="text-sm text-zinc-500">
          This assignment is already submitted or under review.
        </p>
      )}
    </div>
  );
}
