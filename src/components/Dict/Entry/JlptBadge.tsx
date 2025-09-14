import clsx from "clsx";

type JlptBadgeProps = {
  level: number;
  className?: string;
};

export function JlptBadge({ level, className }: JlptBadgeProps) {
  return (
    <a
      href={`/jlpt/${level}`}
      className={clsx(
        "inline-block text-sm px-1 border rounded-sm border-primary-700 dark:border-primary-300 text-primary-700 dark:text-primary-300",
        className,
      )}
    >
      JLPT N{level}
    </a>
  );
}
