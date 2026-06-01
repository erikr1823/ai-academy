export type LessonDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type LessonDetail = {
  id: string;
  title: string;
  track: string;
  difficulty: LessonDifficulty;
  estimatedMinutes: number;
  xp: number;
  overview: string;
  learningObjectives: string[];
  steps: string[];
  practiceTask: string;
};

export const lessonDetails: Record<string, LessonDetail> = {
  "chatgpt-basics": {
    id: "chatgpt-basics",
    title: "ChatGPT Basics for Work",
    track: "AI Essentials",
    difficulty: "Beginner",
    estimatedMinutes: 15,
    xp: 100,
    overview:
      "Learn how to use ChatGPT to write better emails, summarize information, and save time during your workday.",
    learningObjectives: [
      "What ChatGPT can and cannot do",
      "How to ask better questions",
      "How to rewrite text professionally",
      "How to check AI answers before using them",
    ],
    steps: [
      "Open ChatGPT",
      "Ask a simple workplace question",
      "Improve the prompt with more context",
      "Compare the first answer to the improved answer",
      "Save your best prompt",
    ],
    practiceTask:
      "Write a prompt that helps you draft a professional email to a client or coworker.",
  },
  "prompt-engineering": {
    id: "prompt-engineering",
    title: "Writing Better Prompts",
    track: "AI Essentials",
    difficulty: "Beginner",
    estimatedMinutes: 20,
    xp: 125,
    overview:
      "Learn the building blocks of effective prompts—context, role, format, and constraints—so you get reliable results at work.",
    learningObjectives: [
      "Structure prompts with role and context",
      "Specify output format and tone",
      "Iterate when the first answer misses the mark",
      "Build reusable prompt templates",
    ],
    steps: [
      "Start with a vague prompt and note the weaknesses",
      "Add role, audience, and desired format",
      "Run the improved prompt side by side",
      "Add constraints (length, tone, must-include items)",
      "Save the template for reuse",
    ],
    practiceTask:
      "Create a prompt template for summarizing a meeting into three bullet points and one action item.",
  },
  "email-automation": {
    id: "email-automation",
    title: "Email Automation with AI",
    track: "AI Essentials",
    difficulty: "Intermediate",
    estimatedMinutes: 25,
    xp: 150,
    overview:
      "Use AI to draft, refine, and organize professional emails faster while keeping your voice and accuracy intact.",
    learningObjectives: [
      "Draft first-pass emails from bullet points",
      "Adjust tone for clients vs. internal teams",
      "Create follow-up and reminder templates",
      "Review AI output before sending",
    ],
    steps: [
      "List the goal and key facts for your email",
      "Draft with AI using audience and tone instructions",
      "Edit for accuracy, names, and dates",
      "Compare tone against your usual style",
      "Save the workflow as a reusable checklist",
    ],
    practiceTask:
      "Use AI to draft a follow-up email after a client meeting, then edit it until you'd confidently hit send.",
  },
  "ai-workflows": {
    id: "ai-workflows",
    title: "Designing AI Workflows",
    track: "AI Builder Academy",
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    xp: 200,
    overview:
      "Map a repeatable AI workflow from input to output—including human review steps—so you can automate real business tasks safely.",
    learningObjectives: [
      "Identify workflow inputs and outputs",
      "Choose where AI adds value vs. where humans review",
      "Document steps for repeatability",
      "Plan a simple MVP automation",
    ],
    steps: [
      "Pick one repetitive task from your work or project",
      "Break it into input → AI step → review → output",
      "Define success criteria for each step",
      "Sketch the workflow on paper or in a doc",
      "List tools you would connect in a v1 build",
    ],
    practiceTask:
      "Design a 4-step AI workflow for triaging incoming support messages.",
  },
};

export const featuredLessonIds = [
  "chatgpt-basics",
  "prompt-engineering",
  "email-automation",
  "ai-workflows",
] as const;

export function getLessonById(id: string): LessonDetail | undefined {
  return lessonDetails[id];
}

export function getAllLessonIds(): string[] {
  return Object.keys(lessonDetails);
}

export function getLessonIdForModuleTitle(title: string): string | undefined {
  const map: Record<string, string> = {
    "ChatGPT Basics": "chatgpt-basics",
    "Writing Better Prompts": "prompt-engineering",
    "Email Automation": "email-automation",
    "AI Workflows": "ai-workflows",
  };
  return map[title];
}
