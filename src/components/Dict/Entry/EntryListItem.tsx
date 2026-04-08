import clsx from "clsx";
import { Link } from "~components/ui/Link";
import { MinorText } from "~components/ui/Typography/MinorText";
import type { EntryModel } from "~services/VocabularyService";
import { createElements, Refs } from "../Elements";
import { EntryText } from "./EntryText";
import { Reading } from "./Reading";
import { SenseEntries } from "./SenseEntries";

type EntryListItemProps = {
  entry: EntryModel;
  className?: string;
};

export function EntryListItem({ entry, className }: EntryListItemProps) {
  const {
    form: { orth, reading },
    sense,
    ref,
  } = entry;

  return (
    <div
      className={clsx(
        "border-b border-neutral-300 dark:border-neutral-700 pb-4 font-serif text-lg",
        className,
      )}
    >
      <div className="mb-1">
        <Link
          href={`/entry/${entry.id}`}
          lang="ja"
          color="primary"
          className="text-xl"
        >
          <EntryText orth={orth} />
        </Link>
        <MinorText lang="ja" className="ml-2">
          <Reading reading={reading.hatsuon} />
        </MinorText>
      </div>
      <SenseEntries sense={sense} />
      {entry.expl && entry.expl.length > 0 && (
        <MinorText className="mt-2">{createElements(entry.expl)}</MinorText>
      )}
      <Refs className="mt-2" refs={ref ?? []} />
    </div>
  );
}
