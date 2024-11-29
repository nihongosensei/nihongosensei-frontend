import clsx from "clsx";
import { EntryFull } from "@components/Dict";
import { Alert, Button, Link, LoadingProgress } from "@components/ui";
import ExternalIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ByTextResponseModel } from "../../../pages/api/entry/byText";

type VocabularyProps = {
  text: string;
  className?: string;
};

const ENTRY_LIMIT = 3;

/**
 * TODO: add api client class and add caching.
 */
async function getByText(queryString?: string): Promise<ByTextResponseModel> {
  const response = await fetch(`/api/entry/byText?${queryString}`);
  if (!response.ok) {
    throw new Error(`failed to fetch - ${response.statusText}`);
  }

  return (await response.json()) as ByTextResponseModel;
}

export function VocabularyProvider({
  text,
  className = "",
}: VocabularyProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ByTextResponseModel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const offsetRef = useRef(0);
  const textRef = useRef(text);

  useEffect(() => {
    if (!text) {
      return;
    }

    const perform = async () => {
      const params = new URLSearchParams();
      params.set("text", text);
      params.set("limit", ENTRY_LIMIT.toString());

      setResponse(await getByText(params.toString()));
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

      const data = await getByText(params.toString());
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
              className="mb-4 p-4 border border-gray-300 dark:border-gray-700 rounded"
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
