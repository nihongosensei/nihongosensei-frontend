import clsx from "clsx";
import type { UsgModel, UsgTypeEnum } from "~services/VocabularyService";
import styles from "./Usg.module.css";

const USG_MAP: Record<string, string> = {
  coll: "ugs.",
  lit: "schriftspr.",
};

const COLOR_MAP: Partial<Record<UsgTypeEnum, string>> = {
  TIME: "text-violet-700 dark:text-violet-300",
  HINT: "text-red-700 dark:text-red-300",
};
const DEFAULT_COLOR = "text-green-700 dark:text-green-300";

export function Usg({ reg, type = "UNKNOWN", content }: UsgModel) {
  if (reg) {
    return (
      <span className="text-violet-700 dark:text-violet-300 italic">
        {USG_MAP[reg] ?? [reg]}
      </span>
    );
  }

  if (content) {
    return (
      <span
        className={clsx(
          COLOR_MAP[type] ?? DEFAULT_COLOR,
          "italic",
          type !== "TIME" && styles.smallCaps,
        )}
      >
        {content}
      </span>
    );
  }

  return null;
}
