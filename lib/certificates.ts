export type CertificateStatus = "Earned" | "In Progress" | "Locked";

export type Certificate = {
  id: string;
  name: string;
  status: CertificateStatus;
  progress: number;
  date?: string;
  expected?: string;
};

export type Badge = {
  id: string;
  icon: string;
  name: string;
  description: string;
  earned: boolean;
};

export const profileStats = {
  totalXp: 3450,
  badgesEarned: 8,
  certificates: 2,
  currentRank: "AI Builder",
};

export const certificates: Certificate[] = [
  {
    id: "essentials",
    name: "AI Essentials Certificate",
    status: "Earned",
    progress: 100,
    date: "May 2026",
  },
  {
    id: "builder",
    name: "AI Builder Academy Certificate",
    status: "In Progress",
    progress: 62,
    expected: "July 2026",
  },
  {
    id: "workplace",
    name: "Workplace AI Professional",
    status: "Locked",
    progress: 0,
  },
];

export const badges: Badge[] = [
  {
    id: "prompt-builder",
    icon: "PB",
    name: "Prompt Builder",
    description: "Completed the prompt engineering lesson track.",
    earned: true,
  },
  {
    id: "email-automation",
    icon: "EM",
    name: "Email Automation",
    description: "Finished the email automation module with proof submitted.",
    earned: true,
  },
  {
    id: "workflow-starter",
    icon: "WF",
    name: "Workflow Starter",
    description: "Designed your first AI workflow from input to output.",
    earned: true,
  },
  {
    id: "sitescope-builder",
    icon: "SS",
    name: "SiteScope Builder",
    description: "Reached 80% progress on the SiteScope capstone project.",
    earned: true,
  },
  {
    id: "mentor-power-user",
    icon: "AM",
    name: "AI Mentor Power User",
    description: "Completed 10 mentor conversations across topics.",
    earned: true,
  },
  {
    id: "workplace-simulator",
    icon: "WS",
    name: "Workplace Simulator",
    description: "Finished three role-based practice exercises.",
    earned: true,
  },
  {
    id: "project-finisher",
    icon: "PF",
    name: "Project Finisher",
    description: "Shipped a capstone project with all deliverables.",
    earned: true,
  },
  {
    id: "weekly-streak",
    icon: "7D",
    name: "Weekly Streak",
    description: "Learned seven days in a row without missing a session.",
    earned: true,
  },
];

export const rankLadder = [
  "Rookie",
  "Apprentice",
  "Builder",
  "Operator",
  "AI Builder",
  "Mentor",
] as const;

export type Rank = (typeof rankLadder)[number];
