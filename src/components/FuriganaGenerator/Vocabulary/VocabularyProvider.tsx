import clsx from "clsx";
import { EntryFull } from "~components/Dict/Entry/EntryFull";
import { useStore } from "~components/FuriganaGenerator/FuriganaGeneratorContext";
import { Alert } from "~components/ui/Alert";
import { Button } from "~components/ui/Button";
import { ArrowTopRightOnSquareIcon } from "~components/ui/Icons/ArrowTopRightOnSquareIcon";
import { Link } from "~components/ui/Link";

type VocabularyProps = {
  className?: string;
};

export function VocabularyProvider({ className }: VocabularyProps) {
  const store = useStore();

  if (store.vocabulary.text == null) {
    return null;
  }

  return (
    <div className={clsx(className, "overflow-auto")}>
      {store.vocabulary.vocabulary.value != null && (
        <>
          {store.vocabulary.vocabulary.value.entries.map((entry) => (
            <EntryFull
              key={entry.id}
              entry={entry.entryJson}
              className="mb-4 p-4 border border-neutral-300 dark:border-neutral-700 rounded-sm"
            >
              <Link
                href={`/entry/${entry.id}`}
                target="_blank"
                className="mt-4 inline-flex items-center"
              >
                Im Wörterbuch öffnen
                <ArrowTopRightOnSquareIcon className="ml-1 w-4 h-4" />
              </Link>
            </EntryFull>
          ))}
          {store.vocabulary.remainingCount.value > 0 && (
            <Button onClick={store.vocabulary.loadMore}>
              {store.vocabulary.remainingCount} weitere Einträge
            </Button>
          )}
        </>
      )}
      {store.vocabulary.error.value != null && (
        <Alert type="error">{store.vocabulary.error}</Alert>
      )}
    </div>
  );
}
