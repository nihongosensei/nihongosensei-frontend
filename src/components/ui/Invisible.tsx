import clsx from "clsx";
import type { HTMLAttributes } from "preact";

export type InvisibleProps = HTMLAttributes<HTMLSpanElement>;

export function Invisible({
  children,
  className = "",
  ...rest
}: InvisibleProps) {
  return (
    <span
      data-testid="invisible"
      className={clsx("invisible", className)}
      {...rest}
    >
      {children}
    </span>
  );
}
