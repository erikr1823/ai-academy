const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  track: string;
};

export function validateSignupPayload(
  body: unknown,
): { ok: true; data: SignupPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "All fields are required" };
  }

  const { firstName, lastName, email, track } = body as Record<string, unknown>;

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof track !== "string" ||
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim() ||
    !track.trim()
  ) {
    return { ok: false, error: "All fields are required" };
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return { ok: false, error: "Invalid email address" };
  }

  if (track !== "essentials" && track !== "builder") {
    return { ok: false, error: "Invalid track selection" };
  }

  return {
    ok: true,
    data: {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      track: track.trim(),
    },
  };
}

export function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}
