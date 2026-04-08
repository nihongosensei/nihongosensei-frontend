import clsx from "clsx";
import { useStore } from "~components/FuriganaGenerator/FuriganaGeneratorContext";
import { useTextSize } from "~components/FuriganaGenerator/textSizeStore.tsx";
import type { FuriganaModel } from "~services/FuriganaService";
import { Ruby } from "../Ruby";

const TEXT_SIZE_MAP: Record<number, string> = {
  70: "text-[70%]",
  80: "text-[80%]",
  90: "text-[90%]",
  100: "text-[100%]",
  110: "text-[110%]",
  120: "text-[120%]",
  130: "text-[130%]",
  140: "text-[140%]",
  150: "text-[150%]",
};

export function JapaneseTextInput() {
  const store = useStore();
  const { textSize } = useTextSize();

  return (
    <div
      className={clsx(
        "relative min-h-full leading-[2]",
        TEXT_SIZE_MAP[textSize.value],
      )}
    >
      <textarea
        name="text"
        onInput={(e) => store.furigana.setText(e.currentTarget.value)}
        className="outline-hidden bg-transparent resize-none overflow-hidden absolute inset-0"
        placeholder="Tippen Sie japanischen Text ein..."
        lang="ja"
        autoFocus={true}
      >
        {store.furigana.text}
      </textarea>
      {store.furigana.furigana.value != null && (
        <Ruby
          furigana={store.furigana.furigana.value}
          className="min-h-full w-full whitespace-pre-wrap inset-0 pointer-events-none"
          onClick={(model: FuriganaModel) => {
            store.vocabulary.text.value = model.basicForm ?? model.text;
          }}
        />
      )}
    </div>
  );
}
