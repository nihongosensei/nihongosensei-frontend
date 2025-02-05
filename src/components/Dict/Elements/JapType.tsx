import type { JSX } from "react";
import type { JapTypeModel } from "~services/VocabularyService";

export function JapType({ value }: JapTypeModel): JSX.Element {
  return <>{value}</>;
}
