import {
  JapaneseTextContainer,
  VocabularyContainer,
} from "~components/FuriganaGenerator";
import type { FuriganaModel } from "~services/FuriganaService";

type FuriganaIndexProps = {
  text: string | null;
  furigana: ReadonlyArray<FuriganaModel | string> | null;
  error: string | null;
};

export function FuriganaGenerator({
  text,
  furigana,
  error,
}: FuriganaIndexProps) {
  return (
    <>
      <JapaneseTextContainer
        defaultValue={text}
        defaultFurigana={furigana}
        defaultError={error}
      />
      <VocabularyContainer className="sticky top-3" />
    </>
  );
}
