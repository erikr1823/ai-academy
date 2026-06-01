import type { Metadata } from "next";
import { AcademyShell } from "@/components/academy-shell";
import { MentorChat } from "@/components/mentor-chat";

export const metadata: Metadata = {
  title: "AI Mentor — AI Academy",
  description: "Chat with your AI Academy mentor.",
};

export default function MentorPage() {
  return (
    <AcademyShell activeKey="mentor" pageLabel="AI Mentor" fullWidth demoStep={7}>
      <MentorChat />
    </AcademyShell>
  );
}
