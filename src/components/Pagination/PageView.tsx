import type { AriaAttributes } from "react";
import { Link } from "~components/ui/Link";

export type PageViewProps = {
  selected: boolean;
  pageClassName?: string;
  pageLinkClassName?: string;
  activeClassName?: string;
  activeLinkClassName?: string;
  href: string;
  ariaLabel?: string;
  page: number;
  pageLabelBuilder: (page: number) => string;
  rel?: string;
};

export function PageView({
  page,
  selected,
  activeClassName,
  activeLinkClassName,
  href,
  pageLabelBuilder,
  rel,
  pageClassName,
  pageLinkClassName,
  ariaLabel: defaultAriaLabel,
}: PageViewProps) {
  let ariaLabel = defaultAriaLabel || "Page " + page;
  let ariaCurrent: AriaAttributes["aria-current"];

  if (selected) {
    ariaCurrent = "page";

    ariaLabel = defaultAriaLabel || "Page " + page + " is your current page";

    if (typeof pageClassName !== "undefined") {
      pageClassName = pageClassName + " " + activeClassName;
    } else {
      pageClassName = activeClassName;
    }

    if (typeof pageLinkClassName !== "undefined") {
      if (typeof activeLinkClassName !== "undefined") {
        pageLinkClassName = pageLinkClassName + " " + activeLinkClassName;
      }
    } else {
      pageLinkClassName = activeLinkClassName;
    }
  }

  return (
    <li className={pageClassName}>
      <Link
        rel={rel}
        role={!href ? "button" : undefined}
        className={pageLinkClassName}
        href={href}
        tabIndex={selected ? -1 : 0}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
      >
        {pageLabelBuilder(page)}
      </Link>
    </li>
  );
}
