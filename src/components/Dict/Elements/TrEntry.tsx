import type { TrModel } from "~services/VocabularyService";
import { createElements } from "./helper/createElements";

export function TrEntry({ textAndTokenAndDef }: TrModel) {
  return <>{createElements(textAndTokenAndDef)}</>;
}
