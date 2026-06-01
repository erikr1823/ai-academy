import type { Metadata } from "next";
import Link from "next/link";
import {
  AcademyShell,
  btnPrimaryClass,
  btnSecondaryClass,
  cardInteractiveClass,
  cardClass,
  linkAccentClass,
  PageHeader,
  PageMain,
  ProgressBar,
  SectionHeader,
  StatusBadge,
  TrackBadge,
} from "@/components/academy-shell";

export const metadata: Metadata = {
  title: "Dashboard — AI Academy",
  description: "Your AI Academy learning dashboard.",
};

const trackProgress = [
  {
    name: "AI Essentials",
    progress: 45,
    label: "9 of 20 lessons complete",
    accent: "from-emerald-500/20 to-transparent",
    href: "/courses",
  },
  {
    name: "AI Builder Academy",
    progress: 62,
    label: "12 of 19 modules complete",
    accent: "from-green-400/20 to-transparent",
    href: "/courses",
  },
];

const continueLearning = [
  {
    track: "Essentials",
    title: "ChatGPT Basics",
    duration: "15 min",
    module: "Module 1 · Lesson 1",
    href: "/courses/chatgpt-basics",
  },
  {
    track: "Builder",
    title: "Deploying Your First AI Agent",
    duration: "32 min",
    module: "Module 6 · Lesson 1",
    href: "/courses/ai-workflows",
  },
  {
    track: "Essentials",
    title: "Prompt Engineering Fundamentals",
    duration: "22 min",
    module: "Module 2 · Lesson 1",
    href: "/courses/prompt-engineering",
  },
];

const projects = [
  {
    name: "SiteScope Project",
    track: "Builder",
    status: "In Progress",
    updated: "Updated 2 days ago",
    id: "sitescope",
  },
  {
    name: "HelpDesk AI",
    track: "Builder",
    status: "In Review",
    updated: "Updated yesterday",
    id: "helpdesk-ai",
  },
  {
    name: "AI Email Assistant",
    track: "Essentials",
    status: "In Progress",
    updated: "Updated 4 days ago",
    id: "email-assistant",
  },
];

const achievements = [
  { label: "First Lesson", detail: "Completed your first module" },
  { label: "Prompt Pro", detail: "Finished 10 prompt exercises" },
  { label: "Builder Badge", detail: "Shipped your first project" },
  { label: "7-Day Streak", detail: "Learned 7 days in a row" },
  { label: "Mentor Ready", detail: "Asked 5 mentor questions" },
];

function TrackProgressCard({
  name,
  progress,
  label,
  accent,
  href,
}: {
  name: string;
  progress: number;
  label: string;
  accent: string;
  href: string;
}) {
  return (
    <article className={`${cardInteractiveClass} p-6`}>
      <div
        className={`mb-4 h-1 w-12 rounded-full bg-gradient-to-r ${accent}`}
        aria-hidden
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="mt-1 text-sm text-zinc-400">{label}</p>
        </div>
        <span className="text-2xl font-bold text-emerald-400">{progress}%</span>
      </div>
      <div className="mt-5">
        <ProgressBar value={progress} />
      </div>
      <Link href={href} className={`mt-5 ${btnPrimaryClass}`}>
        Continue Track
      </Link>
    </article>
  );
}

export default function DashboardPage() {
  return (
    <AcademyShell activeKey="dashboard" pageLabel="Dashboard" demoStep={4}>
      <PageMain>
        <PageHeader
          label="Dashboard"
          title="Welcome back, Erik"
          description="You're making great progress across both tracks. Pick up where you left off or ask your AI mentor for help."
        />

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {trackProgress.map((track) => (
            <TrackProgressCard key={track.name} {...track} />
          ))}
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-3">
          <section className="xl:col-span-2">
            <SectionHeader
              title="Continue Learning"
              action={
                <Link href="/courses" className={linkAccentClass}>
                  View all lessons
                </Link>
              }
            />
            <div className="space-y-4">
              {continueLearning.map((lesson) => (
                <article
                  key={lesson.title}
                  className={`${cardInteractiveClass} p-5`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <TrackBadge label={lesson.track} />
                      <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">
                        {lesson.title}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        {lesson.module} · {lesson.duration}
                      </p>
                    </div>
                    <Link href={lesson.href} className={`shrink-0 ${btnPrimaryClass}`}>
                      Resume
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="AI Mentor" />
            <article className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-zinc-950 p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                Available 24/7
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                Get unstuck in minutes
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Ask about prompts, project architecture, deployment checklists,
                or review your latest build before you ship.
              </p>
              <div className="mt-5 space-y-2">
                <p className="text-xs text-zinc-500">Suggested prompts</p>
                <p className="rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-300">
                  Review my agent workflow for production readiness.
                </p>
                <p className="rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-300">
                  Help me draft a client-facing AI use case.
                </p>
              </div>
              <Link
                href="/mentor"
                className={`mt-5 w-full ${btnPrimaryClass} px-4 py-3`}
              >
                Open AI Mentor
              </Link>
            </article>
          </section>
        </div>

        <section className="mt-8">
          <SectionHeader
            title="My Projects"
            action={
              <Link href="/projects" className={btnSecondaryClass}>
                View Projects
              </Link>
            }
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article key={project.name} className={`${cardInteractiveClass} p-5`}>
                <div className="flex items-start justify-between gap-3">
                  <TrackBadge label={project.track} />
                  <StatusBadge status={project.status} />
                </div>
                <h3 className="mt-3 text-base font-semibold text-white">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-500">{project.updated}</p>
                <Link href={`/projects/${project.id}`} className={`mt-4 inline-flex ${linkAccentClass}`}>
                  Open project
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionHeader title="Recent Achievements" />
          <div className="flex flex-wrap gap-3">
            {achievements.map((badge) => (
              <div
                key={badge.label}
                className={`${cardInteractiveClass} px-4 py-3 sm:min-w-[180px]`}
              >
                <p className="text-sm font-semibold text-white">{badge.label}</p>
                <p className="mt-1 text-xs text-zinc-500">{badge.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </PageMain>
    </AcademyShell>
  );
}
