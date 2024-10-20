import type { FuriganaModel } from "./Model";

/**
 * Service for converting a given text into a {@link FuriganaModel}.
 */
export interface FuriganaService {
  /**
   * Converts the given text to {@link FuriganaModel}s.
   *
   * @param text The text to convert.
   */
  getFurigana(text: string): Promise<(FuriganaModel | string)[]>;
}
