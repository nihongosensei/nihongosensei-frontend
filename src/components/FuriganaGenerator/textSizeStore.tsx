import {
  computed,
  createModel,
  effect,
  type ReadonlySignal,
  signal,
  untracked,
} from "@preact/signals";
import { createContext } from "preact";
import { useContext } from "preact/hooks";

export type TextSizeStoreModel = {
  textSize: ReadonlySignal<number>;
  isIncreaseDisabled: ReadonlySignal<boolean>;
  isDecreaseDisabled: ReadonlySignal<boolean>;
  // actions
  setTextSize: (newTextSize: number) => void;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
};

const LOCAL_STORAGE_KEY = "furigana-text-size";

function getInitialValue(): number | undefined {
  if (typeof localStorage !== "undefined") {
    const localStorageValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localStorageValue == null || localStorageValue.trim().length === 0) {
      return;
    }

    const parseNumber = Number(localStorageValue);

    if (!isNaN(parseNumber)) {
      return parseNumber;
    }
  }
}

export const TextSizeStore = createModel(
  ({
    initialSize = 100,
    step = 10,
    minSize = 70,
    maxSize = 150,
  }: {
    initialSize?: number;
    minSize?: number;
    maxSize?: number;
    step?: number;
  } = {}): TextSizeStoreModel => {
    const textSize = signal(initialSize);
    const isIncreaseDisabled = computed(() => textSize.value + step > maxSize);
    const isDecreaseDisabled = computed(() => textSize.value - step < minSize);

    function setTextSize(newTextSize: number) {
      textSize.value = newTextSize;
      localStorage?.setItem(LOCAL_STORAGE_KEY, newTextSize.toString());
    }

    effect(() => {
      if (import.meta.env.SSR) {
        return;
      }

      // only run once at mount
      untracked(() => (textSize.value = getInitialValue() ?? initialSize));
    });

    return {
      textSize,
      isIncreaseDisabled,
      isDecreaseDisabled,
      setTextSize,
      increaseTextSize: () => setTextSize(textSize.value + step),
      decreaseTextSize: () => setTextSize(textSize.value - step),
    };
  },
);

export const TextSizeContext = createContext<TextSizeStoreModel>(
  new TextSizeStore(),
);

export const useTextSize = () => useContext(TextSizeContext);
