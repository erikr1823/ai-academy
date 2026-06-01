import type { Metadata } from "next";
import Link from "next/link";
import {
  AcademyShell,
  btnPrimaryClass,
  cardClass,
  linkAccentClass,
  PageHeader,
  PageMain,
  ProgressBar,
  TrackBadge,
} from "@/components/academy-shell";
import {
  curriculumTracks,
  formatMinutes,
  getTrackStats,
  type CurriculumModule,
  type CurriculumTrack,
  type ModuleStatus,
} from "@/lib/curriculum";
import {
  featuredLessonIds,
  getLessonById,
  getLessonIdForModuleTitle,
} from "@/lib/lessons";

export const metadata: Metadata = {
  title: "Courses — AI Academy",
  description: "AI Essentials and AI Builder Academy curricula.",
};

function StatusBadge({ status }: { status: ModuleStatus }) {
  const config: Record<ModuleStatus, { label: string; className: string }> = {
    completed: {
      label: "Completed",
      className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    },
    in_progress: {
      label: "In Progress",
      className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    },
    available: {
      label: "Available",
      className: "border-zinc-600 bg-zinc-900 text-zinc-300",
    },
    locked: {
      label: "Locked",
      className: "border-zinc-800 bg-zinc-950 text-zinc-600",
    },
  };

  const { label, className } = config[status];

  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}

function ModuleCard({ module }: { module: CurriculumModule }) {
  const isLocked = module.status === "locked";
  const isCompleted = module.status === "completed";
  const lessonId = getLessonIdForModuleTitle(module.title);
  const lessonHref = lessonId ? `/courses/${lessonId}` : undefined;

  const actionLabel =
    module.status === "completed"
      ? "Review"
      : module.status === "in_progress"
        ? "Continue"
        : `Start Week ${module.week}`;

  return (
    <article
      className={`${cardClass} p-5 transition-colors ${
        isLocked ? "opacity-60" : "hover:border-emerald-500/30"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
              isCompleted
                ? "bg-emerald-500 text-black"
                : isLocked
                  ? "border border-zinc-800 bg-zinc-900 text-zinc-600"
                  : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            }`}
          >
            {isCompleted ? "✓" : module.week}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Week {module.week}
              </span>
              <StatusBadge status={module.status} />
            </div>
            {lessonHref && !isLocked ? (
              <Link
                href={lessonHref}
                className="mt-1 block text-base font-semibold text-white transition-colors hover:text-emerald-400 sm:text-lg"
              >
                {module.title}
              </Link>
            ) : (
              <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">
                {module.title}
              </h3>
            )}
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
              <span>{module.lessons} lessons</span>
              <span>{formatMinutes(module.estimatedMinutes)}</span>
              <span className="font-medium text-emerald-400/80">
                +{module.xp} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {module.status === "in_progress" && (
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-zinc-500">Lesson progress</span>
            <span className="text-zinc-300">{module.progress}%</span>
          </div>
          <ProgressBar value={module.progress} />
        </div>
      )}

      <div className="mt-4">
        {module.status === "locked" ? (
          <p className="text-sm text-zinc-600">
            Complete the previous week to unlock this module.
          </p>
        ) : lessonHref ? (
          <div className="flex flex-wrap items-center gap-3">
            {module.status === "completed" && (
              <span className="text-sm text-emerald-400">
                +{module.xp} XP earned
              </span>
            )}
            <Link href={lessonHref} className={btnPrimaryClass}>
              {actionLabel}
            </Link>
          </div>
        ) : module.status === "completed" ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-emerald-400">
              +{module.xp} XP earned
            </span>
            <button type="button" className={btnPrimaryClass}>
              Review
            </button>
          </div>
        ) : (
          <button type="button" className={btnPrimaryClass}>
            {actionLabel}
          </button>
        )}
      </div>
    </article>
  );
}

function FeaturedLessons() {
  return (
    <section className={`${cardClass} p-6`}>
      <h2 className="text-xl font-semibold text-white">Featured Lessons</h2>
      <p className="mt-2 text-sm text-zinc-400">
        Jump into example lessons with full step-by-step guidance and practice
        tasks.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {featuredLessonIds.map((id) => {
          const lesson = getLessonById(id);
          if (!lesson) return null;

          return (
            <Link
              key={id}
              href={`/courses/${id}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-emerald-500/40"
            >
              <TrackBadge label={lesson.track} />
              <h3 className="mt-3 text-base font-semibold text-white">
                {lesson.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-zinc-500">
                {lesson.overview}
              </p>
              <p className={`mt-3 ${linkAccentClass}`}>Open lesson →</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function TrackSection({ track }: { track: CurriculumTrack }) {
  const stats = getTrackStats(track);

  return (
    <section id={track.id}>
      <div className={`${cardClass} mb-6 p-6`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
              {track.durationWeeks}-Week Track
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">{track.name}</h2>
            <p className="mt-2 max-w-xl text-sm text-zinc-400">
              {track.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
            <div>
              <p className="text-xs text-zinc-500">Progress</p>
              <p className="mt-1 text-lg font-bold text-emerald-400">
                {stats.progressPercent}%
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Completed</p>
              <p className="mt-1 text-lg font-bold text-white">
                {stats.completed}/{stats.totalModules}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">XP Earned</p>
              <p className="mt-1 text-lg font-bold text-white">
                {stats.earnedXp.toLocaleString()}
                <span className="text-sm font-normal text-zinc-500">
                  {" "}
                  / {stats.totalXp.toLocaleString()}
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Time Left</p>
              <p className="mt-1 text-lg font-bold text-white">
                {stats.remainingTime}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-zinc-400">Overall track progress</span>
            <span className="font-medium text-emerald-400">
              {stats.completed} weeks complete · {stats.inProgress} in progress ·{" "}
              {stats.locked} locked
            </span>
          </div>
          <ProgressBar value={stats.progressPercent} />
        </div>

        <p className="mt-4 text-xs text-zinc-600">
          Total curriculum time: {stats.totalTime} · Estimated completion based on
          current pace
        </p>
      </div>

      <div className="space-y-4">
        {track.modules.map((module) => (
          <ModuleCard key={module.week} module={module} />
        ))}
      </div>
    </section>
  );
}

export default function CoursesPage() {
  return (
    <AcademyShell activeKey="courses" pageLabel="Courses" demoStep={5}>
      <PageMain>
        <PageHeader
          label="Courses"
          title="Your curriculum"
          description="Progress week by week through AI Essentials or AI Builder Academy. Earn XP, unlock modules, and build deploy-ready skills."
        />

        <div className="mt-10 space-y-16">
          <FeaturedLessons />
          {curriculumTracks.map((track) => (
            <TrackSection key={track.id} track={track} />
          ))}
        </div>
      </PageMain>
    </AcademyShell>
  );
}
