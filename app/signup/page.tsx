"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./signup.module.css";

type Track = "essentials" | "builder";

const steps = [
  { number: 1, label: "Account" },
  { number: 2, label: "Track" },
  { number: 3, label: "Payment" },
];

export default function SignupPage() {
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
  const [dbTestLoading, setDbTestLoading] = useState(false);
  const [dbTestMessage, setDbTestMessage] = useState<string | null>(null);
  const [dbTestSuccess, setDbTestSuccess] = useState(false);

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
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden>
        <div className={styles.glowOrb} />
      </div>

      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            AI <span className={styles.logoAccent}>Academy</span>
          </Link>
          <div className={styles.navActions}>
            <Link href="/login" className={styles.loginLink}>
              Login
            </Link>
            <Link href="/signup" className={styles.getStartedLink}>
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <p className={styles.eyebrow}>Get Started</p>
          <h1 className={styles.title}>Join AI Academy</h1>
          <p className={styles.subtitle}>
            Create your account in three quick steps.
          </p>
        </div>

        <div className={styles.content}>
          {dbTestMessage && (
            <div
              className={`${styles.alert} ${
                dbTestSuccess ? styles.alertSuccess : styles.alertError
              }`}
              role="status"
            >
              {dbTestMessage}
            </div>
          )}

          {error && (
            <div className={`${styles.alert} ${styles.alertError}`} role="alert">
              {error}
            </div>
          )}

          <div className={styles.formWrap}>
            <div className={styles.progress}>
              {steps.map((s, index) => (
                <div key={s.number} className={styles.progressStep}>
                  <div
                    className={`${styles.stepCircle} ${
                      step >= s.number
                        ? styles.stepCircleActive
                        : styles.stepCircleInactive
                    }`}
                  >
                    {s.number}
                  </div>
                  <span
                    className={`${styles.stepLabel} ${
                      step >= s.number
                        ? styles.stepLabelActive
                        : styles.stepLabelInactive
                    }`}
                  >
                    {s.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`${styles.stepLine} ${
                        step > s.number
                          ? styles.stepLineActive
                          : styles.stepLineInactive
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className={styles.card}>
              {step === 1 && (
                <div className={styles.stack}>
                  <div>
                    <h2 className={styles.cardTitle}>Create your account</h2>
                    <p className={styles.cardSubtitle}>
                      Step 1 of 3 — Tell us who you are
                    </p>
                  </div>

                  <div className={styles.fieldGrid}>
                    <div className={styles.field}>
                      <label htmlFor="firstName" className={styles.label}>
                        First name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={styles.input}
                        autoComplete="given-name"
                        disabled={loading}
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="lastName" className={styles.label}>
                        Last name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={styles.input}
                        autoComplete="family-name"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                      autoComplete="email"
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!canContinueStep1() || loading}
                    className={`${styles.btnPrimary} ${styles.btnPrimaryFull}`}
                  >
                    Continue
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className={styles.stack}>
                  <div>
                    <h2 className={styles.cardTitle}>Choose your track</h2>
                    <p className={styles.cardSubtitle}>
                      Step 2 of 3 — Pick the path that fits your goals
                    </p>
                  </div>

                  <div className={styles.trackList}>
                    <button
                      type="button"
                      onClick={() => setTrack("essentials")}
                      disabled={loading}
                      className={`${styles.trackOption} ${
                        track === "essentials" ? styles.trackOptionSelected : ""
                      }`}
                    >
                      <p className={styles.trackName}>AI Essentials</p>
                      <p className={styles.trackPrice}>$49/month</p>
                      <p className={styles.trackDesc}>
                        Workplace AI fluency for professionals.
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTrack("builder")}
                      disabled={loading}
                      className={`${styles.trackOption} ${
                        track === "builder" ? styles.trackOptionSelected : ""
                      }`}
                    >
                      <p className={styles.trackName}>AI Builder Academy</p>
                      <p className={styles.trackPrice}>$99/month</p>
                      <p className={styles.trackDesc}>
                        Build AI tools, automations, and real projects.
                      </p>
                    </button>
                  </div>

                  <div className={styles.btnRow}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={loading}
                      className={styles.btnSecondary}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!canContinueStep2() || loading}
                      className={styles.btnPrimary}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className={styles.stack}>
                  <div>
                    <h2 className={styles.cardTitle}>Mock payment</h2>
                    <p className={styles.cardSubtitle}>
                      Step 3 of 3 — No real charges in this prototype
                    </p>
                  </div>

                  <div className={styles.hintBox}>
                    Use test card:{" "}
                    <span className={styles.hintMono}>4242 4242 4242 4242</span>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="cardNumber" className={styles.label}>
                      Card number
                    </label>
                    <input
                      id="cardNumber"
                      type="text"
                      inputMode="numeric"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className={styles.input}
                      disabled={loading}
                    />
                  </div>

                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label htmlFor="expiration" className={styles.label}>
                        Expiration
                      </label>
                      <input
                        id="expiration"
                        type="text"
                        placeholder="MM/YY"
                        value={expiration}
                        onChange={(e) => setExpiration(e.target.value)}
                        className={styles.input}
                        disabled={loading}
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="cvc" className={styles.label}>
                        CVC
                      </label>
                      <input
                        id="cvc"
                        type="text"
                        inputMode="numeric"
                        placeholder="123"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className={styles.input}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className={styles.btnRow}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={loading}
                      className={styles.btnSecondary}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleComplete}
                      disabled={!canComplete() || loading}
                      className={styles.btnPrimary}
                    >
                      {loading ? "Creating account…" : "Complete Signup"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleDbTest}
              disabled={dbTestLoading}
              className={styles.btnGhost}
            >
              {dbTestLoading
                ? "Testing connection…"
                : "Test Database Connection"}
            </button>

            <p className={styles.loginPrompt}>
              Already have an account?{" "}
              <Link href="/login" className={styles.loginPromptLink}>
                Login
              </Link>
            </p>
          </div>
        </div>

        <p className={styles.footerNote}>
          Accounts are saved to Neon PostgreSQL. Magic link login coming in a
          later phase.{" "}
          <Link href="/" className={styles.footerLink}>
            Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}
