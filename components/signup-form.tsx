"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Track = "essentials" | "builder";

const inputClass =
  "w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none";

const steps = [
  { number: 1, label: "Account" },
  { number: 2, label: "Track" },
  { number: 3, label: "Payment" },
];

type SignupFormProps = {
  dbTestLoading?: boolean;
  onDbTest?: () => void;
};

export function SignupForm({
  dbTestLoading = false,
  onDbTest,
}: SignupFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [track, setTrack] = useState<Track | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function canContinueStep1() {
    return firstName.trim() && lastName.trim() && email.trim().includes("@");
  }

  function canContinueStep2() {
    return track !== null;
  }

  function canComplete() {
    return (
      cardNumber.replace(/\s/g, "").length >= 15 &&
      expiration &&
      cvc.length >= 3
    );
  }

  async function handleComplete() {
    if (!track) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          track,
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      const encodedEmail = encodeURIComponent(email.trim().toLowerCase());
      router.push(`/signup/confirm?email=${encodedEmail}`);
    } catch {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-8 flex items-center justify-between gap-2">
        {steps.map((s, index) => (
          <div key={s.number} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                step >= s.number
                  ? "bg-emerald-500 text-black"
                  : "border border-zinc-700 bg-zinc-900 text-zinc-500"
              }`}
            >
              {s.number}
            </div>
            <span
              className={`hidden text-xs font-medium sm:inline ${
                step >= s.number ? "text-emerald-400" : "text-zinc-600"
              }`}
            >
              {s.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`mx-1 hidden h-px flex-1 sm:block ${
                  step > s.number ? "bg-emerald-500/50" : "bg-zinc-800"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div
          className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Create your account
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Step 1 of 3 — Tell us who you are
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClass}
                  autoComplete="given-name"
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClass}
                  autoComplete="family-name"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                autoComplete="email"
                disabled={loading}
              />
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!canContinueStep1() || loading}
              className="w-full rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Choose your track
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Step 2 of 3 — Pick the path that fits your goals
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setTrack("essentials")}
                disabled={loading}
                className={`w-full rounded-xl border p-5 text-left transition-all disabled:opacity-60 ${
                  track === "essentials"
                    ? "border-emerald-500/50 bg-emerald-500/10 ring-1 ring-emerald-500/30"
                    : "border-zinc-800 bg-zinc-900/50 hover:border-emerald-500/30"
                }`}
              >
                <p className="font-semibold text-white">AI Essentials</p>
                <p className="mt-1 text-lg font-bold text-emerald-400">
                  $49/month
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  Workplace AI fluency for professionals.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setTrack("builder")}
                disabled={loading}
                className={`w-full rounded-xl border p-5 text-left transition-all disabled:opacity-60 ${
                  track === "builder"
                    ? "border-emerald-500/50 bg-emerald-500/10 ring-1 ring-emerald-500/30"
                    : "border-zinc-800 bg-zinc-900/50 hover:border-emerald-500/30"
                }`}
              >
                <p className="font-semibold text-white">AI Builder Academy</p>
                <p className="mt-1 text-lg font-bold text-emerald-400">
                  $99/month
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  Build AI tools, automations, and real projects.
                </p>
              </button>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={loading}
                className="flex-1 rounded-lg border border-zinc-700 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400 disabled:opacity-60"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!canContinueStep2() || loading}
                className="flex-1 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Mock payment
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Step 3 of 3 — No real charges in this prototype
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-300">
              Use test card:{" "}
              <span className="font-mono font-semibold text-emerald-400">
                4242 4242 4242 4242
              </span>
            </div>

            <div>
              <label
                htmlFor="cardNumber"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
              >
                Card number
              </label>
              <input
                id="cardNumber"
                type="text"
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className={inputClass}
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiration"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
                >
                  Expiration
                </label>
                <input
                  id="expiration"
                  type="text"
                  placeholder="MM/YY"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                  className={inputClass}
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  htmlFor="cvc"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
                >
                  CVC
                </label>
                <input
                  id="cvc"
                  type="text"
                  inputMode="numeric"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className={inputClass}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={loading}
                className="flex-1 rounded-lg border border-zinc-700 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400 disabled:opacity-60"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleComplete}
                disabled={!canComplete() || loading}
                className="flex-1 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "Creating account…" : "Complete Signup"}
              </button>
            </div>
          </div>
        )}
      </div>

      {onDbTest && (
        <button
          type="button"
          onClick={onDbTest}
          disabled={dbTestLoading}
          className="mt-4 w-full rounded-lg border border-dashed border-zinc-700 px-4 py-2.5 text-xs font-medium text-zinc-500 transition-colors hover:border-emerald-500/40 hover:text-emerald-400 disabled:opacity-50"
        >
          {dbTestLoading ? "Testing connection…" : "Test Database Connection"}
        </button>
      )}

      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-emerald-400 hover:text-emerald-300"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
