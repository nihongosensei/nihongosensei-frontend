import type { TransitivityEnum } from "@services/VocabularyService";
import type { JSX } from "react";

export const TRANSITIVITY_MAP: Record<TransitivityEnum, JSX.Element> = {
  TRANS: <>trans.</>,
  INTRANS: <>intransitiv</>,
  BOTH: <>intransitiv oder transitiv</>,
};
