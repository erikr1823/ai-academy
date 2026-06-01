import type { Metadata } from "next";
import Link from "next/link";
import {
  AcademyShell,
  btnPrimaryClass,
  btnSecondaryClass,
  cardClass,
  cardInteractiveClass,
  linkAccentClass,
  PageHeader,
  PageMain,
  SectionHeader,
} from "@/components/academy-shell";
import { demoModeSteps, phase2Items } from "@/lib/demo-mode";

export const metadata: Metadata = {
  title: "Demo Mode — AI Academy",
  description:
    "A guided walkthrough of the platform for students, professionals, and businesses.",
};

export default function DemoPage() {
  return (
    <AcademyShell activeKey="demo" pageLabel="Demo">
      <PageMain>
        <PageHeader
          label="Demo Mode"
          title="AI Academy Demo"
          description="A guided walkthrough of the platform for students, professionals, and businesses."
        />

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className={btnPrimaryClass}>
            Start Demo at Landing →
          </Link>
          <Link href="/roadmap" className={btnSecondaryClass}>
            View Product Roadmap
          </Link>
        </div>

        <section className="mt-10">
          <SectionHeader title="Demo Flow" />
          <div className="relative space-y-4">
            <div
              className="absolute bottom-0 left-[1.125rem] top-0 hidden w-px bg-gradient-to-b from-emerald-500/50 via-zinc-800 to-zinc-900 sm:block"
              aria-hidden
            />

            {demoModeSteps.map((item) => (
              <article
                key={item.step}
                className={`relative sm:pl-12 ${cardInteractiveClass} p-5 sm:p-6`}
              >
                <div
                  className="absolute left-0 top-6 hidden h-9 w-9 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm font-bold text-emerald-400 sm:flex"
                  aria-hidden
                >
                  {item.step}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                      Step {item.step}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-white sm:text-xl">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className={`shrink-0 ${btnSecondaryClass} px-4 py-2.5 text-sm`}
                  >
                    {item.buttonLabel} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <article
            className={`${cardClass} border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-zinc-950 p-6 sm:p-8`}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
              What&apos;s Next
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Ready for Phase 2
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              The MVP prototype is complete. Phase 2 connects real infrastructure,
              accounts, and AI to turn this demo into a production training
              platform.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {phase2Items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-zinc-300"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                    +
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/roadmap" className={btnPrimaryClass}>
                View Full Roadmap →
              </Link>
              <Link href="/choose-track" className={btnSecondaryClass}>
                Restart Demo
              </Link>
            </div>
          </article>
        </section>

        <p className="mt-8 text-center text-sm text-zinc-500">
          All data on this demo is mock-only.{" "}
          <Link href="/" className={linkAccentClass}>
            Return to landing
          </Link>
        </p>
      </PageMain>
    </AcademyShell>
  );
}
