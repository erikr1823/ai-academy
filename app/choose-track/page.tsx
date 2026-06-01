import type { Metadata } from "next";
import Link from "next/link";
import {
  AcademyShell,
  btnPrimaryClass,
  cardInteractiveClass,
  PageHeader,
  PageMain,
} from "@/components/academy-shell";

export const metadata: Metadata = {
  title: "Choose Track — AI Academy",
  description: "Choose your AI Academy learning path.",
};

const tracks = [
  {
    badge: "Path 01",
    name: "AI Essentials",
    description:
      "For professionals 45+ who want practical AI skills for the workplace—reports, research, communication, and everyday productivity.",
    highlights: [
      "Workplace AI fluency",
      "Executive-ready outputs",
      "No coding required",
      "20 guided lessons",
    ],
    cta: "Start Essentials",
    href: "/onboarding",
  },
  {
    badge: "Path 02",
    name: "AI Builder Academy",
    description:
      "For builders, entrepreneurs, and tech professionals ready to create AI products, agents, and deployable workflows.",
    highlights: [
      "Build real AI products",
      "Agents and automations",
      "Deploy-ready projects",
      "19 hands-on modules",
    ],
    cta: "Start Builder Path",
    href: "/onboarding",
  },
];

export default function ChooseTrackPage() {
  return (
    <AcademyShell activeKey="choose-track" pageLabel="Choose Track" demoStep={2}>
      <PageMain>
        <PageHeader
          label="Choose Track"
          title="Pick the path that fits your goals"
          description="Both tracks include an AI mentor, practical lessons, and real projects. You can switch focus anytime."
        />

        <section className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {tracks.map((track) => (
            <article
              key={track.name}
              className={`${cardInteractiveClass} flex flex-col p-8 sm:p-10`}
            >
              <span className="mb-4 inline-flex w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-400">
                {track.badge}
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {track.name}
              </h2>
              <p className="mt-4 flex-1 text-base leading-relaxed text-zinc-400">
                {track.description}
              </p>
              <ul className="mt-6 space-y-2">
                {track.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <span className="font-bold text-emerald-400">+</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={track.href}
                className={`mt-8 w-full sm:w-auto ${btnPrimaryClass} px-6 py-4 text-base`}
              >
                {track.cta}
              </Link>
            </article>
          ))}
        </section>
      </PageMain>
    </AcademyShell>
  );
}
