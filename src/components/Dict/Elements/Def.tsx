import type { DefModel } from "~services/VocabularyService";
import { createElements } from "./helper/createElements";

export function Def({ textAndLiteralAndTransl }: DefModel) {
  return <>{createElements(textAndLiteralAndTransl)}</>;
}
