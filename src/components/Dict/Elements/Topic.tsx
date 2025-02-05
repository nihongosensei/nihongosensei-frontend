import type { JSX } from "react";
import type { TopicModel } from "~services/VocabularyService";

export function Topic({ value }: TopicModel): JSX.Element {
  return (
    <span className='before:content-["»"] after:content-["«"]'>{value}</span>
  );
}
