import type { JSX } from "react";
import type { EmphModel } from "~services/VocabularyService";

export function Emph({ value }: EmphModel): JSX.Element {
  return <em className="border-b border-dotted border-neutral-500">{value}</em>;
}
