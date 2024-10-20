import type {
  EntryWrapperModel,
  ResolvedEntryModel,
  VocabularyFindOptions,
  FindByResponseModel,
  KanjiModel,
} from "./Model";
import type { VocabularyService } from "./VocabularyService";

export class ExternalVocabularyService implements VocabularyService {
  public constructor(private readonly endpoint: string) {}

  async findById(id: string): Promise<ResolvedEntryModel | null> {
    const response = await fetch(
      `${this.endpoint}/api/entry/id/${id}/resolved`,
    );
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(
        `got invalid response from vocabulary service: ${response.status}`,
      );
    }

    return (await response.json()) as ResolvedEntryModel;
  }

  async findBy(options: VocabularyFindOptions): Promise<FindByResponseModel> {
    const response = await fetch(`${this.endpoint}/api/entries`, {
      method: "POST",
      body: JSON.stringify(options),
    });
    if (!response.ok) {
      throw new Error(`got invalid response: ${response.status}`);
    }

    return (await response.json()) as {
      entries: EntryWrapperModel[];
      count: number;
    };
  }

  async findByText(text: string): Promise<EntryWrapperModel | null> {
    const response = await fetch(`${this.endpoint}/api/entry/text/${text}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(
        `got invalid response from furigana service: ${response.status}`,
      );
    }

    return (await response.json()) as EntryWrapperModel;
  }

  async findKanji(kanji: string): Promise<KanjiModel | null> {
    const response = await fetch(`${this.endpoint}/api/kanji/${kanji}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(
        `got invalid response from vocabulary service: ${response.status}`,
      );
    }

    return (await response.json()) as KanjiModel;
  }
}
