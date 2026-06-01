export type PhaseStatus = "Complete" | "Next" | "Planned" | "Future";

export type RoadmapPhase = {
  id: number;
  title: string;
  status: PhaseStatus;
  items: string[];
};

export type BusinessModelPlan = {
  name: string;
  price: string;
  description: string;
  highlighted?: boolean;
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 1,
    title: "MVP Prototype",
    status: "Complete",
    items: [
      "Landing page",
      "Two learning tracks",
      "Dashboard",
      "Courses",
      "AI Mentor mockup",
      "Workplace Simulator",
      "Projects",
      "Assignments",
      "Admin dashboard",
    ],
  },
  {
    id: 2,
    title: "Real Learning Platform",
    status: "Next",
    items: [
      "Neon database",
      "Real student accounts",
      "Real course progress",
      "Assignment submissions",
      "Certificate generation",
      "Admin course builder",
    ],
  },
  {
    id: 3,
    title: "AI-Powered Mentor",
    status: "Planned",
    items: [
      "OpenAI integration",
      "Personalized AI tutor",
      "Job-specific AI help",
      "Assignment feedback",
      "Prompt improvement",
      "Workplace simulation responses",
    ],
  },
  {
    id: 4,
    title: "Business Training Platform",
    status: "Future",
    items: [
      "Company accounts",
      "Employee training dashboards",
      "Team progress reports",
      "Custom business courses",
      "One-day seminar package",
      "Subscription billing",
    ],
  },
];

export const businessModelPlans: BusinessModelPlan[] = [
  {
    name: "AI Essentials",
    price: "$49/month",
    description: "Workplace AI fluency for experienced professionals.",
  },
  {
    name: "AI Builder Academy",
    price: "$99/month",
    description: "Build and deploy AI products, agents, and workflows.",
    highlighted: true,
  },
  {
    name: "Business Training",
    price: "Custom pricing",
    description: "Team dashboards, custom courses, and company-wide rollout.",
  },
  {
    name: "One-Day Workshop",
    price: "Per company",
    description: "Intensive on-site or virtual training for leadership teams.",
  },
];
