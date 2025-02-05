import clsx from "clsx";
import type { JSX } from "react";
import type { SenseModel } from "~services/VocabularyService";
import { createElements, Descr, Etym, Refs, SeasonWord } from "../Elements";
import { SenseEntries } from "./SenseEntries";
import { UsgEntries } from "./UsgEntries";

type SenseEntryProps = {
  senseEntry: SenseModel;
};

export function SenseEntry({ senseEntry }: SenseEntryProps): JSX.Element {
  const {
    sense,
    etym,
    descr,
    transAndBracketAndDef = [],
    ref,
    usg = [],
    seasonword,
  } = senseEntry;

  return (
    <li
      className={clsx(
        'inline before:text-neutral-700 before:dark:text-neutral-300 before:content-["_||_"] first:before:content-none',
        !sense && 'after:content-["."]',
      )}
    >
      {etym?.map((etymEntry, index) => (
        <Etym key={`etym-${index}`} className="mr-1" {...etymEntry} />
      ))}
      {descr && <Descr {...descr} />}
      {sense && <SenseEntries className="ml-4" sense={sense} />}
      {usg && <UsgEntries usg={usg} />}
      {createElements(transAndBracketAndDef)}
      <Refs className="ml-1" component="span" refs={ref ?? []} />
      {seasonword?.map((season) => (
        <SeasonWord key={season.type} {...season} />
      ))}
    </li>
  );
}
