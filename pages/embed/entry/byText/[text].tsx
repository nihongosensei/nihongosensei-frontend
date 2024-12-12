import { EntryContextProvider, EntryFull } from "@components/Dict";
import { useScrollHeightPostMessage } from "@components/hooks";
import { addCachingHeader } from "@helper";
import { SITE_NAME } from "@services/constants";
import type { EntryWrapperModel } from "@services/VocabularyService";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import type { JSX } from "react";
import { vocabularyService } from "@services/VocabularyService/instance";

type EmbedByTextPage = {
  entry: EntryWrapperModel;
};

export default function EmbedByTextPage({
  entry: { entryJson },
}: EmbedByTextPage): JSX.Element {
  useScrollHeightPostMessage();

  return (
    <>
      <Head>
        <title>
          {entryJson.form.orth[0]?.value} - {SITE_NAME}
        </title>
      </Head>
      <EntryContextProvider detailBasePath="/embed/entry/byId">
        <EntryFull entry={entryJson} />
      </EntryContextProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<EmbedByTextPage> = async ({
  params: { text } = {},
  res,
}) => {
  if (!text) {
    return {
      notFound: true,
    };
  }
  const singleText = Array.isArray(text) ? text[0] : text;

  const entry = await vocabularyService().findByText(singleText);

  if (!entry) {
    return {
      notFound: true,
    };
  }

  addCachingHeader(res);

  return {
    props: {
      entry,
    },
  };
};
