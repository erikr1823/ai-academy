export type AssignmentStatus =
  | "Not Started"
  | "In Progress"
  | "Completed"
  | "In Review";

export type AssignmentDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type AssignmentListSection =
  | "assigned-this-week"
  | "due-soon"
  | "completed";

export type ChecklistStatus = "complete" | "in_progress" | "not_started";

export type AssignmentChecklistItem = {
  label: string;
  status: ChecklistStatus;
};

export type AssignmentResource = {
  label: string;
  href: string;
};

export type AssignmentSummary = {
  id: string;
  title: string;
  track: string;
  dueDate: string;
  xp: number;
  difficulty: AssignmentDifficulty;
  status: AssignmentStatus;
  description: string;
  listSection: AssignmentListSection;
};

export type AssignmentDetail = {
  id: string;
  title: string;
  track: string;
  dueDate: string;
  xp: number;
  difficulty: AssignmentDifficulty;
  status: AssignmentStatus;
  missionBrief: string;
  instructions: string[];
  checklist: AssignmentChecklistItem[];
  reflectionPrompts: string[];
  resources: AssignmentResource[];
  mentorHelp: string;
};

export const assignmentSummaries: AssignmentSummary[] = [
  {
    id: "chatgpt-basics",
    title: "ChatGPT Basics for Work",
    track: "AI Essentials",
    dueDate: "Due Friday",
    xp: 150,
    difficulty: "Beginner",
    status: "In Progress",
    listSection: "assigned-this-week",
    description:
      "Draft a professional workplace email with ChatGPT, improve it with context, and explain what changed.",
  },
  {
    id: "writing-better-prompts",
    title: "Writing Better Prompts",
    track: "AI Essentials",
    dueDate: "Due Saturday",
    xp: 175,
    difficulty: "Intermediate",
    status: "Not Started",
    listSection: "assigned-this-week",
    description:
      "Practice writing clear, context-rich prompts for reports, summaries, and team updates.",
  },
  {
    id: "email-automation-challenge",
    title: "Email Automation Challenge",
    track: "AI Builder",
    dueDate: "Due Sunday",
    xp: 200,
    difficulty: "Intermediate",
    status: "Not Started",
    listSection: "assigned-this-week",
    description:
      "Design an AI-assisted email workflow that drafts, reviews, and organizes inbox responses.",
  },
  {
    id: "workplace-ai-audit",
    title: "Workplace AI Audit",
    track: "AI Essentials",
    dueDate: "Due Monday",
    xp: 180,
    difficulty: "Intermediate",
    status: "Not Started",
    listSection: "due-soon",
    description:
      "Audit one department workflow and identify three high-impact opportunities for AI assistance.",
  },
  {
    id: "first-ai-workflow-design",
    title: "First AI Workflow Design",
    track: "AI Builder",
    dueDate: "Due Wednesday",
    xp: 250,
    difficulty: "Advanced",
    status: "Completed",
    listSection: "completed",
    description:
      "Map and document your first multi-step AI workflow from input to deliverable output.",
  },
];

