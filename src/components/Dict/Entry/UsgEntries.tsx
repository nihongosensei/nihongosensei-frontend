import type { JSX } from "react";
import { joinBy } from "~components/helper";
import type { UsgModel } from "~services/VocabularyService";
import { Usg } from "../Elements";

type UsgEntriesProps = {
  usg: UsgModel[];
};

export function UsgEntries({ usg }: UsgEntriesProps): JSX.Element | null {
  return (
    <>
      {usg
        .map((usg, index) => <Usg key={index} {...usg} />)
        .reduce(joinBy(" "), [])}{" "}
    </>
  );
}
