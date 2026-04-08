import clsx from "clsx";
import { useTextSize } from "~components/FuriganaGenerator/textSizeStore";
import { MinusIcon } from "~components/ui/Icons/MinusIcon";
import { PlusIcon } from "~components/ui/Icons/PlusIcon";

export function JapaneseTextControls() {
  const store = useTextSize();

  return (
    <div
      className="border-b border-neutral-300 dark:border-neutral-700 p-3 flex"
      data-testid="text-controls"
    >
      <div className="border border-neutral-300 dark:border-neutral-700 rounded-sm flex items-center">
        <button
          onClick={store.decreaseTextSize}
          disabled={store.isDecreaseDisabled.value}
          className={clsx(
            "py-2 px-3",
            !store.isDecreaseDisabled.value && "cursor-pointer",
            store.isIncreaseDisabled.value && "opacity-70",
          )}
          aria-label="Schriftgröße verkleinern"
          data-testid="text-controls-decrease-text-size"
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <button disabled={true}>{store.textSize}%</button>
        <button
          onClick={store.increaseTextSize}
          disabled={store.isIncreaseDisabled.value}
          className={clsx(
            "py-2 px-3",
            !store.isIncreaseDisabled.value && "cursor-pointer",
            store.isIncreaseDisabled.value && "opacity-70",
          )}
          aria-label="Schriftgröße vergrößern"
          data-testid="text-controls-increase-text-size"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
