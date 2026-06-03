import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/marketing-header";

export const metadata: Metadata = {
  title: "Login — AI Academy",
  description: "Log in to your AI Academy account.",
};

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-32 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      <MarketingHeader />

      <main className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
              Login
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="mt-3 text-base text-zinc-400">
              Authentication is coming in Phase 2. For now, explore the demo app
              or complete signup.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
            <p className="text-center text-sm text-zinc-500">
              Email magic links and Clerk auth are not connected yet.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
              >
                Enter Demo Dashboard
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-700 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
              >
                Create an Account
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-500">
            <Link href="/" className="text-emerald-400 hover:text-emerald-300">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
