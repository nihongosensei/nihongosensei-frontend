import { createModel, type ReadonlySignal, signal } from "@preact/signals";
import { actions } from "astro:actions";
import { parseError } from "~helper";
import type { FuriganaModel } from "~services/FuriganaService";

export type FuriganaStoreModel = {
  loading: ReadonlySignal<boolean>;
  error: ReadonlySignal<string | null>;
  text: ReadonlySignal<string>;
  furigana: ReadonlySignal<ReadonlyArray<FuriganaModel | string> | null>;
  // actions
  setText: (newText: string) => void;
};

export const FuriganaStore = createModel(
  ({
    defaultText = "",
    defaultFurigana = null,
    defaultError = null,
  }: {
    defaultText?: string;
    defaultFurigana?: ReadonlyArray<FuriganaModel | string> | null;
    defaultError: string | null;
  }): FuriganaStoreModel => {
    const loading = signal(false);
    const text = signal<string>(defaultText);
    const furigana = signal<ReadonlyArray<FuriganaModel | string> | null>(
      defaultFurigana,
    );
    const error = signal<string | null>(defaultError);

    function performRequest(value: string) {
      if (!value) {
        return;
      }

      if (!value.trim()) {
        furigana.value = null;

        return;
      }

      loading.value = true;

      actions.furigana
        .orThrow({ text: value })
        .then((furiganaResponse) => {
          furigana.value = furiganaResponse.furigana;
          error.value = null;
        })
        .catch((e) => {
          error.value = parseError(e);
        })
        .finally(() => {
          loading.value = false;
        });
    }

    let timeout: number | null = null;

    function debouncedPerformRequest() {
      if (timeout) {
        window.clearTimeout(timeout);
      }

      const value = text.value;

      timeout = window.setTimeout(() => performRequest(value), 300);
    }

    function setText(newText: string) {
      text.value = newText.trim();

      if (text.value.length === 0) {
        furigana.value = [];
      } else {
        debouncedPerformRequest();
      }
    }

    return {
      loading,
      error,
      text,
      furigana,
      setText,
    };
  },
);
