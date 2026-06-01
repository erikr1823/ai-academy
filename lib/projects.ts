export type ChecklistStatus = "complete" | "in_progress" | "not_started";

export type MissionItem = {
  label: string;
  status: ChecklistStatus;
};

export type ProjectDetail = {
  id: string;
  title: string;
  track: string;
  status: string;
  progress: number;
  updated: string;
  overview: string;
  missionChecklist: MissionItem[];
  deliverables: string[];
  resources: { label: string; href: string }[];
};

export const projectSummaries = [
  {
    id: "sitescope",
    name: "SiteScope Project",
    track: "Builder Academy",
    description:
      "Build a field tool that helps technicians scan client networks, discover devices, and generate client-ready reports.",
    status: "In Progress",
    progress: 85,
    updated: "Updated 2 days ago",
    milestones: [
      "Next.js app created",
      "Database tables set up",
      "Scanner workflow in progress",
    ],
  },
  {
    id: "helpdesk-ai",
    name: "HelpDesk AI",
    track: "Builder Academy",
    description:
      "An internal support agent that triages tickets, suggests responses, and escalates complex issues to humans.",
    status: "In Review",
    progress: 85,
    updated: "Updated yesterday",
    milestones: [
      "Ticket intake flow",
      "Response templates",
      "QA review in progress",
    ],
  },
  {
    id: "email-assistant",
    name: "AI Email Assistant",
    track: "AI Essentials",
    description:
      "Draft, refine, and organize professional emails with AI—built for executive communication workflows.",
    status: "In Progress",
    progress: 42,
    updated: "Updated 4 days ago",
    milestones: [
      "Prompt library created",
      "Tone presets added",
      "Integration planned",
    ],
  },
];

export const projectDetails: Record<string, ProjectDetail> = {
  sitescope: {
    id: "sitescope",
    title: "SiteScope Network Scanner",
    track: "AI Builder Academy",
    status: "In Progress",
    progress: 85,
    updated: "Updated 2 days ago",
    overview:
      "Build a field tool that helps technicians scan a client network, discover devices, save assets, and generate a client-ready report.",
    missionChecklist: [
      { label: "Create Next.js app", status: "complete" },
      { label: "Set up database tables", status: "complete" },
      { label: "Build clients and sites pages", status: "complete" },
      { label: "Build assets page", status: "complete" },
      { label: "Add network scanner workflow", status: "complete" },
      { label: "Create dashboard", status: "in_progress" },
      { label: "Prepare final demo", status: "not_started" },
    ],
    deliverables: [
      "Live demo URL",
      "Screenshots",
      "Short Loom video",
      "Written summary",
      "Final project reflection",
    ],
    resources: [
      { label: "Next.js Docs", href: "https://nextjs.org/docs" },
      { label: "Neon Database", href: "https://neon.tech/docs" },
      { label: "Tailwind CSS", href: "https://tailwindcss.com/docs" },
      { label: "Deployment Checklist", href: "#" },
    ],
  },
  "helpdesk-ai": {
    id: "helpdesk-ai",
    title: "HelpDesk AI",
    track: "AI Builder Academy",
    status: "In Review",
    progress: 85,
    updated: "Updated yesterday",
    overview:
      "Build an internal support agent that reads incoming tickets, classifies urgency, drafts suggested replies, and escalates complex issues to a human agent.",
    missionChecklist: [
      { label: "Define ticket intake schema", status: "complete" },
      { label: "Build classification workflow", status: "complete" },
      { label: "Create response template library", status: "complete" },
      { label: "Add escalation rules", status: "complete" },
      { label: "Build agent review UI", status: "complete" },
      { label: "Run QA test scenarios", status: "in_progress" },
      { label: "Prepare stakeholder demo", status: "not_started" },
    ],
    deliverables: [
      "Working ticket triage demo",
      "Prompt library export",
      "QA test results",
      "Architecture diagram",
      "Project write-up",
    ],
    resources: [
      { label: "Next.js Docs", href: "https://nextjs.org/docs" },
      { label: "OpenAI API Guide", href: "https://platform.openai.com/docs" },
      { label: "Tailwind CSS", href: "https://tailwindcss.com/docs" },
      { label: "Agent Design Patterns", href: "#" },
    ],
  },
  "email-assistant": {
    id: "email-assistant",
    title: "AI Email Assistant",
    track: "AI Essentials",
    status: "In Progress",
    progress: 42,
    updated: "Updated 4 days ago",
    overview:
      "Create a practical email workflow for professionals—draft messages, adjust tone, organize follow-ups, and produce executive-ready communication faster.",
    missionChecklist: [
      { label: "Build prompt library for common emails", status: "complete" },
      { label: "Create tone presets (formal, friendly, urgent)", status: "complete" },
      { label: "Design follow-up email templates", status: "in_progress" },
      { label: "Add meeting recap workflow", status: "not_started" },
      { label: "Document best practices guide", status: "not_started" },
    ],
    deliverables: [
      "Prompt template pack",
      "Before/after email examples",
      "Workflow cheat sheet",
      "Short demo recording",
      "Reflection summary",
    ],
    resources: [
      { label: "ChatGPT Prompt Guide", href: "#" },
      { label: "Business Writing Basics", href: "#" },
      { label: "AI Essentials Week 4", href: "/courses" },
      { label: "Workplace Simulator", href: "/workplace-simulator" },
    ],
  },
};

export function getProjectById(id: string): ProjectDetail | undefined {
  return projectDetails[id];
}

export function getAllProjectIds(): string[] {
  return Object.keys(projectDetails);
}
