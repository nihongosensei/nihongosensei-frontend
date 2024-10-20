import {
  ContentWrapper,
  EntriesContainer,
  EntriesContainerProps,
} from "@components/Dict";
import { addCachingHeader, parseError } from "@helper";
import { SITE_NAME } from "@services/constants";
import type { VocabularyFindOptions } from "@services/VocabularyService";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { vocabularyService } from "@services/VocabularyService/instance";
import { parsePaginationParams } from "@services/VocabularyService/helper/parsePaginationParams";

type JlptPageProps = {
  level: number;
} & EntriesContainerProps;

export default function JlptPage({
  level,
  ...rest
}: JlptPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>
          JLPT N{level} - {SITE_NAME}
        </title>
      </Head>
      <ContentWrapper>
        <EntriesContainer {...rest} />
      </ContentWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<JlptPageProps> = async ({
  query: { level = "", ...params } = {},
  res,
}) => {
  const levelNumber = Number(Array.isArray(level) ? level[0] : level) || 5;
  const options: VocabularyFindOptions = {
    jlpt: levelNumber,
    ...parsePaginationParams(params),
  };

  let results = null;
  let count = null;
  let error = null;

  try {
    const response = await vocabularyService.findBy(options);
    results = response.entries;
    count = response.count;
  } catch (e) {
    console.log(e);
    error = parseError(e);
  }

  addCachingHeader(res);

  return {
    props: {
      level: levelNumber,
      results,
      count,
      options,
      error,
    },
  };
};
