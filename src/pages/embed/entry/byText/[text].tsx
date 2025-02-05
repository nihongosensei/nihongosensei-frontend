import type { GetServerSideProps } from "next";
import Head from "next/head";
import type { JSX } from "react";
import { EntryContextProvider, EntryFull } from "~components/Dict";
import { useScrollHeightPostMessage } from "~components/hooks";
import { addCachingHeader } from "~helper";
import { SITE_NAME } from "~services/constants";
import type { EntryWrapperModel } from "~services/VocabularyService";
import { vocabularyService } from "~services/VocabularyService/instance";

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

  const response = await vocabularyService().findBy({
    text: singleText,
    limit: 1,
    offset: 0,
  });
  const entry = response.entries[0];

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
