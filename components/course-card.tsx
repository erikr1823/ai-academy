import Image from "next/image";
import Link from "next/link";
import {
  cardInteractiveClass,
  ProgressBar,
  TrackBadge,
  btnPrimaryClass,
} from "@/components/academy-shell";
import type { CourseWithProgress } from "@/lib/types/courses";

export function CourseCard({ course }: { course: CourseWithProgress }) {
  return (
    <article className={`${cardInteractiveClass} overflow-hidden`}>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
        {course.image_url ? (
          <Image
            src={course.image_url}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-500/20 to-zinc-950">
            <span className="text-4xl font-bold text-emerald-400/40">AI</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          <TrackBadge label={course.category} />
          <span className="rounded-full border border-zinc-700 bg-black/60 px-2.5 py-0.5 text-xs font-medium text-zinc-300 backdrop-blur-sm">
            {course.difficulty}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">{course.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {course.description}
        </p>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-zinc-500">Progress</span>
            <span className="font-medium text-emerald-400">
              {course.progress_percent}%
            </span>
          </div>
          <ProgressBar value={course.progress_percent} />
          <p className="mt-2 text-xs text-zinc-500">
            {course.completed_count} of {course.lesson_count} lessons complete
          </p>
        </div>

        <Link href={`/courses/${course.id}`} className={`mt-5 ${btnPrimaryClass}`}>
          {course.progress_percent > 0 ? "Continue" : "Start Course"}
        </Link>
      </div>
    </article>
  );
}
