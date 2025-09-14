import { Link } from "~components/ui/Link";
import type { EntryModel } from "~services/VocabularyService";
import { EntryText } from "./EntryText";

type EntryLinkProps = {
  entry: EntryModel;
  className?: string;
};

export function EntryLink({ entry, className }: EntryLinkProps) {
  const {
    form: { orth },
  } = entry;

  return (
    <Link href={`/entry/${entry.id}`} className={className} color="primary">
      <EntryText orth={orth} />
    </Link>
  );
}
