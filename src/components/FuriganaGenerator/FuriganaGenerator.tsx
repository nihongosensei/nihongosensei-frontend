import {
  JapaneseTextContainer,
  VocabularyContainer,
} from "~components/FuriganaGenerator";
import { Store } from "~components/FuriganaGenerator/store";
import {
  TextSizeContext,
  TextSizeStore,
} from "~components/FuriganaGenerator/textSizeStore";
import type { FuriganaModel } from "~services/FuriganaService";
import { FuriganaGeneratorContext } from "./FuriganaGeneratorContext";
import { LoadingContainer } from "./LoadingContainer";

type FuriganaIndexProps = {
  text: string;
  furigana: ReadonlyArray<FuriganaModel | string> | null;
  error: string | null;
};

export function FuriganaGenerator({
  text,
  furigana,
  error,
}: FuriganaIndexProps) {
  const textSizeStore = new TextSizeStore();
  const store = new Store({
    defaultText: text,
    defaultFurigana: furigana,
    defaultError: error,
  });

  return (
    <FuriganaGeneratorContext.Provider value={store}>
      <TextSizeContext.Provider value={textSizeStore}>
        <LoadingContainer />
        <JapaneseTextContainer />
        <VocabularyContainer className="sticky top-3" />
      </TextSizeContext.Provider>
    </FuriganaGeneratorContext.Provider>
  );
}
