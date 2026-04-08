import { useSignal } from "@preact/signals";
import clsx from "clsx";
import type { TargetedInputEvent } from "preact";
import { useStore } from "~components/FuriganaGenerator/FuriganaGeneratorContext";
import { useDebounceEffect } from "~components/hooks/useDebounceEffect";
import { VocabularyProvider } from "./VocabularyProvider";

type VocabularyContainerProps = {
  className?: string;
};

export function VocabularyContainer({ className }: VocabularyContainerProps) {
  const inputValue = useSignal("");
  const store = useStore();

  useDebounceEffect(
    inputValue,
    (value: string) => {
      store.vocabulary.text.value = value;
    },
    500,
  );
  const inputChangeHandler = (e: TargetedInputEvent<HTMLInputElement>) => {
    inputValue.value = e.currentTarget.value;
  };

  return (
    <div className={clsx(className, "flex flex-col overflow-hidden")}>
      <input
        value={inputValue}
        onInput={inputChangeHandler}
        className="w-full p-3 py-4 bg-transparent border-t border-b md:border border-neutral-300 dark:border-neutral-700 md:rounded-sm"
        placeholder="Einträge suchen..."
      />
      <VocabularyProvider className="md:mt-4 w-full" />
    </div>
  );
}
