export type DemoFlowStep = {
  step: number;
  label: string;
  href: string;
};

export const demoFlowSteps: DemoFlowStep[] = [
  { step: 1, label: "Landing", href: "/" },
  { step: 2, label: "Choose Track", href: "/choose-track" },
  { step: 3, label: "Onboarding", href: "/onboarding" },
  { step: 4, label: "Dashboard", href: "/dashboard" },
  { step: 5, label: "Courses", href: "/courses" },
  { step: 6, label: "Lesson", href: "/courses/chatgpt-basics" },
  { step: 7, label: "AI Mentor", href: "/mentor" },
  { step: 8, label: "Projects", href: "/projects" },
  { step: 9, label: "Certificates", href: "/certificates" },
  { step: 10, label: "Admin", href: "/admin" },
];

export function getDemoStep(step: number) {
  return demoFlowSteps.find((item) => item.step === step);
}

export function getNextDemoStep(step: number) {
  return demoFlowSteps.find((item) => item.step === step + 1);
}

export function getPrevDemoStep(step: number) {
  return demoFlowSteps.find((item) => item.step === step - 1);
}
