import type { LiteralModel } from "~services/VocabularyService";
import { createElements } from "./helper/createElements";

export function Literal({ textAndToken }: LiteralModel) {
  return (
    <span className='before:content-["»"] after:content-["«"]'>
      {createElements(textAndToken)}
    </span>
  );
}
