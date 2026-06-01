export type SubmissionStatus =
  | "Submitted"
  | "In Review"
  | "Approved"
  | "Needs Revision";

export type Submission = {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  track: string;
  xp: number;
  submittedAt: string;
  status: SubmissionStatus;
  feedback?: string;
};

export type AchievementBadge = {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  icon: string;
};

export const submissions: Submission[] = [
  {
    id: "sub-001",
    assignmentId: "first-ai-workflow-design",
    assignmentTitle: "First AI Workflow Design",
    track: "AI Builder",
    xp: 250,
    submittedAt: "May 28, 2026",
    status: "Approved",
    feedback: "Excellent workflow documentation. Clear steps and strong sample output.",
  },
  {
    id: "sub-002",
    assignmentId: "chatgpt-basics",
    assignmentTitle: "ChatGPT Basics for Work",
    track: "AI Essentials",
    xp: 150,
    submittedAt: "Jun 1, 2026",
    status: "In Review",
    feedback: "Reviewing your reflection and screenshot. Expect feedback within 24 hours.",
  },
  {
    id: "sub-003",
    assignmentId: "writing-better-prompts",
    assignmentTitle: "Writing Better Prompts",
    track: "AI Essentials",
    xp: 175,
    submittedAt: "May 25, 2026",
    status: "Needs Revision",
    feedback:
      "Good start. Please resubmit with clearer constraints on prompt #2 and add a comparison note for each output.",
  },
  {
    id: "sub-004",
    assignmentId: "email-automation-challenge",
    assignmentTitle: "Email Automation Challenge",
    track: "AI Builder",
    xp: 200,
    submittedAt: "May 30, 2026",
    status: "Submitted",
  },
];

export const achievementBadges: AchievementBadge[] = [
  {
    id: "first-assignment",
    name: "First Assignment",
    description: "Submitted your first weekly mission.",
    earned: true,
    icon: "1st",
  },
  {
    id: "prompt-master",
    name: "Prompt Master",
    description: "Completed three prompt-focused assignments.",
    earned: false,
    icon: "PM",
  },
  {
    id: "ai-explorer",
    name: "AI Explorer",
    description: "Finished assignments across both learning tracks.",
    earned: true,
    icon: "AI",
  },
  {
    id: "workplace-optimizer",
    name: "Workplace Optimizer",
    description: "Completed a workplace audit or automation assignment.",
    earned: false,
    icon: "WO",
  },
];

export function getSubmissionByAssignmentId(
  assignmentId: string,
): Submission | undefined {
  return submissions.find((s) => s.assignmentId === assignmentId);
}
