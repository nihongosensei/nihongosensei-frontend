import { BACKEND_URL } from "astro:env/server";
import { ExternalVocabularyService } from "./ExternalVocabularyService";
import type { VocabularyService } from "./VocabularyService";

let instance: VocabularyService | null;

export const vocabularyService: () => VocabularyService = () => {
  instance ??= new ExternalVocabularyService(BACKEND_URL);

  return instance;
};
