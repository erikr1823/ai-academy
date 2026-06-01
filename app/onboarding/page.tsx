import type { Metadata } from "next";
import { AcademyShell, PageMain } from "@/components/academy-shell";
import { OnboardingFlow } from "@/components/onboarding-flow";

export const metadata: Metadata = {
  title: "Onboarding — AI Academy",
  description: "Find your recommended AI Academy learning path.",
};

export default function OnboardingPage() {
  return (
    <AcademyShell activeKey="onboarding" pageLabel="Onboarding" demoStep={3}>
      <PageMain>
        <OnboardingFlow />
      </PageMain>
    </AcademyShell>
  );
}
