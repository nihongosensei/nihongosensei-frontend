import Document, { Head, Html, Main, NextScript } from "next/document";
import type { JSX } from "react";
import { SITE_NAME } from "~services/constants";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="de">
        <Head>
          <link
            rel="search"
            type="application/opensearchdescription+xml"
            title={`Suche - ${SITE_NAME}`}
            href="/opensearch.xml"
          />
        </Head>
        <body className="bg-white text-black dark:bg-neutral-900 dark:text-white font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
