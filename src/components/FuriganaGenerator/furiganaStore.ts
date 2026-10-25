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

    // Incremented for every text change. Responses of outdated requests are
    // ignored so a slow response can't overwrite a newer one.
    let latestRequestId = 0;
    let timeout: number | null = null;

    function performRequest(value: string, requestId: number) {
      loading.value = true;

      actions.furigana
        .orThrow({ text: value })
        .then((furiganaResponse) => {
          if (requestId !== latestRequestId) {
            return;
          }

          furigana.value = furiganaResponse.furigana;
          error.value = null;
        })
        .catch((e) => {
          if (requestId !== latestRequestId) {
            return;
          }

          error.value = parseError(e);
        })
        .finally(() => {
          if (requestId === latestRequestId) {
            loading.value = false;
          }
        });
    }

    function setText(newText: string) {
      text.value = newText.trim();

      const requestId = ++latestRequestId;

      if (timeout) {
        window.clearTimeout(timeout);
        timeout = null;
      }

      if (text.value.length === 0) {
        // invalidates in-flight requests
        loading.value = false;
        furigana.value = [];
        error.value = null;

        return;
      }

      const value = text.value;

      timeout = window.setTimeout(() => performRequest(value, requestId), 300);
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
