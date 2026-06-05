import Link from "next/link";
import styles from "./home.module.css";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

const features = [
  {
    title: "AI Mentor",
    description:
      "Personalized guidance and feedback as you learn—available whenever you need clarity.",
  },
  {
    title: "Real-World Projects",
    description:
      "Ship portfolio-ready work with guided builds that mirror what teams deploy in production.",
  },
  {
    title: "Practical Lessons",
    description:
      "Short, focused modules designed for busy professionals—learn by doing, not watching.",
  },
  {
    title: "Two Learning Paths",
    description:
      "Essentials for workplace AI fluency, or Builder for shipping products—pick the track that fits you.",
  },
  {
    title: "Deploy-Ready Skills",
    description:
      "From prompts to pipelines—graduate with workflows you can use on day one.",
  },
  {
    title: "Community & Cohorts",
    description:
      "Learn alongside peers, share wins, and stay accountable with structured cohort milestones.",
  },
];

const pricingPlans = [
  {
    name: "AI Essentials",
    price: "$49",
    period: "/month",
    description: "Workplace AI fluency for experienced professionals 45+.",
    features: [
      "Full Essentials curriculum",
      "AI mentor access",
      "Weekly office hours",
      "Project templates library",
      "Certificate of completion",
    ],
    cta: "Start Essentials",
    highlighted: false,
  },
  {
    name: "AI Builder Academy",
    price: "$99",
    period: "/month",
    description: "Build and deploy AI products, agents, and workflows.",
    features: [
      "Everything in Essentials",
      "Builder Academy full track",
      "Advanced project builds",
      "Code review & deploy guides",
      "Priority mentor support",
    ],
    cta: "Start Builder Path",
    highlighted: true,
  },
];

function TrackCard({
  title,
  price,
  description,
}: {
  title: string;
  price: string;
  description: string;
}) {
  return (
    <article className={styles.trackCard}>
      <h3 className={styles.trackTitle}>{title}</h3>
      <p className={styles.trackPrice}>{price}</p>
      <p className={styles.trackDesc}>{description}</p>
      <Link href="/signup" className={`${styles.btnPrimary} ${styles.btnPrimaryLg} ${styles.trackCta}`}>
        Get Started
      </Link>
    </article>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden>
        <div className={styles.glowOrbPrimary} />
        <div className={styles.glowOrbSecondary} />
      </div>

      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            AI <span className={styles.logoAccent}>Academy</span>
          </Link>

          <div className={styles.navCenter}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </div>

          <div className={styles.navActions}>
            <Link href="/login" className={styles.loginLink}>
              Login
            </Link>
            <Link href="/signup" className={styles.btnPrimary}>
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            Learn AI Without Feeling{" "}
            <span className={styles.heroGradient}>Overwhelmed</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Practical AI training for professionals, builders, and businesses.
          </p>

          <div className={styles.trackGrid}>
            <TrackCard
              title="AI Essentials"
              price="$49/month"
              description="For professionals who want practical AI skills for the workplace—reports, research, communication, and everyday productivity."
            />
            <TrackCard
              title="AI Builder Academy"
              price="$99/month"
              description="For builders and tech learners ready to create AI products, agents, and deployable workflows."
            />
          </div>
        </div>
      </section>

      <section id="features" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Features</p>
            <h2 className={styles.sectionTitle}>
              Everything you need to master AI
            </h2>
            <p className={styles.sectionDesc}>
              A complete learning system built for professionals who want
              results—not theory.
            </p>
          </div>

          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <div key={feature.title} className={styles.featureCard}>
                <div className={styles.featureAccent} />
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionCenter}>
            <p className={styles.eyebrow}>Pricing</p>
            <h2 className={styles.sectionTitle}>Simple, transparent plans</h2>
            <p className={`${styles.sectionDesc} ${styles.sectionDescCenter}`}>
              Start with the path that fits your goals. Cancel anytime.
            </p>
          </div>

          <div className={styles.pricingGrid}>
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`${styles.pricingCard} ${
                  plan.highlighted ? styles.pricingCardHighlighted : ""
                }`}
              >
                {plan.highlighted && (
                  <span className={styles.badge}>Most Popular</span>
                )}
                <h3 className={styles.pricingName}>{plan.name}</h3>
                <p className={styles.pricingDesc}>{plan.description}</p>
                <div className={styles.pricingAmount}>
                  <span className={styles.priceValue}>{plan.price}</span>
                  {plan.period && (
                    <span className={styles.pricePeriod}>{plan.period}</span>
                  )}
                </div>
                <ul className={styles.featureList}>
                  {plan.features.map((item) => (
                    <li key={item} className={styles.featureListItem}>
                      <span className={styles.featureListIcon}>+</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`${styles.btnPrimary} ${styles.btnPrimaryBlock} ${styles.pricingCta}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerBrand}>
            <span className={styles.footerBrandStrong}>
              AI <span className={styles.logoAccent}>Academy</span>
            </span>
            {" · "}
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <div className={styles.footerLinks}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.footerLink}>
                {link.label}
              </a>
            ))}
            <Link href="/login" className={styles.footerLink}>
              Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
