import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssignmentDetailTabs } from "@/components/assignment-detail-tabs";
import {
  AcademyShell,
  linkAccentClass,
  PageMain,
} from "@/components/academy-shell";
import { getAllAssignmentIds, getAssignmentById } from "@/lib/assignments";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllAssignmentIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const assignment = getAssignmentById(id);

  if (!assignment) {
    return { title: "Assignment Not Found — AI Academy" };
  }

  return {
    title: `${assignment.title} — AI Academy`,
    description: assignment.missionBrief,
  };
}

export default async function AssignmentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const assignment = getAssignmentById(id);

  if (!assignment) notFound();

  return (
    <AcademyShell activeKey="assignments" pageLabel="Assignment">
      <PageMain>
        <Link href="/assignments" className={`inline-flex ${linkAccentClass}`}>
          ← Back to Assignments
        </Link>

        <div className="mt-6">
          <AssignmentDetailTabs assignment={assignment} />
        </div>
      </PageMain>
    </AcademyShell>
  );
}
