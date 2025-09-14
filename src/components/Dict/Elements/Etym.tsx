import { MinorText } from "~components/ui/Typography/MinorText";
import type { EtymModel } from "~services/VocabularyService";
import { Abbrev } from "./Abbrev";
import { createElements } from "./helper/createElements";

type EtymProps = EtymModel & {
  className?: string;
};

export function Etym({ abbrev, textAndRefAndLiteral, className }: EtymProps) {
  return (
    <MinorText className={className}>
      {abbrev && <Abbrev {...abbrev} />}
      {textAndRefAndLiteral && <>({createElements(textAndRefAndLiteral)})</>}
    </MinorText>
  );
}
