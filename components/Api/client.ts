import type {
  ByTextResponseModel,
  ByTextQueryModel,
} from "../../pages/api/entry/byText";
import type { FuriganaResponseModel } from "../../pages/api/furigana";

export interface ApiClient {
  getByText(options?: ByTextQueryModel): Promise<ByTextResponseModel>;

  getFurigana(text: string): Promise<FuriganaResponseModel>;
}

export class DefaultApiClient implements ApiClient {
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
    return this.fetch<FuriganaResponseModel>("/api/furigana/", {
      text,
    });
  }

  private async fetch<T>(path: string, data?: unknown): Promise<T> {
    const response = await fetch(path, {
      method: data ? "POST" : "GET",
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) {
      throw new Error(`failed to fetch - ${response.statusText}`);
    }

    return (await response.json()) as T;
  }
}
