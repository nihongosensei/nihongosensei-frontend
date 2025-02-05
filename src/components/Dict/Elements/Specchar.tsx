import type { JSX } from "react";
import type { SpeccharModel } from "~services/VocabularyService";

export function Specchar({ value }: SpeccharModel): JSX.Element {
  return (
    <span className='before:content-["»"] after:content-["«"]'>{value}</span>
  );
}
