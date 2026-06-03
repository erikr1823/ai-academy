"use client";

import Link from "next/link";
import { useState } from "react";
import {
  btnPrimaryClass,
  btnSecondaryClass,
  cardInteractiveClass,
  cardClass,
  PageHeader,
  ProgressBar,
  TrackBadge,
} from "@/components/academy-shell";

const STEP_COUNT = 3;

const stepOneOptions = [
  "Business Professional",
  "Small Business Owner",
  "Student",
  "IT Professional",
  "Entrepreneur",
] as const;

const stepTwoOptions = [
  "Never Used It",
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

const stepThreeOptions = [
  "Save Time",
  "Keep My Job Competitive",
  "Learn AI",
  "Build Apps",
  "Start a Business",
] as const;

type StepOne = (typeof stepOneOptions)[number];
type StepTwo = (typeof stepTwoOptions)[number];
type StepThree = (typeof stepThreeOptions)[number];

type Answers = {
  profile: StepOne | null;
  comfort: StepTwo | null;
  goal: StepThree | null;
};

type TrackRecommendation = "essentials" | "builder";

function getRecommendation(answers: Answers): TrackRecommendation {
  const builderProfiles: StepOne[] = ["IT Professional", "Entrepreneur"];
  const builderGoals: StepThree[] = ["Build Apps", "Start a Business"];

  if (answers.profile && builderProfiles.includes(answers.profile)) return "builder";
  if (answers.comfort === "Advanced") return "builder";
  if (answers.goal && builderGoals.includes(answers.goal)) return "builder";

  return "essentials";
}

const trackDetails = {
  essentials: {
    name: "AI Essentials",
    why: "You're focused on practical workplace AI skills—writing, research, communication, and everyday productivity without needing to code.",
    firstLesson: "Week 1: What is AI? — understand core concepts and apply them immediately at work.",
    badge: "8-Week Track",
  },
  builder: {
    name: "AI Builder Academy",
    why: "Your profile and goals point toward building AI products, automations, and deployable workflows—not just using AI at work.",
    firstLesson: "Week 1: AI Fundamentals — set up your builder toolkit and ship your first workflow.",
    badge: "24-Week Track",
  },
};

function OptionButton({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors sm:text-base ${
        selected
          ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
          : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    profile: null,
    comfort: null,
    goal: null,
  });

  const showResult = step > STEP_COUNT;
  const recommendation = getRecommendation(answers);
  const track = trackDetails[recommendation];
  const progress = showResult ? 100 : Math.round(((step - 1) / STEP_COUNT) * 100);

  function goNext() {
    if (step <= STEP_COUNT) setStep((current) => current + 1);
  }

  function goBack() {
    if (showResult) setStep(STEP_COUNT);
    else if (step > 1) setStep((current) => current - 1);
  }

  function canContinue() {
    if (step === 1) return answers.profile !== null;
    if (step === 2) return answers.comfort !== null;
    if (step === 3) return answers.goal !== null;
    return false;
  }

  return (
    <div>
      <PageHeader
        label="Onboarding"
        title="Find your best learning path"
        description="Answer three quick questions and we'll recommend the AI Academy track that fits your goals."
      />

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-zinc-400">
            {showResult ? "Complete" : `Step ${step} of ${STEP_COUNT}`}
          </span>
          <span className="font-medium text-emerald-400">{progress}%</span>
        </div>
        <ProgressBar value={progress} />
      </div>

      {!showResult ? (
        <div className={`${cardInteractiveClass} mt-8 p-6 sm:p-8`}>
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-white">
                What best describes you?
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Choose the option that best matches your current role.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {stepOneOptions.map((option) => (
                  <OptionButton
                    key={option}
                    label={option}
                    selected={answers.profile === option}
                    onSelect={() =>
                      setAnswers((prev) => ({ ...prev, profile: option }))
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-white">
                How comfortable are you with AI?
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Be honest—there is no wrong answer.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {stepTwoOptions.map((option) => (
                  <OptionButton
                    key={option}
                    label={option}
                    selected={answers.comfort === option}
                    onSelect={() =>
                      setAnswers((prev) => ({ ...prev, comfort: option }))
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-white">
                What is your main goal?
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                We&apos;ll use this to personalize your starting point.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {stepThreeOptions.map((option) => (
                  <OptionButton
                    key={option}
                    label={option}
                    selected={answers.goal === option}
                    onSelect={() =>
                      setAnswers((prev) => ({ ...prev, goal: option }))
                    }
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 1}
              className={`${btnSecondaryClass} disabled:cursor-not-allowed disabled:opacity-40`}
            >
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canContinue()}
              className={`${btnPrimaryClass} disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {step === STEP_COUNT ? "See Recommendation" : "Continue"}
            </button>
          </div>
        </div>
      ) : (
        <article
          className={`${cardClass} mt-8 border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-zinc-950 p-6 sm:p-8`}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
            Recommended Track
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {track.name}
            </h2>
            <TrackBadge label={track.badge} />
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Why this track fits
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {track.why}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                What you will learn first
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {track.firstLesson}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-zinc-800 bg-black/40 p-4">
            <p className="text-xs text-zinc-500">Your answers</p>
            <p className="mt-2 text-sm text-zinc-300">
              {answers.profile} · {answers.comfort} · {answers.goal}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className={`${btnPrimaryClass} px-6 py-3`}>
              Start Recommended Path
            </Link>
            <Link href="/courses" className={btnSecondaryClass}>
              Explore Courses
            </Link>
          </div>

          <button type="button" onClick={goBack} className={`mt-4 ${btnSecondaryClass}`}>
            Change Answers
          </button>
        </article>
      )}
    </div>
  );
}
