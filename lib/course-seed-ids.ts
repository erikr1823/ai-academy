/** Stable UUIDs for seeded courses and lessons (safe to reference in redirects). */
export const COURSE_IDS = {
  essentials: "a1000000-0000-4000-8000-000000000001",
  builder: "a1000000-0000-4000-8000-000000000002",
} as const;

export const LESSON_IDS = {
  introToAi: "b1000000-0000-4000-8000-000000000001",
  promptEngineering: "b1000000-0000-4000-8000-000000000002",
  aiProductivity: "b1000000-0000-4000-8000-000000000003",
  aiAgents: "b1000000-0000-4000-8000-000000000004",
  workflowAutomation: "b1000000-0000-4000-8000-000000000005",
  deployingAiTools: "b1000000-0000-4000-8000-000000000006",
} as const;

/** Legacy flat lesson slugs → nested course/lesson paths. */
export const LEGACY_LESSON_REDIRECTS: Record<string, string> = {
  "chatgpt-basics": `/courses/${COURSE_IDS.essentials}/lesson/${LESSON_IDS.introToAi}`,
  "prompt-engineering": `/courses/${COURSE_IDS.essentials}/lesson/${LESSON_IDS.promptEngineering}`,
  "email-automation": `/courses/${COURSE_IDS.essentials}/lesson/${LESSON_IDS.aiProductivity}`,
  "ai-workflows": `/courses/${COURSE_IDS.builder}/lesson/${LESSON_IDS.deployingAiTools}`,
};
