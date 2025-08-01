import clsx from "clsx";
import { createElement, type HTMLProps, type JSX, type ReactNode } from "react";

export type MinorTextProps = HTMLProps<HTMLSpanElement> & {
  component?: keyof JSX.IntrinsicElements;
  children?: ReactNode | ReactNode[];
};

export function MinorText({
  className,
  component = "span",
  ...rest
}: MinorTextProps) {
  return createElement(component, {
    className: clsx("text-neutral-700 dark:text-neutral-300", className),
    ...rest,
  });
}
