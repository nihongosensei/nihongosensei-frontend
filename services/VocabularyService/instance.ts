import assert from "node:assert";
import type { VocabularyService } from "./VocabularyService";
import { ExternalVocabularyService } from "./ExternalVocabularyService";

const BACKEND_URL = process.env.BACKEND_URL;

let instance: VocabularyService | null;

export const vocabularyService: () => VocabularyService = () => {
  assert(
    BACKEND_URL != null && BACKEND_URL != "",
    "BACKEND_URL must not be empty",
  );
  instance ??= new ExternalVocabularyService(BACKEND_URL);

  return instance;
};
