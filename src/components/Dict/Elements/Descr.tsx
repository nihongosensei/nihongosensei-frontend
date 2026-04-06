import { MinorText } from "~components/ui/Typography/MinorText";
import type { DescrModel } from "~services/VocabularyService";
import styles from "./Descr.module.css";
import { createElements } from "./helper/createElements";

export function Descr({ textAndJapAndTranscr }: DescrModel) {
  return (
    <MinorText className={styles.desc}>
      ({createElements(textAndJapAndTranscr)})
    </MinorText>
  );
}
