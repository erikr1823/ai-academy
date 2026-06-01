export type MentorMessage = {
  role: "user" | "assistant";
  content: string;
};

export type MentorConversation = {
  id: string;
  title: string;
  preview: string;
  updated: string;
  messages: MentorMessage[];
};

export const starterPrompts = [
  "Help me write an email",
  "Explain this lesson",
  "Build a workflow",
  "Review my project",
  "Give me a workplace example",
  "Help me choose a track",
];

export const studentProfile = {
  name: "Erik Rivera",
  currentTrack: "AI Builder Academy",
  secondaryTrack: "AI Essentials",
  goal: "Build AI tools and help businesses train employees",
  progress: 62,
};

export const recommendedNextSteps = [
  { label: "Complete onboarding", href: "/onboarding" },
  { label: "Try Workplace Simulator", href: "/workplace-simulator" },
  { label: "Continue AI Builder Week 3", href: "/courses" },
  { label: "Start first project", href: "/projects" },
];

export const mentorConversations: MentorConversation[] = [
  {
    id: "email-help",
    title: "Email help",
    preview: "Draft a follow-up for a client meeting",
    updated: "Today",
    messages: [
      {
        role: "user",
        content: "Can you help me write a professional follow-up email after a client meeting?",
      },
      {
        role: "assistant",
        content:
          "Absolutely. Start with a clear subject line, thank them for their time, recap 2–3 key decisions, list next steps with owners, and close with a specific call to action. Want me to draft one if you share the meeting context?",
      },
    ],
  },
  {
    id: "prompt-engineering",
    title: "Prompt engineering",
    preview: "Improve my executive summary prompt",
    updated: "Yesterday",
    messages: [
      {
        role: "user",
        content: "How do I write a better prompt for executive summaries?",
      },
      {
        role: "assistant",
        content:
          "Strong summary prompts specify audience, tone, length, source material, and the decision you want the reader to make. Try: \"Summarize the attached notes for a VP audience in 150 words, highlight risks, and recommend one next step.\"",
      },
    ],
  },
  {
    id: "workplace-automation",
    title: "Workplace automation",
    preview: "How can AI help an office manager?",
    updated: "Today",
    messages: [
      {
        role: "user",
        content: "I work as an office manager. How can AI help me save time?",
      },
      {
        role: "assistant",
        content:
          "AI can help you summarize meetings, draft emails, organize tasks, and create weekly reports. Let's start with one simple workflow.",
      },
    ],
  },
  {
    id: "builder-project",
    title: "Builder project help",
    preview: "Scope my HelpDesk AI MVP",
    updated: "2 days ago",
    messages: [
      {
        role: "user",
        content: "I'm building HelpDesk AI. What should my MVP include?",
      },
      {
        role: "assistant",
        content:
          "Focus on one intake flow: read a ticket, classify urgency, suggest a reply, and flag when a human should take over. Skip billing, multi-channel support, and custom dashboards until v2.",
      },
    ],
  },
  {
    id: "it-troubleshooting",
    title: "IT troubleshooting",
    preview: "Printer ticket update template",
    updated: "3 days ago",
    messages: [
      {
        role: "user",
        content: "How should I write a client update for a recurring printer issue?",
      },
      {
        role: "assistant",
        content:
          "Use a simple structure: issue summary, steps tried, current status, ETA or next check-in, and what you need from the client. Keep it plain language—no jargon unless your audience expects it.",
      },
    ],
  },
];

export const mockReply =
  "Thanks for your message. This is a mock AI Mentor response—live coaching is coming soon. In the meantime, try the Workplace Simulator or continue your current course module.";
