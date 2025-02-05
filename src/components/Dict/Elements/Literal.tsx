import { JSX } from "react";
import type { LiteralModel } from "~services/VocabularyService";
import styles from "./Literal.module.css";
import { createElements } from "./helper/createElements";

export function Literal({ textAndToken }: LiteralModel): JSX.Element {
  return <span className={styles.literal}>{createElements(textAndToken)}</span>;
}
