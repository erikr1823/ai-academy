import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up — AI Academy",
  description: "Create your AI Academy account and choose your learning track.",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
