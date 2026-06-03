"use client";

import Link from "next/link";
import { useState } from "react";
import { SignupForm } from "@/components/signup-form";

export function SignupPageClient() {
  const [dbTestLoading, setDbTestLoading] = useState(false);
  const [dbTestMessage, setDbTestMessage] = useState<string | null>(null);
  const [dbTestSuccess, setDbTestSuccess] = useState(false);

  async function handleDbTest() {
    setDbTestLoading(true);
    setDbTestMessage(null);

    try {
      const response = await fetch("/api/test-db");
      const data = (await response.json()) as {
        success?: boolean;
        now?: string;
        error?: string;
      };

      if (data.success && data.now) {
        setDbTestSuccess(true);
        setDbTestMessage(
          `Database connected successfully. Server time: ${data.now}`,
        );
      } else {
        setDbTestSuccess(false);
        setDbTestMessage(data.error ?? "Database connection failed.");
      }
    } catch {
      setDbTestSuccess(false);
      setDbTestMessage("Unable to reach the database test endpoint.");
    } finally {
      setDbTestLoading(false);
    }
  }

  return (
    <>
      {dbTestMessage && (
        <div
          className={`relative mx-auto mt-6 max-w-lg rounded-xl border px-4 py-3 text-sm ${
            dbTestSuccess
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-400"
          }`}
          role="status"
        >
          {dbTestMessage}
        </div>
      )}

      <div className="relative mx-auto mt-10 max-w-lg">
        <SignupForm onDbTest={handleDbTest} dbTestLoading={dbTestLoading} />
      </div>

      <p className="relative mx-auto mt-8 max-w-lg text-center text-xs text-zinc-600">
        Accounts are saved to Neon PostgreSQL. Magic link login coming in a
        later phase.{" "}
        <Link href="/" className="text-zinc-500 hover:text-emerald-400">
          Back to home
        </Link>
      </p>
    </>
  );
}
