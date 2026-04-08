import type { JSX } from "preact";
import type { TransitivityEnum } from "~services/VocabularyService";

export const TRANSITIVITY_MAP: Record<TransitivityEnum, JSX.Element> = {
  TRANS: <>trans.</>,
  INTRANS: <>intransitiv</>,
  BOTH: <>intransitiv oder transitiv</>,
};
