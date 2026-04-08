import { useStore } from "~components/FuriganaGenerator/FuriganaGeneratorContext";
import { Alert } from "~components/ui/Alert";
import { JapaneseTextControls } from "./JapaneseTextControls";
import { JapaneseTextInput } from "./JapaneseTextInput";

export function JapaneseTextContainer() {
  const store = useStore();

  return (
    <div className="border border-b-0 border-neutral-300 dark:border-neutral-700 rounded-sm grid overflow-hidden grid-rows-[auto_auto_1fr]">
      <JapaneseTextControls />
      {store.furigana.error.value ? (
        <Alert
          type="error"
          className="border-b border-neutral-300 dark:border-neutral-700 overflow-hidden"
        >
          {store.furigana.error}
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
        <JapaneseTextInput />
      </div>
    </div>
  );
}
