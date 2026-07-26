import clsx from "clsx";
import { Link } from "~components/ui/Link";
import { createPaginationModel } from "./createPaginationModel";

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  query?: string | null;
  className?: string;
};

export function Pagination({
  currentPage,
  pageCount,
  query,
  className,
}: PaginationProps) {
  const pagination = createPaginationModel({
    currentPage,
    boundaryPagesRange: 3,
    siblingPagesRange: 0,
    hideEllipsis: false,
    hidePreviousAndNextPageLinks: false,
    hideFirstAndLastPageLinks: true,
    totalPages: pageCount,
  });

  return (
    <div className={clsx("flex justify-center items-center", className)}>
      {pagination.map((page) => {
        switch (page.type) {
          case "PAGE":
            return (
              <PaginationPage
                key={page.key}
                isActive={page.isActive}
                page={page.value}
                query={query}
              />
            );
          case "ELLIPSIS":
            return (
              <li
                key={page.key}
                className="inline-flex px-1 py-1 text-neutral-300 dark:text-neutral-700"
              >
                <span tabIndex={-1}>...</span>
              </li>
            );
          case "PREVIOUS_PAGE_LINK":
            return (
              <PaginationPage
                key={page.key}
                page={page.value}
                text="«"
                query={query}
                isDisabled={page.isActive}
              />
            );
          case "NEXT_PAGE_LINK":
            return (
              <PaginationPage
                key={page.key}
                page={page.value}
                text="»"
                query={query}
                isDisabled={page.isActive}
              />
            );
        }
      })}
    </div>
  );
}

function PaginationPage({
  isActive,
  isDisabled,
  page,
  text = page.toString(),
  query,
}: {
  isActive?: boolean;
  isDisabled?: boolean;
  page: number;
  text?: string;
  query?: string | null;
}) {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  if (query) {
    params.set("q", query);
  }

  return (
    <li className="inline-flex">
      {isDisabled ? (
        <span
          className="text-neutral-300 dark:text-neutral-700"
          tabIndex={-1}
          role="button"
          aria-disabled="true"
          aria-label="Vorherige Seite"
        >
          «
        </span>
      ) : (
        <Link
          href={`?${params.toString()}`}
          className={clsx("px-3 py-1", isActive && "font-semibold")}
          tabIndex={isActive ? -1 : 0}
          aria-label={isActive ? "Aktuelle Seite" : `Seite ${page}`}
          aria-current={isActive ? "page" : undefined}
        >
          {text}
        </Link>
      )}
    </li>
  );
}
