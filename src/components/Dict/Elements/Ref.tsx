import { Link } from "~components/ui/Link";
import type { RefModel, RefTypeEnum } from "~services/VocabularyService";
import { JapType } from "./JapType";

const TYPE_MAP: Record<RefTypeEnum, string> = {
  ALTREAD: "→",
  ANTO: "⇔",
  ALTTRANSCR: "☞",
  SYN: "⇒",
  MAIN: "",
  OTHER: "",
};

type RefProps = RefModel & {
  className?: string;
};

export function Ref({ id, jap, transcr, type, className }: RefProps) {
  return (
    <Link href={`/entry/${id}`} className={className}>
      {TYPE_MAP[type]} {transcr && <i>{transcr.content.join(", ")}</i>}{" "}
      {jap && <JapType {...jap} />}
    </Link>
  );
}
