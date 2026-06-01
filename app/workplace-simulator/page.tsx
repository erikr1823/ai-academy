import type { Metadata } from "next";
import { AcademyShell, PageMain } from "@/components/academy-shell";
import { WorkplaceSimulator } from "@/components/workplace-simulator";

export const metadata: Metadata = {
  title: "Workplace Simulator — AI Academy",
  description: "Practice AI exercises for real workplace roles.",
};

export default function WorkplaceSimulatorPage() {
  return (
    <AcademyShell activeKey="workplace-simulator" pageLabel="Simulator">
      <PageMain>
        <WorkplaceSimulator />
      </PageMain>
    </AcademyShell>
  );
}
