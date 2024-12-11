import { Component, JSX, ReactNode } from "react";
import type { UrlObject } from "node:url";
import { PageView } from "./PageView";
import { BreakView } from "./BreakView";
import { Link } from "@components/ui";
import clsx from "clsx";

export type PaginationBoxViewProps = typeof PaginationBoxView.defaultProps & {
  pageCount: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  previousLabel?: ReactNode;
  previousAriaLabel?: string;
  prevPageRel?: string;
  prevRel?: string;
  nextLabel?: ReactNode;
  nextAriaLabel?: string;
  nextPageRel?: string;
  nextRel?: string;
  breakLabel?: ReactNode;
  breakAriaLabels?: {
    forward?: string;
    backward?: string;
  };
  hrefBuilder: (
    page: number,
    count: number,
    activePage: number,
  ) => string | UrlObject;
  hrefAllControls?: boolean;
  initialPage: number;
  className?: string;
  pageClassName?: string;
  pageLinkClassName?: string;
  pageLabelBuilder?: (page: number) => string;
  activeClassName?: string;
  activeLinkClassName?: string;
  previousClassName?: string;
  nextClassName?: string;
  previousLinkClassName?: string;
  nextLinkClassName?: string;
  disabledClassName?: string;
  disabledLinkClassName?: string;
  breakClassName?: string;
  breakLinkClassName?: string;
  ariaLabelBuilder?: (page: number, selected: boolean) => string;
  eventListener?: string;
  renderOnZeroPageCount?: (props: PaginationBoxViewProps) => ReactNode;
  selectedPageRel?: string;
};

/**
 * Migrated to typescript as the original is no longer maintained and
 * not compatible with react > 19.
 *
 * @see https://github.com/AdeleD/react-paginate
 */
export default class PaginationBoxView extends Component<PaginationBoxViewProps> {
  static defaultProps = {
    pageRangeDisplayed: 2,
    marginPagesDisplayed: 3,
    activeClassName: "selected",
    previousLabel: "Previous",
    previousClassName: "previous",
    previousAriaLabel: "Previous page",
    prevPageRel: "prev",
    prevRel: "prev",
    nextLabel: "Next",
    nextClassName: "next",
    nextAriaLabel: "Next page",
    nextPageRel: "next",
    nextRel: "next",
    breakLabel: "...",
    breakAriaLabels: { forward: "Jump forward", backward: "Jump backward" },
    disabledClassName: "disabled",
    pageLabelBuilder: (page: number): string => page.toString(),
    eventListener: "onClick",
    selectedPageRel: "canonical",
    hrefAllControls: false,
  };

  constructor(props: PaginationBoxViewProps) {
    super(props);
  }

  public render() {
    if (this.props.pageCount === 0 && this.props.renderOnZeroPageCount) {
      return this.props.renderOnZeroPageCount(this.props) ?? null;
    }

    const {
      disabledClassName,
      disabledLinkClassName,
      pageCount,
      className,
      previousLabel,
      previousClassName,
      previousLinkClassName,
      previousAriaLabel,
      prevRel,
      nextLabel,
      nextClassName,
      nextLinkClassName,
      nextAriaLabel,
      nextRel,
      initialPage,
    } = this.props;

    const isPreviousDisabled = initialPage === 0;
    const isNextDisabled = initialPage === pageCount - 1;

    return (
      <ul className={className} role="navigation" aria-label="Pagination">
        <li
          className={isPreviousDisabled ? disabledClassName : previousClassName}
        >
          {isPreviousDisabled ? (
            <span
              className={disabledLinkClassName}
              tabIndex={-1}
              role="button"
              aria-disabled={true}
              aria-label={previousAriaLabel}
              rel={prevRel}
            >
              {previousLabel}
            </span>
          ) : (
            <Link
              className={previousLinkClassName}
              href={this.getElementHref(initialPage - 1)}
              tabIndex={0}
              role="button"
              aria-disabled={false}
              aria-label={previousAriaLabel}
              rel={prevRel}
            >
              {previousLabel}
            </Link>
          )}
        </li>

        {this.createPaginationElements()}

        <li
          className={clsx(isNextDisabled ? disabledClassName : nextClassName)}
        >
          {isNextDisabled ? (
            <span
              className={disabledLinkClassName}
              tabIndex={-1}
              role="button"
              aria-disabled={true}
              aria-label={nextAriaLabel}
              rel={nextRel}
            >
              {nextLabel}
            </span>
          ) : (
            <Link
              className={nextLinkClassName}
              href={this.getElementHref(initialPage + 1)}
              tabIndex={0}
              role="button"
              aria-disabled={false}
              aria-label={nextAriaLabel}
              rel={nextRel}
            >
              {nextLabel}
            </Link>
          )}
        </li>
      </ul>
    );
  }

  private getElementHref(pageIndex: number): string | UrlObject {
    const { hrefBuilder, pageCount, hrefAllControls, initialPage } = this.props;

    if (hrefAllControls || (pageIndex >= 0 && pageIndex < pageCount)) {
      return hrefBuilder(pageIndex + 1, pageCount, initialPage);
    }

    return "#";
  }

  private ariaLabelBuilder(pageIndex: number): string | undefined {
    if (
      this.props.ariaLabelBuilder &&
      pageIndex >= 0 &&
      pageIndex < this.props.pageCount
    ) {
      const selected = pageIndex === this.props.initialPage;

      return this.props.ariaLabelBuilder(pageIndex + 1, selected);
    }
  }

