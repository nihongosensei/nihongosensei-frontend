import ExternalIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import { actions } from "astro:actions";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { EntryFull } from "~components/Dict/Entry/EntryFull";
import { Alert } from "~components/ui/Alert";
import { Button } from "~components/ui/Button";
import { Link } from "~components/ui/Link";
import { LoadingProgress } from "~components/ui/LoadingProgress";
import type { FindByResponseModel } from "~services/VocabularyService";

type VocabularyProps = {
  text: string;
  className?: string;
};

const ENTRY_LIMIT = 3;

export function VocabularyProvider({ text, className = "" }: VocabularyProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<FindByResponseModel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const offsetRef = useRef(0);
  const textRef = useRef(text);

  useEffect(() => {
    if (!text) {
      return;
    }

    const perform = async () => {
      setResponse(
        await actions.vocabularyByText.orThrow({
          text,
          limit: ENTRY_LIMIT,
          offset: 0,
        }),
      );
      setError(null);
      offsetRef.current = 0;
    };

    setLoading(true);
    perform()
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch vocabulary information");
      })
      .finally(() => setLoading(false));
  }, [text]);

  const loadMoreHandler = useCallback(() => {
    if (!textRef.current) {
      return;
    }

    offsetRef.current += ENTRY_LIMIT;

    const perform = async () => {
      const params = new URLSearchParams();
      params.set("text", textRef.current);
      params.set("limit", ENTRY_LIMIT.toString());
      params.set("offset", offsetRef.current.toString());

      const data = await actions.vocabularyByText.orThrow({
        text: textRef.current,
        limit: ENTRY_LIMIT,
        offset: offsetRef.current,
      });
      setResponse((initialResponse) => {
        return {
          entries: [...(initialResponse?.entries ?? []), ...data.entries],
          count: data.count,
        };
      });
      setError(null);
    };

    setLoading(true);
    perform()
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch more vocabulary information");
      })
      .finally(() => setLoading(false));
  }, []);

  const hasMoreEntries =
    response != null && response.entries.length < response.count;

  return (
    <div className={clsx(className, "overflow-auto")}>
      {loading && <LoadingProgress />}
      {response && (
        <>
          {response.entries.map((entry) => (
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
                <ExternalIcon className="ml-1 w-4 h-4" />
              </Link>
            </EntryFull>
          ))}
          {hasMoreEntries && (
            <Button onClick={loadMoreHandler}>
              {response.count - ENTRY_LIMIT} weitere Einträge
            </Button>
          )}
        </>
      )}
      {error && <Alert type="error">{error}</Alert>}
    </div>
  );
}
