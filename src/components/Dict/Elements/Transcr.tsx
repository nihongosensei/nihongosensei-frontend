import type { TranscrModel } from "~services/VocabularyService";

export function Transcr({ content }: TranscrModel) {
  return <i>{content.join(" ")}</i>;
}
