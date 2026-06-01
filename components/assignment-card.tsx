import Link from "next/link";
import {
  btnPrimaryClass,
  cardInteractiveClass,
  StatusBadge,
  TrackBadge,
} from "@/components/academy-shell";
import type { AssignmentSummary } from "@/lib/assignments";

function DifficultyBadge({
  difficulty,
}: {
  difficulty: AssignmentSummary["difficulty"];
}) {
  const styles: Record<AssignmentSummary["difficulty"], string> = {
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

export function AssignmentCard({ assignment }: { assignment: AssignmentSummary }) {
  return (
    <article className={`${cardInteractiveClass} flex flex-col p-6`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <TrackBadge label={assignment.track} />
        <StatusBadge status={assignment.status} />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">
        {assignment.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
        {assignment.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-zinc-800 pt-5 text-sm">
        <span className="font-semibold text-emerald-400">+{assignment.xp} XP</span>
        <span className="text-zinc-500">{assignment.dueDate}</span>
        <DifficultyBadge difficulty={assignment.difficulty} />
      </div>

      <Link
        href={`/assignments/${assignment.id}`}
        className={`mt-5 w-full ${btnPrimaryClass}`}
      >
        Open Assignment
      </Link>
    </article>
  );
}
