import type { TitleModel } from "~services/VocabularyService";
import { createElements } from "./helper/createElements";
import styles from "./Title.module.css";

export function Title({ textAndTokenAndEmph }: TitleModel) {
  return (
    <cite className={styles.title}>{createElements(textAndTokenAndEmph)}</cite>
  );
}
