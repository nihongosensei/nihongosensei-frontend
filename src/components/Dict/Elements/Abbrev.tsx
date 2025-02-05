import { Fragment } from "react";
import type { AbbrevModel } from "~services/VocabularyService";
import { Ref } from "./Ref";

export function Abbrev({ ref }: AbbrevModel) {
  if (ref == null || !ref.length) {
    return null;
  }

  return (
    <>
      {ref
        .filter((ref) => ref != null)
        .map((ref) => (
          <Fragment key={ref.id}>
            (Abk. von <Ref {...ref} />
          </Fragment>
        ))}
    </>
  );
}
