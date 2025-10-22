import { Fragment } from "react";
import type { AbbrevModel } from "~services/VocabularyService";
import { Ref } from "./Ref";

export function Abbrev({ ref }: AbbrevModel) {
  // eslint-disable-next-line react-hooks/refs
  if (ref == null || !ref.length) {
    return null;
  }

  return (
    <>
      {/* eslint-disable-next-line react-hooks/refs */}
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
