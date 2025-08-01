import type { TopicModel } from "~services/VocabularyService";

export function Topic({ value }: TopicModel) {
  return (
    <span className='before:content-["»"] after:content-["«"]'>{value}</span>
  );
}
