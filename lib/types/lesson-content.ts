export type LessonContentBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; language?: string; code: string }
  | { type: "list"; items: string[] };

export function parseLessonContent(raw: unknown): LessonContentBlock[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isLessonContentBlock);
}

function isLessonContentBlock(value: unknown): value is LessonContentBlock {
  if (!value || typeof value !== "object") return false;
  const block = value as { type?: string };
  if (block.type === "heading") {
    return (
      typeof (value as { text?: string }).text === "string" &&
      ((value as { level?: number }).level === 2 ||
        (value as { level?: number }).level === 3)
    );
  }
  if (block.type === "paragraph") {
    return typeof (value as { text?: string }).text === "string";
  }
  if (block.type === "code") {
    return typeof (value as { code?: string }).code === "string";
  }
  if (block.type === "list") {
    return Array.isArray((value as { items?: unknown }).items);
  }
  return false;
}

export const defaultLessonContent: LessonContentBlock[] = [
  {
    type: "paragraph",
    text: "Add lesson content in the admin course builder.",
  },
];
