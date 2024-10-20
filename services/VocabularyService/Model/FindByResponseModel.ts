import type { EntryWrapperModel } from "./EntryModel";

export type FindByResponseModel = {
  entries: EntryWrapperModel[];
  count: number;
};
