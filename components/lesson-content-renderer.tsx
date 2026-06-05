import styles from "./lesson-content-renderer.module.css";
import type { LessonContentBlock } from "@/lib/types/lesson-content";

export function LessonContentRenderer({
  content,
  fallback,
}: {
  content: LessonContentBlock[];
  fallback?: string;
}) {
  if (!content.length) {
    if (!fallback) return null;
    return (
      <div className={styles.content}>
        <p className={styles.paragraph}>{fallback}</p>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      {content.map((block, index) => {
        if (block.type === "heading") {
          const Tag = block.level === 2 ? "h2" : "h3";
          const className =
            block.level === 2 ? styles.heading2 : styles.heading3;
          return (
            <Tag key={index} className={className}>
              {block.text}
            </Tag>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={index} className={styles.paragraph}>
              {block.text}
            </p>
          );
        }

        if (block.type === "code") {
          return (
            <pre key={index} className={styles.codeBlock}>
              <code>{block.code}</code>
            </pre>
          );
        }

        return (
          <ul key={index} className={styles.list}>
            {block.items.map((item) => (
              <li key={item} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
