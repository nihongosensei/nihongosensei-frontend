import { actions } from "astro:actions";
import { memo, useCallback, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { activeVocabulary } from "~components/FuriganaGenerator/store";
import { useTextSize } from "~components/hooks";
import { Alert } from "~components/ui/Alert";
import { LoadingProgress } from "~components/ui/LoadingProgress";
import { parseError } from "~helper";
import type { FuriganaModel } from "~services/FuriganaService";
import { JapaneseTextControls } from "./JapaneseTextControls";
import {
  JapaneseTextInput,
  type JapaneseTextInputProps,
} from "./JapaneseTextInput";

type JapaneseTextContainerProps = {
  defaultError: string | null;
  defaultValue: string | null;
  defaultFurigana: ReadonlyArray<FuriganaModel | string> | null;
  debounceDelayInMs?: number;
};

export const JapaneseTextContainer = memo(function JapaneseTextContainer({
  debounceDelayInMs = 300,
  defaultFurigana,
  defaultValue,
  defaultError,
}: JapaneseTextContainerProps) {
  const [textSize, setTextSize] = useTextSize();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [furigana, setFurigana] = useState<ReadonlyArray<
    FuriganaModel | string
  > | null>(defaultFurigana);
  const [error, setError] = useState<string | null>(defaultError);
  const lastValue = useRef(defaultValue);

  const convertHandler = useDebouncedCallback((value: string) => {
    if (!value.trim()) {
      setFurigana(null);

      return;
    }

    setLoading(true);

    actions.furigana
      .orThrow({ text: value })
      .then((furiganaResponse) => {
        setFurigana(furiganaResponse.furigana);
        setError(null);
      })
      .catch((e) => setError(parseError(e)))
      .finally(() => setLoading(false));
  }, debounceDelayInMs);

  const changeHandler: NonNullable<JapaneseTextInputProps["onChange"]> =
    useCallback(
      (value) => {
        setValue(value);

        const newValue = value.trim();
        if (lastValue.current === newValue) {
          return;
        }

        lastValue.current = newValue;
        convertHandler(newValue);
      },
      [convertHandler],
    );

  const onRubyClick = useCallback(
    (model: FuriganaModel) =>
      activeVocabulary.set(model.basicForm ?? model.text),
    [],
  );

  return (
    <div className="border border-b-0 border-neutral-300 dark:border-neutral-700 rounded-sm grid overflow-hidden grid-rows-[auto_auto_1fr]">
      {loading && <LoadingProgress />}
      <JapaneseTextControls
        onTextSizeChange={setTextSize}
        textSize={textSize}
      />
      {error ? (
        <Alert
          type="error"
          className="border-b border-neutral-300 dark:border-neutral-700 overflow-hidden"
        >
          {error}
        </Alert>
      ) : (
        <Alert
          type="info"
          className="border-b border-neutral-300 dark:border-neutral-700 overflow-hidden"
        >
          Furigana wird derzeit nicht korrekt angezeigt, wenn das Kanji über
          mehrere Zeilen geht. Bitte fügen Sie manuell einen Zeilenumbruch vor
          dem Kanji hinzu.
        </Alert>
      )}
      <div className="p-4 overflow-y-scroll overflow-x-hidden">
        <JapaneseTextInput
          value={value ?? undefined}
          furigana={furigana ?? undefined}
          textSize={textSize}
          onRubyClick={onRubyClick}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
});
