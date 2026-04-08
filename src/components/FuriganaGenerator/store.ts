import { computed, createModel, type ReadonlySignal } from "@preact/signals";
import type { FuriganaModel } from "~services/FuriganaService";
import { FuriganaStore, type FuriganaStoreModel } from "./furiganaStore";
import { VocabularyStore, type VocabularyStoreModel } from "./vocabularyStore";

export type StoreModel = {
  furigana: FuriganaStoreModel;
  vocabulary: VocabularyStoreModel;
  loading: ReadonlySignal<boolean>;
};

export const Store = createModel(
  ({
    defaultText = "",
    defaultFurigana = null,
    defaultError = null,
  }: {
    defaultText?: string;
    defaultFurigana?: ReadonlyArray<FuriganaModel | string> | null;
    defaultError: string | null;
  }): StoreModel => {
    const furigana = new FuriganaStore({
      defaultText,
      defaultFurigana,
      defaultError,
    });
    const vocabulary = new VocabularyStore();

    const loading = computed(
      () => furigana.loading.value || vocabulary.loading.value,
    );

    return {
      furigana,
      vocabulary,
      loading,
    };
  },
);
