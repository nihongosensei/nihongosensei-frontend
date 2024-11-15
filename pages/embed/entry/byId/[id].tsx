import { EntryContextProvider, EntryFull } from "@components/Dict";
import { useScrollHeightPostMessage } from "@components/hooks";
import { addCachingHeader } from "@helper";
import { SITE_NAME } from "@services/constants";
import type { ResolvedEntryModel } from "@services/VocabularyService";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { vocabularyService } from "@services/VocabularyService/instance";

type EmbedByIdPage = {
  data: ResolvedEntryModel;
};

export default function EmbedByIdPage({
  data: {
    entry: { entryJson },
  },
}: EmbedByIdPage): JSX.Element {
  useScrollHeightPostMessage();

  const title = `${entryJson.form.orth[0]?.value} - ${SITE_NAME}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <EntryContextProvider detailBasePath="/embed/entry/byId">
        <EntryFull entry={entryJson} />
      </EntryContextProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<EmbedByIdPage> = async ({
  params: { id } = {},
  res,
}) => {
  const data = await vocabularyService.findById(String(id));

  if (!data) {
    return {
      notFound: true,
    };
  }

  addCachingHeader(res);

  return {
    props: {
      data,
    },
  };
};
