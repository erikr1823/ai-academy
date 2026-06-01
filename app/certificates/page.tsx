import type { Metadata } from "next";
import {
  AcademyShell,
  cardInteractiveClass,
  cardClass,
  PageHeader,
  PageMain,
  ProgressBar,
  SectionHeader,
} from "@/components/academy-shell";
import {
  badges,
  certificates,
  profileStats,
  rankLadder,
  type CertificateStatus,
} from "@/lib/certificates";

export const metadata: Metadata = {
  title: "Certificates & Achievements — AI Academy",
  description: "Track your XP, badges, certificates, and rank.",
};

function CertificateStatusBadge({ status }: { status: CertificateStatus }) {
  const styles: Record<CertificateStatus, string> = {
    Earned: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    "In Progress": "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    Locked: "border-zinc-800 bg-zinc-950 text-zinc-600",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className={`${cardInteractiveClass} p-5`}>
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">{value}</p>
    </div>
  );
}

function BadgeCard({
  icon,
  name,
  description,
  earned,
}: {
  icon: string;
  name: string;
  description: string;
  earned: boolean;
}) {
  return (
    <article
      className={`${cardInteractiveClass} p-5 ${earned ? "" : "opacity-60"}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
            earned
              ? "bg-emerald-500 text-black"
              : "border border-zinc-800 bg-zinc-900 text-zinc-600"
          }`}
        >
          {earned ? icon : "?"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-white">{name}</h3>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                earned
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-zinc-800 text-zinc-600"
              }`}
            >
              {earned ? "Earned" : "Locked"}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function CertificatesPage() {
  return (
    <AcademyShell activeKey="certificates" pageLabel="Certificates" demoStep={9}>
      <PageMain>
        <PageHeader
          label="Achievements"
          title="Certificates & Achievements"
          description="Track your progress, badges, and completed programs."
        />

        <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total XP"
            value={profileStats.totalXp.toLocaleString()}
          />
          <StatCard label="Badges Earned" value={profileStats.badgesEarned} />
          <StatCard label="Certificates" value={profileStats.certificates} />
          <StatCard label="Current Rank" value={profileStats.currentRank} />
        </section>

        <section className="mt-10">
          <SectionHeader title="Certificates" />
          <div className="grid gap-4 lg:grid-cols-3">
            {certificates.map((cert) => (
              <article key={cert.id} className={`${cardInteractiveClass} flex flex-col p-6`}>
                <CertificateStatusBadge status={cert.status} />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {cert.name}
                </h3>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Progress</span>
                    <span className="font-semibold text-emerald-400">
                      {cert.progress}%
                    </span>
                  </div>
                  <ProgressBar value={cert.progress} />
                </div>

                {cert.date && (
                  <p className="mt-4 text-sm text-zinc-500">Earned: {cert.date}</p>
                )}
                {cert.expected && (
                  <p className="mt-4 text-sm text-zinc-500">
                    Expected: {cert.expected}
                  </p>
                )}
                {cert.status === "Locked" && (
                  <p className="mt-4 text-sm text-zinc-600">
                    Complete prerequisite tracks to unlock.
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeader title="Rank Ladder" />
          <div className={`${cardClass} p-6`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {rankLadder.map((rank, index) => {
                const isCurrent = rank === profileStats.currentRank;
                return (
                  <div key={rank} className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        isCurrent
                          ? "bg-emerald-500 text-black"
                          : "border border-zinc-800 bg-zinc-900 text-zinc-400"
                      }`}
                    >
                      {rank}
                      {isCurrent && (
                        <span className="ml-2 text-xs font-semibold opacity-80">
                          You
                        </span>
                      )}
                    </span>
                    {index < rankLadder.length - 1 && (
                      <span className="hidden text-zinc-700 sm:inline">→</span>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Earn XP, complete certificates, and finish projects to climb the
              ladder.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <SectionHeader title="Badges" />
          <div className="grid gap-4 sm:grid-cols-2">
            {badges.map((badge) => (
              <BadgeCard key={badge.id} {...badge} />
            ))}
          </div>
        </section>
      </PageMain>
    </AcademyShell>
  );
}
