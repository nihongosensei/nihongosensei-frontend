import type { JSX } from "react";
import type { BirthDeathModel } from "~services/VocabularyService";

export function BirthDeath({ value }: BirthDeathModel): JSX.Element {
  return <>{value}</>;
}
