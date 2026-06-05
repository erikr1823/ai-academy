import type { Metadata } from "next";
import {
  PortalProgressBar,
  PortalShell,
  portalStyles,
} from "@/components/portal-shell";
import {
  badges,
  certificates,
  profileStats,
  rankLadder,
  type CertificateStatus,
} from "@/lib/certificates";
import styles from "./certificates.module.css";

export const metadata: Metadata = {
  title: "Certificates & Achievements — AI Academy",
  description: "Track your XP, badges, certificates, and rank.",
};

function certBadgeClass(status: CertificateStatus) {
  switch (status) {
    case "Earned":
      return portalStyles.badgeComplete;
    case "In Progress":
      return portalStyles.badgeInProgress;
    default:
      return portalStyles.badgeLocked;
  }
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className={styles.statCard}>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
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
      className={`${styles.badgeCard} ${earned ? "" : styles.badgeCardLocked}`}
    >
      <div className={styles.badgeRow}>
        <div
          className={`${styles.badgeIcon} ${
            earned ? styles.badgeIconEarned : styles.badgeIconLocked
          }`}
        >
          {earned ? icon : "?"}
        </div>
        <div className={styles.badgeInfo}>
          <div className={styles.badgeTop}>
            <h3 className={styles.badgeName}>{name}</h3>
            <span
              className={`${styles.badgeStatus} ${
                earned ? styles.badgeStatusEarned : ""
              }`}
            >
              {earned ? "Earned" : "Locked"}
            </span>
          </div>
          <p className={styles.badgeDesc}>{description}</p>
        </div>
      </div>
    </article>
  );
}

export default function CertificatesPage() {
  return (
    <PortalShell activeKey="certificates" pageLabel="Certificates" demoStep={9}>
      <header className={portalStyles.pageHeader}>
        <p className={portalStyles.pageEyebrow}>Achievements</p>
        <h1 className={portalStyles.pageTitle}>Certificates & Achievements</h1>
        <p className={portalStyles.pageDesc}>
          Track your progress, badges, and completed programs.
        </p>
      </header>

      <section className={styles.statsGrid}>
        <StatCard
          label="Total XP"
          value={profileStats.totalXp.toLocaleString()}
        />
        <StatCard label="Badges Earned" value={profileStats.badgesEarned} />
        <StatCard label="Certificates" value={profileStats.certificates} />
        <StatCard label="Current Rank" value={profileStats.currentRank} />
      </section>

      <section className={portalStyles.section}>
        <div className={portalStyles.sectionHeader}>
          <h2 className={portalStyles.sectionTitle}>Certificates</h2>
        </div>
        <div className={styles.certGrid}>
          {certificates.map((cert) => (
            <article key={cert.id} className={styles.certCard}>
              <span
                className={`${portalStyles.badge} ${certBadgeClass(cert.status)}`}
              >
                {cert.status}
              </span>
              <h3 className={styles.certName}>{cert.name}</h3>
              <div className={portalStyles.progressMeta}>
                <span className={portalStyles.progressLabel}>Progress</span>
                <span className={portalStyles.progressValue}>
                  {cert.progress}%
                </span>
              </div>
              <PortalProgressBar value={cert.progress} />
              {cert.date && (
                <p className={styles.certMeta}>Earned: {cert.date}</p>
              )}
              {cert.expected && (
                <p className={styles.certMeta}>Expected: {cert.expected}</p>
              )}
              {cert.status === "Locked" && (
                <p className={styles.certLocked}>
                  Complete prerequisite tracks to unlock.
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className={portalStyles.section}>
        <div className={portalStyles.sectionHeader}>
          <h2 className={portalStyles.sectionTitle}>Rank Ladder</h2>
        </div>
        <div className={styles.rankCard}>
          <div className={styles.rankRow}>
            {rankLadder.map((rank, index) => {
              const isCurrent = rank === profileStats.currentRank;
              return (
                <div key={rank} className={styles.rankItem}>
                  <span
                    className={`${styles.rankPill} ${
                      isCurrent ? styles.rankPillActive : ""
                    }`}
                  >
                    {rank}
                    {isCurrent && (
                      <span className={styles.rankYou}>You</span>
                    )}
                  </span>
                  {index < rankLadder.length - 1 && (
                    <span className={styles.rankArrow}>→</span>
                  )}
                </div>
              );
            })}
          </div>
          <p className={styles.rankNote}>
            Earn XP, complete certificates, and finish projects to climb the
            ladder.
          </p>
        </div>
      </section>

      <section className={portalStyles.section}>
        <div className={portalStyles.sectionHeader}>
          <h2 className={portalStyles.sectionTitle}>Badges</h2>
        </div>
        <div className={styles.badgeGrid}>
          {badges.map((badge) => (
            <BadgeCard key={badge.id} {...badge} />
          ))}
        </div>
      </section>
    </PortalShell>
  );
}
