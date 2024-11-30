import type {
  ByTextResponseModel,
  ByTextQueryModel,
} from "../../pages/api/entry/byText";
import type { FuriganaResponseModel } from "../../pages/api/furigana";
import type { ApiClient } from "./ApiClient";
import type { Cache } from "./Cache";
import { MemoryCache } from "./MemoryCache";
import { DefaultFetcher } from "./DefaultFetcher";
import type { Fetcher } from "./Fetcher";

export class DefaultApiClient implements ApiClient {
  public constructor(
    private readonly cache: Cache = new MemoryCache(),
    private readonly fetcher: Fetcher = new DefaultFetcher(),
  ) {}

  public async getByText(
    options?: ByTextQueryModel,
  ): Promise<ByTextResponseModel> {
    const params = new URLSearchParams();
    Object.entries(options ?? {}).forEach(([key, value]) =>
      params.set(key, value.toString()),
    );

    return this.fetch<ByTextResponseModel>(
      `/api/entry/byText?${params.toString()}`,
    );
  }

  public async getFurigana(text: string): Promise<FuriganaResponseModel> {
    return this.fetch<FuriganaResponseModel>("/api/furigana", text);
  }

  private async fetch<T>(path: string, data?: unknown): Promise<T> {
    const pieces = [path];
    if (data) {
      pieces.push(JSON.stringify(data));
    }
    const cacheKey = pieces.join(":");
    const cached = this.cache.getEntry<T>(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await this.fetcher.fetch(path, {
      method: data ? "POST" : "GET",
      body: this.createBody(data),
    });
    if (!response.ok) {
      throw new Error(`failed to fetch - ${response.statusText}`);
    }

    const responseJson = (await response.json()) as T;

    this.cache.setEntry(cacheKey, responseJson);

    return responseJson;
  }

  private createBody(input: unknown): string | undefined {
    if (input == null) {
      return;
    }
    if (typeof input === "string") {
      return input;
    }

    return JSON.stringify(input);
  }
}
