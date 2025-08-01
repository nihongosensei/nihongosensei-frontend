import { joinBy, setKeyProperty } from "~components/helper";
import type { GramGrpModel } from "~services/VocabularyService";
import { isDefined } from "../helper/guards";
import { Doushi } from "./Doushi";
import { Fukushi } from "./Fukushi";
import { Keiyoudoushi } from "./Keiyoudoushi";

export function GramGrp({
  doushi,
  meishi,
  jodoushi,
  hojokeiyoushi,
  joshi,
  fukushi,
  keiyoushi,
  keiyoudoushi,
  kandoushi,
  prefix,
  suffix,
  rentaishi,
  setsuzokushi,
  daimeishi,
  setsuzokujoshi,
  shuujoshi,
  kakarijoshi,
  kakujoshi,
  fukujoshi,
  heiritsujoshi,
  wordcomponent,
  specialcharacter,
  kanji,
  rengo,
}: GramGrpModel) {
  const parts = [
    prefix && <>Präfix</>,
    suffix && <>Suffix</>,
    rentaishi && <>Adnomen</>,
    setsuzokujoshi && <>konjunktionale Partikel</>,
    daimeishi && <>Pronomen</>,
    kandoushi && <>Interjektion</>,
    jodoushi && <>Hilfsverb</>,
    hojokeiyoushi && <>Hilfsadjektiv</>,
    joshi && <>Partikel</>,
    fukujoshi && <>adverbial Partikel</>,
    heiritsujoshi && <>Aufzählungspartikel</>,
    kakarijoshi && <>Themapartikel</>,
    kakujoshi && <>Kasuspartikel</>,
    setsuzokushi && <>Konjunktionalpartikel</>,
    shuujoshi && <>satzbeendende Partikel</>,
    wordcomponent && <>Wortkomponente</>,
    specialcharacter && <>Sonderzeichen</>,
    rengo && <>Zusammensetzung</>,
    kanji && <>Kanji</>,

    meishi && <>Nomen</>,
    fukushi && <Fukushi {...fukushi} />,
    keiyoushi && (
      <>
        Adjektiv
        {keiyoushi.ku && (
          <>
            {" "}
            auf <em>-ku</em>
          </>
        )}
        {keiyoushi.shiku && (
          <>
            {" "}
            auf <em>-shiku</em>
          </>
        )}
      </>
    ),
    keiyoudoushi && <Keiyoudoushi {...keiyoudoushi} />,
  ]
    .filter(isDefined)
    .map(setKeyProperty())
    .reduce(joinBy("; "), []);

  return (
    <>
      {parts}
      {doushi
        ?.map((doushiEntry, index) => <Doushi key={index} {...doushiEntry} />)
        .reduce(joinBy("; "), [])}
    </>
  );
}
