import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/marketing-header";

export const metadata: Metadata = {
  title: "Welcome — AI Academy",
  description: "Your AI Academy signup is complete.",
};

type PageProps = {
  searchParams: Promise<{ email?: string }>;
};

export default async function SignupConfirmPage({ searchParams }: PageProps) {
  const { email: emailParam } = await searchParams;
  const email = emailParam
    ? decodeURIComponent(emailParam)
    : "your email address";

  return (
    <div className="relative min-h-screen bg-black">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/4 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      <MarketingHeader />

      <main className="relative flex flex-1 flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-black">
            ✓
          </div>

          <p className="mt-8 text-sm font-medium uppercase tracking-wider text-emerald-400">
            Welcome to AI Academy
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            You&apos;re in!
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            Check{" "}
            <span className="font-medium text-emerald-400">{email}</span> for
            your login link.
          </p>

          <p className="mt-3 text-sm text-zinc-500">
            Magic link login is not enabled yet—this is a placeholder until
            authentication is added in Phase 2.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
            >
              Go to Login
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-700 px-6 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
            >
              Explore Dashboard (Demo)
            </Link>
          </div>

          <Link
            href="/"
            className="mt-8 inline-block text-sm text-emerald-400 transition-colors hover:text-emerald-300"
          >
            ← Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
