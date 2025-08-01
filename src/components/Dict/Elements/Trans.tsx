import type { TransModel } from "~services/VocabularyService";
import { createElements } from "./helper/createElements";

export function Trans({ usgAndTrAndDef }: TransModel) {
  return <>{createElements(usgAndTrAndDef)}</>;
}
