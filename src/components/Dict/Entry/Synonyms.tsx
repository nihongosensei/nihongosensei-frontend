import { RelatedEntry } from "~components/Dict/Entry/RelatedEntry";
import { Heading } from "~components/ui/Typography/Heading";
import type { EntryModel } from "~services/VocabularyService";

type SynonymsProps = {
  entries: ReadonlyArray<EntryModel>;
  className?: string;
};

export function Synonyms({ entries, className }: SynonymsProps) {
  if (!entries.length) {
    return null;
  }

  return (
    <div className={className}>
      <Heading level={2} className="mb-3">
        Synonyme:{" "}
      </Heading>
      <ol className="list-decimal list-inside">
        {entries.map((entry) => (
          <RelatedEntry key={entry.id} className="py-1" entry={entry} />
        ))}
      </ol>
    </div>
  );
}
