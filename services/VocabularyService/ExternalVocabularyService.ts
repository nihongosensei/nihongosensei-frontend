import type {
  EntryWrapperModel,
  ResolvedEntryModel,
  VocabularyFindOptions,
  FindByResponseModel,
  KanjiModel,
} from "./Model";
import type { VocabularyService } from "./VocabularyService";
import { context, propagation } from "@opentelemetry/api";

class HttpError extends Error {
  public constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

interface Carrier {
  traceparent?: string;
}

function getTraceParent(): string | undefined {
  const output: Carrier = {};
  propagation.inject(context.active(), output);

  return output.traceparent;
}

export class ExternalVocabularyService implements VocabularyService {
  public constructor(private readonly endpoint: string) {}

  async findById(id: string): Promise<ResolvedEntryModel | null> {
    try {
      return await this.performRequest<ResolvedEntryModel>(
        `entry/id/${id}/resolved`,
      );
    } catch (e) {
      if (e instanceof HttpError && e.status === 404) {
        return null;
      }

      throw e;
    }
  }

  public findBy(options: VocabularyFindOptions): Promise<FindByResponseModel> {
    return this.performRequest<{
      entries: EntryWrapperModel[];
      count: number;
    }>("entries", options);
  }

  public findKanji(kanji: string): Promise<KanjiModel | null> {
    return this.performRequest<KanjiModel>(`kanji/${kanji}`);
  }

  private async performRequest<T>(
    resource: string,
    data?: unknown,
  ): Promise<T> {
    const headers: Record<string, string> = {};
    const traceParent = getTraceParent();
    if (traceParent) {
      headers.traceparent = traceParent;
    }

    const response = await fetch(`${this.endpoint}/api/${resource}`, {
      headers,
      method: data ? "POST" : "GET",
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new HttpError(
        response.status,
        `got invalid response from vocabulary service: ${response.status}`,
      );
    }

    return (await response.json()) as T;
  }
}
