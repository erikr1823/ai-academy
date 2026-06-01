export type DemoModeStep = {
  step: number;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
};

export const demoModeSteps: DemoModeStep[] = [
  {
    step: 1,
    title: "Landing Page",
    description: "Introduces the two-track AI Academy model.",
    href: "/",
    buttonLabel: "View Landing Page",
  },
  {
    step: 2,
    title: "Choose Track",
    description: "Users choose AI Essentials or AI Builder Academy.",
    href: "/choose-track",
    buttonLabel: "Choose Track",
  },
  {
    step: 3,
    title: "Onboarding",
    description:
      "The platform recommends a path based on experience, profession, and goals.",
    href: "/onboarding",
    buttonLabel: "Start Onboarding",
  },
  {
    step: 4,
    title: "Dashboard",
    description:
      "Students track progress, XP, lessons, projects, and next steps.",
    href: "/dashboard",
    buttonLabel: "Open Dashboard",
  },
  {
    step: 5,
    title: "Courses",
    description: "Structured curriculum for both Essentials and Builder users.",
    href: "/courses",
    buttonLabel: "Browse Courses",
  },
  {
    step: 6,
    title: "Assignments",
    description:
      "Students complete weekly missions and submit proof of work.",
    href: "/assignments",
    buttonLabel: "View Assignments",
  },
  {
    step: 7,
    title: "Workplace Simulator",
    description:
      "Professionals practice AI tasks based on their real job role.",
    href: "/workplace-simulator",
    buttonLabel: "Try Simulator",
  },
  {
    step: 8,
    title: "AI Mentor",
    description:
      "A personal AI coach helps with lessons, assignments, and workplace examples.",
    href: "/mentor",
    buttonLabel: "Open AI Mentor",
  },
  {
    step: 9,
    title: "Projects",
    description:
      "Builder students complete real-world projects like SiteScope.",
    href: "/projects",
    buttonLabel: "View Projects",
  },
  {
    step: 10,
    title: "Admin Dashboard",
    description:
      "Frankie/admin can track students, progress, assignments, and alerts.",
    href: "/admin",
    buttonLabel: "Open Admin",
  },
];

export const phase2Items = [
  "Connect Neon database",
  "Add real student accounts",
  "Add OpenAI Mentor",
  "Add real assignment submissions",
  "Add certificates",
];
