import { MinorText } from "~components/ui/Typography/MinorText";
import type { OrthModel, OrthTypes } from "~services/VocabularyService";
import { PreferredText } from "./PreferredText";

type OtherReadingsProps = {
  orth: OrthModel[];
};

const READING_MAP: Record<OrthTypes, string | null> = {
  IRREG: "irregulär",
  READ: null,
  LONG: null,
  MISTAKE: "fehlerhaft",
};

export function OtherReadings({ orth }: OtherReadingsProps) {
  const hasMidashigo = orth.some((orthEntry) => orthEntry.midashigo);
  if (!hasMidashigo && orth.length === 1) {
    return null;
  }

  const otherReadings = orth.filter((orthEntry) => !orthEntry.midashigo);

  return (
    <div className="mt-2">
      Andere Lesungen:{" "}
      <ul className="inline">
        {otherReadings.map((orthEntry, index) => (
          <li
            key={index}
            lang="ja"
            className={
              'inline after:text-neutral-700 after:dark:text-neutral-300 after:content-["・"] last:after:content-none'
            }
          >
            <PreferredText text={orthEntry.value} />
            {orthEntry.midashigo && <MinorText> (見出し語)</MinorText>}
            {orthEntry.type && READING_MAP[orthEntry.type] && (
              <MinorText> ({READING_MAP[orthEntry.type]})</MinorText>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
