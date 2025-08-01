import type { GetServerSideProps } from "next";
import Head from "next/head";
import { ContentWrapper } from "~components/Dict";
import { RelatedEntry } from "~components/Dict/Entry/RelatedEntry";
import { KanjiFull } from "~components/Dict/EntryKanjis/KanjiFull";
import { Heading } from "~components/ui";
import { addCachingHeader } from "~helper";
import { SITE_NAME } from "~services/constants";
import type {
  EntryWrapperModel,
  KanjiModel,
} from "~services/VocabularyService";
import { vocabularyService } from "~services/VocabularyService/instance";

type KanjiDetailPageProps = {
  kanji: KanjiModel;
  entries: EntryWrapperModel[];
};

export default function KanjiDetailPage({
  kanji,
  entries,
}: KanjiDetailPageProps) {
  return (
    <>
      <Head>
        <title>{`${kanji.kanji} - ${SITE_NAME}`}</title>
      </Head>
      <ContentWrapper>
        <KanjiFull kanji={kanji} />
        <div className="mt-4">
          <Heading level={2} className="mb-3">
            Beispiele
          </Heading>
          <ol className="list-decimal list-inside">
            {entries.map(({ entryJson }) => (
              <RelatedEntry key={entryJson.id} entry={entryJson} />
            ))}
          </ol>
        </div>
      </ContentWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  KanjiDetailPageProps
> = async ({ params: { kanji } = {}, res }) => {
  const kanjiString = Array.isArray(kanji) ? kanji[0] : kanji;
  if (!kanjiString) {
    return {
      notFound: true,
    };
  }

  const kanjiModel = await vocabularyService().findKanji(kanjiString);

  if (!kanjiModel) {
    return {
      notFound: true,
    };
  }

  const { entries } = await vocabularyService().findBy({
    limit: 15,
    offset: 0,
    kanjis: [kanjiModel.kanji],
  });

  addCachingHeader(res);

  return {
    props: {
      kanji: kanjiModel,
      entries,
    },
  };
};
