import clsx from "clsx";
import { type AnchorHTMLAttributes } from "preact";

const COLOR_MAP = {
  primary:
    "underline underline-offset-4 text-primary-700 dark:text-primary-300",
  text: "underline underline-offset-4",
  plain: "",
};

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  color?: keyof typeof COLOR_MAP;
};

export function Link({ className, color = "primary", ...rest }: LinkProps) {
  return <a className={clsx(COLOR_MAP[color], className)} {...rest} />;
}
