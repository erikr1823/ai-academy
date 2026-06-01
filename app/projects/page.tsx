import type { Metadata } from "next";
import Link from "next/link";
import {
  AcademyShell,
  btnPrimaryClass,
  btnSecondaryClass,
  cardInteractiveClass,
  EmptyState,
  PageHeader,
  PageMain,
  ProgressBar,
  StatusBadge,
} from "@/components/academy-shell";
import { projectSummaries } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — AI Academy",
  description: "Your AI Academy project portfolio.",
};

export default function ProjectsPage() {
  return (
    <AcademyShell activeKey="projects" pageLabel="Projects" demoStep={8}>
      <PageMain>
        <PageHeader
          label="Projects"
          title="My Projects"
          description="Build portfolio-ready work across Essentials and Builder Academy. Track progress and ship deployable solutions."
        />

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projectSummaries.map((project) => (
            <article
              key={project.id}
              className={`${cardInteractiveClass} flex flex-col p-6`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                  {project.track}
                </span>
                <StatusBadge status={project.status} />
              </div>

              <h2 className="mt-4 text-xl font-semibold text-white">
                {project.name}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                {project.description}
              </p>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Progress</span>
                  <span className="font-semibold text-emerald-400">
                    {project.progress}%
                  </span>
                </div>
                <ProgressBar value={project.progress} />
              </div>

              <ul className="mt-5 space-y-2 border-t border-zinc-800 pt-5">
                {project.milestones.map((milestone) => (
                  <li
                    key={milestone}
                    className="flex items-center gap-2 text-sm text-zinc-400"
                  >
                    <span className="font-bold text-emerald-400">+</span>
                    {milestone}
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-xs text-zinc-600">{project.updated}</p>

              <Link
                href={`/projects/${project.id}`}
                className={`mt-5 w-full ${btnPrimaryClass}`}
              >
                Open Project
              </Link>
            </article>
          ))}
        </section>

        <EmptyState
          title="Start a new project"
          description="Apply what you've learned by building a capstone project in Essentials or Builder Academy."
          action={
            <Link href="/choose-track" className={btnSecondaryClass}>
              Browse Tracks
            </Link>
          }
        />
      </PageMain>
    </AcademyShell>
  );
}
