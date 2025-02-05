import { JSX } from "react";
import type { LiteralModel } from "~services/VocabularyService";
import { createElements } from "./helper/createElements";

export function Literal({ textAndToken }: LiteralModel): JSX.Element {
  return (
    <span className='before:content-["»"] after:content-["«"]'>
      {createElements(textAndToken)}
    </span>
  );
}
