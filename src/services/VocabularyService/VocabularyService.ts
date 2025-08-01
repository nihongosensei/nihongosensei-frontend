import type {
  FindByResponseModel,
  KanjiModel,
  ResolvedEntryModel,
  VocabularyFindOptions,
} from "./Model";

export interface VocabularyService {
  findById(id: string): Promise<ResolvedEntryModel | null>;

  findBy(options: VocabularyFindOptions): Promise<FindByResponseModel>;

  findKanji(kanji: string): Promise<KanjiModel | null>;
}
