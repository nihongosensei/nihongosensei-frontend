import assert from "node:assert";
import type { VocabularyService } from "./VocabularyService";
import { ExternalVocabularyService } from "./ExternalVocabularyService";

const BACKEND_URL = process.env.BACKEND_URL;

assert(
  BACKEND_URL != null && BACKEND_URL != "",
  "BACKEND_URL must not be empty",
);

export const vocabularyService: VocabularyService =
  new ExternalVocabularyService(BACKEND_URL);
