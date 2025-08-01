import clsx from "clsx";
import type { OrthModel } from "~services/VocabularyService";
import { PreferredText } from "./PreferredText";

type EntryTextProps = {
  orth: OrthModel[];
  className?: string;
};

export function EntryText({ orth, className }: EntryTextProps) {
  const preferredReadings = orth.filter((orth) => orth.midashigo);
  if (!preferredReadings.length) {
    return (
      <span
        className={clsx(
          'font-serif after:text-neutral-700 after:dark:text-neutral-300 after:content-[";_"] last:after:content-none',
          className,
        )}
        lang="ja"
      >
        <PreferredText text={orth[0].value} />
      </span>
    );
  }

  return (
    <>
      {preferredReadings.map((reading) => (
        <span
          key={reading.value}
          className={clsx(
            'font-serif after:text-neutral-700 after:dark:text-neutral-300 after:content-[";_"] last:after:content-none',
            className,
          )}
          lang="ja"
        >
          <PreferredText text={reading.value} />
        </span>
      ))}
    </>
  );
}
