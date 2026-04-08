import {
  computed,
  createModel,
  effect,
  type ReadonlySignal,
  type Signal,
  signal,
} from "@preact/signals";
import { actions } from "astro:actions";
import type { FindByResponseModel } from "~services/VocabularyService";

export type VocabularyStoreModel = {
  loading: ReadonlySignal<boolean>;
  error: ReadonlySignal<string | null>;
  text: Signal<string>;
  vocabulary: ReadonlySignal<FindByResponseModel | null>;
  remainingCount: ReadonlySignal<number>;
  // actions
  performRequest: (newValue: string) => void;
  loadMore: () => void;
};

const ENTRY_LIMIT = 3;

export const VocabularyStore = createModel((): VocabularyStoreModel => {
  const loading = signal(false);
  const text = signal<string>("");
  const vocabulary = signal<FindByResponseModel | null>(null);
  const error = signal<string | null>(null);
  const remainingCount = computed(() =>
    vocabulary.value != null ? vocabulary.value.count - ENTRY_LIMIT : 0,
  );

  let offset = 0;

  function performRequest(value: string) {
    if (!value) {
      return;
    }

    const perform = async () => {
      vocabulary.value = await actions.vocabularyByText.orThrow({
        text: value,
        limit: ENTRY_LIMIT,
        offset: 0,
      });
      error.value = null;
      offset = 0;
    };

    loading.value = true;
    perform()
      .catch((err) => {
        console.error(err);
        error.value = "Failed to fetch vocabulary information";
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function loadMore() {
    if (!text.value) {
      return;
    }

    offset += ENTRY_LIMIT;

    const perform = async () => {
      const params = new URLSearchParams();
      params.set("text", text.value);
      params.set("limit", ENTRY_LIMIT.toString());
      params.set("offset", offset.toString());

      const data = await actions.vocabularyByText.orThrow({
        text: text.value,
        limit: ENTRY_LIMIT,
        offset,
      });
      vocabulary.value = {
        entries: [...(vocabulary.value?.entries ?? []), ...data.entries],
        count: data.count,
      };
      error.value = null;
    };

    loading.value = true;
    perform()
      .catch((err) => {
        console.error(err);
        error.value = "Failed to fetch more vocabulary information";
      })
      .finally(() => {
        loading.value = false;
      });
  }

  effect(() => {
    if (text.value.length > 0) {
      performRequest(text.value);
    }
  });

  return {
    loading,
    error,
    text,
    vocabulary,
    remainingCount,
    performRequest,
    loadMore,
  };
});
