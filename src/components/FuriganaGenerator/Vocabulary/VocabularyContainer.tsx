import { useStore } from "@nanostores/react";
import clsx from "clsx";
import { type ChangeEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { activeVocabulary } from "~components/FuriganaGenerator/store";
import { VocabularyProvider } from "./VocabularyProvider";

type VocabularyContainerProps = {
  className?: string;
};

export function VocabularyContainer({ className }: VocabularyContainerProps) {
  const [inputValue, setInputValue] = useState("");
  const changeHandler = useDebouncedCallback(
    (value: string) => activeVocabulary.set(value),
    500,
  );
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);
    changeHandler(value);
  };
  const vocabulary = useStore(activeVocabulary);

  return (
    <div className={clsx(className, "flex flex-col overflow-hidden")}>
      <input
        value={inputValue}
        onChange={inputChangeHandler}
        className="w-full p-3 py-4 bg-transparent border-t border-b md:border border-neutral-300 dark:border-neutral-700 md:rounded-sm"
        placeholder="Einträge suchen..."
      />
      {vocabulary != null && (
        <VocabularyProvider text={vocabulary} className="md:mt-4 w-full" />
      )}
    </div>
  );
}
