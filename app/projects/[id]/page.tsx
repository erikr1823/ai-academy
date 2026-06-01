import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AcademyShell,
  btnPrimaryClass,
  cardClass,
  linkAccentClass,
  PageMain,
  ProgressBar,
  SectionHeader,
  StatusBadge,
  TrackBadge,
} from "@/components/academy-shell";
import {
  getAllProjectIds,
  getProjectById,
  type ChecklistStatus,
} from "@/lib/projects";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllProjectIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return { title: "Project Not Found — AI Academy" };
  }

  return {
    title: `${project.title} — AI Academy`,
    description: project.overview,
  };
}

function ChecklistIcon({ status }: { status: ChecklistStatus }) {
  if (status === "complete") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-black">
        ✓
      </span>
    );
  }

  if (status === "in_progress") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-500/10 text-[10px] font-bold text-emerald-400">
        …
      </span>
    );
  }

  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-[10px] text-zinc-600">
      ○
    </span>
  );
}

function checklistLabel(status: ChecklistStatus) {
  if (status === "complete") return "Complete";
  if (status === "in_progress") return "In Progress";
  return "Not Started";
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) notFound();

  return (
    <AcademyShell activeKey="projects" pageLabel="Project" demoStep={8}>
      <PageMain>
        <Link href="/projects" className={`inline-flex ${linkAccentClass}`}>
          ← Back to Projects
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <TrackBadge label={project.track} />
            <StatusBadge status={project.status} />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">{project.updated}</p>

          <div className="mt-6 max-w-xl">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-zinc-400">Overall progress</span>
              <span className="font-semibold text-emerald-400">
                {project.progress}%
              </span>
            </div>
            <ProgressBar value={project.progress} />
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Project Overview" />
              <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                {project.overview}
              </p>
            </section>

            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Mission Checklist" />
              <ul className="space-y-4">
                {project.missionChecklist.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-start gap-3 border-b border-zinc-800/80 pb-4 last:border-0 last:pb-0"
                  >
                    <ChecklistIcon status={item.status} />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium sm:text-base ${
                          item.status === "complete"
                            ? "text-zinc-300"
                            : "text-white"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p
                        className={`mt-1 text-xs ${
                          item.status === "complete"
                            ? "text-emerald-400"
                            : item.status === "in_progress"
                              ? "text-emerald-300"
                              : "text-zinc-600"
                        }`}
                      >
                        {checklistLabel(item.status)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Deliverables" />
              <ul className="space-y-3">
                {project.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-zinc-300"
                  >
                    <span className="font-bold text-emerald-400">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-8">
            <section className={`${cardClass} p-6`}>
              <SectionHeader title="Resources" />
              <ul className="space-y-3">
                {project.resources.map((resource) => (
                  <li key={resource.label}>
                    <a
                      href={resource.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-emerald-400"
                      {...(resource.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {resource.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-zinc-950 p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                AI Mentor Help
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Stuck on this project? Ask your AI Mentor to explain the next
                step, review your deliverables, or help write your demo script.
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
