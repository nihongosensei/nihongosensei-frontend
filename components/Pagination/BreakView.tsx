import type { ReactNode } from "react";

export type BreakViewProps = {
  breakLabel: ReactNode | ReactNode[];
  breakAriaLabel?: string;
  breakClassName?: string;
  breakLinkClassName?: string;
};

export function BreakView({
  breakLabel,
  breakAriaLabel,
  breakClassName,
  breakLinkClassName,
}: BreakViewProps) {
  const className = breakClassName || "break";

  return (
    <li className={className}>
      <span
        className={breakLinkClassName}
        tabIndex={-1}
        aria-label={breakAriaLabel}
      >
        {breakLabel}
      </span>
    </li>
  );
}
