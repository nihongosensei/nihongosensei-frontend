import type { FindOptions } from "./FindOptions";

export type VocabularyFindOptions = FindOptions & {
  jlpt?: number;
  query?: string;
  ids?: ReadonlyArray<number>;
  kanjis?: ReadonlyArray<string>;
  text?: string;
};
