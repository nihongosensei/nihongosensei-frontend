import { type BackendClient, HttpError } from "../BackendClient";
import type {
  EntryWrapperModel,
  FindByResponseModel,
  KanjiModel,
  ResolvedEntryModel,
  VocabularyFindOptions,
} from "./Model";
import type { VocabularyService } from "./VocabularyService";

export class ExternalVocabularyService implements VocabularyService {
  public constructor(private readonly client: BackendClient) {}

  async findById(id: string): Promise<ResolvedEntryModel | null> {
    return this.requestOrNull<ResolvedEntryModel>(
      `entry/id/${encodeURIComponent(id)}/resolved`,
    );
  }

  public findBy(options: VocabularyFindOptions): Promise<FindByResponseModel> {
    return this.client.request<{
      entries: EntryWrapperModel[];
      count: number;
    }>("entries", options);
  }

  public findKanji(kanji: string): Promise<KanjiModel | null> {
    return this.requestOrNull<KanjiModel>(`kanji/${encodeURIComponent(kanji)}`);
  }

  private async requestOrNull<T>(resource: string): Promise<T | null> {
    try {
      return await this.client.request<T>(resource);
    } catch (e) {
      if (e instanceof HttpError && e.status === 404) {
        return null;
      }

      throw e;
    }
  }
}
