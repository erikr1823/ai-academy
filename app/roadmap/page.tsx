import type { Metadata } from "next";
import {
  AcademyShell,
  cardClass,
  cardInteractiveClass,
  PageHeader,
  PageMain,
  SectionHeader,
} from "@/components/academy-shell";
import {
  businessModelPlans,
  roadmapPhases,
  type PhaseStatus,
} from "@/lib/roadmap";

export const metadata: Metadata = {
  title: "Product Roadmap — AI Academy",
  description: "How AI Academy grows from MVP into a full training platform.",
};

function PhaseStatusBadge({ status }: { status: PhaseStatus }) {
  const styles: Record<PhaseStatus, string> = {
    Complete: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    Next: "border-emerald-500/50 bg-emerald-500/20 text-emerald-300",
    Planned: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    Future: "border-zinc-700 bg-zinc-900 text-zinc-500",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function RoadmapPage() {
  return (
    <AcademyShell activeKey="roadmap" pageLabel="Roadmap">
      <PageMain>
        <PageHeader
          label="Roadmap"
          title="Product Roadmap"
          description="How AI Academy grows from MVP into a full training platform."
        />

        <section className="mt-10">
          <div className="relative space-y-6">
            <div
              className="absolute bottom-0 left-[1.125rem] top-0 hidden w-px bg-gradient-to-b from-emerald-500/50 via-zinc-800 to-zinc-900 sm:block"
              aria-hidden
            />

            {roadmapPhases.map((phase) => {
              const isComplete = phase.status === "Complete";
              const isNext = phase.status === "Next";

              return (
                <article
                  key={phase.id}
                  className={`relative sm:pl-12 ${
                    isNext
                      ? `${cardInteractiveClass} border-emerald-500/30`
                      : cardClass
                  } p-6 sm:p-8`}
                >
                  <div
                    className={`absolute left-0 top-8 hidden h-9 w-9 items-center justify-center rounded-full border text-sm font-bold sm:flex ${
                      isComplete
                        ? "border-emerald-500 bg-emerald-500 text-black"
                        : isNext
                          ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 ring-2 ring-emerald-500/20"
                          : "border-zinc-700 bg-zinc-900 text-zinc-500"
                    }`}
                    aria-hidden
                  >
                    {isComplete ? "✓" : phase.id}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                        Phase {phase.id}
                      </p>
                      <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                        {phase.title}
                      </h2>
                    </div>
                    <PhaseStatusBadge status={phase.status} />
                  </div>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-zinc-300"
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                            isComplete
                              ? "bg-emerald-500/20 text-emerald-400"
                              : isNext
                                ? "border border-emerald-500/30 text-emerald-400"
                                : "border border-zinc-800 text-zinc-600"
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
        </section>

        <section className="mt-16">
          <SectionHeader title="Business Model" />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {businessModelPlans.map((plan) => (
              <article
                key={plan.name}
                className={`flex flex-col p-6 ${
                  plan.highlighted
                    ? "rounded-2xl border border-emerald-500/50 bg-gradient-to-b from-emerald-500/10 to-zinc-950"
                    : cardInteractiveClass
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black">
                    Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="mt-3 text-2xl font-bold text-emerald-400">
                  {plan.price}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                  {plan.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </PageMain>
    </AcademyShell>
  );
}
