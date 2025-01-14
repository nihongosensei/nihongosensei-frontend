import type {
  EntryWrapperModel,
  ResolvedEntryModel,
  VocabularyFindOptions,
  FindByResponseModel,
  KanjiModel,
} from "./Model";

export interface VocabularyService {
  findById(id: string): Promise<ResolvedEntryModel | null>;
  findBy(options: VocabularyFindOptions): Promise<FindByResponseModel>;
  findKanji(kanji: string): Promise<KanjiModel | null>;
}
