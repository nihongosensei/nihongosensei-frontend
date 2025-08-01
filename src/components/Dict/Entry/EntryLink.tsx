import { useRouter } from "next/router";
import { Link, type LinkProps } from "~components/ui";
import type { EntryModel } from "~services/VocabularyService";
import { useEntryContext } from "../Context";
import { EntryText } from "./EntryText";

type EntryLinkProps = {
  entry: EntryModel;
  className?: string;
} & Pick<LinkProps, "color">;

export function EntryLink({ entry, className, color }: EntryLinkProps) {
  const {
    form: { orth },
  } = entry;
  const { query } = useRouter();
  const { detailBasePath } = useEntryContext();

  return (
    <Link
      href={{
        pathname: `${detailBasePath}/${entry.id}`,
        query: {
          q: query.q,
        },
      }}
      className={className}
      color={color}
    >
      <EntryText orth={orth} />
    </Link>
  );
}
