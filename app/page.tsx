import Link from "next/link";

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
    name: "Essentials",
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
    name: "Builder",
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

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          AI <span className="text-emerald-400">Academy</span>
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-emerald-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Link
          href="/choose-track"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
}

function PathCard({
  badge,
  title,
  description,
  cta,
  href = "/choose-track",
}: {
  badge: string;
  title: string;
  description: string;
  cta: string;
  href?: string;
}) {
  return (
    <article className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950 p-8 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] sm:p-10">
      <span className="mb-4 inline-flex w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-400">
        {badge}
      </span>
      <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {title}
      </h3>
      <p className="mt-4 flex-1 text-base leading-relaxed text-zinc-400">
        {description}
      </p>
      <Link
        href={href}
        className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-6 py-4 text-base font-semibold text-black transition-colors hover:bg-emerald-400 sm:w-auto"
      >
        {cta}
      </Link>
    </article>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-emerald-400/5 blur-[100px]" />
      </div>

      <Header />

      <section className="relative px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Learn.{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-300 bg-clip-text text-transparent">
              Build.
            </span>{" "}
            Deploy.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
            Two learning paths designed for different goals. Choose Essentials
            for workplace AI fluency, or Builder Academy to ship products and
            automations.
          </p>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2 lg:gap-8">
            <PathCard
              badge="Path 01"
              title="AI Essentials"
              description="For professionals 45+ who want practical AI skills for the workplace—reports, research, communication, and everyday productivity."
              cta="Start Essentials"
            />
            <PathCard
              badge="Path 02"
              title="AI Builder Academy"
              description="For builders, entrepreneurs, and tech professionals ready to create AI products, agents, and deployable workflows."
              cta="Start Builder Path"
            />
          </div>
        </div>
      </section>

      <section
        id="features"
        className="relative border-t border-zinc-900 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need to master AI
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              A complete learning system built for professionals who want
              results—not theory.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-emerald-500/30"
              >
                <div className="mb-4 h-1 w-8 rounded-full bg-emerald-500" />
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="relative border-t border-zinc-900 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
              Pricing
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Simple, transparent plans
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
              Start with the path that fits your goals. Cancel anytime.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-2">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-emerald-500/50 bg-gradient-to-b from-emerald-500/10 to-zinc-950"
                    : "border-zinc-800 bg-zinc-950"
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-semibold text-black">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-zinc-500">{plan.period}</span>
                  )}
                </div>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-zinc-300"
                    >
                      <span className="mt-0.5 shrink-0 font-bold text-emerald-400">
                        +
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/choose-track"
                  className="mt-8 block rounded-lg bg-emerald-500 px-6 py-3.5 text-center text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-zinc-900 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
            Demo Tour
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Walk through the full MVP
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
            Follow a guided path from track selection through onboarding,
            courses, mentor, projects, certificates, and admin — all with mock
            data.
          </p>
          <Link
            href="/choose-track"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]"
          >
            Start Demo Tour →
          </Link>
        </div>
      </section>

      <footer className="border-t border-zinc-900 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-zinc-500">
            <span className="font-semibold text-white">
              AI <span className="text-emerald-400">Academy</span>
            </span>
            {" · "}
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-emerald-400"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
