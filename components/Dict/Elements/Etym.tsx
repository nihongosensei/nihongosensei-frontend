import type { JSX } from "react";
import { MinorText } from "@components/ui";
import type { EtymModel } from "@services/VocabularyService";
import { createElements } from "./helper/createElements";
import { Abbrev } from "./Abbrev";

type EtymProps = EtymModel & {
  className?: string;
};

export function Etym({
  abbrev,
  textAndRefAndLiteral,
  className,
}: EtymProps): JSX.Element {
  return (
    <MinorText className={className}>
      {abbrev && <Abbrev {...abbrev} />}
      {textAndRefAndLiteral && <>({createElements(textAndRefAndLiteral)})</>}
    </MinorText>
  );
}
