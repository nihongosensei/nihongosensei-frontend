import type { KeiyoudoushiModel } from "~services/VocabularyService";

/**
 * na-Adjektiv/Nominaladjektiv/形容動詞
 */
export function Keiyoudoushi({ no, nari }: KeiyoudoushiModel) {
  if (nari) {
    return (
      <>
        Na.‑Adjektiv mit <em>nari</em>
      </>
    );
  }

  return (
    <>
      Na.‑Adjektiv mit <em>na</em>
      {no && (
        <>
          {" "}
          od. <em>no</em>
        </>
      )}{" "}
      bzw. prädikativ mit <em>da</em> etc.
    </>
  );
}
