import clsx from "clsx";
import type { HTMLProps, JSX } from "react";
import styles from "./Grid.module.css";

type GridProps = HTMLProps<HTMLDivElement>;

export function Grid({ className = "", ...rest }: GridProps): JSX.Element {
  return (
    <div
      className={clsx(styles.grid, "h-screen m-auto gap-4 sm:p-6", className)}
      {...rest}
    />
  );
}
