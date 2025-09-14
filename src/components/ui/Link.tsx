import clsx from "clsx";
import { type AnchorHTMLAttributes, forwardRef } from "react";

const COLOR_MAP = {
  primary:
    "underline underline-offset-4 text-primary-700 dark:text-primary-300",
  text: "underline underline-offset-4",
  plain: "",
};

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  color?: keyof typeof COLOR_MAP;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, color = "primary", ...rest },
  ref,
) {
  return (
    <a className={clsx(COLOR_MAP[color], className)} ref={ref} {...rest} />
  );
});
