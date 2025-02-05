import type { JSX } from "react";
import type { TranslModel } from "~services/VocabularyService";

export function Transl({ value }: TranslModel): JSX.Element {
  return (
    <span className='before:content-["»"] after:content-["«"]'>{value}</span>
  );
}
