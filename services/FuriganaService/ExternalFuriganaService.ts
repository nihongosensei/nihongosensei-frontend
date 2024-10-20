import type { FuriganaModel } from "./Model";
import type { FuriganaService } from "./FuriganaService";

export class ExternalFuriganaService implements FuriganaService {
  public constructor(private readonly endpoint: string) {}

  public async getFurigana(text: string): Promise<(FuriganaModel | string)[]> {
    const response = await fetch(`${this.endpoint}/api/furigana`, {
      method: "POST",
      body: JSON.stringify({
        text,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `got invalid response from furigana service: ${response.status}`,
      );
    }

    return response.json() as Promise<(FuriganaModel | string)[]>;
  }
}
