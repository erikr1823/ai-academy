import type { Metadata } from "next";
import { PortalShell, portalStyles } from "@/components/portal-shell";
import {
  businessModelPlans,
  roadmapPhases,
  type PhaseStatus,
} from "@/lib/roadmap";
import styles from "./roadmap.module.css";

export const metadata: Metadata = {
  title: "Product Roadmap — AI Academy",
  description: "How AI Academy grows from MVP into a full training platform.",
};

function phaseBadgeClass(status: PhaseStatus) {
  switch (status) {
    case "Complete":
      return portalStyles.badgeComplete;
    case "Next":
      return portalStyles.badgeNext;
    case "Planned":
      return portalStyles.badgePlanned;
    default:
      return portalStyles.badgeFuture;
  }
}

export default function RoadmapPage() {
  return (
    <PortalShell activeKey="roadmap" pageLabel="Roadmap">
      <header className={portalStyles.pageHeader}>
        <p className={portalStyles.pageEyebrow}>Roadmap</p>
        <h1 className={portalStyles.pageTitle}>Product Roadmap</h1>
        <p className={portalStyles.pageDesc}>
          How AI Academy grows from MVP into a full training platform.
        </p>
      </header>

      <section className={portalStyles.sectionLg}>
        <div className={styles.timeline}>
          <div className={styles.timelineLine} aria-hidden />
          <div className={styles.phaseList}>
            {roadmapPhases.map((phase) => {
              const isComplete = phase.status === "Complete";
              const isNext = phase.status === "Next";

              return (
                <article
                  key={phase.id}
                  className={`${styles.phaseCard} ${
                    isNext ? styles.phaseCardNext : ""
                  }`}
                >
                  <div
                    className={`${styles.phaseMarker} ${
                      isComplete
                        ? styles.markerComplete
                        : isNext
                          ? styles.markerNext
                          : styles.markerDefault
                    }`}
                    aria-hidden
                  >
                    {isComplete ? "✓" : phase.id}
                  </div>

                  <div className={styles.phaseTop}>
                    <div>
                      <p className={styles.phaseEyebrow}>Phase {phase.id}</p>
                      <h2 className={styles.phaseTitle}>{phase.title}</h2>
                    </div>
                    <span
                      className={`${portalStyles.badge} ${phaseBadgeClass(phase.status)}`}
                    >
                      {phase.status}
                    </span>
                  </div>

                  <ul className={styles.itemGrid}>
                    {phase.items.map((item) => (
                      <li key={item} className={styles.item}>
                        <span
                          className={`${styles.itemIcon} ${
                            isComplete
                              ? styles.iconComplete
                              : isNext
                                ? styles.iconNext
                                : styles.iconDefault
                          }`}
                        >
                          {isComplete ? "✓" : "+"}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={portalStyles.sectionLg}>
        <div className={portalStyles.sectionHeader}>
          <h2 className={portalStyles.sectionTitle}>Business Model</h2>
        </div>
        <div className={styles.businessGrid}>
          {businessModelPlans.map((plan) => (
            <article
              key={plan.name}
              className={`${styles.businessCard} ${
                plan.highlighted ? styles.businessCardHighlight : ""
              }`}
            >
              {plan.highlighted && (
                <span className={styles.popularBadge}>Popular</span>
              )}
              <h3 className={styles.businessName}>{plan.name}</h3>
              <p className={styles.businessPrice}>{plan.price}</p>
              <p className={styles.businessDesc}>{plan.description}</p>
            </article>
          ))}
        </div>
      </section>
    </PortalShell>
  );
}
