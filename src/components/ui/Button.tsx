import clsx from "clsx";
import type { HTMLAttributes } from "preact";

export type ButtonVariant = "primary" | "default" | "text";

export type ButtonProps = {
  variant?: ButtonVariant;
} & HTMLAttributes<HTMLButtonElement>;

const COLOR_MAP: Record<ButtonVariant, string> = {
  default: "border-neutral-700",
  text: "border-transparent",
  primary:
    "border-primary-700 text-primary-700 hover:bg-primary-700 hover:bg-primary-700/20 focus focus:bg-primary-700/40",
};

export function Button({
  className,
  variant = "default",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "select-none text-sm px-4 py-2 focus:outline-hidden-none rounded-sm font-semibold border border-neutral-700",
        COLOR_MAP[variant],
        className,
      )}
      {...rest}
    />
  );
}

export type ButtonLinkProps = {
  variant?: ButtonVariant;
} & HTMLAttributes<HTMLAnchorElement>;

export function ButtonLink({
  className,
  variant = "default",
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={clsx(
        "select-none text-sm px-4 py-2 focus:outline-hidden-none rounded-sm font-semibold border border-neutral-700",
        COLOR_MAP[variant],
        className,
      )}
      {...rest}
    />
  );
}
