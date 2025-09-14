import { EntryListItem } from "~components/Dict/Entry/EntryListItem";
import { Pagination } from "~components/Pagination";
import { Alert } from "~components/ui/Alert";
import { MinorText } from "~components/ui/Typography/MinorText";
import type { EntryWrapperModel } from "~services/VocabularyService";

export type EntriesContainerProps = {
  currentPage: number;
  pageCount: number;
  results: EntryWrapperModel[] | null;
  query?: string | null;
  count: number | null;
  error: string | null;
};

export function EntriesContainer({
  results,
  count,
  currentPage,
  pageCount,
  query,
  error,
}: EntriesContainerProps) {
  return (
    <>
      {error && (
        <Alert type="error">
          <p>Ein Fehler ist aufgetreten:</p>
          <code>{error}</code>
        </Alert>
      )}
      {count === 0 && <Alert type="info">Keine Ergebnisse gefunden.</Alert>}
      {results && count != null && count > 0 && (
        <>
          <MinorText className="mb-5" component="div">
            <b>{count}</b> Ergebnisse.
          </MinorText>
          <div>
            {results.map(({ entryJson }) => (
              <EntryListItem
                key={entryJson.id}
                entry={entryJson}
                className="mb-3"
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            query={query}
            className="pt-4"
          />
        </>
      )}
    </>
  );
}
