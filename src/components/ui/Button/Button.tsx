import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef, HTMLProps } from "react";

export type ButtonVariant = "primary" | "default" | "text";

export type ButtonProps = {
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const COLOR_MAP: Record<ButtonVariant, string> = {
  default: "border-neutral-700",
  text: "border-transparent",
  primary:
    "border-primary-700 text-primary-700 hover:bg-primary-700 hover:bg-primary-700/20 focus focus:bg-primary-700/40",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className = "", variant = "default", ...rest }, ref) {
    return (
      <button
        className={clsx(
          "select-none text-sm px-4 py-2 focus:outline-hidden-none rounded-sm font-semibold border border-neutral-700",
          COLOR_MAP[variant],
          className,
        )}
        ref={ref}
        {...rest}
      />
    );
  },
);

export type ButtonLinkProps = {
  variant?: ButtonVariant;
} & HTMLProps<HTMLAnchorElement>;

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function Button({ className = "", variant = "default", ...rest }, ref) {
    return (
      <a
        className={clsx(
          "select-none text-sm px-4 py-2 focus:outline-hidden-none rounded-sm font-semibold border border-neutral-700",
          COLOR_MAP[variant],
          className,
        )}
        ref={ref}
        {...rest}
      />
    );
  },
);
