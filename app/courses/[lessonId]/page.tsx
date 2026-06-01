import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonSubmitProof } from "@/components/lesson-submit-proof";
import {
  AcademyShell,
  btnPrimaryClass,
  cardClass,
  linkAccentClass,
  PageMain,
  SectionHeader,
  TrackBadge,
} from "@/components/academy-shell";
import { formatMinutes } from "@/lib/curriculum";
import { getAllLessonIds, getLessonById, type LessonDifficulty } from "@/lib/lessons";

type PageProps = {
  params: Promise<{ lessonId: string }>;
};

export async function generateStaticParams() {
  return getAllLessonIds().map((lessonId) => ({ lessonId }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    return { title: "Lesson Not Found — AI Academy" };
  }

  return {
    title: `${lesson.title} — AI Academy`,
    description: lesson.overview,
  };
}

function DifficultyBadge({ difficulty }: { difficulty: LessonDifficulty }) {
  const styles: Record<LessonDifficulty, string> = {
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

export default async function LessonDetailPage({ params }: PageProps) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);

  if (!lesson) notFound();

  return (
    <AcademyShell activeKey="courses" pageLabel="Lesson" demoStep={6}>
      <PageMain>
        <Link href="/courses" className={`inline-flex ${linkAccentClass}`}>
          ← Back to Courses
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <TrackBadge label={lesson.track} />
            <DifficultyBadge difficulty={lesson.difficulty} />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {lesson.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-400">
            <span>{formatMinutes(lesson.estimatedMinutes)}</span>
            <span className="font-medium text-emerald-400">+{lesson.xp} XP</span>
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Lesson Overview" />
              <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                {lesson.overview}
              </p>
            </section>

            <section className={`${cardClass} p-6`}>
              <SectionHeader title="What You Will Learn" />
              <ul className="space-y-3">
                {lesson.learningObjectives.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-zinc-300"
                  >
                    <span className="mt-0.5 font-bold text-emerald-400">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Step-by-Step Lesson" />
              <ol className="space-y-4">
                {lesson.steps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-sm font-bold text-emerald-400">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm text-zinc-300 sm:text-base">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Practice Task" />
              <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                {lesson.practiceTask}
              </p>
            </section>

            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Submit Proof" />
              <LessonSubmitProof />
            </section>
          </div>

          <div>
            <section className="sticky top-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-zinc-950 p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                AI Mentor Help
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Need help with this lesson? Ask your AI Mentor to explain the
                concept or improve your prompt.
              </p>
              <Link href="/mentor" className={`mt-5 w-full ${btnPrimaryClass} px-4 py-3`}>
                Ask AI Mentor
              </Link>
            </section>
          </div>
        </div>
      </PageMain>
    </AcademyShell>
  );
}
