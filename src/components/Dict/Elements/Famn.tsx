import type { FamnModel } from "~services/VocabularyService";

export function Famn({ value }: FamnModel) {
  return <b>{value}</b>;
}
