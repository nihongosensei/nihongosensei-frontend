import type { BackendClient } from "../BackendClient";
import type { FuriganaService } from "./FuriganaService";
import type { FuriganaModel } from "./Model";

export class ExternalFuriganaService implements FuriganaService {
  public constructor(private readonly client: BackendClient) {}

  public getFurigana(text: string): Promise<(FuriganaModel | string)[]> {
    return this.client.request<(FuriganaModel | string)[]>("furigana", {
      text,
    });
  }
}
