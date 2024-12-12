import { ContentWrapper, EntryFull } from "@components/Dict";
import { SITE_NAME } from "@services/constants";
import type { EntryWrapperModel } from "@services/VocabularyService";
import { GetServerSideProps } from "next";
import Head from "next/head";
import type { JSX } from "react";
import { vocabularyService } from "@services/VocabularyService/instance";

type ExamplePageProps = {
  results: EntryWrapperModel[];
};

export default function ExamplePage({
  results,
}: ExamplePageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{`Beispiele - ${SITE_NAME}`}</title>
      </Head>
      <ContentWrapper>
        <div>
          {results.map(({ entryJson }) => (
            <EntryFull key={entryJson.id} entry={entryJson} className="mb-4" />
          ))}
        </div>
      </ContentWrapper>
    </>
  );
}

const EXAMPLE_IDS = [
  7253900, // 引き籠もり
  167612, // 棟
  1707, // 引き籠もる
  273, // 暴食
  208, // キヴァ汗国
  515, // 三ケ日人骨
  4029690, // 来る
  4151, // 堰堤
  8042046, // 行く往く
  11712, // 大社
  8545, // 一杯一杯
  490814, // 赤ゲット; 赤毛布
  2516676, // MEエム･イー
  3778315, // 星
  8444455, // 赤腹
  5075870, // 敷島磯城島
  226081, // 山田風太郎
  10000528, // 食い積み; 食い摘み
  5260527, // 上げる
  2972828, // 魂消る
];

export const getServerSideProps: GetServerSideProps<
  ExamplePageProps
> = async () => {
  const { entries } = await vocabularyService().findBy({
    ids: EXAMPLE_IDS,
    offset: 0,
    limit: EXAMPLE_IDS.length,
  });

  return {
    props: {
      results: entries,
    },
  };
};
