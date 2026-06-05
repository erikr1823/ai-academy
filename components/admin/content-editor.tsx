"use client";

import { adminStyles } from "@/components/admin-shell";
import type { LessonContentBlock } from "@/lib/types/lesson-content";

type ContentEditorProps = {
  value: LessonContentBlock[];
  onChange: (blocks: LessonContentBlock[]) => void;
};

export function ContentEditor({ value, onChange }: ContentEditorProps) {
  function updateBlock(index: number, block: LessonContentBlock) {
    const next = [...value];
    next[index] = block;
    onChange(next);
  }

  function removeBlock(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function addBlock(type: LessonContentBlock["type"]) {
    if (type === "heading") {
      onChange([...value, { type: "heading", level: 2, text: "" }]);
      return;
    }
    if (type === "paragraph") {
      onChange([...value, { type: "paragraph", text: "" }]);
      return;
    }
    if (type === "code") {
      onChange([...value, { type: "code", code: "", language: "text" }]);
      return;
    }
    onChange([...value, { type: "list", items: [""] }]);
  }

  return (
    <div className={adminStyles.formGrid}>
      {value.map((block, index) => (
        <div key={index} className={adminStyles.card}>
          <div className={adminStyles.rowActions}>
            <span className={adminStyles.label}>
              {block.type === "heading"
                ? `Heading (H${block.level})`
                : block.type.charAt(0).toUpperCase() + block.type.slice(1)}
            </span>
            <button
              type="button"
              className={adminStyles.btnDanger}
              onClick={() => removeBlock(index)}
            >
              Remove
            </button>
          </div>

          {block.type === "heading" && (
            <>
              <div className={adminStyles.field}>
                <label className={adminStyles.label}>Level</label>
                <select
                  className={adminStyles.select}
                  value={block.level}
                  onChange={(e) =>
                    updateBlock(index, {
                      ...block,
                      level: Number(e.target.value) as 2 | 3,
                    })
                  }
                >
                  <option value={2}>H2</option>
                  <option value={3}>H3</option>
                </select>
              </div>
              <div className={adminStyles.field}>
                <label className={adminStyles.label}>Text</label>
                <input
                  className={adminStyles.input}
                  value={block.text}
                  onChange={(e) =>
                    updateBlock(index, { ...block, text: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {block.type === "paragraph" && (
            <div className={adminStyles.field}>
              <label className={adminStyles.label}>Paragraph</label>
              <textarea
                className={adminStyles.textarea}
                value={block.text}
                onChange={(e) =>
                  updateBlock(index, { ...block, text: e.target.value })
                }
              />
            </div>
          )}

          {block.type === "code" && (
            <div className={adminStyles.field}>
              <label className={adminStyles.label}>Code</label>
              <textarea
                className={adminStyles.textarea}
                style={{ fontFamily: "monospace", minHeight: "8rem" }}
                value={block.code}
                onChange={(e) =>
                  updateBlock(index, { ...block, code: e.target.value })
                }
              />
            </div>
          )}

          {block.type === "list" && (
            <div className={adminStyles.field}>
              <label className={adminStyles.label}>Bullet items</label>
              {block.items.map((item, itemIndex) => (
                <input
                  key={itemIndex}
                  className={adminStyles.input}
                  value={item}
                  onChange={(e) => {
                    const items = [...block.items];
                    items[itemIndex] = e.target.value;
                    updateBlock(index, { ...block, items });
                  }}
                />
              ))}
              <button
                type="button"
                className={adminStyles.btnSecondary}
                onClick={() =>
                  updateBlock(index, {
                    ...block,
                    items: [...block.items, ""],
                  })
                }
              >
                + Item
              </button>
            </div>
          )}
        </div>
      ))}

      <div className={adminStyles.rowActions}>
        <button
          type="button"
          className={adminStyles.btnSecondary}
          onClick={() => addBlock("heading")}
        >
          + Heading
        </button>
        <button
          type="button"
          className={adminStyles.btnSecondary}
          onClick={() => addBlock("paragraph")}
        >
          + Paragraph
        </button>
        <button
          type="button"
          className={adminStyles.btnSecondary}
          onClick={() => addBlock("code")}
        >
          + Code
        </button>
        <button
          type="button"
          className={adminStyles.btnSecondary}
          onClick={() => addBlock("list")}
        >
          + List
        </button>
      </div>
    </div>
  );
}
