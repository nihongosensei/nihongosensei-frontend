import clsx from "clsx";
import { useRouter } from "next/router";
import type { UrlObject } from "node:url";
import type { JSX } from "react";
import { useCallback } from "react";
import PaginationBoxView, {
  PaginationBoxViewProps,
} from "~components/Pagination/PaginationBoxView";

type PaginationProps = {
  offset: number;
  limit: number;
  count: number;
  className?: string;
};

export function Pagination({
  limit,
  count,
  offset,
  className,
}: PaginationProps): JSX.Element {
  const router = useRouter();
  const currentPage = offset / limit;
  const pageCount = Math.ceil(count / limit);
  const hrefBuilder: PaginationBoxViewProps["hrefBuilder"] = useCallback(
    (page: number): UrlObject => ({
      query: {
        ...router.query,
        offset: (page - 1) * limit,
        limit,
      },
    }),
    [limit, router.query],
  );
  const ariaLabelBuilder: PaginationBoxViewProps["ariaLabelBuilder"] =
    useCallback((page: number, selected: boolean) => {
      if (selected) {
        return `Seite ${page} ist die aktuelle Seite`;
      }

      return `Seite ${page}`;
    }, []);

  return (
    <PaginationBoxView
      hrefBuilder={hrefBuilder}
      previousLabel="«"
      nextLabel="»"
      breakLabel="..."
      pageCount={pageCount}
      initialPage={currentPage}
      marginPagesDisplayed={3}
      pageRangeDisplayed={3}
      activeLinkClassName="font-semibold"
      className={clsx("flex justify-center items-center", className)}
      pageClassName="inline-flex"
      pageLinkClassName="px-3 py-1"
      previousLinkClassName="px-3 py-1"
      nextLinkClassName="px-3 py-1"
      disabledClassName="inline-flex px-3 py-1 text-neutral-300 dark:text-neutral-700"
      breakClassName="px-1 py-1 text-neutral-300 dark:text-neutral-700"
      ariaLabelBuilder={ariaLabelBuilder}
      nextAriaLabel="Nächste Seite"
      previousAriaLabel="Vorherige Seite"
    />
  );
}