  private getElementPageRel(index: number): string | undefined {
    const { nextPageRel, prevPageRel, selectedPageRel, initialPage } =
      this.props;

    if (initialPage - 1 === index) {
      return prevPageRel;
    } else if (initialPage === index) {
      return selectedPageRel;
    } else if (initialPage + 1 === index) {
      return nextPageRel;
    }
  }

  private getPageElement(index: number): JSX.Element {
    const {
      pageClassName,
      pageLinkClassName,
      activeClassName,
      activeLinkClassName,
      pageLabelBuilder,
      initialPage,
    } = this.props;

    return (
      <PageView
        key={index}
        selected={initialPage === index}
        rel={this.getElementPageRel(index)}
        pageClassName={pageClassName}
        pageLinkClassName={pageLinkClassName}
        activeClassName={activeClassName}
        activeLinkClassName={activeLinkClassName}
        href={this.getElementHref(index)}
        ariaLabel={this.ariaLabelBuilder(index)}
        page={index + 1}
        pageLabelBuilder={pageLabelBuilder}
      />
    );
  }

  private createPaginationElements(): JSX.Element[] {
    const {
      pageRangeDisplayed,
      pageCount,
      marginPagesDisplayed,
      breakLabel,
      breakClassName,
      breakLinkClassName,
      breakAriaLabels,
      initialPage,
    } = this.props;
    const items: JSX.Element[] = [];

    if (pageCount <= pageRangeDisplayed) {
      for (let index = 0; index < pageCount; index++) {
        items.push(this.getPageElement(index));
      }
    } else {
      let leftSide = pageRangeDisplayed / 2;
      let rightSide = pageRangeDisplayed - leftSide;

      // If the selected page index is on the default right side of the pagination,
      // we consider that the new right side is made up of it (= only one break element).
      // If the selected page index is on the default left side of the pagination,
      // we consider that the new left side is made up of it (= only one break element).
      if (initialPage > pageCount - pageRangeDisplayed / 2) {
        rightSide = pageCount - initialPage;
        leftSide = pageRangeDisplayed - rightSide;
      } else if (initialPage < pageRangeDisplayed / 2) {
        leftSide = initialPage;
        rightSide = pageRangeDisplayed - leftSide;
      }

      const createPageView = (index: number) => this.getPageElement(index);
      let breakView: JSX.Element | undefined = undefined;

      // First pass: process the pages or breaks to display (or not).
      const pagesBreaking: {
        type: "page" | "break";
        index: number;
        display: JSX.Element;
      }[] = [];
      for (let index = 0; index < pageCount; index++) {
        const page = index + 1;

        // If the page index is lower than the margin defined,
        // the page has to be displayed on the left side of
        // the pagination.
        if (page <= marginPagesDisplayed) {
          pagesBreaking.push({
            type: "page",
            index,
            display: createPageView(index),
          });
          continue;
        }

        // If the page index is greater than the page count
        // minus the margin defined, the page has to be
        // displayed on the right side of the pagination.
        if (page > pageCount - marginPagesDisplayed) {
          pagesBreaking.push({
            type: "page",
            index,
            display: createPageView(index),
          });
          continue;
        }

        // If it is the first element of the array the rightSide need to be adjusted,
        //  otherwise an extra element will be rendered
        const adjustedRightSide =
          initialPage === 0 && pageRangeDisplayed > 1
            ? rightSide - 1
            : rightSide;

        // If the page index is near the selected page index
        // and inside the defined range (pageRangeDisplayed)
        // we have to display it (it will create the center
        // part of the pagination).
        if (
          index >= initialPage - leftSide &&
          index <= initialPage + adjustedRightSide
        ) {
          pagesBreaking.push({
            type: "page",
            index,
            display: createPageView(index),
          });
          continue;
        }

        // If the page index doesn't meet any of the conditions above,
        // we check if the last item of the current "items" array
        // is a break element. If not, we add a break element, else,
        // we do nothing (because we don't want to display the page).
        if (
          breakLabel &&
          pagesBreaking.length > 0 &&
          pagesBreaking[pagesBreaking.length - 1].display !== breakView &&
          // We do not show break if only one active page is displayed.
          (pageRangeDisplayed > 0 || marginPagesDisplayed > 0)
        ) {
          const useBreakAriaLabel =
            index < initialPage
              ? breakAriaLabels.backward
              : breakAriaLabels.forward;
          breakView = (
            <BreakView
              key={index}
              breakAriaLabel={useBreakAriaLabel}
              breakLabel={breakLabel}
              breakClassName={breakClassName}
              breakLinkClassName={breakLinkClassName}
            />
          );
          pagesBreaking.push({ type: "break", index, display: breakView });
        }
      }
      // Second pass: we remove breaks containing one page to the actual page.
      pagesBreaking.forEach((pageElement, i) => {
        let actualPageElement = pageElement;
        // 1 2 3 4 5 6 7 ... 9 10
        //         |
        // 1 2 ... 4 5 6 7 8 9 10
        //             |
        // The break should be replaced by the page.
        if (
          pageElement.type === "break" &&
          pagesBreaking[i - 1] &&
          pagesBreaking[i - 1].type === "page" &&
          pagesBreaking[i + 1] &&
          pagesBreaking[i + 1].type === "page" &&
          pagesBreaking[i + 1].index - pagesBreaking[i - 1].index <= 2
        ) {
          actualPageElement = {
            type: "page",
            index: pageElement.index,
            display: createPageView(pageElement.index),
          };
        }
        // We add the displayed elements in the same pass, to avoid another iteration.
        items.push(actualPageElement.display);
      });
    }

    return items;
  }
}
