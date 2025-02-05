import assert from "node:assert";
import { ExternalVocabularyService } from "./ExternalVocabularyService";
import type { VocabularyService } from "./VocabularyService";

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
