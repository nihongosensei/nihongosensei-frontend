import type { SpeccharModel } from "~services/VocabularyService";

export function Specchar({ value }: SpeccharModel) {
  return (
    <span className='before:content-["»"] after:content-["«"]'>{value}</span>
  );
}
