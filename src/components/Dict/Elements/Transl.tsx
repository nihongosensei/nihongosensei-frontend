import type { TranslModel } from "~services/VocabularyService";

export function Transl({ value }: TranslModel) {
  return (
    <span className='before:content-["»"] after:content-["«"]'>{value}</span>
  );
}
