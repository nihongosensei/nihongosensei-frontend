import { GetServerSideProps } from "next";
import Head from "next/head";
import type { JSX } from "react";
import {
  ContentWrapper,
  EntryFull,
  JlptBadge,
  RelatedEntries,
  Synonyms,
} from "~components/Dict";
import { EntryKanjis } from "~components/Dict/EntryKanjis/EntryKanjis";
import { addCachingHeader } from "~helper";
import { SITE_NAME } from "~services/constants";
import {
  EntryWrapperModel,
  KanjiModel,
  ResolvedEntryRefModel,
} from "~services/VocabularyService";
import { vocabularyService } from "~services/VocabularyService/instance";

type EntryDetailPageProps = {
  entry: EntryWrapperModel;
  synonyms: EntryWrapperModel[] | null;
  relatedEntries: ResolvedEntryRefModel[] | null;
  kanjis: KanjiModel[] | null;
};

export default function EntryDetailPage({
  entry: { entryJson, jlpt },
  synonyms = [],
  relatedEntries = [],
  kanjis = [],
}: EntryDetailPageProps): JSX.Element {
  const title = `${entryJson.form.orth[0]?.value} - ${SITE_NAME}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentWrapper>
        <EntryFull entry={entryJson} />
        {jlpt && (
          <div className="my-2">
            <JlptBadge level={jlpt} />
          </div>
        )}
        <Synonyms
          className="pt-4 mt-4 border-t border-neutral-300 dark:border-neutral-700"
          entries={synonyms?.map((entry) => entry.entryJson) ?? []}
        />
        <EntryKanjis
          className="mt-4 pt-4 border-t border-neutral-300 dark:border-neutral-700"
          kanjis={kanjis ?? []}
        />
        <RelatedEntries
          className="pt-4 mt-4 border-t border-neutral-300 dark:border-neutral-700"
          entries={relatedEntries ?? []}
        />
      </ContentWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  EntryDetailPageProps
> = async ({ params: { id } = {}, res }) => {
  const entry = await vocabularyService().findById(String(id));

  if (!entry) {
    return {
      notFound: true,
    };
  }

  addCachingHeader(res);

  return {
    props: entry,
  };
};
