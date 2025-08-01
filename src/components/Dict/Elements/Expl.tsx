import type { ExplModel } from "~services/VocabularyService";
import { createElements } from "./helper/createElements";

export function Expl({ textAndLiteralAndTransl }: ExplModel) {
  return <>{createElements(textAndLiteralAndTransl)}</>;
}
