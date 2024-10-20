import type { FindOptions } from "./FindOptions";

export type VocabularyFindOptions = FindOptions & {
  jlpt?: number;
  query?: string;
  ids?: ReadonlyArray<string>;
  kanjis?: ReadonlyArray<string>;
};
