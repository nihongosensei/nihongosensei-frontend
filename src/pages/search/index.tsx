import type { GetServerSideProps } from "next";
import Head from "next/head";
import type { JSX } from "react";
import {
  ContentWrapper,
  EntriesContainer,
  EntriesContainerProps,
} from "~components/Dict";
import { addCachingHeader, parseError } from "~helper";
import { SITE_NAME } from "~services/constants";
import { parsePaginationParams } from "~services/VocabularyService/helper/parsePaginationParams";
import { vocabularyService } from "~services/VocabularyService/instance";

type SearchPageProps = {
  query: string;
} & EntriesContainerProps;

export default function SearchPage({
  query,
  ...rest
}: SearchPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{`Suche ${query} - ${SITE_NAME}`}</title>
      </Head>
      <ContentWrapper>
        <EntriesContainer {...rest} />
      </ContentWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async ({
  query: { q = "", ...params },
  res,
}) => {
  const query = Array.isArray(q) ? q[0] : q;
  const options = parsePaginationParams(params);

  let results = null;
  let count = null;
  let error = null;

  try {
    const response = await vocabularyService().findBy({
      ...options,
      query,
    });
    results = response.entries;
    count = response.count;
  } catch (e) {
    console.log(e);
    error = parseError(e);
  }

  addCachingHeader(res, {
    maxAgeInSeconds: 60,
    staleAgeInSeconds: 60,
  });

  return {
    props: {
      query,
      results,
      count,
      options,
      error,
    },
  };
};
