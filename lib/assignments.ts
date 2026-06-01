export type AssignmentStatus =
  | "Not Started"
  | "In Progress"
  | "Completed"
  | "In Review";

export type ChecklistStatus = "complete" | "in_progress" | "not_started";

export type AssignmentChecklistItem = {
  label: string;
  status: ChecklistStatus;
};

export type AssignmentSummary = {
  id: string;
  title: string;
  track: string;
  dueDate: string | null;
  xp: number;
  status: AssignmentStatus;
  description: string;
};

export type AssignmentDetail = {
  id: string;
  title: string;
  track: string;
  dueDate: string | null;
  xp: number;
  status: AssignmentStatus;
  missionBrief: string;
  instructions: string[];
  checklist: AssignmentChecklistItem[];
  reflectionPrompts: string[];
  mentorHelp: string;
};

export const assignmentSummaries: AssignmentSummary[] = [
  {
    id: "chatgpt-basics",
    title: "ChatGPT Basics for Work",
    track: "AI Essentials",
    dueDate: "Due Friday",
    xp: 150,
    status: "In Progress",
    description:
      "Draft a professional workplace email with ChatGPT, improve it with context, and explain what changed.",
  },
  {
    id: "prompt-engineering-challenge",
    title: "Prompt Engineering Challenge",
    track: "AI Builder",
    dueDate: "Due Sunday",
    xp: 200,
    status: "Not Started",
    description:
      "Design a multi-step prompt chain that turns raw notes into a structured product brief.",
  },
  {
    id: "workplace-automation-plan",
    title: "Workplace Automation Plan",
    track: "AI Essentials",
    dueDate: null,
    xp: 175,
    status: "Completed",
    description:
      "Map one repetitive workflow at work and outline how AI could automate each step.",
  },
  {
    id: "sitescope-demo-script",
    title: "SiteScope Demo Script",
    track: "AI Builder",
    dueDate: "Submitted May 28",
    xp: 250,
    status: "In Review",
    description:
      "Write a client-facing demo script for the SiteScope network scanner project.",
  },
];

export const assignmentDetails: Record<string, AssignmentDetail> = {
  "chatgpt-basics": {
    id: "chatgpt-basics",
    title: "ChatGPT Basics for Work",
    track: "AI Essentials",
    dueDate: "Due Friday",
    xp: 150,
    status: "In Progress",
    missionBrief:
      "Use ChatGPT to draft a professional workplace email, improve it with context, and explain what changed.",
    instructions: [
      "Open ChatGPT",
      "Write a basic email prompt",
      "Improve the prompt with more context",
      "Compare both outputs",
      "Save your best version",
    ],
    checklist: [
      { label: "Created first prompt", status: "complete" },
      { label: "Improved prompt with context", status: "complete" },
      { label: "Compared results", status: "in_progress" },
      { label: "Wrote short reflection", status: "not_started" },
      { label: "Submitted screenshot", status: "not_started" },
    ],
    reflectionPrompts: [
      "What was different between your first prompt and your improved prompt?",
      "Which output was more useful for a real workplace scenario, and why?",
      "What context (audience, tone, goal) made the biggest difference?",
    ],
    mentorHelp:
      "Need help completing this assignment? Ask your AI Mentor to improve your prompt or review your reflection.",
  },
  "prompt-engineering-challenge": {
    id: "prompt-engineering-challenge",
    title: "Prompt Engineering Challenge",
    track: "AI Builder",
    dueDate: "Due Sunday",
    xp: 200,
    status: "Not Started",
    missionBrief:
      "Build a prompt chain that transforms messy meeting notes into a structured product brief with goals, risks, and next steps.",
    instructions: [
      "Collect sample meeting notes (provided template or your own)",
      "Write a system prompt that defines the output format",
      "Add a second prompt to extract risks and open questions",
      "Run the chain and review the structured brief",
      "Save your final prompt chain and one sample output",
    ],
    checklist: [
      { label: "Reviewed sample meeting notes", status: "not_started" },
      { label: "Created system prompt", status: "not_started" },
      { label: "Added extraction prompt", status: "not_started" },
      { label: "Generated sample brief", status: "not_started" },
      { label: "Submitted proof", status: "not_started" },
    ],
    reflectionPrompts: [
      "What format constraints helped ChatGPT stay on track?",
      "Where did the chain break down, and how did you fix it?",
      "How would you adapt this for a different document type?",
    ],
    mentorHelp:
      "Need help with prompt chaining? Ask your AI Mentor to review your system prompt or suggest output schema improvements.",
  },
  "workplace-automation-plan": {
    id: "workplace-automation-plan",
    title: "Workplace Automation Plan",
    track: "AI Essentials",
    dueDate: null,
    xp: 175,
    status: "Completed",
    missionBrief:
      "Identify one repetitive workflow at work and document how AI tools could reduce manual effort at each step.",
    instructions: [
      "Pick a weekly task you repeat (reports, emails, scheduling, etc.)",
      "Break it into 5–7 concrete steps",
      "Mark which steps AI could assist today vs. need human review",
      "Estimate time saved per week",
      "Submit your one-page automation plan",
    ],
    checklist: [
      { label: "Selected workflow", status: "complete" },
      { label: "Mapped steps", status: "complete" },
      { label: "Marked AI opportunities", status: "complete" },
      { label: "Estimated time saved", status: "complete" },
      { label: "Submitted plan", status: "complete" },
    ],
    reflectionPrompts: [
      "Which step had the highest ROI for AI assistance?",
      "What guardrails would you need before automating this at work?",
    ],
    mentorHelp:
      "Want feedback on your automation plan? Ask your AI Mentor to stress-test your workflow or suggest safer rollout steps.",
  },
  "sitescope-demo-script": {
    id: "sitescope-demo-script",
    title: "SiteScope Demo Script",
    track: "AI Builder",
    dueDate: "Submitted May 28",
    xp: 250,
    status: "In Review",
    missionBrief:
      "Write a 5-minute client demo script for SiteScope that walks through scanning, asset discovery, and report generation.",
    instructions: [
      "Open your SiteScope project overview",
      "Outline the demo story: problem → scan → insights → report",
      "Write speaker notes for each screen",
      "Add one objection-handling line for security concerns",
      "Submit your script and a screenshot of your demo flow",
    ],
    checklist: [
      { label: "Outlined demo story", status: "complete" },
      { label: "Wrote speaker notes", status: "complete" },
      { label: "Added objection handling", status: "complete" },
      { label: "Submitted script", status: "complete" },
      { label: "Awaiting mentor review", status: "in_progress" },
    ],
    reflectionPrompts: [
      "What client question are you most prepared to answer?",
      "Which part of the demo builds the most trust?",
    ],
    mentorHelp:
      "Waiting on review or want a dry run? Ask your AI Mentor to critique your demo script or simulate client questions.",
  },
};

export function getAllAssignmentIds(): string[] {
  return assignmentSummaries.map((assignment) => assignment.id);
}

export function getAssignmentById(id: string): AssignmentDetail | undefined {
  return assignmentDetails[id];
}
