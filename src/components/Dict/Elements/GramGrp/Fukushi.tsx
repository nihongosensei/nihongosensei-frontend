import type { FukushiModel } from "~services/VocabularyService";
import { TRANSITIVITY_MAP } from "./constants";

/**
 * Adverb
 */
export function Fukushi({ suru, ni, to, taru }: FukushiModel) {
  return (
    <>
      Adverb
      {ni && (
        <>
          {" "}
          <em>ni</em> Adn. mit <em>naru</em>
        </>
      )}
      {to && (
        <>
          {" "}
          mit <em>to</em>
        </>
      )}
      {taru && (
        <>
          {" "}
          mit <em>to</em> Adn. mit <em>taru</em>
        </>
      )}
      {suru && (
        <>
          {" "}
          mit <em>suru</em> {TRANSITIVITY_MAP[suru]} V.
        </>
      )}
    </>
  );
}
