import clsx from "clsx";
import {
  createElement,
  type ComponentChildren,
  type HTMLAttributes,
  type JSX,
} from "preact";

export type MinorTextProps = HTMLAttributes<HTMLSpanElement> & {
  component?: keyof JSX.IntrinsicElements;
  children?: ComponentChildren;
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