export const assignmentDetails: Record<string, AssignmentDetail> = {
  "chatgpt-basics": {
    id: "chatgpt-basics",
    title: "ChatGPT Basics for Work",
    track: "AI Essentials",
    dueDate: "Due Friday",
    xp: 150,
    difficulty: "Beginner",
    status: "In Progress",
    missionBrief:
      "Use ChatGPT to draft a professional workplace email, improve it with context, and explain what changed.",
    instructions: [
      "Open ChatGPT and start a new conversation.",
      "Write a basic email prompt without much context.",
      "Improve the prompt by adding audience, tone, and goal.",
      "Compare both outputs side by side.",
      "Save your best version and write a short reflection.",
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
      "What context made the biggest difference?",
    ],
    resources: [
      { label: "Lesson: ChatGPT Basics", href: "/courses/chatgpt-basics" },
      { label: "Prompt Writing Guide (PDF placeholder)", href: "#" },
      { label: "Example workplace email prompts", href: "#" },
    ],
    mentorHelp:
      "Need help completing this assignment? Ask your AI Mentor to improve your prompt or review your reflection.",
  },
  "writing-better-prompts": {
    id: "writing-better-prompts",
    title: "Writing Better Prompts",
    track: "AI Essentials",
    dueDate: "Due Saturday",
    xp: 175,
    difficulty: "Intermediate",
    status: "Not Started",
    missionBrief:
      "Write three prompts for real workplace tasks—a status update, a meeting summary, and a client reply—and refine each one for clarity and context.",
    instructions: [
      "Pick three real tasks from your work week.",
      "Write a first-draft prompt for each task.",
      "Add role, audience, format, and constraints to each prompt.",
      "Run each prompt and evaluate the output quality.",
      "Submit your best prompt set with a brief improvement note for each.",
    ],
    checklist: [
      { label: "Selected three workplace tasks", status: "not_started" },
      { label: "Drafted initial prompts", status: "not_started" },
      { label: "Added context and constraints", status: "not_started" },
      { label: "Tested and compared outputs", status: "not_started" },
      { label: "Submitted final prompt set", status: "not_started" },
    ],
    reflectionPrompts: [
      "Which prompt improved the most after adding context?",
      "What constraint (tone, length, format) mattered most?",
    ],
    resources: [
      { label: "Lesson: Prompt Engineering", href: "/courses/prompt-engineering" },
      { label: "Prompt checklist template", href: "#" },
      { label: "AI Mentor: Prompt review tips", href: "/mentor" },
    ],
    mentorHelp:
      "Ask your AI Mentor to review your prompts and suggest stronger context blocks or output formats.",
  },
  "email-automation-challenge": {
    id: "email-automation-challenge",
    title: "Email Automation Challenge",
    track: "AI Builder",
    dueDate: "Due Sunday",
    xp: 200,
    difficulty: "Intermediate",
    status: "Not Started",
    missionBrief:
      "Design a simple AI email workflow that triages incoming messages, drafts responses, and flags items that need human review.",
    instructions: [
      "List five common email types you handle at work.",
      "Define triage rules for each type (auto-draft, review, escalate).",
      "Write prompt templates for two auto-draft scenarios.",
      "Sketch the workflow steps from inbox to sent/reviewed.",
      "Submit your workflow diagram and prompt templates.",
    ],
    checklist: [
      { label: "Catalogued email types", status: "not_started" },
      { label: "Defined triage rules", status: "not_started" },
      { label: "Created prompt templates", status: "not_started" },
      { label: "Documented workflow steps", status: "not_started" },
      { label: "Submitted deliverables", status: "not_started" },
    ],
    reflectionPrompts: [
      "Which emails should never be fully automated?",
      "What guardrails would you add before deploying this at work?",
    ],
    resources: [
      { label: "Lesson: Email Automation", href: "/courses/email-automation" },
      { label: "Workflow diagram template", href: "#" },
      { label: "Project: AI Email Assistant", href: "/projects/email-assistant" },
    ],
    mentorHelp:
      "Ask your AI Mentor to stress-test your triage rules or improve your auto-draft prompts.",
  },
  "workplace-ai-audit": {
    id: "workplace-ai-audit",
    title: "Workplace AI Audit",
    track: "AI Essentials",
    dueDate: "Due Monday",
    xp: 180,
    difficulty: "Intermediate",
    status: "Not Started",
    missionBrief:
      "Audit one team or department workflow and identify three high-impact places where AI could save time without sacrificing quality.",
    instructions: [
      "Choose a workflow you know well (yours or your team's).",
      "Break it into individual steps and estimate time per step.",
      "Mark steps as manual, AI-assistable, or human-required.",
      "Rank the top three AI opportunities by impact and feasibility.",
      "Submit your audit document with recommendations.",
    ],
    checklist: [
      { label: "Selected target workflow", status: "not_started" },
      { label: "Mapped steps and time costs", status: "not_started" },
      { label: "Ranked AI opportunities", status: "not_started" },
      { label: "Drafted recommendations", status: "not_started" },
      { label: "Submitted audit document", status: "not_started" },
    ],
    reflectionPrompts: [
      "Which opportunity has the best ROI with the lowest risk?",
      "What would you pilot first in a real workplace?",
    ],
    resources: [
      { label: "Workplace Simulator", href: "/workplace-simulator" },
      { label: "AI audit worksheet", href: "#" },
      { label: "Example audit (anonymized)", href: "#" },
    ],
    mentorHelp:
      "Ask your AI Mentor to review your audit priorities or suggest pilot rollout steps.",
  },
  "first-ai-workflow-design": {
    id: "first-ai-workflow-design",
    title: "First AI Workflow Design",
    track: "AI Builder",
    dueDate: "Due Wednesday",
    xp: 250,
    difficulty: "Advanced",
    status: "Completed",
    missionBrief:
      "Design and document your first multi-step AI workflow—from raw input through processing steps to a polished deliverable.",
    instructions: [
      "Define the workflow goal and end deliverable.",
      "List each step: input, AI action, human review, output.",
      "Write prompts or tool calls for each AI step.",
      "Run the workflow once with sample data.",
      "Submit documentation and one sample output.",
    ],
    checklist: [
      { label: "Defined workflow goal", status: "complete" },
      { label: "Mapped all steps", status: "complete" },
      { label: "Wrote AI step prompts", status: "complete" },
      { label: "Ran sample workflow", status: "complete" },
      { label: "Submitted documentation", status: "complete" },
    ],
    reflectionPrompts: [
      "Where did the workflow break down and how did you fix it?",
      "What would you automate next in this workflow?",
    ],
    resources: [
      { label: "Lesson: AI Workflows", href: "/courses/ai-workflows" },
      { label: "Workflow documentation template", href: "#" },
      { label: "Project: SiteScope", href: "/projects/sitescope" },
    ],
    mentorHelp:
      "Ask your AI Mentor to review your workflow architecture or suggest error-handling steps.",
  },
};

export const assignmentListSections: {
  key: AssignmentListSection;
  title: string;
  description: string;
}[] = [
  {
    key: "assigned-this-week",
    title: "Assigned This Week",
    description: "Your current weekly missions—start here.",
  },
  {
    key: "due-soon",
    title: "Due Soon",
    description: "Upcoming assignments to plan ahead for.",
  },
  {
    key: "completed",
    title: "Completed",
    description: "Finished assignments and earned XP.",
  },
];

export function getAssignmentsBySection(
  section: AssignmentListSection,
): AssignmentSummary[] {
  return assignmentSummaries.filter((a) => a.listSection === section);
}

export function getAllAssignmentIds(): string[] {
  return assignmentSummaries.map((assignment) => assignment.id);
}

export function getAssignmentById(id: string): AssignmentDetail | undefined {
  return assignmentDetails[id];
}

export function getAssignmentSummaryById(
  id: string,
): AssignmentSummary | undefined {
  return assignmentSummaries.find((a) => a.id === id);
}
